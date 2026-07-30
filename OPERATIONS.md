# OPERATIONS — running the loop

Read before an unattended run. This file owns harness mechanics, cost, the run directory, and recovery.
`CONTRACTS.md` is normative and outranks every line here. Where its ownership table names a section
below — §4's token seed (C4), §5's stop rule (C2), §6's tree (C3) — the text is that contract's
**wiring** and must match it exactly; a divergence is a bug in this file, never in the contract.
Everywhere else this file references a contract and defines nothing.

| For | Read |
|---|---|
| The five frozen contracts. Outranks everything below | `CONTRACTS.md` |
| Why a stopping rule is legitimate at all | `DOCTRINE.md` § Termination theory |
| "The loop is doing X, what is wrong" | `FAILURE-MODES.md` § TRIAGE TABLE |
| Which model a role gets, and its prompt | `ROLES.md` § Spawn rules |
| What a critic may inspect, per modality | `CONTRACTS.md` C5, then `INSPECTION.md` |

Every harness fact, path, and `jq` line below was executed against Claude Code 2.1.207 on real run
records. Re-run them if your version differs.

## 1. Harness selection

| Primitive | What it is | Use it for | Do not use it for |
|---|---|---|---|
| **Workflow** | Deterministic JS orchestration. `agent()` / `parallel()` / `pipeline()` / `phase()` / `log()` / `budget` / nested `workflow()`. Runs in the background, returns a task id, notifies on completion. | Every multi-round loop. Rounds, fan-out, blind side assignment, and the stop rule become code you can read, not intent you hope for. | A single artifact with one round of critique. The script is overhead. |
| **Agent** | One subagent, inline, you read the result. | Round zero: scout the goal, find the parts, fetch and freeze the bar. Also any one-off re-judge. | Loops. You become the scheduler, and you will drift. |
| **`/loop`** | The interval skill: re-runs a prompt or slash command on a schedule (`/loop 5m /check`). | Watching something already deployed. Periodic re-judgment against a bar that moves. | The baseline's `/loop until perfect`. That phrase means a while-loop; here it is a `for` over rounds inside a Workflow script. Different mechanism, same intent. |
| **ultracode** | Standing session opt-in. Author and run a workflow for every substantive task; token cost stops being a constraint. | Declared open-ended runs where the ceiling is the budget, not the plan. | Anything you have not budgeted. It removes the one brake that was free. |

Workflow requires explicit operator opt-in: the word `ultracode`, an ultracode session, "use a workflow"
in the operator's own words, or a skill that instructs the call — a loop that *deserves* a workflow does
not authorize one. **The hybrid is almost always right:** scout inline with `Agent` to discover the parts
and freeze the bar, then hand that list to a Workflow as `args`.

### pipeline() inside a round, parallel() at the round boundary

`pipeline(items, s1, s2, …)` runs each item through every stage with **no barrier** — part A is judged while
part B still builds, so wall clock is the slowest single chain, not the sum of slowest-per-stage. Each stage
receives `(prevResult, originalItem, index)`. `parallel(thunks)` awaits everything, and exactly one place in
a gauntlet loop is correct for that barrier: the round boundary. Three reasons hold at once. The gate is the
whole artifact (part panels are advisory per C2.4, and integration rot `F16` only appears once every part
has landed). "Is this gap fresh?" is a question about all verdicts at once, and C2's dryness test reads the
answer. Zero fresh gaps skips straight to the delta panel.

### Script constraints that bite gauntlet authors

| Constraint | Consequence for you |
|---|---|
| `Math.random()`, `Date.now()`, argless `new Date()` **throw** | You cannot shuffle A/B sides randomly. Derive them the way `ROLES.md` § Slots does: `const candAt = (r, i) => ((r + i) % 2 === 0 ? 'A' : 'B')`, where **`i` is the arena index, never the judge index** (§5, §6). Every arena flips side each round, which splits order across rounds and across parts. It does **not** split order inside a panel: all five judges of one arena see the same mapping. Within-panel position bias is F11's same-side-5/5 signal, cleared by re-judging the swapped twin arena. |
| `Math.sqrt`, `Math.max`, arithmetic | Available and barely needed. §5 counts to five with comparisons; nothing is looked up and no interval is computed. |
| No filesystem or Node API in the script | The script cannot write the run directory. It passes **absolute** paths in prompts; **agents** write files (C3.5). Structured verdicts come back through `schema`. Anything §5 needs from disk — a probe regression, a gap count — arrives as an agent's return value. |
| `meta` must be a pure literal | No variables, no interpolation. Required: `name`, `description`. Optional: `whenToUse`, `phases`. |
| Plain JS, not TypeScript | Type annotations fail to parse. |
| Concurrency cap `min(16, cores − 2)` | Excess queues. Fan out 40 parts if you like; ~10 run at once. Keep headroom so a wide builder fan-out cannot starve the judges behind it. |
| 1000 `agent()` calls per run; 4096 items per `parallel`/`pipeline` call | The 1000 is a runaway backstop, not a budget. A C2-compliant round spends one round's worth of agents (C4.2), and the operator's ceiling is C4.3. |
| `agent()` returns `null` on a skipped or dead agent | **A null verdict is a FAIL, never an absent one.** `.filter(Boolean)` on inputs; treat a missing judgment as unresolved and re-judge it with one fresh critic. |

## 2. Model assignment

`ROLES.md` owns the role → tier mapping: orchestrator and every judging role on the strongest
model, builders on the mid tier, never a cheap model on a judging role.

```js
agent(criticPrompt(p, r), {
  label: `judge:${p.key}-j${String(j).padStart(2, '0')}`,   // shows in /workflows and the run record
  phase: 'Judge',               // set explicitly inside pipeline stages, or phases race
  model: 'opus',                // SET AT SPAWN. Always. Even when it equals today's default.
  effort: 'high',               // 'low'|'medium'|'high'|'xhigh'|'max'
  schema: VERDICT,              // forces StructuredOutput; returns a validated object
})
```

**The trap, stated precisely.** Omitting `model` pins nothing: the agent inherits the resolved session
model at the moment it runs. A run resumed in a session whose default has changed re-spawns those agents
on a different model, and nothing in your diff says so — verdict rigour drops for no visible reason
(`FAILURE-MODES.md` F22). Set `model` on every judging agent. You do not need to record it anywhere: the
harness stamps the resolved model into the run record from the **spawn call** (§6's second `jq`), which is
why F22 is greppable and why no verdict field is allowed to carry a model — a judge cannot be trusted to
report its own.

Real cost of forgetting: in a verified run on this machine (`defaultModel: claude-opus-5`), six
agents inherited the session default. Five were builders. That round burned 2.31M tokens.

`effort` participates in the resume cache key alongside `model` and the prompt, so changing it re-runs
the agent; `effort: 'low'` is right for mechanical probe capture, where the output *is* the evidence
and no judgment is formed, and never for a judge. A `meta.phases` entry carries `title` and `detail`
only — every phase row in the records on this machine has exactly `{index, title, type}` — so there is
no per-phase model override to disclose in the permission dialog. `agentType` borrows a registered subagent
(`'general-purpose'`, `'code-reviewer'`, …) and composes with `schema`.

## 3. Isolation

`isolation: 'worktree'` runs an agent in a fresh git worktree and tells it the path — the harness
chooses it, you do not. Cost is ~200–500ms setup plus a working copy on disk, per agent. Unchanged
worktrees are removed automatically, changed ones kept for review. (`isolation: 'remote'`
throws in this build.)

| Situation | Isolation |
|---|---|
| Two or more builders touch overlapping files | Worktree per builder. Non-negotiable; one tree with two builders is the top source of corrupted rounds. |
| Builders already own disjoint files (one component each) | No worktree. Declare file ownership in the part map and check it at round close. Cheaper, and it keeps parts mutually visible. |
| Critics, probes, arbiters | Never. They are read-only and must all read the same integrated tree, or they are judging different artifacts. |

**The real cost of isolation is not disk.** Isolated builders cannot see each other, so parts converge
separately and the whole degrades while every part passes. Pay for it with a round-boundary merge and a
tag — including round zero, without which every `gauntlet-r$((N-1))` reference needs the C3.7 guard at
N = 1.

```bash
git tag gauntlet-r0            # the unassisted pass — round 1's comparand
git tag gauntlet-r3            # after integrating round 3; §5's rollback and F20's diffs read these
```

## 4. Cost control

The token target comes from a `+<N>k`-style directive in the launching message and is exposed to the script
as `budget`. C4 owns both currencies: C4.2 the token seed below, C4.3 the operator's `budget=<n>` agent-run
ceiling, C4.4 the rule that neither is derived from the other.

- `budget.total`: the target, or `null` if none was set
- `budget.spent()`: **output** tokens this turn, one shared pool across the main loop and every workflow
- `budget.remaining()`: `max(0, total − spent())`, or `Infinity` when `total` is null

It is a hard ceiling. Once spent reaches total, further `agent()` calls throw; in-flight agents
finish and their results are kept; dropped `parallel`/`pipeline` slots come back as `null`.

**Scale rounds to the remaining budget, never to a count:**

```js
const MAX_ROUNDS = 12                        // C2.1 clause 1 backstop. An ABORT, never a stop. See §5.
let roundCost = 250_000 + 40_000 * Math.max(0, parts.length - 4)   // C4.2's seed, then measured
let dry = 0                                  // §5. MUST live out here: declared inside the loop it
                                             // resets every round, and clause 3 can never fire.
for (let r = 1; r <= MAX_ROUNDS; r++) {
  if (budget.total && budget.remaining() < roundCost) {          // clause 1, first half
    log(`ABORT at round ${r}: ${Math.round(budget.remaining() / 1000)}k left, a round costs ~${Math.round(roundCost / 1000)}k`)
    break
  }
  const before = budget.spent()
  // … round body, then §5's close block …
  roundCost = Math.max(roundCost, budget.spent() - before)   // calibrate from the run itself
  log(`round ${r} cost ${Math.round((budget.spent() - before) / 1000)}k output tokens`)
}
```

**Never calibrate `roundCost` from the run record.** `budget.spent()` counts **output** tokens; the
record's `totalTokens` counts input and output together and is larger by roughly an order of magnitude.
Mix the two and the abort guard fires at the wrong time. Use the record for post-hoc audit only.

### Where the money actually goes

Judging, not building. A round pays for its builders, C2's two panels of five, and the round-boundary
agents; the judges dominate that count, because a builder reads a diff while every judge re-reads the
whole artifact **and** the bar, at high effort, every round. The bill tracks panel size, not part count,
at every scale of goal — which is exactly why v2 prices a panel at five.

Measured on this machine, one Opus-class visual critic: **318k record tokens**, 82 tool calls, 43
minutes, for one verdict — ~32k output at the ~10× record-to-output ratio above. Builders at
`state: done`: 260k–720k record each, most between 400k and 520k, so ~45k output. Those are the two
measurements C4.2 derives its seed from. Calibrate off `done` agents only: one in `progress` or `error`
reports what it had spent when the run stopped, which understated the builder band by ~40% here.

Levers, in order of effect: cheaper builders with an expensive critic (roughly an order of magnitude,
little quality lost — **never the reverse**, a cheap critic is a captured critic); the delta panel run
once at round close, not per part; `effort: 'low'` on every mechanical capture step; probes frozen as
files under `$RUN/probes/`, since re-authoring one every round silently changes what is measured.

## 5. Termination policy

Never a round count. `MAX_ROUNDS` is an **abort** and must be reported as one.

**The honest headline, because operators mis-set it and it is the one way to lose money on a good prompt:
the bar sits above the ceiling by construction, so the normal exit is marginal-gain collapse — the panel
can no longer show that this round beat the last one. Bar crossing is real and rare. Budget exhaustion is
an abort, and gets reported with the word *abort*.**

**`CONTRACTS.md` C2 is the rule; this section is its only wiring, and `DOCTRINE.md` § Termination theory
is the *why*.** Read C2 before editing a line below; C2.2 is the same rule by hand, for auditing a run
without the script. Nothing else is consulted — no interval, no threshold from `run.json`, no counter
except `MAX_ROUNDS` (C2.3). A run stops when a panel of five says so, and you can check it on your
fingers.

```js
const WHOLE = parts.length, DELTA = parts.length + 1   // arena indices that cannot collide with a part

// C2 admits validated, unblocked returns only. A blocked verdict (choice: null) is re-judged by ONE
// fresh critic before this block runs; it counts in neither numerator nor denominator (C2.1).
// Crossing EXCLUDES proxy-biased verdicts; the delta panel KEEPS them, or audio (C5.4) and
// un-recorded mobile could never close anything at all.
const X = close.crossing.filter(v => v.choice !== null && v.parity === 'matched')
const D = close.deltas.filter(v => v.choice !== null)
const ours = i => v => v.choice === candAt(r, i)        // 'indistinguishable' matches neither side (C1.4)
const theirs = i => v => v.choice !== 'indistinguishable' && v.choice !== candAt(r, i)

// 0 — VETO: a probe in $RUN/probes/ that passed in an earlier round now fails (F17).
const vetoed = close.probeRegression
if (vetoed) log(`round ${r} FAIL: frozen-probe regression. No stop may be declared this round.`)

// 1 — ABORT. The budget half is §4's guard at the top of the loop.
if (r > MAX_ROUNDS) { log(`ABORT at round ${r}: MAX_ROUNDS backstop. Resume handle per §8.`); break }

// 2 — STOP: bar crossing. ONE arena, ONE side, the whole panel — never candAt per judge.
const kX = X.filter(ours(WHOLE)).length
if (X.length !== 5) log(`no crossing available: ${X.length} matched verdicts, not 5 (C2.1)`)
else if (!vetoed && kX >= 4) { log(`STOP: bar crossing ${kX}/5. Rare by design.`); break }

// Dryness: both conditions, panel intact, and round 1 is never dry (C2.1).
const kD = D.filter(ours(DELTA)).length
if (D.length !== 5) log(`delta panel is ${D.length}/5 after re-judging: this round cannot be dry`)
const isDry = r > 1 && D.length === 5 && kD <= 3 && close.gapsOpened === 0
dry = isDry ? dry + 1 : 0                    // any non-dry round resets the count to zero

// 3 — STOP: collapse. The normal exit.
if (!vetoed && dry >= 2) { log(`STOP: marginal-gain collapse, delta ${kD}/5 on two consecutive dry rounds. The normal exit.`); break }

// 4 — STOP: regression.
const kPrev = D.filter(theirs(DELTA)).length
if (!vetoed && isDry && kPrev >= 4) {
  log(`STOP: REGRESSION, previous artifact ${kPrev}/5. Roll back to gauntlet-r${r - 1} and re-cut. NOT converged.`)
  break
}
// 5 — otherwise continue to round r + 1.
```

**Three details that decide whether this runs at all.** `candAt` takes the **arena** index: called with a
judge index it alternates the expectation across the panel and turns a clean 5–0 crossing into 2 or 3,
after which nothing ever crosses (§6). A panel that lands under five unblocked verdicts is **reported and
skipped**, never silently scored — a lookup that quietly accepts an off-size panel is how v1 converted a
crossing test into a two-round timer. And `dry` lives outside the loop; declared inside it, clause 3 is
unreachable, which is the same class of defect one level up.

Round 1 is never dry, so rounds 2 and 3 are the earliest consecutive dry pair and the earliest the normal
exit can fire is round **3**. Two inputs come from the round-close agent, the script having no filesystem:
`probeRegression`, and `gapsOpened` —

```bash
awk -F'\t' -v r="$N" '$1==r && $3=="open"' "$RUN"/gaps.tsv | wc -l          # gapsOpened
```

`gapsOpened` counts `open` rows only, so **dedup is what makes a round dry** — dedup against everything
seen, never confirmed gaps alone, or judge-rejected findings reappear every round and the loop never
converges. C3.3 keeps that log append-only and keeps `closed` reachable.

**Neither panel is a part panel.** Part panels are advisory (C2.4): a part whose critic finds no fresh gap
is *advisory-cleared*, one critic closes nothing, and only the whole and delta panels stop a run. On any
stop, report the standing gaps in `report.md`. On abort, say the word *abort* and record §8's resume
handle. Raising the bar is available only after a stop (C2.5) — never as a response to one of these
clauses firing.

## 6. Evidence layout

One directory per run. **C3 is normative and this tree is its wiring**; every path a sibling greps, and
every `{{ARENA}}` / `{{A_PATH}}` / `{{B_PATH}}` slot in `ROLES.md`, resolves against it. Two roots, never
confused (C3.1): `SKILL_DIR` holds the skill, `RUN` is `<target-repo>/.gauntlet/<run-id>`.

```text
.gauntlet/current -> <run-id>          symlink beside the run dir
.gauntlet/<run-id>/
├── launch-prompt.md                   verbatim, never edited after launch
├── run.json                           runId, models, budget, bar_name, bar_slug, product_slug, part->owner
├── plan.md                            per part: one ARTIFACT:, one EVIDENCE:, one DEFECT_CLASS:
├── bar/                               frozen snapshot, fetched once, flat — no subdirectories
├── bar.sha256                         written by C3.4's command
├── probes/                            one file per frozen probe. Append only, never delete
│   └── fixtures/                      round-0 replay fixtures for side-effectful probes
├── gaps.tsv                           round<TAB>gap_id<TAB>status   (append-only log; see C3.3)
├── spend.tsv                          round<TAB>agents<TAB>output_tokens
├── .sides                             round<TAB>arena<TAB>candidate=A|B   — round key is literal "r<N>"
├── r<N>-<part>-j<NN>-verdict.json     the validated return. THE AUTHORITY
└── r<N>/
    ├── arena/{whole,delta,<part>}/{A,B}
    ├── evidence/                      immutable per round; never overwrite an earlier round
    └── report.md                      deltas, choices, cost, standing gaps
```

That is the whole list. A file not on it does not exist: no template copy, no per-round prompt dump, no
arbiter log, no flattened verdict twin. Everything a sibling used to grep out of a twin comes from the
`.json` (this section's watcher, §7) or from the run record (`MODEL:`, §2), and both are unforgeable by a
judge in a way a hand-written footer never was.

`spend.tsv` column 3 is **output** tokens — the `budget.spent()` delta across the round, the same unit
C4.2's seed is denominated in — because F21's cost check compares the two. The run record's `.tokens`
totals are roughly 10× larger and belong in post-hoc audit only; a plausible wrong unit here leaves the
check running but unable to fire. Freeze and re-check the bar hash with C3.4's cwd-pinned commands, since
`shasum` embeds the path as given and a relative/absolute mismatch reports F3 on an unchanged bar.

**The arena owns the side, and it owns exactly one.** `candAt(r, i)` is called once per arena, with that
arena's index `i`, when the arena is created; every judge reading it is scored against that single side.
`whole` and `delta` are fixed names at `parts.length` and `parts.length + 1`, so they never collide
with a part. The `j<NN>` ordinal is a **filename disambiguator and nothing else**: five verdicts land on
one arena in one round and `r<N>-<part>-verdict.json` collides on all five. It confers no order, no
seniority, and no scoring role of any kind (C2.1). An
advisory single still uses `j01`.

Who writes what, because the audit checks depend on it:

| Line / file | Written by | Why |
|---|---|---|
| arena `{A,B}`, the `.sides` row, the seal run | the **arena agent**, spawned at the round boundary | the mapping is recorded outside every arena and named by no prompt |
| `r<N>-<part>-j<NN>-verdict.json` | the **round-close agent**, copying the validated `schema` return verbatim | unedited, so it is the authority every `jq` check reads |
| `spend.tsv`, `gaps.tsv`, `report.md` | the round-close agent | dedup and cost accounting are whole-round questions, not per-part ones |

Nothing else writes any of them, and **neither writer holds termination authority** — that lives only in
§5's script. Before copying any verdict the round-close agent runs C1.3's numeric-field audit; non-empty
output is a reject, not a warning. Point that audit at verdicts only: `spend.tsv`, `run.json` and the run
record are numeric by design, and running it over them would condemn correct output. **There is no coin
and no shuffler process:** `candAt(r, i)` in the script *is* the side assignment, the script hands the
resulting side to the arena agent, and the arena agent stages the copies and appends the `.sides` row. No
critic prompt ever names it.

The harness keeps its own audit trail, and it answers "what did round 5 cost?". **The workflows directory
is session-scoped**, one level deeper than the project slug, so glob across sessions rather than
reconstructing the path:

```bash
P=~/.claude/projects/$(pwd | tr / -)              # project dir; sessions are one level below
R=$(ls -t "$P"/*/workflows/wf_*.json | head -1)   # newest run record in any session of this project
# or, for a specific run:  R=$(ls "$P"/*/workflows/<runId>.json)

jq '{status, agents:.agentCount, tokens:.totalTokens, toolCalls:.totalToolCalls,
     minutes:(.durationMs/60000|floor), defaultModel}' "$R"

jq -r '.workflowProgress[] | select(.type=="workflow_agent")
       | [.phaseTitle, .label, .model, .state, .tokens, ((.durationMs // 0)/1000|floor)]
       | @tsv' "$R"
```

The `// 0` is not cosmetic. `durationMs` is `null` for every agent in `progress` state; without the
fallback `jq` throws `null and number cannot be divided` and truncates the table at the first unfinished
agent, so a whole round reads as one line. A `0` in that column *is* the signal: the agent never finished.
Filter on `.state` (`done`, `error`, `progress`) before concluding anything from `.tokens`. The `.model`
column is F22's input. Two more artifacts: `jq -r .scriptPath "$R"` gives the script's absolute path, so
never rebuild it, and one transcript per agent sits under
`$(dirname "$R")/../subagents/workflows/<runId>/agent-*.jsonl`.

## 7. Live observation

- `/workflows` is the read-only live tree — phase, label, state, tokens, tool calls, per agent — and a `task-notification` arrives on completion with the script's return value.
- `[stall]` lines mean **silence**, not slowness: an agent with no in-flight tool call and no progress
  for 180s is aborted and retried, up to five attempts. A 40-minute Playwright probe is not a stall.
- For per-occurrence alerts, watch the run directory rather than the transcript. Poll — do not
  `tail -F` a glob. The shell expands it once, so every verdict written after you start (all of rounds
  2+) is never followed, and the watcher goes quiet while looking alive:

```bash
RUN=.gauntlet/current            # the C3.2 symlink; `ls -t .gauntlet | head -1` also works
while sleep 20; do
  jq -r '[.dimension, .choice // "BLOCKED", .blocker // .largest_gap.gap // ""] | @tsv' \
     "$RUN"/r*-verdict.json 2>/dev/null
done | awk '!seen[$0]++'         # one line per new occurrence, no re-prints
```

The `.json` is the only verdict artifact (§6), so read it with `jq` and never grep for a flattened line:
a watcher whose pattern matches nothing prints silence, and silence is indistinguishable from a healthy
run that has not judged yet. Nothing here prints a side — `.sides` stays out of the loop you are reading.

**Why interrupting is expensive.** Killing a workflow discards in-process state. In-flight agents die and
their tokens are gone; changed worktrees survive on disk but unintegrated, so check each one before
assuming its work landed. Resume replays only a prefix (§8), so a kill at 80% does not resume at 80%. The
cheap intervention is to let the round finish and change the *next* round's inputs. Individual agents can
be skipped from the UI mid-run; that returns `null` (§1).

## 8. Resume and repair

`scriptPath` must be the absolute path the harness recorded. Read it, do not rebuild it: the script
lives under the **session** directory, one level below the project slug.

```bash
jq -r '[.runId, .scriptPath] | @tsv' ~/.claude/projects/$(pwd | tr / -)/*/workflows/wf_*.json
# Workflow({ scriptPath: "<that path>", resumeFromRunId: "wf_1dbf8562-6c8" })
```

`resumeFromRunId` is **same-session only**, so the session-uuid segment is always the session you are
sitting in and nothing here resumes yesterday's run. C2.6 states what the operator-facing `--resume` does
instead: it re-reads the bar hash, the launch prompt and `run.json`, verifies the hash, and starts a new
Workflow from the last completed round. Cross-session resume must not be advertised as anything more.
Stop the prior run first, with `TaskStop` on its task id or a kill from `/workflows`.

Completed `agent()` calls with unchanged `(prompt, opts)` return cached results instantly from the run's
`journal.jsonl`; only new or edited calls re-run. Two mechanics decide how much you get back: **the cache
key chains** (each key hashes the prompt, the options, *and* the previous key, so editing any earlier
agent invalidates every later hit) and **the first miss ends caching** (after one miss, no cached result
is used again). Resume therefore replays a **strict prefix** of the call sequence: append repairs at the
end of the script, and never edit an earlier stage unless you intend to pay for everything after it.
Heavily interleaved `pipeline()` runs resume with a shorter prefix than you expect, because invocation
order varies with timing — if resumability outranks wall clock on an expensive run, put judging behind
the round barrier and accept the idle time.

| Situation | Do this |
|---|---|
| Killed mid-round | `TaskStop`, then resume. Inspect every changed worktree before trusting the tree. |
| Process exited (crash, quit) | The orphaned-workflow notification prints the exact resume call. It also warns that in-process state was lost; believe it. |
| Script needs a change in round 1's prompt | Do not resume. That invalidates everything. Start a new run and say so in `run.json`. |
| Budget exhausted | Raise the target in the launching message, then resume. Completed rounds replay free. |
| `bar.sha256` no longer matches | Stop. Restore the snapshot. A re-fetched bar is a new run, not a resumed one (`F3`, C2.5). |
| A critic looks degraded after resume | Check the run record's `.model` column across this round's judges (§6). Never resume a critic conversation; fresh-spawn a judge every round. |

## 9. Stall playbook — the loop runs, quality is flat

Try in order. Never apply an entry whose signal is absent. Stop once the blind choice starts flipping.

| # | Change | Apply when | Cost |
|---|---|---|---|
| 1 | **Shrink the unit of work.** Re-cut the failing part into two. | Verdicts name several unrelated gaps in one part, or the builder's diff sprawls across subsystems. | One round. Cheapest fix and the most often correct. |
| 2 | **Change the modality.** Add a probe in a dimension the current one cannot see — a row from C5's matrix, never improvised. | Verdicts come back `indistinguishable` (C1.4 makes that a modality signal, not a tie), or the artifact passes and you find a defect yourself in ten seconds: the still-image critic on a behavioural bug (`F9`). | One probe author plus a re-judge. |
| 3 | **Swap the critic.** Fresh critic, identical prompt, no history. Different model family if you have one. | Verdicts are shrinking round over round, or repeating the same three complaints verbatim (`F12`). | One round of judging. |
| 4 | **Re-decompose.** Return to the decomposer with the standing gaps and let it re-cut the whole goal. | Every part passes and the whole is still worse than the bar (`F16`). | Most of a round. Builders keep their artifacts; only the part map changes. |
| 5 | **Raise the bar.** Available only *after* a stop, per C2.5, and it opens a new run-id. | The run stopped on clause 3 and the artifact still looks unremarkable next to the field. See `BARS.md` § BAR ESCALATION. | A fresh comparison history: earlier rounds' choices no longer compare and §5's `dry` starts at zero. |

**Row 2 has one hard limit: C5 grants the modality or you do not run it.** Nothing here may order an
inspection the matrix marks UNAVAILABLE — perceived latency, sustained concurrency, easing feel, or
anything requiring the critic to hear. Where C5 names a PROXY instead, the verdict carries
`parity: "proxy-biased"` plus a `human_gate`, and per C2.1 it can move the delta panel but can never
establish a bar crossing. A motion sheet without a `window.__setTime(ms)` hook is void and must be
declared void, not quietly downgraded to stills. Changing the modality is a re-judge, never a re-grade.

Never lower the bar. Lowering it converts the run into a rubric, and rubrics inflate (`DOCTRINE.md`
§ Epistemics of judgment). If cost is the reason you want to lower it, abort and report the gap honestly.
