---
name: "ms-investigate"
description: "Find and fix the root cause of a reproducible app bug, failed build, pipeline or integration. Use for debugging unexpected behavior or incidents."
license: "MIT"
---

# Prove the cause, then fix it

Identify expected/actual behavior, first failing boundary, affected version and
environment. Read the error and relevant code/logs without dumping tokens or
personal data. Preserve current edits. For incidents, establish impact and the
safe containment action before changing code; use existing incident authority.

Reproduce the smallest failing case. If a pipeline failed, locate the earliest
causal step rather than repairing downstream symptoms. Compare with the last
known good revision/configuration and form a falsifiable hypothesis. Inspect
one boundary at a time; do not shotgun configuration changes.

Microsoft-specific discriminators:

- Wrong account, tenant, subscription/environment or expired credentials.
- Delegated versus application permissions; consent versus actual authorization.
- Local success versus host WebView/manifest/requirement-set restrictions.
- Connector policy, connection reference, data role or sharing failure.
- 429/Retry-After, duplicate delivery, eventual consistency or stale cache.

Instrument the narrowest useful point using redacted correlation/request IDs.
Do not log complete tokens, CVs, documents or mailbox content. Separate observed
facts from hypotheses and a transient recovery from a permanent fix.

Implement the root fix in scope. Add a regression that fails on the original
behavior and passes with the change where practical. Re-run the exact failing
command/journey, then relevant checks. Record environment, revision and evidence
for before/after. Missing credentials or host access remains a named blocker.

Write a concise cause/fix/verification receipt in the existing issue or
`docs/app/investigation.md`. If reproduction is unavailable, provide the strongest
supported hypothesis and the next discriminating check, not a claimed diagnosis.
