---
name: "ms-ship"
description: "Prepare and carry out an authorized app release with current checks, review, deployment plan and rollback. Use to ship a branch, prepare a PR, or verify release readiness."
license: "MIT"
---

# Ship the version that was actually verified

Determine the requested action: local release preparation, PR, staging deploy or
production release. Read repository instructions, CI/release process, current
branch/diff, existing PR and the user's authorization. Complete all preparatory
work before asking for any authorization that is still missing. Reuse approval
already given; do not request it again.

Bind readiness to the actual changed content, review base, environment and quality
targets. HEAD alone misses staged/unstaged/untracked edits. Reuse earlier evidence
only when it still matches; after code/config changes, rerun affected checks.
Do not claim a GitHub status, tenant test or deployment from local evidence.

Verify the required build/tests, AC coverage, review findings, real host journey,
security/tenant boundary, migration/recovery and release operations. For an
inapplicable gate record why. Unverified or failed critical gates stay visible;
do not average them into a high score or label a prototype production-ready.

Prepare `docs/app/release.md` with:

- User-visible change, source revision and artifact/version to release.
- Checks run, evidence, environment and remaining risks/gaps.
- Destination tenant/subscription/environment/slot and current identity.
- Ordered deploy/migration steps, smoke test, rollback trigger/owner and recovery.
- Expected operational signals and when/where to inspect them after release.

For GitHub, verify check results and reuse the intended PR only when in scope.
For Azure/Power Platform, validate target identity and use an available preview,
what-if or package validation before mutation. A preview does not deploy.

Perform only the release actions authorized by the user. Confirm their actual
result: PR URL, deployed version, host smoke and monitoring. If tools or access
are missing, deliver the complete reviewable release package and exact next
step, with the release marked unexecuted. A successful upload is not proof that
the audience can discover, install or use the app.
