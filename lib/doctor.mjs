import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { exists } from './fs-safe.mjs';
import { VERSION } from './catalog.mjs';

function onPath(name) {
  const extensions = process.platform === 'win32' ? ['', ...(process.env.PATHEXT || '.EXE;.CMD;.BAT').split(';')] : [''];
  for (const directory of (process.env.PATH || '').split(path.delimiter).filter(Boolean)) {
    for (const extension of extensions) {
      const file = path.join(directory.replace(/^"|"$/g, ''), name + extension);
      if (exists(file) && fs.statSync(file).isFile()) return file;
    }
  }
  return null;
}

export function doctor(project) {
  const tools = ['git', 'copilot', 'code', 'dotnet', 'az', 'pac', 'workiq', 'wiqd'].map(name => ({ name, path: onPath(name), status: onPath(name) ? 'found-unverified' : 'not-found-on-PATH' }));
  const personal = path.join(os.homedir(), '.copilot', 'skills');
  const installed = exists(personal) ? fs.readdirSync(personal).filter(name => name.startsWith('ms-') && exists(path.join(personal, name, 'SKILL.md'))).length : 0;
  return { toolkitVersion: VERSION, node: process.version, platform: process.platform, tools, personalSkills: installed,
    project: project ? path.resolve(project) : null,
    note: 'Tool presence only. No sign-in, license, tenant, connector, browser, debugger or feature support was verified. Install only the tools your chosen app needs.' };
}
