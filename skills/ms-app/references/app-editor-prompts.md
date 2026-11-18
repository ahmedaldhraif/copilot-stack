# Use Copilot Stack in a fixed app editor

Pick the task you want, replace the words in brackets, and paste that one block into the conversation where you edit your app. The editor receives the instructions in the block. You can keep using its built-in tools and controls. In a fresh chat, paste the relevant block again.

These five shortcuts cover common tasks. For one prompt per skill and the original instructions, open the [complete 34-skill guide](https://github.com/ahmedaldhraif/copilot-stack/blob/v0.1.3/docs/ALL-SKILLS.md).

## Build one working flow

```text
Build a draft where [person] can [task] and see [result]. Work in this
editor with its existing controls and approved connections. Start with one
complete flow. Give the main action a familiar label and make the result
obvious. For a save, keep the user's entries on error and prevent duplicate
submissions. Test the flow in preview with fictional data in a test location
if available. Tell me what I can try and which checks still need me.
```

## Improve a screen

```text
Improve [screen] so a first-time user can [task]. Keep the branding, content,
permissions and business rules. Use the controls already in this app. Give
the main action a clear label, keep keyboard focus visible, and make the
layout work at narrow widths. Show feedback as soon as an action starts
and confirm success only when it finishes. Apply the change in the draft.
Show me where to try it and what you observed.
```

## Check a workflow before sharing

```text
Check whether [user role] can complete [task] in the draft. First check
where test changes would be saved and whether anyone would be notified.
Use a fictional record in an isolated test location. Save, reopen and check
the result. If access matters, check what each intended role can actually
read or change, including the underlying data. Report each check as passed,
failed or untested, with the observation or a step I can try. Keep it in draft.
```

## Investigate a missing change or record

```text
Help me find [missing change or record]. Start read-only. Identify the app
version, data source and last time it was known to be present. Check the
version history, recycle bin or backup this editor actually exposes. Tell
me what each available copy contains: app design, settings or records.
Leave the original intact. If a restore is possible, describe how to try
it in a separate location and verify one known item before replacing anything.
```

## Check a claimed limitation

```text
Check whether this editor supports [feature] for [task]. Use the product
name and the controls, build output or current Microsoft documentation
you can actually inspect. Tell me what you confirmed and what is still
unknown. If a library or tool is unavailable, show the simplest way to
get the same user-visible result with the controls already here.
```

## Get a prompt tailored to your app

In a chat that has access to Copilot Stack, ask “Use Copilot Stack to write one prompt for my app editor. I want [outcome] on [screen]. I can use [available controls].” Copy its answer into the editor. Bring back the observed result or a redacted screenshot for the next change. The detailed skills stay with the assistant preparing the prompt. The app editor needs only the resulting text.
