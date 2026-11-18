---
name: "ms-native-ux"
description: "Audit, implement and verify native-feeling app UX with familiar controls, friendly copy, coherent visuals and purposeful motion. Use when building or improving a Microsoft-connected app interface."
license: "MIT"
---

# Make the next action feel obvious

Act as a product designer and frontend engineer. Preserve the app's branding,
features, content, data contracts and business logic. Simplify the path to the
user's goal. For a brainstorming-only request, inspect and propose before editing;
for an implementation request, complete the audit, fixes and verification.

In M365 Copilot/Work IQ sessions, use available screenshots, sources and tools.
If the session lacks code/authoring/browser access, produce the concrete design
and implementation handoff with the missing execution checks; do not claim the
app was edited or rendered. Continue implementation in the supported coding or
maker host when available. Skill scripts do not supply network/tenant access.

## Establish the app and host

Read the existing code, shared components, tokens, representative screens and
actual journeys. Identify the primary host, supported widths/devices, users and
first useful task. An unrelated app in the workspace is not the target.
Use ms-refresh for current Microsoft support and development requirements.
Read [host patterns](references/host-patterns.md) for the chosen host.

Keep one component foundation, one UI icon family, semantic tokens and one motion
system. Use the incumbent system when suitable. Choose host-native controls for
Windows/Power Apps; follow Teams/Office host behavior. Astryx is a candidate for
a compatible React 19+ app, not a second foundation on top of another system.

## Review resources in this order

Read [resource roles and setup](references/resources.md). Load only the resources
needed for this task after the ordered initial review; explain irrelevant skips.

1. Checklist Design skill FIRST. Read/load the current official skill using its
   documented instructions. Use the matching bundled checklists; keep visual
   critique separate from source-only observations. Apply it again after fixes.
2. Amicro skills SECOND. Read/load the relevant current skill. Its own fonts,
   palette, gallery layout and haptics are site-specific; adapt interaction ideas
   to this product and host. Preserve branding and required accessible behavior.
3. Audit existing screens, journeys and shared primitives against applicable
   Checklist Design checklists. Prioritize task blockers and missing states.
4. Amicro CLI/catalog: check framework/package compatibility and license, inspect
   category inventory and live demos. Use suitable Amicro behavior as the primary
   interaction reference. Verify the actual registry file/export and behavior
   before integrating it; catalog screenshots or labels are not proof.
5. Beautiful UI: apply relevant patterns to existing AI input, progress, responses,
   sources and feedback. Show truthful execution status and concise step summaries;
   do not fabricate reasoning, confidence percentages, progress or sources.
6. Transitions.dev: fill a genuine motion gap using the same motion vocabulary.
   Check the current license; do not redistribute its library in this toolkit.
7. Mono Charts: use only where existing real data benefits from a chart. Include
   labels, units/time range, empty/error/loading states and a text/table alternative.
8. SVGL: use accurate provider marks only in a relevant brand/integration context.
   Check provider usage rules. Keep interface actions in the chosen icon family.
9. AIforUI: use design-engineering judgment, motion removal/performance review and
   realistic stress data. Apply platform-specific skills only to their target.
10. Astryx: evaluate coherent themes, composition and agent tooling if the chosen
    app supports it. A new foundation requires a concrete reason and migration
    scope. Do not upgrade React or install another provider for an isolated effect.

## Show the plan, then complete it

Give a brief prioritized checklist and resource → pattern → shared component →
screen mapping. Use [the mapping template](references/implementation-map.md).
Implement shared foundations/states first, then verify every affected journey.
Dependency installation alone is not implementation.

The interaction contract is familiar and forgiving:

- One clear primary task; ordinary nouns/verbs, useful defaults and progressive
  disclosure. Expose essential actions; do not require a tour or hidden gesture.
- Pair useful icons with visible labels until recognition is established. An
  icon-only action still needs an accessible name and keyboard/touch access.
- Preserve drafts, filters, scroll/selection and context where users expect them.
  Use undo for suitable reversible actions, clear recovery and nonduplicating retry.
- Confirm pending/saved/error truthfully. Retain input on error. Never delay the
  action or data commit to finish an animation. Disabled controls need an explanation.
- Use purposeful visuals: a relevant preview, record status, genuine progress or
  helpful empty-state example. Keep decoration secondary and claims evidence-based.
- Use warm, direct copy and calm spacing; avoid jargon, novelty navigation,
  forced card grids, generic AI gradients and constant shimmer/confetti.

Use [motion and state rules](references/motion-states.md). Verify keyboard/focus,
touch, system themes/contrast, reduced motion, desktop/mobile/container widths,
long/missing/one/zero data, and needed RTL. Include loading, empty, error, success,
disabled, selected and interrupted states. Check performance on representative
hardware and the existing budget; a fast desktop alone is insufficient evidence.

Run build and relevant regression tests, then inspect real rendered journeys.
Report changed components/screens, resources used/skipped with reasons, screenshots,
commands/results and remaining gaps. A missing browser/host stays unverified.
“Zero learning curve” is a design target; observe first-time task success before
claiming it as a measured result. Hand current evidence to ms-qa and ms-ship.
