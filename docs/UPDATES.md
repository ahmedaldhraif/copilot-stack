# Stay current while building

`ms-app`, `ms-build` and the optional shared instructions route substantive
Microsoft work through `ms-refresh`. At the start of each such session, and when
the host/feature changes, it checks the current official documentation and the
actual installed toolchain. It records the date, version/channel/tenant
prerequisites, source and observed availability. A missing web/host check remains
unverified. An old checked-on date is not evidence of current tenant availability.

Use Microsoft Learn and product release notes for Microsoft capabilities, GitHub
Docs/changelog for Copilot and official package/repository releases for adopted
libraries. Verify a headline against its actual API/setup reference. Compare CLI
syntax with installed help. Keep stable/preview, region, licensing and permissions
explicit. Preserve supported pinned dependencies unless a tested change is useful.

## Improve this toolkit

The canonical editable source is skills/, adapters/, catalog.json and lib/ in this
checkout. Use a documented platform change, observed failure or repeated evaluation
gap to justify a focused update. Preserve your edits and run `npm run check` plus
the relevant behavioral/host evaluation. Regenerate affected packages and record
source, change, validation and remaining gaps in the change history.

Rerun the same install command to update a managed destination from this checkout.
Only unchanged owned files can be replaced. A personal modification creates a
conflict and leaves every managed destination unchanged. Move/merge that change
deliberately, then retry. Unmanaged files are never adopted or overwritten.
Uninstall removes unchanged owned files and reports preserved edits.

There is no published remote updater, background schedule, telemetry or self-
modifying daemon in v0.1.0. The self-maintenance workflow operates during app/
toolkit work and updates source within the user's authorized scope. If this repo
is later published, add a verified remote/version policy before enabling remote
updates. Do not invent one or silently fetch executable updates.

## Scale based on an actual workload

Set target users/concurrency/data volume, latency, recovery and cost constraints.
Measure the first meaningful bottleneck before adding services, queues or caches.
Prefer clear module/data boundaries, pagination, safe idempotency and bounded
retry/concurrency. Tenant isolation, permission tests, logs, backups and operational
ownership must survive scale. More architecture and more skills are not quality
metrics. Keep the context small by loading only the relevant skill/resources.

## Filesystem behavior

Installation validates paths and rejects symlink/junction ancestors. All conflicts
are checked before publishing content; complete replacement bytes are staged in
the same directory. Ordinary failures roll back the transaction. Concurrent
toolkit installers use a lock. These are local filesystem safeguards, not a
sandbox against a hostile process concurrently changing filesystem links.

An OS/process crash can interrupt a transaction. Preserve files and inspect the
state/lock before retrying; a stale lock is reported, never silently removed.
Conflict handling preserves uncertain files. This is not a crash-consistent
database or a promise of unlimited recovery.
