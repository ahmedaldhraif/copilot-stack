import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { git } from '../lib/project.mjs';

export function fixture(t) {
  const tempRoot = fs.realpathSync.native(os.tmpdir());
  const base = fs.mkdtempSync(path.join(tempRoot, 'copilot-stack-test-'));
  t.after(() => {
    const resolved = path.resolve(base), expectedParent = tempRoot;
    assert.equal(path.dirname(resolved), expectedParent);
    assert.ok(path.basename(resolved).startsWith('copilot-stack-test-'));
    fs.rmSync(resolved, { recursive: true, force: true });
  });
  const project = path.join(base, 'app'); fs.mkdirSync(project);
  git(project, ['init', '--quiet']);
  fs.writeFileSync(path.join(project, 'app.mjs'), 'export const answer = 42;\n');
  fs.writeFileSync(path.join(project, '.gitignore'), '.copilot-stack/\n.env*\nignored.txt\n');
  git(project, ['add', '.']);
  git(project, ['-c', 'user.name=Test Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '--quiet', '-m', 'fixture']);
  return { base, project };
}

export function tree(directory) {
  if (!fs.existsSync(directory)) return {};
  const result = {};
  function visit(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name === '.git') continue;
      const file = path.join(current, entry.name);
      if (entry.isSymbolicLink()) result[path.relative(directory, file)] = `LINK:${fs.readlinkSync(file)}`;
      else if (entry.isDirectory()) visit(file);
      else result[path.relative(directory, file)] = fs.readFileSync(file).toString('base64');
    }
  }
  visit(directory);
  return result;
}

export function configureQuality(project, { required = ['functionality'] } = {}) {
  const file = path.join(project, '.copilot-stack/quality.json');
  const plan = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const gate of plan.gates) {
    gate.target = `Observed ${gate.id} acceptance for fixture`;
    gate.required = required.includes(gate.id);
    if (!gate.required) gate.reason = 'Outside this isolated recorder test';
  }
  fs.writeFileSync(file, JSON.stringify(plan, null, 2) + '\n');
  return plan;
}
