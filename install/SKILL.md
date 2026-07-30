---
name: gauntlet
description: >-
  Runs the Gauntlet Loop: turns any goal into a builder + blind-critic loop that iterates against a named
  real-world quality bar until a panel of fresh-context blind critics can no longer show that this round beat
  the last one — or, rarely, picks the work over the bar. Use when the user says "run a gauntlet", "gauntlet
  loop", "build this at AAA quality", "make this world-class", "make it utterly perfect", "beat <product>",
  "match the quality of <named product>", "at the level of <company>", "fan out subagents and loop until it's
  perfect", "harsh critic loop", "don't stop until it's better than X", "keep critiquing until it's
  indistinguishable from <product>", or asks for relentless self-critique against a real product instead of a
  rubric. Selects and confirms the bar before spending compute, then runs unattended.
argument-hint: <goal> [bar=<named artifact>] [budget=<agent-runs>] [--dry-run] [--resume]
---

# Gauntlet

One operator gate: **the bar**. Everything after runs unattended. A wrong bar wastes the whole run — every
builder decision, verdict and stop condition derives from it. Nothing else is worth interrupting a human for.

`CONTRACTS.md` is law and this file implements none of it: nothing here defines a schema field, a stop
threshold, a run path, a ceiling or a modality capability — each is referenced by contract number, and
operator-facing text names the file holding the value instead of copying it. Disagreement means this is the bug.

## Reference map — load on demand, never inline

An agent that has read 3,000 lines of prescription writes worse prompts than one that read the goal.

| Load at step | File | Gives you |
|---|---|---|
| 0 | `CONTRACTS.md` | C1–C5, frozen. Outranks every sibling, this file included |
| 1 | `LAUNCH.md` | Bar interrogation; goal → minimal launch prompt; proxy rules (§6) |
| 2 | `BARS.md` | Named, inspectable bars per domain; § BAR CONSTRUCTION freezes a synthetic one |
| 2 | `EXAMPLES.md` | Worked runs — steal the bar interrogations and the modality voids |
| 3 | `INSPECTION.md` | The recipes: what a critic executes, and what each recipe cannot see |
| 6 | `ROLES.md` | Verbatim decomposer / builder / critic / arbiter prompts, slots, spawn rules |
| 6 | `OPERATIONS.md` | Harness choice, parallelism, cost, run layout, live observation, resume |
| on failure | `FAILURE-MODES.md` | Detection signal + mitigation per anti-pattern; round-close audit |
| never | `DOCTRINE.md` | Theory. Read it off-run, not during one |
| never | `README.md` | Orientation for whoever opens the installed directory. Nothing on a run path |

Every sibling the install ships has a row here and appears in the Verify `ls` below; an installed sibling with
no row is build state that leaked past C3.8 — move it under `reference/`, never load it. Siblings resolve as
`SKILL_DIR/<FILE>.md` (C3.1), no `../` anywhere. A file is missing: do not improvise depth, run the Invariants
below and name the absent file.

## Procedure

0. **Read the goal.** `$ARGUMENTS` if the harness substituted it, otherwise the text after `/gauntlet`.
   Strip flags and `key=value` pairs (Flags below); the remainder is the goal. Empty → print `Gauntlet
   needs a goal. Example: /gauntlet a browser FPS in Three.js` and stop.
1. **Interrogate the bar.** Read `LAUNCH.md`. Answer its questions from the goal alone, in your own head,
   never at the operator. The one that decides the run: can a critic actually *obtain and inspect* the
   artifact you are about to name?
2. **Select the bar.** Read `BARS.md`. One named bar plus one runner-up. Reject a category
   ("enterprise-grade"), a number with no referent ("99.9%"), or anything the critic cannot obtain. Prefer a
   bar out of reach — but apply the reachability test to **the artifact this loop emits**, never to adjacent
   work products (C5.6), or you will escalate a bar that nothing actually beat.
3. **Select the modality.** C5 decides it; `LAUNCH.md` §1 STEP 2b is its router, `INSPECTION.md` has the
   recipe. Where the deciding capability is UNAVAILABLE, take that row's named proxy or halt and name what
   is missing. Never improvise a phrase, order an inspection C5 does not grant, or soften an excluded
   capability into a paraphrase that sounds performable — the deaf critic is the defect this rule exists for,
   and audio, motion with no time hook, perceived latency, sustained load and read-aloud each take the fate
   C5.3 assigns them. A still image cannot find a behavioural bug: if the goal is behavioural, so is the row.
4. **Draft the launch prompt.** Per `LAUNCH.md`, inside C4.1's word cap, containing exactly: the goal, the
   named bar, fan-out to subagents, blind pairwise comparison against the bar, the C5 modality phrase, no
   round limit. No architecture, no system list, no definition of quality — decomposition belongs to the
   model. Run `LAUNCH.md`'s self-check before printing.
5. **Gate.** Print the block below and stop. Do not spawn an agent, create a worktree, or write a file
   until the operator answers.
6. **Open the run, then launch.** On approval, in this order:
   1. Create the run directory and **the C3.2 tree, complete**, `current` symlink included; run-id in the
      dated form `ROLES.md`'s slots show. Enumerate that tree nowhere else: a path the audit greps that a
      second list omits makes the check match nothing and report the clean round it exists to prevent.
   2. **Freeze the bar.** Capture the named artifact into `bar/` **once** — screenshot, recording, download,
      archived page, or the proxy `LAUNCH.md` §6 prescribes when the bar is paywalled, native-only or gone.
      Layout per `BARS.md`, which also requires `PROVENANCE.md` when the bar is synthetic. Hash it with C3.4's
      **cwd-pinned command**, never a relative one. Critics read that snapshot, never the live source; a re-fetch
      mid-run is a new run (F3), and without `bar.sha256` no result can be shown to have reproduced against that bar.
   3. Write the approved prompt verbatim to `launch-prompt.md`, and C3.2's `run.json` keys — bar name
      included — into `run.json`. Re-read both every round, never regenerate either.
   4. Fresh-spawn the `ROLES.md` decomposer for round zero only, on the tier `ROLES.md` § Spawn rules
      assigns: decompose and register the parts, no loop. You fill exactly four slots — `{{GOAL}}` = the
      approved goal line, `{{BAR}}` = the bar name as recorded in `run.json`, `{{BUDGET}}` from the gate in
      the output-token unit C4 fixes, `{{RUN}}` = the run dir you just created — and attach
      `launch-prompt.md` verbatim as the charter. The decomposer returns `{{PART}}`, `{{DIMENSION}}`,
      `{{PROBE}}` and `{{TARGET_USER}}` in its own schema. Arena paths, the A/B mapping and `{{WORKTREE}}`
      are filled nowhere in this step — they are this role's forbidden knowledge, sides are derived by the
      script and staged by the arena agent (`OPERATIONS.md` §6), and the worktree is what the harness reports.
   5. Hand the registered parts to a **Workflow** script and run that. Never hand-schedule rounds from this
      session: `OPERATIONS.md` §1 gives loops to Workflow because an inline scheduler drifts, and this skill
      is the operator opt-in Workflow requires. Author it per `OPERATIONS.md` §1–§6 — `parallel()` at the
      round boundary, `pipeline()` inside a round, sides derived and never drawn (§6), `model` set at spawn
      on every judging `agent()`, a `null` return treated as a FAIL and not an absence, and **C2 evaluated
      once at round close**. The script is the only holder of termination authority, and every round-adjacent
      number including the round cap lives there as an abort backstop, never in a role prompt (C2.3). Record
      `runId` in `run.json` per C3.2, read `scriptPath` from the harness's workflow record (`OPERATIONS.md`
      §8) and never from `run.json`, and append the round's `spend.tsv` row at close with C3.2's columns **in
      C3.2's units** — a wrong unit in the right columns leaves F21's breach check comparing two currencies
      across rounds (C4.4).
7. **Close.** Report which C2 clause fired, in that clause's own words — the word *abort* when it was an
   abort — plus the round-by-round preference record, the standing gaps, and the artifact paths.

## The gate (print verbatim, filled in)

```text
GAUNTLET — confirm the bar before I spend compute.

Goal:      <restated in one line>
Bar:       <named artifact> — <one line on why it is inspectable, not aspirational>
Runner-up: <named artifact> — <one line on what it would optimise for instead>
Probes:    <probe 1>, <probe 2>   C5 rows: <row>, <row>   evidence: <what the critic looks at>
           [HUMAN GATE: <file> — <what a person must hear or see>, on every proxy-biased and
            independent_reader row (C1.5)]

STOP RULE — CONTRACTS.md C2. The Workflow script evaluates it once at round close; this gate does not restate
its clauses, and the script implements no rule of its own. Read C2 for the clauses. The headline, because
operators mis-set it and it is the one way to lose money on a good prompt: the bar is above the ceiling by
construction, so the normal exit is marginal-gain collapse — the panel can no longer show that this round beat
the last one. That is not "we beat the bar." Bar crossing is real and rare by design. Budget exhaustion is an
ABORT and is reported with the word abort. Most runs end on collapse or abort.

Budget:    <N> agent-runs, ceiling per C4.3, plus +<N>k output tokens in the launching message, target per
           C4.2. Two currencies, one round count (C4.4) — both derived there, neither recomputed here, and
           no knob in this harness takes dollars.

Launch prompt I will send (<N> words, under C4.1's cap):
<the prompt, verbatim>

Reply: OK  |  harder  |  bar=<your bar>  |  probe=<your probe>
```

`OK` is the only word required to start; anything else edits one field and reprints the block. Never widen
this gate into a second question — a two-question gate trains the operator to stop reading.

## Invariants (non-negotiable; these are what the loop buys you)

| Invariant | Enforcement |
|---|---|
| A subsystem never grades itself, and critics get fresh context | Critic spawns as a separate agent that never saw the build; a new subagent every round, handed artifact paths and never a transcript |
| Verdicts are blind pairwise | Forced choice against the bar, labels stripped, one side per arena, derived and never drawn (`OPERATIONS.md` §6) |
| Never trust a builder's claim | Verify in the artifact — grep the imports, run the probe. A summary is not evidence (C1.6) |
| Modality matches the claim | The probe comes from the C5 row for the deciding modality. A capability that row marks UNAVAILABLE is never ordered and takes the fate C5.3 assigns it: the named proxy, whose verdict is `proxy-biased` and per C2 can never establish bar crossing — or a halt |
| Model is set at spawn | Resumed agents silently revert to the session default. Fresh-spawn, never resume-then-set |
| Bar never drifts | Snapshot fetched ONCE into `bar/`, hashed per C3.4; critics read only the snapshot; a re-fetch is a new run |
| Termination is C2's alone | Evaluated once at round close by the script, the only holder of that authority. Parts and part critics terminate nothing (C2.4). Never a round counter |
| Cost is bounded before approval | Ceiling declared in the gate, enforced in the script, one `spend.tsv` row per round for F21 |

## Flags

| Flag | Effect |
|---|---|
| `bar=<artifact>` | Skips step 2's selection; steps 3–4 and the gate still run |
| `budget=<n>` | Agent-run ceiling (F21). Its default, its derivation and its conversion to output tokens are all **C4**'s, printed in the gate and never recomputed here. The script counts `agent()` calls against it. Set the token target separately, as the `+<N>k` in the launching message, so `budget.remaining()` guards the loop too — then recalibrate that target from round 1's actual `budget.spent()` delta (`OPERATIONS.md` §4). Never recalibrate the ceiling |
| `--dry-run` | Steps 1–4 and the gate only. Runs in the current session; no subagents, no worktrees, no files written, no bar fetched |
| `--resume` | Newest run directory under `.gauntlet/`, or `--resume=<dir>`. Per **C2.6**: verifies `bar.sha256` first (mismatch = stop, this is a new run), re-reads `launch-prompt.md` and `run.json`, then starts a **new** Workflow from the last completed round. It therefore works in tomorrow's session. The harness's own `resumeFromRunId` is same-session only and must never be advertised as this flag's mechanism |

## Install

```bash
D=~/.claude/skills/gauntlet          # personal skill: available in every project on this machine
mkdir -p "$D"/bars
cp -R /Users/Nathan/Code/gauntlet-loop-system/. "$D"/
mv "$D"/install/SKILL.md "$D"/SKILL.md
mv "$D"/reference/baseline-gauntlet-prompt.md "$D"/bars/baseline-gauntlet-prompt.md
rm -rf "$D"/install "$D"/reference "$D"/arena     # build-time only; C3.8 lists what survives
```

Copy the whole system, not just this file: every sibling must land beside `SKILL.md` or the reference map
resolves to nothing (C3.1); what survives, and why the baseline lands under `bars/`, is C3.8. Project-scoped
copy: same layout under `<repo>/.claude/skills/gauntlet/`, committing the bar library with the code and
overriding the personal copy there.

### Verify it loaded

```bash
ls ~/.claude/skills/gauntlet/{SKILL,CONTRACTS,LAUNCH,BARS,INSPECTION,ROLES,OPERATIONS,FAILURE-MODES,DOCTRINE,EXAMPLES,README}.md ~/.claude/skills/gauntlet/bars/baseline-gauntlet-prompt.md
claude -p "/gauntlet --dry-run a browser FPS in Three.js"
```

Loaded correctly, the last command prints a filled-in gate naming a real game, a real probe, and C2 as the
stop rule, then stops. Failure signatures:

| Symptom | Cause |
|---|---|
| Claude answers in prose about gauntlets | Frontmatter did not parse — the file must open with `---` on line 1 and `name:` must be kebab-case |
| `mv: rename .../install/SKILL.md: No such file or directory`, and `$D` contains a `gauntlet-loop-system/` directory | `cp -R` ran without the trailing `/.`, so the repo landed as a nested directory. `rm -rf ~/.claude/skills/gauntlet` and re-run the block |
| Gate prints, but the bar is a category rather than a title, or the stop rule is anything other than C2 | `BARS.md` or `CONTRACTS.md` did not copy, or step 0 never loaded the law. An install that ships the law without loading it fails this gate (C3.8). Re-run the install block |
| It starts building during `--dry-run` | The gate was skipped. The gate is step 5 and is unconditional |

Skills resolve at session start: a session already open when you installed will not see it.

### Notes

- No `allowed-tools` key, deliberately. Critics need whatever modality C5 grants for the artifact — browser
  drive, trace capture, contract tests, simulator. Narrowing tools here silently downgrades every critic to
  reading source, the exact failure this system exists to prevent.
- Update, and uninstall, both start with `rm -rf ~/.claude/skills/gauntlet`; to update, re-run the install
  block after it. `cp -R` overwrites changed files but leaves deleted ones behind, and a stale sibling loads.
- When the bar is `bars/baseline-gauntlet-prompt.md`, C5.6 governs the claim: no run and no report may say
  that baseline has been beaten until the blind A/B of emitted launch prompts has actually run.
