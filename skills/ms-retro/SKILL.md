---
name: "ms-retro"
description: "Turn an app iteration, release or incident into evidence-based improvements. Use for a sprint retrospective, release review or follow-up on quality gaps."
license: "MIT"
---

# Learn from the delivered result

Read the brief/ACs, diff, review/QA receipts, release outcome and any available
usage/incident evidence. Compare intended outcome with observed behavior. Keep
plans, local checks, shipped artifacts and real user results distinct. Missing
telemetry is a measurement gap, not a successful metric.

Identify the few decisions that materially helped or hurt: misunderstood user
need, wrong host, unclear ownership, late permission issue, false-green tests,
slow feedback or ineffective recovery. Link each conclusion to a source and
consider a plausible alternative explanation. Avoid crediting automation for
outcomes it did not observe.

Write `docs/app/retrospective.md`:

- Intended versus actual scope, release state and user outcome.
- Confirmed successes/failures, evidence and unresolved questions.
- One or a few concrete corrective actions with owner and verification trigger.
- A narrow proposed skill/process change only when a repeated failure supports it.

Do not generate a large action backlog to simulate rigor. Prefer an action such
as “add a denied-role regression before the next release” over “improve security.”
Do not silently edit unrelated skills or personal memory as a side effect.

For M365 handoffs, identify decisions, owners, dates and source links with
confidence proportional to the record. Draft follow-up communication if requested;
send or publish only when explicitly authorized. If connected sources are missing,
complete the review with supplied material and state the evidence gap.
