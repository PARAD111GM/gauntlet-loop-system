# THE GAUNTLET — one page

Goal in, launch prompt out. Everything else in this repo is history; this is the part that earned
its keep. Four steps, about two minutes.

**Prefer to click?** `gauntlet.html` in this repo is the same four steps as a working tool: it
detects the axis verb as you type, filters bars by axis, blocks the emit until all four bar gates
are checked, and shows a live word count against the 150 ceiling. The skeleton is 128 words, so a
real goal lands around 147.

The loop you are writing a prompt for: agents build, a **fresh** agent judges the artifact blind
against a **named real thing**, you repeat until it wins. The prompt is short on purpose — the
model's judgment is the asset, and every sentence you add spends it.

---

## STEP 1 — Find the axis. Do this BEFORE you open the bar list.

**Read the verb in your goal, not the noun.** This is the one step that decides the run, and it is
the step that failed in testing.

> *Teach* how attention works → the ceiling is **Ciechanowski**, a teaching artifact.
> *Visualise* how attention works → the ceiling is **Transformer Explainer**, an exploration tool.

Same subject. Different ceilings. We benchmarked a *teaching* page against an *exploration* tool
and lost a blind comparison to a 120-word prompt that picked the teaching bar. Three more:

| Goal | Domain bar (wrong) | Axis bar (right) | Why |
|---|---|---|---|
| double-entry ledger API | Stripe API | **Modern Treasury Ledgers** | Stripe moves money but isn't a ledger — no balance invariants |
| skateboarding game | Doom (2016) | **Skate 3** | Doom's axis is encounter pacing; yours is board feel |
| memo arguing a position | Bezos letters | **Stratechery** | Bezos has no opposing camp; argument needs one |

Write one sentence: **"The quality that decides this is ___."** If you can't, you aren't ready to
pick a bar — you're ready to go find one.

---

## STEP 2 — Name the bar

Pick the real artifact that is the ceiling **on that axis**. It must be:

- **External** — nobody in the run authored it
- **Openable** — a fresh agent can actually fetch, run, or read it *this session*. Check now. An
  auth-walled reference produces fabricated verdicts.
- **Named** — a specific thing, not a category. Not "a great dashboard." Stripe's billing dashboard.
- **Out of reach** — one unassisted pass should lose to it badly. A bar you can hit stops pushing.

| Axis | Default bar |
|---|---|
| Teaching / explaining | Ciechanowski · Distill.pub |
| Data exploration tool | Transformer Explainer · Observable |
| Product UI, dense/tabular | Stripe Dashboard · Linear |
| Marketing site | Stripe · Vercel · Apple product pages |
| Real-time 3D, feel | Skate 3 · Mirror's Edge (movement) |
| Real-time 3D, spectacle | Doom (2016) · Control |
| API ergonomics | Stripe API · GitHub REST |
| Ledger / money correctness | Modern Treasury Ledgers |
| Argued prose | Stratechery · a named New Yorker piece |
| Reference prose / docs | Stripe Docs · Django docs |
| CLI | `gh` · `rg` · `fd` |
| Data pipeline | dbt project conventions · the spec itself |
| Mobile app | Things 3 · Apple's own apps |
| Voice agent | a named competitor's line **(see modality note)** |

**Two artifacts = two axes.** Never average them into one comparison; that is what kills the
pressure. Run one, then the other.

**No public bar?** Commission one: a fresh agent, told nothing of your plan, builds the reference.
Best of three, frozen before round one. Log it as synthetic — beating it is necessary, not
sufficient, and it can never count as "we cleared the bar."

---

## STEP 3 — Pick the modality phrase

A screenshot cannot find a behavioural bug. Copy the phrase for your artifact class **verbatim**
into the prompt; it is the difference between a critic that checks and one that guesses.

| Artifact | Phrase for the critic |
|---|---|
| Static visual | *views it at the sizes it will actually be seen at and reads the rendered result, not the source* |
| Interactive UI | *actually drives it, clicks through it, tries to break it, and checks what changed after every single step* |
| Real-time 3D | *drives it with real input, samples the frame times, and reads the console for the errors the picture never shows* |
| API / service | *calls it for real and checks every response against the contract* |
| Data | *recomputes the answers from the spec on inputs the builders never saw* |
| Performance | *runs it thirty times cold and warm on one machine and reports p50 and p95* |
| Prose | *hands it to a fresh reader who never saw the intent and diffs what they took away against what it was for* |
| CLI | *runs every command against both and diffs the output* |
| Agent / prompt system | *runs a frozen twenty-case eval three times and reports pass@k* |

**Three that can't be judged as-is** — say so in the prompt rather than letting an agent fake it:

- **Audio / voice** — the critic *cannot hear*. It gets transcript, turn timing and tool-call trace
  only. Timbre and prosody go to you, by hand. Never ask an agent to compare recordings.
- **Motion** — only judgeable if the build exposes a `window.__setTime(ms)` hook. Without one, ask
  for the hook or drop the claim.
- **Mobile** — the simulator is fine for your side; the bar half needs a real-device recording you
  capture first. Simulator timings are never device timings.

---

## STEP 4 — Emit

Fill four slots. Keep it under 150 words. Add nothing else.

```
Build {GOAL}, at the level of {BAR}. Not "good for a {CATEGORY}" — as good as that.

It has to cover {THE 3-5 HARD PARTS}, including the states nobody screenshots.

Fan out subagents; let them split the work however they see fit. /loop on every piece.

Every piece is checked by a fresh subagent that never saw it built and has no stake in
it. That critic {MODALITY PHRASE} — the artifact itself, never a summary. Be a harsh
critic.

Then put ours beside {BAR}, unlabelled, and make it pick. If it doesn't, say exactly
what gave it away and keep going.

Keep going until the gap stops closing. Ultracode.
```

**The scope line is not optional.** Emissions without it lost coverage every time — the fleet builds
the invoice table beautifully and skips dunning, proration and the empty state. Name the hard parts;
do not name the architecture.

**"Keep going until the gap stops closing"** replaces *"don't stop until it picks ours."* The bar is
above your ceiling by design, so "until it picks ours" is either never satisfied or satisfied by
re-rolling the judge until one flips. Judges called that out unprompted. You stop when rounds stop
producing a real delta, or when your budget says so.

---

## Before you send it — six checks

1. Under 150 words?
2. Is the bar **named**, and did you **open it this session**?
3. Does the bar sit on the axis from Step 1, not just in the domain?
4. Is the modality phrase copied verbatim, and does the harness actually support it?
5. Did you prescribe any architecture, file layout, or library? Cut it. Name the destination only.
6. Is there a scope line naming the hard parts?

Fail any one, regenerate. Don't ship it.

---

## What this cost, so you can price the loop

Roughly 15 agents per round: builders, five judges comparing against the bar, five comparing this
round against the last, one to write it up. Around 250k output tokens a round. Three rounds is the
earliest a run can honestly settle. Set a ceiling before you launch — the loop has no natural end,
which is the point.

## The one thing that decides the outcome

Bar selection. Not the critic protocol, not the fan-out, not the round count. In every blind
comparison we ran, the better *machinery* lost to the better *bar*. Spend your two minutes on Step 1.
