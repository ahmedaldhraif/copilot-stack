---
name: "ms-plan-product"
description: "Define app scope, user journeys and testable acceptance criteria. Use for product planning, prioritization, or reviewing whether a proposed feature solves the user's problem."
license: "MIT"
---

# Make product intent testable

Read `docs/app/brief.md`, any platform decision, existing behavior and the latest
user constraints. If absent, use available context and label assumptions. Offer
expand, hold-scope or reduce options only when the decision warrants them;
preserve the chosen scope. Do not add a suite of features to a simple request.

Walk the primary journey from entry to completed outcome. Define the smallest
release that produces that outcome. Give each acceptance criterion a stable ID
such as AC-1, a persona, precondition, action and observable result. Include
empty, invalid, denied, canceled, loading, retry and partial-failure cases that
actually apply. Specify data retained and ownership after deletion/offboarding.

For Microsoft-hosted apps, include:

- Maker/admin versus end-user experience and install/share requirements.
- Correct account, tenant, role and environment at the point of action.
- Connector unavailable, consent denied, missing license and expired session.
- Mobile, keyboard and localization/RTL only where the audience needs them.
- What the user sees when an agent is uncertain or an action needs approval.

Write `docs/app/product-plan.md`: outcome, release/non-goals, journey, AC table,
open decisions, success signal, and validation method. Distinguish business
targets from existing measured results. Capture decisions with reasons instead
of repeating speculative questions in later stages.

Attach a practical ten-dimension quality plan: user value, functionality,
experience, accessibility, security/privacy, data integrity, reliability,
performance/cost, maintainability and operations. For each, specify a target and
how it can be observed. Unknown is unverified; a failed critical permission test
cannot average out against attractive screens.

Handoff: ms-plan-engineering receives the AC IDs and open decisions; design and
QA must use those same IDs. Planning does not authorize an unrequested production
deployment or external communication. Continue all local work already authorized.
