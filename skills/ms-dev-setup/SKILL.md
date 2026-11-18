---
name: "ms-dev-setup"
description: "Set up or diagnose a project-local Microsoft app development console, toolchain, logging and debugger on the actual workstation."
license: "MIT"
---

# Make the local development loop reproducible

Start in the intended checkout and read the repository instructions, CI
configuration, project manifests and lockfiles. Identify the app's normal entry
point, dependencies, target host and the fastest meaningful smoke test. Inspect
existing terminal, editor, task and debugger settings before touching them.
Preserve customized profiles and unrelated workspace configuration.

## Resolve the toolchain

On Windows identify the active PowerShell edition and version using
$PSVersionTable. Inspect individual executable resolution with Get-Command. Run
relevant version checks from the working directory used by CI or the documented
launch task. Check global.json and target frameworks for .NET, the package
manager field and lockfile for JavaScript, or the declared workload and solution
tooling for Power Platform. Respect supported versions and roll-forward
settings. For preview tools verify the installed help and current Microsoft
reference before recommending syntax.

A toolkit doctor check establishes executable presence only. Test SDK selection,
dependency restore, compilation and host startup separately. Identity and
service availability require their own authorized checks. Use the existing
developer identity or least-privileged test account for the named environment.
Report the target using a non-sensitive alias. Keep credentials out of command
arguments, shell history, launch profiles and logs.

## Configure the console for useful evidence

Use project-scoped settings when a change is needed. Keep the user's global
terminal profile, execution policy and environment intact. Use literal paths for
names with spaces. Check the exit code of the native command that failed.
Preserve the earliest relevant diagnostic with its command, working directory
and version. Enable verbose logging only for the failing component and reduce it
after diagnosis.

Preserve the project's file encoding and line endings. For generated text,
specify UTF-8 compatible with the consuming tool. Windows PowerShell and modern
pwsh have different output defaults. Verify a non-ASCII round trip for localized
apps or data pipelines. Avoid full environment dumps or transcripts containing
authorization headers, tokens, connection strings or personal data.

## Run and debug the real path

Reuse an existing launch profile or add a narrowly scoped project profile when
needed. Match the executable or attach target, working directory, development
environment and ports to the app's documented run path. Launch the app, hit a
breakpoint or equivalent debug event on the primary journey, then run the
focused test outside the debugger. For a maker-only host, inspect its supported
monitor or test trace and label any workstation-only checks.

Return the reproducible build/run/debug steps, effective versions, redacted
verification result and remaining host prerequisites. Include configuration
changes and how to reverse them. Report a verified debug session only when the
debugger actually attached and observed the target behavior.

[PowerShell encoding](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_character_encoding) · [.NET SDK selection](https://learn.microsoft.com/en-us/dotnet/core/tools/global-json) · [VS Code debugging](https://code.visualstudio.com/docs/debugtest/debugging)
