# EXAMPLES — three worked runs

Condensed logs, in run order, so you can diff your own emission and your own verdicts against them.
`CONTRACTS.md` is the law for every field, threshold and path below: where a run reports one it cites the
clause instead of restating it. Probes: `INSPECTION.md`. Bars: `BARS.md`.

**What these are.** Worked runs, not transcripts. The four narratives are from real failures — the 27 → 43
rubric-inflation loop, the false "built on the design system" claim, the unblinded transcript panel, the
budget abort — and every panel count, Wilson band and total below was **computed** against the frozen
contracts, not remembered. Re-run C2.2's `band()` on any row; these numbers are meant to be checked.

| Run | Domain | Bar in the prompt | Rounds | C2 clause that fired | Honest final state |
|---|---|---|---|---|---|
| A | Browser 3D game (Three.js) | Left 4 Dead 2 | r0–r6 | **4** — marginal-gain collapse | Crossing panel best 3 of 10. Bar never crossed |
| B | Usage + billing settings UI | Stripe billing + Linear settings | r0–r4 | **5** — regression; rolled back to `gauntlet-r3` | Not a completion. Re-cut pending |
| C | HTTP API, no pixels | Stripe API v1, frozen transcripts | r0–r4 | **1** — **abort** on budget | p95 148ms vs 96ms, delta panel still live |

No run here crossed its bar and one is an abort. That is the expected shape (C2's headline), not three
failures: a file showing three crossings would advertise the exit that is rare by design.

## House rules all three runs ran under

1. **No stop rule reaches a model.** Not in a launch prompt, not in an emission header. The script
   evaluates C2 at round close; the operator sees the clauses once, in the `/gauntlet` gate, the one place
   a contract is reprinted verbatim. Run `DOCTRINE.md` invariant 5's grep — a number adjacent to *round*,
   *pass*, *iteration*, *attempt* — over any launch prompt below and it returns nothing. Over the headers
   it returns the `BUDGET:` line only, which invariant 5 permits by name as a cost backstop.
2. **Panels, `alpha` and `MIE` are C2's**, written into `run.json` before round 1 and never restated in a
   run log. Each round reports observed `k` of `n`, the band, and which clause fired.
3. **Part panels terminate nothing** (C2.5). They are advisory, they still drive every builder, and no run
   below ends on one. `indistinguishable` never counts as a win (C1.7); where it appears it is the signal
   to change modality, not to close anything.
4. **Verdicts are the C1 schema, unmodified.** No `order_swap` from a critic (C1.3: a critic that can write
   it has seen its twin), no numeric total anywhere (C1.5), `not_probed` an array whose every string ends
   in its covering recipe, `human_gate` wherever C1.4 requires it.
5. **Two mismatch checks, both mechanical.** Registered modality against returned `modality` is one string
   comparison; the audit that catches a still-image verdict on a behavioural dimension is C1.12's
   intersection of `recipe_class.n ∈ {1,4}` with the part's `plan.md` `DEFECT_CLASS:` — which is why every
   registry below carries a defect class.
6. **Bar frozen and hashed before round 1** with C3.7's cwd-pinned command, `bar/` flat, no re-fetch (F3).
   **Round 0 is the unassisted pass, tagged `gauntlet-r0`** (C3.9), so round 1's delta panel has a real
   comparand instead of the run guessing at its own baseline.

---

# RUN A — browser zombie-horde shooter

Repo `~/Code/zombie-fps`: the baseline prompt's home turf, carrying a failed visual-only loop. A
self-scored critic drove its own rubric **27 → 38 → 43** over three rounds while the horde AI stayed
broken, because every check was a still image.

> "Make the zombie game actually feel AAA instead of like a tech demo."

### 1. Bar interrogation

| Candidate | Co-inspectable? | Dominant at the judged property? | Verdict |
|---|---|---|---|
| Call of Duty: Modern Warfare III | No frame-matched capture obtainable; invites screenshot-only judging | Visuals only | **Rejected** |
| Three.js shooters on itch.io | Yes, trivially | No — peer level | Rejected: ratchets to "good for a web game" |
| Left 4 Dead 2 (Source, 2009) | Yes: owned install, capturable on this rig at 1080p60 and 240fps | Yes — the horde director is its defining system | **Chosen** |

**Why L4D2.** What makes this game bad is not texture resolution, it is that 40 zombies walk single file.
L4D2's reputation rests on the exact subsystem under repair, so the bar puts pressure where the defect is,
and it is capturable: a critic gets `bar/l4d2-horde-00.41.mp4` and a frametime trace, not vibes.

**Why not CoD.** Not because it is unreachable — unreachable is the engine. Because it is inspectable only
as pixels: naming it hands every critic a screenshot and reproduces 27 → 43 by round two. CoD stayed an
operator-side aspiration with no gate authority and appears nowhere in the emission.

```bash
RUN=/Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a
ls "$RUN"/bar/   # l4d2-horde-{00.41,01.12}.mp4  l4d2-hud-{1,2,3}.png  l4d2-frametime-40actives.json
(cd "$RUN" && shasum -a 256 bar/* > bar.sha256)   # C3.7, cwd-pinned. 6 files, first digest 4c8b1f0a9d33…
```

### 2. What the generator emitted

```text
BAR:      Left 4 Dead 2 (Source engine, 2009), horde encounters
ACCESS:   Steam install confirmed present this session; 1080p60 screen recording + 240fps phone
          capture of the same two encounters on this rig, written to $RUN/bar/ and hashed
MODALITY: behaviour under input — C5's real-time 3D row. The bar is footage, so frame times are
          budget checks, never A/B claims, and any behavioural claim against the bar is proxy-biased
HUMAN GATE: positional audio, and the horde's approach as seen in the two clips — $RUN/r<N>/evidence/
BUDGET:   +8.4M output tokens (7 rounds × C4.2's seed at P = 8); 203 agent-runs (7 × 29 per C4.3)
```

No `STOP:` line: termination is C2's, it lives in the script, and the gate prints it to the operator.

**Launch prompt, verbatim — 145 words by `wc -w`, cap per C4.1.** `{MODALITY PHRASE}` is `LAUNCH.md` §1
STEP 2b row 2, "game, tool, interaction, GUI agent", whose normative source is C5. The medium clause is
kept only because the repo is already Three.js.

```text
Build a browser zombie-horde shooter, at the level of Left 4 Dead 2. Not "good for an AI" — as
good as Left 4 Dead 2, judged the way it gets judged.

Fan out subagents and let them split the work however they see fit; each owns its piece until it
holds up. /loop on every piece.

Every piece gets checked by a separate fresh subagent that never saw it being built. That critic
actually drives it — plays it, clicks through it, tries to break it — for several minutes, the
running build, never a summary of it. Be a genuinely harsh critic.

Then put the two side by side, unlabelled, and make it pick. If it doesn't pick ours, say what
gave it away and keep going.

Don't stop until it picks ours over Left 4 Dead 2. Do this in Three.js. Ultracode.
```

Paragraphs 2 and 4 are byte-identical in all three emissions. Only the bar clause, the modality clause and
the closing line move between domains, which is what makes the generator's output diffable at all.

### 3. Orchestrator's decomposition

| Part | Modality | Recipe | DEFECT_CLASS | Probe |
|---|---|---|---|---|
| A1 trigger → visible consequence | `measured` | 4 | timing | 240fps capture both sides, whole-frame count |
| A2 horde approach vectors | `measured` | 4 | behavioural | matched frame sheets + candidate `window.__probe` |
| A3 hit feedback + damage model | `interacted` | 3 | behavioural | scripted input, `window.__probe` assertions |
| A4 lighting and mood | `viewed_at_target_sizes` | 1 | visual | matched-viewport pair, both sides as stills |
| A5 level readability | `executed` | 3 | behavioural | naive-agent traversal, 10 seeded routes |
| A6 frametime envelope, 40 actives | `measured` | 3 | timing | rAF sampler, two calls, accept only `n===600` |
| A7 positional audio mix | `measured` | 9 | other | `ebur128`/`astats`/`silencedetect`; audible half gated |
| A8 HUD legibility | `viewed_at_target_sizes` | 1 | visual | 1440×900 and 390×844 pair |

Three registrations are doing real work, and all three are C5 consequences.

- **A1 is a legitimate comparison; A6 is not.** Trigger-to-consequence latency is countable in frames, so
  it survives a footage bar. Frame *times* are not in footage, so A6 reports p50/p95/worst as
  `budget_checks` against a stated 16.7ms and never as a panel win (C5's 3D row).
- **A2 and A7 carry `parity: "proxy-biased"` and a `human_gate`** (C1.4): A2's behavioural property has no
  bar-side telemetry, and A7's audible half is not agent-decidable — the critic cannot hear and no ASR is
  installed (C5.4). Both count in the delta panel; neither can ever satisfy bar crossing.
- **Behaviour gets true parity only in the `delta` arena**, round N against N−1, where both sides are
  drivable and the live sampler runs on both. That is the panel Run A actually terminated on.

Builders ran in two worktrees to keep A2 and A4 from colliding; critics were Opus 5, fresh-spawned per
verdict with the model set at spawn, since a resumed agent reverts to the session default (F22).

### 4. Sample verdict — the FAIL that mattered

A2's part verdict, r2 re-judge, verbatim and complete. Advisory (C2.5), and still the verdict that bought
the r3 director rewrite. Note what C1 forces: the actual command in `probe_step` with absolute arena paths
(C1.11 exempts that field from F10's provenance grep for exactly this reason), candidate-only telemetry
demoted out of the choice into `budget_checks`, and no `order_swap`.

```json
{ "dimension": "horde threat under sustained contact", "modality": "measured",
  "recipe_class": {"n": 4, "name": "motion — frame reduction and tile sheet"}, "parity": "proxy-biased",
  "probes_run": [
    "ffmpeg -i /Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a/r2/arena/A/capture-240.mov -vf 'fps=8,scale=480:-1,tile=6x5' -frames:v 1 /Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a/r2/evidence/A-horde-sheet.png",
    "same command with arena/B and B-horde-sheet.png; then Read both sheets and count corridors sustained across >=3 consecutive tiles",
    "pane.read_console_messages onlyErrors:false after each 8s drive"],
  "observations": [
    {"artifact": "A",
     "probe_step": "Read /Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a/r2/evidence/A-horde-sheet.png",
     "observed": "1 approach corridor. 27 of the 30 tiles show the actives in a single-file column entering from the same doorway; no tile shows a second sustained direction"},
    {"artifact": "B",
     "probe_step": "Read /Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a/r2/evidence/B-horde-sheet.png",
     "observed": "3 corridors sustained across the sheet, two arriving through side geometry rather than the player's line of sight; no tile has more than 14 visible actives on one bearing"}],
  "choice": "B", "margin": "decisive",
  "largest_gap": {"artifact": "A",
    "gap": "Replace radial spawn with flow-distance spawn on at least 3 lanes, then re-probe bearing spread before touching animation.",
    "evidence": "one corridor in 27 of 30 tiles; candidate sampler puts 31 of 40 actives within 12 deg of one bearing at t=4.0s on all three seeds",
    "why_it_dominates": "One approach vector makes every fight solvable by backing into a corridor, so no amount of animation or lighting work changes the encounter."},
  "budget_checks": [
    {"metric": "distinct sustained approach bearings at 40 actives, window.__probe, seeds 1/2/3",
     "budget": ">= 3", "observed": "1 (spread 12.4 / 13.1 / 14.0 deg)", "pass": false}],
  "human_gate": "/Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a/r2/evidence/{A,B}-horde-sheet.png and both clips: watch whether the horde arrives from more than one direction and whether flanks read as intent. Frames carry no per-agent state, so the behavioural half of this comparison is not agent-decidable.",
  "not_probed": [
    "bar-side per-agent bearing telemetry, which footage cannot carry -> recipe 4",
    "melee contact behaviour -> recipe 2",
    "audio telegraphing of an approach -> recipe 9",
    "behaviour above 40 actives -> recipe 3"],
  "blind_integrity": "intact" }
```

```text
MODEL: claude-opus-5      ← the .md twin's footer: four lines, written at once by the round-close
CHOICE: B                    agent, SIDES copied from .sides column 3 (C1.9). Nothing anywhere
BLOCKER: -                   writes `bar` or `cand`, which names the side the blind is hiding.
SIDES: candidate=A
```

`choice: "B"` against `candidate=A` is the bar winning. To the builder goes `largest_gap.gap` and nothing
else — no observations, no side label, no sheet. C1.12's audit does flag this verdict, `recipe_class.n`
being 4 on a behavioural dimension, and the flag is already answered in the record by `proxy-biased` plus
the `human_gate`. That is the intended interaction: F9 fires, the parity field is the honest reason, and
the run never pretends the behavioural half was decided.

### 5. Rounds, and how it ended

`k_D` is the delta panel (`n_D = 9`, proxies kept), `k_V` the crossing panel (`n_V = 10`, proxies
excluded), each at the arena C2 names. Bands are C2.2's `band()`, computed not tabulated.

| R | What changed | Panels | State after |
|---|---|---|---|
| r0 | Bar acquisition, freeze, hash. One unassisted pass, tagged `gauntlet-r0`. | — | comparand exists |
| r1 | All 8 parts built. | `k_V` **0 of 10**. `k_D` 8 of 9 → `[0.565, 0.980] live` | round 1 is never dry; `dry = 0` |
| r2 | Recoil curve, muzzle flash, first spawn tweak, HUD type scale. | `k_D` 7 of 9 → `[0.453, 0.937] live`. A2 above. A1 44 → 31 frames at 240fps (183 → 129ms; bar 18 frames = 75ms). A8 advisory-clear | `dry = 0`. **Two verdicts voided, below** |
| r3 | Director rewrite: flow-distance spawn, 3 lanes, occlusion-aware pathing. A6 instanced meshes + pooled ragdolls. | `k_D` 6 of 9 → `[0.354, 0.879] live`. A2 corridors 1 → 3. A6 p95 26.4 → 15.1ms, a budget check that now passes | `dry = 0` |
| r4 | A2 flank commit timers; A3 hit-stop 60ms + directional damage vignette. | **VETO (clause 0):** `probes/horde-converge` passed in r3, fails now — commit timers deadlock two lanes at 40 actives. Round FAIL, no stop may be declared. `k_D` 4 of 9 → `live` | `open` gap row → not dry, `dry = 0` |
| r5 | Deadlock fixed, 22 lines changed, nothing else touched. | `k_D` 3 of 9 → `[0.121, 0.646] collapse`. No `open` gap row; diff 22 < 25 | **dry**: `dry = 1`, `pool = 3/9` |
| r6 | A5 sightline dressing on the two dead-end wings, 11 lines. | `k_V` **3 of 10** — no crossing. `k_D` 2 of 9 → `[0.063, 0.547] collapse`; diff 11 | `dry = 2`, `pool = 5/18` → `[0.125, 0.509] collapse` → **STOP, clause 4** |

**What went wrong, and how the system caught it.** In r2 two critics — one on A2's part panel, one in the
delta panel — returned `modality: "viewed_at_target_sizes"` with `recipe_class.n: 1` and three screenshots
of a zombie crowd as their observations. It looked like a crowd. A2 is registered `measured` on a
behavioural dimension, so C1.12's intersection flagged both and the registry comparison confirmed both;
the orchestrator **voided them rather than appealing** — no judgment call anywhere in the path. The delta
panel's reserve judge covered one and a fresh critic was spawned for the other, so `n_D` still landed on 9
and no blocker could push the round into clause 2. Without those two fields this run reproduces 27 → 43.

**How it ended, and what stands open.**

- **Clause 4, marginal-gain collapse**, at r6: two consecutive dry rounds, pooled `5/18`. The run can no
  longer demonstrate that r6 beat r5, and the cheapest gain left costs a round.
- **The bar was never crossed.** Best crossing panel `3 of 10`, up from `0 of 10`. Reported as it stands —
  `4 of 10` would not be a win either, and calling either "close" is F5.
- **Clause 0 cost a round, exactly as C4.4 predicts.** The r4 veto pushed the earliest possible exit from
  r5 to r6; that is why the default ceiling is 6× the minimum and not 3×.
- **Advisory-clear:** A1, A3, A6, A8. Standing in `r6/report.md` with flip conditions: A4 lighting, A5
  readability, A2's behavioural half, and A7 — whose measurable half passed (ours and `bar/` integrate at
  −16.4 and −16.2 LUFS, no clipping, no silence over 0.6s) while its audible half is a `human_gate` on
  loudness-normalised `r6/evidence/{A,B}-horde-approach.wav` that nobody has listened to. A7 is open, not
  passed. An agent closing an audio part on blind wins is the r2 screenshot error one recipe later.
- **Spend.** 169 agent-runs against 203 declared, 4.3M output tokens against 8.4M; per round r0 4 · r1 40 ·
  r2 28 · r3 25 · r4 25 · r5 20 · r6 27. `spend.tsv` column 3 carries the run-record `.tokens` total
  (C3.5), roughly 10× the output figure (C4.2); the two are never added.

---

# RUN B — usage & billing settings surface

Plan, usage-to-date, invoice history, payment method. Run B is the one that ends badly, which is why it is
in the file.

> "Our billing page is embarrassing, make it look like a real product."

### 1. Bar interrogation

| Candidate | Co-inspectable? | Dominant at the judged property? | Verdict |
|---|---|---|---|
| Vercel dashboard usage page | Yes | Nearest domain match, but its charts are its weakest part — a 3-judge pilot preferred Stripe's on legibility 3–0 | **Rejected** |
| Apple-style "beautiful" generic | No named artifact | n/a | Rejected — unfalsifiable |
| Stripe Dashboard billing pages | Yes, own live account, captured once | Yes, for dense financial information design | **Chosen (information design)** |
| Linear settings | Yes, own free account, captured once | Yes, for interaction craft: focus, motion, keyboard | **Chosen (interaction)** |

That pilot is a *candidate filter*, not a gate: three judges are enough to drop a bar before spending on a
run and are below every panel floor C2 sets, so it closed nothing and was never counted.

**Why a split bar.** One product is rarely best at both halves of a UI. Stripe wins "where does my money
go", Linear wins "how does this feel to operate", and naming both gives each critic an unambiguous target.
Rejecting the nearest-domain candidate is the move most operators miss: **domain proximity is not the
selection criterion, dominance at the judged property is.**

```bash
RUN=/Users/Nathan/Code/acme-app/.gauntlet/2026-06-02a
ls "$RUN"/bar/   # stripe-billing-{overview,invoices,usage,payment}-{1440,390}.png  +  the same four
                 # linear-settings-{general,members,api,billing} pairs, dark and light. 24 files, flat
(cd "$RUN" && shasum -a 256 bar/* > bar.sha256)   # first digest b71e05c4af88…
```

Both accounts were opened once at round 0 to produce those files, then closed for the run. A live dashboard
is not a bar. The snapshot is.

### 2. What the generator emitted

```text
BAR:      Stripe Dashboard billing pages (information design) + Linear settings (interaction craft)
ACCESS:   both logged into once at round 0; 24 captures at 1440x900 and 390x844, light and dark,
          chrome cropped, written to $RUN/bar/ and hashed. Accounts closed for the run.
MODALITY: pixels at real size for information design; driven interaction with per-step assertions
          for craft. Dark mode and hover are C5-unavailable from a still, so both are recipe 2 work
BUDGET:   +6.0M output tokens (5 rounds × C4.2's seed at P = 9); 150 agent-runs (5 × 30 per C4.3)
```

**Launch prompt, 143 words assembled.** `{MODALITY PHRASE}` is `LAUNCH.md` §1 STEP 2b row 1, "UI, layout,
brand, deck, render". No medium clause: the surface lands in a codebase the builders are already in.
Paragraphs 2 and 4 are Run A's verbatim; the three clauses that changed:

```text
Build our web app's usage-and-billing settings surface, at the level of the Stripe Dashboard's
billing pages for information design and Linear's settings for interaction craft. Not "good for
an internal page" — as good as those two, judged the way they get judged.
…
That critic opens the running thing at real size and looks at it next to Stripe's and Linear's
own screens, never a summary. Be a genuinely harsh critic.
…
Don't stop until it picks ours. Ultracode.
```

### 3. Orchestrator's decomposition

| Part | Bar half | Modality | Recipe | DEFECT_CLASS | Probe |
|---|---|---|---|---|---|
| B1 first-glance hierarchy | Stripe | `viewed_at_target_sizes` | 1 | visual | matched pair, both widths |
| B2 invoice table density | Stripe | `viewed_at_target_sizes` | 1 | visual | matched pair, 2× crop of the densest region |
| B3 usage chart legibility | Stripe | `viewed_at_target_sizes` | 1 | visual | matched pair at both widths |
| B4 plan-change flow | Linear | `interacted` | 2 | behavioural | recipe 2 walk, then the break set |
| B5 card-declined and dunning | Stripe | `interacted` | 2 | behavioural | forced test-mode decline codes |
| B6 dark-mode and hover parity | Linear | `interacted` | 2 | correctness | driven theme toggle + per-step computed-style assert |
| B7 390px layout | Linear | `viewed_at_target_sizes` | 1 | visual | fixed-viewport pair + overflow JSON |
| B8 keyboard-only completion | Linear | `interacted` | 2 | behavioural | Tab walk, no pointer events permitted |
| B9 first-run empty state | Stripe | `viewed_at_target_sizes` | 1 | visual | matched pair |

**B6 is registered `interacted`, not visual, on purpose.** C5's static-visual row cannot inspect hover,
focus, pressed or dark mode — a PNG of a dark page proves nothing about a token that flips on `:hover`. So
B6 is recipe 2: drive the toggle, drive the hover, assert the computed value at each step. B1's five-second
recall task is likewise not a static-visual claim; it sits in `not_probed` pointing at recipe 8.

### 4. The verdict that found it

Run A carries the one complete verdict; two more full copies would be padding. B6's differs from it in kind
at three keys, and those three are the lesson. `parity: "matched"` — both sides are drivable, so nothing
here is a proxy. `budget_checks` carries the measurement that is *not* an A/B claim:
`{"metric":"secondary text contrast on --surface-2, dark, hovered","budget":">= 4.5:1","observed":"2.9:1
artifact A, 7.1:1 artifact B","pass":false}`. And `not_probed` names a limit of the modality itself, not
just an unrun probe: `"whether a dark still looks good, which no still can settle -> recipe 1 plus a human
gate"`. The decisive `probe_step`, verbatim out of the record:

```js
pw.evaluate "document.documentElement.dataset.theme='dark';
  const e=document.querySelector('[data-surface=invoice-row]');
  e.dispatchEvent(new MouseEvent('mouseover',{bubbles:true})); getComputedStyle(e).backgroundColor"
// A: rgb(246, 247, 249) — the light value of --surface-2, on 4 of 12 surfaces on hover
// B: rgb(24, 26, 31) at rest and on hover, 12 of 12, and 0 hex literals outside one tokens file
```

`largest_gap.gap` to the builder: delete the 9 hex literals, make the token lookup throw on a missing dark
value, re-run the walk before judging anything visual. `why_it_dominates`: surfaces that flip to light on
interaction read as a rendering bug, so every other dark-mode judgement is downstream of it.

### 5. Rounds, and how it ended

| R | What changed | Panels | State after |
|---|---|---|---|
| r0 | 24 bar captures, hashed. Unassisted pass tagged `gauntlet-r0`. | — | comparand exists |
| r1 | Rebuild on the design system; new invoice table; usage chart v1. | `k_V` **0 of 10**. `k_D` 8 of 9 → `live` | `dry = 0`. B5 does not exist: no decline state shipped |
| r2 | **Compliance claim falsified, below.** Tokens enforced, 14 raw inputs replaced. | `k_D` 7 of 9 → `live`. B6 leaking surfaces 11 → 4. B8 focus trap in the plan-change dialog, Confirm unreachable | `dry = 0` |
| r3 | Focus management rewritten; B5 built against Stripe test-mode decline codes; B7 reflow. | `k_D` 3 of 9 → `[0.121, 0.646] collapse`. B6 = the verdict above. No `open` gap row; diff 21 < 25 | **dry**: `dry = 1`, `pool = 3/9` |
| r4 | B1 plan-tier chip; B3 cumulative reference line on the usage chart. | `k_V` **1 of 10**. `k_D` **1 of 9** → `[0.020, 0.435] regression`. `pool = 4/18` → `[0.090, 0.452] regression` | `dry = 2` → **STOP, clause 5** |

**The ending, stated as C2 requires.** Clause 5 is not a completion. The pooled band puts r4 *below* r3 at
95%, so the run rolled back to `gauntlet-r3` and the re-cut is pending. The cause is legible in the r4
verdicts: the cumulative reference line that made the chart argue its case at 1440px made it illegible at
390px, and B3 and B7 both moved against us. Under a rule that only ever stopped on "no more gains", r4
would have shipped.

**What went wrong, and how the system caught it.** The r1 builder's return said the surface was "built on
the design system". Critics are structurally forbidden from reading builder returns, and the first action
on a conformance part is to grep the tree: **14 raw `<input>` elements, 9 hex literals, 3 hardcoded `px`
font sizes**. The claim was false. That is the normal state of builder self-report, and the mitigation is
structural rather than motivational — the critic never sees the claim, so it has no claim to anchor on.

**State and spend.** Seven parts are advisory-clear at r3 and shippable; B1 and B3 are not. B3 lost to
Stripe's chart on every panel it faced and the panels agree on why: ours plots current-period consumption
with no cumulative reference line, so the number is legible and the *trajectory* is not — and the one
attempt to fix that caused the regression that stopped the run. The constraint is now in `r4/report.md`,
worth more than the round it cost. 131 agent-runs against 150, 3.9M output tokens against 6.0M; per round
r0 4 · r1 41 · r2 27 · r3 26 · r4 33.

---

# RUN C — non-visual: an HTTP API with latency and correctness bars

The case people assume gauntlet loops cannot do. Target: `POST /v1/payout_requests` on an internal payouts
API. No pixels anywhere in this run.

> "Ship the creator payout endpoint and don't let it double-pay anyone."

### 1. Bar interrogation

| Candidate | Co-inspectable? | Dominant at the judged property? | Verdict |
|---|---|---|---|
| Our existing v1 endpoint (p95 340ms) | Yes | No — internal baselines only ratchet downward | **Rejected** |
| A cloud gateway latency SLO | Numeric only; no behaviour to compare | No — a number is not a contract | Rejected |
| Stripe API v1, test mode | Yes: recorded transcripts, produced once | Yes — idempotency and error semantics are its most-copied property | **Chosen** |

**Why Stripe.** It converts "good API" into something a critic can diff: idempotent replay, machine-readable
error codes and pagination are all observable by issuing the same call against both systems.

**Freezing a live API.** A live API cannot be a bar of record — not frozen, not hashable, and a mid-run
re-fetch is F3. The bar is the **recorded transcript set**, produced by calling the test-mode account once
at round 0 and never again: the same rule C5.5 imposes on voice runs, for the same reason. A frozen probe
re-runs every round, so a probe that touches a live third party touches it every round.

```bash
RUN=/Users/Nathan/Code/payouts-api/.gauntlet/2026-07-08a
ls "$RUN"/bar/   # c{1,2,3,4,6,7}-*.jsonl  latency-raw-n30.txt
(cd "$RUN" && shasum -a 256 bar/* > bar.sha256)   # 7 files, first digest 2d90ee7b6c15…
```

**How blind pairwise works with no pixels.** Run one probe against both systems, capture request/response
pairs, then normalise everything that names a vendor — header names, hostnames, id prefixes, version
strings — before either transcript reaches a judge. Hand the critic transcript A and transcript B and force
one question: *which of these would you rather integrate against, and why.* For latency, two unlabelled
percentile tables from the same session. The scrubber is harness code (`probes/scrub.mjs`) no builder owns,
and it is *not* in the launch prompt: a scrubbing procedure is a plan, not a constraint on the deliverable.

### 2. What the generator emitted

```text
BAR:      Stripe API v1 payment_intents + refunds, test mode, frozen as transcripts in $RUN/bar/
ACCESS:   curl with a test-mode key returned 200 across the full probe set this session; 7
          transcript files plus 30 raw timings recorded once into $RUN/bar/ and hashed
MODALITY: contract conformance from response bodies, plus a separate measured latency dimension.
          Sustained concurrency and p99.9 are C5-unavailable here — budget check or human gate
BUDGET:   +6.0M output tokens (5 rounds × C4.2's seed at P = 8); 145 agent-runs (5 × 29 per C4.3)
```

**Launch prompt, 133 words assembled.** `{MODALITY PHRASE}` is `LAUNCH.md` §1 STEP 2b row 5, "API, schema,
protocol, integration". Paragraphs 2 and 4 are Run A's verbatim; what changed:

```text
Build POST /v1/payout_requests, at the level of Stripe's API. Not "good for an internal service"
— as good as Stripe's, judged the way Stripe's gets judged.
…
That critic calls it for real and checks every response against the contract — the responses
themselves, never a summary of them. Be a genuinely harsh critic.
…
Then put the two side by side, unlabelled, and make it pick which it would rather integrate
against. If it doesn't pick ours, say what gave it away and keep going.

Don't stop until it picks ours over Stripe. Ultracode.
```

### 3. Orchestrator's decomposition

| Part | Modality | Recipe | DEFECT_CLASS | Probe |
|---|---|---|---|---|
| C1 idempotent replay semantics | `called_api` | 5 | correctness | differential probe, 12 cases |
| C2 error object shape + codes | `called_api` | 5 | correctness | contract diff, reachability check per code |
| C3 validation on malformed input | `called_api` | 5 | correctness | fuzzed field matrix |
| C4 list pagination contract | `called_api` | 5 | correctness | cursor walk, mutation mid-walk |
| C5 request latency p95 | `measured` | 7 | timing | serial curl loop, n=30, cold and warm |
| C6 auth failure semantics | `called_api` | 5 | correctness | missing / expired / wrong-scope |
| C7 duplicate in-flight request | `called_api` | 5 | correctness | background fan-out, 20 at a time |
| C8 integration doc | `independent_reader` | 8 | other | fresh agent integrates from the doc alone |

**C8 is deliberate: one prose part inside an engineering run.** Its modality is `independent_reader`, not
read-aloud — the agent cannot hear, so what it does is hand the doc to a reader that never saw the intent
and diff what that reader took away against what the doc was for (C5.7). Every `independent_reader` verdict
carries a `human_gate` (C1.4); C8's names the `say -o` / `afplay` pair for cadence, which the operator ran
once. It caught two undocumented required fields.

**What part C5 cannot measure, stated up front.** No load generator is installed (C5.2), so C5's
Performance row marks sustained concurrency and p99.9 UNAVAILABLE. The part is therefore recipe 7's serial
curl loop reporting **p95 at n=30, cold and warm, alternating A/B/A/B in one session on one machine**, and
`"p99 under sustained concurrency, no load tool installed -> recipe 7"` sits in `not_probed` on every one of
its verdicts. Correctness under concurrency is a different part (C7), probed with the fan-out that ships.

### 4. The verdict that justified the whole run

C1's is `modality: "called_api"`, `recipe_class {n: 5}`, `parity: "matched"`. What differs in kind from
Run A is `probe_step`: here it is a literal invocation, which is what C1 means by *the copy-pasteable
command, not a description of one* — and the store query that proves the side effect is a probe in its own
right (C5's API row: a response body alone cannot show a double write).

```bash
# observations[0].probe_step, artifact A, verbatim
curl -sS -D- -o- --path-as-is -X POST "$BASE_A/v1/payout_requests" \
  -H 'Idempotency-Key: case3' -H 'content-type: application/json' \
  -d '{"amount":4200,"creator":"c_88"}'          # then the same key with amount 9900
sqlite3 /Users/Nathan/Code/payouts-api/.gauntlet/2026-07-08a/r1/arena/A/store.db \
  "select count(*) from payouts where idem_key='case3'"
# A observed: HTTP 200, second body applied, count = 2. Case 4 (same key+body, 5 replays): count = 5
# B observed: HTTP 400 naming the key conflict and the field path 'amount', count = 1. Case 4: count = 1,
#             and 4 replays return the original response byte-for-byte
```

`largest_gap.gap`: persist `(key, request_hash, response)` with a UNIQUE constraint on key; a replay
returns the stored response, a hash mismatch returns a conflict error. `why_it_dominates`: the header is
accepted and ignored, so any client retry on a timeout double-pays a creator, and nothing else in the
contract matters until this holds. `not_probed` ran to four entries, each ending in its recipe — replay
across a process restart → 5, key expiry → 5, replay after a partial write → 6, replay-path latency → 7.

### 5. Rounds, and how it ended

| R | What changed | Panels | State after |
|---|---|---|---|
| r0 | 7 bar transcripts + 30 timings recorded once. Unassisted pass tagged `gauntlet-r0`. | — | comparand exists |
| r1 | Baseline probes against both systems. | **Blindness broken, below — 21 verdicts voided.** After the re-judge: `k_V` **0 of 10**; `k_D` 8 of 9 → `live`. C1 as above. Part C5 p95 **412ms warm / 604ms cold** vs 96 / 141 | `dry = 0`. C8 does not exist |
| r2 | Idempotency table + UNIQUE key; typed error objects; scrubber frozen into `probes/`. | `k_D` 7 of 9 → `live`. C7: the 20-way fan-out produced 2 rows — the UNIQUE violation was caught and swallowed as success. C2: codes copied in shape, 3 of 11 unreachable. p95 **210ms** | `dry = 0` |
| r3 | Serialize duplicates on the key; error-code table pruned to reachable codes; docs generated from the transcripts. | `k_D` 6 of 9 → `live`. C7 0 duplicates across 10 runs of the fan-out (200 calls). C8 integrated in one attempt after 2 doc fixes. p95 **163ms** | `dry = 0` |
| r4 | Query-plan work: composite index, dropped an N+1 on creator lookup. | `k_D` 5 of 9 → `[0.267, 0.811] live`. p95 **148ms** vs 96ms; the panel has never once picked ours on latency | `dry = 0`. Remaining 0.37M < `roundCost` 1.2M → **ABORT, clause 1** |

**What went wrong, and how the system caught it.** In r1 the comparison was not blind. Our responses
carried `X-Powered-By: Express` and `pr_`-prefixed ids; the bar's carried its own version header and
prefixes. The r1 critics said so in the fields C1 requires — `blind_integrity: "compromised"`,
`compromised_how: "one side's ids are prefixed pr_, the other's pi_ and re_; the header sets differ"` — so
the orchestrator **voided all 21 transcript verdicts** instead of accepting them. `probes/scrub.mjs` was
written, frozen into `probes/`, and both panels re-spawned. C2 came back **the other way**: the compromised
panel had split 6–4 for the artifact it recognised as ours, and the clean blind panel went to the bar 10–0.
Self-declared blindness is one enum field, and it caught real critic capture here.

**How it ended, and what stands open.**

- **Clause 1, and it is reported with the word *abort*.** 140 of 145 agent-runs and 5.63M of 6.0M output
  tokens were spent closing r4; the next round needed 1.2M and 21 runs. Resume handle in `run.json`. Per
  C2.8 a resume re-reads `bar.sha256`, `launch-prompt.md` and `run.json`, verifies the hash and starts a
  **new** Workflow from r4's state — same-session `resumeFromRunId` is not what gets used the next morning,
  and nothing here advertises that it is.
- **Not a completion, and the numbers show the difference.** The delta panel was still `live` at `5 of 9`
  and three consecutive rounds of real gain (412 → 210 → 163 → 148ms) were running when the money ran out.
  A collapse stop would have said the opposite. Advisory-clear: C1, C2, C3, C4, C6, C7, C8. Part C5 never
  won a panel and never plateaued.
- **Honest gap.** p95 **148ms warm against the bar's 96ms — 1.54× slower**, n=30 each, alternating
  A/B/A/B in one session on one MacBook Pro M4 Max; cold 231ms against 141ms. `p99 under sustained
  concurrency: not probed, no load tool installed` — implying that coverage would be the exact modality lie
  this system exists to prevent. The profile names where the 52ms lives: **41ms in per-request connection
  acquisition** (no pooled connection string) and **29ms in cold-path schema validation**, which overlap,
  hence the sum past 52. Both are infrastructure changes the operator declined inside this run. Correctness
  is the part that mattered and it stands at 12 of 12 differential cases behind a UNIQUE constraint — the
  double-payout path found in r1 cannot recur.
- **Spend.** Per round r0 5 · r1 61 (40 + 21 re-judges) · r2 27 · r3 26 · r4 21 = 140. Builders Sonnet 5,
  critics Opus 5, probe runners Haiku 4.5, every model set at spawn (F22).

---

# What generalised across the three runs

| Move | Evidence it earned its place |
|---|---|
| Interrogate the bar before writing the prompt | Run A: CoD would have handed every critic a screenshot and reproduced 27 → 43. Run B: the nearest-domain candidate was weakest at the judged property. |
| Split the bar when no single artifact dominates both halves | Run B: Stripe for information, Linear for interaction. No critic argued about the target again. |
| Register a modality **and a defect class** per part, and void mismatches | Run A r2: two still-image verdicts on a behavioural dimension, voided by C1.12's intersection plus one string comparison. Run A A7: the same rule is why an audio part is open instead of passed. |
| Say which half of a modality the harness can actually decide | Run A: frame times became budget checks and A2's behavioural half a `human_gate`, because a footage bar carries neither. Run C: `p99` stayed in `not_probed`. |
| Let the band end the run, not the operator's patience | Run A stopped on a pooled `5/18`; Run B on a pooled `4/18` in the other direction, and rolled back — an outcome no "are we still improving?" judgement produces. Run C spent 96% of its ceiling, never won a latency panel, and is reported as an abort. |

Termination appears in exactly one place per run: the `/gauntlet` gate, printed to the operator. It is in no
emission header, no launch prompt and no role prompt, and no model in any of these three runs saw it.
