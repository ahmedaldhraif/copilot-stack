# Capability boundaries

Documentation baseline checked 2026-11-18. Verify current host/version and tenant
availability with ms-refresh before adopting a feature. Documentation support and
an observed live invocation are different evidence.

| Surface | Delivery route | What still needs verification |
| --- | --- | --- |
| GitHub Copilot CLI/app | Personal ~/.copilot/skills or supported project skills | Sign-in, feature/version support, skill discovery and real invocation |
| Copilot in VS Code | .github/skills or ~/.copilot/skills | Selected harness, workspace trust, installed tools and live task |
| GitHub cloud agent/code review | Commit project skills to the target repository | Cloud provisioning, supported tools and actual invocation; local copies are not uploaded |
| Visual Studio | Optional linked prompt-file fallback and supported instructions | Installed VS version and prompt behavior; native skill discovery not certified |
| M365 Copilot Chat | Upload selected exported ZIPs, or supported standalone SKILL.md | Eligible account, tenant policy, discovery, sandbox and actual execution |
| M365 Copilot for work + Work IQ | Enterprise App Builder recipe and supported Work IQ integration | Actual identity, workloads, entity permissions, policy, preview features and consumption arrangement |
| WIQD coding-host authoring | ms-wiqd plus Microsoft's actual authoring plugin/CLI | Current schema/alpha command support, validation and authorized tenant lifecycle |
| M365 Agent Builder | Upload ZIP skills per profile, configure agent manually | Tenant eligibility, current limits, knowledge/tools and Try it results |
| Copilot Cowork or Apps in Copilot Studio app editor | Make changes through the supported conversation and test them in the app preview | Confirm the exact host, available instructions, data connection, permissions and published version |
| Copilot Studio | Harness-specific Skills upload where available | Actual harness/UI, format, licensing and published-channel behavior |
| Windows/Power Apps/Office | Specialist instructions in the chosen authoring host | Real authoring tools, control/API support, identity, data and host tests |

The current GitHub skill documentation lists cloud agent, code review, CLI, app
and VS Code agent mode. It documents project .github/skills and personal
~/.copilot/skills among supported paths. [GitHub skill guide](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills)

VS Code documents native skill discovery and slash invocation. It currently
recommends skills for new reusable workflows and limits .prompt.md execution to
the Local harness, deprecated for removal in February 2027.
[Skills](https://code.visualstudio.com/docs/agent-customization/agent-skills) ·
[Prompt files](https://code.visualstudio.com/docs/agent-customization/prompt-files)

Visual Studio documents custom instructions and prompt files. This toolkit
provides that fallback without asserting unverified native skill support.
[Visual Studio customization](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-chat-context)

Custom agent read/search aliases can limit the reviewer. Skill prose is not a
security control. Other roles inherit available tools and the current model.
VS Code handoffs/model/tool IDs can differ from GitHub's cloud behavior; no such
host-specific handoff or model ID is required by these portable profiles.
[Agent configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)

No browser runtime is bundled. Use the host's browser tools or an existing,
configured Playwright runner. Missing browser/desktop/tenant access must be
reported as unverified. A connector, license or consent is never supplied by prose.
