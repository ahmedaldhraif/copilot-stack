import fs from 'node:fs';
import path from 'node:path';
import { ROOT, VERSION } from '../lib/catalog.mjs';
import { atomicWrite, filesUnder, sha256 } from '../lib/fs-safe.mjs';
import { validateAll } from '../lib/validate.mjs';
import { exportM365 } from '../lib/export.mjs';
import { makeZip } from '../lib/zip.mjs';

validateAll();
exportM365(path.join(ROOT, 'dist/m365'));
const roots = ['package.json', 'README.md', 'AGENTS.md', 'LICENSE', 'NOTICE.md', 'catalog.json', 'sources.json', '.gitignore', '.gitattributes'];
const folders = ['bin', 'lib', 'skills', 'adapters', 'docs', 'templates', 'tests', 'scripts', '.github/workflows', 'dist/m365'];
const entries = roots.map(relative => ({ path: `copilot-stack/${relative}`, data: fs.readFileSync(path.join(ROOT, relative)) }));
for (const folder of folders) for (const file of filesUnder(path.join(ROOT, folder))) entries.push({ path: `copilot-stack/${folder}/${file.path}`, data: file.data });
const bytes = makeZip(entries), name = `copilot-stack-${VERSION}.zip`, file = path.join(ROOT, 'dist', name);
atomicWrite(file, bytes);
atomicWrite(`${file}.sha256`, `${sha256(bytes)}  ${name}\n`);
console.log(JSON.stringify({ file, bytes: bytes.length, entries: entries.length, sha256: sha256(bytes) }, null, 2));
