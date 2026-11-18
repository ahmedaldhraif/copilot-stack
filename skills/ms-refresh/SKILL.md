---
name: "ms-refresh"
description: "Check current Microsoft and GitHub capabilities for the active app session, then update affected local toolkit guidance when evidence shows drift."
license: "MIT"
---

# Keep the toolkit current for the app being built

At the beginning of each substantive build, review or release session, identify
the host, harness, SDK, service and feature on the critical path. Read the
repository manifests, selected environment and installed tool version. Check
current Microsoft Learn or official product documentation, GitHub Docs or the
publisher's release notes for those exact capabilities. Recheck when the
workflow switches host or encounters behavior that contradicts the guidance.

## Determine applicability

Compare documented availability with the installed version, release channel,
tenant rollout, region, license and permission prerequisites relevant to the
task. A generally available API and a preview authoring interface can have
different support boundaries. Trace a headline announcement to its
implementation reference. For command syntax, compare the official reference
with the installed tool's help before recommending or running it.

Record a concise evidence row for each consequential claim. Include the feature,
source URL, UTC date checked, applicable host/version, local observation and
impact on the current decision. Distinguish page publication from verification
date. If browsing or host access fails, label the corresponding claim unverified
and continue work that does not depend on it. Never infer live availability from
a documentation timestamp.

## Improve the canonical toolkit

Change the toolkit when a documented compatibility shift, observed failure or
repeated evaluation gap affects an existing workflow. Identify the narrowest
affected skill, adapter, profile or test. Reuse the canonical workflow for all
supported hosts and describe real host differences where they matter. Prefer a
focused change with a reproduction to a new near-duplicate command.

Inspect the worktree and ownership before editing. Preserve personalized
instructions and user-managed files. In an authorized toolkit maintenance
session, update canonical sources and their tests, then regenerate affected
artifacts. In an app-only checkout, record the proposed toolkit change and its
evidence in the handoff. Use a separate, authorized update to change installed
copies.

## Check the result

Run catalog and package validation, affected behavioral tests and a
representative prompt or host smoke when available. Check that older supported
inputs and unchanged customizations still work. Record the source, change, test
result and outstanding host verification in the project's change history. If the
evidence supports the existing workflow, record the check without manufacturing
a code change.

Return the applicable baseline, any material difference, and what was updated or
remains pending. This is a session workflow. A background schedule, remote
update, rollout or model selection requires its own configuration and explicit
scope.

[Microsoft .NET release notes](https://learn.microsoft.com/en-us/dotnet/core/whats-new/)
