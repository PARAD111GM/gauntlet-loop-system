# EXAMPLES — three worked runs

Condensed logs, in run order, so you can diff your own emission and your own verdicts against them. `CONTRACTS.md`
(v2) is law for every field, threshold, path, ceiling and capability below: where a run reports one it cites the
clause instead of restating it. Probes: `INSPECTION.md`. Bars: `BARS.md`. Prompt and header: `LAUNCH.md`.

**What these are.** Worked runs, not transcripts. The narratives are from real failures — the 27 → 43 rubric-inflation
loop, the false "built on the design system" claim, the unblinded transcript panel, the budget abort. Every count is
small enough to check on your fingers, which is the v2 bargain: the clause that fired follows from C2 and nothing else.

| Run | Domain | Bar in the prompt | Rounds | C2 clause that fired | Honest final state |
|---|---|---|---|---|---|
| A | Browser 3D game (Three.js) | Left 4 Dead 2 | r0–r6 | **3** — collapse, two dry rounds | Crossing panel best 2 of 5. Bar never crossed |
| B | Usage + billing settings UI | Stripe billing + Linear settings | r0–r4 | **4** — regression; rolled back to `gauntlet-r3` | Not a completion. Re-cut pending |
| C | HTTP API, no pixels | Stripe API v1, frozen transcripts | r0–r4 | **1** — **abort** on budget | p95 148ms vs 96ms, delta panel still live |

No run here crossed its bar and one is an abort. That is the expected shape (C2's headline), not three failures: a
file showing three crossings would advertise the exit that is rare by design.

## House rules all three runs ran under

1. **No stop rule reaches a model.** Not in a launch prompt, not in the header. The script evaluates C2 at round
   close; the operator sees the clauses once, in the `/gauntlet` gate, the one place a contract is reprinted verbatim.
   Run `DOCTRINE.md` invariant 5's grep — a number beside *round* — over any launch prompt below: nothing. Over the
   headers it returns the `STOP:` ceiling, the operator's cost backstop, which reaches no model.
2. **Panel size and clause order are C2's**, written into `run.json` before round 1 and never restated in a run log.
   Each round reports observed `k` of `n` per arena and which clause fired.
3. **Part panels terminate nothing** (C2.4): advisory, still driving every builder, and no run below ends on one.
   `indistinguishable` never counts as a win (C1.4). A part verdict feeds no panel, so its `parity` is not panel
   arithmetic — it decides whether a `human_gate` is required (C1.5) and whether the claim may be repeated against
   the bar at all.
4. **Verdicts are the C1 schema, unmodified** — no added field, no numeric field at any depth, no key that would tell
   a critic a twin judgment exists. Diff the sample verdict against C1 rather than trusting this sentence.
5. **One mismatch check, mechanical.** The modality registered for a part in `plan.md` against the `modality` the
   critic returned: one string comparison, and a mismatch is voided rather than argued. `plan.md` carries a
   `DEFECT_CLASS:` per part (C3.2), so the registration is reviewable before the round instead of after.
6. **Bar frozen and hashed before round 1** with C3.4's cwd-pinned command, `bar/` flat, no re-fetch (F3). Each run
   took one unassisted pass first, tagged `gauntlet-r0`, so round 1's delta panel had a real comparand.

---

# RUN A — browser zombie-horde shooter

Repo `~/Code/zombie-fps`: the baseline prompt's home turf, carrying a failed visual-only loop. A self-scored critic
drove its own rubric **27 → 38 → 43** over three rounds while the horde AI stayed broken, because every check was a
still image.

> "Make the zombie game actually feel AAA instead of like a tech demo."

### 1. Bar interrogation

| Candidate | Co-inspectable? | Dominant at the judged property? | Verdict |
|---|---|---|---|
| Call of Duty: Modern Warfare III | No frame-matched capture obtainable; invites screenshot-only judging | Visuals only | **Rejected** |
| Three.js shooters on itch.io | Yes, trivially | No — peer level | Rejected: ratchets to "good for a web game" |
| Left 4 Dead 2 (Source, 2009) | Yes: owned install, capturable on this rig at 1080p60 and 240fps | Yes — the horde director is its defining system | **Chosen** |

**Why L4D2.** What makes this game bad is not texture resolution, it is that 40 zombies walk single file. L4D2's
reputation rests on the exact subsystem under repair, so the bar puts pressure where the defect is, and it is
capturable: a critic gets `bar/l4d2-horde-00.41.mp4` and a frametime trace, not vibes. CoD was rejected not for being
unreachable — unreachable is the engine — but because it is inspectable only as pixels: naming it hands every critic a
screenshot and reproduces 27 → 43 by round two. It stayed an aspiration with no gate authority, absent from the emission.

```bash
RUN=/Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a
ls "$RUN"/bar/   # l4d2-horde-{00.41,01.12}.mp4  l4d2-hud-{1,2,3}.png  l4d2-frametime-40actives.json
(cd "$RUN" && shasum -a 256 bar/* > bar.sha256)   # C3.4, cwd-pinned. 6 files, first digest 4c8b1f0a9d33…
```

### 2. What the generator emitted

Four header lines, `LAUNCH.md` BLOCK 1's shape, for the human only:

```text
BAR:      Left 4 Dead 2 (Source engine, 2009), horde encounters
ACCESS:   Steam install confirmed present this session; 1080p60 screen recording + 240fps capture
          of the same two encounters on this rig, written to $RUN/bar/ and hashed
MODALITY: Real-time 3D (C5). The bar is footage, so frame times stay candidate-side numbers, never
          an A/B claim, and any behavioural comparison against the bar is proxy-biased
          HUMAN GATE: $RUN/r<N>/evidence/ — the approach audio, and whether the horde's arrival in
          the two clips reads as intent
STOP:     my call. ceiling: +2.5M output tokens (6 rounds at 8 parts, C4.2); 120 agent-runs
```

No stop rule: termination is C2's, it lives in the script, and the gate prints it to the operator. The agent-run
ceiling was raised once at the gate from C4.3's default, because eight parts put a crossing round at 19 agents; both
figures come off the same round count and never off each other (C4.4).

**Launch prompt, verbatim — 145 words by `wc -w`, ceiling per C4.1.** The modality phrase is `LAUNCH.md` STEP 2b's
**Real-time 3D** row, verbatim, whose authority is C5. Assembled it ran 167; `LAUNCH.md`'s cut order took the *judged
the way it gets judged* clause, then the second and third repetitions of the bar name, and stopped. The trailing medium
clause survives because the repo is already Three.js.

```text
Build a browser zombie-horde shooter, at the level of Left 4 Dead 2. Not "good for an AI".

Fan out subagents and let them split the work however they see fit; each owns its piece until it
holds up. /loop on every piece.

Every piece gets checked by a separate fresh subagent that never saw it being built and has no
stake in it. That critic drives it with real input, samples the frame times, and reads the console
for the errors the picture never shows — it inspects the artifact itself, never a summary of it. It
should be a genuinely harsh critic.

Then put the two side by side, unlabelled, and make it pick which is better. If it does not pick
ours, say exactly what gave it away and keep going.

Don't stop until it picks ours. Do this in Three.js. Ultracode.
```

Paragraphs 2, 4 and 5 are `LAUNCH.md`'s template byte for byte in all three emissions — reverse the slot fill and the
template comes back, which is what `ROLES.md` ANTI-CAPTURE step 3 checks. Only the bar clause, the modality phrase and
the trailing clause move between domains.

### 3. Orchestrator's decomposition

| Part | Modality | Parity vs bar | DEFECT_CLASS | Probe (`INSPECTION.md` recipe) |
|---|---|---|---|---|
| A1 trigger → visible consequence | `measured` | matched | timing | 240fps both sides, count frames to first consequence (3) |
| A2 horde approach vectors | `measured` | proxy-biased | behavioural | candidate `window.__probe` bearings + matched frame series (3) |
| A3 hit feedback + damage model | `interacted` | proxy-biased | behavioural | scripted input, `window.__probe` assertions (2) |
| A4 lighting and mood | `viewed` | matched | visual | matched-viewport stills, both sides (1) |
| A5 level readability | `executed` | proxy-biased | behavioural | naive-agent traversal, 10 seeded routes (3) |
| A6 frametime envelope, 40 actives | `measured` | matched in `delta` only | timing | rAF sampler, two `javascript_tool` calls, full sample or void (3) |
| A7 approach audio | `measured` | proxy-biased | other | `ebur128` / `astats` / `silencedetect`; audible half gated (9) |
| A8 HUD legibility | `viewed` | matched | visual | 1440×900 and 390×844 stills (1) |

Four registrations do real work and all four are C5 consequences.

- **A1 survives a footage bar; A6 does not.** Trigger-to-consequence is countable in frames on both sides. Frame
  *times* are not in footage, so `arena/A6/` holds r`N` and r`N−1`, not us and the bar: against the bar A6 produces a
  number for `r<N>/evidence/` and no choice at all (C5's Real-time 3D row).
- **A2's asymmetry is the definition of PROXY** (C5.3): the candidate half is instrumented and matched still frames are
  all the bar can supply, so A2 is `proxy-biased`, counts in the delta panel, and can never establish crossing. No
  timing claim is drawn from those frames — C5's Motion row would require a `window.__setTime(ms)` hook and a footage
  bar cannot have one, so A2 makes no easing, sync or animation-quality claim; the series is read as stills.
- **A7 is measurable and deaf.** Loudness, clipping and dead air are real numbers; timbre, prosody and artefacts are
  not agent-decidable, because the critic cannot hear and no ASR is installed (C5.4). Every A7 verdict is
  `proxy-biased` with a `human_gate` (C1.5), and no critic is ever asked to compare two recordings.
- **Behaviour gets true parity only in the `delta` arena**, round N against N−1, where both sides are drivable and the
  live sampler runs on both. That is the panel Run A actually terminated on. Builders ran in two worktrees to keep A2
  and A4 from colliding; critics were Opus 5, fresh-spawned per verdict with the model set at spawn, since a resumed
  agent reverts to the session default (F22).

### 4. Sample verdict — the FAIL that mattered

A2's part verdict, r2 re-judge, complete and unedited. Advisory (C2.4), and still the verdict that bought the r3
director rewrite. Note what C1 forces: a copy-pasteable command in every `probe_step` with absolute arena paths (which
is why C3.6's grep reads prose fields only), literal output in `observed`, no field of its own invention.

```json
{ "dimension": "horde threat under sustained contact",
  "modality": "measured", "parity": "proxy-biased", "choice": "B", "blocker": null,
  "margin": "decisive",
  "probes_run": [
    "ffmpeg -ss 2 -i /Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a/r2/arena/A/capture-240.mov -vf fps=8,scale=480:-1 -frames:v 30 /Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a/r2/evidence/A-frame-%03d.png",
    "same command against arena/B into B-frame-%03d.png; zero-padded, or the glob sorts f80 after f720",
    "Read both series in order, count approach corridors sustained across three or more consecutive frames"],
  "observations": [
    {"artifact": "A",
     "probe_step": "Read /Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a/r2/evidence/A-frame-0{01..30}.png",
     "observed": "one approach corridor. 27 of the 30 frames show the actives in a single-file column entering from the same doorway; no frame shows a second sustained direction"},
    {"artifact": "B",
     "probe_step": "Read /Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a/r2/evidence/B-frame-0{01..30}.png",
     "observed": "three corridors sustained across the series, two arriving through side geometry rather than the player's line of sight; no frame carries more than 14 visible actives on one bearing"}],
  "largest_gap": {"artifact": "A",
    "gap": "Replace radial spawn with flow-distance spawn on at least three lanes, then re-probe bearing spread before touching animation or lighting. One approach vector makes every fight solvable by backing into a corridor, so nothing downstream of it changes the encounter.",
    "evidence": "one corridor in 27 of 30 frames on A against three on B; A's own window.__probe puts 31 of 40 actives inside 12 degrees of one bearing at t=4.0s on seeds 1, 2 and 3"},
  "not_probed": [
    "bar-side per-agent bearing telemetry, which footage cannot carry",
    "melee contact behaviour",
    "audio telegraphing of an approach — the critic cannot hear (C5.4)",
    "behaviour above 40 actives"],
  "human_gate": "/Users/Nathan/Code/zombie-fps/.gauntlet/2026-05-14a/r2/evidence/{A,B}-frame-*.png and both clips: watch whether the horde arrives from more than one direction and whether the flanks read as intent. Frames carry no per-agent state, so the behavioural half of this comparison is not agent-decidable.",
  "blind_integrity": "intact" }
```

`choice: "B"` against `.sides` column 3 reading `candidate=A` is the bar winning — and the words `bar` and `cand` appear
nowhere in the verdict, because they name the side the blind is hiding. To the builder goes `largest_gap.gap` and
nothing else: no observations, no side label, no frames. The candidate-side sampler is quoted inside `evidence` as
support for a claim the frames already carry; it is not a number the schema stores, and A6's frametime envelope — which
frames cannot carry at all — stays in `r2/evidence/` with its command, out of every verdict.

### 5. Rounds, and how it ended

`k_D` is the delta panel, `k_X` the crossing panel, both n = 5, each at the arena C2 names. A dash means
`OPERATIONS.md` §5's schedule called for no crossing panel that round.

| R | What changed | Panels | State after |
|---|---|---|---|
| r0 | Bar acquisition, freeze, hash. One unassisted pass, tagged `gauntlet-r0`. | — | comparand exists |
| r1 | All 8 parts built. | `k_X` **0 of 5** (matched, clip-vs-clip). `k_D` 5 of 5 | round 1 is never dry; `dry = 0` |
| r2 | Recoil curve, muzzle flash, first spawn tweak, HUD type scale. | `k_D` 4 of 5. A2 above. A1 44 → 31 frames at 240fps (183 → 129ms; bar 18 frames = 75ms). A8 advisory-clear | two new `open` gap rows → not dry. `dry = 0`. **Two verdicts voided, below** |
| r3 | Director rewrite: flow-distance spawn, 3 lanes, occlusion-aware pathing. A6 instanced meshes, pooled ragdolls. | `k_D` 4 of 5. A2 corridors 1 → 3, its r2 gap row appended `closed` (C3.3). A6 p95 26.4 → 15.1ms in `evidence/` | one new `open` row (A5 wings) → not dry. `dry = 0` |
| r4 | A2 flank commit timers; A3 hit-stop 60ms + directional damage vignette. | **VETO (clause 0):** `probes/horde-converge` passed in r3 and fails now — commit timers deadlock two lanes at 40 actives. Round is FAIL, no stop may be declared. `k_D` 2 of 5 | new `open` row → not dry. `dry = 0` |
| r5 | Deadlock fixed, the veto gap appended `closed`, nothing else touched. | `k_D` 3 of 5. No new `open` row | **dry**: `dry = 1` |
| r6 | A5 sightline dressing on the two dead-end wings. | `k_X` **2 of 5** — 4 needed, no crossing. `k_D` 2 of 5. No new `open` row | `dry = 2` → **STOP, clause 3** |

**What went wrong, and how the system caught it.** In r2 two critics — one on A2's part arena, one in the delta panel —
returned `modality: "viewed"` with three screenshots of a zombie crowd as their observations. It looked like a crowd. A2
is registered `measured` in `plan.md` on a behavioural `DEFECT_CLASS`, so the one string comparison flagged both and the
orchestrator **voided them rather than appealing** — no judgment call anywhere in that path. Two fresh critics were
spawned, the delta panel still closed at 5, nothing needed reconciling. Without that comparison this run reproduces
27 → 43.

- **Clause 3, collapse, at r6:** two consecutive dry rounds. The run can no longer show that r6 beat r5 and the cheapest
  gain left costs a round. This is the normal exit, not a win. Clause 0 cost a round on the way: the r4 veto pushed the
  earliest possible exit from r5 to r6, which is why C4.3's ceiling carries headroom past the earliest legal stop.
- **The bar was never crossed.** Best crossing panel **2 of 5**, up from 0 of 5. Reported as it stands: 3 of 5 would not
  be a win either, and calling either "close" is F5. At n = 5 this run can say nothing about a *small* remaining gap
  and does not try to.
- **Advisory-clear:** A1, A3, A6, A8. Standing in `r6/report.md` with flip conditions: A4 lighting, A5 readability, A2's
  behavioural half, and A7 — whose measurable half passed (ours and `bar/` integrate at −16.4 and −16.2 LUFS, no
  clipping, no silence over 0.6s) while its audible half is a `human_gate` on loudness-normalised
  `r6/evidence/{A,B}-horde-approach.wav` that nobody has listened to. **A7 is open, not passed.** An agent closing an
  audio part on blind wins is the r2 screenshot error one recipe later.
- **Spend.** 101 agent-runs against 120 declared, 2.01M output tokens against 2.5M; per round r0 5 · r1 19 · r2 16 · r3
  14 · r4 14 · r5 14 · r6 19, and 0.05 · 0.52 · 0.34 · 0.31 · 0.29 · 0.22 · 0.28M. r1 ran over C4.2's seed — eight parts
  from nothing — and the target was recalibrated from that delta, never the ceiling. `spend.tsv` column 3 is the
  output-token unit C4.2 fixes; the run record's own total is roughly ten times larger and the two are never added.

---

# RUN B — usage & billing settings surface

Plan, usage-to-date, invoice history, payment method. Run B is the one that ends badly, which is why it is in the file.

> "Our billing page is embarrassing, make it look like a real product."

### 1. Bar interrogation

| Candidate | Co-inspectable? | Dominant at the judged property? | Verdict |
|---|---|---|---|
| Vercel dashboard usage page | Yes | Nearest domain match, but its charts are its weakest part | **Rejected** |
| Apple-style "beautiful" generic | No named artifact | n/a | Rejected — unfalsifiable |
| Stripe Dashboard billing pages | Yes, own live account, captured once | Yes, for dense financial information design | **Chosen (information)** |
| Linear settings | Yes, own free account, captured once | Yes, for interaction craft: focus, keyboard, state | **Chosen (interaction)** |

**Why a split bar.** One product is rarely best at both halves of a UI. Stripe wins "where does my money go", Linear
wins "how does this feel to operate", and naming both gives each critic an unambiguous target. Rejecting the
nearest-domain candidate is the move most operators miss: **domain proximity is not the selection criterion, dominance
at the judged property is.** Both accounts were opened once at round 0 to produce 24 flat captures under `$RUN/bar/`,
hashed with C3.4's command, then closed — a live dashboard is not a bar (F3), the snapshot is. That has a price, paid
in §3: nothing on the bar side can be driven again for the rest of the run.

### 2. What the generator emitted

```text
BAR:      Stripe Dashboard billing pages (information design) + Linear settings (interaction craft)
ACCESS:   both logged into once at round 0; 24 captures at 1440x900 and 390x844, light and dark,
          chrome cropped, written to $RUN/bar/ and hashed. Accounts closed for the run
MODALITY: Interactive UI (C5). Dark mode, hover, focus and pressed are outside what a still can
          settle, so they are driven and asserted, never judged from the bar captures
          HUMAN GATE: $RUN/r<N>/evidence/dark/ — whether the dark surface looks right, which no
          still and no computed value can settle
STOP:     my call. ceiling: +1.8M output tokens (4 rounds at 9 parts, C4.2); 80 agent-runs
```

**Launch prompt, 148 words.** The modality phrase is `LAUNCH.md` STEP 2b's **Interactive UI** row. A split *bar* buys no
second phrase — STEP 4 permits exactly one, and the behavioural row wins because a still cannot find a behavioural bug.
The still-image halves are registered per part in `plan.md`, which is where that distinction belongs. Paragraphs 2, 4
and 5 are Run A's verbatim; what changed:

```text
Build our usage-and-billing settings surface, at the level of Stripe's billing pages for
information design and Linear's settings for interaction craft. Not "good for an internal page".
…
That critic actually drives it, clicks through it, tries to break it, and checks what changed
after every single step — it inspects the artifact itself, never a summary of it.
…
Don't stop until it picks ours. Ultracode.
```

### 3. Orchestrator's decomposition

| Part | Bar half | Modality | Parity vs bar | DEFECT_CLASS | Probe (recipe) |
|---|---|---|---|---|---|
| B1 first-glance hierarchy | Stripe | `viewed` | matched | visual | matched pair, both widths (1) |
| B2 invoice table density | Stripe | `viewed` | matched | visual | matched pair, 2× crop of the densest region (1) |
| B3 usage chart legibility | Stripe | `viewed` | matched | visual | matched pair at both widths (1) |
| B4 plan-change flow | Linear | `interacted` | proxy-biased | behavioural | driven walk, then the break set (2) |
| B5 card-declined and dunning | Stripe | `interacted` | proxy-biased | behavioural | forced test-mode decline codes (2) |
| B6 dark-mode and hover parity | Linear | `interacted` | proxy-biased | correctness | driven toggle + per-step computed-style assert (2) |
| B7 390px layout | Linear | `viewed` | matched | visual | fixed-viewport pair + overflow JSON (1) |
| B8 keyboard-only completion | Linear | `interacted` | proxy-biased | behavioural | Tab walk, no pointer events permitted (2) |
| B9 first-run empty state | Stripe | `viewed` | matched | visual | matched pair (1) |

Two registrations decide the whole run.

- **B6 is `interacted`, not visual.** C5's static-visual row cannot settle hover, focus, pressed or dark mode; a PNG of
  a dark page proves nothing about a token that flips on `:hover`. B6 drives the toggle, drives the hover, and asserts
  the computed value at each step.
- **Every `interacted` part is `proxy-biased`,** and this is the price of freezing the bar. The bar half is 24 stills, so
  no driven comparison against Stripe or Linear exists; those verdicts are honest about the candidate and about r`N`
  versus r`N−1`, they count in the delta panel, and they can never establish crossing (C2, C5.3). The five `viewed`
  parts are matched — stills against stills at the same size — and are what made a crossing panel available at all.
  Motion is not a part here: C5's Motion row needs a `window.__setTime(ms)` hook on both sides and the bar is a PNG, so
  a motion claim against Linear would be void and none is made. B1's five-second recall task is likewise not a
  static-visual claim; it sits in `not_probed` pointing at the prose recipe and a human.

### 4. The verdict that found it

Run A carries the one complete verdict; a second full copy would be padding. B6's differs in kind at three keys.
`parity: "proxy-biased"` with a `human_gate`, for the reason above. `not_probed` names a limit of the modality itself
rather than an unrun probe: `"whether a dark surface looks right, which no still and no computed value can settle"`. And
the contrast measurement — legal by C5's static-visual row, `evaluate` for computed contrast — is a candidate-side
threshold check with no A/B claim in it, so it lives in `r3/evidence/dark/contrast.json` with its command and is
summarised in `report.md`, in no verdict at all. The decisive `probe_step`, verbatim out of the record:

```js
pw.evaluate "document.documentElement.dataset.theme='dark';
  const e=document.querySelector('[data-surface=invoice-row]');
  e.dispatchEvent(new MouseEvent('mouseover',{bubbles:true})); getComputedStyle(e).backgroundColor"
// A: rgb(246, 247, 249) — the light value of --surface-2, on 4 of 12 surfaces on hover
// B: rgb(24, 26, 31) at rest and on hover, 12 of 12, and 0 hex literals outside one tokens file
```

`largest_gap.gap` to the builder: delete the 9 hex literals, make the token lookup throw on a missing dark value, re-run
the walk before judging anything visual — surfaces that flip to light on interaction read as a rendering bug, so every
other dark-mode judgement is downstream of it. That reasoning goes inside `gap` because C1 gives it nowhere else to go,
and a builder acting on the first clause alone would re-skin the symptom.

### 5. Rounds, and how it ended

| R | What changed | Panels | State after |
|---|---|---|---|
| r0 | 24 bar captures, hashed. Unassisted pass tagged `gauntlet-r0`. | — | comparand exists |
| r1 | Rebuild on the design system; new invoice table; usage chart v1. | `k_X` **0 of 5** (matched, stills). `k_D` 5 of 5 | `dry = 0`. B5 does not exist: no decline state shipped |
| r2 | **Compliance claim falsified, below.** Tokens enforced, 14 raw inputs replaced. | `k_D` 4 of 5. B6 leaking surfaces 11 → 4. B8 focus trap in the plan-change dialog, Confirm unreachable | new `open` rows → not dry. `dry = 0` |
| r3 | Focus management rewritten; B5 built against Stripe test-mode decline codes; B7 reflow. | `k_D` 3 of 5. B6 = the verdict above. **New `open` row: B3 shows the number and not the trajectory** | not dry — that gap row is new. `dry = 0` |
| r4 | B1 plan-tier chip; B3 cumulative reference line on the usage chart. | `k_D` **1 of 5** — the delta panel picks r3 **4 of 5**. No new `open` row | dry, and clause 4 fires → **STOP, clause 4** |

**The ending, stated as C2 requires.** Clause 4 is not a completion. r3 was *not* dry, so clause 3 never armed; r4 was
dry and the delta panel picked the previous artifact 4 of 5, which is the regression clause, so the run rolled back to
`gauntlet-r3` and the re-cut is pending. The cause is legible in the r4 verdicts: the cumulative reference line that made
the chart argue its case at 1440px made it illegible at 390px, and B3 and B7 both moved against us. Under a rule that
only ever stopped on "no more gains", r4 would have shipped.

**What went wrong, and how the system caught it.** The r1 builder's return said the surface was "built on the design
system". Critics are structurally forbidden from reading builder returns, and the first action on a conformance part is
to grep the tree: **14 raw `<input>` elements, 9 hex literals, 3 hardcoded `px` font sizes**. The claim was false (F23).
That is the normal state of builder self-report, and the mitigation is structural rather than motivational — the critic
never sees the claim, so it has no claim to anchor on.

**State and spend.** Seven parts are advisory-clear at r3 and shippable; B1 and B3 are not. B3 lost to Stripe's chart on
every panel it faced and the panels agree why: ours plots current-period consumption with no cumulative reference, so
the number is legible and the *trajectory* is not — and the one attempt to fix that caused the regression that stopped
the run. That constraint is now in `r4/report.md`, worth more than the round it cost. 70 agent-runs against 80, 1.45M
output tokens against 1.8M; per round r0 5 · r1 20 · r2 15 · r3 15 · r4 15.

---

# RUN C — non-visual: an HTTP API with latency and correctness bars

The case people assume gauntlet loops cannot do. Target: `POST /v1/payout_requests` on an internal payouts API. No
pixels anywhere in this run.

> "Ship the creator payout endpoint and don't let it double-pay anyone."

### 1. Bar interrogation

| Candidate | Co-inspectable? | Dominant at the judged property? | Verdict |
|---|---|---|---|
| Our existing v1 endpoint (p95 340ms) | Yes | No — internal baselines only ratchet downward | **Rejected** |
| A cloud gateway latency SLO | Numeric only; no behaviour to compare | No — a number is not a contract | Rejected |
| Stripe API v1, test mode | Yes: recorded transcripts, produced once | Yes — idempotency and error semantics are its most-copied property | **Chosen** |

**Why Stripe.** It converts "good API" into something a critic can diff: idempotent replay, machine-readable error
codes and pagination are all observable by issuing the same call against both systems. A live API cannot be the bar of
record — not frozen, not hashable, and a mid-run re-fetch is F3 — so the bar is the **recorded transcript set**, seven
`.jsonl` files plus 30 raw timings, produced by calling the test-mode account once at round 0 and never again, then
hashed with C3.4's command. That is the rule C5.5 imposes on voice runs, for the same reason: a frozen probe re-runs
every round, so a probe that touches a live third party touches it every round.

**How blind pairwise works with no pixels.** Run one probe against both systems, capture request/response pairs, then
normalise everything that names a vendor — header names, hostnames, id prefixes, version strings — before either
transcript reaches a judge. Hand the critic transcript A and transcript B and force one choice. For latency, two
unlabelled percentile tables. The scrubber is harness code (`probes/scrub.mjs`) that no builder owns, and it is *not*
in the launch prompt: a scrubbing procedure is a plan, not a constraint on the deliverable.

### 2. What the generator emitted

```text
BAR:      Stripe API v1 payment_intents + refunds, test mode, frozen as transcripts in $RUN/bar/
ACCESS:   curl with a test-mode key returned 200 across the full probe set this session; 7
          transcript files plus 30 raw timings recorded once into $RUN/bar/ and hashed
MODALITY: API (C5), plus a separate measured latency dimension. Sustained concurrency and p99.9 are
          C5-UNAVAILABLE — no load tool on this machine (C5.2)
          HUMAN GATE: $RUN/r<N>/evidence/doc/ — the integration doc read aloud, since C5's Prose
          row removes read-aloud from what a critic may do
STOP:     my call. ceiling: +1.7M output tokens (4 rounds at 8 parts, C4.2); 80 agent-runs
```

**Launch prompt, 145 words.** The modality phrase is `LAUNCH.md` STEP 2b's **API** row. Paragraphs 2, 4 and 5 are Run
A's verbatim, including "make it pick which is better", unedited. The sharper question a critic should ask itself here
— *which would you rather integrate against* — belongs to `ROLES.md` §5's blind-critic prompt; moving it into the
launch prompt would break template fidelity for no gain.

```text
Build POST /v1/payout_requests, at the level of Stripe's API. Not "good for an internal service"
— as good as Stripe's API, judged the way Stripe's API gets judged.
…
Every piece gets checked by a separate fresh subagent that never saw it being built and has no
stake in it. That critic calls it for real and checks every response against the contract — it
inspects the artifact itself, never a summary of it. It should be a genuinely harsh critic.
…
Don't stop until it picks ours over Stripe's API. Ultracode.
```

### 3. Orchestrator's decomposition

| Part | Modality | Parity vs bar | DEFECT_CLASS | Probe (recipe) |
|---|---|---|---|---|
| C1 idempotent replay semantics | `called_api` | matched | correctness | differential probe, 12 cases (5) |
| C2 error object shape + codes | `called_api` | matched | correctness | contract diff, reachability check per code (5) |
| C3 validation on malformed input | `called_api` | matched | correctness | fuzzed field matrix, `--path-as-is` (5) |
| C4 list pagination contract | `called_api` | matched | correctness | cursor walk, mutation mid-walk (5) |
| C5 request latency p95 | `measured` | proxy-biased | timing | serial curl loop, n=30, cold and warm (7) |
| C6 auth failure semantics | `called_api` | matched | correctness | missing / expired / wrong-scope (5) |
| C7 duplicate in-flight request | `called_api` | matched | correctness | background fan-out, 20 at a time (5) |
| C8 integration doc | `independent_reader` | matched | other | fresh agent integrates from the doc alone (8) |

**Part C5 cannot be matched against this bar, and saying so is the point.** C5's Performance row requires the same
machine *and the same session*; C5.5 forbids calling the live bar inside the loop. Both cannot hold, so the bar-side
numbers are r0 recordings, the comparison is `proxy-biased`, and the matched latency comparison is the delta arena —
r4 against r3, alternating in one session. No load generator is installed (C5.2), so `"p99 under sustained
concurrency, no load tool installed"` sits in `not_probed` on every C5 verdict. Correctness *under* concurrency is a
different part (C7), probed with the fan-out that ships.

**C8 is deliberate: one prose part inside an engineering run.** Its modality is `independent_reader` — hand the doc to
a reader that never saw the intent and diff what that reader took away against what the doc was for. Read-aloud is not
a critic act at all (C5's Prose row removes it), so it is this verdict's `human_gate` (C1.5): the operator ran `say -o`
and `afplay` once over the two paragraphs the reader stumbled on. The reader itself caught two undocumented required
fields.

### 4. The verdict that justified the whole run

C1's part verdict is `modality: "called_api"`, `parity: "matched"`. What differs in kind from Run A is `probe_step`:
here it is a literal invocation, which is what C1.6 means by *the copy-pasteable command, not a description of one* —
and the store query that proves the side effect is a probe in its own right, since a response body alone cannot show a
double write (C5's API row).

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

`largest_gap.gap`: persist `(key, request_hash, response)` with a UNIQUE constraint on key; a replay returns the stored
response, a hash mismatch returns a conflict error — the header is accepted and ignored today, so any client retry on a
timeout double-pays a creator, and nothing else in the contract matters until this holds. `not_probed` ran to four
entries: replay across a process restart, key expiry, replay after a partial write, replay-path latency.

### 5. Rounds, and how it ended

| R | What changed | Panels | State after |
|---|---|---|---|
| r0 | 7 bar transcripts + 30 timings recorded once. Unassisted pass tagged `gauntlet-r0`. | — | comparand exists |
| r1 | Baseline probes against both systems. | **Blindness broken, below — 11 verdicts voided.** After the re-judge: `k_X` **0 of 5**; `k_D` 5 of 5. C1 as above. Part C5 p95 **412ms warm / 604ms cold** against the r0 recording's 96 / 141 | `dry = 0`. C8 does not exist |
| r2 | Idempotency table + UNIQUE key; typed error objects; scrubber frozen into `probes/`. | `k_D` 4 of 5. C7: the 20-way fan-out produced 2 rows — the UNIQUE violation was caught and swallowed as success. C2: codes copied in shape, 3 of 11 unreachable. p95 **210ms** | new `open` rows → not dry. `dry = 0` |
| r3 | Serialize duplicates on the key; error-code table pruned to reachable codes; docs generated from the transcripts. | `k_D` 4 of 5. C7 0 duplicates across 10 runs of the fan-out (200 calls). C8 integrated in one attempt after 2 doc fixes. p95 **163ms** | `dry = 0` |
| r4 | Query-plan work: composite index, dropped an N+1 on creator lookup. | `k_D` 3 of 5. p95 **148ms**; the delta panel has never once picked ours on latency | Remaining 0.28M < one round's 0.41M, and 3 agent-runs < 14 → **ABORT, clause 1** |

**What went wrong, and how the system caught it.** In r1 the comparison was not blind. Our responses carried
`X-Powered-By: Express` and `pr_`-prefixed ids; the bar's carried its own version header and prefixes. The r1 critics
said so in the one field C1 gives them — `blind_integrity: "compromised"` — and the round-close agent recorded the tell
in `r1/report.md`, where a note belongs, since the schema has no field for it and inventing one is what C1.1 forbids.
The orchestrator **voided all 11 affected verdicts** (5 crossing, 6 `called_api` parts) instead of accepting them;
`probes/scrub.mjs` was written, frozen into `probes/`, and the panels re-spawned. C2's part came back **the other
way**: the compromised panel had split 3–2 for the artifact it recognised as ours, and the clean blind panel went to
the bar 0 of 5. Self-declared blindness is one enum field, and it caught real critic capture here.

- **Clause 1, reported with the word *abort*.** 77 of 80 agent-runs and 1.42M of 1.7M output tokens were spent closing
  r4; the next round needed 0.41M and 14 runs. Resume handle in `run.json`. Per C2.6 the resume re-reads `bar.sha256`,
  `launch-prompt.md` and `run.json`, verifies the hash and starts a **new** Workflow from r4's state —
  `resumeFromRunId` is same-session only, so it is not what gets used the next morning, and nothing here advertises
  that it is.
- **Not a completion, and the numbers show the difference.** The delta panel was still picking our new artifact 3 of 5,
  and three consecutive rounds of real gain (412 → 210 → 163 → 148ms) were running when the money ran out. A collapse
  stop would have said the opposite. Advisory-clear: C1, C2, C3, C4, C6, C7, C8. Part C5 never won a panel.
- **Honest gap.** p95 **148ms warm against 96ms — 1.54× slower**, n=30 each, on one MacBook Pro M4 Max; cold 231ms
  against 141ms. The bar's figures are r0 recordings, so that comparison is proxy-biased by C5's same-session
  requirement: a standing gap, never a panel loss. `p99 under sustained concurrency` is not probed and no load tool is
  installed — implying that coverage would be the exact modality lie this system exists to prevent. The profile names
  where the 52ms lives: **41ms in per-request connection acquisition** (no pooled connection string) and **29ms in
  cold-path schema validation**, which overlap, hence the sum past 52. Both are infrastructure changes the operator
  declined inside this run. Correctness is the part that mattered and it stands at 12 of 12 differential cases behind
  a UNIQUE constraint — the double-payout path found in r1 cannot recur.
- **Spend.** Per round r0 5 · r1 30 (19 + 11 re-judges) · r2 14 · r3 14 · r4 14 = 77, and 0.06 · 0.62 · 0.28 · 0.26 ·
  0.20M = 1.42M. Builders Sonnet 5, critics Opus 5, probe runners Haiku 4.5, every model set at spawn (F22).

---

# What generalised across the three runs

| Move | Evidence it earned its place |
|---|---|
| Interrogate the bar before writing the prompt | Run A: CoD would have handed every critic a screenshot and reproduced 27 → 43. Run B: the nearest-domain candidate was weakest at the judged property. |
| Split the bar when no single artifact dominates both halves | Run B: Stripe for information, Linear for interaction, and no critic argued about the target again. A split bar still buys only one modality phrase. |
| Register a modality **and a defect class** per part, and void mismatches | Run A r2: two still-image verdicts on a behavioural dimension, voided by one string comparison and re-judged. Run A A7: the same rule is why an audio part is open instead of passed. |
| Say which half of a modality the harness can decide | Run A: frame times left every verdict and became candidate-side evidence. Run B: freezing the bar made every driven verdict proxy-biased, and the run said so. Run C: the bar's latency figures are r0 recordings, so that comparison can never cross. |
| Let the panel end the run, not the operator's patience | Run A stopped on two dry rounds; Run B on one dry round the panel spent picking the *previous* artifact, and rolled back — an outcome no "are we still improving?" judgement produces. Run C spent 96% of its ceiling, never won a latency panel, and is reported as an abort. |

Termination appears in exactly one place per run: the `/gauntlet` gate, printed to the operator. It is in no header, no
launch prompt and no role prompt, and no model in any of these three runs saw it. None of these emissions has been
through the blind A/B tournament against the baseline prompt, so nothing here claims the baseline has been beaten
(C5.6).

**Two checks on this file, and two rules that must not be pointed at it.** `jq 'paths(type=="number")'` over the
sample verdict is empty, per C1.3; `wc -w` on the three prompts gives 145, 148 and 145, under C4.1's ceiling. Then the
two scopes that matter, because a rule condemning correct output is the broken half: invariant 5's *number beside
`round`* grep covers prompts and the Workflow script, not reference files, and this one is full of round numbers by
design; and C3.6's provenance grep reads prose fields only, since every `probe_step` above carries an absolute arena
path because C1.6 requires a runnable command, so a bare `/Users/` pattern over a whole verdict would void three
correct records.
