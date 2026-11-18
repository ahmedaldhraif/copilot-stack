import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT } from '../lib/catalog.mjs';
import { sha256 } from '../lib/fs-safe.mjs';
import { fixture } from './helpers.mjs';

test('release ZIP is identical with private notes and modified obsolete exports present', async t => {
  const { base } = fixture(t);
  const source = path.join(base, 'source');
  fs.cpSync(ROOT, source, { recursive: true, filter: file => !['.git', 'dist', 'node_modules'].includes(path.basename(file)) });
  const pack = cwd => JSON.parse(execFileSync(process.execPath, ['scripts/package.mjs'], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
  const archive = pack(source).file;
  const baseline = fs.readFileSync(archive);
  const output = path.join(source, 'dist/m365');
  const manifestFile = path.join(output, '.export-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestFile));
  const obsolete = 'profiles/retired.json';
  manifest.files[obsolete] = sha256('original');
  fs.writeFileSync(manifestFile, JSON.stringify(manifest));
  fs.writeFileSync(path.join(output, obsolete), 'private edits');
  fs.writeFileSync(path.join(output, 'notes.txt'), 'private notes');
  pack(source);
  assert.equal(sha256(fs.readFileSync(archive)), sha256(baseline));
  assert.equal(fs.readFileSync(path.join(output, obsolete), 'utf8'), 'private edits');
  assert.equal(fs.readFileSync(path.join(output, 'notes.txt'), 'utf8'), 'private notes');
  assert.equal(JSON.parse(fs.readFileSync(manifestFile)).files[obsolete], manifest.files[obsolete]);

  fs.appendFileSync(path.join(output, 'INSTALL.md'), 'local edit');
  assert.throws(() => pack(source), /Export conflict/);
  assert.equal(sha256(fs.readFileSync(archive)), sha256(baseline));

  await t.test('extracted toolkit reproduces its full release archive', subtest => {
    try { execFileSync('python', ['--version'], { windowsHide: true }); }
    catch { return subtest.skip('Python unavailable for independent ZIP extraction'); }
    const extraction = path.join(base, 'extracted');
    execFileSync('python', ['-m', 'zipfile', '-e', archive, extraction], { windowsHide: true });
    const toolkit = path.join(extraction, 'copilot-stack');
    const manifest = JSON.parse(fs.readFileSync(path.join(toolkit, 'dist/m365/.export-manifest.json')));
    assert.equal(Object.hasOwn(manifest.files, 'profiles/retired.json'), false);
    const rebuilt = pack(toolkit).file;
    assert.equal(sha256(fs.readFileSync(rebuilt)), sha256(baseline));
  });
});
