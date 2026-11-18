---
name: "ms-review"
description: "Review an app change for real correctness, security and production bugs. Use for a diff, branch or pull request review; defaults to read-only findings."
license: "MIT"
---

# Find bugs that can reach users

Default to read-only review. Fix mode requires a request to fix or authorization
already present in the task. Inspect worktree status, review base and full changed
paths; include staged/unstaged edits. Read callers, data model, auth middleware,
tests and deployment configuration where the changed behavior depends on them.

Trace product acceptance criteria through the implementation. Prioritize:

- A reachable wrong result, data loss, duplicate side effect or race.
- Missing ownership/tenant checks, unsafe permission or secret exposure.
- Partial failure, retry, cancellation and migration/rollback behavior.
- Provider/host contract mismatch, misleading success state or broken upgrade.
- A regression that existing tests cannot detect.

For a finding give severity, file:line, concrete triggering conditions, failure
mechanism, affected user and focused remedy. Distinguish reproducible evidence
from a hypothesis that needs a check. Drop style preferences and hypothetical
problems without a plausible code path. Do not invent a finding to fill a quota.

In fix mode, fix confirmed issues without overwriting unrelated work and run a
focused regression. Re-review the resulting diff; report remaining issues.
Do not silently replace a user's architectural choice to satisfy personal style.

Return findings first, then checked scope/base/revision, tests actually run,
limitations and readiness. If no findings, say so and retain the unverified areas.
Save a durable receipt to `docs/app/review.md` when a release handoff needs one.
New content changes invalidate earlier review/QA claims even with the same HEAD.

Tool restrictions are enforced by the host, not by this prose. Read-only agent
mode can help enforce a review boundary; a skill alone cannot enforce it.
