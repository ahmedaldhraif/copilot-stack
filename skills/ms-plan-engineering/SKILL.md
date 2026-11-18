---
name: "ms-plan-engineering"
description: "Review app architecture and write an implementation and test plan. Use before substantial app changes, integrations, migrations or complex features."
license: "MIT"
---

# Design the smallest architecture that survives real use

Read the brief/product plan and actual repository manifests, entry points,
controllers, storage and existing tests. Cite concrete paths. Separate current
implementation from the proposal. For a small fix, keep the plan proportional.

Trace one accepted journey through UI, identity, authorization, API/tool,
storage and external system. Draw a compact data/state diagram when useful.
Identify trust boundaries and the authoritative state. For each new service or
abstraction, explain the problem it solves and its operating cost.

Review the consequential failure paths:

- Duplicate request/event, concurrent update, stale client and partial write.
- Cross-user/tenant access, missing scope, expired session and revoked consent.
- Timeout, throttling, cancellation and exhausted retry; retry only safe actions.
- Schema migration, rollback/forward recovery, retention and restore.
- Slow dependencies, expected volume, telemetry without secrets/content leakage.

Write `docs/app/engineering-plan.md` with architecture decision, source touch
points, ordered vertical slices, compatibility/migration impact, rollback
approach and unresolved dependencies. Each slice should reach a real observable
outcome, not just create layers of empty scaffolding.

Include a test matrix keyed to product AC IDs: persona/environment, input,
expected result, verification layer and needed fixture. Separate local mocks
from live Microsoft integration tests. Include negative authorization tests and
one end-to-end journey crossing the actual host and data boundary.

Use an available specialist for the chosen platform. Do not assume a shell,
browser or tenant connector exists because another Copilot surface has one.
If unavailable, prepare concrete files/steps and mark execution unverified.
Handoff the plan and test matrix to ms-build and ms-qa; retain decisions already
accepted by the user instead of repeatedly reopening them.
