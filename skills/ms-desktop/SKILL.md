---
name: "ms-desktop"
description: "Implement and verify a Windows desktop or cross-platform .NET client, including native interaction, packaging and lifecycle."
license: "MIT"
---

# Build a desktop app for its actual host

Identify the operating systems, processor architectures, distribution channel
and native features the user needs. Inspect the existing project and installed
build workloads. Preserve WPF, WinForms, WinUI or MAUI conventions in an
established app. For a new Windows-first app evaluate WinUI and Windows App SDK.
For shared mobile and desktop delivery evaluate .NET MAUI against each target's
platform support. Record the requirement that drives the choice.

## Follow the native journey

Trace launch, window activation, input, persistence and close or suspend. Keep
blocking file or network work off the UI thread. Handle cancellation when the
window closes during a long operation. Use the platform's picker for
user-selected files and its credential facility for tokens. Keep settings and
application data in appropriate user locations. Design recovery for unavailable
paths, revoked permission and a missing network connection.

Check keyboard order, visible focus, accessible names, high contrast, display
scaling and resizing on the actual screen containing the new feature. For a
mobile target also check back navigation and suspend/resume. Inspect effective
state after reopening the app. If it accepts a file association or deep link,
handle a second activation while the app is already running.

## Verify installation and upgrade separately

Build the intended target and configuration. Launch it and record the target OS,
architecture and package identity where relevant. Exercise the primary task in a
non-administrator session. When distribution is in scope, install the actual
package into a disposable profile or VM and test the upgrade from a supported
prior build with representative saved data. Preserve signing material outside
the repository.

Deliver the project entry point, target matrix, build command, observed native
behavior and packaging results. Mark simulator-only, locally unsigned or
unavailable target results individually. A Windows run leaves other target rows
pending until exercised on the relevant host.
