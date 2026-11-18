---
name: "ms-office-addin"
description: "Build and validate an Office.js add-in for a particular Office application, platform, manifest and document workflow."
license: "MIT"
---

# Build inside the Office host

Identify the Office application, target clients and exact document or mailbox
operation. Pick the entry point that belongs in that workflow, such as a task
pane, ribbon command, or a supported Outlook event. Inspect the existing
manifest type and runtime architecture. Verify support for each required
capability on the target platform against Microsoft's requirement sets before
adopting an API or changing manifest format.

## Work with host state

Declare the minimum requirements the core journey needs. For optional
capabilities, check support at runtime and provide a usable fallback. Initialize
Office.js before accessing host context. For Excel, Word or other batch-based
APIs, load the properties you read and synchronize at sensible boundaries. Avoid
a separate round trip for every row in a large range. For Outlook, account for
the item's read or compose state and the relevant mailbox APIs.

Specify which document content will be touched. Validate the selection at the
time the command runs. Preserve surrounding cells, styles or text outside the
requested edit. Handle empty selection, protected content, changed item or
unavailable document context. If external identity or Graph is needed, map that
permission boundary separately from the Office host's document access.

## Prove the user-visible effect

Validate the manifest and confirm asset URLs resolve in the intended
environment. Launch or sideload into a supported test host when authorized. Open
a disposable sample document, execute the actual command and reread the result
after reopening it. Compare a neighboring range or paragraph to confirm it was
preserved. Test keyboard access in the task pane and what the user sees when an
optional API is unavailable.

Return the changed manifest and code paths, requirement sets, tested Office
product/platform/version, sample document behavior and any uncovered clients.
Record the difference between browser-only UI tests, manifest validation and
host execution. If sideloading is blocked, deliver exact prerequisites and the
pending host check before making a distribution claim.

[Office versions and requirement sets](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/office-versions-and-requirement-sets)
