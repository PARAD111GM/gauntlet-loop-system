# FAILURE-MODES — the anti-pattern catalogue

Read the triage table first if a run is live. `VIOLATES` cites `DOCTRINE.md`'s five invariants: **I1** external bar, **I2** delegated
decomposition, **I3** separation of powers, **I4** blind forced choice, **I5** quality-gated termination.

**This page owns no contract.** Every schema field, stop clause, panel size, run path, budget figure and modality capability named below
is defined in `CONTRACTS.md` C1–C5 and only referenced here; this page prints no threshold. If a check here disagrees with
`CONTRACTS.md`, the check is the bug.

**What the signals read.** `r<N>-<part>-j<NN>-verdict.json` is the authority (C3.2) — the validated return, copied verbatim, unedited.
Prefer the `jq` form wherever given. Every lexical grep runs over that record's **prose fields only**, via this projection:

```bash
RUN=.gauntlet/current; N=${N:?the round just closed}; J=("$RUN"/r*-verdict.json)
prose() { jq -r '[input_filename,.dimension,.blocker,.largest_gap.gap,.largest_gap.evidence,(.not_probed|join(" ")),.human_gate]|@tsv' "${J[@]}"; }
```

**Never grep a whole record** (C3.6) — `probe_step` carries absolute arena paths by contract, so a bare `/Users/` pattern condemns
correct output. Model identity is read from the harness run record, never from a verdict: a judge cannot be trusted to report its own
model (F22). The A/B mapping lives in `.sides`, outside every arena and in nothing a critic reads.

---

## A. Bar failures

### F1 — SOFT BAR   ·   VIOLATES I1, I4
- **SYMPTOM:** Round 1 comes back a candidate win, and the verdict praises the work in its own terms.
- **WHY IT HAPPENS:** The bar is an adjective ("production quality", "AAA"), and an adjective is satisfied by whatever the builder made.
- **DETECTION SIGNAL:** trailing noun optional, so a bare `AAA` fires:
  ```bash
  grep -nEi '\b(AAA|triple.?a|best.in.class|enterprise.grade|state.of.the.art)\b|\b(high|professional|production|world.?class|top.?tier|premium|polished)\b([ -](quality|grade|standard|level))?' "$RUN"/launch-prompt.md
  ```
  `high` and `production` are ordinary words, so a hit is a read, not a verdict. The gate is the 60-second test: does the bar resolve to a
  URL, path, or product+version a critic can open without asking a human? Re-verified 2026-07-29: zero hits across all six shipped
  emissions in `LAUNCH.md` §5 and `EXAMPLES.md`.
- **MITIGATION:** One named artifact from `BARS.md`. A bar is valid only if the critic can put it beside the candidate in one modality (C5).

### F2 — BAR OUT OF REACH (loop thrash)   ·   VIOLATES I5 — termination becomes unreachable
- **SYMPTOM:** Five rounds, five losses, the same largest gap three rounds running. Diffs are large and directionless.
- **WHY IT HAPPENS:** Every round's feedback is "everything", so the builder re-lotteries the artifact instead of closing one gap. The
  bar supplies a wall, not a gradient.
- **DETECTION SIGNAL:** Repetition counted on identity, not bytes — fresh critics per round (F12) never phrase a defect identically
  twice, so string counting finds nothing. The round-close agent stamps a stable `gap_id` per distinct gap as it routes
  `largest_gap.gap` to the builder; repeats and closures are appended rows in `gaps.tsv` (C3.3). Resolve dups, ignore anything since
  closed, count *distinct rounds* per id:
  ```bash
  awk -F'\t' '{id=($3 ~ /^dup:/)?substr($3,5):$2}
              $3=="closed"{shut[id]=1}
              $3!="closed" && !seen[id,$1]++ {n[id]++}
              END{for(i in n) if(n[i]>=3 && !shut[i]) print n[i], i}' "$RUN"/gaps.tsv
  ```
  Any id printed is thrash. Count rows instead of distinct rounds and a healthy `open → dup → closed` history — three rows, one solved
  gap — fires it. Corroborate with `git diff --shortstat gauntlet-r3..gauntlet-r4` over ~500 lines: large diff, unmoved gap.
- **MITIGATION:** Keep the final bar; insert a *staircase*. Name an intermediate artifact beatable this round and re-point the critic at
  it, the final bar still the terminal gate. Lowering the final bar is F1.

### F3 — BAR DRIFT   ·   VIOLATES I1, I4
- **SYMPTOM:** Round 6's critic complains about a bar property nobody mentioned in rounds 1–5, or an earlier result stops reproducing.
- **WHY IT HAPPENS:** The bar was a URL, re-fetched each round. Pages change, A/B variants differ, video re-encodes, models update.
- **DETECTION SIGNAL:** `(cd "$RUN" && shasum -a 256 bar/* | diff - bar.sha256)` is non-empty. Use C3.4's cwd-pinned form and no other:
  `shasum` embeds the path as given, so a relative/absolute mismatch reports drift on an unchanged bar. No `bar.sha256` and you already
  have F3, with no way to prove otherwise.
- **MITIGATION:** Snapshot once before round 1 and hash it (C3.4). Critics read only the snapshot. Refreshing the bar is a new run-id.

### F4 — OVERFITTING TO THE BAR (surface mimicry)   ·   VIOLATES I1 — the bar becomes a texture to copy, not a standard to meet
- **SYMPTOM:** The candidate wins the blind comparison and is useless — the bar's palette, layout, phrasing or level geometry, no working
  interior.
- **WHY IT HAPPENS:** Surface is the cheapest way to move a stylistic comparison. If the probe is a still or an excerpt, mimicry is
  optimal play.
- **DETECTION SIGNAL:** (a) **Token lift**, run by the round-close agent, never a critic — a critic cannot grep for "the bar's strings"
  without being told which side is the bar:
  ```bash
  grep -rhoE '#[0-9a-fA-F]{6}' "$RUN"/bar | tr 'A-F' 'a-f' | sort -u > /tmp/bar.hex
  grep -rhoE '#[0-9a-fA-F]{6}' ./src    | tr 'A-F' 'a-f' | sort -u | comm -12 - /tmp/bar.hex
  ```
  Greys collide by chance; more than two non-trivial shared tokens is a lift. Repeat for font stacks, class names, literal strings.
  (b) **Novel-region split:** the orchestrator registers `<part>-novel`, a surface the snapshot lacks, judged as a normal part. Then
  `jq -r '[input_filename,.choice]|@tsv' "$RUN"/r$N-*-verdict.json` against `.sides`: winning the registered probe and losing the novel
  region is surface.
- **MITIGATION:** Every round, one probe is function-only and bar-blind — a contract test, an input trace, an independent-reader task
  (`INSPECTION.md`). Mimicry cannot pass a probe that never shows the bar.

---

## B. Judgment failures

### F5 — VERDICT LAUNDERING   ·   VIOLATES I4, I5
- **SYMPTOM:** A clearing verdict whose own text names the reason it should have failed — in prose, `PASS (with minor caveats)`: the
  orchestrator advances on the clear and never reads the caveat.
- **WHY IT HAPPENS:** Models dislike a bare negative after a builder has visibly worked. A hedged pass discharges both pressures.
- **DETECTION SIGNAL:** C1.1's schema has no pass/fail field and no hedged enum value, so hunt the residue — a decided `choice` in the
  same record as a named blocker. `blocker` belongs only to a null choice (C1.2), so a populated one beside a decided choice is a critic
  that found a stopper and picked anyway. `jq -r 'select(.choice != null and .blocker != null) | [input_filename,.choice,.blocker] | @tsv' "${J[@]}"`.
  Hint only: `prose | grep -Ei 'caveat|nit|reserv|aside from'` on a decided record.
- **MITIGATION:** `choice` admits C1.1's enum values and no modifiers. `null` is a real path, not a hedge: an unprobeable artifact loses
  and the blocker is named (C1.2). A failed validation is re-judged by a fresh critic, never repaired in place.

### F6 — CRITIC CAPTURE   ·   VIOLATES I3, I4
- **SYMPTOM:** The verdict adopts the builder's vocabulary and defends its choices: "intentional", "acceptable tradeoff", "by design".
- **WHY IT HAPPENS:** The critic was handed the builder's rationale, summary or PR body. Given a justification, a model's cheapest
  coherent output is to accept it.
- **DETECTION SIGNAL:** `prose | grep -Ei 'as the builder|per the (design|implementation) (note|rationale)|by design|intentional(ly)?|acceptable trade.?off|understandable given'`
- **MITIGATION:** The critic's input is the artifact, the bar snapshot and the probe outputs, nothing else, enforced at the spawn
  boundary (`ROLES.md` `critic-seal.sh`) — never by asking a critic to ignore its input.

### F7 — SELF-GRADING LEAKAGE   ·   VIOLATES I3
- **SYMPTOM:** Scores rise every round, nothing improves. This is the run that went 27 → 43 on its own rubric, real bugs untouched.
- **WHY IT HAPPENS:** The same context built and judged. Even under "now act as a harsh critic", the judging turn inherits the building
  turn's beliefs about what the artifact does.
- **DETECTION SIGNAL:** first-person build language in a verdict is proof:
  `prose | grep -E '\bI (built|added|wrote|refactored|implemented|fixed|chose)\b'`. Structural check: the critic shares a spawn call or
  a transcript with the builder.
- **MITIGATION:** Critics are separately spawned agents with zero conversational ancestry to the builder: one `agent()` call each,
  inputs as file paths. Cannot name the fresh spawn, no critic.

### F8 — RUBRIC INFLATION   ·   VIOLATES I4
- **SYMPTOM:** "Round 4: 91/100." Round 1 was 62. The artifact is recognisably the same.
- **WHY IT HAPPENS:** A self-authored rubric has no external anchor, so the number drifts toward what the scorer expects a diligent
  effort to deserve. Effort inflates the score; quality need not.
- **DETECTION SIGNAL:** structural and total, because C1.3 admits no score, rating, total or rubric field at any depth — which retires
  the old score-delta signal, which could never fire. **Any** numeric path in a verdict is F8:
  `jq -r 'select([paths(type=="number")]|length>0) | input_filename' "${J[@]}"`. Non-empty is a reject. Self-tested against a conformant
  record and one carrying `score: 87`: only the second prints. Legitimate measurement costs nothing here — a timing, status code or frame
  count is a string inside `observations[].observed`, which is where C1.6 wants it, as literal output.
- **MITIGATION:** Numbers are diagnostics, never gates. The only gate is the forced pairwise choice against the bar snapshot.

### F9 — MODALITY MISMATCH   ·   VIOLATES I1, I4 — the bar is not actually being compared
- **SYMPTOM:** The critic declares the artifact excellent. You open it and hit a bug in ten seconds.
- **WHY IT HAPPENS:** The probe cannot observe the property being judged. A screenshot cannot see a behavioural bug, a stutter, a race,
  a wrong total, or a broken back button.
- **DETECTION SIGNAL:** structural, as a two-command intersection — an eyes-only verdict against a defect class eyes cannot show:
  ```bash
  jq -r 'select(.modality=="viewed") | [.dimension, input_filename] | @tsv' "${J[@]}" | sort -u
  grep -B4 -E '^DEFECT_CLASS: *(behavioural|timing|correctness)' "$RUN"/plan.md   # the part block each one belongs to
  ```
  A dimension in both lists is F9; `modality: "other"` on a non-visual defect class is the same finding. A lexical `screenshot|\.png`
  grep is a **hint only, never an audit line** — `viewed` is the correct modality for a static-visual dimension, so a healthy verdict
  fires it. `jq '.probes_run|length'` of 1 is a second hint on any dimension.
- **MITIGATION:** Match the probe to the claim inside what C5 grants, and take the recipe from `INSPECTION.md`: behaviour → scripted
  interaction with a per-step assertion; performance, API, data, prose, audio → that modality's C5 row and nothing outside its CAN
  column. One non-image probe minimum. Five things this harness cannot inspect (C5): **audio timbre and prosody, perceived latency,
  sustained concurrency, read-aloud, and motion with no `window.__setTime(ms)` hook.** A verdict claiming one is void — `human_gate` it
  and mark `parity: "proxy-biased"` where C5.3 says PROXY, drop the claim where C5.3 says REMOVED.

### F10 — IDENTITY LEAK (blindness broken)   ·   VIOLATES I4
- **SYMPTOM:** The verdict's reasoning says "our version", "the candidate", "the ThreeJS build". Candidate pick rate is suspiciously
  high or suspiciously low.
- **WHY IT HAPPENS:** The two artifacts were distinguishable — file names, repo paths, watermarks, resolution, a dev-server URL, a git
  header, a style tell. Blindness was nominal.
- **DETECTION SIGNAL:** `prose | grep -Ei 'our (version|build|implementation)|the candidate|localhost|127\.0\.0\.1|/Users/|\bbranch\b'`,
  plus any `blind_integrity: compromised`. **Never run `/Users/` over a whole record** — a compliant `probe_step` is an absolute arena
  path, so that grep stops healthy rounds; self-tested, a conformant verdict whose `probe_step` is `cd /Users/…/arena/whole/A && …` does
  not fire through `prose`. Pre-flight is `ROLES.md`'s `critic-seal.sh`, scoped to the diffable surface — lockfiles, source maps and
  build output all contain `/Users/` in any real tree.
- **MITIGATION:** The arena agent — no other role — copies both artifacts into the arena as `A` and `B`, strips provenance (VCS
  metadata, docs, comments, EXIF, bar-naming filenames), normalises mtimes, and records the side in `.sides` (C3.2). Only the
  round-close agent joins a choice to a side.

### F11 — POSITION BIAS   ·   VIOLATES I4
- **SYMPTOM:** The critic picks the second artifact almost every round, regardless of content.
- **WHY IT HAPPENS:** Recency. The artifact described last is more available when the choice is made.
- **DETECTION SIGNAL:** Sides move between rounds, so bias is a preference for a *letter* while the side moves under it:
  `jq -r 'select(.choice!=null)|.choice' "${J[@]}" | sort | uniq -c` sits near even across ≥6 rounds; every round one way is bias.
  Blocked verdicts are filtered out — they are not judgments, and unfiltered they read as a third letter. Within one round a lopsided
  split is expected, since one arena carries one side for the whole panel, so never read a single round's tally as bias.
- **MITIGATION:** Sides are derived per arena and recorded in `.sides` (C3.2), never drawn, so letter preference averages out. On a
  suspect tally, have the arena agent re-stage that arena with the letters exchanged and re-judge with fresh critics; a result that
  follows the letter rather than the artifact voids the round. Judging twice and stopping is not a rule — see F20.

### F12 — CRITIC DRIFT AND FATIGUE   ·   VIOLATES I3, I4
- **SYMPTOM:** Round 1's verdict is 900 words of located defects. Round 7's is "looks good, minor spacing issues". Complaint categories
  rotate without any being resolved.
- **WHY IT HAPPENS:** A critic carried across rounds accumulates the artifact's history and grades the delta instead of the gap to the
  bar. Long context also compresses.
- **DETECTION SIGNAL:** `jq -r 'select(.choice!=null)|.observations|length' "${J[@]}"` — a falling count across ≥3 rounds is fatigue.
  Filter to decided verdicts or a blocked verdict's legitimate 0 (C1.2) reads as collapse. Second signal: round N's probes share nothing
  with N−1's and no part cleared.
- **MITIGATION:** A fresh critic per round, identical instructions, no round history. Continuity lives in the frozen probe set (F17).

### F13 — UNACTIONABLE VERDICT   ·   VIOLATES I4, I5
- **SYMPTOM:** A loss for "lacks polish", "feels less premium", "needs more depth". Next round is a guess.
- **WHY IT HAPPENS:** The probe produced impressions, not observations, so the verdict has nothing to point at. Direct cause of most F2.
- **DETECTION SIGNAL:** list the observations carrying **no** locator — no `file:line`, timestamp, timing, status code or quoted string.
  `@json` forces one line per observation; without it a console excerpt with a newline splits into fake extras.
  ```bash
  jq -r '.observations[].observed|@json' "${J[@]}" \
    | grep -vE '[a-z0-9_]+\.[a-z]+:[0-9]+|[0-9]+:[0-9]{2}|[0-9]+ ?(ms|fps)|\\"|#[0-9a-fA-F]{6}|\b[45][0-9]{2}\b'
  ```
  Every line printed is a finding the builder cannot act on. No ratio, no floor: one unlocated observation is one dropped finding.
- **MITIGATION:** Every finding carries a locator and the literal probe output that produced it (C1.6). Findings without a locator are
  dropped before the builder sees them.

### F14 — ARBITER RUBBER-STAMP   ·   VIOLATES I3
- **SYMPTOM:** The arbiter exists, and has never once disagreed with the critic.
- **WHY IT HAPPENS:** It was given the critic's verdict as its primary input, so its cheapest coherent output is ratification.
- **DETECTION SIGNAL:** structural — first ask whether the role should exist: `grep -nEi 'arbiter' "$(jq -r .scriptPath "$R")"`, `$R`
  per `OPERATIONS.md` §6. A C2 panel is its own tiebreak and a blocked verdict is re-judged by a fresh critic, so an arbiter holds no
  authority: it is machinery. Kept anyway, its ratifications are visible in each round's `report.md` — agreement on every arbitration
  across ≥4 rounds means delete it.
- **MITIGATION:** Prefer no arbiter. If you keep one, call it only on disagreement between two independent critics and give it both
  artifacts plus both verdicts *without* which critic said what. It never terminates anything (C2.4).

---

## C. Decomposition failures

### F15 — NON-JUDGEABLE PARTS   ·   VIOLATES I2, I4
- **SYMPTOM:** Part verdicts read "cannot evaluate in isolation", or "assuming the rest works, correct".
- **WHY IT HAPPENS:** The goal was split along implementation seams (files, layers, modules) instead of where an *inspectable artifact*
  exists. A part with no observable output cannot be gated.
- **DETECTION SIGNAL:** every part in `plan.md` carries one `ARTIFACT:`, one `EVIDENCE:` and one `DEFECT_CLASS:` line, all fillable now
  (C3.2), and all three counts equal the part count:
  `for k in ARTIFACT EVIDENCE DEFECT_CLASS; do printf '%s\t%s\n' "$k" "$(grep -c "^$k:" "$RUN"/plan.md)"; done`.
  A part whose evidence needs another in-flight part is not independent. A missing `DEFECT_CLASS:` silently disables F9's gate.
- **MITIGATION:** Re-split. Every part owns one artifact and one probe that runs today, even if that means a stub harness. Keep the
  split delegated: reject the plan, do not author it.

### F16 — INTEGRATION ROT   ·   VIOLATES I1, I4, I5
- **SYMPTOM:** Every part looks clear. The whole is incoherent — mismatched tone, three navigation patterns, a UI that contradicts its
  own data.
- **WHY IT HAPPENS:** Coherence is a property of the whole and is owned by no part. Local optima compose into a global mess, and no probe
  ever looked at the assembled artifact.
- **DETECTION SIGNAL:** every part advisory-cleared while the whole-artifact panel goes to the bar —
  `jq -r '[input_filename,.choice]|@tsv' "$RUN"/r$N-whole-j*-verdict.json` against `.sides`. Never turn a handful of judgments into a
  rate: only C2's panels decide anything.
- **MITIGATION:** The gate is always the whole artifact against the bar. A part is *advisory-cleared* when its critic finds no fresh
  gap; parts never terminate anything (C2.4). Budget every wave's last round to a whole-artifact judgement by fresh critics.

### F17 — REGRESSION BLINDNESS   ·   VIOLATES I5
- **SYMPTOM:** Round 6 fixes the critic's complaint and breaks something that passed in round 3. Nobody notices for three rounds.
- **WHY IT HAPPENS:** Each round's critic probes only what this round's verdict is about. Passed areas leave no artefact behind.
- **DETECTION SIGNAL:** every probe that ever passed stays in `"$RUN"/probes/` and re-runs every round, so `ls "$RUN"/probes | wc -l` is
  monotonically non-decreasing. Fewer probes than round N−1 means blind.
- **MITIGATION:** Frozen probe set, re-run every round, plus this round's new probes. A regression in a frozen probe is **C2's veto
  clause** — this page states no consequence for it beyond pointing there. Side-effectful probes replay round-0 fixtures (C5.5): a probe
  that dials a real number dials it every round.

### F18 — PREMATURE PARALLELISM   ·   VIOLATES I2 — the operator ends up authoring the interfaces under merge pressure
- **SYMPTOM:** Eight builders at once; six spend the round waiting on, guessing at, or reinventing a shared interface. Merge is a rewrite.
- **WHY IT HAPPENS:** Fan-out was treated as a throughput knob, not a dependency question. Parallelism pays only once the contracts
  between parts are frozen files.
- **DETECTION SIGNAL:** before fan-out, every shared type, schema or interface exists as a committed file —
  `git log --oneline -1 -- src/types src/contracts` predates the fan-out commit. After: `git diff --name-only` overlap between two
  builders' branches on a non-generated file.
- **MITIGATION:** Serial round 0 produces the interface files and one thin end-to-end slice. Only then `parallel()`, over parts touching
  disjoint file sets, concurrency under the harness limit.

### F19 — ORPHANED WORK   ·   VIOLATES I2
- **SYMPTOM:** Two branches each hold a working, incompatible version of the same foundation. One is thrown away, with everything on it.
- **WHY IT HAPPENS:** Parallel builders in isolated worktrees each hit the same missing primitive and each built it. No one owned it.
- **DETECTION SIGNAL:** the same exported symbol in two worktrees. Take paths from the harness, not a glob — worktrees are siblings, not
  children — and compare *identifiers*, not whole lines, since two builders write one primitive differently:
  ```bash
  git worktree list --porcelain | awk '/^worktree /{print $2"/src"}' \
    | xargs grep -rhoE '^export (function|const|class|type) [A-Za-z0-9_]+' \
    | awk '{print $NF}' | sort | uniq -d      # any name printed is orphaned work in flight
  ```
- **MITIGATION:** Assign single ownership for every shared primitive before fan-out, name the owner in the plan, non-owners import or
  stub. Integrate on a per-wave train branch, not N serial merges.

---

## D. Loop and operational failures

### F20 — NON-TERMINATION / INFINITE POLISH   ·   VIOLATES I5
- **SYMPTOM:** Round 11. Diffs are twenty lines of copy tweaks, verdicts have become taste notes, nothing is getting better or worse.
- **WHY IT HAPPENS:** "Until perfect" has no fixed point, and a critic asked for gaps always finds one. With no stop condition tied to
  *change*, the loop converges to noise.
- **DETECTION SIGNAL:** a sub-noise integrated diff for two consecutive rounds while the blind choice does not move, plus a collapsing
  locator count (F13). Both **corroborate**; neither decides.
- **MITIGATION:** **The honest headline: the normal exit is marginal-gain collapse — the panel can no longer show that this round beat
  the last one. Bar crossing is real and rare by design. Budget exhaustion is an *abort*, and is reported with that word.** The rule is
  **C2**: one rule, evaluated once at round close, in the Workflow script, the only thing in the system holding termination authority
  (C2.3). This page prints no clause, no panel size and no threshold — read C2. Two shortcuts that do not exist: judging twice with the
  letters exchanged and stopping (that is F11's blindness check), and any lookup table of wins — nothing implements one. No counter and
  no stall trigger belongs in a role prompt (C2.3). On any stop, report the standing gaps.

### F21 — COST BLOWOUT   ·   VIOLATES I5 in practice — budget, not quality, ends the run
- **SYMPTOM:** The operator kills the run. Not because it was done, but because of spend.
- **WHY IT HAPPENS:** Cost per round grows — context accumulates, fan-out widens, whole-artifact probes get rerun by every part — and no
  ceiling was declared, so nothing pushed back.
- **DETECTION SIGNAL:** the harness answers "what did round 5 cost?" with no ledger of yours: resolve `$R` per `OPERATIONS.md` §6, then
  `jq '{agents:.agentCount, tokens:.totalTokens, minutes:(.durationMs/60000|floor)}' "$R"`, with the per-agent `workflowProgress` rows
  for the breakdown (filter `.state=="done"` before trusting `.tokens`). Growth shows only rolled up per round, so the round-close agent
  — not the script, which has no filesystem (C3.5) — appends one row in C3.2's columns:
  ```bash
  A=$(jq '[.workflowProgress[]|select(.type=="workflow_agent")]|length' "$R")
  T=$(jq '[.workflowProgress[]|select(.type=="workflow_agent")|.tokens // 0]|add' "$R")
  printf '%s\t%s\t%s\n' "$N" "$A" "$T" >> "$RUN"/spend.tsv        # C3.2's three columns, in C3.2's order and unit
  ```
  Write seconds, or a total where C3.2 names output tokens, and the BREACH check below still runs but can never fire. Superlinear growth
  over three rounds is the signal.
- **MITIGATION:** Declare both ceilings before round 1, taking the numbers from **C4** — never invent either here. Route volume roles to
  cheaper models, keep the strongest for judges. On breach, stop, say *abort*, record the resume handle. Never cheapen a critic.

### F22 — MODEL DOWNGRADE ON RESUME   ·   VIOLATES I3, I4 — the judge silently changes mid-contest
- **SYMPTOM:** A resumed run's verdicts get shallower for no visible reason. Monday's rigour is gone.
- **WHY IT HAPPENS:** Resuming an agent reverts it to the session default model; model set after spawn does not stick. This has silently
  wrecked real runs.
- **DETECTION SIGNAL:** the run record carries the model per agent and is the only trustworthy source — a judge reporting its own model
  is a claim, not evidence. With `$R` per `OPERATIONS.md` §6:
  ```bash
  jq -r '.workflowProgress[]|select(.type=="workflow_agent")|[.label,.model]|@tsv' "$R" | grep -i 'critic\|judge' | cut -f2 | sort -u
  ```
  More than one id among a run's judging agents is F22; corroborate with `jq .models "$RUN"/run.json` (C3.2) and an F12 count drop landing
  on the resume boundary. Neither fires before the damage, which is why F22 is prevented, not detected: no critic is ever resumed.
- **MITIGATION:** Never resume a critic. Set `model` at spawn on every judging agent even when it equals today's default
  (`OPERATIONS.md` §2), fresh per round. `--resume` re-reads the launch inputs and starts a new Workflow (C2.6), carrying no judge across.

### F23 — BUILDER FALSE COMPLIANCE   ·   VIOLATES I3, I4
- **SYMPTOM:** The builder reports "built on the design system", "fully typed", "all tests passing". None of it is true. This has
  happened; only grepping the imports revealed it.
- **WHY IT HAPPENS:** Summaries are generated from intent, not from the artifact. A builder that meant to comply reports compliance.
- **DETECTION SIGNAL:** for each compliance claim, one command that would fail if the claim were false — and run it. "Design system" →
  `grep -rL '@/components/ui' src/**/*.tsx`. "Tests pass" → the exit code, not the transcript. "Typed" → `npx tsc --noEmit; echo $?`.
- **MITIGATION:** Critics never read builder summaries (also the F6 fix) and never ask a builder to justify a decision — that is F6 run
  as a probe; the why-test belongs to the round-close agent's greps over source. Every claim in the round report is paired with a command
  and its captured output; unpaired claims are struck before judgement.

---

## TRIAGE TABLE — live run, ten seconds

| Loop is doing this | You have | Do this now |
|---|---|---|
| Candidate wins round 1 outright | F1 soft bar | Kill it. Name a real artifact from `BARS.md`, restart. |
| Decided choice in a record that names a blocker | F5 laundering | Reject it. Re-judge under C1.1's enum; caveats are not a gate. |
| Same `gap_id` in 3+ rounds, never closed | F2 bar out of reach | Insert a beatable intermediate bar; keep the final one. |
| Builder reports "tests pass" / "on the design system" | F23 false compliance | Run the command, read the exit code. Strike unpaired claims. |
| Any number anywhere in a verdict | F8 rubric inflation / F7 self-grading | Delete it. Measurements are strings in `observations`. |
| Verdict says "intentional", "by design" | F6 critic capture | Cut the builder's rationale from the critic's inputs. |
| Verdict says "I added…" | F7 self-grading leakage | Spawn a genuinely separate critic. Discard the verdict. |
| "our version" / "localhost" in a prose field, or `blind_integrity: compromised` | F10 identity leak | Fix the tell, re-stage the arena, re-judge fresh. |
| Same letter picked every round | F11 position bias | Re-stage with the letters exchanged, fresh critics; a letter-following result voids the round. |
| Verdicts shrinking round over round | F12 critic drift | Fresh critic per round, identical prompt, no history. |
| Verdicts shrank right after a resume | F22 model downgrade | Re-spawn with the model set at spawn. Never resume critics. |
| Loss with no file/line/timestamp | F13 unactionable | Require a locator per finding; drop the rest. |
| An arbiter that has never disagreed | F14 rubber-stamp | Delete it — a C2 panel is its own tiebreak. |
| Praise, then you find a bug in 10s | F9 modality mismatch | Add a probe C5 grants for that defect class. Re-judge. |
| A verdict on timbre, latency feel, load, or read-aloud | F9, ungrantable claim | Void the claim. It is a `human_gate` (C5.3). |
| Wins the comparison, looks derivative | F4 surface mimicry | Add one bar-blind function-only probe; register `<part>-novel`. |
| "Cannot evaluate in isolation" | F15 non-judgeable parts | Re-split so each part has an artifact + probe today. |
| All parts clear, whole is incoherent | F16 integration rot | Gate on the whole artifact; parts are advisory (C2.4). |
| Old passing behaviour broke | F17 regression blindness | Re-run the frozen probe set. The regression is C2's veto. |
| Builders blocked on each other | F18 premature parallelism | Serialise until interface files are committed. |
| Two branches, same primitive twice | F19 orphaned work | One owner per primitive; integrate on a train branch. |
| Round 10, 20-line diffs | F20 infinite polish | Evaluate C2 once, at round close. Report convergence with standing gaps. |
| Someone wants to stop on two winning judgments | F20 illegitimate stop | Refuse. Two judgments is not a panel; the floors are C2's. |
| Cost climbing | F21 cost blowout | Roll the run record up per round. Enforce the C4 ceilings; never cheapen critics. |
| Bar behaves differently than before | F3 bar drift | Restore the hashed snapshot. Re-fetching starts a new run. |

## Round-close audit

Run at every round boundary, after the record is written. Any hit stops the round. The first three lines are the **pre-copy** audit —
C1.2's two rules and C1.5's — and they run before any verdict is copied. Non-empty output there is a reject: the verdict goes back for
re-judgment by a fresh critic, never an edit.

```bash
RUN=.gauntlet/current            # or the run dir you are auditing
N=${N:?round number required}    # the round just closed; the F20 diff needs it
J=("$RUN"/r*-verdict.json)
prose() { jq -r '[input_filename,.dimension,.blocker,.largest_gap.gap,.largest_gap.evidence,(.not_probed|join(" ")),.human_gate]|@tsv' "${J[@]}"; }

jq -r 'select(.choice==null and .blocker==null) | input_filename' "${J[@]}"                      # C1.2: expect empty
jq -r 'select(.choice!=null and ((.probes_run|length)<1 or (.observations|length)<2
       or .largest_gap==null)) | input_filename' "${J[@]}"                                       # C1.2: expect empty
jq -r 'select((.parity=="proxy-biased" or .modality=="independent_reader")
       and .human_gate==null) | input_filename' "${J[@]}"                                        # C1.5: expect empty
prose | grep -Ei 'as the builder|by design|intentional|acceptable trade.?off'                     # F6
prose | grep -E  '\bI (built|added|wrote|refactored|implemented|fixed)\b'                         # F7
prose | grep -Ei 'our (version|build)|the candidate|localhost|/Users/'                            # F10: prose fields only
awk -F'\t' '{id=($3 ~ /^dup:/)?substr($3,5):$2} $3=="closed"{shut[id]=1}
            $3!="closed" && !seen[id,$1]++ {n[id]++}
            END{for(i in n) if(n[i]>=3 && !shut[i]) print n[i], i}' "$RUN"/gaps.tsv               # F2
jq -r 'select(.choice!=null)|.choice' "${J[@]}" | sort | uniq -c                                   # F11: near even across rounds
jq -s -e 'all(.[]; .choice|IN("A","B","indistinguishable",null))' "${J[@]}"                       # F5: schema, all records
jq -r 'select(.choice!=null and .blocker!=null) | input_filename' "${J[@]}"                       # F5: expect empty
jq -r 'select([paths(type=="number")]|length>0) | input_filename' "${J[@]}"                        # F8: expect empty
jq -r .blind_integrity "${J[@]}" | grep -c compromised                                            # F10: expect 0
jq -r 'select(.choice!=null)|.observations|length' "${J[@]}"                                       # F12: expect flat
ls "$RUN"/probes | wc -l                                                                          # F17: never decreases
(cd "$RUN" && shasum -a 256 bar/* | diff - bar.sha256)                                            # F3: C3.4's pinned form
awk -F'\t' '{if (p && $3 > 2*p) print "BREACH r"$1; p=$3}' "$RUN"/spend.tsv                       # F21
[ "$N" -gt 1 ] && git diff --shortstat "gauntlet-r$((N-1))..gauntlet-r$N"                         # F20: guard, or r1 errors
```

`jq -s -e 'all(…)'` rather than a bare `jq -e` per file: `-e` takes its exit status from the *last* output, so an invalid choice in
round 1 exits 0 whenever round 5 is valid. The `N -gt 1` guard is C3.7's — nothing tags `gauntlet-r0`. F9 and F22 are absent from this
block on purpose: F9 needs `plan.md`'s `DEFECT_CLASS:` and runs as the intersection in its own entry, never as the lexical grep that
flags correct `viewed` verdicts; F22 reads the harness run record, not the run directory. A `jq` line that errors instead of printing
means the record was never written — a stopped round. A silent all-clear from checks that matched nothing is what this page prevents.
