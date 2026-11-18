import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { randomUUID } from 'node:crypto';
import { ROOT, VERSION, selectedSkills, skillFiles } from './catalog.mjs';
import { assertNoLinks, atomicWrite, exists, filesUnder, json, readJson, safePath, sha256 } from './fs-safe.mjs';

function managedPath(relative, personal) {
  const prefix = personal ? '' : '.github/';
  const parts = relative.split('/');
  if (parts.some(part => !part || part === '.' || part === '..') || relative.includes('\\')) return false;
  const skillParts = relative.startsWith(`${prefix}skills/`) ? relative.slice(`${prefix}skills/`.length).split('/') : [];
  if (skillParts.length >= 2 && /^ms-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skillParts[0]) && skillParts.slice(1).every(part => /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(part))) return true;
  if (!personal && /^\.github\/agents\/ms-[a-z-]+\.agent\.md$/.test(relative)) return true;
  if (!personal && /^\.github\/prompts\/ms-[a-z0-9-]+-vs\.prompt\.md$/.test(relative)) return true;
  return !personal && relative === '.github/instructions/ms-stack.instructions.md';
}

function loadState(root, personal) {
  const file = safePath(root, '.copilot-stack/install.json');
  if (!exists(file)) return { schema: 1, files: {} };
  const state = readJson(file);
  if (state.schema !== 1 || !state.files || typeof state.files !== 'object' || Array.isArray(state.files)) throw new Error('Invalid install state');
  for (const [relative, digest] of Object.entries(state.files)) {
    safePath(root, relative);
    if (!managedPath(relative, personal) || !/^[0-9a-f]{64}$/.test(digest)) throw new Error(`Invalid managed path or digest: ${relative}`);
  }
  return state;
}

function withLock(root, operation) {
  const directory = safePath(root, '.copilot-stack');
  const created = !exists(directory);
  fs.mkdirSync(directory, { recursive: true });
  const lock = safePath(root, '.copilot-stack/install.lock');
  let handle;
  try {
    try { handle = fs.openSync(lock, 'wx'); }
    catch (error) {
      if (error.code === 'EEXIST') throw new Error(`Installer locked: ${lock}. If no installer is running, remove this stale lock and retry.`);
      throw error;
    }
    fs.writeFileSync(handle, json({ pid: process.pid }));
    return operation();
  } finally {
    if (handle !== undefined) { fs.closeSync(handle); fs.unlinkSync(lock); }
    if (created && exists(directory) && fs.readdirSync(directory).length === 0) fs.rmdirSync(directory);
  }
}

function addDirectories(directory, created) {
  assertNoLinks(directory);
  if (exists(directory)) return;
  addDirectories(path.dirname(directory), created);
  fs.mkdirSync(directory);
  created.push(directory);
}

// Preflight every path before any managed file is written. Ordinary I/O failures
// roll back changes. A process/OS crash is different: inspect files and state
// before retrying; unowned collisions are preserved rather than guessed at.
export function transaction(root, writes, { onWrite } = {}) {
  const undo = [], directories = [], staged = [];
  try {
    // Stage complete replacement bytes before publishing any managed content.
    // A failed/truncated staging write never touches a user's existing file.
    for (const item of writes) {
      const file = safePath(root, item.path);
      addDirectories(path.dirname(file), directories);
      const temporary = item.data === null ? null : `${file}.${randomUUID()}.tmp`;
      staged.push(temporary);
      if (temporary) fs.writeFileSync(temporary, item.data, { flag: 'wx' });
    }
    for (const [index, item] of writes.entries()) {
      const file = safePath(root, item.path);
      const before = exists(file) ? fs.readFileSync(file) : null;
      if (item.before === null ? before !== null : before === null || !before.equals(item.before)) {
        throw new Error(`Destination changed during install: ${item.path}`);
      }
      if (item.data === null) fs.unlinkSync(file);
      else if (before === null) {
        // Exclusive publication cannot overwrite a file created after preflight.
        fs.linkSync(staged[index], file);
        fs.unlinkSync(staged[index]);
      } else fs.renameSync(staged[index], file);
      undo.push({ file, before });
      if (item.data !== null && item.mode !== undefined && process.platform !== 'win32') fs.chmodSync(file, item.mode);
      onWrite?.(index, item);
    }
  } catch (error) {
    const failures = [];
    for (const item of undo.reverse()) {
      try {
        assertNoLinks(item.file);
        if (item.before === null) fs.unlinkSync(item.file);
        else atomicWrite(item.file, item.before);
      } catch (rollbackError) { failures.push(rollbackError.message); }
    }
    if (failures.length) throw new Error(`${error.message}; rollback needs attention: ${failures.join('; ')}`);
    throw error;
  } finally {
    for (const temporary of staged) if (temporary && exists(temporary)) fs.unlinkSync(temporary);
    for (const directory of directories.reverse()) {
      if (exists(directory) && fs.readdirSync(directory).length === 0) fs.rmdirSync(directory);
    }
  }
}

export function install({ project, personal = false, home = os.homedir(), pack = 'all', agents = false, instructions = false, visualStudio = false, dryRun = false, source = ROOT, onWrite } = {}) {
  if (Boolean(project) === personal) throw new Error('Choose exactly one: --project PATH or --personal');
  if (personal && (agents || instructions || visualStudio)) throw new Error('Personal installs contain skills only; use a project for agents/instructions/prompts');
  const root = path.resolve(personal ? path.join(home, '.copilot') : project);
  assertNoLinks(root);
  if (!personal && (!exists(root) || !fs.statSync(root).isDirectory())) throw new Error('Project directory must already exist');
  const prefix = personal ? '' : '.github/';
  const selected = selectedSkills(pack, source);
  const planned = selected.flatMap(skill => skillFiles(skill).map(file => ({ path: `${prefix}skills/${skill.name}/${file.path}`, data: file.data })));
  if (agents) planned.push(...filesUnder(path.join(source, 'adapters/github/agents')).map(file => ({ path: `.github/agents/${file.path}`, data: file.data })));
  if (instructions) planned.push({ path: '.github/instructions/ms-stack.instructions.md', data: fs.readFileSync(path.join(source, 'adapters/github/ms-stack.instructions.md')) });
  if (visualStudio) planned.push(...selected.map(skill => ({
    path: `.github/prompts/${skill.name}-vs.prompt.md`,
    data: Buffer.from(`---\ndescription: ${JSON.stringify(skill.meta.description)}\n---\n\nUse the complete instructions in [${skill.name}](../skills/${skill.name}/SKILL.md) for the user's request. Read that file before acting. If file references are unavailable, ask the user to attach that file and continue only with available context.\n`)
  })));
  for (const item of planned) safePath(root, item.path);

  function run() {
    const state = loadState(root, personal);
    const writes = [], next = { ...state.files };
    for (const item of planned) {
      const file = safePath(root, item.path);
      if (exists(file) && !fs.lstatSync(file).isFile()) throw new Error(`Expected a regular file: ${item.path}`);
      const before = exists(file) ? fs.readFileSync(file) : null;
      if (before !== null && state.files[item.path] !== sha256(before)) {
        throw new Error(`Conflict; preserving existing file: ${item.path}. Move it aside or keep your edited version.`);
      }
      next[item.path] = sha256(item.data);
      if (before === null || !before.equals(item.data)) writes.push({ ...item, before });
    }
    const statePath = '.copilot-stack/install.json';
    const stateFile = safePath(root, statePath);
    const data = Buffer.from(json({ schema: 1, version: VERSION, personal, files: Object.fromEntries(Object.entries(next).sort()) }));
    const before = exists(stateFile) ? fs.readFileSync(stateFile) : null;
    if (before === null || !before.equals(data)) writes.push({ path: statePath, data, before });
    if (!dryRun) transaction(root, writes, { onWrite });
    return { root, personal, skills: selected.length, plannedFiles: planned.length, changedFiles: writes.length, dryRun };
  }
  if (dryRun) return run();
  fs.mkdirSync(root, { recursive: true });
  return withLock(root, run);
}

export function uninstall({ project, personal = false, home = os.homedir(), dryRun = false, onWrite } = {}) {
  if (Boolean(project) === personal) throw new Error('Choose exactly one: --project PATH or --personal');
  const root = path.resolve(personal ? path.join(home, '.copilot') : project);
  assertNoLinks(root);
  function run() {
    const state = loadState(root, personal);
    const writes = [], kept = [], next = {};
    for (const [relative, digest] of Object.entries(state.files)) {
      const file = safePath(root, relative);
      if (!exists(file)) continue;
      if (!fs.lstatSync(file).isFile()) { kept.push(relative); next[relative] = digest; continue; }
      const before = fs.readFileSync(file);
      if (sha256(before) !== digest) { kept.push(relative); next[relative] = digest; continue; }
      writes.push({ path: relative, data: null, before });
    }
    const statePath = '.copilot-stack/install.json';
    const stateFile = safePath(root, statePath);
    if (exists(stateFile)) writes.push({ path: statePath, before: fs.readFileSync(stateFile), data: Object.keys(next).length ? Buffer.from(json({ ...state, files: next })) : null });
    if (!dryRun) {
      transaction(root, writes, { onWrite });
      // Remove empty directories only. A user's additional file always survives.
      for (const item of writes) {
        let directory = path.dirname(safePath(root, item.path));
        while (directory !== root && exists(directory) && fs.readdirSync(directory).length === 0) {
          if (directory === path.join(root, '.copilot-stack')) break; // active lock
          fs.rmdirSync(directory); directory = path.dirname(directory);
        }
      }
    }
    return { root, removedFiles: writes.filter(item => item.data === null && item.path !== statePath).length, kept, dryRun };
  }
  if (dryRun || !exists(root)) return run();
  return withLock(root, run);
}
