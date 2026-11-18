# One motion language, complete states

Use host/component defaults when they already meet the task. Define semantic
motion tokens only for behavior the app controls. Treat these as starting points
to test, not universal values that override native controls.

| Event | Behavior | Verify |
| --- | --- | --- |
| Hover/press | Subtle visual feedback, typically around 100-160 ms | Also works with keyboard/touch; no moving target or layout jump |
| Menu/popover | Brief origin-aware reveal, often 150-220 ms | Correct role/arrows/Escape, outside click and focus restoration |
| Dialog/sheet | Restrained enter/exit, often 180-260 ms | Focus containment/restoration, background interaction rules, interruption |
| Tab/navigation | Immediate state/navigation, optional brief visual continuity | Deep link/back/forward, selection and focus do not wait for animation |
| Expand/collapse | Preserve context and readable content | Expanded state announced, quick reversal and no clipped focus target |
| Save/copy/submit | Immediate pending feedback, success only from actual result | Duplicate prevention, failure retains input and permits safe retry |
| Load/progress | Genuine stage or indeterminate indicator | No fake percent/timer; correct empty/error/canceled/complete outcome |
| Charts | Optional short entrance only when useful | Labels, units, legend/text alternative; reduced motion and no fake data |

Scope web transitions to named properties. Prefer transform/opacity when they
preserve the intended layout. Measure a real cause before adding will-change,
blur, layout animation or new dependencies. Use interruptible behavior where a
user can reverse an interaction. Avoid animating every row or every navigation.

Reduced motion must preserve information and immediate access. Honor system
preferences at the shared component layer and test changes made while running.
Do not use haptics as the only feedback or turn them on globally for familiarity.

State matrix for every changed primitive: default, hover where supported, focus,
pressed, disabled, loading, success, error and selected/expanded when applicable.
Use appropriate states rather than inventing all of them for every control.
Verify interrupted/rapid repeated interaction, long text, touch and host themes.

First-time usability check: give a person unfamiliar with the domain a real goal
without instructions. Observe their first action, completion, hesitation and
recovery. A designer's walkthrough is a heuristic result, not that user test.
