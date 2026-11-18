# Start here in Microsoft’s app editor

Open the conversation where you edit your app. Copy the box below, replace the first line with your goal, and send it. Everything the editor needs for this first pass is in the message.

## Build or improve an app

```text
I want [person] to be able to [task] and see [result].

Use the tools already in this editor. Start with the simplest way a person
can finish the task, then build or improve that flow in the draft. Keep the
existing branding, permissions and business rules. Make the next action
easy to find. Keep what the user entered if something goes wrong.

Try the flow in preview. Before writing test data, check where it goes and
who gets notified. Use a fictional record in an isolated test location.
If the task saves data, reopen the record and check the result. Tell me
what changed, what you actually verified, and the one thing I should try
next. If a check needs access you lack, give me the step I can try.
Keep this version in draft.
```

**Example first line:** “I want a team member to submit a supply request and see that it was received.”

**Try it yourself.** In a test copy, submit one fictional request. Close and reopen it. Look for one saved request with the same details. If the editor can’t show where the data goes, stop before submitting and record that check as untested.

**Continue later.** When starting a new chat, include the app and screen, the last change you actually saw, how you tested it, and the next task. Share only details appropriate for the receiving chat.

Use the prompts below for a narrower task. For architecture, Work IQ, data, release or another specialist, open the [complete 34-skill guide](https://github.com/ahmedaldhraif/copilot-stack/blob/v0.1.4/docs/ALL-SKILLS.md).

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
