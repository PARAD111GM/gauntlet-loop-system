# DOCTRINE

Why the Gauntlet Loop works, and what breaks it. Read it off-run — `install/SKILL.md` loads it
`never`, deliberately. Return when a run is misbehaving and you need to name the dropped invariant.

**This file holds no contract.** `CONTRACTS.md` (v2) freezes the verdict schema (C1), the stop rule (C2),
the path layout (C3), the emission budget (C4) and the modality capability matrix (C5). Numbers, fields,
paths and capabilities appear below only as a *derivation of* or a *pointer to* one of those five. Where
this file and `CONTRACTS.md` disagree, `CONTRACTS.md` is right and this file is the bug. Every rule here
was then run back over this repo's own artifacts: where a rule condemned correct output, the rule was
fixed, not the output. Four such fixes are marked *self-test*.

Five invariants. Three are the irreducible core: a goal aimed at a **named external artifact**, a
**blind judgment** that decides against it, **powers separated** so nobody grades their own work. The
other two stop those three eroding, because a prescribed part list becomes a rival definition of done
and a round counter becomes the termination rule, and the core then rots with no score moving. Bars:
`BARS.md`. Roles: `ROLES.md`. Probes: `INSPECTION.md`. Budgets and resume: `OPERATIONS.md`.

---

## The five invariants

| # | Invariant | Drop it and you get | Cheapest detection |
|---|---|---|---|
| 1 | Concrete external bar | Convergence on "good for AI" | Read each verdict's `observations` against what C1.2 requires of an unblocked critic, then re-run C3.4's hash diff |
| 2 | Delegated decomposition | A ceiling equal to the operator's mental model | Diff artifact structure against the noun list in the launch prompt |
| 3 | Separation of powers | Optimized evidence, not measured evidence | For each number in the round report, name the process that emitted it |
| 4 | Blind forced choice | Score inflation with flat quality | Ask whether the headline metric can rise while the bar artifact is untouched |
| 5 | No round limit | Work paced to the counter | Grep every prompt and the script for a number beside `round`; a hit is legal only if it aborts (C2.1 clause 1) |

### 1. A concrete external bar

**Statement.** The loop is aimed at a specific artifact that exists outside the run, that no
participant authored, and that no participant can edit.

**Why it exists.** Quality is not a property of an artifact, it is a relation between two artifacts.
Remove the second and "better" silently rebinds to "different from the last version" — a gradient
that is real, non-zero, and points nowhere.

**Exact failure when dropped.** The loop optimizes internal consistency: more coherent in its own terms,
no better in anyone else's. It plateaus where the model lands unaided, then polishes that level while
cost accrues and reported quality rises, the previous round being the only referent left.

**Detection at selection time.** Ask of the `BAR` line, before round 1: *which artifact, and what exactly
does a fresh agent open to see it?* Three common failures: a category (`"modern SaaS dashboards"`), an
adjective (`"AAA quality"`), a previous revision of the work. Pass tests and failure actions: `LAUNCH.md` §3.

**Detection per judgment — and it is not a receipt from the critic.** The bar is captured once into
`$RUN/bar/` before round 1 and hashed with C3.4's cwd-pinned command; the tree is C3.2. The arena agent
stages and seals it — `ROLES.md` owns that role, C3.5 is why a Workflow script cannot — and no judge
opens the bar ad hoc. **Do not ask a critic which file under `$RUN/bar/` it opened.** That question hands
over the mapping the blind depends on, and there is nowhere to put the answer: C1.1 is closed, so a
per-judgment re-open receipt is a required key no writer produces. The replacement is already in C1: one
`observations` entry per arena side, each carrying a copy-pasteable command and a literal result (C1.6).

*Self-test — the audit has two cases, not one.* A judgment that opened nothing cannot produce that pair,
**unless it is the blocked path**, where C1.2 legally returns `choice: null` with `blocker` set and no
observations at all. A null choice with a blocker is a working critic reporting an obstacle, and re-judging
it is the whole remedy; an empty `observations` beside a real `choice` is a vote, and the round-close audit
rejects it. An audit that cannot tell those apart condemns the one path C1.2 built to keep a blocked critic
from inventing evidence.

Bar *drift* is a hash check on the harness side, never a claim inside a verdict: re-run C3.4's diff at
every round close (`FAILURE-MODES.md` F3), exactly as C3.4 writes it, or an unchanged bar reports
drift. A live re-fetch upstream is a different bar, so a new run.

### 2. Delegated decomposition

**Statement.** The operator supplies the goal and the bar. The model chooses the parts, their
boundaries, and their count.

**Why it exists.** Decomposition is the highest-variance decision in the run, made at the moment of
least information, and it is drawn from the operator's model of the domain — which caps the result at
that model. The point of the loop is to exceed it.

**Exact failure when dropped.** Two harms, both mechanism arguments rather than observed failures in our
runs; the first is unobservable by construction, which is the point of it. (1) *Missing-subsystem
blindness* — agents optimize hard on the parts you named and never invent the part you did not know
existed; the gap appears as nothing, not as a low score. (2) *Checklist capture* — the part list is a
cheaper definition of done, so the loop ends when your list is satisfied and reports success honestly.

**Detection.** Diff the top-level structure of the finished artifact against the launch prompt. If
they are isomorphic, you prescribed. Second signal, mechanical: count the nouns that **plan the
work** — target zero. One test sorts every noun: *does it name an output the operator would accept,
or a component the builder would create?* The first is goal, the second is prescription.

| Noun in the prompt | Counts? | Because |
|---|---|---|
| `in three.js`, `as a single HTML file` | No | Constrains the deliverable; does not plan it |
| `at the level of Linear's **Insights views**` | No, and it is **required** | Names the target. Strip the screen name to hit a noun budget and you have degraded the bar to a brand — the failure the bar rules exist to prevent |
| `showing **ticket volume and per-agent load**` (`LAUNCH.md` §5a, shipped) | No | Acceptance conditions. They leave the builder every decision about how to compute, model, or display them |
| `with a **data layer**, a **chart library**, a **filter sidebar**` | Yes — three | Each names something the builder would create and the operator would never inspect directly |

*Self-test — run on our own shipped emission.* `LAUNCH.md` §5a scores zero planning nouns; a naive
count that flagged its bar name or its acceptance clause would have sent the author back to write a
**vaguer** prompt, which is strictly worse. So: if your audit flags goal content, you are counting the
wrong noun class. **Corollary:** a bar described by enumerating its components is covert
decomposition. "At the level of Linear — the sidebar, the command palette, the insights charts" is a
part list wearing a bar's clothes. Name the artifact and the surface, never its parts.

### 3. Separation of powers

**Statement.** Building, judging, and arbitrating are performed by different agents with different
contexts. No agent may be graded on evidence it produced, and no agent may grade work it produced.

**Why it exists.** Anything a builder can edit, a builder will optimize, and evidence is not exempt.
When a subsystem emits the numbers it is scored on, gradient descent runs on the instrument instead of
the artifact — faster there, because the instrument is cheaper to change.

**Exact failure when dropped.** From a real browser FPS critic loop: the build shipped per-pass GPU
timings that were the frame total redistributed by a fixed weight table (ratios reduced exactly to
12:9:8:7:2:2:2:1:1:1:1), published with `reliable: true`. Same wave, a motion-blur velocity guard
reported `0.000px` on all 34 captures while eight visibly ghosted. Nothing was fabricated with intent;
the subsystem was the cheapest place for the pressure to land. Structural repair: measurement moves into
harness code no subsystem owns, subsystem claims are quarantined under `selfReported`, weight tables flagged.

**Detection.** Take every number in the round report and name the process that emitted it. If that
process lives in code the builder can edit, the number is a **claim**, not a measurement, and must be
relabelled. Then the harder structural test: *delete every metric the builder produced — can you still
score the run?* If not, the powers are fused and the loop is grading itself.

*Self-test — do not chase numbers into the verdict.* Verdicts carry none: C1.3 bans a score, rating,
total or rubric field at any depth and detects it structurally. A timing or a status code quoted inside
`observed` is a literal string by C1.6 and passes that ban — it is evidence, not a metric. An audit
that promoted it to a numeric field to "make it checkable" would break C1.3 and hand the run a rubric.

### 4. Blind forced-choice judgment

**Statement.** The gate is a forced choice between two artifacts with provenance stripped, plus the
evidence that decided it. Never a score. C1.3 makes that structural rather than cultural.

**Why it exists.** A rubric is authored inside the run, so it moves with the run. A forced choice
against a frozen external artifact **cannot inflate through the score** — one bit, and its referent is
not yours to change. It can still inflate through the *evidence* handed to the judge: see "The claim,
stated precisely".

**Exact failure when dropped.** Inflation with a straight face. The same FPS loop scored itself 27, then
38, then 43 against its own rubric across three waves. Through that whole climb `MouseLook.update`
integrated a critically damped spring with semi-implicit Euler, which diverges below roughly 55fps and
drove the camera to 7.3e46, and Pointer Lock failed silently. A human found both in ten minutes of play;
four critic passes over 34 still frames had not. The rubric was measuring its own convergence.

**Detection.** One question: *can the headline number rise while the bar artifact is untouched?* If
yes, it is a rubric wearing a gate's clothes. Second: did the judge know which candidate was the
incumbent? Any provenance leak restores incumbency bias and the blindness was cosmetic. Third, most
often missed: *who chose the evidence?* Anyone with a stake, and the gate is open however clean it looks.

### 5. No round limit

**Statement.** Termination is a function of the artifact's state. Never of a count.

**Why it exists.** A round budget is a deadline, and a deadline is the cheapest target in the room.

**Exact failure when dropped.** Mechanism argument, unobservable from inside the run by construction,
which is itself the problem: **countable targets dominate uncountable ones under any satisficing policy.**
"Beat the bar" is unbounded and unverifiable in the moment; "reach round 3" is checkable at a glance.
Effort redistributes toward *sufficient for round 3*, the report cannot tell "converged" from "ran out of
counter", and a quality decision has been laundered into a schedule decision.

**Detection.** Grep the launch prompt, every role prompt, and the orchestration script — not the
reference prose, which derives these numbers and would flag itself — for a number adjacent to `round`,
`iteration`, `pass`, `attempt`, `wave`, `retry`. The test is not whether a number sits beside `round`; it is
**whether hitting that number can be reported as done.**

*Self-test — two legal hits exist and the grep must not condemn them.* C2.1's abort clause passes: it breaks
the loop, says *abort*, claims no completion. `OPERATIONS.md` §9's stall trigger passes too: it changes
tactics — re-cut the part, change the modality — and closes nothing. What fails is a `for (r = 1; r <= 5;
r++)` that falls out the bottom and prints the artifact. C2.3 is why a compliant repo has no such number in
any *prompt*: the cap and the stall triggers live in the script. Second signal: if you can predict the stop
time before you start, you have a counter.

---

## Minimalism is load-bearing

The baseline prompt is about 120 words. Four mechanisms explain why adding to it makes it worse.

| Mechanism | What actually happens |
|---|---|
| **Judgment substitution** | Every prescriptive sentence replaces a model decision made *with* the artifact in view by an author decision made at time zero, with the least information anyone in the run will ever have. |
| **Search narrowing** | A prompt is a prior over outputs. Each constraint deletes branches, which **raises the mean and lowers the maximum**. A single-shot prompt wants the mean, so constraining it helps. A gauntlet fans out and keeps the winner, so it is buying the maximum — and every constraint is paid out of the tail it exists to sample. This is why prompt advice that works elsewhere inverts here. |
| **Instruction dilution** | Given many instructions, a model satisfies the cheaply checkable ones first. Load-bearing instructions are rarely the cheaply checkable ones. |
| **Rival definition of done** | A long prompt is itself a checklist. "Did what the prompt said" competes with "beat the bar" and wins, because it is verifiable and finite. |

**Corollary, non-negotiable: depth lives in reference files the orchestrator *may* load, never in the
launch prompt.** A reference file is consulted by an agent that has already seen the artifact and knows
what it needs — judgment applied late, with information. A launch prompt is judgment applied early,
blind. Same words, opposite value. Including this file.

**The same argument applies to the machinery, and this repo has already paid for it once.** v1 of
`CONTRACTS.md` answered criticism by growing — more judges, more thresholds, more bookkeeping — until
it priced a minimum run beyond what anyone would spend. So the rule was never run, and a rule nobody
runs governs nothing. **Machinery is a liability, and so is length.** Deleting is a contribution.

**Falsifiable with the system's own primitive, in one run.** Emit the short prompt and your long one for the
same goal, run both, blind-compare the outputs; if the long one wins, this section is wrong for your domain,
so report that. Nobody here has run it, so the claim rests on the four mechanisms.

**The test before anything enters a launch prompt.** *Would a competent model have done this anyway?* If
yes, cut it. If no: *does this constrain the deliverable, or plan the work?* Constraints may stay; plans
go to a reference file or go away. Five sentences — goal, named bar, fan-out, blind gate, termination
condition — inside C4.1's ceiling. Emission rules: `LAUNCH.md`.

---

## What a bar actually is

Four necessary properties. Missing any one makes it not a bar.

| Property | Test | Fails when |
|---|---|---|
| **External** | Could any participant change it? | It is a rubric you wrote, a spec, or your last revision |
| **Inspectable** | Can a critic open it *inside the run*, in the modality that carries the quality, at the same fidelity the candidate gets? | It is paywalled, offline, described-only, or reachable only as a proxy. C5 is the list of what this harness can actually inspect; a deciding modality C5 marks UNAVAILABLE takes C5's named proxy and a labelled verdict, or the run halts (C5.1, C5.3). Never a pretended inspection |
| **Named** | Does it identify one artifact plus version, build, URL, or screen? | It names a brand, a category, or a tier |
| **Above the ceiling** | Do one unassisted pass and blind-compare it to the bar. Does your pass lose? | Your one pass wins or ties — the bar is below the ceiling |

"Above the ceiling" is the property people delete first because it feels unfair. It is the engine. A
reachable bar supplies pressure until it is reached and then none; an unreachable one supplies it for the
life of the loop and forces termination onto marginal gain, the honest criterion. It is also the property
people settle by feel — "I'd be surprised if we beat it" — in a system whose thesis is that introspective
referents drift. Don't; run the probe. It is the cheapest money here and **not spent twice: that unassisted
pass is the round-0 artifact** every later comparison measures against. Keep it in the run tree as round 0
(C3.2) or round 1 has nothing to beat.

**Run on this repo, the probe convicts us.** Every wave-1 file beat the baseline prompt, our own
agent-systems bar, which by the row above puts that bar below the ceiling. C5.6 rules on it: the reference
files are not the emission, so the result does not condemn the bar; the emission is the *launch prompt*, and
that tournament has not run. Until it does, no file here may claim the baseline has been beaten. If it ever
settles that way, escalation is `BARS.md` § BAR ESCALATION, and only after a stop (C2.5).

The fifth requirement is a property of the *pairing*, not of the bar: **the modality the bar is inspected in
must show the defects that matter for this goal.** A perfect bar inspected through the wrong sense is a bar
you cannot lose to — three marketing stills cannot expose a divergent integrator, so the candidate wins on
stills and the run ends on a defect it never looked at. Bars per domain: `BARS.md`.

---

## Epistemics of judgment

| | Rubric scoring | Blind forced choice |
|---|---|---|
| Referent | Authored inside the run | Frozen artifact outside the run |
| Can improve *through the score* without the work improving | Yes, and it will | No: one bit, and its referent is not yours to change |
| Remaining inflation channel | The score itself: any dimension can be re-weighted | The **evidence packet**: whoever picks the probes and frames the captures picks the winner |
| Failure signature | Scores climb, defects persist | Judge disagreement, which is visible and arbitrable |

The loss is real: forced choice gives direction, not distance. Correct trade — direction is all a loop
needs, and distance is what invites inflation, because distance is a number and numbers get optimized.

**When one comparison is not enough,** do not reach for a score. Reach for repetition: independent
judgments, fresh context each, order derived rather than drawn, reported as a **count of picks** — not as a
rate, because a rate invites a threshold, and a threshold nobody can afford to run is worse than counting.
How many judgments, and what a count licenses, is C2. Judge prompt: `ROLES.md`. Evidence: `INSPECTION.md`.

### The claim, stated precisely

Forced choice closes the **score** channel, not the **evidence** channel. A blind verdict is produced
by looking at an *evidence packet* about two artifacts — captures, probe outputs, traces, transcripts —
not at the artifacts themselves. So the count of picks moves for three reasons, and only one is quality.

1. The work got better.
2. Someone picked probes that flatter the work, or framed the captures to flatter it. Probe selection
   is a judging power; hand it to an interested party and you handed over the verdict.
3. The two sides were inspected at **different fidelity** — a live-probed candidate against a lossy
   static proxy of the bar. The candidate gets motion, interaction, and error paths; the bar gets three
   marketing screenshots. Rigged, and it looks rigorous.

Path 3 is the shape of the `0.000px` velocity guard in invariant 3. Nothing there was *scored*
dishonestly: the instrument was wrong, and forced choice would have fed the same `0.000px` into a
cleaner-looking gate. Replacing the score relocates the pressure onto the evidence, where it is harder to
see, because evidence looks like fact. Honestly stated: *forced choice against a frozen external artifact
cannot inflate through the score, and will inflate through the evidence unless parity is enforced.*

**Non-negotiables for a judgment to count.**

- Provenance stripped from both candidates — no file names, timestamps, ordering hints, commit messages,
  or builder summaries in the judge's context. Order derived per judgment, not drawn: a Workflow script has
  no random source.
- One question, not a form. Evidence cited: a verdict with no named observation is a vote.
- Fresh context per judgment. A judge that has seen the last three rounds is judging the trajectory.
- **Modality matched to the defect class.** A still image cannot see a divergent integrator. Behaviour
  needs behavioural probes, perf needs traces against a stated budget, prose needs an independent
  reader, APIs need contract tests. What each can and cannot reach is C5; an instruction to inspect what
  C5 marks UNAVAILABLE is void however confident the verdict it returns. Where visual-only loops die.
- **Evidence parity, inside what C5 grants.** Both candidates captured by the same harness-owned probe,
  at the same fidelity, with candidate-independent selection: the probe set is fixed before either
  artifact is looked at, and no builder chooses, crops, or frames a capture. Where the bar exists only
  as a proxy, degrade the candidate to the proxy's fidelity — stills against stills, same encode, same
  viewport — or label the verdict `proxy-biased`, whose standing is C1's and C2's, not this file's. Parity
  is necessary and not sufficient: **matching two artifacts in a channel the harness cannot read buys
  nothing.** A matched pair of recordings still carries motion that C5's Motion row reaches only through a
  `window.__setTime(ms)` hook, and audio the critic cannot hear at all — which is why C5's Audio row is
  PROXY and C5.4 fixes what such a verdict carries. Order no comparison C5 does not grant. Per-domain
  mechanics: the **BLIND** block in each `BARS.md` domain section.

---

## The constitution

| Role | May | Must not | Must not see |
|---|---|---|---|
| **Operator** (human) | Set the goal, choose the bar, answer the human gates, abort, arbitrate ties of last resort | Grade rounds routinely, or the loop is just a slow human review | Nothing |
| **Orchestrator** | Decompose, register parts, spawn | Build, judge, hand-pick which capture reaches a judge, or declare a stop — C2.1 is evaluated at round close by the script, and `ROLES.md` names the arena and round-close agents as the only writers of the evidence record | Nothing, but must not *relay* builder claims to judges as findings |
| **Builder** | Produce the artifact and its own diagnostics | Judge its own work, emit the metrics it is scored on, or select the evidence a judge sees | The judge's prompt, the other candidates, prior verdicts on rival work |
| **Critic / judge** | Inspect, probe, choose, cite evidence | Build, patch, or advise on implementation | Provenance, builder summaries, prior scores, its own past verdicts |
| **Arbiter** | Resolve split verdicts on cited evidence alone | Introduce new criteria, or re-judge from scratch | The identity of the disputing judges and of the candidates |

**Article 1. No subsystem grades itself, and no subsystem supplies the evidence it is graded on.**
Measurement *and capture* live in harness code no builder owns; builder-emitted numbers are quarantined
under a self-reported namespace and are claims until independently reproduced. Choosing which probe runs,
and which frame, excerpt or trace window reaches the judge, is a judging power: it belongs to the harness,
never to anyone who benefits from the answer.

**Article 2. A builder's claim of compliance is worth nothing.** In a real run, "built on the design
system" was false; only grepping the imports revealed it. Critics verify by inspecting artifacts, never
by reading a summary — and a critic that asks a builder to justify a decision has already lost.

**Article 3. Evidence has provenance or it has no standing.** Every finding names the process that
produced it and the command that reproduces it.

**Article 4. Fresh context is a power, not an optimization.** A judge with history is a stakeholder.
Spawn judges fresh. Model choice is set at spawn, never after resume: resumed agents silently revert to
the session default, which has already burned one real run.

---

## Termination theory — the derivation behind C2

**The normal exit is marginal-gain collapse: the panel can no longer show that this round beat the last
one.** Bar crossing is real and rare, because the bar sits above the ceiling by construction. Budget
exhaustion is neither of those — it is an **abort**, reported with the word *abort*, run left resumable.
Most runs end on collapse or abort. A file, gate or README that leads with crossing sells the exit that
almost never fires, and mis-set termination expectation is the one way to lose money on a good prompt.

**Nothing in this section is operative.** C2.1 holds the clauses, C2.2 the same count by hand; anything below
that reads like a threshold is a derivation. Those thresholds are fixed before round 1 and recorded in
`run.json`, because a threshold chosen after seeing the data is a preference — the same reason `BARS.md`
never lowers a bar.

### The small panel: what it buys and what it cannot

A panel is a purchase, and the only honest question is what it can pay for. C2.1 buys a rule an operator can
execute on their fingers at round close, and states the price plainly: **it speaks loudly about a large
quality gap and stays honestly silent about a small one.** Almost the whole panel picking our side is a real
signal about a visible difference; it is never evidence that a subtle one exists, and no report may present
it as one. That silence is not a defect to engineer around — it is why C1.4 makes `indistinguishable` a
signal to **change modality** rather than a tie to be broken. At this panel size resolution comes from
looking somewhere new, never from buying more judges: `INSPECTION.md`, via `OPERATIONS.md` §9.

### Why collapse needs two halves and two rounds

**Collapse is only valid on externally referenced ordinal judgments.** The 27 → 38 → 43 series has the
right shape — deltas of +11 then +5 — and was worthless, being self-scored. Deceleration in a
self-referential metric measures the metric converging. Compute it on blind picks against the frozen bar
or against the previous round's artifact; never on anything the run authors.

C2.1's dry round requires two conditions at once, and each fails alone. *The delta panel did not prefer the
new artifact* says this round did not beat the last — on its own that argues for one more round, because a
flat round happens. *The round opened no new gap* says nobody found anything left to fix — on its own it is
satisfied by critics who looked only in an exhausted modality. Together they say the loop has stopped both
winning and learning, the only honest reading of "done" available when the bar is out of reach. Making a dry
round **repeat** before it closes anything is the hysteresis (C2.1 clause 3): one quiet round is noise at
this panel size, a repeat is a trend, and any non-dry round resets the count, so the cheap rule costs at most
one extra round.

Below collapse sits regression: a delta panel preferring the **previous** artifact is not convergence, and
reporting it as collapse ships the worse thing, so C2.1 rolls back and re-cuts. Above it sits the veto — a
frozen probe that passed in an earlier round and now fails makes the round a FAIL whatever any panel picked,
because a run trading working behaviour for a prettier surface goes backwards while every judgment says
otherwise.

**Abort is not a completion.** If the panel C2 requires is out of budget, stop, say *abort*, record the
resume handle. A loop that cannot afford its judgments has not converged; it ran out of money, and a soft
finish here is the most expensive lie in the system.

**Illegitimate stopping rules,** each of which has ended a real loop early: a round counter, or any number
that can be reported as done (invariant 5); the builder declaring done, or a critic saying "this is good now"
with no comparison; one critic closing a part, which is n = 1 and why C2.4 makes part verdicts advisory;
"judge twice with sides swapped, then stop" — two judgments agreeing is a coin landing the same way twice,
and the swap is a blindness check on one judgment (`FAILURE-MODES.md` F11), never a stop; a panel smaller or
looser than C2.1's, either way; `indistinguishable` treated as a win (C1.4); the operator getting tired
without recording it as an abort.

---

## When NOT to run a gauntlet loop

Cost is superlinear, quality sublinear. Four wrong-instrument cases, two unsafe ones.

| Situation | Why the loop fails | Do this instead |
|---|---|---|
| **Cost-dominated task** | Marginal quality is worth less than the tokens and wall clock. Loops do not know this and will not stop. | One careful pass, one review. |
| **Single correct answer** | Nothing to search over. Blind comparison of two correct answers is pure noise, and the loop will manufacture a preference. | A test, a proof, or a lookup. Graders, not critics. |
| **No external bar can exist** | Genuinely novel-in-kind work, or taste with no exemplar. Without a referent the loop is a rubric, and rubrics inflate. | Find the nearest proxy bar and say it is a proxy, or do not loop. |
| **Hard deadline** | Quality-driven termination has unbounded runtime by construction. Under a deadline you will install a counter, which breaks invariant 5 and makes the loop worse than a single pass. | Timebox a fixed number of parallel attempts, pick one blind, ship. That is a tournament, not a gauntlet. Do not call it one. |
| **No human can tell the difference** | There is no judge of last resort, so split verdicts cannot be arbitrated and drift cannot be caught. | Get a domain judge before starting, or pick a different goal. |
| **Side-effectful work** | Loops re-do work. A frozen probe re-runs every round, so a probe that sends, pays, deploys, or dials does it again every round. That is not iteration, it is damage. | Loop on the artifact. Record or execute once, outside the loop, with human approval (C5.5). |

A useful smell: if you cannot name the artifact you would put beside your output and lose to, you are
not ready to launch a loop. You are ready to go find that artifact. That search is the work.
