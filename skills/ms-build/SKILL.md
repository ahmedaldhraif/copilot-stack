---
name: "ms-build"
description: "Implement a planned app feature as an end-to-end working slice. Use when asked to code, build, fix or extend an app with GitHub Copilot."
license: "MIT"
---

# Build a real vertical slice

At the start of substantive Microsoft work, use ms-refresh to verify current
official feature support, host and SDK compatibility. Keep the evidence date.
For UI work, apply ms-native-ux to the real journey and shared components.
Before risky restructuring/migration, use ms-recovery to establish a recoverable
checkpoint and identify any separate data/configuration backup required.

Read repository instructions, the latest request, relevant source and any brief,
product/engineering plans. Inspect worktree status and preserve unrelated edits.
Infer routine implementation choices from the project; ask only for information
that materially blocks the intended result. A clear small task needs no ceremony.

Implement the smallest complete journey through the real UI/API/data layers.
Reuse the app's components, identity and error conventions. Keep fixture/mock
paths visibly separate from provider-backed paths. Never display a connected,
sent, saved or published success state without the relevant result.

Use the chosen platform specialist when it changes implementation decisions.
Check current official docs for uncertain APIs, preview features or changed
tooling. Respect the user's selected model; do not pin a model in app/agent
config without a requirement and evidence that it is available on that host.

Cover the consequential behavior with appropriate tests:

- The successful journey and the failure this change prevents.
- Permission/tenant boundaries, invalid input and retry/cancellation where relevant.
- Real persistence or provider contract, with mocks clearly identified.
- UI state and keyboard behavior when changing an interactive flow.

Run the repository's focused checks and required build. Fix failures caused by
the change, then verify the acceptance criteria. Broaden testing only when new
failures or uncertainty justify it. Avoid tests that merely assert copied text
or the structure of this implementation.

Report changed behavior, important file paths, commands/results and remaining
integration gaps. Update the plan only when the actual decision changed. Hand
the diff plus AC coverage to ms-review and ms-qa. Do not claim browser, tenant or
production verification from a passing local build. Complete all authorized
local work before requesting any still-needed release authorization.
