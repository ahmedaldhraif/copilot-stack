import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';

export const sha256 = data => createHash('sha256').update(data).digest('hex');
export const slash = value => value.split(path.sep).join('/');
export function exists(file) {
  try { fs.lstatSync(file); return true; } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

export function safePath(root, relative = '.') {
  if (path.isAbsolute(relative) || relative.includes('\0')) throw new Error('Expected a relative path');
  const resolvedRoot = path.resolve(root);
  const destination = path.resolve(resolvedRoot, relative);
  const relation = path.relative(resolvedRoot, destination);
  if (relation === '..' || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
    throw new Error(`Path escapes destination: ${relative}`);
  }
  assertNoLinks(destination);
  return destination;
}

// lstat catches Windows directory junctions as well as ordinary symlinks.
// Check every existing ancestor, including ancestors above the chosen root.
export function assertNoLinks(destination) {
  let current = path.resolve(destination);
  while (true) {
    if (exists(current) && fs.lstatSync(current).isSymbolicLink()) {
      throw new Error(`Refusing symbolic link or junction: ${current}`);
    }
    const parent = path.dirname(current);
    if (parent === current) return;
    current = parent;
  }
}

// Normalize existing ancestors too: Windows Git may expand an 8.3 path while
// os.tmpdir() still uses its short alias. Compare actual locations consistently.
export function canonicalPath(value) {
  const resolved = path.resolve(value);
  assertNoLinks(resolved);
  const tail = [];
  let ancestor = resolved;
  while (!exists(ancestor)) {
    tail.push(path.basename(ancestor));
    const parent = path.dirname(ancestor);
    if (parent === ancestor) throw new Error(`No existing path ancestor: ${value}`);
    ancestor = parent;
  }
  const result = path.join(fs.realpathSync.native(ancestor), ...tail.reverse());
  assertNoLinks(result);
  return result;
}

export function filesUnder(directory) {
  assertNoLinks(directory);
  const result = [];
  function visit(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      const full = path.join(current, entry.name);
      const stat = fs.lstatSync(full);
      if (stat.isSymbolicLink()) throw new Error(`Package contains a link: ${full}`);
      if (stat.isDirectory()) visit(full);
      else if (stat.isFile()) result.push({ path: slash(path.relative(directory, full)), data: fs.readFileSync(full) });
      else throw new Error(`Unsupported file type: ${full}`);
    }
  }
  visit(directory);
  return result.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
}

export function atomicWrite(file, data) {
  assertNoLinks(file);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.${randomUUID()}.tmp`;
  try {
    fs.writeFileSync(temporary, data, { flag: 'wx' });
    assertNoLinks(file);
    fs.renameSync(temporary, file);
  } finally {
    if (exists(temporary)) fs.unlinkSync(temporary);
  }
}

export function readJson(file) {
  assertNoLinks(file);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function json(data) { return `${JSON.stringify(data, null, 2)}\n`; }
