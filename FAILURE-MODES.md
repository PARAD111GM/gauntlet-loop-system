# FAILURE-MODES — the anti-pattern catalogue

Read the triage table first if a run is live. `VIOLATES` cites `DOCTRINE.md`'s five invariants: **I1** external bar, **I2** delegated
decomposition, **I3** separation of powers, **I4** blind forced choice, **I5** quality-gated termination.

**This page owns no contract.** Where a signal touches a schema field, a stop clause, a run path, a budget figure or a modality
capability, `CONTRACTS.md` C1–C5 is the definition and this page only consumes it. Four statements are contract-assigned here and match
it exactly: F1's alternation, F2's `gap_id` count over `gaps.tsv` col 3 (C3.2), F9's gate (C1.12), F15's `plan.md` lines (C3.2).

**What the signals read.** The round-close agent writes `r<N>-<part>-j<NN>-verdict.json` — the validated return, copied verbatim, the
authority — plus its flattened `.md` twin and the four-line footer (C1.9, C1.10). Prefer the `jq` form wherever one is given; lexical
greps run only where prose survives (`largest_gap.*`, `compromised_how`, `NOTES`, the `.md` body). **Provenance greps read prose fields
only (C1.11):** `probe_step` and `probes_run` carry absolute arena paths by contract, so a `/Users/` pattern over a whole record
condemns correct output. `MODEL:` comes from the spawn call, never the judge, which is what makes F22 greppable; the A/B mapping lives
in `.sides`, outside every arena and in nothing a critic reads. Commands below assume `RUN=.gauntlet/current`, `N` = the round closed.

---

## A. Bar failures

### F1 — SOFT BAR
- **SYMPTOM:** Round 1 comes back a candidate win, and the verdict praises the work in its own terms.
- **WHY IT HAPPENS:** The bar is an adjective ("production quality", "AAA"), and an adjective is satisfied by whatever the builder made.
- **DETECTION SIGNAL:** trailing noun optional, so bare `AAA` fires:
  ```bash
  grep -nEi '\b(AAA|triple.?a|best.in.class|enterprise.grade|state.of.the.art)\b|\b(high|professional|production|world.?class|top.?tier|premium|polished)\b([ -](quality|grade|standard|level))?' "$RUN"/launch-prompt.md
  ```
  `high` and `production` are ordinary words, so a hit is a read, not a verdict. The gate is the 60-second test: does the bar resolve to
  a URL, path, or product+version a critic can open without asking a human? Zero hits across all six shipped emissions.
- **MITIGATION:** One named artifact from `BARS.md` instead. A bar is valid only if the critic can put it beside the candidate in the
  same modality (C5).
- **VIOLATES:** I1, and I4 downstream (no second artifact means no pairwise choice).

### F2 — BAR OUT OF REACH (loop thrash)
- **SYMPTOM:** Five rounds, five losses, the same largest gap three rounds running. Diffs are large and directionless.
- **WHY IT HAPPENS:** The gap is so large that every round's feedback is "everything", so the builder re-lotteries the artifact instead
  of closing one gap. The bar supplies a wall, not a gradient.
- **DETECTION SIGNAL:** Repetition counted on identity, not bytes — fresh critics per round (F12) never phrase a defect identically
  twice, so string counting finds nothing. The round-close agent stamps a stable `gap_id` per distinct gap and dedups semantically as
  it routes `largest_gap.gap` to the builder (C2.1); a repeat is written `dup:<gap_id>`. Resolve dups back and count:
  ```bash
  awk -F'\t' '{id = ($4 ~ /^dup:/) ? substr($4,5) : $3; n[id]++} END {for (i in n) if (n[i] >= 3) print n[i], i}' "$RUN"/gaps.tsv
  ```
  Any id printed is thrash. Corroborate with `git diff --shortstat gauntlet-r3..gauntlet-r4` over ~500 lines: large diff, unmoved gap.
- **MITIGATION:** Keep the final bar; insert a *staircase*. Name an intermediate artifact beatable this round and re-point the critic
  at it, the final bar still stated as the terminal gate. Lowering the final bar is F1.
- **VIOLATES:** I5 (termination becomes unreachable, so the operator ends the run arbitrarily).

### F3 — BAR DRIFT
- **SYMPTOM:** Round 6's critic complains about a bar property nobody mentioned in rounds 1–5, or an earlier result stops reproducing.
- **WHY IT HAPPENS:** The bar was a URL, re-fetched each round. Pages change, A/B variants differ, video re-encodes, models update.
- **DETECTION SIGNAL:** `(cd "$RUN" && shasum -a 256 bar/* | diff - bar.sha256)` is non-empty. Use C3.7's cwd-pinned form and no
  other: `shasum` embeds the path as given, so a relative/absolute mismatch reports drift on an unchanged bar. No `bar.sha256` means
  you already have F3 and cannot prove otherwise.
- **MITIGATION:** Snapshot once before round 1 and hash it (C3.7). Critics read only the snapshot. Refreshing the bar is a new run-id.
- **VIOLATES:** I1, I4.

### F4 — OVERFITTING TO THE BAR (surface mimicry)
- **SYMPTOM:** The candidate wins the blind comparison and is useless — the bar's palette, layout, phrasing or level geometry, with no
  working interior.
- **WHY IT HAPPENS:** Surface is the cheapest way to move a visual or stylistic comparison. If the probe is a still or an excerpt,
  mimicry is optimal play.
- **DETECTION SIGNAL:** (a) **Token lift**, run by the round-close agent, never a critic — a critic cannot grep for "the bar's strings"
  without being told which side is the bar (C5.9):
  ```bash
  grep -rhoE '#[0-9a-fA-F]{6}' "$RUN"/bar | tr 'A-F' 'a-f' | sort -u > /tmp/bar.hex
  grep -rhoE '#[0-9a-fA-F]{6}' ./src    | tr 'A-F' 'a-f' | sort -u | comm -12 - /tmp/bar.hex
  ```
  Greys collide by chance; more than two non-trivial shared tokens is a lift. Repeat for font stacks, class names, literal strings.
  (b) **Novel-region split:** the orchestrator registers `<part>-novel`, a surface the snapshot lacks, judged as a normal part (C5.9).
  Then `jq -r '[input_filename,.choice]|@tsv' "$RUN"/r$N-*-verdict.json` against `.sides`: winning the registered probe and losing the
  novel region is surface.
- **MITIGATION:** Every round, one probe must be function-only and bar-blind: a contract test, an input trace, an independent-reader
  task (`INSPECTION.md`). Mimicry cannot pass a probe that never shows the bar.
- **VIOLATES:** I1 (the bar becomes a texture to copy, not a standard to meet).

---

## B. Judgment failures

### F5 — VERDICT LAUNDERING
- **SYMPTOM:** A clearing verdict whose own text names the reason it should have failed. In prose, `PASS (with minor caveats)`: the
  orchestrator advances on the clear and never reads the caveat.
- **WHY IT HAPPENS:** Models dislike a bare negative after a builder has visibly worked. A hedged pass discharges both pressures.
- **DETECTION SIGNAL:** C1 closed the prose channel — no pass/fail field and no hedged enum value exists anywhere in the system
  (C1.8) — so hunt the residue: a decided `choice` in the same record as a named blocker. `blocker` is required only when `choice` is
  null (C1.4), so a populated blocker beside a decided choice is a critic that found a stopper and picked anyway.
  ```bash
  jq -r 'select(.choice != null and .blocker != null) | [input_filename,.choice,.blocker] | @tsv' "$RUN"/r*-verdict.json
  ```
  Prose residue, hint only: `grep -nEi 'caveat|nit|reserv|aside from'` over `NOTES` and `GAP` in a record whose `CHOICE:` cleared.
- **MITIGATION:** `choice` admits the C1 enum values and no modifiers. `null` is a real path, not a hedge: an unprobeable artifact
  loses and the blocker is named. Caveats live in `NOTES`, never read as a gate. A failed validation is re-judged fresh, not repaired.
- **VIOLATES:** I4, I5.

### F6 — CRITIC CAPTURE
- **SYMPTOM:** The verdict adopts the builder's vocabulary and defends its choices: "intentional", "acceptable tradeoff", "by design".
- **WHY IT HAPPENS:** The critic was handed the builder's rationale, summary or PR body. Given a justification, a model's cheapest
  coherent output is to accept it.
- **DETECTION SIGNAL:** `grep -nEi 'as the builder|per the (design|implementation) (note|rationale)|by design|intentional(ly)?|acceptable trade.?off|understandable given' "$RUN"/r*-verdict.md`.
- **MITIGATION:** The critic's input is the artifact, the bar snapshot and the probe outputs, nothing else, enforced at the spawn
  boundary (`ROLES.md` `critic-seal.sh`) — never by asking a critic to ignore its input.
- **VIOLATES:** I3, I4.

### F7 — SELF-GRADING LEAKAGE
- **SYMPTOM:** Scores rise every round, nothing improves. This is the run that went 27 → 43 on its own rubric, real bugs untouched.
- **WHY IT HAPPENS:** The same context built and judged. Even under "now act as a harsh critic", the judging turn inherits the building
  turn's beliefs about what the artifact does.
- **DETECTION SIGNAL:** `grep -nE '\bI (built|added|wrote|refactored|implemented|fixed|chose)\b' "$RUN"/r*-verdict.md` — first-person
  build language in a verdict is proof. Structural check: the critic shares a spawn call or a transcript with the builder.
- **MITIGATION:** Critics are separately spawned agents with zero conversational ancestry to the builder: one `agent()` call each,
  inputs as file paths. Cannot name the fresh spawn, no critic.
- **VIOLATES:** I3.

### F8 — RUBRIC INFLATION
- **SYMPTOM:** "Round 4: 91/100." Round 1 was 62. The artifact is recognisably the same.
- **WHY IT HAPPENS:** A self-authored rubric has no external anchor, so the number drifts toward what the scorer expects a diligent
  effort to deserve. Effort inflates the score; quality need not.
- **DETECTION SIGNAL:** Structural, because C1.5 admits no score, rating, total or rubric field at any depth — which is why the old
  score-delta signal could never fire and is retired. Any numeric path outside `recipe_class.n` is F8:
  ```bash
  jq -r 'select([paths(type=="number")] - [["recipe_class","n"]] | length > 0) | input_filename' "$RUN"/r*-verdict.json
  ```
  Non-empty is a reject. Verified: a C1-conformant verdict prints only `["recipe_class","n"]`; a smuggled `score: 87` prints too.
  Measurements that legitimately carry numbers live in `budget_checks` as strings with a boolean `pass`, so they cost this nothing.
- **MITIGATION:** Numbers are diagnostics, never gates. The only gate is the forced pairwise choice against the bar snapshot.
- **VIOLATES:** I4.

### F9 — MODALITY MISMATCH
- **SYMPTOM:** The critic declares the artifact excellent. You open it and hit a bug in ten seconds.
- **WHY IT HAPPENS:** The probe cannot observe the property being judged. A screenshot cannot see a behavioural bug, a stutter, a race,
  a wrong total, or a broken back button.
- **DETECTION SIGNAL:** One gate, the structural one (C1.12) — an image-derived recipe judging a defect class images cannot show:
  ```bash
  jq -r 'select(.recipe_class.n | IN(1,4)) | [.dimension, input_filename] | @tsv' "$RUN"/r*-verdict.json | sort -u
  grep -B4 -E '^DEFECT_CLASS: *(behavioural|timing|correctness)' "$RUN"/plan.md   # the part block each one belongs to
  ```
  A dimension in both lists is F9. The lexical `screenshot|\.png` grep is a **hint only, never an audit line**: recipe 1 is the correct
  modality for a static-visual dimension, so a correct `viewed_at_target_sizes` verdict fires it. `jq '.probes_run|length'` of 1 is a
  second hint on any dimension.
- **MITIGATION:** Match probe to claim inside what C5 grants. Behaviour → scripted interaction with a per-step assertion. Performance →
  n ≥ 30 in one session, p50/p95 cold and warm; no load tool exists, so sustained concurrency is a budget check or a human gate. Prose
  → an independent reader that never saw the intent plus the cadence script, never read-aloud, which no agent can do (C5.7). API →
  contract calls. Data → recomputation from the spec on a frozen input set. Audio → transcript, turn-timing marks and tool-call trace,
  `parity: "proxy-biased"` and a `human_gate` (C5.4). One non-image probe minimum.
- **VIOLATES:** I1 (the bar is not actually being compared), I4.

### F10 — IDENTITY LEAK (blindness broken)
- **SYMPTOM:** The verdict's reasoning says "our version", "the candidate", "the ThreeJS build". Candidate pick rate is suspiciously
  high or suspiciously low.
- **WHY IT HAPPENS:** The two artifacts were distinguishable — file names, repo paths, watermarks, resolution, a dev-server URL, a git
  header, a style tell. Blindness was nominal.
- **DETECTION SIGNAL:** prose fields only (C1.11), plus any `blind_integrity: compromised`:
  ```bash
  jq -r '[input_filename,.largest_gap.gap,.largest_gap.evidence,.largest_gap.why_it_dominates,.compromised_how]|@tsv' "$RUN"/r*-verdict.json \
    | grep -nEi 'our (version|build|implementation)|the candidate|localhost|127\.0\.0\.1|/Users/|\bbranch\b'
  ```
  **Never run `/Users/` over a whole record** — a compliant `probe_step` is an absolute arena path, so that grep stops healthy rounds.
  Pre-flight is `ROLES.md`'s `critic-seal.sh`, scoped to the diffable surface per C3.8: lockfiles, source maps and build output all
  contain `/Users/` in any real tree.
- **MITIGATION:** The arena agent — no other role — copies both artifacts into the arena as `A` and `B`, strips provenance (VCS
  metadata, docs, comments, EXIF, bar-naming filenames), normalises mtimes, and records the side in `.sides` (C1.10). Only the
  round-close agent joins a `CHOICE` to a side.
- **VIOLATES:** I4.

### F11 — POSITION BIAS
- **SYMPTOM:** The critic picks the second artifact almost every round, regardless of content.
- **WHY IT HAPPENS:** Recency. The artifact described last is more available when the choice is made.
- **DETECTION SIGNAL:** Sides flip by round, so bias is a preference for a *letter* while the side moves under it:
  `jq -r .choice "$RUN"/r*-verdict.json | sort | uniq -c` sits near 50/50 across ≥6 rounds in a healthy run, and 6/6 one way is bias.
  Within a single round a lopsided split is expected — one arena carries one side for the whole panel — so never read one round's tally
  as bias. Second signal, on the **raw critic return before the round-close agent copies it**: `jq 'has("order_swap")'` → `true` means
  the critic has seen its twin (C1.3). Discard and re-judge.
- **MITIGATION:** Sides are derived per arena, never drawn (C2). On a round that could terminate, the orchestrator runs the swapped
  twin as a second fresh critic and sets `order_swap` on the joined pair; `flipped` is a FAIL for the candidate, not a tie. That swap
  is a blindness check on one judgment and **not a stopping rule** — two judgments is p = 0.25 against a coin (C2.6).
- **VIOLATES:** I4.

### F12 — CRITIC DRIFT AND FATIGUE
- **SYMPTOM:** Round 1's verdict is 900 words of located defects. Round 7's is "looks good, minor spacing issues". Complaint
  categories rotate without any being resolved.
- **WHY IT HAPPENS:** A critic carried across rounds accumulates the artifact's history and grades the delta instead of the gap to the
  bar. Long context also compresses.
- **DETECTION SIGNAL:** `jq -r '.observations|length' "$RUN"/r*-verdict.json` — a falling count across ≥3 rounds is fatigue. Second
  signal: round N's probes share nothing with N−1's and no part cleared.
- **MITIGATION:** A fresh critic per round, identical instructions, no round history. Continuity lives in the frozen probe set (F17).
- **VIOLATES:** I3, I4.

### F13 — UNACTIONABLE VERDICT
- **SYMPTOM:** A loss for "lacks polish", "feels less premium", "needs more depth". Next round is a guess.
- **WHY IT HAPPENS:** The probe produced impressions, not observations, so the verdict has nothing to point at. Direct cause of most F2.
- **DETECTION SIGNAL:** Locator ratio — observations carrying a `file:line`, timestamp, timing number, status code or quoted string,
  over the observation *count*. `@json` forces one line per observation; without it a console excerpt with a newline inflates the
  denominator and the ratio lies. With `V="$RUN"/r$N-<part>-j01-verdict.json`:
  ```bash
  jq -r '.observations[].observed|@json' "$V" | grep -cE '[a-z0-9_]+\.[a-z]+:[0-9]+|[0-9]+:[0-9]{2}|[0-9]+ ?(ms|fps)|\\"|#[0-9a-fA-F]{6}|\b[45][0-9]{2}\b'; jq '.observations|length' "$V"
  ```
  State your floor before round 1; 0.8 is a convention, not a constant.
- **MITIGATION:** Every finding carries a locator and the probe output that produced it (C1's `observations[]`). Findings without a
  locator are dropped before the builder sees them.
- **VIOLATES:** I4, I5.

### F14 — ARBITER RUBBER-STAMP
- **SYMPTOM:** The arbiter exists, and has never once disagreed with the critic.
- **WHY IT HAPPENS:** It was given the critic's verdict as its primary input, so its cheapest coherent output is ratification.
- **DETECTION SIGNAL:** Agreement rate 100% over ≥4 rounds. The round-close agent appends one
  `round<TAB>critic_choice<TAB>arbiter_choice` row per arbitration to `"$RUN"/arbiter-log.tsv` (C3.2); check with
  `awk -F'\t' '{n++; if ($2==$3) a++} END {print a"/"n}' "$RUN"/arbiter-log.tsv`.
- **MITIGATION:** Call the arbiter only on disagreement between two independent critics, and give it both artifacts plus both verdicts
  *without* which critic said what. With one critic, delete it: cost, no signal.
- **VIOLATES:** I3.

---

## C. Decomposition failures

### F15 — NON-JUDGEABLE PARTS
- **SYMPTOM:** Part verdicts read "cannot evaluate in isolation", or "assuming the rest works, correct".
- **WHY IT HAPPENS:** The goal was split along implementation seams (files, layers, modules) instead of where an *inspectable
  artifact* exists. A part with no observable output cannot be gated.
- **DETECTION SIGNAL:** Every part in `plan.md` carries one `ARTIFACT:`, one `EVIDENCE:` and one `DEFECT_CLASS:` line, all fillable
  now (C3.2). All three counts equal the part count:
  ```bash
  for k in ARTIFACT EVIDENCE DEFECT_CLASS; do printf '%s\t%s\n' "$k" "$(grep -c "^$k:" "$RUN"/plan.md)"; done
  ```
  A part whose evidence needs another in-flight part is not independent. A missing `DEFECT_CLASS:` silently disables F9's gate.
- **MITIGATION:** Re-split. Every part owns one artifact and one probe that runs today, even if that means a stub harness. Keep the
  split delegated: reject the plan, do not author it.
- **VIOLATES:** I2 (rejecting a bad split is fine; writing the split yourself is not), I4.

### F16 — INTEGRATION ROT
- **SYMPTOM:** Every part looks clear. The whole is incoherent — mismatched tone, three navigation patterns, a UI that contradicts its
  own data.
- **WHY IT HAPPENS:** Coherence is a property of the whole and is owned by no part. Local optima compose into a global mess, and no
  probe ever looked at the assembled artifact.
- **DETECTION SIGNAL:** every part advisory-cleared while the whole-artifact panel goes to the bar —
  `jq -r '[input_filename,.choice]|@tsv' "$RUN"/r$N-whole-j*-verdict.json` against `.sides`. Do not call it a rate on a handful of
  judgments: the floors that make a rate mean anything are C2's, and only C2's panels decide anything.
- **MITIGATION:** The gate is always the whole artifact against the bar. A part is *advisory-cleared* when its panel finds no fresh
  gap; parts never terminate anything (C2.5). Budget every wave's last round to a whole-artifact judgement by fresh critics.
- **VIOLATES:** I1, I4, I5.

### F17 — REGRESSION BLINDNESS
- **SYMPTOM:** Round 6 fixes the critic's complaint and breaks something that passed in round 3. Nobody notices for three rounds.
- **WHY IT HAPPENS:** Each round's critic probes only what this round's verdict is about. Passed areas leave no artefact behind.
- **DETECTION SIGNAL:** Every probe that ever passed stays in `"$RUN"/probes/` and re-runs every round, so `ls "$RUN"/probes | wc -l`
  is monotonically non-decreasing. Fewer probes than round N−1 means blind.
- **MITIGATION:** Frozen probe set, re-run every round, plus this round's new probes. A regression in a frozen probe fires C2's first
  clause — see F20; it is a veto, not a fourth stop rule, and this page states no other consequence for it. Side-effectful probes
  replay round-0 fixtures (C5.5), because a probe that dials a real number dials it every round.
- **VIOLATES:** I5.

### F18 — PREMATURE PARALLELISM
- **SYMPTOM:** Eight builders at once; six spend the round waiting on, guessing at, or reinventing a shared interface. Merge is a
  rewrite.
- **WHY IT HAPPENS:** Fan-out was treated as a throughput knob rather than a dependency question. Parallelism pays only once the
  contracts between parts are frozen files.
- **DETECTION SIGNAL:** Before fan-out, every shared type, schema or interface exists as a committed file:
  `git log --oneline -1 -- src/types src/contracts` predates the fan-out commit. After: `git diff --name-only` overlap between any two
  builders' branches on a non-generated file.
- **MITIGATION:** Serial round 0 produces the interface files and one thin end-to-end slice. Only then `parallel()`, and only over
  parts touching disjoint file sets. Cap concurrency under the harness limit.
- **VIOLATES:** I2 (the operator ends up authoring the interfaces under merge pressure).

### F19 — ORPHANED WORK
- **SYMPTOM:** Two branches each hold a working, incompatible version of the same foundation. One is thrown away, with everything on it.
- **WHY IT HAPPENS:** Parallel builders in isolated worktrees each hit the same missing primitive and each built it. No one owned it.
- **DETECTION SIGNAL:** The same exported symbol defined in two worktrees. Take paths from the harness, not a glob — worktrees are
  siblings, not children — and compare *identifiers*, not whole lines, since two builders write one primitive differently:
  ```bash
  git worktree list --porcelain | awk '/^worktree /{print $2"/src"}' \
    | xargs grep -rhoE '^export (function|const|class|type) [A-Za-z0-9_]+' \
    | awk '{print $NF}' | sort | uniq -d      # any name printed is orphaned work in flight
  ```
- **MITIGATION:** Assign single ownership for every shared primitive before fan-out, name the owner in the plan, non-owners import or
  stub. Integrate on a per-wave train branch, not N serial merges.
- **VIOLATES:** I2.

---

## D. Loop and operational failures

### F20 — NON-TERMINATION / INFINITE POLISH
- **SYMPTOM:** Round 11. Diffs are twenty lines of copy tweaks, verdicts have become taste notes, nothing is getting better or worse.
- **WHY IT HAPPENS:** "Until perfect" has no fixed point, and a critic asked for gaps will always find one. With no stop condition tied
  to *change*, the loop converges to noise.
- **DETECTION SIGNAL:** A sub-noise integrated diff for two consecutive rounds while the blind choice does not flip, plus a collapsing
  locator ratio (F13). Both **corroborate**; neither decides.
- **MITIGATION:** **The honest headline: the normal exit is marginal-gain collapse — the panel can no longer demonstrate that this
  round beat the last one, and the best gain still available is not worth paying for. Bar crossing is real and rare by design. Budget
  exhaustion is an *abort*, and is reported with that word.** The rule itself is **C2**: one rule, evaluated once at round close, in
  the Workflow script, which is the only thing in the system holding termination authority (C1.10). This page prints no clause, no
  panel floor and no threshold — read C2. Two shortcuts that do not exist: judging twice with sides swapped and stopping (C2.6; that
  swap is F11's blindness check), and any `GAIN` table, which no file implements. No counter, stall trigger or
  `rounds_without_gap_movement` threshold belongs in a role prompt (C2.4). On any stop, report the standing gaps.
- **VIOLATES:** I5.

### F21 — COST BLOWOUT
- **SYMPTOM:** The operator kills the run. Not because it was done, but because of spend.
- **WHY IT HAPPENS:** Cost per round grows — context accumulates, fan-out widens, whole-artifact probes get rerun by every part — and
  no ceiling was declared, so nothing pushed back.
- **DETECTION SIGNAL:** The harness answers "what did round 5 cost?" with no ledger of yours: resolve the run record `$R` per
  `OPERATIONS.md` §6, then `jq '{agents:.agentCount, tokens:.totalTokens, minutes:(.durationMs/60000|floor)}' "$R"`, with the
  per-agent `workflowProgress` rows for the breakdown (filter `.state=="done"` before trusting `.tokens`). Growth shows only rolled up
  per round, so the round-close agent — not the script, which has no filesystem (C3.6) — appends one row in C3.5's columns:
  ```bash
  A=$(jq '[.workflowProgress[]|select(.type=="workflow_agent")]|length' "$R")
  T=$(jq '[.workflowProgress[]|select(.type=="workflow_agent")|.tokens // 0]|add' "$R")
  printf '%s\t%s\t%s\n' "$N" "$A" "$T" >> "$RUN"/spend.tsv        # C3.5: column 3 is TOKENS
  ```
  Seconds in column 3 leave the BREACH check below running but unable to fire. Superlinear growth over three rounds is the signal.
- **MITIGATION:** Declare both ceilings before round 1 and take the numbers from **C4**, which derives them from one chosen round
  count; never invent either here. Route volume roles to cheaper models, keep the strongest for judges. On breach, stop, say *abort*,
  record the resume handle. Never cheapen a critic.
- **VIOLATES:** I5 in practice: budget, not quality, ends the run.

### F22 — MODEL DOWNGRADE ON RESUME
- **SYMPTOM:** A resumed run's verdicts get shallower for no visible reason. Monday's rigour is gone.
- **WHY IT HAPPENS:** Resuming an agent reverts it to the session default model; model set after spawn does not stick. This has
  silently wrecked real runs.
- **DETECTION SIGNAL:** `grep -h '^MODEL:' "$RUN"/r*-verdict.md | sort | uniq -c` returns more than one id, or the F12
  observation-count drop lands on the resume boundary. Neither fires before the damage, which is why F22 is prevented, not detected:
  no critic is ever resumed.
- **MITIGATION:** Never resume a critic. Set `model` at spawn on every judging agent even when it equals today's default
  (`OPERATIONS.md` §2), fresh per round; the footer's `MODEL:` line is written from that spawn call (C1.9), which gives the grep input.
- **VIOLATES:** I3 (the judge silently changes mid-contest), I4.

### F23 — BUILDER FALSE COMPLIANCE
- **SYMPTOM:** The builder reports "built on the design system", "fully typed", "all tests passing". None of it is true. This has
  happened; only grepping the imports revealed it.
- **WHY IT HAPPENS:** Summaries are generated from intent, not from the artifact. A builder that meant to comply reports compliance.
- **DETECTION SIGNAL:** For each compliance claim, one command that would fail if the claim were false — and run it. "Design system" →
  `grep -rL '@/components/ui' src/**/*.tsx`. "Tests pass" → the exit code, not the transcript. "Typed" → `npx tsc --noEmit; echo $?`.
- **MITIGATION:** Critics never read builder summaries (also the F6 fix), and never ask a builder to justify a decision — that is F6
  run as a probe, which is why C5.9 removes the why-test from the critic and leaves it as the round-close agent's compliance greps over
  source. Every claim in the round report is paired with a command and its captured output; unpaired claims are struck before judgement.
- **VIOLATES:** I3, I4.

---

## TRIAGE TABLE — live run, ten seconds

| Loop is doing this | You have | Do this now |
|---|---|---|
| Candidate wins round 1 outright | F1 soft bar | Kill it. Name a real artifact from `BARS.md`, restart. |
| Decided choice in a record that names a blocker | F5 laundering | Reject it. Re-judge under C1's enum; caveats to `NOTES`. |
| Same `gap_id` 3+ rounds in `gaps.tsv` | F2 bar out of reach | Insert a beatable intermediate bar; keep the final one. |
| Builder reports "tests pass" / "on the design system" | F23 false compliance | Run the command, read the exit code. Strike unpaired claims. |
| A number anywhere outside `recipe_class.n` | F8 rubric inflation / F7 self-grading | Delete it. Gate only on the blind pairwise choice. |
| Verdict says "intentional", "by design" | F6 critic capture | Cut the builder's rationale from the critic's inputs. |
| Verdict says "I added…" | F7 self-grading leakage | Spawn a genuinely separate critic. Discard the verdict. |
| "our version" / "localhost" in a prose field | F10 identity leak | Re-stage the arena, re-derive the side, re-judge. |
| A critic return carrying `order_swap` | F10 / F11, blindness gone | `blind_integrity` is false (C1.3). Discard and re-judge fresh. |
| Same letter picked 6/6 across rounds | F11 position bias | Re-judge the swapped arena with a fresh critic; a flip is a FAIL. |
| Verdicts shrinking round over round | F12 critic drift | Fresh critic per round, identical prompt, no history. |
| Verdicts shrank right after a resume | F22 model downgrade | Re-spawn with the model set at spawn. Never resume critics. |
| Loss with no file/line/timestamp | F13 unactionable | Require a locator per finding; drop the rest. |
| Arbiter has never disagreed | F14 rubber-stamp | Two blind critics; arbiter only on disagreement. |
| Praise, then you find a bug in 10s | F9 modality mismatch | Add a probe C5 grants for that defect class. Re-judge. |
| Wins the comparison, looks derivative | F4 surface mimicry | Add one bar-blind function-only probe; register `<part>-novel`. |
| "Cannot evaluate in isolation" | F15 non-judgeable parts | Re-split so each part has an artifact + probe today. |
| All parts clear, whole is incoherent | F16 integration rot | Gate on the whole artifact; parts are advisory (C2.5). |
| Old passing behaviour broke | F17 regression blindness | Re-run the frozen probe set. The regression is C2's veto (F20). |
| Builders blocked on each other | F18 premature parallelism | Serialise until interface files are committed. |
| Two branches, same primitive twice | F19 orphaned work | One owner per primitive; integrate on a train branch. |
| Round 10, 20-line diffs | F20 infinite polish | Evaluate C2 once, at round close. Report convergence with standing gaps. |
| Someone wants to stop on 2 winning judgments | F20 illegitimate stop | Refuse. Two judgments is p = 0.25 against a coin; floors are C2's. |
| Cost climbing | F21 cost blowout | Roll the run record up per round. Enforce the C4 ceilings; never cheapen critics. |
| Bar behaves differently than before | F3 bar drift | Restore the hashed snapshot. Re-fetching starts a new run. |

## Round-close audit

Run at every round boundary, after the record is written. Any hit stops the round. C1.4's own audit line — blocked verdicts missing a
blocker, `proxy-biased` or `independent_reader` verdicts missing a `human_gate` — runs first, before any verdict is copied; non-empty
output there is a reject.

```bash
RUN=.gauntlet/current            # or the run dir you are auditing
N=${N:?round number required}    # the round just closed; the F20 diff needs it
V=("$RUN"/r*-verdict.md); J=("$RUN"/r*-verdict.json)

grep -nEi 'as the builder|by design|intentional|acceptable trade.?off' "${V[@]}"    # F6
grep -nE  '\bI (built|added|wrote|refactored|implemented|fixed)\b' "${V[@]}"        # F7
jq -r '[input_filename,.largest_gap.gap,.largest_gap.evidence,.largest_gap.why_it_dominates,.compromised_how]|@tsv' "${J[@]}" \
  | grep -nEi 'our (version|build)|the candidate|localhost|/Users/'                 # F10: prose fields only
awk -F'\t' '{id=($4 ~ /^dup:/)?substr($4,5):$3; n[id]++} END{for(i in n) if(n[i]>=3) print n[i],i}' "$RUN"/gaps.tsv   # F2
jq -r    .choice "${J[@]}" | sort | uniq -c                                        # F11: ~50/50 across rounds
jq -s -e 'all(.[]; .choice|IN("A","B","indistinguishable",null))' "${J[@]}"        # F5: schema, all records
jq -r    'select(.choice!=null and .blocker!=null) | input_filename' "${J[@]}"     # F5: expect empty
jq -r    'select([paths(type=="number")]-[["recipe_class","n"]]|length>0) | input_filename' "${J[@]}"   # F8
jq -r    '.blind_integrity' "${J[@]}" | grep -c compromised                        # F10: expect 0
jq -r    '.observations|length' "${J[@]}"                                          # F12: expect flat
grep -h  '^MODEL:' "${V[@]}" | sort | uniq -c                                      # F22: expect one id
ls "$RUN"/probes | wc -l                                                           # F17: never decreases
(cd "$RUN" && shasum -a 256 bar/* | diff - bar.sha256)                             # F3: C3.7's pinned form
awk -F'\t' '{if (p && $3 > 2*p) print "BREACH r"$1; p=$3}' "$RUN"/spend.tsv        # F21
[ "$N" -gt 1 ] && git diff --shortstat "gauntlet-r$((N-1))..gauntlet-r$N"          # F20: guard, or r0 errors
```

`jq -s -e 'all(…)'` rather than a bare `jq -e` per file: `-e` takes its exit status from the *last* output, so an invalid choice in
round 1 exits 0 whenever round 5 is valid. The `N -gt 1` guard exists because nothing tags `gauntlet-r0` unless the round-0 unassisted
pass was tagged (C3.9), and an unguarded diff errors on every healthy round 1. F9's gate is deliberately absent: it needs `plan.md`'s
`DEFECT_CLASS:` and runs as the two-command intersection above, never as the lexical grep, which flags correct static-visual verdicts.
If a `jq` line errors instead of printing, the record was never written — a stopped round. A silent all-clear from checks that matched
nothing is what this page exists to prevent.
