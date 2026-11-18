# What was learned from gstack

Upstream inspected: [garrytan/gstack](https://github.com/garrytan/gstack), commit
`33b1a965bacb9ae28ac9281a1a70cbd987e54c01`, checked 2026-11-18.
The reference checkout is outside this toolkit. No upstream runtime or skill
text is vendored into this distribution. Independently authored MIT source lives
here; upstream names and workflows are acknowledged as the inspiration.

| Upstream strength | Copilot Stack implementation |
| --- | --- |
| Role workflows through a whole sprint | One ms-app entry point selects relevant specialists and keeps the same journey/ACs |
| Product and engineering challenge before code | Brief, platform decision, stable acceptance criteria and failure/test matrix |
| Design plan plus live review | Native host/system selection, shared primitives, full states and rendered verification |
| Review plus QA with evidence | Reachable findings, report/fix modes, explicit browser/tenant gaps and content-bound receipts |
| Shipping with current checks | Release plan, current code/plan evidence, smoke, rollback and actual result |
| Reusable focused skills | Self-contained SKILL.md packages and resources; no model/runtime assumptions |
| Learning after delivery | Evidence-backed retro and focused source updates validated before reinstall |

Upstream already documents experimental `--host copilot`, installing namespaced
gstack skills and runtime assets. A basic Copilot port would duplicate that work.
This toolkit's specialization is Microsoft app paths, native/familiar design,
current feature checks, project setup/recovery and M365 planning handoffs.
[Host notes](https://github.com/garrytan/gstack/blob/main/docs/hosts.md)

This is not a byte-for-byte gstack fork or feature-parity claim. Its bundled
browser/runtime, enforced hooks, telemetry/automation choices and host-specific
release tooling are not implemented here. Native Copilot/browser tools or an
existing test runner supply execution. Local helper tests do not certify a
Copilot/Microsoft host. The smaller dependency-free runtime is a deliberate v1
scope, with limitations recorded rather than simulated.
