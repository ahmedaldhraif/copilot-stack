import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { install, uninstall } from '../lib/install.mjs';
import { ROOT } from '../lib/catalog.mjs';
import { fixture, tree } from './helpers.mjs';

test('project install is complete, repeatable and preserves existing instructions', t => {
  const { project } = fixture(t);
  fs.mkdirSync(path.join(project, '.github'));
  fs.writeFileSync(path.join(project, '.github/copilot-instructions.md'), 'User-owned instructions');
  const first = install({ project, agents: true, instructions: true, visualStudio: true });
  assert.equal(first.skills, 34);
  assert.equal(fs.readFileSync(path.join(project, '.github/copilot-instructions.md'), 'utf8'), 'User-owned instructions');
  const before = tree(project);
  assert.equal(install({ project, agents: true, instructions: true, visualStudio: true }).changedFiles, 0);
  assert.deepEqual(tree(project), before);
  const prompt = fs.readFileSync(path.join(project, '.github/prompts/ms-app-vs.prompt.md'), 'utf8');
  assert.ok(prompt.includes('../skills/ms-app/SKILL.md'));
});

test('a late collision leaves all earlier planned files untouched', t => {
  const { project } = fixture(t);
  const destination = path.join(project, '.github/skills/ms-m365-handoff');
  fs.mkdirSync(destination, { recursive: true });
  fs.writeFileSync(path.join(destination, 'SKILL.md'), 'My existing skill');
  const before = tree(project);
  assert.throws(() => install({ project }), /Conflict/);
  assert.deepEqual(tree(project), before);
});

test('dry-run writes nothing, including state and lock directories', t => {
  const { project } = fixture(t), before = tree(project);
  const result = install({ project, dryRun: true });
  assert.ok(result.changedFiles > 0);
  assert.deepEqual(tree(project), before);
  assert.equal(fs.existsSync(path.join(project, '.copilot-stack')), false);
});

test('edited owned files stop updates; uninstall preserves them and new siblings', t => {
  const { project } = fixture(t);
  install({ project });
  const skill = path.join(project, '.github/skills/ms-app');
  fs.appendFileSync(path.join(skill, 'SKILL.md'), '\nPersonalized instruction.\n');
  fs.writeFileSync(path.join(skill, 'my-notes.txt'), 'Keep my notes');
  const before = tree(project);
  assert.throws(() => install({ project }), /Conflict/);
  assert.deepEqual(tree(project), before);
  const result = uninstall({ project });
  assert.deepEqual(result.kept, ['.github/skills/ms-app/SKILL.md']);
  assert.ok(fs.existsSync(path.join(skill, 'SKILL.md')));
  assert.equal(fs.readFileSync(path.join(skill, 'my-notes.txt'), 'utf8'), 'Keep my notes');
  assert.equal(fs.existsSync(path.join(project, '.github/skills/ms-qa/SKILL.md')), false);
});

test('upgrade applies canonical changes without adopting unmanaged files', t => {
  const { base, project } = fixture(t);
  const source = path.join(base, 'source');
  fs.cpSync(ROOT, source, { recursive: true, filter: file => !/[/\\](node_modules|dist|\.git)([/\\]|$)/.test(file) });
  install({ project, source });
  fs.appendFileSync(path.join(source, 'skills/ms-app/SKILL.md'), '\nA verified canonical improvement.\n');
  assert.equal(install({ project, source }).changedFiles, 2);
  assert.match(fs.readFileSync(path.join(project, '.github/skills/ms-app/SKILL.md'), 'utf8'), /verified canonical improvement/);
});

test('personal installation uses only its named home and uninstalls cleanly', t => {
  const { base } = fixture(t), home = path.join(base, 'home'); fs.mkdirSync(home);
  assert.equal(install({ personal: true, home }).skills, 34);
  assert.ok(fs.existsSync(path.join(home, '.copilot/skills/ms-app/SKILL.md')));
  assert.equal(install({ personal: true, home }).changedFiles, 0);
  assert.equal(uninstall({ personal: true, home }).kept.length, 0);
  assert.equal(fs.existsSync(path.join(home, '.copilot/skills/ms-app')), false);
});

test('ordinary failure rolls back newly installed files and removes staged files', t => {
  const { project } = fixture(t), before = tree(project);
  assert.throws(() => install({ project, onWrite: index => { if (index === 5) throw new Error('Injected disk failure'); } }), /Injected disk failure/);
  assert.deepEqual(tree(project), before);
});

test('failure during an upgrade restores all previous bytes', t => {
  const { base, project } = fixture(t), source = path.join(base, 'source');
  fs.cpSync(ROOT, source, { recursive: true, filter: file => !/[/\\](node_modules|dist|\.git)([/\\]|$)/.test(file) });
  install({ project, source });
  const before = tree(project);
  for (const name of ['ms-app', 'ms-build']) fs.appendFileSync(path.join(source, `skills/${name}/SKILL.md`), '\nNew canonical content.\n');
  assert.throws(() => install({ project, source, onWrite: index => { if (index === 1) throw new Error('Publish failure'); } }), /Publish failure/);
  assert.deepEqual(tree(project), before);
});

test('junction/symlink ancestors cannot redirect an installation', t => {
  const { base, project } = fixture(t), outside = path.join(base, 'outside'); fs.mkdirSync(outside);
  fs.symlinkSync(outside, path.join(project, '.github'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => install({ project }), /symbolic link or junction/);
  assert.deepEqual(fs.readdirSync(outside), []);
});

test('tampered state cannot target a file outside the managed namespace', t => {
  const { project } = fixture(t);
  install({ project });
  const file = path.join(project, '.copilot-stack/install.json');
  const state = JSON.parse(fs.readFileSync(file));
  state.files['.github/skills/ms-a/../../copilot-instructions.md'] = 'a'.repeat(64);
  fs.writeFileSync(file, JSON.stringify(state));
  const before = tree(project);
  assert.throws(() => uninstall({ project }), /Invalid managed path/);
  assert.deepEqual(tree(project), before);
});

test('held installer lock is respected and never silently cleared', t => {
  const { project } = fixture(t);
  fs.mkdirSync(path.join(project, '.copilot-stack'));
  fs.writeFileSync(path.join(project, '.copilot-stack/install.lock'), 'Other process');
  assert.throws(() => install({ project }), /Installer locked/);
  assert.equal(fs.readFileSync(path.join(project, '.copilot-stack/install.lock'), 'utf8'), 'Other process');
});
