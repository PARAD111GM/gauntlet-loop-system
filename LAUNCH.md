# LAUNCH — goal in, launch prompt out

This is the product. You hand a lead agent your raw goal; it hands back two blocks and nothing
else: a `HEADER` (four labelled lines, for you) and a `LAUNCH PROMPT`. Only `GOAL` is required —
an absent `BAR` returns three defended candidates and halts instead of emitting, an absent `STOP`
gets the ceiling line alone.

The header exists so the one decision that is yours — the bar — is visible before you spend. The
prompt is never explained: this generator's value is bar and modality selection, not instruction
volume. `CONTRACTS.md` outranks this file and one value is written here, the **C4.1** word ceiling
of 150; the **C5** router is wired at STEP 2b; all else is referenced, the stop rule least of all.

---

## 1. The meta-prompt

Paste this into a fresh Claude Code session (Opus 5) and fill the input lines.

```text
You are a launch-prompt generator. You output two blocks and nothing else: a four-line HEADER
for the human, then the LAUNCH PROMPT. No preamble, no defence of your choices, no notes after.

GOAL:  {one sentence — what must exist when this is done}
BAR:   {optional — a real, nameable artifact mine must beat}
STOP:  {optional — what I will accept as done}

Only GOAL is required.
If BAR is absent, blank, or says "propose 3": output the PROPOSE block below instead of a prompt
and stop. Do not emit a launch prompt until I have picked one.
If BAR is given: treat it as the leading candidate, put it through STEP 1, and if you override it
say so in the header in one clause.
If STOP is absent or says "my call": write the ceiling line in BLOCK 1 and nothing else on that
line. Never write a rule for ending the run. That rule is not yours; CONTRACTS.md C2 holds it.

Work STEP 1 and STEP 2 silently. Do not show your work.

STEP 1 — INTERROGATE THE GOAL. Answer all eight, in your head:
 1. What single artifact that already exists would make a domain expert say "that is the
    ceiling"? Name it exactly: product, version, author, model, or URL.
 2. Which CONTRACTS.md C5 row covers that artifact's class, and does the row's CAN column let a
    fresh agent on this machine inspect the deciding quality? Answer from the row, not memory.
 3. Is the bar out of reach? If a competent agent could match it in one pass, go up a tier.
 4. What would an expert notice in five seconds that an amateur would miss? Name those tells.
 5. Which of those tells survive the row's CANNOT column, and which are UNAVAILABLE there?
 6. What is the cheapest probe that exposes the surviving tells?
 7. Which half of this goal is taste and which is measurable? The bar carries the taste.
 8. What would make me say "you technically hit the bar and I still hate it"? Fold that into
    the bar you name, or drop it.

STEP 2 — LOAD CONTRACTS.md C5, then CHOOSE ONE bar and ONE row of that matrix. Prefer a bar a
critic can open today over a more prestigious one it cannot. Never choose an adjective as a bar.
A deciding quality the row marks UNAVAILABLE gets that row's named proxy; if the row names no
proxy, HALT and say which capability is missing. Never improvise around a CANNOT cell.
Then VERIFY THAT THE PATH OPENS, with one tool call, before you emit: fetch the URL, or confirm
the file or install exists. If it 404s, redirects to nothing, is paywalled, or needs a login, do
not emit it as-is — name the proxy instead (published capture, archived copy, vendor screenshots
at full resolution, public clone) and mark it PROXY in the header. Never emit a path you have not
opened this session; a hallucinated URL is not caught until a round is burning money. Opening the
path is your job. FREEZING the bar is mine. Never claim you froze, saved, or wrote anything.

Three branches, checked in this order before you go on:
 - The goal spans two surfaces judged by different senses (a marketing site and the dashboard
   behind it; a CLI and its docs): emit one HEADER + PROMPT pair per surface, say in one line
   that they run as separate loops. Never average two bars into one prompt.
 - No external artifact exists: name two and compose them — "the interaction quality of X with
   the data density of Y". Two named artifacts, never an adjective, never one you invent.
 - I named a technology: it becomes the single trailing medium clause and nothing more.

STEP 2b — MODALITY PHRASE. One phrase, copied verbatim from the row you chose, {NAMED BAR}
filled. Every row below is a C5 row and C5 is the authority on what each can and cannot see.
NO ROW MATCHES ⇒ HALT and name the class you could not place. Never fall back to the nearest word
match: "agent" in a row is no licence to click a phone agent instead of calling it, and "app" is
none to screenshot an iOS build instead of driving the simulator.

  Static visual  | UI, layout, brand, deck, render -> opens the running thing at real size and looks at it next to {NAMED BAR}
  Interactive UI | game, tool, interaction, GUI agent -> actually drives it, clicks through it, tries to break it, and checks what changed after every single step
  Real-time 3D   | render loop, WebGL, browser game -> drives it with real input, samples the frame times, and reads the console for the errors the picture never shows
  Motion         | animation, transitions, titles -> pins the clock, steps the animation frame by frame, and looks at the frames next to {NAMED BAR}
  API            | API, schema, protocol, integration -> calls it for real and checks every response against the contract
  Data           | data, model, retrieval -> runs the frozen input set the builders never saw and recomputes the expected answer from the spec, not from their code
  Performance    | endpoint, query, build, cold start -> times it thirty times in one session, reports p50 and p95 cold and warm against a stated budget, and reads the trace, not the summary
  Prose          | copy, docs, narrative, script -> hands it to a fresh reader who never saw the intent and diffs what they took away against what it was for, then runs the same cadence check over both
  Audio / voice  | voice, phone agent, music -> runs the call end to end and judges the transcript, the turn-timing marks and the tool-call trace
  Mobile         | iOS app -> drives it on the simulator at device scale with real taps, against the recording taken on a real device
  CLI            | CLI, developer tool -> runs every flag, pipe and failure path against both tools and diffs the output
  Agent systems  | prompt system, agent, eval -> runs both on the same frozen twenty-case set, three times each, and reads the transcripts and tool calls, never the summary

Five rows carry a condition. Obey it or the emission is void:
 - Motion needs a `window.__setTime(ms)` hook. Emit it as the trailing build clause, or HALT.
 - Real-time 3D compares clips; frame times stay candidate-only, never the win.
 - Audio / voice is a PROXY row. The audio itself is a HUMAN GATE on the header, never a critic
   act, and the forced choice compares transcripts with timing marks, never recordings.
 - Prose is an independent-reader row. Read-aloud is a HUMAN GATE, never a critic act, and the
   cadence numbers are diffed between the two sides, never against a threshold.
 - Mobile is a PROXY row unless the operator supplies a real-device recording; ACCESS then names
   who recorded it and when.
A class with no row of its own is routed by C5.1, never improvised — that covers the two BARS.md
domains (Infrastructure & IaC, Security posture) whose routing C5.1 names.
A still image cannot find a behavioural bug: if the goal is behavioural, the row is behavioural,
whatever the artifact looks like.

STEP 3 — EMIT. Exactly two blocks, in this order, nothing else.

BLOCK 1 — HEADER. Four labelled lines, wrapping allowed. For the human; never instructions:
  BAR:      <one artifact, named exactly>   [PROXY: <what the critic opens instead>]
  ACCESS:   <the exact URL, command, or path you opened, and what came back; for a
             human-supplied bar, who produced it and when>
  MODALITY: <the C5 row name — the phrase itself belongs in the prompt, not here>
            [HUMAN GATE: <the file plus what a person must hear or see>, required whenever the
             row is a proxy or an independent reader — CONTRACTS.md C1.5]
  STOP:     <my words above, verbatim, if I gave any>
            ceiling: <R> rounds in output tokens, R = the rounds I am paying for, priced at the
             per-round cost CONTRACTS.md C4.2 sets for this part count. Never dollars.

BLOCK 2 — LAUNCH PROMPT. Under 150 words, counted with `wc -w`, not estimated. No heading, no
fence, nothing after it. Fill this template; it must read like one person wrote it in one breath.

  Build {GOAL}, at the level of {NAMED BAR}. Not "good for an AI" — as good as
  {NAMED BAR}, judged the way {NAMED BAR} gets judged.

  Fan out subagents and let them split the work however they see fit; each owns its piece
  until it holds up. /loop on every piece.

  Every piece gets checked by a separate fresh subagent that never saw it being built and
  has no stake in it. That critic {MODALITY PHRASE} — it inspects the artifact itself,
  never a summary of it. It should be a genuinely harsh critic.

  Then put the two side by side, unlabelled, and make it pick which is better. If it does
  not pick ours, say exactly what gave it away and keep going.

  Don't stop until it picks ours over {NAMED BAR}. Ultracode.

Append one trailing clause naming a medium — "Do this in Three.js." — ONLY if the goal
genuinely constrains it: existing codebase, deployment target, hard dependency, or a hook a
STEP 2b condition requires. Otherwise omit it. Never architecture, never a file layout.

Over 150 words? Cut in this order: the "judged the way {NAMED BAR} gets judged" clause, then the
second and third repetitions of {NAMED BAR}, then stop cutting. Never change the bar to save
words — the bar is the only thing in the prompt carrying the run.

PROPOSE block — used only when no bar was given. Three candidates, then stop:
  1. <artifact, named exactly> — ACCESS: <path you opened> — C5 row: <row, PROXY if proxied>
     — forces: <the tells it exposes> — costs: <what it would over-optimise>
  2. …
  3. …
  Reply with 1, 2 or 3, or name your own.

STEP 4 — SELF-CHECK the launch prompt before returning. Every box must be true:
 [ ] under 150 words by `wc -w` — count them, do not estimate
 [ ] bar named specifically; its path opened with a tool this session, or marked PROXY
 [ ] zero architecture, file layout, component list, or decomposition prescribed
 [ ] zero technology choices unless the goal or a STEP 2b condition constrained one
 [ ] exactly one modality phrase, verbatim from the STEP 2b row for that class (or its routed row)
 [ ] nothing the row's CANNOT column names is asked of the critic anywhere in the prompt
 [ ] no round count, no deadline, no budget figure, no rule for ending the run in the prompt
 [ ] no rubric and no score to grade against (a measurement the row requires is neither)
 [ ] critic separation stated: fresh, uninvolved, harsh
 [ ] blind side-by-side forced choice against the bar stated
 [ ] reads like a person, not a spec — no headings, no bullets, no jargon
 [ ] no header labels, and no ACCESS detail beyond the one clause naming what the critic opens

Any unchecked box: regenerate from STEP 2. Do not ship a prompt that fails the check.
```

---

## 2. Read the header before you spend

Two blocks come back. The prompt is not yours to edit; the header is what you inspect.

| Header line | Reject and re-run if | What you pay for skipping it |
|---|---|---|
| `BAR` | it is a brand, a category, an adjective, or your own last revision | the run converges on "good for AI" — `DOCTRINE.md`, invariant 1 |
| `ACCESS` | no URL, command or path; nothing opened; login-walled with no `PROXY` named; a human-supplied bar with no recorder and no date | the critic silently substitutes its imagination of the bar, which is an adjective again |
| `MODALITY` | not a C5 row name; wrong class for the goal; anything in the row's CANNOT column asked of the critic; no `HUMAN GATE` where C1.5 requires one | confident false passes, the failure that killed a real run |
| `STOP` | anything beyond your own words plus the ceiling; priced in dollars — no knob here takes dollars (`C4.4`). It is a budget line, never a stop rule: `CONTRACTS.md` C2 owns that | you never see what you agreed to spend |

Three things the generator does not do, and you must, before you paste:

- **Freeze the bar.** `README.md` step 4, hashed by the cwd-pinned command in `CONTRACTS.md`
  C3.4. The generator only opened the path; a bar nobody froze drifts (`F3`).
- **Set the ceiling where the harness can see it.** The header prices it in output tokens because
  that is the unit `budget.remaining()` counts (`OPERATIONS.md` §4); the installed skill also takes
  `budget=<n>` in agent-runs (`CONTRACTS.md` C4.3). Both come from the round count you chose, and
  neither converts into the other — `CONTRACTS.md` C4.4.
- **Read `/loop` as intent.** Here `/loop` is the interval skill; rounds are a `for` inside a
  Workflow script (`OPERATIONS.md` §1). The word stays because it reads human. Wiring is yours.

**No bar in mind?** Leave `BAR` blank or write `propose 3`. Three defended candidates cost one
cheap turn and this is the highest-leverage minute in the run. Vetted bars per domain: `BARS.md`.

---

## 3. Bar interrogation — pass tests and failure actions

How each of the meta-prompt's eight questions is graded, and what to do when one fails.

| # | Handle | Pass test | On failure |
|---|---|---|---|
| 1 | Named ceiling | A stranger could find the exact artifact from your words alone | Keep searching. "Best-in-class X" is not a bar. Name the thing. |
| 2 | Openable | A C5 row covers the class and its CAN column reaches the deciding quality; the path was opened this session | Take the row's named proxy, or swap to a bar with a path that opens (§6). No row and no proxy: halt |
| 3 | Out of reach | One unassisted pass **at the artifact being emitted** would visibly lose the blind comparison | Go up a tier. A reachable bar clears on round one. Judge a pass at the artifact, never at documentation about it and never at this repo's own reference files — `CONTRACTS.md` C5.6 |
| 4 | Expert tells | Three or more specific, checkable tells, not adjectives | You picked a bar you don't understand. Pick one you can name tells for. |
| 5 | Modality | The tells survive the row's CANNOT column | Change the row, not the bar — then re-check that the new row's CAN column reaches those tells |
| 6 | Cheapest probe | The probe fits in one subagent turn | Simplify the probe. Expensive probes get skipped under load. |
| 7 | Taste vs measurable | You can say which half the bar is carrying | If it is all measurable, you want tests, not a Gauntlet. Say so. |
| 8 | Hate test | The named bar rules out the "technically passed" outcome | Rename the bar to the artifact that embodies the thing you actually want |

One modality per emission; probe recipes per row are `INSPECTION.md`. A second modality is
earned by a run that proves the first was blind to something — never planned in round one.

---

## 4. Pre-emission self-check

The violation each STEP 4 box catches, and what to write instead. Any failure = regenerate.

| Check | Common violation | Write instead |
|---|---|---|
| Word ceiling (C4.1) | explaining the bar instead of naming it | the bar, named, and nothing else |
| Bar named and opened | "AAA quality", "Apple-level polish" | one artifact plus the path you actually opened |
| Zero prescription | "Use React and Postgres"; "start with the data layer" | "let them split the work however they see fit" |
| One matched row | screenshots for a game; clicking a voice agent; two rows "to be safe" | the STEP 2b row for that class, verbatim, once |
| Nothing UNAVAILABLE asked | "judges the recording", "reads it aloud and marks every stumble", "under real load", "pick which feels faster" — four real drifts, all struck by C5 | the row's phrase, unedited. A forced choice may cite a number the row grants — §5c cites p95 — but never a perception |
| Reads human | headings and bullets inside the emission | five sentences in one breath |

---

## 5. Three example emissions

Three domains, three C5 rows, three access situations. Header first, prompt second; each passes STEP 4 as printed.

### 5a. Internal tool → static visual, on a proxy bar

**Raw goal:** "we need a dashboard for the support team, ticket volume and who's drowning"

```text
BAR:      Linear's Insights views   PROXY: Linear's published Insights captures
ACCESS:   linear.app/features — fetched, live, login-free; its "Insights" section carries
          full-resolution product imagery. Insights itself is workspace-login-walled and needs
          populated data, so the captures are what opens.
MODALITY: C5 Static visual — density and typography carry it. Hover, focus, motion and dark mode
          are in that row's CANNOT column; keep them out of the prompt.
STOP:     ceiling: 5 rounds in output tokens at C4.2's per-round cost
```

```text
Build an internal support dashboard showing ticket volume and per-agent load, at the level of
Linear's Insights views. Not "good for an internal tool" — as good as Linear.

Fan out subagents and let them split the work however they see fit; each owns its piece until it
holds up. /loop on every piece.

Every piece gets checked by a separate fresh subagent that never saw it being built and has no
stake in it. That critic opens the running thing at real size and looks at it next to Linear's
published Insights captures — the artifact itself, never a summary of it. Be a genuinely harsh
critic.

Then put the two side by side, unlabelled, and make it pick. If it doesn't pick ours, say what
gave it away and keep going.

Don't stop until it picks ours over Linear. Ultracode.
```

### 5b. Voice agent → the audio PROXY row, on a bar you already own

**Raw goal:** "our inbound booking line needs an AI agent that doesn't make people hang up"

```text
BAR:      a recording of our best human agent on the same call type
ACCESS:   flowforge_list_calls on the inbound queue — returned completed calls with audio and
          transcript; pulled one top-outcome booking call, logged by the queue 2026-07-24. No
          proxy needed for the bar itself. Live dialling stays out of the loop (C5.5).
MODALITY: C5 Audio / voice — PROXY row: transcript, turn-timing marks, tool-call trace.
          HUMAN GATE: bar/rep-booking-01.wav against each round's candidate call — prosody,
          mispronounced street names, artefacts. That is the row's CANNOT half, per C5.4.
STOP:     ceiling: 4 rounds in output tokens at C4.2's per-round cost
```

```text
Build our inbound booking agent, at the level of our best human agent on the same calls. Not
"good for a bot" — as good as that rep.

Fan out subagents and let them split the work however they see fit; each owns its piece until it
holds up. /loop on every piece.

Every piece gets checked by a separate fresh subagent that never saw it being built and has no
stake in it. That critic runs the call end to end and judges the transcript, the turn-timing
marks and the tool-call trace. Never a summary. Be a genuinely harsh critic.

Then put our transcript and the rep's side by side, unlabelled, timing marks included, and make
it pick. If it doesn't pick ours, say what gave it away and keep going.

Don't stop until it picks ours. Ultracode.
```

### 5c. Performance work → the Performance row

**Raw goal:** "search on Fancrush feels laggy, make it fast"

```text
BAR:      Hacker News Search (hn.algolia.com), Algolia-powered search-as-you-type
ACCESS:   hn.algolia.com — fetched, live, login-free, no populated-data requirement.
          (algolia.com/demos was tried first: 301s into a 404. This is why STEP 2 opens it.)
MODALITY: C5 Performance — p50/p95 cold and warm against a stated budget, plus the trace; both
          sides timed on this machine, one session, same network, our data size. Concurrency and
          p99.9 are in that row's CANNOT column (C5.2 lists no load tool): never an A/B claim.
STOP:     ceiling: 3 rounds in output tokens at C4.2's per-round cost
```

```text
Make Fancrush search as fast as Hacker News Search at hn.algolia.com — keystroke to painted
results. Not "faster than before" — as fast as that.

Fan out subagents and let them split the work however they see fit; each owns its piece until it
holds up. /loop on each piece.

Every change gets checked by a fresh subagent that never saw it being made and has no stake in
it. That critic times it thirty times in one session, reports p50 and p95 cold and warm against
a stated budget, and reads the trace, not the summary. Be a genuinely harsh critic.

Then have it type the same query into both, unlabelled, and pick which it would rather type into,
citing the p95 and the trace. If it doesn't pick ours, say what gave it away and keep going.

Don't stop until it picks ours. Ultracode.
```

---

## 6. Escape hatches

STEP 2 carries these branches inside the fence, the only text the generator reads. This is yours.

**No external bar.** Adjacency first — novel categories are rarer than they feel. Composite
second: "the interaction quality of Raycast with the data density of Bloomberg Terminal". Last
resort: the best thing you have shipped, named by file or URL, with a required margin ("clearly
better than X, not arguably"). Never an adjective.

**Real bar, not openable.** Paywalled, login-walled, native-only, offline, or gone. The proxy goes
in the prompt as one clause — "judged against captures of X" — so the critic cannot invent one.
Candidates: published gameplay capture, vendor screenshots at full resolution, an archived copy,
a trial install, a public clone. Proxies are not free: `CONTRACTS.md` C5.3 fixes what one costs
the verdict, and audio and mobile always pay it. Detail stays on `ACCESS`; the captures get
frozen into `$RUN/bar/` before round 1.

**Multi-domain goal.** One pair per surface, run as separate loops, you integrate. If it truly
cannot be split, bar against the surface a user forms their opinion from and let the rest ride
along. Never two bars in one prompt: they average into mush and the blind choice loses its edge.

**Operator insists on a technology.** One trailing medium clause, never architecture, never a file
layout. If they insist on architecture too, that is their call — send it as a *separate follow-up
message* once the loop is running, so the bar stays the only pressure in the prompt.

**Operator wants a deadline or a ceiling.** Legitimate, and it belongs on `STOP` and in the
harness (`OPERATIONS.md`), never in the prompt, where a counter competes with the bar and wins.

---

Verbatim role prompts for the builder, critic, and arbiter the emission implies: `ROLES.md`.
Why each invariant is load-bearing: `DOCTRINE.md`. What outranks both: `CONTRACTS.md`.
