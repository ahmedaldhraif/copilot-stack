# Validation record

Executed 2026-11-18 on Windows with Node.js v24.11.1, Git 2.52.0.windows.1 and
Python 3.14. Static validation, filesystem behavior, model walkthroughs and live
host execution are separate evidence.

| Check | Observed result |
| --- | --- |
| Canonical catalog and self-contained resources | 34 skills: 19 core and 15 Microsoft; valid names, descriptions and local references |
| Skill Creator validator | All 34 passed using Python UTF-8 mode |
| Full local behavioral suite | 38 passed, 0 failed, 0 skipped; final run approximately 15.5 seconds |
| Installer | Repeat install, local upgrade, late collision, rollback, edited/unowned preservation, lock and Windows junction checks passed |
| Export | 15 M365 packages and 4 profiles validated; maximum 8 skills per profile |
| ZIP format | Python's standard ZIP reader independently verified every M365 ZIP, CRC and root UTF-8 SKILL.md |
| Determinism | Repeated unchanged M365 export produced identical bytes |
| Evidence | Code/index/untracked changes, target changes, artifact edits and age invalidate earlier passing receipts |
| Command recorder | Missing executable, failed result, timeout and source mutation cannot publish a pass |
| Recovery | Source round-trip, real Git bundle, hash/path validation, new-target enforcement and Windows aliases passed |
| Recovery failure | Moving worktree after history creation removes partial backup output |
| Script modes | Git executable intent recorded; Windows cannot exercise a POSIX execution-mode runtime |
| Astra independent review | Initial 35-test suite passed independently; installer/export/recovery findings were corrected and covered by regressions |
| Astra design walkthrough | Existing Fluent Teams app retains brand, records and permissions; relevant motion is adapted; missing browser/tenant proof stays visible |
| Astra enterprise walkthrough | Eight-skill profile preserves authorized source scope, explicit delegation, actual tools and licensing uncertainty |
| v0.1.1 hosted-editor walkthroughs | In two simulated maker requests, Astra gave a copy-ready form change and an isolated record check, left an unsupported bundling claim unverified, and included the resource inventory when explicitly asked for a full audit. No tenant app was edited in these trials. |

The CI matrix exercises the helper CLI on Windows, Linux and macOS with Node 22
and 24. Individual job results are available in [GitHub Actions](https://github.com/ahmedaldhraif/copilot-stack/actions/workflows/check.yml).
The model walkthroughs evaluated the written instructions. Live-host checks are listed below.

Live GitHub Copilot invocation, Visual Studio fallback invocation, M365 upload,
Work IQ identity/retrieval/actions, Copilot Studio authoring and tenant policy
checks are unverified. No Microsoft enterprise license, consent, connection or
service was configured. A generated app's real browser/desktop journey and user
outcome need their own evidence; this task built the toolkit.

The reference sites were researched in a real browser, including relevant live
demo interactions. Those observations do not certify every component or a future
app. See DESIGN-RESOURCES.md and SOURCES.md for scope and provenance.
