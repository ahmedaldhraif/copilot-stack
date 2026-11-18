# All 34 Copilot Stack skills

A skill is the full set of instructions for a job. Each entry below pairs the original instructions with a shorter prompt for an app editor that accepts ordinary chat.

**Using Microsoft App Builder?** Pick the task closest to what you want. Copy the text in its box, replace the words in brackets, and paste it into the conversation for your app. For a new app, start with **Build one working flow**. For an existing screen, start with **Make a screen easier to use**. Ask for one change you can try in preview.

The full instructions hold the detailed workflow and checks. You can also give the relevant sections to an assistant helping you prepare a more detailed prompt. A prompt uses the editor's existing capabilities. Work that needs source files, a terminal, an administrator, or an additional service can produce a handoff for whoever has that access.

| I want to… | Open this section |
| --- | --- |
| Decide what to build or improve a screen | [Plan and design an app](#plan-and-design-an-app) |
| Use company knowledge or prepare enterprise rollout | [Use Microsoft work context](#use-microsoft-work-context) |
| Add a feature, fix a problem or recover work | [Build and maintain](#build-and-maintain) |
| Verify quality, permissions, accessibility or speed | [Check the app](#check-the-app) |
| Prepare a release or explain it to others | [Release and hand over](#release-and-hand-over) |
| Build for Power Apps, Teams, Azure or another host | [Work with a Microsoft platform](#work-with-a-microsoft-platform) |

## Plan and design an app

### Build one working flow

[Full instructions · ms-app](../skills/ms-app/SKILL.md)

```text
Build or improve [app] so [user] can complete [task] and see [result].
Start with one working flow. Preserve existing business rules and use the
editor’s own controls. Try the action in preview with fictional data in an
isolated test target. Report what you observed. If you can only advise,
return one paste-ready editor prompt and a manual check.
```

### Decide what is worth building

[Full instructions · ms-office-hours](../skills/ms-office-hours/SKILL.md)

```text
Use [notes or current workflow] to write a one-page brief for [user].
Describe the last documented instance of [problem], the workaround and the
outcome the user wanted. Compare the smallest useful app with a change to
the existing workflow. Recommend a first release, name what can wait and
propose a quick test of the riskiest assumption.
```

### Define what the first release must do

[Full instructions · ms-plan-product](../skills/ms-plan-product/SKILL.md)

```text
Turn [brief] into a product plan for [audience]. Walk through the main
task from entry to completion. Define the first release and its non-goals.
Give each acceptance check a stable ID, user role, starting condition,
action and visible result. Cover relevant denied-access and recovery
cases. Name a success signal, how to measure it and any decisions still
open.
```

### Choose where the app should run

[Full instructions · ms-app-route](../skills/ms-app-route/SKILL.md)

```text
Recommend a Microsoft host for [workflow] given [audience, devices,
existing stack and constraints]. Compare viable options by data access,
licensing, maintenance and deployment. Check current Microsoft guidance
where available and flag unverified prerequisites. Name the primary host,
supporting services and the first end-to-end experiment. Specify whose
account to use and what observed result would support the choice.
```

### Plan the implementation and its tests

[Full instructions · ms-plan-engineering](../skills/ms-plan-engineering/SKILL.md)

```text
Using [product plan] and [repository or supplied code], trace one accepted
journey through the interface, identity checks and data store. Cite
existing file paths where available. List implementation steps that each
produce a testable result, then explain how to recover from a partial
write or failed rollout. Map acceptance IDs to local and live tests,
including a denied-access case.
```

### Make a screen easier to use

[Full instructions · ms-native-ux](../skills/ms-native-ux/SKILL.md)

```text
Improve [screen] so [user] can complete [task] using familiar controls.
Keep the existing branding and business rules. Make the primary action
clear, show progress while it runs and preserve input on failure. Try the
journey with a keyboard and at a narrow width. Report the visible result,
or supply a paste-ready edit and preview checks if editing is unavailable.
```

### Find where users get stuck

[Full instructions · ms-design-review](../skills/ms-design-review/SKILL.md)

```text
Review [screen or flow] for someone trying to [task]. Follow the journey
in order, from finding the first action through completion and recovery.
Return a ranked list with the screen, state, evidence, user impact and one
precise fix per finding. Keep the review read-only. Identify which
keyboard, narrow-screen or permission behaviors still need a live check.
```

## Use Microsoft work context

### Check whether a workflow is ready for rollout

[Full instructions · ms-enterprise](../skills/ms-enterprise/SKILL.md)

```text
Review [workflow] for rollout to [tenant and audience]. Trace a normal
user, an operator and an excluded user through the data and connectors.
Return a control matrix naming the executing identity, effective
permission, owner and evidence for each check. Include capacity and
recovery targets, a rollback trigger and release blockers. Mark checks
that still require an administrator or a live test.
```

### Find the decisions behind a project with Work IQ

[Full instructions · ms-work-iq](../skills/ms-work-iq/SKILL.md)

```text
Answer [business question] for [reader] using only [permitted work
sources] within [date range]. List decisions, owners and unresolved
conflicts with dated citations the reader can open. Label inferences and
record what you searched. If a source is inaccessible, identify the gap
and give the authorized reader a focused query to run. Keep this request
read-only.
```

### Prepare a Microsoft 365 plugin with Work IQ Dev Tools

[Full instructions · ms-wiqd](../skills/ms-wiqd/SKILL.md)

```text
Build [Microsoft 365 plugin capability] for [target host] using [project].
Check the existing manifest and installed Work IQ Dev Tools version.
Validate locally, package the plugin and inspect its archive for broken
references and credentials. Return the artifact, digest, validation result
and pending host checks. If this editor lacks authoring tools, provide a
coding-host handoff with proposed files and verification steps.
```

## Build and maintain

### Check whether a feature is available here

[Full instructions · ms-refresh](../skills/ms-refresh/SKILL.md)

```text
Check whether [feature] is available for [app editor, version and
environment]. Compare current official documentation with what the maker
can see in the editor. Return the source link, date checked, prerequisites
and effect on our plan. If browsing or tenant access is unavailable, mark
the claim unverified and give the exact setting or test the maker should
check.
```

### Set up a repeatable way to test the app

[Full instructions · ms-dev-setup](../skills/ms-dev-setup/SKILL.md)

```text
Help [maker or developer] run and debug [journey] in [host]. Start with
the supplied project or editor settings. List prerequisites, the launch or
preview steps, where to inspect the first error, and what a successful
test looks like. In a hosted editor, identify the available monitor or
trace. Label steps that still need someone with workstation or tenant
access.
```

### Build one feature from start to finish

[Full instructions · ms-build](../skills/ms-build/SKILL.md)

```text
Add [feature] so [role] can complete [task] in [app]. Reuse the existing
controls and data source. Show success after the change is saved, and
explain how the user can recover from a failed save. Use the available
editor tools. For any unavailable step, give the maker the control,
property or setting to change. Finish with a save-and-reopen test.
```

### Find out why a task fails

[Full instructions · ms-investigate](../skills/ms-investigate/SKILL.md)

```text
Investigate why [action] produces [observed result] in [app and
environment]. Use [redacted error or trace] and the last known working
example to locate the first failing step. Give the smallest test that
distinguishes the likely causes. Return the evidence, a focused fix if
supported, and the same test to repeat afterward. Flag any cause that
still needs a maker to confirm it.
```

### Plan a recovery and check the restored copy

[Full instructions · ms-recovery](../skills/ms-recovery/SKILL.md)

```text
Prepare a recovery plan for [app and data source] using [last known good
time]. Inventory the app version, records, attachments, permissions and
available backups. Give the owner steps to restore into an isolated copy
with outgoing actions disabled. Include a comparison using known records
and access roles, and explain how to reconcile later edits. Mark each
recovery source and test as confirmed or unverified.
```

## Check the app

### Review a change before people use it

[Full instructions · ms-review](../skills/ms-review/SKILL.md)

```text
Review [change] against [expected behavior] using the supplied formulas,
settings or diff. Trace what happens from the first click through the
saved result, including a retry and a denied action where relevant. Return
findings in severity order with the affected control or file, trigger,
user impact and smallest fix. Identify any behavior that needs a maker to
verify in the editor.
```

### Test a complete user journey

[Full instructions · ms-qa](../skills/ms-qa/SKILL.md)

```text
Check whether [role] can complete [journey] in [app version and test
environment]. Use disposable records. Cover first use, success after
reopening, invalid input, denied access and a repeated submission where
relevant. Return a table with steps, expected result, actual result and
evidence. For each case you cannot run, mark it unverified and give the
tester the steps and expected outcome.
```

### Check who can access records and actions

[Full instructions · ms-security](../skills/ms-security/SKILL.md)

```text
Review access to [records or action] for [roles] in [app]. Trace which
identity the connector uses and where record ownership is enforced. Use
the supplied permissions and data settings to flag excessive access or
sensitive logging. Return findings with evidence and a focused remedy.
Give the maker positive and denied-access checks using disposable accounts
and records, and mark outstanding checks unverified.
```

### Check whether people can complete the task accessibly

[Full instructions · ms-accessibility](../skills/ms-accessibility/SKILL.md)

```text
Review [journey] in [host] for someone using a keyboard or screen reader.
Follow focus from the first control through validation, error recovery and
completion. Check control names, announced changes, contrast and zoom.
Return barriers in order of impact, the affected control, a suggested fix
and a retest. Identify which checks need a named assistive tool or an
interactive session.
```

### Measure what makes a task slow

[Full instructions · ms-performance](../skills/ms-performance/SKILL.md)

```text
Investigate why [journey] feels slow with [representative data volume] in
[host]. Specify how to time the user action and distinguish opening the
screen, fetching records and rendering results. Use available measurements
to identify the largest delay. Return the baseline, sample size and one
change to test under matching conditions. If timing tools are unavailable,
provide a repeatable measurement sheet for the maker.
```

## Release and hand over

### Decide whether this version is ready to release

[Full instructions · ms-ship](../skills/ms-ship/SKILL.md)

```text
Prepare a release decision for [app version] in [target environment] using
[review and test evidence]. Identify who can use the change, which
critical checks passed on this version and what remains unverified. Give
the release owner ordered publishing steps, a smoke test with a visible
success condition, and a rollback trigger. Record a completed release only
when the destination confirms the version.
```

### Learn from the last release

[Full instructions · ms-retro](../skills/ms-retro/SKILL.md)

```text
Compare what [iteration or release] was meant to deliver with what [test
results, release record and user feedback] actually show. Cite the
evidence for each conclusion and flag missing usage data. Write a short
retrospective with one or two changes worth making, the person responsible
if known, and a specific event or test that will show whether each change
helped.
```

### Write instructions someone can follow on first use

[Full instructions · ms-docs](../skills/ms-docs/SKILL.md)

```text
Write instructions for [reader] to complete [first task] in [app and
host]. Use [verified settings, test notes or existing guide] for the
actual labels, prerequisites and permissions. Include numbered steps, a
visible success check and help for the most likely error. Flag steps
needing verification. If you cannot edit the guide directly, return
replacement text and identify the section where it belongs.
```

### Prepare a handoff for the person taking over

[Full instructions · ms-m365-handoff](../skills/ms-m365-handoff/SKILL.md)

```text
Draft a [Teams update, Word brief or Outlook email] for [reader] using
[release notes and test evidence]. Lead with what changed, who can try it,
where and how to recognize success. Explain any blocker in terms of its
effect on the reader. Close with the decision or action they own, the
supplied deadline and references they can open. Return copy-ready text for
the named destination.
```

## Work with a Microsoft platform

### Add an endpoint to a .NET API

[Full instructions · ms-dotnet](../skills/ms-dotnet/SKILL.md)

```text
Add [operation] to [ASP.NET Core project]. Follow its authorization and
persistence patterns. Derive record ownership from the signed-in user and
define what happens when the same request arrives twice. Run an accepted
request and a denied request through the application, then read back the
saved record. Return changed files and observed responses. If this editor
has no project access, give the developer an endpoint contract and the two
checks to run.
```

### Add a workflow to a Windows desktop app

[Full instructions · ms-desktop](../skills/ms-desktop/SKILL.md)

```text
Implement [task] in [desktop project] using its existing framework. Follow
the user from launch through saving and reopening their work. Check
keyboard navigation, visible focus and what happens if the window closes
during a save. Return the build command, Windows version and results. With
editor access only, provide proposed changes and a native test script a
tester can follow.
```

### Plan and verify Azure hosting

[Full instructions · ms-azure](../skills/ms-azure/SKILL.md)

```text
Choose Azure hosting for [workload] in [region] within [monthly budget].
Use the existing infrastructure definitions where they fit. Map
dependencies to runtime identities and permissions, and estimate cost
using stated idle and peak traffic. Return deployment inputs, rollback
steps and one request that tests the full path. If subscription access is
unavailable, identify the changes an operator must preview.
```

### Read a collection through Microsoft Graph

[Full instructions · ms-graph](../skills/ms-graph/SKILL.md)

```text
Connect [screen] to [Graph collection] for [tenant type]. Check the
documented API version, minimum permission and who grants consent. Request
only the displayed fields, follow the service-issued next link and honor
Retry-After. Test an empty collection, multiple pages and denied access.
Return the adapter and results. Without connector or code access, give the
developer the query, required permission and test cases. Mark live checks
unverified.
```

### Build a Teams tab for a team workflow

[Full instructions · ms-teams-app](../skills/ms-teams-app/SKILL.md)

```text
Build a tab for [team task] in [Teams project]. Match the manifest scope
and allowed domains to [test environment]. Check team membership and
record access on the server. Validate the package and exercise the tab
with two users who have different access. Return the package results and
client tested. If sideloading is blocked, identify the prerequisite and
give the tester exact steps.
```

### Build a Power Apps record workflow

[Full instructions · ms-power-apps](../skills/ms-power-apps/SKILL.md)

```text
Build a Power Apps workflow for [role] to find, edit and reopen [record]
from [data source]. Keep the existing app type when it fits. For a new
app, explain the type you choose. Check access as a non-maker and test
search with a record beyond the local retrieval window. Return the screen
flow, table permissions and results. Without Studio access, supply maker
instructions and expected outcomes for each check.
```

### Design and evaluate a Copilot Studio agent

[Full instructions · ms-copilot-studio](../skills/ms-copilot-studio/SKILL.md)

```text
Design a Copilot Studio agent that helps [audience] complete [task] in
[channel] using [approved sources]. Specify how it cites an answer,
handles missing evidence and checks authorization before taking an action.
Return a maker brief and an evaluation table covering success, ambiguity,
denied access and action failure. Record observed outcomes for executed
cases and mark the rest as planned.
```

### Add a command to an Office document

[Full instructions · ms-office-addin](../skills/ms-office-addin/SKILL.md)

```text
Add [command] to [Office app and platform] for [document task]. Check the
required Office.js capabilities and validate the selection when the
command runs. Try the command in a disposable document, reopen it and
compare the edited content and its neighbor. Return the manifest changes,
supported clients and observed result. If host access is unavailable,
provide sideloading steps and expected document changes.
```

### Automate a handoff without repeating it

[Full instructions · ms-power-automate](../skills/ms-power-automate/SKILL.md)

```text
Build a Power Automate flow that turns [trigger event] into [business
outcome] in [environment]. Identify the connection identity for each
action and a durable key that prevents duplicate work across runs. Test
duplicate delivery and a connector timeout, then inspect the downstream
record. Return the action sequence and recovery steps. Without maker
access, provide the flow design and a test recipe with expected outcomes.
```

### Change a data model while preserving existing records

[Full instructions · ms-data](../skills/ms-data/SKILL.md)

```text
Update [table or list] in [data store] to support [new record workflow].
Specify the business key, ownership rule and what existing records should
contain after migration. Use disposable data with older rows, missing
values and duplicates. Check the final record count and verify the
expected read permissions with two authorized test accounts. Return the
schema changes, migration and recovery steps, and checks pending on the
target provider.
```
