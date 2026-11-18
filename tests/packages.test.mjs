import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, catalog } from '../lib/catalog.mjs';
import { validateAll, validatePackage } from '../lib/validate.mjs';
import { makeZip, crc32 } from '../lib/zip.mjs';
import { exportM365 } from '../lib/export.mjs';
import { main } from '../bin/copilot-stack.mjs';
import { fixture, tree } from './helpers.mjs';

test('catalog, portable packages and profiles validate with precise counts', () => {
  const result = validateAll();
  assert.equal(result.skills, 34); assert.equal(result.m365Skills, 15); assert.equal(result.profiles, 4);
  assert.equal(catalog().filter(skill => skill.name === 'ms-app').length, 1);
});

test('a nested reference may link to its own skill root, never outside its package', t => {
  const { base } = fixture(t), skill = path.join(base, 'ms-example');
  fs.mkdirSync(path.join(skill, 'references'), { recursive: true });
  fs.writeFileSync(path.join(skill, 'SKILL.md'), '---\nname: "ms-example"\ndescription: "A precise fixture skill"\nlicense: "MIT"\n---\n\nRead [guide](references/guide.md).\n');
  fs.writeFileSync(path.join(skill, 'references/guide.md'), '[Back](../SKILL.md)\n');
  assert.equal(validatePackage(skill, { m365: true }).files, 2);
  fs.writeFileSync(path.join(skill, 'references/guide.md'), '[Outside](../../app/app.mjs)\n');
  assert.throws(() => validatePackage(skill), /escapes/);
});

test('M365 instructions at exactly 20000 characters are rejected', t => {
  const { base } = fixture(t), skill = path.join(base, 'ms-example'); fs.mkdirSync(skill);
  const prefix = '---\nname: "ms-example"\ndescription: "A fixture"\n---\n';
  fs.writeFileSync(path.join(skill, 'SKILL.md'), prefix + 'a'.repeat(20000 - prefix.length));
  assert.throws(() => validatePackage(skill, { m365: true }), /under 20,000/);
});

test('ZIP CRC matches known standard and path/duplicate entries are rejected', () => {
  assert.equal(crc32(Buffer.from('123456789')), 0xcbf43926);
  assert.throws(() => makeZip([{ path: '../SKILL.md', data: 'bad' }]), /Unsafe/);
  assert.throws(() => makeZip([{ path: 'SKILL.md', data: 'one' }, { path: 'SKILL.md', data: 'two' }]), /duplicate/);
});

test('repeated M365 export is byte-identical and preserves unowned output files', t => {
  const { base } = fixture(t), out = path.join(base, 'export');
  assert.equal(exportM365(out).packages, 15);
  fs.writeFileSync(path.join(out, 'my-notes.txt'), 'Preserve me');
  const before = tree(out);
  assert.equal(exportM365(out).changedFiles, 0);
  assert.deepEqual(tree(out), before);
});

test('obsolete owned exports are removed; modified obsolete exports survive and are reported', t => {
  const { base } = fixture(t), source = path.join(base, 'source'), out = path.join(base, 'export');
  fs.cpSync(ROOT, source, { recursive: true, filter: file => !/[/\\](node_modules|dist|\.git)([/\\]|$)/.test(file) });
  exportM365(out, source);
  const catalogFile = path.join(source, 'catalog.json'), manifest = JSON.parse(fs.readFileSync(catalogFile));
  manifest.skills.find(skill => skill.name === 'ms-retro').m365 = false;
  manifest.skills.find(skill => skill.name === 'ms-docs').m365 = false;
  fs.writeFileSync(catalogFile, JSON.stringify(manifest));
  const profilesFile = path.join(source, 'adapters/m365/profiles.json'), profiles = JSON.parse(fs.readFileSync(profilesFile));
  for (const profile of profiles) profile.skills = profile.skills.filter(name => !['ms-retro', 'ms-docs'].includes(name));
  fs.writeFileSync(profilesFile, JSON.stringify(profiles));
  fs.appendFileSync(path.join(out, 'skills/ms-docs.zip'), 'User-edited archive');
  const result = exportM365(out, source);
  assert.equal(fs.existsSync(path.join(out, 'skills/ms-retro.zip')), false);
  assert.ok(fs.existsSync(path.join(out, 'skills/ms-docs.zip')));
  assert.deepEqual(result.keptModifiedObsoleteFiles, ['skills/ms-docs.zip']);
});

test('standard Python ZIP reader independently validates all exports and their UTF-8 entrypoints', t => {
  try { execFileSync('python', ['--version'], { windowsHide: true }); } catch { t.skip('Python unavailable; run independent ZIP verification in release environment'); return; }
  const { base } = fixture(t), out = path.join(base, 'export'); exportM365(out);
  const script = 'import pathlib,zipfile,sys\nfiles=list(pathlib.Path(sys.argv[1]).glob("skills/*.zip"))\nassert len(files)==15\nfor f in files:\n with zipfile.ZipFile(f) as z:\n  assert z.testzip() is None\n  assert "SKILL.md" in z.namelist()\n  assert all(not n.startswith("/") and ".." not in n.split("/") for n in z.namelist())\n  assert z.read("SKILL.md").decode("utf-8").startswith("---\\nname:")\n';
  execFileSync('python', ['-c', script, out], { windowsHide: true });
});

test('CLI rejects ambiguous or ignored arguments', async () => {
  await assert.rejects(main(['install', '--personal', '--project', '.'], () => {}), /exactly one/);
  await assert.rejects(main(['list', '--history'], () => {}), /not supported/);
  await assert.rejects(main(['validate', '--', 'node'], () => {}), /Only check/);
  await assert.rejects(main(['install', '--pak', 'all'], () => {}), /Unknown option/);
});
