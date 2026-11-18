import fs from 'node:fs';
import path from 'node:path';
import { ROOT, VERSION, catalog, skillFiles } from './catalog.mjs';
import { exists, json, readJson, safePath, sha256 } from './fs-safe.mjs';
import { transaction } from './install.mjs';
import { makeZip } from './zip.mjs';
import { validateAll } from './validate.mjs';

export function exportM365(out, root = ROOT) {
  return exportM365ForRelease(out, root).summary;
}

export function exportM365ForRelease(out, root = ROOT) {
  if (!out) throw new Error('Provide --out PATH');
  validateAll(root);
  const destination = path.resolve(out);
  safePath(destination);
  const files = [], packages = [];
  for (const skill of catalog(root).filter(item => item.m365)) {
    const entries = skillFiles(skill);
    const data = makeZip(entries);
    if (data.length > 50_000_000) throw new Error(`Skill ZIP exceeds 50 MB: ${skill.name}`);
    const relative = `skills/${skill.name}.zip`;
    files.push({ path: relative, data });
    packages.push({ name: skill.name, path: relative, sha256: sha256(data), bytes: data.length, files: entries.length });
  }
  const profiles = readJson(path.join(root, 'adapters/m365/profiles.json'));
  for (const profile of profiles) {
    files.push({ path: `profiles/${profile.id}.json`, data: Buffer.from(json(profile)) });
    files.push({ path: `profiles/${profile.id}-instructions.txt`, data: Buffer.from(`${profile.instructions}\n`) });
  }
  files.push({ path: 'packages.json', data: Buffer.from(json({ schema: 1, version: VERSION, target: 'Agent Builder ZIP; personal Copilot Chat upload; see installation guide', packages })) });
  files.push({ path: 'INSTALL.md', data: fs.readFileSync(path.join(root, 'docs/M365.md')) });
  const manifestPath = '.export-manifest.json';
  const manifestFile = safePath(destination, manifestPath);
  const prior = exists(manifestFile) ? readJson(manifestFile) : { files: {} };
  if (prior.schema !== undefined && (prior.schema !== 1 || !prior.files || typeof prior.files !== 'object' || Array.isArray(prior.files))) throw new Error('Invalid export manifest');
  const next = {}, writes = [], kept = [];
  for (const file of files) {
    const target = safePath(destination, file.path);
    const before = exists(target) ? fs.readFileSync(target) : null;
    if (before !== null && sha256(before) !== prior.files[file.path]) throw new Error(`Export conflict; preserving: ${file.path}`);
    next[file.path] = sha256(file.data);
    if (before === null || !before.equals(file.data)) writes.push({ ...file, before });
  }
  const releaseManifest = Buffer.from(json({ schema: 1, files: next }));
  for (const [relative, digest] of Object.entries(prior.files)) {
    if (Object.hasOwn(next, relative)) continue;
    if (!/^(skills\/ms-[a-z0-9-]+\.zip|profiles\/[a-z0-9-]+\.(json|txt)|packages\.json|INSTALL\.md)$/.test(relative) || !/^[0-9a-f]{64}$/.test(digest)) throw new Error(`Invalid previous export path: ${relative}`);
    const target = safePath(destination, relative);
    if (!exists(target)) continue;
    const before = fs.readFileSync(target);
    if (sha256(before) === digest) writes.push({ path: relative, data: null, before });
    else { kept.push(relative); next[relative] = digest; }
  }
  const data = Buffer.from(json({ schema: 1, files: next }));
  const before = exists(manifestFile) ? fs.readFileSync(manifestFile) : null;
  if (before === null || !before.equals(data)) writes.push({ path: manifestPath, data, before });
  fs.mkdirSync(destination, { recursive: true });
  transaction(destination, writes);
  return {
    entries: [...files, { path: manifestPath, data: releaseManifest }],
    summary: { destination, packages: packages.length, profiles: profiles.length, changedFiles: writes.length, keptModifiedObsoleteFiles: kept },
  };
}
