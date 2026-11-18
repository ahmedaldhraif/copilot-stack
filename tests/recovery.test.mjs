import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { checkpoint, restoreCheckpoint } from '../lib/recovery.mjs';
import { git, projectRoot } from '../lib/project.mjs';
import { fixture, tree } from './helpers.mjs';

test('Windows short/long aliases resolve to the same actual Git root', t => {
  const { project } = fixture(t);
  const canonical = fs.realpathSync.native(project);
  const alias = process.platform === 'win32' ? path.join(os.tmpdir(), path.relative(fs.realpathSync.native(os.tmpdir()), project)) : project;
  assert.equal(projectRoot(alias), canonical);
});

test('checkpoint round-trip restores current tracked/untracked source without touching original', t => {
  const { base, project } = fixture(t);
  fs.writeFileSync(path.join(project, 'draft.txt'), 'Unsaved-to-Git work');
  fs.appendFileSync(path.join(project, 'app.mjs'), '\n// uncommitted implementation\n');
  fs.writeFileSync(path.join(project, '.env.local'), 'SECRET=private');
  fs.writeFileSync(path.join(project, 'ignored.txt'), 'Ignored asset');
  fs.writeFileSync(path.join(project, 'credentials.json'), '{"private":true}');
  const before = tree(project), out = path.join(base, 'checkpoint');
  const result = checkpoint({ project, out });
  assert.equal(result.applicationDataBackedUp, false);
  assert.ok(result.skipped.some(item => item.path === 'credentials.json'));
  assert.deepEqual(tree(project), before);
  assert.equal(fs.existsSync(path.join(out, 'files/.env.local')), false);
  assert.equal(fs.existsSync(path.join(out, 'files/ignored.txt')), false);
  const to = path.join(base, 'recovered');
  assert.equal(restoreCheckpoint({ from: out, to }).applicationDataRestored, false);
  assert.equal(fs.readFileSync(path.join(to, 'draft.txt'), 'utf8'), 'Unsaved-to-Git work');
  assert.equal(fs.readFileSync(path.join(to, 'app.mjs'), 'utf8'), fs.readFileSync(path.join(project, 'app.mjs'), 'utf8'));
  assert.equal(fs.existsSync(path.join(to, '.git')), false);
});

test('checkpoint cannot be created inside the app or overwrite an existing backup', t => {
  const { base, project } = fixture(t);
  assert.throws(() => checkpoint({ project, out: path.join(project, 'backup') }), /outside/);
  const out = path.join(base, 'backup'); checkpoint({ project, out });
  const before = tree(out);
  assert.throws(() => checkpoint({ project, out }), /already exists/);
  assert.deepEqual(tree(out), before);
});

test('restore rejects existing destination and invalid bytes before writing anything', t => {
  const { base, project } = fixture(t), out = path.join(base, 'backup'); checkpoint({ project, out });
  const before = tree(project);
  assert.throws(() => restoreCheckpoint({ from: out, to: project }), /new directory/);
  assert.deepEqual(tree(project), before);
  fs.appendFileSync(path.join(out, 'files/app.mjs'), 'corruption');
  const to = path.join(base, 'recovered');
  assert.throws(() => restoreCheckpoint({ from: out, to }), /integrity/);
  assert.equal(fs.existsSync(to), false);
});

test('tampered recovery paths cannot escape the restore target', t => {
  const { base, project } = fixture(t), out = path.join(base, 'backup'); checkpoint({ project, out });
  const manifestFile = path.join(out, 'checkpoint.json');
  const manifest = JSON.parse(fs.readFileSync(manifestFile)); manifest.files[0].path = '../outside.txt'; fs.writeFileSync(manifestFile, JSON.stringify(manifest));
  assert.throws(() => restoreCheckpoint({ from: out, to: path.join(base, 'recovered') }), /Unsafe checkpoint/);
  assert.equal(fs.existsSync(path.join(base, 'outside.txt')), false);
});

test('history backup is a real verifiable Git bundle and source restore does not replay it', t => {
  const { base, project } = fixture(t), out = path.join(base, 'history-backup');
  assert.equal(checkpoint({ project, out, history: true }).history, true);
  const bundle = path.join(out, 'history.bundle');
  assert.match(git(project, ['bundle', 'list-heads', bundle]), /refs\/heads\//);
  git(project, ['bundle', 'verify', bundle]);
  const to = path.join(base, 'recovered');
  assert.equal(restoreCheckpoint({ from: out, to }).historyBundle, true);
  assert.equal(fs.existsSync(path.join(to, '.git')), false);
});

test('restore refuses a junction/symlink destination ancestor', t => {
  const { base, project } = fixture(t), out = path.join(base, 'backup'); checkpoint({ project, out });
  const outside = path.join(base, 'outside'); fs.mkdirSync(outside);
  const link = path.join(base, 'link'); fs.symlinkSync(outside, link, process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => restoreCheckpoint({ from: out, to: path.join(link, 'restored') }), /symbolic link or junction/);
  assert.deepEqual(fs.readdirSync(outside), []);
});

test('moving source after a history bundle is created leaves no partial backup', t => {
  const { base, project } = fixture(t), out = path.join(base, 'moving-backup');
  assert.throws(() => checkpoint({ project, out, history: true, onBeforeVerify: () => fs.appendFileSync(path.join(project, 'app.mjs'), '\n// moving worktree') }), /changed while checkpointing/);
  assert.equal(fs.existsSync(out), false);
});

test('checkpoint preserves Git executable intent for scripts', t => {
  const { base, project } = fixture(t), out = path.join(base, 'script-backup');
  fs.writeFileSync(path.join(project, 'build.sh'), '#!/bin/sh\nexit 0\n');
  git(project, ['add', 'build.sh']); git(project, ['update-index', '--chmod=+x', 'build.sh']);
  if (process.platform !== 'win32') fs.chmodSync(path.join(project, 'build.sh'), 0o755);
  checkpoint({ project, out });
  const manifest = JSON.parse(fs.readFileSync(path.join(out, 'checkpoint.json')));
  assert.ok(manifest.files.find(file => file.path === 'build.sh').mode & 0o111);
  const to = path.join(base, 'restored-scripts'); restoreCheckpoint({ from: out, to });
  if (process.platform !== 'win32') assert.ok(fs.statSync(path.join(to, 'build.sh')).mode & 0o111);
});
