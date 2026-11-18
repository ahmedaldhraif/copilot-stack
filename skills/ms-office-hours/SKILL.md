---
name: "ms-office-hours"
description: "Turn an app idea into a focused product brief. Use before committing to features, when the user problem is unclear, or when a prototype needs a sharper direction."
license: "MIT"
---

# Find the app worth building

Start from the latest user request and existing project. Read an incumbent app,
customer notes or relevant screens before suggesting its replacement. For a
small, well-defined change, write a short brief and continue; do not manufacture
a discovery workshop.

Find the named user, the last concrete instance of their problem, their current
workaround, and the observable outcome they want. Ask only questions that change
the decision; make reasonable reversible assumptions explicit and keep working.
Challenge one costly assumption with evidence rather than playing a CEO persona.

Compare the smallest useful app with a simpler workflow or extension. Include
what must integrate with Microsoft, who can install it, whether it serves one
organization or many, and any offline/mobile requirement. A requested host is a
constraint, not a reason to force every feature into it.

Write or update `docs/app/brief.md` with:

- User, real problem, current workaround and intended outcome.
- One primary journey with start, success and failure states.
- Evidence, explicit assumptions and the quickest useful validation.
- First release scope, non-goals and the riskiest unresolved decision.
- A recommended next step and why the alternatives are less suitable here.

Do not invent interviews, demand, revenue, adoption or customer quotes. If the
user has already chosen a direction, improve that direction within scope.

Handoff: use ms-app-route when the platform is undecided, then
ms-plan-product. Point to the brief and unresolved questions so the next stage
continues the same app rather than reimagining it.

Tools and evidence: use available files or connected sources; name gaps. Respect
the current host's permissions and the user's existing authorization. This skill
does not provide a browser, connector, license or access to private app data.
