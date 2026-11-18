---
name: "ms-power-automate"
description: "Implement a Power Automate cloud flow with reliable triggers, connector identities, retries and environment-aware delivery."
license: "MIT"
---

# Build a recoverable cloud flow

Name the event, business outcome, owner, environment and systems that read or
change data. Select an automated, instant or scheduled flow based on how the
work begins. Identify a stable event or business key before adding actions.
Inspect existing solution-aware flows, connection references, environment
variables and ownership conventions. Determine the connection identity for each
step and whether the run-only user supplies a connection.

## Design for a second delivery

Filter events at the trigger when possible. If the flow updates its source,
identify the state transition that prevents it triggering itself again. Scope
concurrency to the business requirement and avoid a global single-worker
bottleneck merely to protect one record. For externally visible actions, use a
durable deduplication or reconciliation mechanism that handles overlapping runs
and an uncertain response. A variable inside one run cannot protect another run.

Group dependent steps in scopes and set run-after conditions for failure,
timeout and skipped actions where appropriate. Distinguish transient connector
errors from malformed input and denied access. Document which actions can retry
safely. Preserve enough status for the owner to resume an interrupted job
without repeating a completed notification, approval or write. Keep secrets and
sensitive payloads out of run-history exports.

## Validate the flow as deployed

Inspect the intended environment's connector policies, licenses, references,
time zone and service account ownership. Use a test input with a known expected
record change. Trigger the same event twice and inspect both run histories plus
the final downstream state. Exercise a failed dependency through a controlled
test connection or fixture. If the flow uses approvals, test timeout or stale
responses and the user's next step.

Deliver the trigger/action map, connection identities, configuration names,
retry boundaries and a redacted run reference per executed case. When only the
design or an exported definition is available, provide the expected state
transitions and an executable test recipe. Import, activation, connector binding
and observed downstream completion each require separate evidence.
