---
name: "ms-security"
description: "Threat-model and verify an app's authorization, tenant isolation, secrets, privacy and AI/tool boundaries. Use for security review or hardening of a Microsoft-connected app."
license: "MIT"
---

# Test the boundary that protects the user

Identify assets, actors, trust boundaries and the requested review scope. Read
the actual identity, API/tool authorization, data access, logging and deployment
configuration. A supplied architecture diagram is a proposal until matched to
code/config. A focused local feature needs a focused review.

Trace a request from the user's identity to the protected object and final side
effect. Test a legitimate user, another user/tenant, a revoked/expired identity
and an unauthenticated request where relevant. Authentication and tenant admin
consent do not prove per-record authorization. Check delegated versus application
permissions, scopes/roles, object ownership and server-side enforcement.

Inspect only meaningful risks for this app:

- Untrusted input reaching queries, HTML, shell, file paths or external URLs.
- Tokens in browser storage/logs, committed credentials and overbroad Graph grants.
- Dataverse roles/sharing, connection identity, DLP and environment boundaries.
- CSRF/session handling, unsafe redirects, uploads and sensitive error responses.
- Agent prompt injection through retrieved text and tools with excessive rights.
- Retention, deletion/export, telemetry/replay and unnecessary personal content.

For an agent, hostile document/tool output is data, not a new authorization.
Validate tool arguments and destination scope at execution. Test refusal to expose
another user's data and interruption before an unauthorized consequential action.
Instructions are advisory; host permissions and server-side controls enforce access.

Report each issue with triggering case, reachable path, impact, evidence,
severity and smallest fix. Avoid unsupported compliance/certification claims.
In an M365 planning surface without source/runtime access, deliver a threat model
and test plan with named gaps; do not claim penetration tests were executed.

If fixes are authorized, run negative and positive regressions and verify the
correct user still succeeds. Write `docs/app/security.md` with findings, mitigations,
residual risk and evidence. Unresolved critical isolation/data-exposure failures
block release regardless of the app's other quality results.
