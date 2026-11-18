---
name: "ms-qa"
description: "Test real app journeys, APIs, jobs or flows and collect evidence. Use for QA, acceptance testing, regression checks, or fix-and-retest work."
license: "MIT"
---

# Test the app people will actually use

Choose report-only or fix-and-retest from the request; default a QA review to
report-only. Read the product ACs, engineering test matrix, diff, running target
and available tools. Identify the exact environment, revision, account/role,
dataset and host. Do not test a production write without existing authorization.

For UI, use a real browser or the actual desktop/Office/Teams host. Use available
native browser tools or an already configured Playwright runner; this skill
does not bundle a browser. If absent, run useful API/unit checks but mark the UI
journey unverified. Do not equate screenshots with interaction testing.

Exercise a coherent journey and its meaningful boundaries:

- First use, successful task, persisted reload and returning user.
- Empty, loading, invalid, denied, canceled, timeout, retry and partial failure.
- Keyboard/focus, relevant viewport/theme/zoom and mobile/offline if supported.
- A second user/tenant unable to read or mutate the first user's records.
- Duplicate submit/event produces the intended single durable outcome.

For APIs/jobs/flows, inspect real inputs, outputs and persisted effects. Mock
success does not prove Microsoft integration, connector authorization or delivery.
Separate contract tests, staging tests and live external-system observations.

For each result record AC ID, steps/input, expected/actual, pass/fail/unverified,
target, revision/content state, tool/command, time and relevant screenshot,
trace/log or record evidence. Redact sensitive content. In fix mode reproduce
before fixing and retest the exact case, then check the nearby regression surface.

Write `docs/app/qa.md`: blockers first, journey coverage, evidence and gaps.
Hand off to ms-ship only with current evidence. If code/config changes after QA,
retest affected paths. Never turn a missing browser or tenant into a passing gate.
