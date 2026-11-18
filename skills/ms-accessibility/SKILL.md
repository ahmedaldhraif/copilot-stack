---
name: "ms-accessibility"
description: "Audit and improve app accessibility across keyboard, focus, semantics, contrast, zoom and relevant assistive technology. Use when building or reviewing accessible app journeys."
license: "MIT"
---

# Make the whole task accessible

Identify target host, personas and affected journeys. Inspect actual controls,
semantics and rendered behavior with available browser/native tools. Use the
host's established accessible components before inventing custom interactions.
For web, use WCAG 2.2 AA as the target when appropriate to the project; a checklist
or scanner does not establish conformance.

Walk the primary task using keyboard alone. Check logical tab order, visible
focus, no trap, menus/dialogs, Escape behavior, restoration to the invoking
control and route-change focus. Test errors and async updates, not only the
successful default state. Native Windows/Office hosts need their own runtime
and relevant assistive-technology checks.

Inspect:

- Accessible names, roles/states, headings, landmarks, labels and descriptions.
- Validation linked to fields, actionable errors and announced status changes.
- Text/nontext contrast, non-color cues and focus visibility in host themes.
- Zoom/reflow, readable text, target size and reduced-motion preference.
- Content alternatives, table semantics and data visualizations where present.
- Localization/RTL and screen-reader reading order when required by the audience.

Use a configured scanner for automation when available; then manually verify
issues that automation cannot cover. For screen-reader claims, name the actual
reader, browser/host and version used. Source changes and role attributes alone
do not prove a usable experience.

Return prioritized journey-specific findings, evidence, applicable criterion or
host guidance, and a concrete fix. In fix mode, re-run keyboard and focused
automated checks. Report manual checks separately from machine checks.
When tools are unavailable, produce a code/design audit and explicit runtime gaps.

Write `docs/app/accessibility.md` with scope, observed results, fixed issues and
remaining barriers. A critical inability to complete the task is a release
blocker; a large passing scan count cannot cancel it.
