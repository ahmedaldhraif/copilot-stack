import fs from 'node:fs';
import path from 'node:path';
import { ROOT, catalog, frontmatter, skillFiles } from './catalog.mjs';
import { assertNoLinks, filesUnder, readJson, safePath } from './fs-safe.mjs';

export function validateReferences(content, directory, packageRoot = directory) {
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    let target = match[1].replace(/^<|>$/g, '').split('#')[0];
    if (!target || /^https?:\/\//.test(target)) continue;
    target = decodeURIComponent(target);
    if (target.includes(' ') || /^[a-z]+:/.test(target)) throw new Error(`Unsupported reference: ${target}`);
    const resolved = path.resolve(directory, target);
    const file = safePath(packageRoot, path.relative(packageRoot, resolved));
    if (!fs.existsSync(file)) throw new Error(`Missing local reference: ${target}`);
  }
}

export function validatePackage(directory, { m365 = false } = {}) {
  const entries = filesUnder(directory);
  const entrypoint = entries.find(file => file.path === 'SKILL.md');
  if (!entrypoint) throw new Error(`Missing SKILL.md: ${directory}`);
  const content = entrypoint.data.toString('utf8');
  const { meta, body } = frontmatter(content);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.name) || meta.name.length > 64) throw new Error('Invalid skill name');
  if (typeof meta.description !== 'string' || !meta.description.trim() || meta.description.length > 1024) throw new Error(`Invalid description: ${meta.name}`);
  if (Object.keys(meta).some(key => !['name', 'description', 'license'].includes(key))) throw new Error(`Unsupported skill metadata: ${meta.name}`);
  if (!body.trim() || /\b(REPLACE_ME|TODO:|TBD:)\b/.test(body)) throw new Error(`Unfinished skill: ${meta.name}`);
  if (content.includes('\ufffd')) throw new Error(`Invalid UTF-8: ${meta.name}`);
  for (const entry of entries) {
    if (entry.path.endsWith('.md')) validateReferences(entry.data.toString('utf8'), path.dirname(path.join(directory, entry.path)), directory);
    if (m365) {
      if (entry.data.length > 25_000_000) throw new Error(`M365 file too large: ${entry.path}`);
      if (entry.path.split('/').length - 1 > 3) throw new Error(`M365 package too deep: ${entry.path}`);
      if (!/\.(json|xml|yaml|yml|ini|config|utf8|docx|doc|docm|pdf|txt|rtf|md|ppt|pptx|ppsm|xlsx|xls|xlsm|csv|tsv|html|htm|png|jpg|jpeg|gif|bmp|log|py|js|mjs|cjs|ts|mts|sh|bash)$/i.test(entry.path)) throw new Error(`Unsupported M365 resource: ${entry.path}`);
    }
  }
  // Whole file is measured conservatively, including YAML metadata.
  if (m365 && content.length >= 20_000) throw new Error(`M365 instructions must be under 20,000 characters: ${meta.name}`);
  if (m365 && entries.length > 350) throw new Error('M365 file-count limit exceeded');
  return { name: meta.name, files: entries.length, characters: content.length };
}

export function validateAll(root = ROOT) {
  const skills = catalog(root), names = new Set();
  const summary = [];
  for (const skill of skills) {
    if (names.has(skill.name)) throw new Error(`Duplicate skill: ${skill.name}`);
    names.add(skill.name);
    if (!['core', 'microsoft'].includes(skill.pack) || typeof skill.m365 !== 'boolean') throw new Error(`Invalid catalog entry: ${skill.name}`);
    const result = validatePackage(skill.directory, { m365: skill.m365 });
    if (result.name !== skill.name) throw new Error(`Name/directory mismatch: ${skill.name}`);
    summary.push(result);
  }
  const disk = fs.readdirSync(path.join(root, 'skills')).sort();
  if (JSON.stringify(disk) !== JSON.stringify([...names].sort())) throw new Error('Catalog does not match skill directories');
  for (const file of filesUnder(path.join(root, 'adapters/github/agents'))) {
    const { meta, body } = frontmatter(file.data.toString('utf8'));
    if (!file.path.endsWith('.agent.md') || !meta.description || body.length > 30_000) throw new Error(`Invalid custom agent: ${file.path}`);
    if (meta.model !== undefined || meta['mcp-servers'] !== undefined) throw new Error('Do not pin models or provision MCP implicitly');
  }
  const profiles = readJson(path.join(root, 'adapters/m365/profiles.json'));
  for (const profile of profiles) {
    if (!/^[a-z0-9-]+$/.test(profile.id) || !profile.instructions || profile.instructions.length > 8000) throw new Error('Invalid M365 profile');
    if (!profile.skills.length || profile.skills.length > 8 || new Set(profile.skills).size !== profile.skills.length) throw new Error(`Profile must contain 1-8 distinct skills: ${profile.id}`);
    let count = 0;
    for (const name of profile.skills) {
      const skill = skills.find(item => item.name === name);
      if (!skill?.m365) throw new Error(`Skill not M365-adapted: ${name}`);
      count += skillFiles(skill).length;
    }
    if (count > 350) throw new Error(`Agent profile exceeds 350 files: ${profile.id}`);
  }
  assertNoLinks(root);
  return { skills: skills.length, core: skills.filter(skill => skill.pack === 'core').length, microsoft: skills.filter(skill => skill.pack === 'microsoft').length, m365Skills: skills.filter(skill => skill.m365).length, profiles: profiles.length, summary };
}
