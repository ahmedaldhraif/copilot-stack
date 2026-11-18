# Sources and provenance

Documentation/reference baseline checked 2026-11-18. Recheck consequential claims
with ms-refresh during the actual app-building session. The source does not
establish account eligibility, private APIs or observed tenant behavior.

| Source | How it was used |
| --- | --- |
| [github-skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills) | Native skill locations and supported GitHub Copilot surfaces |
| [vscode-skills](https://code.visualstudio.com/docs/agent-customization/agent-skills) | Skill discovery, slash invocation and current harness boundaries |
| [vscode-prompts](https://code.visualstudio.com/docs/agent-customization/prompt-files) | Local prompt-file deprecation and native skill preference |
| [github-agents](https://docs.github.com/en/copilot/reference/custom-agents-configuration) | Portable custom agent metadata and read/search aliases |
| [visual-studio](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-chat-context) | Instructions and prompt-file fallback |
| [m365-agent-skills](https://learn.microsoft.com/en-us/plugins/declarative-agent-skills) | Agent-scoped package and profile limits |
| [m365-agent-upload](https://learn.microsoft.com/en-us/plugins/agent-builder-add-skills) | Root ZIP structure and configure/try workflow |
| [m365-chat-skills](https://learn.microsoft.com/en-us/plugins/build-copilot-chat-skills) | Personal Chat skill upload and separate scope |
| [studio-skills](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/skills-add-existing) | Harness-specific Copilot Studio skill import |
| [power-apps-code](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/quickstart-github-copilot) | Official optional Copilot CLI code-app plugin path |
| [agents-toolkit](https://learn.microsoft.com/en-us/microsoftteams/platform/toolkit/visual-studio-code-overview) | Current SDK choices and unsupported new TeamsFx projects |
| [office-toolkit](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/agents-toolkit-overview) | Office scaffolding, manifest and actual host support checks |
| [windows-host](https://learn.microsoft.com/en-us/windows/apps/get-started/plan-your-app) | Windows framework and distribution choice |
| [azure-quality](https://learn.microsoft.com/en-us/azure/architecture/guide/) | Architecture and Well-Architected tradeoffs |
| [fluent](https://fluent2.microsoft.design/) | Microsoft design foundation reference |
| [teams-design](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/design/design-teams-app-overview) | Host design and coherent controls |
| [office-design](https://learn.microsoft.com/en-us/office/dev/add-ins/design/add-in-design-language) | Branded Office task experiences |
| [power-apps-controls](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/overview-modern-controls) | Supported modern controls and themes |
| [checklist-design](https://www.checklist.design/skill) | FIRST: actual skill loaded and bundled audit index read |
| [amicro-skills](https://amicro.vercel.app/skills) | SECOND: actual repository-scoped skill loaded; adapt site-specific tokens |
| [checklist-catalog](https://www.checklist.design/) | Applicable screen/flow coverage |
| [amicro-cli](https://amicro.vercel.app/cli) | Published registry and CLI routes; no component dependency installed |
| [beautiful-ui](https://www.beautifului.dev/) | Existing AI feedback/task patterns; interactive approval selection observed |
| [beautiful-ui-license](https://www.beautifului.dev/license) | MIT license at review |
| [transitions](https://transitions.dev/) | Complementary motion demos; menu/dialog exercised |
| [transitions-license](https://github.com/Jakubantalik/transitions.dev/blob/main/LICENSE) | Separate tooling and transitions/skills terms; not vendored |
| [mono-charts](https://amicro.vercel.app/mono-charts) | Chart inventory and state/data requirements |
| [svgl](https://svgl.app/) | Microsoft provider mark search and provider usage boundary |
| [aiforui](https://aiforui.dev/skills) | Design judgment, stress data, motion removal and performance |
| [astryx](https://github.com/meta/astryx) | Alternative React19+ beta foundation and agent CLI |

Repository snapshots were read directly; no upstream library is redistributed.

| Repository | Commit | License at review |
| --- | --- | --- |
| [gstack](https://github.com/garrytan/gstack) | `33b1a965bacb9ae28ac9281a1a70cbd987e54c01` | MIT |
| [Checklist Design](https://github.com/Checklist-Design/skills) | `bfae71e507b1b7c03c12e0756402b60eb80f5d14` | MIT |
| [Amicro](https://github.com/Subhan-code/Amicro--Micro-transitions-) | `fa5f8ffbe39537a8db191806066b8773c47c82e9` | MIT |
| [AIforUI](https://github.com/emilkowalski/skills) | `64eb3deb9a5fbfa041faf783e0bc3fd635872e9c` | MIT |
| [Astryx](https://github.com/meta/astryx) | `f4fa3661a25403ded7ee4c4c2ac5c2a355eb74ef` | MIT |

Amicro source inventory contained 176 registry entries across UI, hook, library,
block and component types. That inventory and live category/demo research do not
certify every entry. Check the exact payload/export and full interaction contract
for any adopted component.

SVGL repository code is MIT at review; provider-mark rights and usage remain
separate. Transitions.dev is not uniformly MIT: review its exact current terms
before copying transitions/skills, especially into a reusable distribution.

A source checker can verify links and dates; it cannot automatically determine
whether a feature applies to a particular tenant, installed build or app.

## Enterprise Work IQ and configured CI

- [work-iq](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/): Enterprise intelligence layer, protocols, governance and licensing boundaries.
- [work-iq-mcp](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/mcp/overview): Runtime schema discovery, retrieval and exact entity operations.
- [work-iq-studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/add-work-iq): Current harness workload/write defaults and actual tenant checks.
- [work-iq-marketplace](https://github.com/microsoft/work-iq): Hosted stable plugin differs from local CLI; retrieve-first and explicit delegation.
- [wiqd-install](https://microsoft.github.io/wiqd/getting-started/installation/): Authoring plugin and standalone CLI setup distinction.
- [wiqd-plugins](https://microsoft.github.io/wiqd/concepts/plugins/): Coding-assistant plugin versus shipped Microsoft 365 appPackage.
- [wiqd-build](https://microsoft.github.io/wiqd/getting-started/build-a-plugin/): Source validation and authorized provisioning/package/share lifecycle; alpha surface.
- [ci-checkout](https://github.com/actions/checkout/releases/tag/v7.0.1): Verified release tag and commit for configured CI.
- [ci-node](https://github.com/actions/setup-node/releases/tag/v7.1.0): Verified release tag and commit for configured CI.
- [ci-python](https://github.com/actions/setup-python/releases/tag/v7.1.0): Verified release tag and commit for configured CI.
