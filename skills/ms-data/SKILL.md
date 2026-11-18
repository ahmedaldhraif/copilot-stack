---
name: "ms-data"
description: "Design or change application data in Dataverse, Azure SQL or a Microsoft 365 list, including ownership, queries and safe migrations."
license: "MIT"
---

# Prove the application's data contract

Start with the records and queries the app actually needs. Identify the system
of record, business key, ownership boundary, access patterns and required
consistency. Inspect existing schema, retention obligations, production data
shape and export paths. For a new choice, compare the relevant candidates on
relationships, transactional writes, authorization, query scale, licensing and
recovery. Reuse a fitting store already operated by the team.

## Model one real lifecycle

Describe a record at creation, after an allowed transition, and after archive or
deletion. Define which fields can be missing, which must be unique and how stale
writes are detected. Decide what old clients and existing records see when a
field is introduced. Apply access controls at the storage or service boundary.
Test list, detail, update and export paths under the same ownership rules.

For Dataverse, inspect table ownership, security roles, relationships and
alternate keys. For Azure SQL, use constraints and transaction boundaries where
correctness depends on them; inspect indexes against representative query plans.
For Microsoft Lists or SharePoint lists, check indexing, filter support and
behavior at expected volumes. Include the connector's paging and delegation
behavior when a UI queries through a connector.

For migrations, inspect actual transformations and determine whether old and new
app revisions can coexist. Use a representative disposable dataset with
duplicates, missing values and older rows. Define resumable batches if a large
backfill can stop mid-run. Identify recovery from a bad migration, including how
to preserve new writes made during rollout.

## Verify the stored result

Run the normal create, read, update and retry journey and inspect the final
durable state. Exercise concurrent edits or duplicate event delivery where
relevant. Compare before/after counts and business invariants, and test access
with a second identity. A backup policy establishes intent; record restore
behavior separately when recovery is an acceptance criterion.

Return the schema or solution diff, query and permission rationale, migration
and recovery steps, tested data volume and outcomes. Mark provider-specific
behavior observed only through mocks, an emulator or a different database as
pending on the target provider.
