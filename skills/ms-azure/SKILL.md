---
name: "ms-azure"
description: "Choose or implement Azure hosting, identity, infrastructure and deployment checks for an application workload."
license: "MIT"
---

# Fit Azure resources to the workload

Start with the app's traffic pattern, execution duration, state, dependency
locations, tenant boundary, recovery needs and spending constraint. Inspect
existing infrastructure definitions and delivery pipelines. Prefer an
established, supported hosting path when it meets the requirements. Explain the
decisive reason for a new service, such as background processing, private
networking, container dependencies or scaling behavior.

## Connect the real dependencies

Map each runtime component to its identity, inbound access, outbound dependency
and required permissions. Prefer managed identity when the dependency supports
it. Assign permissions at the smallest working scope and keep deployment
identity separate from runtime identity. Keep environment-specific values in
parameters or approved configuration. Read secret references through the
runtime's supported mechanism and keep their values out of evidence.

Use the project's Bicep, Terraform or other deployment conventions. Check name,
region and SKU assumptions before provisioning. Separate durable resources from
replaceable application components. For queues or events document
acknowledgement, retry, dead-letter ownership and duplicate delivery. Define a
useful readiness signal that distinguishes an unhealthy dependency from a dead
process.

## Establish a release path

Validate templates locally and inspect the available change preview for
replacement, deletion, public exposure and role expansion. A preview can require
authenticated access. Record subscription and environment aliases without
printing credentials. Execute only deployments within the authorized scope. For
an actual deployment, trace one request through the normal endpoint and
dependency under the runtime identity. Record its correlation identifier,
observed outcome and any retry.

Return the resource diagram or concise dependency list, deployment inputs,
preview summary, smoke check, rollback procedure and estimated cost drivers.
Estimate using stated region, idle and peak assumptions. A successful template
build establishes syntax and compilation. Resource availability, network access,
permissions and billed consumption need evidence from the designated Azure
environment.

[Azure Well-Architected pillars](https://learn.microsoft.com/en-us/azure/well-architected/pillars)
