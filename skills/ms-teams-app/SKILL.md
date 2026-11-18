---
name: "ms-teams-app"
description: "Build or review a Teams tab, bot, agent or messaging extension across its manifest, identity and intended Teams scopes."
license: "MIT"
---

# Build for the Teams context

Start from the action a Teams user will take. Choose a tab for a persistent
interface, a messaging extension for composing or searching inside a
conversation, or a bot or agent for conversation-driven behavior. Identify
personal, team or group-chat scope and which target clients matter. Avoid
requesting a capability or scope the journey never uses.

Inspect the manifest schema, package, registrations, hosting and existing SDK
versions. For new Teams-focused agent development check Microsoft's Teams SDK
guidance. Evaluate Microsoft 365 Agents SDK for a multichannel agent. Preserve a
working implementation while planning any migration separately. TeamsFx is
deprecated for new development. Agents Toolkit can scaffold and debug supported
projects; check what it will register or provision before invoking those
operations.

## Implement context and identity

Match manifest declarations, allowed domains and URLs to the environment that
serves the app. For a tab, initialize the Teams client SDK and provide usable
loading and sign-in states within the frame. For a bot or extension, validate
the incoming activity using the SDK's authentication mechanism. Authenticate and
authorize privileged server operations independently of client-provided team,
user or conversation fields.

For card submissions or other writes, bind the action to the correct tenant,
identity and record. Handle duplicate submits and stale cards. Check
cancellation and what the user sees if membership changes before submit. Test
responsive layout, keyboard access and host themes on relevant interactive
surfaces.

## Verify each delivery layer

Validate the manifest and package layout. Run local rendering or Playground
checks where available. In an authorized test tenant install the intended
package and follow the journey in each required scope. Verify a second identity
sees only the intended content. Record the app version, client and scope beside
each result. If sideloading is unavailable, deliver the local evidence and the
exact install or policy prerequisite.

Return the manifest and service entry points, environment configuration names,
package validation result and a scope-by-client smoke checklist. Treat tenant
installation, catalog publication and production availability as separate
observed events.

[Microsoft 365 Agents Toolkit](https://learn.microsoft.com/en-us/microsoftteams/platform/toolkit/agents-toolkit-fundamentals)
