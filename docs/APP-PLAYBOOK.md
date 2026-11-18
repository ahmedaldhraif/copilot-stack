# A quality app is a verified useful journey

Start with `/ms-app` and an ordinary description of the user's goal. Use existing
product decisions and source. The following is this toolkit's rubric, informed
by Microsoft platform guidance; it is not a Microsoft certification or universal
numeric grade. “10/10” means addressing all applicable dimensions with evidence.

| Dimension | Agree a concrete target | Collect evidence |
| --- | --- | --- |
| User value | Named persona completes a meaningful task | Observe a real first-time user against the agreed outcome |
| Functionality | ACs cover success and meaningful failure | Focused regressions plus the full primary journey |
| Experience | Next step is obvious, familiar and responsive | Real host, useful visual hierarchy, complete states and novice task observation |
| Accessibility | Intended users can finish with relevant inputs/assistive tech | Keyboard/focus, semantics, contrast/zoom and actual reader/host tests |
| Security/privacy | Correct user/tenant can act; others cannot | Positive and negative authorization, tool and data-boundary checks |
| Data integrity | Records remain correct across retries and schema changes | Duplicate/concurrent request, migration and restored-record tests |
| Reliability/recovery | Dependencies can fail without losing control of the task | Timeout/retry/cancel, failure injection and an isolated recovery drill |
| Performance/cost | Agreed latency/volume/device and cost budget | Representative data/load, measured distribution and dated assumptions |
| Maintainability | Another builder can reproduce and safely change the app | Clean setup, focused automation, understandable ownership and docs |
| Operations/release | Release can be observed and recovered | Current artifact, real smoke, rollback owner/trigger and useful redacted signals |

Use **met, missed, unverified or not applicable with a reason**. A critical
permission/data failure blocks release even when other areas look good. Do not
average missing checks into a flattering score. Scale effort to the change.

For an approval app, verify a requester can submit, reload and see one saved
request; a timeout/retry does not duplicate it; an approver can decide; another
user cannot access the record; and the deployed/recovered app preserves that
behavior. A pretty screen and green unit tests establish only part of that result.

## Keep it instantly familiar

One primary task, ordinary language, recognizable navigation, useful defaults,
visible labels and progressive disclosure. Preserve drafts, context and input
after errors. Provide genuine save/progress states and a clear recovery route.
Use useful previews/status/visual explanations and calm branded detail. No extra
dashboard, mascot, chat surface or motion just to use a component source.

Microsoft host conventions guide the control behavior. Brand expression belongs
in approved tokens, content and assets. A web pattern must be translated when
Power Apps or native Windows cannot use its React code.

## Record evidence with the helper

From this toolkit, using your Git repository root:

```powershell
node bin/copilot-stack.mjs init-quality --project "C:\path\to\your-app"
```

Edit `.copilot-stack/quality.json`: give every applicable gate a concrete target,
set the actual environment, and give any non-applicable gate a reason. Empty
targets start unconfigured. Save a durable copy of targets in project docs if
they need team review; `.copilot-stack` is private runtime state.

Record an actual relevant command:

```powershell
node bin/copilot-stack.mjs check --project "C:\path\to\your-app" --id functionality -- node --test
```

The helper records the command, result, log hash, environment, source HEAD/index
and working/untracked file content. A changed source, plan, artifact or expired
receipt invalidates readiness. Git-ignored runtime configuration is outside the
source fingerprint: use a new environment/version label when it changes.

For manual host checks, save evidence within the app directory, then use:

```powershell
node bin/copilot-stack.mjs record --project "C:\path\to\your-app" --id experience --result pass --observed "Keyboard form journey passed in the recorded Teams build and test account" --artifact ".copilot-stack/screenshots/form.png"
node bin/copilot-stack.mjs quality --project "C:\path\to\your-app"
```

That is your labeled attestation, not an independently executed browser test.
A successful command must actually test the stated target; the recorder cannot
judge the semantic adequacy of a test. Private logs/artifacts may contain app
data; inspect/redact before sharing. On Windows, use an executable such as node,
or explicitly invoke pwsh for shell commands; the helper never enables a shell
implicitly. `quality` exits 2 while evidence is incomplete.
