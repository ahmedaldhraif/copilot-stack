# Recover source separately from app data

Use `/ms-recovery` before risky app changes or when something is lost. Establish
the affected layer and preserve current evidence before repair. Code, Git
history, ignored configuration, data, attachments, connections and tenant
resources need different recovery sources.

## Source checkpoint

Requires a Git repository and a NEW private directory outside it:

```powershell
node bin/copilot-stack.mjs checkpoint --project "C:\path\to\your-app" --out "C:\private-backups\your-app-before-migration"
```

This copies working-tree Git-tracked and nonignored untracked regular files with
a manifest of sizes/hashes and executable intent. Deleted working files and common secret/configuration
filenames are omitted and reported. Symlink/submodule worktrees are rejected.
Git-ignored assets/configuration and live app data are outside this checkpoint.
Filename exclusions do not prove every source file is free of sensitive content.

For a full, non-shallow Git clone with committed history, add `--history`. That
creates a separate all-refs history.bundle. The bundle includes historical
content even when a working-tree filename was excluded; keep it private. Unborn
or shallow repositories cannot produce this toolkit's history backup. The source
snapshot works without --history. A reflog/editor's local history is another
time-limited recovery source, not a universal backup of unsaved content.

## Restore into a new directory

```powershell
node bin/copilot-stack.mjs restore --from "C:\private-backups\your-app-before-migration" --to "C:\recovery\your-app-inspection"
```

The helper verifies every listed source artifact and any history bundle before
writing. It copies source only to a new directory and never restores in place.
It does not initialize Git or replay database migrations/automation. Inspect the
result, then use ordinary Git recovery tools for a supplied bundle in a separate
checkout if needed. The skill guides the remaining work and actual smoke tests.

## Data and environment recovery

Inventory actual backup/PITR/export/audit options and retention for Dataverse,
SQL, storage and any other real service. Record source revision, schema version
and data timestamp separately. Migration scripts cannot recreate deleted records.
Agree acceptable data loss/downtime with the business or its existing plan.

Restore data/configuration to a fresh isolated target, redirect outbound actions,
verify record counts/invariants/attachments and sample accounts, then exercise a
real create/read/update and denied-access journey. Reconcile legitimate later
writes before a proposed cutover. Use the production authorization already given
or obtain any still-required authorization immediately before that action.

The toolkit has not backed up or restored your live data merely because a source
checkpoint succeeded. Keep that distinction in every report.
