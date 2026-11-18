---
name: "ms-design-review"
description: "Review or improve an app's interaction and visual design, in plan or in the running host. Use for app UX, layout, copy, responsive behavior and design polish."
license: "MIT"
---

# Make the primary task obvious

Apply the ms-native-ux resource workflow when improving the app. Start with
Checklist Design's review guidance, then Amicro's applicable interaction guidance.
Use AIforUI to challenge unnecessary motion and stress-test realistic data;
consider Astryx only as a compatible chosen foundation. Preserve one coherent
system and the product's own identity. Never force the reference site's branding.

Choose the requested mode: plan review, live review, or implement improvements.
A review-only request stays read-only. Inspect existing UI/design tokens and the
primary journey before suggesting changes. Use real screenshots/browser or host
tools for claims about rendered behavior; source inspection alone is limited.

Review in task order:

1. Entry: what this app does, who it is for, and the first useful action.
2. Hierarchy: one clear primary action, familiar navigation, readable content.
3. State: loading, empty, validation, permission, error, success and recovery.
4. Input: keyboard/focus, touch targets, forms and destructive-action clarity.
5. Adaptation: narrow/wide views, zoom, host themes and needed RTL/localization.
6. Visual craft: typography, spacing, contrast, density and consistent controls.

Prefer the incumbent design system. For a new Microsoft-hosted app, evaluate
Fluent and native host conventions; do not import a library just for a familiar
logo or force web patterns into native desktop controls. Avoid decorative
gradients, redundant cards and motion that hides status. Use plain human copy.

For each material finding show the screen/state, impact on the user, evidence
and precise improvement. Rank blockers before cosmetic preferences. An explicit
quality target should describe observable behavior, not an unexplained score.

If implementing, complete a coherent journey, then re-open it at relevant
viewports/themes and keyboard states. Record before/after evidence and anything
untested. A screenshot does not prove focus behavior or accessibility.

Update existing `DESIGN.md` or `docs/app/design.md` with durable decisions and
link findings to AC IDs. Use ms-accessibility for detailed accessibility work.
Missing host/browser access means a design recommendation with a verification
gap, not a verified visual pass. Honor existing user authorization for fixes.
