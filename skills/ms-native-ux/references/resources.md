# Resource roles, compatibility and installation

Reviewed 2026-11-18. Verify current instructions, versions and licenses when used.
These are linked references; third-party component/skill libraries are not bundled.
Read the checklists and study the interactions directly. Translate applicable
behavior into existing host controls. The commands below are optional setup for
a compatible project that needs the skill files or implementation code.
Review source before execution. Install locally into the intended project when
needed, preserving existing configuration and a lockfile. Do not install an entire
library to imitate one effect. Record the exact version, source and decision.

| Resource | Role | Fit and boundary |
| --- | --- | --- |
| Checklist Design | Review completeness and screen/flow coverage | Source audit can inspect structure; visual critique requires rendered evidence |
| Amicro | Primary suitable component/interaction reference | React/Motion web code; its site's tokens are not a universal product theme |
| Beautiful UI | Existing AI task/feedback patterns | Use truthful progress, sources and recoverable tool results; no new feature merely to use a demo |
| Transitions.dev | Complementary motion recipes | Same product motion system; current transitions/skills license restricts competing redistribution |
| Mono Charts | Clear presentation of existing data | Choose the simplest useful chart; expose labels and data alternatives |
| SVGL | Accurate brand/provider marks | Provider branding context and usage rules; not a general control icon library |
| AIforUI | Design judgment, stress cases and motion quality | Platform-specific Apple/Expo techniques are conditional; preserve Microsoft host rules |
| Astryx | Alternative coherent component foundation | React 19+ and beta at review; select as a foundation, do not layer over Fluent |

## 1. Checklist Design

[Skill instructions](https://www.checklist.design/skill) and
[source](https://github.com/Checklist-Design/skills). MIT at reviewed revision.

Published installation, from the target project:

```text
npx skills add checklist-design/skills -a github-copilot
```

Inspect the installer options before use. Read the installed SKILL.md, its index
and matching bundled checklists. Loading and manual copying are valid when the
host cannot run the installer. Keep its audit read-only, then implement the
user-authorized improvements as part of the app-building task. No extra approval
is implied by the fact that the review stage is read-only.

## 2. Amicro skill

[Skill setup](https://amicro.vercel.app/skills) and
[source](https://github.com/Subhan-code/Amicro--Micro-transitions-). MIT at review.

```text
npx skills add Subhan-code/Amicro--Micro-transitions- -s amicro-design-system -a github-copilot
```

The reviewed skill defines Amicro's own gallery, Outfit font, palette and haptics.
Use the applicable interaction insights; the user's identity and host conventions
take precedence. Do not copy hidden-hover controls, nested interactives or other
sample code without accessibility review.

## 3. Checklists

[Checklist catalog](https://www.checklist.design/). Match actual screens and
flows: forms, saving, errors, empty states, search, dialogs, tables and navigation.
Record present/partial/missing/not-needed/cannot-tell with a reason. Avoid
interpreting every catalog item as a required feature.

## 4. Amicro components and motion

[Current CLI](https://amicro.vercel.app/cli). At review the documented routes were
shadcn registry installation or its own package CLI. Confirm current peer/runtime
requirements and inspect the exact registry payload before invoking either.

```text
npx shadcn@latest add https://amicro.vercel.app/r/download-button.json
```

That is a published example, not a command to run indiscriminately. Its own route
documents `npm i @subhanhq/amicro`, `npx @subhanhq/amicro@latest init`, then `add`.
Check the current npm package and init diff before adopting it. A namespace route
such as `@amicro/name` needs the documented registry entry in components.json;
merge that entry without replacing existing registries.

Review the complete category inventory, then exercise relevant live demos.
Buttons, morphing, cards/carousels, loaders, charts, animations, 3D and text
effects were visible at review. Select useful feedback, not a catalog showcase.
One observed component detail did not match its card label; inspect exports and
render the chosen code before relying on catalog naming.

## 5. Beautiful UI

[Catalog](https://www.beautifului.dev/) and
[license](https://www.beautifului.dev/license). MIT at review. Relevant patterns
include composer, pending tasks, streaming response, source/context cards, tool
status and proposed edits. Keep existing actions, truthful state and undo/retry.
Show brief action summaries rather than private reasoning or invented confidence.

## 6. Transitions.dev

[Catalog](https://transitions.dev/) and
[license](https://github.com/Jakubantalik/transitions.dev/blob/main/LICENSE).
The reviewed repository uses separate terms: tooling is MIT; transitions and
skills permit app use but restrict competing redistribution. Keep this toolkit's
implementation original and link to the recipes. Review exact terms for copied
material, including paid items. Do not label the whole source MIT or vendor it.

## 7. Mono Charts

[Chart catalog](https://amicro.vercel.app/mono-charts). Inspect real interaction,
keyboard/data alternatives and the actual registry dependencies. Never carry demo
financial/telemetry values into product claims. Format dates, units, empty/null
versus zero, negative values and meaningful precision for the real dataset.

## 8. SVGL

[Logo library](https://svgl.app/) and
[source license](https://github.com/pheralb/svgl/blob/main/LICENSE).
Use the provider's current authorized mark in connection/account contexts.
The catalog's code license does not establish blanket rights to every trademark.
Use one general UI icon family and retain visible labels where recognition matters.

## 9. AIforUI

[Current skills](https://aiforui.dev/skills) and
[source](https://github.com/emilkowalski/skills). MIT at review.

```text
npx skills@latest add emilkowalski/skills
```

Select the relevant skills after inspecting the current catalog: design engineering,
break-ui, animation-performance, remove-animations and review-animations are useful
roles. Scope installs to the intended host/project. Use realistic long names,
missing fields, one/zero/many records and supported locales at actual container
width. Do not ship a test-only dataset toggle. Remove motion when it impedes the task.

## 10. Astryx

[Source and setup](https://github.com/meta/astryx). MIT and beta at review.
Requires React 19+. Consumer docs use prebuilt CSS, a theme provider and documented
peers; consumers do not need the source build setup merely to use components.
Inspect the installed package's README before selecting providers/imports.

The source documents core, a theme, StyleX peer and an optional development CLI.
Use the CLI for the installed component API, composition and themes. Keep its
version local to the app. At review, chart packages were canary-only and lab was
not published; do not infer stable availability from a Storybook demo.
