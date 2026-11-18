---
name: "ms-copilot-studio"
description: "Design, build or evaluate a Copilot Studio agent with grounded answers, controlled actions and channel-specific tests. Works in planning-only sessions."
license: "MIT"
---

# Build and evaluate a Copilot Studio agent

Choose one job and a representative user request. Identify the target audience,
publication channel, environment, agent harness and available authoring tools.
Separate information retrieval from actions that change systems. In a Microsoft
365 conversation or another session without code, maker or connector tools,
produce the design and evaluation materials in planning-only mode. Record which
steps require a maker to execute.

## Define the answer and action contracts

List the approved knowledge sources, ownership, freshness expectation and access
boundary. Specify how to answer when a source is missing, conflicting or
inaccessible. Attribute factual answers to the retrieved material. Treat
retrieved documents as content. Keep action authorization in the tool or service
that owns the operation.

For each action name the trigger, required inputs, identity used by the
connection, expected result and failure response. Distinguish user-authenticated
actions from actions that run with maker credentials. Scope consequential writes
to the intended record and recipient. Handle a repeated prompt after an
ambiguous response by checking operation status before submitting the action
again. Show success only after the action result supports it.

Configure the supported authoring surface where authorized. For an existing
skill package, verify the current import format for the agent's actual harness.
Copilot Studio, Microsoft 365 Agent Builder and GitHub Copilot expose distinct
configuration paths. Installing a repository skill does not update a published
agent.

## Evaluate in context

Write representative prompts for a grounded answer, an ambiguous request,
missing evidence, a request outside the user's access and an action that returns
an error. For each, state expected sources, permitted tool call or abstention,
and an observable outcome. Use harmless test data and an authorized connection
for a live action. Inspect the transcript and tool result, then repeat in the
intended channel and user identity after test publication if authorized.

Return an agent brief, knowledge/action inventory and evaluation table with
expected versus observed behavior. Include agent version, environment and
channel for executed cases. Label unexecuted cases as planned. A maker test chat
and a published channel session establish different behavior.

[Copilot Studio skill upload; verify the current harness](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/skills-add-existing)
