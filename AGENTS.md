# Copilot Stack development

This repository authors skills for Microsoft app development. Read the requested
skill before changing it. Preserve source-backed host boundaries in docs/COMPATIBILITY.md.

- Canonical skills live in skills/. Each skill must be self-contained when copied
  or exported; local references must stay within its own directory.
- Runtime uses Node.js built-ins, no network calls, no telemetry and no credentials.
- Installer changes require tests for conflicts, modified user files, path escape,
  junction/symlink ancestors, and rollback. Never overwrite unmanaged content.
- Evidence must bind to working content, the quality plan and environment. Missing
  browser/tenant verification is unverified, even when unit tests pass.
- Run npm run check after changes. Run npm run export:m365 after skill/profile
  changes and independently inspect its ZIP files.
- Local validation does not certify Copilot discovery or live tenant behavior.
