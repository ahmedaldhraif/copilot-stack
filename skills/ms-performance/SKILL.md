---
name: "ms-performance"
description: "Measure and improve an app's latency, responsiveness, throughput and operating cost. Use for slow apps, load planning, performance regressions or Microsoft service efficiency."
license: "MIT"
---

# Measure before optimizing

Read the journey, actual stack and observed complaint. Define target device,
host, dataset, concurrent volume, percentile/latency budget and cost driver.
Reuse existing SLOs. If none exist, propose an explicit provisional target;
do not turn an arbitrary benchmark into a business requirement.

Establish a reproducible baseline with the same environment and representative
data. Separate cold/warm start, client rendering, network, API, database and
external connector time. Use available traces/profilers/metrics and redacted
correlation IDs. A local fixture benchmark is not a production load result.

Inspect the bottleneck supported by evidence:

- Repeated renders, expensive main-thread work, bundles and overfetching.
- Query shape/indexes, N+1 calls, paging and large-result materialization.
- Power Fx delegation and data-volume limits before client-side filtering.
- Graph/connector throttling, safe caching and bounded concurrency/retries.
- Azure scaling/cold starts, resource sizing and AI token/tool consumption.

Agree a load-test target before generating traffic against a shared/paid service.
Use a local or isolated environment for exploratory tests when possible. Do not
optimize by dropping authorization, durability or required telemetry.

Change the smallest causal area. Re-run the baseline under comparable conditions
and report before/after distribution, sample size, dataset, environment and
revision. Check correctness and capacity/cost tradeoffs alongside speed. One
fast request cannot establish a p95, and a static build cannot prove runtime cost.

Write `docs/app/performance.md`: user-visible target, measurement, cause, change,
observed improvement/regression and open capacity/price assumptions. Use current
official service pricing only if estimating money; record date and region.
Missing live metrics stays unverified rather than becoming a fabricated saving.
