---
name: "ms-recovery"
description: "Prepare app recovery checkpoints or investigate missing code and data, restore to an isolated target, and verify actual business records and access."
license: "MIT"
---

# Recover the app in a separate target

Start read-only. Record the affected environment, first known bad time, last
known good event, affected accounts, observed symptoms and ongoing writes.
Preserve the current working copy, run identifiers and available logs. Avoid
resets, cleans, force pushes, migration rollbacks and in-place restores. If a
job keeps damaging data, identify the narrowest reversible containment step and
the authority needed to pause it. Record when containment took effect.

## Find a recovery point for each layer

For source, inspect Git status, branches, log, stash and local reflog, plus
available editor history. A reflog can locate an earlier local reference while
retained. It cannot recreate arbitrary unsaved content. Inspect candidate
revisions or copies without switching or discarding the active worktree.

For a preventive toolkit checkpoint, choose a new private destination outside
the project. Its source snapshot covers Git-tracked and nonignored untracked
files subject to exclusions, and records hashes. Common secret paths are
excluded; source files can still contain sensitive content. Check the manifest
for omissions. Do not rely on the checkpoint for Git history, ignored assets,
credentials, database contents or cloud state. Use its restore operation only
into a new directory and verify file hashes before use.

For application data, inventory the actual store, retention window, backups,
point-in-time restore options, attachments, configuration, connection bindings,
identities and migration history. Track code revision, schema version and data
timestamp separately. A migration file describes a transformation; it cannot
restore deleted records. For services without accessible backups, document
available exports, audit logs and known gaps.

## Restore and test before cutover

Obtain acceptable data-loss and downtime objectives from business owners or an
existing recovery plan. Leave unknown targets open. Select a point before the
incident and account for legitimate writes after that point. Restore to a fresh
isolated environment with outbound automation, notifications and production
connectors disabled or redirected. Apply only the configuration required for a
controlled smoke.

Compare counts and invariants, sample known accounts, verify ownership and
attachments, then exercise a create/read/update journey using disposable
records. Check sign-in and denied access under representative identities.
Measure actual recovery duration and the newest correctly recovered event.
Reconcile later valid writes and capture remaining discrepancies before
proposing cutover.

Return the recovery sources, verified restore target, comparison results,
observed gap and candidate cutover/rollback plan. Preserve the original and the
recovered copy for review. Obtain authorization for switching traffic, replaying
external actions or modifying production data.

[Azure disaster recovery guidance](https://learn.microsoft.com/en-us/azure/well-architected/reliability/disaster-recovery)
