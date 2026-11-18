# One coherent design workflow

Use `/ms-native-ux` for implementation, or let `/ms-app` select it. The source
review was performed in the user's requested order: Checklist Design skill, Amicro
skill, relevant checklist coverage, Amicro CLI/catalog, Beautiful UI, complementary
transitions, charts and provider logos. AIforUI and Astryx add judgment and a
conditional component foundation. [Full resource guidance](../skills/ms-native-ux/references/resources.md)

| Priority | Resource | Pattern/decision | Shared component or journey in a future app |
| --- | --- | --- | --- |
| P0 | Checklist Design | Missing-state and flow audit | Form, save, error, empty state, navigation, table and dialog coverage |
| P0 | Microsoft host guidance | Familiar semantics and native behavior | App shell, theme, focus, keyboard and host panels |
| P1 | Amicro | Suitable press/feedback, expand/collapse and brief transitions | Shared buttons, menus, dialogs, tabs and task states |
| P1 | AIforUI | Motion judgment/removal, performance and realistic stress data | Reused primitives and their actual narrow containers |
| P1 when applicable | Beautiful UI | Truthful pending/tasks, sources, composer and proposed edits | Existing AI journey, without introducing an unnecessary feature |
| Conditional | Astryx | A cohesive React 19+ component/theme foundation | New compatible app or an existing Astryx app; evaluate beta and peers |
| Conditional | Transitions.dev | A useful gap in the chosen motion vocabulary | One specific interaction; check current terms before copying code |
| Conditional | Mono Charts | A clear chart of real existing data | Relevant report with labels, units and text/table alternative |
| Conditional | SVGL | Provider marks in a recognizable integration context | Connections/account UI; one separate UI icon family for actions |

No specific product app was selected for redesign in this task. These mappings
are implementation rules for future apps, not claims that those screens already
exist or have been browser-tested. No UI library was added to this Node toolkit.

Checklist Design's and Amicro's actual skill instructions were loaded from their
source checkouts. Their documented installer routes were read; neither a global
skill installer nor a third-party component CLI was applied to an unrelated app.
AIforUI's current design-engineering, stress-test and performance guidance was
read. Astryx's README and MIT license were checked. Sources remain linked rather
than copied into competing skill/component distributions.

Live browser research covered the Amicro category navigation, setup routes and
component detail, Beautiful UI's approval selection/disabled feedback,
Transitions.dev's menu/dialog demos, Mono Charts' catalog and SVGL's Microsoft
search. These observations are research, not an accessibility audit of those
libraries or proof of integration in a generated app. Inspect and test the chosen
component code and its real host before adopting it.

At review, Checklist Design, Amicro, Beautiful UI, AIforUI and Astryx expose MIT
licenses. Transitions.dev separates MIT tooling from restricted redistribution
terms for transitions/skills. SVGL's code license and each provider's mark usage
are separate concerns. [Sources and licenses](SOURCES.md)

“Lovable and credible” means useful previews, real status, clear ownership, warm
copy and approved assets. An illustration needs a task-related role, source,
license and accessible alternative. Do not invent testimonials, partner badges,
metrics or provider endorsements. Preserve supplied brand/character artwork.
