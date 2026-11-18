---
name: "ms-dotnet"
description: "Build or change an ASP.NET Core API, .NET service or worker and verify its behavior through the running application."
license: "MIT"
---

# Build the .NET application slice

Start from the solution, target frameworks, global.json, package management and
CI commands already in the repository. Trace the user journey from endpoint or
queue handler through authorization, domain rules and persistence. Locate the
closest production path and its integration tests. Match the solution's
conventions for dependency injection, validation, configuration and error
responses.

## Make the contract visible

Specify who can call the operation, the stable request shape, success result and
the client action after an invalid or conflicting request. Protect tenant and
record ownership at the service or query boundary. Derive ownership from
authenticated identity. Bind only fields the caller may change. Keep internal
errors and credentials out of the response.

For writes, identify the transaction boundary and what happens if the caller
retries after the database commits. Apply an existing idempotency or concurrency
pattern when the operation warrants it. For workers, identify the
acknowledgement point, cancellation behavior and recovery path for a repeatedly
failing item. Propagate cancellation through supported downstream calls.

## Exercise the running contract

Build with the project's supported SDK. Run focused tests through its existing
application host. Send an accepted request and a realistic invalid or
unauthorized one. Read the resulting state through the normal interface. If
provider-specific behavior matters, exercise the supported database or clearly
identify any substitute.

When changing the schema, inspect the generated migration and its effect on
existing rows. Check compatibility during rollout when old and new application
versions may overlap. Test against disposable data. Keep production migration
execution within the release owner's authorization.

Return the files and entry point changed, the observed HTTP or worker result,
persistence evidence and the revision tested. Identify any unverified identity
provider, queue or database integration. Pass the changed contract and
reproduction to QA and the release owner.
