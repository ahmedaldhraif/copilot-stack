import fs from 'node:fs';
import path from 'node:path';
import { assertNoLinks, canonicalPath, exists, json, readJson, safePath, sha256 } from './fs-safe.mjs';
import { git, projectRoot, snapshot, sourcePaths } from './project.mjs';
import { transaction } from './install.mjs';

function omitted(relative) {
  const parts = relative.split('/');
  return parts.some(part => /^\.env(?:\.|$)/i.test(part) || ['.npmrc', '.pypirc', '.git-credentials', 'id_rsa', 'id_ed25519'].includes(part.toLowerCase())) ||
    /\.(pem|key|pfx|p12|kdbx)$/i.test(relative) ||
    /(?:^|\/)(secrets|credentials|service-account[^/]*)\.json$/i.test(relative);
}

export function checkpoint({ project, out, history = false, onBeforeVerify } = {}) {
  const root = projectRoot(project);
  if (!out) throw new Error('Provide --out with a NEW directory outside the project');
  const destination = canonicalPath(out), relation = path.relative(root, destination);
  if (!relation || (!relation.startsWith('..' + path.sep) && relation !== '..' && !path.isAbsolute(relation))) throw new Error('Checkpoint must be outside the project');
  assertNoLinks(destination);
  if (exists(destination)) throw new Error('Checkpoint destination already exists; choose a new directory');
  const before = snapshot(root), entries = [], skipped = [], writes = [];
  const executable = new Set(git(root, ['ls-files', '--stage', '-z']).split('\0').map(row => row.match(/^100755 [^\t]+\t(.+)$/s)?.[1]).filter(Boolean));
  for (const relative of sourcePaths(root)) {
    if (omitted(relative)) { skipped.push({ path: relative, reason: 'Common secret/configuration path' }); continue; }
    const file = safePath(root, relative);
    if (!exists(file)) { skipped.push({ path: relative, reason: 'Deleted in working tree' }); continue; }
    if (!fs.lstatSync(file).isFile()) throw new Error(`Checkpoint requires regular files: ${relative}`);
    const stat = fs.lstatSync(file), data = fs.readFileSync(file), saved = `files/${relative}`;
    const mode = process.platform === 'win32' ? (executable.has(relative) ? 0o755 : 0o644) : stat.mode & 0o777;
    entries.push({ path: relative, sha256: sha256(data), bytes: data.length, mode });
    writes.push({ path: saved, data, mode: 0o600, before: null });
  }
  let bundle = null;
  if (history) {
    if (git(root, ['rev-parse', '--is-shallow-repository']).trim() === 'true') throw new Error('History checkpoint needs a full Git clone; omit --history for a source-only checkpoint');
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  // Exclusive creation preserves the new-only contract even if another process
  // created the requested output after the initial check.
  fs.mkdirSync(destination, { mode: 0o700 });
  const bundleFile = safePath(destination, 'history.bundle');
  try {
    if (history) {
      git(root, ['bundle', 'create', bundleFile, '--all']);
      const data = fs.readFileSync(bundleFile);
      if (process.platform !== 'win32') fs.chmodSync(bundleFile, 0o600);
      bundle = { path: 'history.bundle', sha256: sha256(data), bytes: data.length };
    }
    onBeforeVerify?.();
    if (snapshot(root).fingerprint !== before.fingerprint) throw new Error('Project changed while checkpointing; create a fresh checkpoint');
    const manifest = { schema: 1, kind: 'source-checkpoint', createdAt: new Date().toISOString(), source: before, history: bundle, files: entries, skipped,
    excludes: ['Git-ignored files and .copilot-stack state', 'Common secret/configuration filenames', 'Live databases, tenant resources and external storage'],
    note: history ? 'Git history bundle may contain historical secrets; keep private. Source file exclusions do not filter Git history.' : 'No Git history. Optional --history creates a separate bundle. This is not an application-data backup.' };
    writes.push({ path: 'checkpoint.json', data: Buffer.from(json(manifest)), before: null });
    transaction(destination, writes);
  } catch (error) {
    if (exists(bundleFile)) fs.unlinkSync(bundleFile);
    if (fs.readdirSync(destination).length === 0) fs.rmdirSync(destination);
    throw error;
  }
  return { destination, files: entries.length, skipped, history: Boolean(bundle), applicationDataBackedUp: false };
}

export function restoreCheckpoint({ from, to } = {}) {
  if (!from || !to) throw new Error('Provide --from CHECKPOINT and --to NEW_DIRECTORY');
  const source = canonicalPath(from), destination = canonicalPath(to);
  assertNoLinks(source); assertNoLinks(destination);
  const relation = path.relative(source, destination);
  if (!relation || (!relation.startsWith('..' + path.sep) && relation !== '..' && !path.isAbsolute(relation))) throw new Error('Restore outside the checkpoint directory to preserve the backup');
  if (exists(destination)) throw new Error('Restore destination must be a new directory; in-place restore is not supported');
  const manifest = readJson(safePath(source, 'checkpoint.json'));
  if (manifest.schema !== 1 || manifest.kind !== 'source-checkpoint' || !Array.isArray(manifest.files)) throw new Error('Invalid checkpoint manifest');
  const seen = new Set(), writes = [];
  for (const entry of manifest.files) {
    if (!entry.path || seen.has(entry.path) || entry.path.includes('\\') || entry.path.split('/').some(part => ['.git', '.copilot-stack', '.', '..', ''].includes(part))) throw new Error(`Unsafe checkpoint path: ${entry.path}`);
    seen.add(entry.path);
    safePath(destination, entry.path);
    const data = fs.readFileSync(safePath(source, `files/${entry.path}`));
    if (sha256(data) !== entry.sha256 || data.length !== entry.bytes) throw new Error(`Checkpoint integrity failure: ${entry.path}`);
    if (!Number.isInteger(entry.mode) || entry.mode < 0 || entry.mode > 0o777) throw new Error(`Invalid checkpoint permissions: ${entry.path}`);
    writes.push({ path: entry.path, data, mode: entry.mode, before: null });
  }
  if (manifest.history) {
    if (manifest.history.path !== 'history.bundle') throw new Error('Invalid history bundle path');
    const data = fs.readFileSync(safePath(source, 'history.bundle'));
    if (sha256(data) !== manifest.history.sha256 || data.length !== manifest.history.bytes) throw new Error('History bundle integrity failure');
  }
  fs.mkdirSync(destination, { recursive: true });
  try { transaction(destination, writes); }
  catch (error) { if (fs.readdirSync(destination).length === 0) fs.rmdirSync(destination); throw error; }
  return { destination, restoredFiles: writes.length, gitInitialized: false, historyBundle: Boolean(manifest.history), applicationDataRestored: false,
    next: 'Review files, initialize or recover Git separately, restore app configuration/data into an isolated environment, then run the real build and smoke journey.' };
}
