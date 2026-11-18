import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { initQuality, runCheck, recordEvidence, qualityStatus } from '../lib/quality.mjs';
import { snapshot } from '../lib/project.mjs';
import { fixture, configureQuality } from './helpers.mjs';

test('new plans have no passing gates and cannot accept unspecified targets', t => {
  const { project } = fixture(t);
  initQuality(project);
  assert.equal(qualityStatus(project).readyAgainstRecordedTargets, false);
  assert.ok(qualityStatus(project).gates.every(gate => gate.status === 'unconfigured'));
  assert.throws(() => recordEvidence({ project, id: 'value', result: 'pass', observed: 'Claim', artifacts: ['app.mjs'] }), /Configure/);
});

test('command evidence covers exact source and becomes stale after a same-HEAD edit', async t => {
  const { project } = fixture(t); initQuality(project); configureQuality(project);
  const before = snapshot(project);
  const result = await runCheck({ project, id: 'functionality', command: [process.execPath, '-e', 'process.stdout.write("real command ran")'] });
  assert.equal(result.receipt.result, 'pass');
  assert.equal(qualityStatus(project).readyAgainstRecordedTargets, true);
  fs.appendFileSync(path.join(project, 'app.mjs'), '\nexport const changed = true;\n');
  assert.equal(snapshot(project).head, before.head);
  assert.equal(qualityStatus(project).gates.find(gate => gate.id === 'functionality').status, 'stale');
});

test('new untracked source invalidates old passing evidence', async t => {
  const { project } = fixture(t); initQuality(project); configureQuality(project);
  await runCheck({ project, id: 'functionality', command: [process.execPath, '-e', ''] });
  fs.writeFileSync(path.join(project, 'new-route.mjs'), 'export default true;');
  assert.equal(qualityStatus(project).readyAgainstRecordedTargets, false);
});

test('changing the target plan invalidates evidence even if source is unchanged', async t => {
  const { project } = fixture(t); initQuality(project); configureQuality(project);
  await runCheck({ project, id: 'functionality', command: [process.execPath, '-e', ''] });
  const file = path.join(project, '.copilot-stack/quality.json');
  const plan = JSON.parse(fs.readFileSync(file)); plan.gates[1].target = 'A stronger target'; fs.writeFileSync(file, JSON.stringify(plan));
  assert.equal(qualityStatus(project).readyAgainstRecordedTargets, false);
});

test('artifact tampering invalidates an otherwise current receipt', async t => {
  const { project } = fixture(t); initQuality(project); configureQuality(project);
  const result = await runCheck({ project, id: 'functionality', command: [process.execPath, '-e', ''] });
  fs.appendFileSync(path.join(project, result.receipt.artifacts[0].path), 'edited evidence');
  assert.equal(qualityStatus(project).gates.find(gate => gate.id === 'functionality').status, 'evidence-changed');
});

test('a later failed command supersedes an earlier pass', async t => {
  const { project } = fixture(t); initQuality(project); configureQuality(project);
  await runCheck({ project, id: 'functionality', command: [process.execPath, '-e', ''] });
  const result = await runCheck({ project, id: 'functionality', command: [process.execPath, '-e', 'process.exit(3)'] });
  assert.equal(result.receipt.exitCode, 3);
  assert.equal(qualityStatus(project).gates.find(gate => gate.id === 'functionality').status, 'missed');
});

test('a check which changes source cannot publish a pass', async t => {
  const { project } = fixture(t); initQuality(project); configureQuality(project);
  const result = await runCheck({ project, id: 'functionality', command: [process.execPath, '-e', 'require("fs").appendFileSync("app.mjs", "\\n// changed by test")'] });
  assert.equal(result.receipt.exitCode, 0);
  assert.equal(result.receipt.changedDuringCheck, true);
  assert.equal(result.receipt.result, 'fail');
});

test('manual evidence requires an artifact and remains explicitly an attestation', t => {
  const { project } = fixture(t); initQuality(project); configureQuality(project);
  assert.throws(() => recordEvidence({ project, id: 'functionality', result: 'pass', observed: 'Checked' }), /at least one/);
  const result = recordEvidence({ project, id: 'functionality', result: 'pass', observed: 'Human observed the saved file', artifacts: ['app.mjs'] });
  assert.equal(result.receipt.method, 'manual-attestation');
  assert.match(result.note, /did not execute/);
});

test('old evidence expires without changing the source', async t => {
  const { project } = fixture(t); initQuality(project); configureQuality(project);
  await runCheck({ project, id: 'functionality', command: [process.execPath, '-e', ''] });
  assert.equal(qualityStatus(project, { now: Date.now() + 73 * 3600 * 1000 }).readyAgainstRecordedTargets, false);
});

test('missing executable and timeout are failures, not green or running evidence', async t => {
  const { project } = fixture(t); initQuality(project); configureQuality(project);
  const missing = await runCheck({ project, id: 'functionality', command: ['copilot-stack-nonexistent-command-123'] });
  assert.equal(missing.receipt.result, 'fail'); assert.ok(missing.receipt.error);
  const timeout = await runCheck({ project, id: 'functionality', timeout: 0.1, command: [process.execPath, '-e', 'setTimeout(()=>{},5000)'] });
  assert.equal(timeout.receipt.result, 'fail'); assert.notEqual(timeout.receipt.signal, null);
});
