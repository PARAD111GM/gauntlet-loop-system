# THE GAUNTLET

Turn any goal into a build loop aimed at a named real-world exemplar, judged by fresh-context critics
that blind-compare your artifact against it.

**How it ends, honestly.** The normal exit is marginal-gain collapse: the panel can no longer show
that this round beat the last one (`CONTRACTS.md` C2 clause 3). Crossing the bar is a real exit and
rare by design (clause 2). Running out of budget is an **abort**, reported with that word (clause 1).
A regression stop rolls the round back instead of completing it (clause 4). A frozen probe that
passed before and now fails fails the round and blocks any stop in it (clause 0). C2 is normative for
the rule; `OPERATIONS.md` §5 is its only implementation. Every number in it belongs to those two and
to no other file.

`CONTRACTS.md` is normative for the five frozen contracts; where any file here disagrees with it,
that file is the bug, this one included. What the loop does not do is grow: the emission stays inside
C4.1's word ceiling, still longer than Shumer's ~120 words — a cost, not a win, until the comparison
runs (C5.6).

---

## 60-SECOND QUICKSTART

**1. Generate.** Paste into a fresh Claude Code session (Opus 5); `<skill-dir>` is wherever these files sit:

```text
Read <skill-dir>/LAUNCH.md section 1 — that section only — and follow the meta-prompt in it.
Load <skill-dir>/CONTRACTS.md C5 when STEP 2 sends you there. Read nothing else yet.

GOAL: <one messy sentence — what must exist when this is done>
BAR:  propose 3
STOP: my call
```

Section 1 only, deliberately: an agent that has swallowed the whole repo writes worse prompts than
one that has read the goal. `propose 3` is the default worth taking, because bar selection is this
system's main contribution. Already have one? Write it on that line. Vetted bars: `BARS.md`.

**2. Pick the bar.** `propose 3` returns three defended candidates and halts. Reply `1`, `2`, `3`, or
name your own. A bar already named comes straight back as header plus prompt.

**3. Read the header, then set the ceiling.** Four lines: `BAR` / `ACCESS` / `MODALITY` / `STOP`.
`ACCESS` names the URL, command or path the generator opened *this session* and what came back;
unverified, or login-walled with no `PROXY` named, is the reject row that sends most emissions back
(all four reject rows: `LAUNCH.md` §2). `STOP` carries your own words plus the ceiling and nothing
else — it is a budget line, never a stop rule (`LAUNCH.md` §2). The stop rule is never yours to
write: C2 holds it and the harness evaluates it (`OPERATIONS.md` §5). What you set before you spend
is the ceiling, from C4. The bar is out of reach by construction, so a loop with no ceiling cannot
end: the one way to lose money on a good prompt.

**4. Freeze the bar, then launch.** Get the named artifact into the run's `bar/` **once** — download,
archived page, screenshot, screen recording, a copy of a bar already shipped in `SKILL_DIR/bars/`
(C3.8), or the proxy `LAUNCH.md` §6 prescribes — then hash it with the cwd-pinned command in C3.4.
Any other form of that command reports false drift on an unchanged bar. Layout: C3.2. Critics judge
the snapshot; re-fetching mid-run is a new run with a new run-id. No `bar.sha256`, no provable
comparison against the same bar (F3), and you cannot disprove it. Then paste and walk away.

The installed form (`install/SKILL.md`, which becomes `SKILL_DIR/SKILL.md`) collapses 1–4 into one
gate: bar, runner-up, probes, stop rule and derived ceiling printed, stops for your `OK`, opens the
run directory itself, re-verifies the bar hash before spending, and resumes from the last completed
round in any later session, hash re-verified first (C2.6).
`/gauntlet build a Stripe-quality billing settings page for our admin app`

---

## WHAT THIS ADDS

The loop is not ours. It is Matt Shumer's Gauntlet Loop —
[prompt](https://github.com/mshumer/Claude-of-Duty/blob/main/prompt.md),
[write-up](https://somethingbig.ai/gauntlet-loop). His ~120 words get five things right and this
system preserves all five: a concrete, external, **inspectable** bar, not "high quality";
decomposition **delegated** to the model, never handed down; **separation of powers**, so the builder
never grades its own work; **blind A/B** against the bar instead of rubric scoring; and **no round
limit**, termination being quality- or budget-driven — the one counter in the system is an abort
backstop in the harness script (C2.3), never a pace-setter and never in a role prompt.

| | Baseline | This system |
|---|---|---|
| **Bar selection** | left to you; a weak bar caps the run silently | `LAUNCH.md` puts the bar through eight pass tests and opens it with a live tool call before emitting; `BARS.md` ships vetted defaults, plus § BAR CONSTRUCTION when nothing external exists |
| **Inspection** | "check it visually" — useless for an API | `INSPECTION.md` matches probe to artifact: behaviour→drive it, latency→timed repeat runs, prose→a fresh reader who never saw the intent, API→contract calls. What this machine cannot inspect is declared UNAVAILABLE and routed to a named proxy or a human, never faked (C5.3) |
| **Failure modes** | open: critic capture, bar drift, non-termination, runaway spend | `FAILURE-MODES.md` gives each a detection signal and a mitigation; `ROLES.md` blinds the critic structurally, and its `critic-seal.sh` proves the seal held |
| **Operability** | one-shot paste; no resume, no ceiling, no trail | `OPERATIONS.md`: cost ceilings, parallelism caps, resume, per-round evidence |

- **The head-to-head has not run.** Everything above is architectural. The licensing comparison — our
  emitted prompt against the baseline adapted to the same goal, same model and budget, judged blind —
  is designed and unrun, so nothing here may claim the baseline has been beaten (C5.6). Until it
  runs, "better" means "closes named failure modes."
- Visual domain, a bar you already trust, and you are watching the run? **The baseline is enough.**
  Use it. This earns its keep on non-visual artifacts, unattended runs, and goals where you cannot
  name the bar yourself. Voice is the case that burned us: C5.4 rules audio a proxy carrying a
  mandatory human gate, so nothing here asks a critic to judge a recording.

---

## THE LOOP IN ONE DIAGRAM

```text
   goal
    |
    v
 [1] BAR .......... name a real artifact a critic can open, then freeze a       BARS.md
    |               snapshot of it before round 1. Critics judge the snapshot,
    |               never a re-fetch. No hash, no provable comparison (F3).
    v
 [2] DECOMPOSE .... the orchestrator splits the goal into parts. not you.       ROLES.md
    |
    +--> one builder per part: parallel, fresh context, no critic access,
    |    a worktree each when they share files (parallel(), min(16, cores-2): ~10 at once).
    |    They hand over artifacts and evidence, never claims of compliance.
    v
 [3] JUDGE ........ fresh-context critics. Each reads no builder summary, gets  INSPECTION.md
    |               only the probe its modality licenses (C5), and makes one
    |               forced blind pick between two unlabelled artifacts. Part
    |               critique is advisory and closes nothing (C2.4); only the
    |               two round-close panels — the whole against the bar, and
    |               this round against last — can end a run. Sizes, and who
    |               may stop: C2. Two part critics disagree? the ARBITER       ROLES.md
    |               re-runs the deciding probe, on that edge only, overruling
    |               on evidence. One critic, no arbiter: cost, no signal (F14).
    v
 [4] CLOSE ........ gaps that name where to look go back to the builders,      OPERATIONS.md
    |               spend is recorded, the stop rule is evaluated exactly once.
    v
   round n+1, or stop / abort per C2. You keep the run dir: artifacts, every verdict, bar.sha256
```

---

## FILE MAP

| File | Open it when |
|---|---|
| `CONTRACTS.md` | Before changing anything, and any time two files disagree. C1–C5, frozen; a sibling that contradicts it is revised, not argued with. |
| `LAUNCH.md` | Always, §1 first. This is the product: goal in, minimal launch prompt out. |
| `BARS.md` | Choosing or challenging a bar; the emitted bar looks un-inspectable. |
| `DOCTRINE.md` | You want to change this system, or argue with it. Five invariants and what breaks without each. Off-run reading. |
| `ROLES.md` | Wiring the loop by hand, or a role is leaking (builder grading itself, critic reading summaries). Owns the verdict schema (C1). |
| `INSPECTION.md` | Before the first critic round. Non-negotiable for anything not judged by eye. |
| `FAILURE-MODES.md` | The loop runs but quality is flat, rounds never end, or the critic has gone agreeable. |
| `OPERATIONS.md` | Before an unattended or overnight run: ceilings, parallelism, resume, model-at-spawn, evidence layout, stall playbook (§9). |
| `EXAMPLES.md` | You want three worked end-to-end runs in different domains — constructed, arithmetic checkable, drawn from real failures — before trusting it. |
| `install/SKILL.md` | Making `/gauntlet <goal>` work in every session. |

Composes with, does not duplicate: `verification-loop` (its build/type/test/security gates run
*before* a critic round, so the critic judges quality and not a broken build), `eval-harness`
(scoreable bar? use an eval), `subagent-driven-development` (the dispatch pattern).

---

## WHEN NOT TO USE THIS

- **No external exemplar exists.** Novel research, or "figure out what we should build." The Gauntlet
  optimizes toward a destination; it cannot choose one. Shape the goal first.
- **Correctness is defined by a spec or a test suite.** A green test beats any critic. Run TDD and
  CI; keep the Gauntlet for taste, feel, polish, craft.
- **The work is smaller than the loop.** Under an hour by hand: orchestration is the pricier half.
- **Actions are irreversible or side-effectful.** Sent messages, migrations, filings, money, live
  phone calls. A frozen probe re-runs every round, so a probe that sends, sends every round. Record
  once at round 0 and replay a fixture, or gate it on a human (C5.5).

---

## COST

**No dollar figure appears on this page, and the floor is why.** The cheapest *compliant* run is
C4.3's minimum round count — round 1 is never dry and collapse needs two consecutive dry ones — times
C4.2's per-round agent count, and C2.1 forbids shrinking either panel for a small artifact. A
one-page prose run therefore costs what feature-scale software costs at that floor: the bill tracks
panel size, not part count, at every scale of goal (`OPERATIONS.md` §4). Price it from §4's two
measured per-agent costs and your own rate card. Judging dominates, not building (C4.2), and no
`STOP` line may be priced in dollars (C4.4).

Neither the baseline's `/loop until it's utterly perfect` nor this loop has a ceiling unless you
impose one, at the harness, before launch: `budget=<n>` on the installed skill, `budget.total` in a
hand-wired script. Both currencies, the defaults, and the conversion between them are C4 — take the
numbers from there, never from this page. Never put a ceiling in the launch prompt: a counter there
competes with the bar, and the counter wins (`LAUNCH.md` §6).

Two levers. Cheap builders with an expensive critic cuts roughly an order of magnitude at little
quality cost, never the reverse — a cheap critic is a captured critic. And set every model **at
spawn**: a resumed agent reverts to the session default, which is how you pay Opus rates for Haiku.
