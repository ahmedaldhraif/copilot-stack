---
name: "ms-graph"
description: "Implement a Microsoft Graph integration with the appropriate identity, permissions, paging and recovery behavior."
license: "MIT"
---

# Integrate one Microsoft Graph operation

Name the user action, Graph resource, operation, API version and tenant type.
Check that operation's current documentation for supported account types,
least-privileged permissions, service-specific restrictions and national cloud
availability when applicable. Pick delegated access for a user-context operation
or application access for a supported unattended operation. Explain who grants
consent and which resources the resulting identity can reach.

## Follow the data boundary

Trace sign-in, acquisition through the project's supported identity library,
outbound request and client-facing response. Apply the app's own access control
before acting on a caller-supplied resource identifier. Request the fields the
screen or job needs. Store tokens in the approved credential cache, never in
fixtures, diagnostics or URLs. Return actionable states for consent required,
unavailable resource and insufficient privileges.

For collection reads, follow the service-issued next link as an opaque
continuation, preserving required headers. Keep cursors out of logs. For
incremental sync, use delta only when the resource supports it. Save checkpoints
after successful processing and specify how to recover if the checkpoint
expires. If a request is throttled, honor Retry-After and bound retries. Account
for retry behavior already supplied by the SDK.

## Verify results and recovery

Exercise an authorized resource and a resource outside the permitted scope using
expected test identities. Cover an empty collection and more than one page. With
controlled responses, simulate throttling and an interrupted sync; record
whether duplicate writes occur. Evaluate idempotency before repeating a write
with an ambiguous outcome. Identify contract fixtures explicitly. Never infer
tenant consent from a mocked success.

Return the operation/version, permission and consent rationale, observed result,
sanitized request identifier, tested recovery behavior and target tenant gaps.
If credentials are unavailable, finish the adapter and contract tests locally
and supply the precise live check remaining. Share only the identifiers and
evidence necessary to reproduce the result.

[Paging](https://learn.microsoft.com/en-us/graph/paging) · [Throttling](https://learn.microsoft.com/en-us/graph/throttling)
