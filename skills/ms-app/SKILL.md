---
name: "ms-app"
description: "Coordinate building a complete Microsoft-connected app or substantial app upgrade from idea through verified release preparation. Use as the starting point for an end-to-end app request."
license: "MIT"
---

# One front door for building the app

This entry point also supports Microsoft 365 Copilot for work/enterprise and
Work IQ. In those hosts, use the skills actually attached to the agent/profile
and the user's permitted work context. Use ms-work-iq and ms-enterprise when
available. Without source/authoring/browser tools, complete the requirements,
design and implementation handoff; mark code/host execution unverified.

The user describes the intended result in ordinary language. Keep the specialist
work behind that simple conversation. Start with the latest request, existing
repository and current work; do not make the user learn a command catalog.
For a narrow bug or copy fix, use the relevant specialist directly and keep the
work proportional. For brainstorming-only requests, inspect and propose before
editing. Preserve branding, features, content and business logic during refinement.

## Establish the actual context

Read repository instructions, worktree status, manifests and primary journey.
When no repository is available in an M365 session, start from the supplied or
permitted work brief and identify the actual supported authoring path.
Identify what's implemented, what's requested and what the current Copilot host
can actually do. Use ms-refresh at the beginning of substantive Microsoft work:
verify current official capability, version and prerequisites for the chosen
path. Without browsing, keep freshness unverified and continue independent work.
If ms-refresh is not attached in a limited M365 profile, perform that same
official-source check with the available web tools and record its date and gaps.

Use ms-dev-setup when starting a development loop or when SDK/shell/debug settings
are uncertain. Confirm the intended project and environment without overwriting
global settings. Check existing local history/backups with ms-recovery before a
risky restructure, migration, bulk edit or release; do not create new checkpoints
for every harmless read or keystroke.

## Carry one coherent journey through the work

| Situation | Specialist | Concrete handoff |
| --- | --- | --- |
| The problem is unclear | ms-office-hours | Brief, user outcome, assumptions and smallest useful release |
| The Microsoft platform is undecided | ms-app-route | Primary host, supporting services and a testable spike |
| Work data or enterprise boundaries matter | ms-work-iq, ms-enterprise | Cited permitted context, workload/identity boundaries and enterprise acceptance checks |
| Building an M365 skill/connector/app package | ms-wiqd in a coding host | Validated source package, current schema and an authorized deployment handoff |
| Scope needs definition | ms-plan-product | Stable AC IDs, success/failure states and non-goals |
| Architecture is consequential | ms-plan-engineering | Source touch points, slices, failure paths and test matrix |
| Building or improving UI | ms-native-ux, ms-design-review | One coherent system, resource map, shared improvements and rendered evidence |
| Implementing | ms-build plus relevant platform specialist | Working UI/API/data slice and focused regressions |
| Debugging | ms-investigate | Reproduction, root fix and observed before/after |
| Reviewing/testing | ms-review, ms-qa and needed quality specialists | Reachable findings, AC coverage and actual evidence |
| Preparing an authorized release | ms-ship | Current checks, destination, smoke, rollback and verified result |
| Learning or handing off | ms-retro, ms-docs, ms-m365-handoff | Accurate decisions, gaps, owners and usable documentation |

Load the relevant specialist's installed SKILL.md before using it. These are
separate discoverable skills, not hardcoded filesystem paths or invented tools.
If it is missing, disclose that and use the actual project/official guidance;
do not claim it loaded. Default to sequential execution. A selected role/model
or a skill name alone does not create an independent reviewer or tool access.

## Decide what is ready

Use ten evidence dimensions: value, functionality, experience, accessibility,
security/privacy, data integrity, reliability/recovery, performance/cost,
maintainability and operations. Define concrete targets appropriate to this app.
Record met/missed/unverified/not-applicable with reasons and evidence. A failed
critical permission/data test cannot average out. Browser, host and tenant tests
remain separate from local tests. “Zero learning curve” needs observed first-time
user success to become a measured claim.

Persist durable decisions in existing docs or docs/app/ and carry the same ACs
forward. Complete all authorized work. Request only genuinely missing information
or authorization, after making the result concrete and reviewable. Report what
changed, actual checks/results, remaining blockers and the next meaningful action.
