import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { ROOT } from './catalog.mjs';
import { atomicWrite, exists, json, readJson, safePath, sha256 } from './fs-safe.mjs';
import { projectRoot, snapshot } from './project.mjs';

const IDS = ['value', 'functionality', 'experience', 'accessibility', 'security', 'data', 'reliability', 'performance', 'maintainability', 'operations'];

export function initQuality(project) {
  const root = projectRoot(project), file = safePath(root, '.copilot-stack/quality.json');
  if (exists(file)) throw new Error('Quality plan exists; edit it without replacing your targets');
  const plan = readJson(path.join(ROOT, 'templates/quality-plan.json'));
  plan.app = path.basename(root);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const ignore = safePath(root, '.copilot-stack/.gitignore');
  if (!exists(ignore)) fs.writeFileSync(ignore, '*\n', { flag: 'wx' });
  fs.writeFileSync(file, json(plan), { flag: 'wx' });
  return { file, next: 'Set a concrete target for each gate and the actual environment. No gate is passing yet.' };
}

export function qualityPlan(project) {
  const root = projectRoot(project), file = safePath(root, '.copilot-stack/quality.json');
  if (!exists(file)) throw new Error('Run init-quality --project PATH first');
  const data = fs.readFileSync(file), plan = JSON.parse(data.toString('utf8'));
  if (plan.schema !== 1 || typeof plan.app !== 'string' || typeof plan.environment !== 'string' || !plan.environment.trim() || !Number.isFinite(plan.maxAgeHours) || plan.maxAgeHours <= 0 || !Array.isArray(plan.gates)) throw new Error('Invalid quality plan');
  const names = plan.gates.map(gate => gate.id);
  if (names.length !== IDS.length || new Set(names).size !== IDS.length || IDS.some(id => !names.includes(id))) throw new Error('Quality plan must contain the ten distinct gate IDs');
  for (const gate of plan.gates) {
    if (typeof gate.target !== 'string' || typeof gate.required !== 'boolean') throw new Error(`Invalid gate: ${gate.id}`);
    if (!gate.required && (typeof gate.reason !== 'string' || !gate.reason.trim())) throw new Error(`Not-applicable gate needs a reason: ${gate.id}`);
  }
  if (!plan.gates.some(gate => gate.required)) throw new Error('At least one quality gate must apply');
  return { root, plan, planHash: sha256(data) };
}

function artifact(root, relative) {
  const file = safePath(root, relative);
  if (!exists(file) || !fs.lstatSync(file).isFile()) throw new Error(`Missing regular evidence artifact: ${relative}`);
  const data = fs.readFileSync(file);
  return { path: relative, sha256: sha256(data), bytes: data.length };
}

function start(project, id) {
  const context = qualityPlan(project);
  const gate = context.plan.gates.find(item => item.id === id);
  if (!gate?.required || !gate.target.trim()) throw new Error(`Configure an applicable target before recording: ${id}`);
  const receipt = { schema: 1, id, uuid: randomUUID(), startedAt: new Date().toISOString(), order: process.hrtime.bigint().toString(),
    environment: context.plan.environment, target: gate.target, planHash: context.planHash, source: snapshot(context.root) };
  return { ...context, receipt, file: safePath(context.root, `.copilot-stack/evidence/${receipt.uuid}.json`) };
}

export function recordEvidence({ project, id, result, observed, artifacts = [] } = {}) {
  if (!['pass', 'fail'].includes(result) || !observed?.trim() || !artifacts.length) throw new Error('Manual evidence requires --result pass|fail, --observed TEXT and at least one --artifact PATH');
  const context = start(project, id);
  const receipt = { ...context.receipt, method: 'manual-attestation', result, observed, artifacts: artifacts.map(item => artifact(context.root, item)), finishedAt: new Date().toISOString() };
  atomicWrite(context.file, json(receipt));
  return { file: context.file, receipt, note: 'Recorded your attestation and artifact hashes. This command did not execute or independently verify the observed test.' };
}

export async function runCheck({ project, id, command, timeout = 300, onOutput } = {}) {
  if (!Array.isArray(command) || !command.length || command.some(value => typeof value !== 'string') || !command[0]) throw new Error('Provide an executable and arguments after --');
  if (!Number.isFinite(timeout) || timeout <= 0 || timeout > 86400) throw new Error('Timeout must be 1-86400 seconds');
  const context = start(project, id), relativeLog = `.copilot-stack/logs/${context.receipt.uuid}.log`;
  const log = safePath(context.root, relativeLog);
  fs.mkdirSync(path.dirname(log), { recursive: true });
  const handle = fs.openSync(log, 'wx');
  const running = { ...context.receipt, method: 'command', command, result: 'running', artifacts: [] };
  atomicWrite(context.file, json(running));
  let bytes = 0, truncated = false, errorMessage = null;
  function output(chunk) {
    onOutput?.(chunk);
    const remaining = 10 * 1024 * 1024 - bytes;
    if (remaining > 0 && !errorMessage) {
      try { const part = chunk.subarray(0, remaining); fs.writeSync(handle, part); bytes += part.length; }
      catch (error) { errorMessage = `Could not write check log: ${error.message}`; }
    }
    if (chunk.length > remaining) truncated = true;
  }
  const completion = await new Promise(resolve => {
    let child, timer;
    try { child = spawn(command[0], command.slice(1), { cwd: context.root, shell: false, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] }); }
    catch (error) { errorMessage = error.message; resolve({ exitCode: null, signal: null }); return; }
    timer = setTimeout(() => child.kill(), timeout * 1000);
    timer.unref();
    child.stdout.on('data', output); child.stderr.on('data', output);
    child.on('error', error => { clearTimeout(timer); errorMessage = error.message; });
    child.on('close', (exitCode, signal) => { clearTimeout(timer); resolve({ exitCode, signal }); });
  });
  fs.closeSync(handle);
  const after = snapshot(context.root);
  const changedDuringCheck = after.fingerprint !== context.receipt.source.fingerprint;
  const receipt = { ...running, ...completion, error: errorMessage, truncated, changedDuringCheck,
    result: completion.exitCode === 0 && !errorMessage && !changedDuringCheck ? 'pass' : 'fail',
    finishedAt: new Date().toISOString(), artifacts: [artifact(context.root, relativeLog)] };
  atomicWrite(context.file, json(receipt));
  return { file: context.file, receipt };
}

export function qualityStatus(project, { now = Date.now() } = {}) {
  const { root, plan, planHash } = qualityPlan(project), current = snapshot(root);
  const directory = safePath(root, '.copilot-stack/evidence');
  const receipts = exists(directory) ? fs.readdirSync(directory).filter(name => name.endsWith('.json')).map(name => readJson(safePath(directory, name))) : [];
  for (const receipt of receipts) {
    if (receipt.schema !== 1 || !IDS.includes(receipt.id) || !['pass', 'fail', 'running'].includes(receipt.result) || !/^\d+$/.test(receipt.order) || !Array.isArray(receipt.artifacts) || !Number.isFinite(Date.parse(receipt.startedAt))) throw new Error('Invalid evidence receipt; inspect it before reporting readiness');
  }
  receipts.sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt) || (BigInt(a.order) < BigInt(b.order) ? 1 : -1));
  const gates = plan.gates.map(gate => {
    if (!gate.required) return { ...gate, status: 'not-applicable' };
    if (!gate.target.trim()) return { ...gate, status: 'unconfigured' };
    const receipt = receipts.find(item => item.id === gate.id && item.environment === plan.environment);
    if (!receipt) return { ...gate, status: 'unverified' };
    const stale = receipt.planHash !== planHash || receipt.source?.fingerprint !== current.fingerprint ||
      now - Date.parse(receipt.startedAt) > plan.maxAgeHours * 3600 * 1000 || Date.parse(receipt.startedAt) > now + 300000;
    let artifactsIntact = true;
    for (const item of receipt.artifacts) {
      try { if (artifact(root, item.path).sha256 !== item.sha256) artifactsIntact = false; }
      catch { artifactsIntact = false; }
    }
    const status = stale ? 'stale' : !artifactsIntact ? 'evidence-changed' : receipt.result === 'running' ? 'running' : receipt.result === 'fail' ? 'missed' : receipt.artifacts.length ? 'met' : 'unverified';
    return { ...gate, status, method: receipt.method, receipt: receipt.uuid };
  });
  return { app: plan.app, environment: plan.environment, current, gates,
    readyAgainstRecordedTargets: gates.every(gate => ['met', 'not-applicable'].includes(gate.status)),
    note: 'This is recorded evidence against your targets, not an automatic quality score or production certification. Manual attestations are labeled; host/tenant outcomes need real verification.' };
}
