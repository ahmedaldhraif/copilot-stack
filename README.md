# Copilot Stack

Your app-building workflow for GitHub Copilot, Microsoft 365 Copilot for work,
Work IQ and Microsoft tools.
Describe the app. Build a useful journey. Verify it before calling it ready.

**Using a Microsoft app editor that only accepts chat?** Pick a task, replace
the bracketed words and paste the prompt into the open app. [Copy an app editor prompt](skills/ms-app/references/app-editor-prompts.md)

Start with **`/ms-app`** in a compatible Copilot skills experience. It selects the
relevant planning, design, engineering, QA and release workflows. You can also
ask naturally: “Use ms-app to build an approval app for our team.” Skills are
guidance and packaged resources; the host supplies tools, models and permissions.

This is an independently authored, gstack-inspired toolkit. Upstream gstack
already has experimental Copilot CLI support. This toolkit specializes in building
Microsoft-connected apps and preserves host differences. See [comparison](docs/GSTACK.md).

## Download

[Download Copilot Stack v0.1.2 (complete ZIP)](https://github.com/ahmedaldhraif/copilot-stack/releases/download/v0.1.2/copilot-stack-0.1.2.zip). Extract it and open the `copilot-stack` folder. It contains the source, 34 skills, and the Microsoft 365 packages under `dist/m365`. For a work account with configurable agents, see the [Enterprise App Builder setup](docs/M365.md).

## Install

Node.js 22+ is required for the helper CLI. No npm install, API key, runtime
dependency, telemetry, subscription setup or global settings change is needed.
Git is needed for project quality evidence and source checkpoints.

Run from this directory:

```powershell
node bin/copilot-stack.mjs install --personal
```

For a team/project install:

```powershell
node bin/copilot-stack.mjs install --project "C:\path\to\your-app" --agents --instructions
```

Personal skills go to `~/.copilot/skills`. Project skills go to `.github/skills`.
Use one scope for an app to avoid duplicate names across scopes. Restart/start a
fresh Copilot session, type `/`, and verify ms-app discovery. If that host does
not expose skill slash commands, ask it to use ms-app explicitly. Installation
alone does not prove discovery or automatic invocation.

For Microsoft 365 Copilot for work, use the exported Enterprise App Builder
recipe or select/import ms-app through the supported M365 Skills experience.
Local personal installation does not upload skills or configure an enterprise agent.

Use `--dry-run` to inspect conflicts, `--pack core` or `--pack microsoft` for a
subset, and `list` to see workflows. Default is all 34 skills. The five optional
custom agents inherit your selected model; the reviewer has read/search/web tools
only. Roles and aliases depend on the host. No model or MCP server is provisioned.

For Visual Studio's documented prompt-file route, add `--visual-studio` to a
project install. It creates `ms-*-vs.prompt.md` fallback prompts linked to the
selected skills. Native SKILL.md discovery in Visual Studio is not certified here.
Current VS Code Copilot harness uses skills; its legacy Local prompt files are
documented as deprecated for removal in February 2027. See [compatibility](docs/COMPATIBILITY.md).

## Build the app

```text
/ms-app Build an internal request-and-approval app. Keep the main task obvious,
use the right Microsoft host, and verify permissions, saved data and recovery.
```

The route is **understand → select platform → plan → design → build → review →
test → release → learn**. A small change takes only the relevant steps.

- [App quality playbook](docs/APP-PLAYBOOK.md): what “10/10” means in practice.
- [Native UX workflow](skills/ms-native-ux/SKILL.md): familiar, friendly and coherent.
- [Design resource mapping](docs/DESIGN-RESOURCES.md): all requested sources and roles.
- [Freshness and updates](docs/UPDATES.md): current Microsoft features and maintained skills.
- [Recovery](docs/RECOVERY.md): source/history checkpoints and separate data recovery.
- [Microsoft 365 setup](docs/M365.md): 15 importable skills and four agent recipes.
- [Enterprise Work IQ](docs/WORK-IQ.md): grounded work context, supported actions and WIQD app/plugin authoring.

Microsoft specialists cover .NET, Windows desktop, Azure, Graph, Teams/M365 apps,
Power Apps including code apps, Copilot Studio, Office add-ins, Power Automate,
data and team handoffs. Setup, recovery and refresh are support workflows used
at meaningful points in app creation and maintenance.

## Verify and maintain

```powershell
npm run check
npm run export:m365
node bin/copilot-stack.mjs doctor
```

The installer checks all conflicts before publishing managed files, stages
complete bytes, rolls back ordinary failures, and preserves edited/unmanaged
content. Rerunning install applies changes from this local canonical source.
It does not fetch a remote update. See [updates](docs/UPDATES.md) for boundaries.

```powershell
node bin/copilot-stack.mjs uninstall --personal
node bin/copilot-stack.mjs uninstall --project "C:\path\to\your-app"
```

Uninstall removes only unchanged managed files. It reports edited files kept for
you. Read [validation status](docs/VALIDATION.md) for executed checks and remaining
live Copilot, browser, tenant and platform verification. No app is certified
production-ready by installing this toolkit.
