# Choose the host's familiar behavior

Preserve a product's approved brand. Native familiarity comes from behavior,
semantics, state and task structure, not a copied Microsoft logo or blue palette.
Check these sources again before adoption; this baseline was reviewed 2026-11-18.

| Host | Foundation to prefer | Important checks |
| --- | --- | --- |
| Existing web app | Its established accessible components and tokens | Avoid a parallel button/dialog system; improve shared primitives first |
| New Microsoft-oriented React web app | Evaluate Fluent UI React v9 for the actual audience | Provider/theme boundaries, SSR/framework support and current peer versions |
| Standalone compatible React 19+ app | Astryx is an alternative foundation if selected | Beta status, version/peer requirements, CSS/provider setup, theme and coverage |
| Teams tab/app | Existing/appropriate Fluent controls plus Teams design guidance | Host theme/contrast, tab scope, SSO, narrow panel, no duplicate host navigation |
| Office add-in | Office layouts and requirement sets, with compatible branded controls | Task-pane width, keyboard, client API support, loading and document context |
| Power Apps canvas/model-driven | Supported maker controls and modern themes | Delegation, accessibility, responsive containers, offline and control limitations |
| Power Apps code app | Compatible web foundation inside supported managed platform | Connector/DLP/auth/host restrictions, real user sharing and packaging |
| Windows desktop | Incumbent WPF/WinForms or WinUI/Windows App SDK for chosen scope | Native navigation, keyboard/accelerators, scaling, high contrast, packaging/update |
| .NET MAUI | Platform controls and shared UI where appropriate | Each target OS; do not claim native behavior from one web preview |

Read the relevant official guidance:

- [Fluent 2](https://fluent2.microsoft.design/)
- [Fluent UI React](https://react.fluentui.dev/)
- [Teams app design](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/design/design-teams-app-overview)
- [Teams tabs](https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/design/tabs)
- [Office add-in design](https://learn.microsoft.com/en-us/office/dev/add-ins/design/add-in-design-language)
- [Power Apps modern controls](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/modern-controls/overview-modern-controls)
- [Windows app design](https://learn.microsoft.com/en-us/windows/apps/design/)
- [Astryx source and setup](https://github.com/meta/astryx)

Amicro is a source of suitable interactions. Import its component code only when
compatible with the selected foundation. Otherwise translate the useful behavior
into native controls. Preserve the native component's keyboard, focus and
accessibility contract when adding any visual behavior.
