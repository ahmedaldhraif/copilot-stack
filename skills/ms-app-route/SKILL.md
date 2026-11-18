---
name: "ms-app-route"
description: "Choose a Microsoft app development path: Power Apps, Copilot Studio, Teams, Office add-in, .NET web/API or Windows desktop. Use when selecting or reassessing the app's host and stack."
license: "MIT"
---

# Choose a primary host and supporting services

Use ms-refresh to check current Microsoft host/features and prerequisite changes
before recommending a path. Record the verification date and preview/GA status.

Read the brief, incumbent repository, existing licensing and deployment constraints.
Identify audience (internal, external or multitenant), primary device/host,
offline needs, data ownership, identity, UI flexibility and who maintains it.
Keep a suitable existing stack unless a concrete limitation warrants migration.

Compare only plausible paths:

| Need | Candidate to investigate | Validate before choosing |
| --- | --- | --- |
| The maker is refining an app already open in Copilot Cowork or Apps in Copilot Studio | Continue in its conversational app editor and interactive preview | Confirm the actual surface, editable controls, connected data and publish state. Agent Builder configures an agent and has its own skill import path. |
| Internal business app with governed connectors | Power Apps canvas/model-driven/code apps | Environment, licenses, connector/DLP support, sharing, delegation and offline limits |
| Task performed mainly in conversation | Copilot Studio agent | Harness/features, tools, grounding, evaluation and consumption cost |
| Team workflow inside Microsoft 365 | Teams/M365 app via Agents Toolkit | Host capabilities, manifest, sideloading and tenant policies |
| Work on the open Office document/mail item | Office add-in | Client requirement sets and manifest support |
| Custom web app/API with control over UX/backend | Existing web stack or ASP.NET Core on Azure | Audience, auth, operations and hosting budget |
| Windows-native app | WinUI/Windows App SDK or incumbent WPF/WinForms | Packaging, OS support, updates and native API needs |
| Shared desktop/mobile code | .NET MAUI where it fits | Each target OS, UI demands and supported platform matrix |

Graph is a data/API integration and Azure a hosting/service layer; they can
support several of these hosts. Combine them deliberately. Do not sell them as
mutually exclusive app types. Verify current preview/GA status and prerequisites
in Microsoft Learn before suggesting new scaffolding or plugin commands.

Write `docs/app/platform.md`: constraints, comparison, selected primary host,
secondary services, rejected alternatives, account/tenant requirements, rough
cost drivers (not invented prices), and the first end-to-end technical spike.
Assign a measurable exit criterion to the spike, such as one real user signing
in and reading only their permitted request from the selected data store.

Recommend one path. Mark licensing/tenant eligibility unverified until checked.
Hand off to the relevant ms-* specialist and ms-plan-engineering. In an M365
chat without developer tools, produce the decision/spike plan; do not claim to
have scaffolded, authenticated or deployed an app.
