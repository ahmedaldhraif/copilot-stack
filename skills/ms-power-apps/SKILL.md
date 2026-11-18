---
name: "ms-power-apps"
description: "Select and implement a Power Apps canvas, model-driven or code app, including data access, delegation, environment and delivery checks."
license: "MIT"
---

# Build the Power Apps journey

Identify the primary user, device, workflow, target environment and source of
truth. Choose a canvas app for a tailored task interface, model-driven for a
Dataverse record-centric process, or a code app when a code-first interface and
Power Platform integration match the requirements. For an existing app inspect
its source or exported solution and confirm which changes can actually be
authored with the available tools.

## Build a representative record flow

Follow a record from list or search through create, edit and reread as the
intended user. Document the table key, ownership, required fields and permitted
transitions. Use the data service's security model for record access. Test with
the target persona as well as the maker. Confirm that sharing the app and
granting underlying data access achieve the intended result for each identity.

For canvas formulas inspect delegation against the specific connector and
operation. Test a record beyond the local retrieval window before accepting
search, sort or counts on a large table. Surface validation and connector errors
while preserving the user's inputs. For model-driven apps inspect views, forms
and business process behavior under the actual security role.

For code apps, Microsoft's optional GitHub Copilot CLI quickstart uses the
marketplace `microsoft/power-platform-skills`, plugin
`code-apps-preview@power-platform-skills`, then `/code-apps-preview:create-app`.
Verify its current preview status, prerequisites and target environment before
using that route. The upstream plugin may install dependencies. This toolkit
does not install it. A scaffold or local preview leaves publishing and sharing
to verify separately.

## Move through environments

Identify solution components, dependencies, connection references and
environment-specific settings. Verify licensing and connector policy against the
selected tenant for the users who will run the app. For an authorized test
import, bind target connections, publish required changes and run the record
flow using a non-maker account.

Deliver the app type and decision, table/access mapping, source or exported
solution changes, and evidence for creation, search and denied access. Report
maker-only work that still requires Studio, environment permissions or licensed
connectors.

[Code apps with GitHub Copilot](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/quickstart-github-copilot)
