#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { pathToFileURL } from 'node:url';
import { catalog, VERSION } from '../lib/catalog.mjs';
import { install, uninstall } from '../lib/install.mjs';
import { validateAll } from '../lib/validate.mjs';
import { exportM365 } from '../lib/export.mjs';
import { doctor } from '../lib/doctor.mjs';
import { checkpoint, restoreCheckpoint } from '../lib/recovery.mjs';
import { initQuality, recordEvidence, runCheck, qualityStatus } from '../lib/quality.mjs';

const HELP = `Copilot Stack ${VERSION}

Personal app-building skills for GitHub Copilot and Microsoft tools.
Node.js 22+; runtime has no third-party dependencies.

  list                         Show installed-source skills and purposes
  validate                     Validate skills, resources, roles and M365 profiles
  install --project PATH       Copy skills into PATH/.github/skills
  install --personal           Copy skills into ~/.copilot/skills
    --pack core|microsoft|all   Default: all
    --agents --instructions    Optional project roles and shared instruction file
    --visual-studio            Optional prompt-file fallback for Visual Studio
    --dry-run                  Check every conflict without writing
  uninstall --project PATH     Remove unchanged managed files; preserve edits
  uninstall --personal         Remove the personal managed install
  export-m365 --out PATH        Reproducible skill ZIPs and agent setup recipes
  doctor [--project PATH]       Tool presence, without sign-in or changes
  checkpoint --project PATH --out NEW_PATH [--history]
                               Private source copy outside the project; no DB backup
  restore --from CHECKPOINT --to NEW_PATH
                               Verify hashes, restore source to a NEW directory
  init-quality --project PATH  Create ten unconfigured acceptance targets
  check --project PATH --id GATE [--timeout SECONDS] -- EXECUTABLE ARGS
                               Execute a check and record content-bound evidence
  record --project PATH --id GATE --result pass|fail --observed TEXT --artifact PATH
                               Record a labeled manual attestation (repeat --artifact)
  quality --project PATH       Report current/stale/missing evidence; exit 2 if incomplete

Use --json for structured output. No command publishes, signs in or changes global
settings. Copilot discovery and real Microsoft host/tenant use require live tests.
`;

const BOOLEAN = ['personal', 'agents', 'instructions', 'visual-studio', 'dry-run', 'history', 'json', 'help'];
const STRING = ['project', 'pack', 'out', 'from', 'to', 'id', 'result', 'observed', 'timeout'];
const ALLOWED = {
  list: [], validate: [], doctor: ['project'],
  install: ['project', 'personal', 'pack', 'agents', 'instructions', 'visual-studio', 'dry-run'],
  uninstall: ['project', 'personal', 'dry-run'], 'export-m365': ['out'],
  checkpoint: ['project', 'out', 'history'], restore: ['from', 'to'],
  'init-quality': ['project'], check: ['project', 'id', 'timeout'],
  record: ['project', 'id', 'result', 'observed', 'artifact'], quality: ['project']
};

export async function main(argv = process.argv.slice(2), write = value => console.log(value)) {
  if (!argv.length || ['--help', '-h', 'help'].includes(argv[0])) { write(HELP); return 0; }
  const command = argv[0];
  if (!Object.hasOwn(ALLOWED, command)) throw new Error(`Unknown command: ${command}. Use --help.`);
  const separator = argv.indexOf('--');
  const checkCommand = separator < 0 ? [] : argv.slice(separator + 1);
  if (separator >= 0 && command !== 'check') throw new Error('Only check accepts a command after --');
  const options = Object.fromEntries([...BOOLEAN.map(name => [name, { type: 'boolean' }]), ...STRING.map(name => [name, { type: 'string' }]), ['artifact', { type: 'string', multiple: true }]]);
  const { values, positionals } = parseArgs({ args: argv.slice(1, separator < 0 ? undefined : separator), options, strict: true, allowPositionals: true });
  if (positionals.length) throw new Error(`Unexpected arguments: ${positionals.join(' ')}`);
  if (values.help) { write(HELP); return 0; }
  for (const name of Object.keys(values)) if (!['json', 'help', ...ALLOWED[command]].includes(name)) throw new Error(`--${name} is not supported by ${command}`);
  if (['checkpoint', 'init-quality', 'check', 'record', 'quality'].includes(command) && !values.project) throw new Error('Provide --project with the Git repository root');
  let result, code = 0;
  switch (command) {
    case 'list': result = catalog().map(skill => ({ name: skill.name, pack: skill.pack, m365: skill.m365, description: skill.meta.description })); break;
    case 'validate': { const { summary, ...counts } = validateAll(); result = { valid: true, ...counts }; break; }
    case 'doctor': result = doctor(values.project); break;
    case 'install': result = install({ project: values.project, personal: values.personal, pack: values.pack, agents: values.agents, instructions: values.instructions, visualStudio: values['visual-studio'], dryRun: values['dry-run'] }); break;
    case 'uninstall': result = uninstall({ project: values.project, personal: values.personal, dryRun: values['dry-run'] }); break;
    case 'export-m365': result = exportM365(values.out); break;
    case 'checkpoint': result = checkpoint({ project: values.project, out: values.out, history: values.history }); break;
    case 'restore': result = restoreCheckpoint({ from: values.from, to: values.to }); break;
    case 'init-quality': result = initQuality(values.project); break;
    case 'check':
      result = await runCheck({ project: values.project, id: values.id, command: checkCommand, timeout: values.timeout === undefined ? 300 : Number(values.timeout), onOutput: values.json ? undefined : chunk => process.stdout.write(chunk) });
      code = result.receipt.result === 'pass' ? 0 : 1; break;
    case 'record': result = recordEvidence({ project: values.project, id: values.id, result: values.result, observed: values.observed, artifacts: values.artifact }); break;
    case 'quality': result = qualityStatus(values.project); code = result.readyAgainstRecordedTargets ? 0 : 2; break;
  }
  if (command === 'list' && !values.json) write(result.map(skill => `${skill.name.padEnd(25)} ${skill.description}`).join('\n'));
  else write(JSON.stringify(result, null, 2));
  return code;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { process.exitCode = await main(); }
  catch (error) { console.error(`Copilot Stack: ${error.message}`); process.exitCode = 1; }
}
