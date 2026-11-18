# Microsoft 365 Copilot for work and Work IQ

This is a first-class target of Copilot Stack. Start with the Enterprise App
Builder recipe in the M365 export, or use ms-app in a coding host with your
approved Work IQ integration. The exact paid SKU/entitlement, tenant rollout and
consumption arrangement must be checked; “premium” is the user's target, not a
blanket technical entitlement.

## Three connected routes

| Route | Role | Delivery |
| --- | --- | --- |
| Microsoft 365 Copilot work experience | Understand work, define/build supported workflows and use enabled tools | Import supported skills/configure the enterprise agent and its actual knowledge/tools |
| GitHub Copilot with Work IQ | Ground app implementation in permitted organizational context | Approved hosted Work IQ plugin or a separately configured CLI/MCP integration |
| Work IQ Dev Tools (WIQD) | Author an M365 app/plugin with skills, connectors and optional declarative agents | Develop and validate an appPackage project; provision/package/share/publish only in scope |

Work context can turn an authorized SharePoint brief or meeting decision into
traceable app requirements. Preserve the source, author/date/context and open
conflicts; do not assume every retrieved message is a settled product decision.
Then use the app-building journey, native design and acceptance evidence.

Work IQ is a platform intelligence/tool layer, not just a prompt file or a
synonym for Graph. Microsoft documents A2A, MCP and REST. Current MCP capabilities
include retrieval, Copilot delegation, schema discovery and entity operations.
Use the actual available schemas and exact authorized target, and verify the
operation result. Do not label the service universally read-only. Retrieval and
individual workloads can have their own preview/tenant availability.
[Overview](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/) ·
[MCP surface](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview)

In the currently documented Copilot Studio Microsoft harness, Work IQ is included
for new agents, workloads are selected broadly and writes can be enabled by
default. Review actual workloads, connection identity and policy for the task.
Workload selection does not select individual sites/mailboxes or override service
permissions. Test denied-access and unintended-write cases in the real tenant.
[Studio Work IQ](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-work-iq)

## Enterprise App Builder

The recipe contains eight skills: ms-app, ms-work-iq, ms-enterprise, ms-app-route,
ms-native-ux, ms-copilot-studio, ms-security and ms-m365-handoff. Import only the
listed ZIPs into that agent. Other focused profiles carry additional planning/
review skills. The router uses only attached skills and exposed tools.

The enterprise workflow verifies identity/tenant and persona boundaries, effective
data/connector controls, sensitivity and output audience, redacted audit evidence,
dev/test/prod ALM, cost/scale targets and isolated recovery. Skill instructions
cannot implement those controls on their own. Verify the actual settings and
positive/negative runtime outcomes.

Without developer/authoring/browser tools, the M365 session completes the brief,
design, evaluation and implementation handoff. It must identify the concrete
coding/maker step still needed. It cannot claim to have edited, rendered or
deployed the app merely because a design was described.

## Current setup boundaries

The official Work IQ repository documents a hosted workiq plugin separately from
the local @microsoft/workiq CLI. Their versions/setup and capabilities differ.
Use its current stable guide, check installed help and preserve user-specific
tenant policy. Do not silently substitute Copilot/named-agent delegation for
unavailable retrieval. This toolkit installs neither integration nor tenant consent.
[Official marketplace](https://github.com/microsoft/work-iq)

WIQD's coding-assistant plugin is a guide for authoring; it is not the M365
appPackage artifact you ship. Marketplace installation also does not prove a
standalone wiqd CLI is installed. The plugin command surface was documented as
alpha at review; inspect current schema/help and source validation before use.
Do not invent a deployment scope or relabel a personal deployment as shared.
[WIQD installation](https://microsoft.github.io/wiqd/getting-started/installation/) ·
[Plugin lifecycle](https://microsoft.github.io/wiqd/getting-started/build-a-plugin/)

Microsoft documents separate usage/billing considerations for custom/third-party
Work IQ API/agent usage. A Microsoft 365 Copilot work license does not establish
unlimited external API use. Confirm the current tenant arrangement and budget
before enabling consumption. No licensing, payment, EULA acceptance, service
principal, admin consent, Work IQ query or enterprise publication was performed
while building this toolkit.
