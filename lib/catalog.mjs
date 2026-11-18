import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { filesUnder, readJson } from './fs-safe.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const VERSION = readJson(path.join(ROOT, 'package.json')).version;

// Authors use a small, unambiguous YAML subset: key: JSON-string (valid YAML).
// Reject unsupported syntax rather than silently misinterpreting metadata.
export function frontmatter(text) {
  if (text.charCodeAt(0) === 0xfeff) throw new Error('UTF-8 BOM is not supported');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error('Missing YAML frontmatter');
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const row = line.match(/^([a-z][a-z-]*): (.+)$/);
    if (!row || Object.hasOwn(meta, row[1])) throw new Error(`Unsupported or duplicate frontmatter: ${line}`);
    try { meta[row[1]] = JSON.parse(row[2]); }
    catch { throw new Error(`Use a JSON-compatible YAML value: ${line}`); }
  }
  return { meta, body: match[2] };
}

export function catalog(root = ROOT) {
  const manifest = readJson(path.join(root, 'catalog.json'));
  return manifest.skills.map(entry => {
    const directory = path.join(root, 'skills', entry.name);
    const content = fs.readFileSync(path.join(directory, 'SKILL.md'), 'utf8');
    const { meta, body } = frontmatter(content);
    return { ...entry, meta, body, content, directory };
  });
}

export function selectedSkills(pack = 'all', root = ROOT) {
  if (!['core', 'microsoft', 'all'].includes(pack)) throw new Error('Pack must be core, microsoft, or all');
  return catalog(root).filter(skill => pack === 'all' || skill.pack === pack);
}

export function skillFiles(skill) { return filesUnder(skill.directory); }
