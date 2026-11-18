---
name: "ms-wiqd"
description: "Author, validate and package a Microsoft 365 plugin project using Microsoft Work IQ Dev Tools in a coding host."
license: "MIT"
---

# Build a WIQD plugin artifact

Identify the intended product first. A Microsoft 365 plugin can compose skills,
connectors and an optional agent in an app package. A WIQD coding-assistant
plugin equips the developer's assistant to author these artifacts. A Work IQ
data-access plugin connects an assistant to work context. Identify which is
installed, which artifact the user asked to build, and what the receiving host
accepts.

Inspect the existing repository before scaffolding. Locate appPackage,
manifests, environment definitions, skills, connector specifications, package
scripts and release history where present. Record the current schema
declarations, project tool version and installed extension capabilities. Use the
existing manifest format and live CLI help for validation and packaging
commands. Read current official guidance for feature flags, preview schema
fields and authentication prerequisites. Keep a missing tool or feature visibly
pending.

## Select the authoring path

For GitHub Copilot CLI, Microsoft's documented assistant plugin installation
routes include wiqd@awesome-copilot or the microsoft/wiqd marketplace and
wiqd@wiqd. Check the current installation page and the local coding host before
offering a route. Installing an assistant plugin and installing the WIQD
executable are separate setup actions. This skill installs neither. Use an
available project toolchain and keep unrelated global installations, tenant
registrations and user settings out of local authoring.

Choose the minimum capability needed for the task. For a procedural skill,
define inputs, instructions and the observable output. For a connector, verify
the host supports its schema, authentication, parameter types, result shape and
intended operations. For an agent, bind the exact intended capabilities and
evaluate its routing with realistic prompts. Keep environment-specific
identifiers and secret values outside the reusable artifact as the project
schema allows.

## Validate, package and inspect

Run the installed version's applicable local validation in the project context.
Fix schema errors and broken references. Package the plugin and inspect the
actual archive: verify the manifest, declared skills, connector files and
referenced assets resolve with the expected paths and contents. Check for
unexpanded placeholders where resolution is required and for accidentally
included local credentials or test data. Record tool version, artifact version,
validation outcome and package digest.

For a live test, identify the target environment, identity, access requirements
and expected effect. Provision, register, share or publish only within
explicitly authorized scope. Record each operation actually executed and run the
resulting capability through the intended host. A locally valid package can
still need tenant configuration, consent or publication review.

Return the changed source paths, capability mapping, build and validation
evidence, packaged artifact and exact outstanding host checks. Distinguish local
build, tenant provision, user assignment and successful invocation in the
release record.

[WIQD plugin architecture](https://microsoft.github.io/wiqd/concepts/plugins/) · [Official installation paths](https://microsoft.github.io/wiqd/getting-started/installation/)
