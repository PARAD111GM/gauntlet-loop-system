# RESUME — THE GAUNTLET, 2026-07-29

## LATEST STATE (21:55 CDT) — read this before the wave-1 history below

**Wave 2A completed, and it found something bigger than contract drift.** The archaeologist logged
**51 conflicts / 47 restatement sites** (`reference/CONFLICT-LEDGER.md`, 1270 lines). The freeze
author then produced a `CONTRACTS.md` that failed its own hostile gate **twice**, with 11+ findings
including four BLOCKERs. Reading the findings, the diagnosis was not drift — it was **over-engineering**:
v1 had grown Wilson score intervals, `MIE = 0.65`, panels of 10–30 judges, reserve judges and pooled
confidence bands, pricing a minimum run at **25 agents and ~800k output tokens per round, 3 rounds
minimum**. The gate found one branch that was *arithmetically unreachable* and a "blocked verdict"
path its own schema made *impossible to emit*.

Wave 2 then died mid-flight on the session limit: **11 of 40 agents completed**, 29 failed. Five
files (README, LAUNCH, INSPECTION, OPERATIONS, install/SKILL) had already conformed to the broken v1.

**Action taken:** v1 preserved at `reference/CONTRACTS-v1-overbuilt.md`; `CONTRACTS.md` rewritten as
**v2** by hand in the main loop, because the needed change was *deletion* and every subagent so far
has responded to criticism by adding. v2 keeps every load-bearing idea and deletes the apparatus:

| | v1 | v2 |
|---|---|---|
| Panel size | 10–30 + reserve | **5** |
| Scoring | Wilson interval, MIE, pooled bands | **count to 5; 4-of-5 crosses** |
| Agents / round | 25 | **15** |
| Output tokens / round | ~800k | **250k** |
| Default agent-run ceiling | 150 | **60** |

All five v1 BLOCKERs fixed, and the fixes are **execution-tested, not asserted**: the by-hand C2
script was run against fixtures — it correctly fires clause 2 at 4/5, and the empty-`$S` guard
correctly FATALs instead of silently scoring zero (v1 would have scored 0 and rolled the run back).
C5.2's tool-availability list was independently re-verified with `command -v`: accurate, including
the four absences that make the deaf-critic ruling necessary.

**Honest note:** v2 is 285 lines vs v1's 259. Line count barely moved; a schema block, a directory
tree and a 12-row matrix are ~75 lines of irreducible reference. The win is operational (3.2× cheaper
per round, and it runs at all), not textual.

**Now running:** `wave2b.js` — conform all 10 files to v2, **purge v1 machinery by deletion** (a
grep-enforced purge list; five files are known to contain it), re-gate each with a hostile critic
whose PASS requires zero v1 hits, zero contract violations, and `THIS_FILE_WINS`.

**Still not run, and still the only thing that proves any of this:** the Wave 2-D blind A/B
tournament. Script is written and syntax-checked at
`/private/tmp/claude-501/-Users-Nathan/65d1a464-4747-4fa7-ace0-1a3baef9692a/scratchpad/wave2d-tournament.js`
(4 prediction pairs + 1 real build-off + blindness audit + loss diagnosis). v2's own C5.6 makes this
binding: **nothing in this repo may claim the baseline has been beaten until that tournament runs.**

Red-team ×3 and the coherence integrator also still have not run.

## WAVE 1 STATE (historical)

All 10 components written and each pushed through a 3-round hostile-critic gate.
Workflow run `wf_1dbf8562-6c8`, stopped deliberately after the round-3 critiques, before the
red-team and coherence passes ran. ~50 agents spent.

| File | Lines | Final gate | Blockers / Majors |
|---|---|---|---|
| `BARS.md` | 467 | **PASS** (r1) | 0 / 4 |
| `README.md` | 179 | FAIL (r3) | 0 / 3 |
| `LAUNCH.md` | 351 | FAIL (r3) | 1 / 2 |
| `DOCTRINE.md` | 401 | FAIL (r2) | 0 / 4 |
| `ROLES.md` | 400 | FAIL (r3) | — |
| `INSPECTION.md` | 450 | FAIL (r3) | — |
| `FAILURE-MODES.md` | 400 | FAIL (r3) | — |
| `OPERATIONS.md` | 451 | FAIL (r3) | — |
| `EXAMPLES.md` | 531 | FAIL (r3) | — |
| `install/SKILL.md` | 197 | FAIL (r3) | — |

Integrity verified after the stop: no truncation, all code fences balanced.

**Every file scored `forced_choice: THIS_FILE_WINS`.** The content beats a smart operator
holding only the baseline prompt. The FAILs are internal-correctness and cross-file contract
drift. Full verdict dossier: `reference/WAVE1-VERDICTS.md`.

## Root cause — one bug, not eight

Five files each restate **the critic verdict schema** and **the stop rule** in their own words,
and they have drifted apart. Nobody owns either contract, so single-file revisers cannot
converge: conforming requires agreeing on something no file is normative for.

Concrete instances found by critics:

- `README.md` promises the loop exits when a critic picks ours. `LAUNCH.md` §2 says the bar is
  out of reach by construction and the emission cannot self-terminate; `OPERATIONS.md` §5 calls
  marginal-gain collapse "the normal exit." The most-read sentence sells the rare exit.
- `DOCTRINE.md` states termination statistically (binomial table, alpha, confidence interval on
  win rate) — **nothing in the repo computes it**, and `OPERATIONS.md:197,210-217` implements a
  different rule (`verdicts.length >= 5 && barWins/n >= TARGET`, `GAIN_THRESHOLD = {5:5,7:6,9:7}`,
  `dry >= 2`) that DOCTRINE:379 explicitly lists as illegitimate.
- `LAUNCH.md` STEP 2b audio row + example 5b order the critic to judge and blind-compare
  recordings. `INSPECTION.md` §9 opens: "the critic cannot hear." **1 BLOCKER.**
- `INSPECTION.md`'s closing verdict contract contradicts `ROLES.md` (schema owner) on two fields.
- `FAILURE-MODES.md` detection apparatus assumes a plaintext verdict artifact the system never
  produces; F20's stop rule and `BARS.md` bar-escalation fire on the same event and mandate
  opposite actions.
- `install/SKILL.md` sibling paths (`../LAUNCH.md` …) resolve wrong from the install location;
  its STOP-token arithmetic is 40x off against `LAUNCH.md`.
- `README.md`'s quickstart tells the generator to swallow all 356 lines of `LAUNCH.md` —
  violating the system's own thesis that prescription volume degrades output.

## Wave 2 plan (do these in order)

**W2-A — Contract freeze.** Create `CONTRACTS.md` as the single normative owner of: the critic
verdict JSON schema, the stop rule (one rule, computable, matching what `OPERATIONS.md` can
actually run), the repo path layout, and the emission's STOP token budget. Every other file
*references* it and keeps zero restatement. Then conform all ten files in one coordinated pass
(one agent per file, all reading the frozen contract). This is the fix for ~70% of open gaps.

**W2-B — Deaf-critic sweep.** `INSPECTION.md` §9 is right: no audio probe exists. Either remove
audio from `LAUNCH.md`'s modality router and `BARS.md`'s voice entry, or route audio to a
transcript-plus-metrics proxy and say so in all three files. Same sweep for any other modality
claimed in one file and disclaimed in another.

**W2-C — Finish the passes never run.** 3 red-team adversaries (domain coverage / judgment
capture / operability+truthfulness) and 1 coherence integrator. Prompts are already written in
the wave-1 script — reuse them.

**W2-D — THE BLIND A/B TOURNAMENT.** The event the whole thing exists for, and it has not run
yet. Design (settled, do not re-litigate): compare **like-for-like**, our *emitted launch prompt*
for goal X versus *Shumer's prompt adapted to goal X*. Same length class, same format, order
randomised, unlabelled, judge told nothing about provenance. Three goals across three modalities
(one visual, one interactive, one non-visual). Multiple independent judges per pair; forced
choice, no rubric. A system-vs-prompt comparison is NOT blind — the length tells the judge
instantly. If we lose a pair, the losing emission is the artifact to fix, not the test.

**W2-E — Re-gate** anything W2-A/B touched, then ship: install the skill, verify it loads.

## Reusable assets

- Wave-1 script (builder/critic/reviser/red-team prompts all written and working):
  `~/.claude/projects/-Users-Nathan/65d1a464-4747-4fa7-ace0-1a3baef9692a/workflows/scripts/gauntlet-master-build-wf_1dbf8562-6c8.js`
- Shared brief every agent reads: `reference/BUILD-BRIEF.md`
- Baseline + why-it-works analysis: `reference/baseline-gauntlet-prompt.md`
- `resumeFromRunId` is same-session only, so it will **not** work after the break. Run wave 2 as
  a fresh workflow against the files on disk. The files are the state.

## What worked, keep doing it

The critics are the reason this is good. Defaulting to FAIL, demanding cited evidence, forbidding
verdict laundering, and forcing the choice against "smart operator + baseline prompt" produced
findings no self-review would have surfaced — including the system contradicting its own doctrine.
Making critics read sibling files is what caught the contract drift. Keep both.

## Starter prompt for the next session

```
Resume THE GAUNTLET (master prompting system benchmarked against Matt Shumer's Gauntlet Loop).
Read /Users/Nathan/Code/gauntlet-loop-system/RESUME.md first, then
reference/WAVE1-VERDICTS.md and reference/BUILD-BRIEF.md.

All 10 components are written and critic-gated; 1 clean pass, 9 failing on cross-file contract
drift, root cause diagnosed in RESUME.md. Execute Wave 2 A through E in order, ultracode, fan out
sub-agents, hostile blind critics, loop until each file clears a fresh-context critic that
defaults to FAIL. W2-D (the blind A/B tournament vs the real Gauntlet Loop prompt) is the gate
that matters — do not declare done before it runs and we win it.
```
