import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { assertNoLinks, canonicalPath, sha256, slash } from './fs-safe.mjs';

export function git(project, args) {
  return execFileSync('git', ['-C', project, ...args], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
}

export function projectRoot(project) {
  const root = canonicalPath(project || '.');
  assertNoLinks(root);
  const actual = canonicalPath(git(root, ['rev-parse', '--show-toplevel']).trim());
  if (path.relative(root, actual) !== '') throw new Error(`Use the Git repository root: ${actual}`);
  return root;
}

export function sourcePaths(project) {
  return [...new Set(git(project, ['ls-files', '--cached', '--others', '--exclude-standard', '-z']).split('\0').filter(Boolean))]
    .filter(relative => relative !== '.copilot-stack' && !relative.startsWith('.copilot-stack/'))
    .sort();
}

export function snapshot(project) {
  const root = projectRoot(project), entries = [];
  let head = null;
  try { head = git(root, ['rev-parse', '--verify', 'HEAD']).trim(); } catch { /* unborn repo */ }
  for (const relative of sourcePaths(root)) {
    const file = path.resolve(root, relative);
    if (path.relative(root, file).startsWith(`..${path.sep}`)) throw new Error('Git returned a path outside the repository');
    assertNoLinks(path.dirname(file));
    let stat;
    try { stat = fs.lstatSync(file); } catch (error) {
      if (error.code === 'ENOENT') { entries.push([relative, 'deleted']); continue; }
      throw error;
    }
    if (stat.isSymbolicLink()) entries.push([relative, 'symlink', sha256(fs.readlinkSync(file))]);
    else if (stat.isFile()) entries.push([relative, stat.mode & 0o777, sha256(fs.readFileSync(file))]);
    else throw new Error(`Unsupported source entry (including submodules): ${slash(relative)}`);
  }
  const index = sha256(git(root, ['ls-files', '--stage', '-z']));
  return { head, fingerprint: sha256(JSON.stringify({ head, index, entries })), files: entries.length };
}
