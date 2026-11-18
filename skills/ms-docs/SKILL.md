---
name: "ms-docs"
description: "Create accurate app setup, usage, API and operations documentation from verified behavior. Use for developer handoff, README, runbook, release notes or app support instructions."
license: "MIT"
---

# Make the next person's first task work

Identify the reader and their first useful task: install/use, develop, administer,
integrate or recover the app. Inspect actual commands, configuration, manifests,
tests and supported hosts. Update existing authoritative docs; avoid parallel
guides that disagree. Do not document a planned feature as available.

For setup, explain prerequisites, account/license/environment, commands from a
clean checkout, expected result and likely errors. Keep secrets out of examples.
Distinguish a local fixture, tenant integration, staging deployment and production
installation. Verify commands when tools permit; label others unexecuted.

For a handoff or runbook, include:

- What the app does, intended users and supported host/device boundaries.
- Source structure, configuration ownership and dependency/version requirements.
- Auth/data/connector boundaries and where access is granted or revoked.
- Focused test/build/deploy flow and concrete success checks.
- Troubleshooting by symptom, safe rollback/restore and operational owner.

For API docs, describe actual request/response/errors, auth and idempotency rather
than copying type declarations. For release notes, lead with changed user behavior
and migration/action required. Cite source paths or authoritative external docs
for claims that a reader needs to verify.

Walk through the reader's path in a clean fixture or available host. Check local
links, filenames, copyable commands and whether the named result is visible.
Static documentation validation cannot prove a successful tenant setup.

Return the updated artifact and verification result. If a requested external
publication is not yet authorized, complete the local reviewable content and
identify that final step. M365/Office editing requires an available tool or manual
handoff; this skill alone cannot open or edit native documents.
