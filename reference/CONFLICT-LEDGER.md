# CONFLICT LEDGER — every restatement of C1–C5, every contradiction between them

Built 2026-07-29 by reading all eleven shipped files line by line. Every citation below was opened
and read; where a wave-1 verdict cited a line that has since moved or been fixed, the correction is
stated in the entry.

`CONTRACTS.md` **does not exist yet** (`ls` confirms). This ledger is its input: for each of the
five contracts, the exhaustive site list, the pairwise contradictions, and the resolution the
contract file should freeze.

**Reading order for the author:** §0 (what wave 1 found that is already fixed — do not re-fix it),
then C2 (worst drift, 14 conflicts), C5 (widest drift, 12 conflicts and one whole domain to cut),
C1, C3, C4, then §6 (rules that condemn correct output) and §7 (harness claims that are false).

Severity key. **BLOCKER** = a compliant run crashes, voids a correct round, or terminates on a rule
the repo forbids. **MAJOR** = an operator is told two different things and cannot tell which is
normative. **MINOR** = a citation, unit, or column that will silently rot.

---

## §0. Wave-1 findings that are ALREADY FIXED — do not re-open

Six of the wave-1 verdicts cite text that no longer exists. Freezing against the verdict dossier
instead of the working tree would reintroduce all six.

| Wave-1 claim | Status | Evidence in the current tree |
|---|---|---|
| `install/SKILL.md` sibling paths (`../LAUNCH.md`) resolve wrong | **FIXED** | `grep -n '\.\./' install/SKILL.md` → no matches. `install/SKILL.md:39` now states "Paths are relative to this file's own directory". |
| `OPERATIONS.md` §5 GAIN table fails its own p ≤ 0.05 comment; unguarded `GAIN[deltas.length]` | **FIXED** | The GAIN table is gone. `OPERATIONS.md:206-217` computes a Wilson interval instead, and `:231` throws below n = 9. |
| `candAt(r, i)` called with the judge index, so a 10–0 crossing computes as 5 | **FIXED** | `OPERATIONS.md:220` is `const side = candAt(r, WHOLE)` — one arena, one side, per `:313-318`. |
| `INSPECTION.md` redefines `not_probed` as an array of objects and adds `order_swap_recheck` | **FIXED** | `INSPECTION.md:418` — "**`not_probed`** is an array of **strings**. Tightening only". `order_swap_recheck` appears nowhere in the tree. |
| `ROLES.md` ANTI-CAPTURE specifies a coin flip a Workflow script cannot run | **FIXED** | `ROLES.md:371-373` derives the side: `[ $(( (R + I) % 2 )) -eq 0 ] && CAND=A \|\| CAND=B`. `ROLES.md:29` — "Sides are derived, never drawn." |
| `FAILURE-MODES.md` assumes a plaintext verdict artifact the system never produces; F2's string-repetition signal cannot fire | **FIXED** | `FAILURE-MODES.md:14-21` is the generator that *writes* the `.md` twin, and `OPERATIONS.md:300` lists it in the layout. F2 (`:51-53`) now counts a stamped `gap_id` in `gaps.tsv`, not strings. |
| DOCTRINE's noun test condemns the product's own emissions | **FIXED** | `DOCTRINE.md:75-81` now carries a noun-class table that explicitly exempts `showing ticket volume and per-agent load` (`LAUNCH.md` §5a, shipped). All six shipped emissions pass. |

Also verified sound and worth protecting: DOCTRINE's rule-(a) binomial table (`DOCTRINE.md:324-330`)
is **exactly right** — recomputed every cell, `n=5/k=5 p=0.0312`, `10/9 = 0.0107` with `10/8 = 0.0547`,
`15/12 = 0.0176`/`0.0592`, `20/15 = 0.0207`/`0.0577`, `30/20 = 0.0494`/`0.1002`. And OPERATIONS'
Wilson comment (`:204-205`) is true to the digit: `wilson(4,9) = [0.1888, 0.7334]`,
`wilson(6,15) = [0.1982, 0.6425]`, `wilson(14,30) = [0.3023, 0.6386]`, `wilson(12,18) = [0.4375, 0.8372]`.
The `band()` function reproduces DOCTRINE's collapse zones at n = 9/15/21/30 correctly, including the
tight case: `wilson(3,9)` upper bound is `0.6458`, which really is `< MIE 0.65`.

---

# C1 — THE CRITIC VERDICT SCHEMA

## Sites where C1 is stated, defined, or depended on

**Normative owner today:** `ROLES.md:218-252` (the JSON schema plus the join). It says so itself at
`ROLES.md:241` — "This schema is the critic's whole reply".

| File | Lines | What it does with C1 |
|---|---|---|
| `ROLES.md` | 218-238 | The schema. `required`: dimension, modality, probes_run, observations, choice, margin, largest_gap, not_probed, blind_integrity |
| `ROLES.md` | 241-252 | Supersession claim + the `choice`→`critic_choice` join |
| `ROLES.md` | 94-104 | Orchestrator schema — `critic_choice` enum, `largest_gap` as a **string**, `rounds_without_gap_movement` |
| `ROLES.md` | 21 | `{{COVERED_MODALITIES}}` = "Every `modality` + `probes_run` value" |
| `ROLES.md` | 172, 188, 191-193, 397, 399-400 | Prose rules on `blind_integrity`, `choice: null` + `blocker`, `not_probed`, feedback = `largest_gap.gap` only |
| `ROLES.md` | 286-296, 332-341 | Arbiter and red-team schemas (separate contracts, no conflict found) |
| `INSPECTION.md` | 412-450 | "Verdict contract" — tightens `not_probed`/`order_swap`, adds `recipe_class`, `parity`, `budget_checks`, mandates `probe_step` carry the command |
| `INSPECTION.md` | 14-15, 33-34, 395-398 | `not_probed`, `parity: "proxy-biased"` as gating rules |
| `FAILURE-MODES.md` | 9-29 | The flattening generator and the `.md` footer contract |
| `FAILURE-MODES.md` | 94-101, 129-132, 139-142, 152, 161-167, 175, 185-191, 199-201, 228, 284 | Detection signals reading `choice`, `blocker`, `modality`, `probes_run`, `observations`, `blind_integrity`, `order_swap`, `critic_choice`, and a **score** |
| `FAILURE-MODES.md` | 383-388 | Round-close audit `jq` over the JSON |
| `OPERATIONS.md` | 75, 299-333 | `schema: VERDICT`, the `.json` as "THE AUTHORITY", the `.md` footer table, who writes each line |
| `OPERATIONS.md` | 221, 232 | `v.choice === side` — the only place `choice` is consumed by code |
| `BARS.md` | 457-467 | **A second, plaintext verdict contract** with `BLIND RESULT` / `MIMICRY FINDINGS` / `VERDICT: pass \| pass-with-mimicry \| fail` |
| `BARS.md` | 410-411 | `indistinguishable` twice → escalate |
| `EXAMPLES.md` | 26-33, 143-159, 298-315, 454-470 | Three "verbatim" verdicts plus a claim about what the schema contains |
| `EXAMPLES.md` | 114-116, 130 | Orchestrator state fields; a composite `modality` value |
| `install/SKILL.md` | 98, 136 | "a null verdict treated as FAIL"; forced choice with `candAt` sides |
| `README.md` | 108-121 | Diagram: "forced A/B, unlabelled… no rubric. no numeric self-score." |
| `DOCTRINE.md` | 256-270 | Non-negotiables a judgment must satisfy — the schema's parent requirements |

## C1-1 — `not_probed` is a string in all three EXAMPLES verdicts (BLOCKER)

`ROLES.md:235-236`:
> `"not_probed": {"type":"array", "minItems":1, "items":{"type":"string"}, …}`

`EXAMPLES.md:158`, `:314`, `:469` — all three:
> `"not_probed": "melee contact behaviour, audio telegraphing, behaviour above 40 actives, anything visual",`

Consequence, using the repo's own rule: `OPERATIONS.md:60` — "**A null verdict is a FAIL, never an
absent one.**" A `schema`-validated return that fails validation comes back `null`, so every verdict
a reader copies out of EXAMPLES burns and voids its round.

**Resolution.** C1 freezes `not_probed` as `array<string>, minItems 1`, each string ending in the
covering recipe (`INSPECTION.md:418-419`). Rewrite all three EXAMPLES verdicts as arrays.

## C1-2 — the critic writes `order_swap` in all three EXAMPLES verdicts (BLOCKER)

`ROLES.md:237`:
> `"order_swap": {"enum":["not_run","same","flipped"], "description":"critic always writes not_run; the orchestrator sets same|flipped on the joined pair"}`

`ROLES.md:210-211` puts the knowledge required to fill it on the Forbidden list: "the round number …
whether a swapped twin of this judgment exists". `INSPECTION.md:420-423` agrees verbatim.

`EXAMPLES.md:159`, `:315`, `:470` — all three critic returns end:
> `"order_swap": "same" }`

A critic that can write `same` has seen its twin, so `blind_integrity` is a lie in the same object.

**Resolution.** C1 states the field is orchestrator-written and critic-blank. EXAMPLES' verdicts drop
it; the `LEDGER` blocks below each verdict (`EXAMPLES.md:166-168`, `:319-321`, `:473-475`) are the
right place for it.

## C1-3 — EXAMPLES asserts a checkably false fact about the schema (MAJOR)

`EXAMPLES.md:26-28`:
> "plus the two keys `INSPECTION.md`'s verdict block requires and that schema does not list:
> `not_probed` and `order_swap`."

`ROLES.md:219-220` lists `not_probed` **in the `required` array**; `ROLES.md:237` defines
`order_swap`. Both are in the schema. The false statement is what licenses C1-1 and C1-2.

**Resolution.** Delete the sentence; replace with "in the C1 schema, unmodified".

## C1-4 — `recipe_class` and `parity` are required by nobody and required by everybody (MAJOR)

`INSPECTION.md:437-438`:
> "`ROLES.md` owns whether `recipe_class` and `parity` enter its `required` array. A verdict omitting
> either cannot be triaged by the line below, so require both on any run using these recipes"

`ROLES.md` never mentions either key. So INSPECTION mandates two fields, defers the mandate to a file
that does not implement it, and then ships an audit line (`INSPECTION.md:443`) that reads them:

> `jq -r '[.recipe_class.n, .parity, (.not_probed|length), .order_swap] | @tsv' "$RUN"/r*-verdict.json`

Against any ROLES-conforming verdict that prints `null null …` forever — the silent all-clear
`FAILURE-MODES.md:399-400` says the page exists to prevent. All three EXAMPLES verdicts omit both.

**Resolution.** C1 owns the union. Put `recipe_class` and `parity` in `required`; keep
`budget_checks` optional. Then `INSPECTION.md:437-438` becomes one sentence pointing at C1.

## C1-5 — ROLES supersedes a section of INSPECTION that no longer exists (MAJOR)

`ROLES.md:241-244`:
> "it supersedes the plaintext verdict block in `INSPECTION.md` § Evidence hygiene — whose two gating
> fields survive inside it. `NOT PROBED` is `not_probed` … `ORDER-SWAP RECHECK` is `order_swap`"

`grep -rn "NOT PROBED\|ORDER-SWAP" *.md` returns only `ROLES.md:242,244` and two unrelated
`NOT PROBED` strings in EXAMPLES. INSPECTION's Evidence hygiene section (`:387-410`) is a table of
enforcement rules with no plaintext verdict block and no such labels. This is the exact defect wave 1
charged INSPECTION with, surviving in mirror image: INSPECTION was repaired, ROLES' description of it
was not.

**Resolution.** Cut `ROLES.md:241-247` to: "The C1 schema is the critic's whole reply."

## C1-6 — BARS ships a third verdict contract, with a hedged pass (BLOCKER)

`BARS.md:457-464`, under "**Append to every round verdict:**":
```
BLIND RESULT: A | B | indistinguishable      (which was ours: revealed after)
MIMICRY FINDINGS: <n>   [novel-region | why | substitution | tell]
VERDICT: pass | pass-with-mimicry | fail
```

Three independent violations of contracts the repo states elsewhere:

1. **A pass/fail field.** `EXAMPLES.md:29` — "A critic return has no pass/fail field". `ROLES.md:229`
   has `choice` only. `FAILURE-MODES.md:100` — "`choice` admits only the four `ROLES.md` enum values,
   **no modifiers**."
2. **`pass-with-mimicry` is F5.** `FAILURE-MODES.md:90-91` defines verdict laundering as exactly this:
   "In prose, `PASS (with minor caveats)`: the orchestrator advances on the clear and never reads the
   caveat." `BARS.md:466` tries to patch it — "`pass-with-mimicry` never terminates a run" — which is
   the mitigation F5 says does not work, because the enum is what closes the channel.
3. **`(which was ours: revealed after)`** in a field appended to the critic's verdict re-opens
   provenance inside the artifact `ROLES.md:210` forbids provenance in.

**Resolution.** Delete the block. Mimicry findings are not a verdict field: route them to
`recipe_class`-tagged observations plus a `not_probed` entry, or to the round report
(`OPERATIONS.md:306`). BARS' four mimicry tests survive as bar-side guidance.

## C1-7 — `indistinguishable` resolves three incompatible ways (BLOCKER)

- `ROLES.md:251-252`: "`candidate` and `indistinguishable` **clear** the part; `bar` and `blocked` do not."
- `OPERATIONS.md:221`: `const candWins = verdicts.filter(v => v.choice === side).length` — an
  `indistinguishable` is **not** a win, so it counts against bar crossing.
- `BARS.md:410-411`: "Ours wins the blind pick in 2 consecutive rounds … or "indistinguishable" twice"
  → **escalate the bar**, and `BARS.md:419` "Expect the first round under a new bar to lose."

A 10-judge panel returning all `indistinguishable` simultaneously clears the part (ROLES), fails to
cross the bar (OPERATIONS), and raises the bar (BARS).

**Resolution.** C1 fixes one semantics. Recommended: `indistinguishable` is **not** a candidate win
for C2's rule (a) and does **not** clear a part; it is a signal to change modality
(`OPERATIONS.md:445`), because the repo's own thesis is that the bar is above the ceiling and a tie is
more often a blind probe than a real tie.

## C1-8 — the `.md` footer has three field sets and two orders (MINOR)

- `OPERATIONS.md:300`: "`r1-<part>-verdict.md` … Ends `MODEL:`, `CHOICE:`, `SIDES:`"
- `FAILURE-MODES.md:19-20` (the generator that actually writes it): `MODEL:`, `CHOICE:`, `BLOCKER:` —
  no `SIDES:` line at all.
- `OPERATIONS.md:381` (the watcher): greps `'CHOICE:|MODEL:|BLOCKER'`.

`FAILURE-MODES.md:27` acknowledges `SIDES:` is appended later by another agent, so the two are
reconcilable — but no file states the final line set, and `OPERATIONS.md:284` claims the layout is
what "the greps in `FAILURE-MODES.md` … assume".

**Resolution.** C1 states the footer as an ordered four-line block: `MODEL:`, `CHOICE:`, `BLOCKER:`,
then `SIDES:` appended post-seal. Both snippets then match it.

## C1-9 — F8's detection signal reads a field the schema forbids (MAJOR, self-referential)

`FAILURE-MODES.md:129-130`:
> "Inflation is a score delta ≥ +8 across two rounds while `grep -h 'CHOICE' …` still has the bar winning"

`FAILURE-MODES.md:132` (same entry, four lines later):
> "Delete any rubric total from the verdict schema."

There is no score field in `ROLES.md:218-238` and never should be. F8's own mitigation guarantees its
own signal can never fire. In a compliant run F8 is undetectable.

**Resolution.** Replace F8's signal with the structural one it already implies: any numeric total
appearing anywhere in a verdict record is F8, `jq 'paths(type=="number")'` over the `.json` outside
the known numeric fields. C1 pins the closed field list that makes that grep meaningful.

## C1-10 — a composite `modality` value outside the enum (MINOR)

`ROLES.md:222-223` enum: `executed|interacted|measured|read_aloud|called_api|viewed_at_target_sizes|other`.
`EXAMPLES.md:130` registers part A7 as `` `measured` + `HUMAN GATE` ``, and `EXAMPLES.md:31` claims
"**`modality` uses the `ROLES.md` enum** … and so does the part registry".

**Resolution.** `modality: "measured"` plus a `budget_checks` row and a `not_probed` entry naming the
human gate. That is what C5 will require for audio anyway.

## C1-11 — four different agents are named as the writer of the same evidence (MAJOR)

| Who stages the arena / writes the record | Cited at |
|---|---|
| "harness code no builder owns" | `DOCTRINE.md:285-288` |
| "the round-close agent" | `OPERATIONS.md:330`, `:333` |
| "the arena-neutralizing agent, never the critic" | `OPERATIONS.md:332`, `FAILURE-MODES.md:153` |
| "The orchestrator agent runs it" | `ROLES.md:359-360`, and `ROLES.md:53-56` fuses decompose + neutralise + reconcile into one spawn |

And `DOCTRINE.md:279` forbids the orchestrator from doing it: the orchestrator "**Must not** … hand-pick
which capture reaches a judge", while also being the role that "decide[s] termination". Under
`DOCTRINE.md:287-288` — "Choosing which … frame, excerpt, or trace window reaches the judge … belongs
to the harness, never to anyone who benefits from the answer" — ROLES' orchestrator is disqualified
from a job ROLES gives it.

**Resolution.** C1's writer table is normative and names exactly two agents: the **arena agent**
(stages sides, writes `SIDES:` and `.sides`, runs `critic-seal.sh`) and the **round-close agent**
(copies the validated return, writes `MODEL:`, appends `spend.tsv`/`gaps.tsv`). Neither may hold
termination authority; termination stays in the Workflow script. Then `ROLES.md:53-56` splits its
orchestrator into decomposer + arena agent, and `DOCTRINE.md:279`'s row is satisfied as written.

---

# C2 — THE STOP RULE

## Sites where C2 is stated, defined, or depended on

| File | Lines | What it claims |
|---|---|---|
| `README.md` | 3-5 | "stops **only** when a fresh-context critic … picks yours" |
| `README.md` | 33-35 | marginal-gain collapse + cost ceiling; "the bar is out of reach by construction" |
| `README.md` | 69, 118-124, 172-175 | "No round limit"; PASS/FAIL edges; ceiling at the harness |
| `DOCTRINE.md` | 22, 131-150 | Invariant 5 and its grep |
| `DOCTRINE.md` | 303-383 | Termination theory: three stops, alpha, MIE, rule (a) table, rule (b) Wilson bands, adjudication, illegitimate stops |
| `LAUNCH.md` | 94-96 | Default `STOP` header text |
| `LAUNCH.md` | 160-164 | "**The emission cannot terminate on its own.**" |
| `LAUNCH.md` | 138, 238, 269, 299, 345-346 | No stop rule in the prompt; three example `STOP` lines |
| `OPERATIONS.md` | 137, 187-279 | `MAX_ROUNDS` as abort; `CROSS`; `wilson`; `band`; `dry`/`pool`; the dry-round three-condition rule |
| `ROLES.md` | 79-81 | "A part exits when **a** blind critic picks it over {{BAR}}"; two-round escalation |
| `FAILURE-MODES.md` | 230, 279-295, 365-366 | F20 rule (a) and rule (b); "`CROSS` starts at n=10" |
| `FAILURE-MODES.md` | 165-167 | F11: the swap "is **not a stopping rule**" |
| `FAILURE-MODES.md` | 231-232, 243 | F16 "Part verdicts are advisory and never terminate a run"; F17 frozen-probe regression = automatic FAIL |
| `BARS.md` | 408-429 | Bar escalation trigger; never lower |
| `BARS.md` | 376, 466 | "Termination defined and reachable"; `pass-with-mimicry` never terminates |
| `EXAMPLES.md` | 19-25, 81-82, 109-112, 190-201, 254-255, 279-280, 340-345, 403-404, 427-428, 497-507, 530-531 | Panel of 5; "two consecutive 5-of-5"; MIE as "a majority flip"; gate lines |
| `install/SKILL.md` | 5-6, 114-118, 141 | The description's promise; the gate's three stops; the Invariants row |
| `RESUME.md` | 39-45, 59-63 | The diagnosis this ledger extends |

## C2-1 — the entry point sells the exit that almost never fires (MAJOR) — wave-1 finding, CONFIRMED

`README.md:3-5`:
> "Turn any goal into a build loop that **stops only when** a fresh-context critic, comparing your
> artifact blind against a named real-world exemplar, picks yours"

`LAUNCH.md:162-164`:
> "**The emission cannot terminate on its own.** The bar is out of reach by construction, so "don't
> stop until it picks ours" is a direction, not an exit; the exit is marginal-gain collapse"

`OPERATIONS.md:230`: "(b) MARGINAL-GAIN COLLAPSE — **the normal exit**."
`DOCTRINE.md:305-306`: "(a) bar crossing, **rare by design**".
`README.md:34-35` concedes it 30 lines later: "The bar is out of reach by construction, so with no
stop rule the loop cannot end — the one way to lose money on a good prompt."

Wave 1 cited README "line 3-5" and `LAUNCH.md §2` — both correct. A third site nobody flagged:
`install/SKILL.md:5-6`, the `description` the model reads when deciding whether to invoke the skill:
> "iterates against a named real-world quality bar **until** a fresh-context critic picks the work
> over the bar in blind comparison."

**Resolution.** All three sentences name the honest exit first. Suggested README opening: "…a build
loop that stops when a panel of fresh-context blind critics stops finding gains against a named
real-world exemplar — or, rarely, when it picks yours over the exemplar."

## C2-2 — the installed gate promises a rule the script it orders will not contain (BLOCKER) — wave-1 finding, CONFIRMED

`install/SKILL.md:114-115`, printed to the operator as the thing they approve compute against:
> "Stops when: (a) blind critics pick ours over the bar in **two consecutive rounds with sides
> swapped** — rare, the bar is out of reach by design;"

`install/SKILL.md:141` (Invariants) repeats it: "Two consecutive blind wins with sides swapped (rare)".
`install/SKILL.md:96-97` orders the author to build the script "per `OPERATIONS.md` §1–§5".

`OPERATIONS.md:219-228` implements something else entirely — a **single-round** panel:
```js
const kx = CROSS[verdicts.length]
if (kx !== undefined && candWins >= kx) { log(`STOP: bar crossing …`); break }
```
with `CROSS = { 10: 9, 15: 12, 20: 15, 30: 20 }` (`:200`) and `OPERATIONS.md:254-255` — "**n = 10 is
the floor**".

Worse, `FAILURE-MODES.md:292-294` names the gate's own rule an illegitimate stop:
> "there is no "judge twice with sides swapped, then stop" shortcut. Two judgments is p = 0.25 against
> a coin, which `DOCTRINE.md` lists among the illegitimate stops that have already ended real runs early."

**Resolution.** The gate prints C2 verbatim. Nothing else.

## C2-3 — the gate's rule (b) makes the reference script throw at round 1 (BLOCKER)

`install/SKILL.md:116-117`:
> "(b) marginal-gain collapse — two consecutive rounds with no real gain on a **5-judge delta panel**."

`OPERATIONS.md:231`:
> `if (deltas.length < 9) throw new Error(\`delta panel n=${deltas.length}: rule (b) needs n >= 9.\`)`

`OPERATIONS.md:260-263` states the reason: "**never below 9** — below that the interval is too wide to
exclude anything, which is why the script throws instead of degrading quietly."

An operator who approves the gate as printed and hands the parts to the script per step 6.5 gets an
exception on the first round close. Nobody found this in wave 1.

**Resolution.** C2 states one delta-panel floor (9) and one crossing-panel floor (10). The gate quotes
them.

## C2-4 — F20 rule (b) cites a code object that no longer exists, and inverts it (BLOCKER)

`FAILURE-MODES.md:289-290`:
> "**(b) MARGINAL-GAIN COLLAPSE** — two consecutive rounds where round N fails to beat round N−1 on
> the delta panel, k from `GAIN = {5: 5, 7: 6, 9: 7}`."

`grep -rn GAIN *.md` → the object exists only in `FAILURE-MODES.md:290` and `DOCTRINE.md:366,373`.
It is **not in `OPERATIONS.md`**, which F20's own first line (`:285`) makes normative: "Stop only on a
rule from `OPERATIONS.md` §5."

Three defects in one sentence: (i) phantom reference; (ii) `n = 5` and `n = 7` are below the floor the
same page enforces at `:287` and `:366`; (iii) the semantics are backwards — `GAIN`'s k was a *win*
threshold, so "fails to beat … k from GAIN" is not a computable condition in either direction.

This is the single most-read termination text in the repo (`FAILURE-MODES.md` is the mid-run file).

**Resolution.** F20(b) becomes: "two consecutive rounds where the delta panel shows no demonstrated
direction, then the pooled Wilson band decides — C2 rule (b)." No numbers.

## C2-5 — DOCTRINE's adjudication section describes a version of OPERATIONS that is gone, and makes two false claims about it (MAJOR)

`DOCTRINE.md:362`: "`OPERATIONS.md` §5 is the wiring, this file is the authority" — then:

`DOCTRINE.md:366`: "**Rule (b).** `GAIN = { 5: 5, 7: 6, 9: 7 }` with `dry >= 2` is **not** the interval
test." OPERATIONS has no `GAIN`; `dry >= 2` survives (`:236`) but only as the *trigger* for the
interval test DOCTRINE demands, which OPERATIONS now implements at `:236-244` exactly as DOCTRINE
prescribes at `:369-371`. The adjudication is arguing with a file that already agreed.

`DOCTRINE.md:373`: "**Preconditions.** Alpha and MIE are **not variables in that script**; they are
baked into `CROSS` and `GAIN`." False: `OPERATIONS.md:199` is `const MIE = 0.65 // from run.json`.

`DOCTRINE.md:317`: "Both rules below are then **integer lookups**." False for rule (b), and OPERATIONS
says so at `:196`: "it needs the **Wilson score interval** … **Compute it — do not tabulate it.**"

**Resolution.** Delete `DOCTRINE.md:362-375` and replace with a pointer to C2. DOCTRINE keeps the
*why* (`:309-318`, `:377-383`) and the two tables as derivations; C2 owns the operative numbers.

## C2-6 — DOCTRINE's own rule-(a) table contradicts DOCTRINE's own floor (MAJOR)

`DOCTRINE.md:324-330` publishes a five-row table whose **first row is `n = 5, k = 5`** (p = 0.031 —
arithmetically correct, verified). `DOCTRINE.md:332` reads it honestly: "bar crossing is unprovable at
n = 5 for any target below 100%" — i.e. a 5-of-5 sweep *is* provable.

`DOCTRINE.md:364`: "`CROSS = { 10: 9, … }` is the table above, **undefined below n = 10 on purpose.**"
`OPERATIONS.md:254-256`, `FAILURE-MODES.md:230`, `FAILURE-MODES.md:366` all enforce n ≥ 10.

So the table says a 5-0 sweep clears alpha; every implementation says a 5-judge panel cannot stop.
`EXAMPLES.md` builds all three runs on the table row (see C2-8).

**Resolution.** Keep n = 5 in the table as a *pedagogical* row explicitly marked "clears alpha but is
below the C2 panel floor — not a permitted stop", and say why the floor is above it (a single sweep at
n = 5 is one flipped judge away from p = 0.19, and the same panel cannot support rule (b) at all).

## C2-7 — round down, or throw? (MAJOR)

`DOCTRINE.md:334`: "Panel size not in the table: round **down** to the nearest listed n and judge
exactly that many. Do not interpolate."

`OPERATIONS.md:223-225`:
```js
if (kx === undefined && verdicts.length >= 10) {
  throw new Error(`rule (a): no threshold at n=${verdicts.length}. Judge 10, 15, 20 or 30.`)
}
```
`OPERATIONS.md:256-258` reconciles it partially — "Round **down** to a listed `n` at the point you
*size* the panel" — but an operator holding DOCTRINE alone with 12 returned verdicts will read the
first 10 and stop, where the reference script aborts the run.

**Resolution.** C2 states it once, at the sizing step, and states that an unlisted `n` at scoring time
is an authoring error that aborts.

## C2-8 — all three worked runs terminate on a rule the repo forbids (BLOCKER)

`EXAMPLES.md:21-24`:
> "**Panel 5, alpha 0.05, minimum-interesting effect = a majority flip** … a part closes only on
> **5 of 5 in two consecutive rounds, sides swapped**."

Repeated as the operative stop in every run header (`:81-82`, `:254-255`, `:403-404`), every gate line
(`:111`, `:280`, `:428`), and every termination section (`:192`, `:342`, `:499`).

Against: `OPERATIONS.md:255` (`CROSS` undefined below 10), `OPERATIONS.md:231` (delta panel throws
below 9), `FAILURE-MODES.md:366` ("Someone wants to stop on 2 winning judgments → **Refuse.**"),
`FAILURE-MODES.md:292-294` (the two-rounds-swapped shortcut does not exist), `DOCTRINE.md:381` ("a win
rate computed on fewer judgments than your alpha or MIE needs, in either direction").

The file that exists to show a reader what a correct run looks like shows three runs that could not
have run.

**Resolution.** Re-cut all three examples to a compliant shape: 10-judge crossing panel at the whole
arena, 9-judge delta panel per round, parts advisory per `FAILURE-MODES.md:231-232`. The narratives
(bar interrogation, the R2 screenshot void, the R1 blindness break, the C5 abort) survive unchanged —
only the panel arithmetic and the closing sentences change.

## C2-9 — EXAMPLES' MIE is not a number (MAJOR)

`EXAMPLES.md:21`: "minimum-interesting effect = **a majority flip**".

`DOCTRINE.md:314-318` requires MIE be "**the win rate** below which a further round is not worth
paying for (default 65%)" and adds: "nothing here takes a rate you invent". `OPERATIONS.md:199` bakes
`MIE = 0.65` and `:298` requires alpha and MIE be written into `run.json` before round 1. "A majority
flip" cannot be written into `run.json` or fed to `band()`.

**Resolution.** State `MIE = 0.65` in all three runs, or state the deliberate departure and its band.

## C2-10 — ROLES lets one critic close a part (BLOCKER)

`ROLES.md:79-80`, inside the verbatim orchestrator prompt:
> "Hold the bar. A part exits when **a blind critic** picks it over {{BAR}} on its dimension, or calls
> them indistinguishable after a complete probe."

That is n = 1. `DOCTRINE.md:381` lists it as an illegitimate stop that "has ended a real loop early".
`FAILURE-MODES.md:231-232` (F16 mitigation): "Part verdicts are **advisory and never terminate a run**."
And it compounds C1-7: `indistinguishable` closes the part here.

Nobody found this. It is the most dangerous instance in the set, because it sits inside a prompt marked
"verbatim spawnable" and is therefore pasted into a live orchestrator.

**Resolution.** Rewrite to: "A part is advisory-cleared when its panel shows no fresh gap; only the
whole-artifact and delta panels in C2 terminate anything."

## C2-11 — a round counter inside a role prompt, and a file claiming there isn't one (MAJOR, self-referential)

`DOCTRINE.md:144-147` (invariant 5's detection):
> "Grep the launch prompt, **every role prompt**, and the orchestration script for a number adjacent to
> `round`, `iteration`, `pass`, `attempt`, `wave`, `retry`. A hit is legitimate only if it is a **cost,
> wall-clock, agent-count, or round backstop that aborts and is reported as an abort.**"

Run that grep on `ROLES.md:80-81`, inside the orchestrator prompt:
> "When a part burns budget with no movement in the critic's named gap **across two rounds**, stop and
> escalate"

Not an abort, not reported as one — an escalation trigger. The schema hands the same agent
`rounds_without_gap_movement` (`ROLES.md:100`) to act on.

`EXAMPLES.md:114-116` asserts the opposite: "Plus orchestrator state per part: `state`,
`critic_choice`, `rounds_without_gap_movement` … The counter exists; **no model in the loop can see
it.**" The orchestrator is a model in the loop, and it is the model holding the counter.

**Resolution.** Move the two-round stall trigger out of the prompt into the Workflow script (where
`DOCTRINE.md:148` already blesses a numeric backstop), and correct EXAMPLES' claim to "no *judging*
model sees it".

## C2-12 — BAR ESCALATION and F20 fire on the same event and mandate opposite actions (MAJOR) — wave-1 finding, CONFIRMED with a correction

Wave 1 cited `BARS.md L410` against `FAILURE-MODES.md L310-312`. The BARS citation is right; the
FAILURE-MODES lines have moved — the current text is `FAILURE-MODES.md:285-294`, and F20's rule (a) is
now the `CROSS` panel, not the two-round swap. The conflict survives in a new shape:

`BARS.md:410-411`: "**Trigger.** Ours wins the blind pick in **2 consecutive rounds with different
critic instances**, or "indistinguishable" twice." → `:416` escalate, `:418` "Rounds compare only
within a bar epoch", `:419` "Expect the first round under a new bar to lose."

`FAILURE-MODES.md:286-288` / `OPERATIONS.md:219-228`: a single panel of n ≥ 10 at k ≥ `CROSS[n]` **stops
the run**.

An operator holding BARS alone converts every clearing event into a new epoch and an expected loss, and
`BARS.md:418` voids the comparison history that C2's pooled band (`OPERATIONS.md:234`) depends on.
`OPERATIONS.md:448` prices it honestly — escalation is a "Restart of the comparison history: previous
win rates no longer compare" — which means escalation and rule (b) cannot both be live.

**Resolution.** C2 states the precedence: a panel that satisfies rule (a) **stops**; escalation is an
operator decision available only *after* a stop, and it starts a new run-id (same treatment as a
re-fetched bar under F3). Delete the "indistinguishable twice" trigger per C1-7.

## C2-13 — `--resume` cites a section that forbids it (MAJOR) — wave-1 finding, CONFIRMED

`install/SKILL.md:151`: "`--resume` … then resumes the Workflow by `runId` per `OPERATIONS.md` §8"
and `install/SKILL.md:13` advertises it in `argument-hint`.

`OPERATIONS.md:408`: "**Same session only**, so the session-uuid segment is always the session you are
sitting in."

`RESUME.md:90-91` confirms the constraint bit this project itself: "`resumeFromRunId` is same-session
only, so it will **not** work after the break."

**Resolution.** `--resume` re-reads `bar.sha256`, `launch-prompt.md` and `run.json`, verifies the hash,
and starts a **new** Workflow from the last completed round's state — and says so. Cross-session
`resumeFromRunId` is removed from the flag's contract.

## C2-14 — F17's automatic FAIL is a fourth stop nobody wired (MINOR)

`FAILURE-MODES.md:243`: "Any regression in a frozen probe is an **automatic FAIL regardless of the
pairwise choice**." Nothing in `OPERATIONS.md:187-279` consults the frozen probe set, and the dry-round
definition at `:265-269` lists three conditions, none of them a frozen-probe regression.

**Resolution.** C2 names it as a **veto**, not a stop: a frozen-probe regression forces the round to
FAIL and forbids any stop that round. Then wire one line in `OPERATIONS.md` §5.

---

# C3 — THE PATH LAYOUT

## Sites where C3 is stated or depended on

| File | Lines | Content |
|---|---|---|
| `OPERATIONS.md` | 282-337 | The canonical tree, the `.gauntlet/current` symlink, the writer table, the naming reconciliation |
| `OPERATIONS.md` | 343-364, 396-406 | Run-record and script paths (`~/.claude/projects/$(pwd \| tr / -)/*/workflows/…`) |
| `README.md` | 39-47, 93-96 | `RUN=.gauntlet/$(date +%Y-%m-%d)a`; `bar/`; `bar.sha256` |
| `install/SKILL.md` | 39-41, 66-71, 78-79, 155-167, 171-175 | Install-relative resolution; the run-dir list; the install/verify blocks |
| `ROLES.md` | 18-20, 366-390 | `{{ARENA}}`, `{{A_PATH}}`, `{{WORKTREE}}`, `{{CANDIDATE_PATH}}`; `critic-seal.sh` paths |
| `INSPECTION.md` | 396, 401 | `.gauntlet/<run-id>/r<N>/evidence/`; the seal cross-reference |
| `FAILURE-MODES.md` | 14-21, 39, 52-53, 64, 74-80, 152, 188, 200, 240, 302-311, 375-395 | Every detection grep's path assumption |
| `BARS.md` | 394, 402-406 | `bar/`, `bar/ARTIFACT.<ext>`, `bar/PROVENANCE.md` |
| `BARS.md` | 362, 365-366 | `reference/baseline-gauntlet-prompt.md`; `~/.claude/skills/…` |
| `EXAMPLES.md` | 69-71, 238-241, 382-384, 196-197, 351-352 | `.gauntlet/<date><letter>/…` in use |
| `DOCTRINE.md` | 18, 42-51 | `$RUN/bar/`, `$RUN/bar.sha256` as a per-judgment precondition |

## C3-1 — `spend.tsv` column 3 is tokens in two files and seconds in the third (BLOCKER)

`OPERATIONS.md:294-296`:
> "`spend.tsv` — `round<TAB>agents<TAB>tokens` — RUN-RECORD `.tokens` totals, never `budget.spent()`.
> Appended at round close by the F21 snippet, whose BREACH check reads column 3. **Two columns silently
> disables it.**"

`FAILURE-MODES.md:309`: `printf '%s\t%s\t%s\n' "$N" "$A" "$T" >> "$RUN"/spend.tsv  # round, agents, tokens`
`FAILURE-MODES.md:391`: `awk -F'\t' '{if (p && $3 > 2*p) print "BREACH r"$1; p=$3}' "$RUN"/spend.tsv`

`install/SKILL.md:100`, the step that actually tells the author what to write:
> "append one `round<TAB>agents<TAB>**seconds**` row to `spend.tsv` at each round close."

The right number of columns with the wrong unit is worse than two columns: the BREACH check runs, never
fires (wall clock per round is roughly flat while token cost superlinearly grows), and reports a clean
round — the exact failure `OPERATIONS.md:296` warns about.

**Resolution.** C3 fixes `round<TAB>agents<TAB>tokens` (run-record totals). One line in
`install/SKILL.md:100`.

## C3-2 — the installer creates a run directory missing the files four detection signals grep (BLOCKER, self-referential)

`install/SKILL.md:66-71` orders the run dir to hold:
> "`launch-prompt.md`, `bar/`, `bar.sha256`, `probes/`, `spend.tsv`, `run.json`,
> `r<N>-<part>-verdict.{md,json}`, `r<N>/arena/`. … **Omit either and those checks match nothing and
> report a clean round, the one outcome that page exists to prevent.**"

Missing against `OPERATIONS.md:288-311`: `gaps.tsv`, `.sides`, `r<N>/evidence/`, `r<N>/report.md`, and
the `.gauntlet/current` symlink. Each disables something:

| Omitted | Breaks |
|---|---|
| `gaps.tsv` | F2's only signal (`FAILURE-MODES.md:52-53`) and the round-close line `:382` |
| `.sides` | F4 (`:80`), F8 (`:130`), F11 (`:161`), F16 (`:228`) — every check that joins a `CHOICE` to a side |
| `r<N>/evidence/` | `INSPECTION.md:396` "Evidence is immutable per round" |
| `r<N>/report.md` | `OPERATIONS.md:277` "On any stop, report the standing gaps" |
| `.gauntlet/current` | `ROLES.md:366` `RUN=${RUN:-.gauntlet/current}` and `OPERATIONS.md:380` watcher |

The file states the failure mode and then commits it in the same paragraph.

**Resolution.** `install/SKILL.md` step 6.1 becomes "create the layout in C3" with no list.

## C3-3 — `critic-seal.sh` reads four paths the layout does not declare (BLOCKER)

`ROLES.md:367-368`, `:389`:
```bash
TPL=$RUN/templates/critic.txt            # the §3 block, verbatim, slots UNFILLED
OUT=$RUN/r$R/prompts/critic-$DIM.txt
jq -r '..|strings|select(length>40)' "$RUN"/r$R/builder-*.json
```
`OPERATIONS.md:288-307` declares none of `templates/`, `r<N>/prompts/`, or `r<N>/builder-*.json`. With
`set -euo pipefail` (`ROLES.md:365`) a missing `$TPL` makes `sed` fail and the seal aborts every round;
the builder-glob is guarded with `2>/dev/null || true` (`:389`) so it silently checks nothing.

`ROLES.md:377-379` also reads two variables nothing exports: `$BAR_SLUG` and `$PRODUCT_SLUG`. Under
`set -u` the `find`/`grep` lines abort on the first unset expansion. `$USER_DESC`, `$PROBE`, `$BUDGET`
(`:383`) are likewise undeclared inputs.

**Resolution.** C3 adds `templates/critic.txt`, `r<N>/prompts/`, `r<N>/builder-<part>.json` to the tree,
and `run.json` gains `bar_slug` / `product_slug`; `critic-seal.sh` sources them from `run.json` via `jq`.

## C3-4 — `arbiter-log.tsv` exists only in F14 (MINOR)

`FAILURE-MODES.md:199-201` has the orchestrator append `round<TAB>critic_choice<TAB>arbiter_choice` to
`"$RUN"/arbiter-log.tsv`. Not in `OPERATIONS.md`'s tree, not in `install/SKILL.md`'s list.

**Resolution.** Add to C3.

## C3-5 — the installed skill's agent-systems bar points at a directory the installer deletes (BLOCKER)

`BARS.md:362-363`:
> "**BAR** — Default **the baseline Gauntlet prompt** (`reference/baseline-gauntlet-prompt.md`)"

`install/SKILL.md:160`:
> `rm -rf ~/.claude/skills/gauntlet/install ~/.claude/skills/gauntlet/reference`

and `:164-166` explains the intent: "`reference/` is build-time scaffolding plus **third-party baseline
text — deleted, not installed.**"

So in every installed copy, the default bar for the one domain this system is itself in resolves to a
deleted file. `BARS.md:39-41`'s fallback ("Domain not listed?") does not fire, because the domain *is*
listed.

**Resolution.** Either keep `reference/baseline-gauntlet-prompt.md` in the install (it is attributed
third-party text used as a comparison bar, which is what it was reproduced for) or change the
agent-systems default to `~/.claude/skills/verification-loop/SKILL.md` (verified present) and cite the
baseline by URL. C3 states which paths survive installation.

## C3-6 — `install/SKILL.md` cites `LAUNCH.md §7`; LAUNCH ends at §6 (MAJOR)

`install/SKILL.md:31`: "`LAUNCH.md` | Bar interrogation questions; goal → minimal launch prompt; **proxy
rules (§7)**"
`install/SKILL.md:74`: "or the proxy **`LAUNCH.md` §7** prescribes when the bar is paywalled,
native-only, or gone"

`grep -n '^## ' LAUNCH.md` → §1 The meta-prompt, §2 Read the header, §3 Bar interrogation, §4
Pre-emission self-check, §5 Three example emissions, §6 Escape hatches. The proxy rules are **§6**
(`LAUNCH.md:331-336`).

Both are load-bearing: step 6.2 is the bar-freeze step, and an agent that cannot resolve the reference
will improvise a proxy — which `install/SKILL.md:41` explicitly forbids ("do not improvise depth").

**Resolution.** §6, twice.

## C3-7 — EXAMPLES cites `LAUNCH.md §2b` three times; there is no §2b (MAJOR)

`EXAMPLES.md:85-86`, `:258`, `:407` — "`{MODALITY PHRASE}` is `LAUNCH.md` §2b row 2 / row 1 / row 5".
`LAUNCH.md`'s STEP 2b is at `:70-85`, **inside §1** (the meta-prompt fence). `LAUNCH.md` §2 is "Read the
header before you spend" and has no sub-parts. Row numbers themselves check out (row 1 = UI, row 2 =
game, row 5 = API), except `EXAMPLES.md:87` writes row 2 as "(game, tool, interaction, **agent**)" where
`LAUNCH.md:73` reads "game, tool, interaction, **GUI agent**" — and `LAUNCH.md:81-82` specifically warns
that dropping "GUI" is how a phone agent gets clicked instead of called.

**Resolution.** Cite the modality router as `LAUNCH.md` §1 STEP 2b, and quote the row label in full.
Better: C5's matrix becomes the router's home and everyone cites C5.

## C3-8 — `gaps.tsv` has three columns in F2 and four in the layout (MINOR)

`OPERATIONS.md:293`: "`gaps.tsv` — `round<TAB>part<TAB>gap_id<TAB>status`. Append only (F2 counts col 3)"
`FAILURE-MODES.md:52`: "appending `round<TAB>part<TAB>gap_id` to `"$RUN"/gaps.tsv`"

Column 3 is `gap_id` either way so `cut -f3` survives, but `status` is unwritten and nothing consumes it.

**Resolution.** Four columns in C3; add `status` to F2's `printf`, or drop it from the layout.

## C3-9 — the F3 hash check is cwd-sensitive and will report false drift (MINOR)

`shasum` embeds the path exactly as given. `README.md:42` and `install/SKILL.md:79` generate
`bar.sha256` with a **relative** `"$RUN"/bar/*`; `FAILURE-MODES.md:390` and `OPERATIONS.md:433` re-run
the same relative form. Any check run from a different cwd (a critic given absolute paths per
`OPERATIONS.md:55`, or the round-close agent in a worktree) diffs `bar/x.png` against
`/Users/…/bar/x.png` and reports F3 on an unchanged bar — and `FAILURE-MODES.md:373` says "Any hit stops
the round."

Also: `shasum -a 256 "$RUN"/bar/*` fails on any subdirectory under `bar/`, which `BARS.md:402-406`'s
synthetic layout does not create but a captured web archive will.

**Resolution.** C3 pins the command as `(cd "$RUN" && shasum -a 256 bar/* > bar.sha256)` and the check
as `(cd "$RUN" && shasum -a 256 bar/* | diff - bar.sha256)`, and requires `bar/` be flat.

## C3-10 — smaller path rot (MINOR, batch these)

- `README.md:12` hard-codes `/Users/Nathan/Code/gauntlet-loop-system` as where "this lives"; `README.md`
  is copied by `install/SKILL.md:158` into `~/.claude/skills/gauntlet/`, where the statement is false.
- `install/SKILL.md:173` verifies `{LAUNCH,BARS,INSPECTION,ROLES,OPERATIONS,FAILURE-MODES,DOCTRINE}.md`
  and omits `EXAMPLES.md` and `README.md`, both of which the install copies. `EXAMPLES.md` also appears
  in **no row** of the reference map (`install/SKILL.md:30-37`), so the installed skill never loads it.
- `install/SKILL.md:32` cites "`BARS.md` … how to freeze one (**§ synthetic bars**)"; the section is
  `BARS.md:384` "BAR CONSTRUCTION — when no external artifact exists".
- `ROLES.md:20`/`:23` give `{{WORKTREE}}` as `../wt/hit-reg`, but `OPERATIONS.md:103` says
  `isolation: 'worktree'` "runs an agent in a fresh git worktree **and tells it the path**" — the harness
  chooses it. `FAILURE-MODES.md:263-264` correctly takes worktree paths from `git worktree list`.
- `FAILURE-MODES.md:394`'s round-close diff is `git diff --shortstat "gauntlet-r$((N-1))..gauntlet-r$N"`.
  At N = 1 that resolves `gauntlet-r0`, which nothing ever creates (`OPERATIONS.md:117` tags from
  round 1). Git errors; `FAILURE-MODES.md:398-399` then misreads the error as "the record was never
  written — a stopped round". Guard with `N -gt 1`.

---

# C4 — THE EMISSION BUDGET

## Sites

| Contract half | File:line | Value |
|---|---|---|
| Word ceiling | `README.md:5` | "emissions land at **115–145** words, hard-capped at **150**" |
| | `LAUNCH.md:4`, `:98`, `:120`, `:132`, `:210` | "under **150** words" |
| | `LAUNCH.md:217` | "Correct emissions land at **115–145** words" |
| | `DOCTRINE.md:176` | "Target **100–150** words" |
| | `install/SKILL.md:25` | "the launch prompt this skill emits must stay **~120 words**" |
| | `install/SKILL.md:59` | "Per `LAUNCH.md`, **≤150 words**" |
| | `BARS.md:378` | "Launch-prompt word count: **shorter at equal power always wins**" |
| STOP token budget | `LAUNCH.md:95-96` | "ceiling of +\<N\>k output tokens … size N at **~150k output tokens per round**" |
| | `LAUNCH.md:238`, `:269`, `:299` | +900k / +600k / +450k output tokens |
| | `OPERATIONS.md:138` | `let roundCost = 150_000  // seed` — **per round** |
| | `OPERATIONS.md:124-132` | `budget.total/spent()/remaining()` in **output** tokens |
| | `OPERATIONS.md:154-157` | record `totalTokens` is ~10× `budget.spent()`; never mix |
| | `OPERATIONS.md:160-168` | measured: one Opus critic = 318k **record** tokens; builders 260k–720k record |
| | `install/SKILL.md:149` | "**Default 40** [agent-runs] … `+6M` at a first-pass **~150k output tokens per agent-run**" |
| | `README.md:172-175` | "`budget=<n>` caps agent-runs; the hand-wired equivalent is `budget.total` in output tokens" |
| | `EXAMPLES.md:81`, `:254`, `:403` | ceilings of **220 / 210 / 190 agent-runs** |
| | `LAUNCH.md:160` | reject `STOP` if "priced in dollars — no knob in this harness takes dollars" |
| | `ROLES.md:24` | `{{BUDGET}}` = "Turn/cost ceiling for this spawn", e.g. `40 turns` — a third currency |

## C4-1 — the same 150k figure has two different denominators, ~10–20× apart (BLOCKER) — wave-1's "40x", located precisely

`LAUNCH.md:95-96` (the header the operator sizes the run from):
> "size N at **~150k output tokens per round**, times the rounds I am willing to pay for"

`install/SKILL.md:149`:
> "`+6M` at a first-pass **~150k output tokens per agent-run**"

`OPERATIONS.md:161` states the agents per round: "Per round with `P` parts you spawn `P` builders and
`P + 5…9` judging agents." At P = 4 that is 13–17 agents; at EXAMPLES' P = 8, 21–25. So the two
readings of "150k" differ by 13–25×, and `install/SKILL.md`'s own arithmetic (40 × 150k = 6M) is
internally consistent only under the per-agent-run reading.

`OPERATIONS.md:138`'s seed (`roundCost = 150_000`) endorses LAUNCH's per-round reading — and
OPERATIONS' own measurements say even that is low: 318k record tokens per critic ÷ ~10
(`OPERATIONS.md:155-156`) ≈ 32k output; 13 agents ≈ 420k output for one 4-part round, ~3× the seed.
`OPERATIONS.md:149` self-corrects after round 1, so the seed is survivable; **LAUNCH's operator-facing
formula is not**, because the operator sizes the whole ceiling from it before round 1. `LAUNCH.md`'s
own example +900k "→ 6 rounds" really buys ~2.

**Resolution.** C4 states **one** number with **one** denominator, and both files quote it:
`ROUND_COST_SEED = 500_000 output tokens for a 4-part round, +100k per additional part`, with
`OPERATIONS.md:149`'s recalibration named as the correction path. `install/SKILL.md:149`'s per-agent-run
figure is deleted; the agent-run ceiling converts through `agents_per_round`, not through a token rate.

## C4-2 — the default `budget=40` cannot fund one compliant termination test (BLOCKER)

`install/SKILL.md:149`: "Agent-run ceiling … **Default 40.**"

C2's rules require, per round: a whole-artifact crossing panel of **n ≥ 10** (`OPERATIONS.md:255`) plus
a delta panel of **n ≥ 9** (`OPERATIONS.md:231`) plus P builders plus one round-close agent — ≥ 24
agent-runs for a single part. Rule (b), "the normal exit", needs **two consecutive dry rounds**
(`OPERATIONS.md:236`) — ≥ 40 judging agents alone before a single builder is counted.

So the default ceiling aborts before the normal exit is reachable, and `OPERATIONS.md:377-378`'s
requirement to "say the word *abort*" means the default configuration's only possible outcome is an
abort. EXAMPLES' declared ceilings (190–220) are 5× the default and are the realistic figures.

**Resolution.** C4 sets the default from C2's arithmetic: `default budget = 6 × (P + 20)` agent-runs,
floor 150, and the gate prints the derivation so the operator sees why.

## C4-3 — three currencies, no conversion of record (MAJOR)

Output tokens (`LAUNCH.md`, `OPERATIONS.md` §4, `README.md:174`), agent-runs (`install/SKILL.md`,
`EXAMPLES.md`, `README.md:173`), and turns (`ROLES.md:24`, `{{BUDGET}}` = `40 turns`). `LAUNCH.md:170-172`
is the only place that acknowledges two of them, and it does not convert. `F21`
(`FAILURE-MODES.md:312`) requires "a per-run ceiling in **agent-invocations** and a per-round cap",
while `OPERATIONS.md:143` guards on `budget.remaining()` in tokens.

**Resolution.** C4 declares output tokens the harness currency (it is the only one `budget` counts),
agent-runs the operator currency, and states the single conversion. `{{BUDGET}}`'s "turns" example is
replaced with a token figure.

## C4-4 — four different word ceilings (MAJOR)

150 hard cap (`README.md:5`, `LAUNCH.md:4`), 115–145 observed band (`README.md:5`, `LAUNCH.md:217`),
100–150 target (`DOCTRINE.md:176`), ~120 (`install/SKILL.md:25`) — and `install/SKILL.md` carries two of
them 34 lines apart (`:25` ~120, `:59` ≤150).

Good news, verified: every shipped emission is inside every band. `wc -w` on the six prompts gives
**145 / 143 / 133** (EXAMPLES A/B/C, matching their claimed counts exactly) and **142 / 143 / 134**
(LAUNCH 5a/5b/5c); the bare template at `LAUNCH.md:101-114` is 134. So this is documentation drift, not
emission failure — but `install/SKILL.md:25`'s ~120 is a figure no emission in the repo meets, and
`install/SKILL.md:59` then permits 150.

**Resolution.** C4: "**hard cap 150 words**, observed band 115–145, counted with `wc -w`." One sentence,
five citations replaced.

## C4-5 — BARS' own agent-systems signal says the product loses on length (MAJOR, self-referential)

`BARS.md:378`: "Launch-prompt word count: **shorter at equal power always wins**."
`BARS.md:362`: the default bar for this domain is the ~120-word baseline
(`reference/baseline-gauntlet-prompt.md:37`, `reference/BUILD-BRIEF.md:17`).

Our emissions are 133–145 words. On BARS' own stated signal, at equal power the baseline wins every
pair — and `RESUME.md:74-80` says the blind A/B tournament that would settle "equal power" **has not
run**.

**Resolution.** Not a C4 edit — a scope note C4 should carry: the word ceiling exists to *bound the
loss* on this signal, and the tournament (`RESUME.md` W2-D) is the only thing that can license the
extra 15–25 words. Until it runs, C4 should state the cap as 150 and the aspiration as ≤ 130.

---

# C5 — THE MODALITY CAPABILITY MATRIX

The deepest drift in the repo, and the only contract that requires **cutting product**, not just
reconciling wording. `INSPECTION.md` is the truth-teller; `LAUNCH.md` STEP 2b (`:70-83`) is the router
that sells capabilities the harness lacks; `BARS.md` is the acquisition layer that sometimes demands a
human and never says so.

## Verified harness ground truth (run on this machine, 2026-07-29)

Present: `ffmpeg` (libx264, and all four of loudnorm/ebur128/astats/silencedetect confirmed), `ffprobe`,
`curl`, `jq`, `python3`, `sqlite3`, `say`, `afplay`, `screencapture`, `xcrun`, **`yt-dlp`**.
Absent: ImageMagick (`convert`/`magick`), `hyperfine`, `duckdb`, `whisper`.
Claude Code **2.1.207** — exactly the version `OPERATIONS.md:14` claims.
`pw.take_screenshot` really does take `target: <ref>` and `scale: "device"` (schema confirmed);
`pane.computer` really does take `action:"zoom", region:[x,y,w,h]`; every iOS `control` action named in
`INSPECTION.md:45-46` exists, and `…__build` exists. The three composed skills
(`verification-loop`, `subagent-driven-development`, `eval-harness`) all exist.
`~/.claude/projects/-Users-Nathan/<session-uuid>/workflows/wf_*.json` exists exactly as
`OPERATIONS.md:343-346` describes.

So `INSPECTION.md`'s tool table is accurate, including its ABSENT list. The conflicts below are all
*other files* claiming capability INSPECTION correctly disclaims.

## The matrix, as it should be frozen

| Modality | CAN inspect, with what | CANNOT | Verdict on the product |
|---|---|---|---|
| Static visual | `pw.navigate/resize/take_screenshot` + **`Read` the PNG**, `pane.computer zoom`, `pw.evaluate` overflow/contrast | hover/focus/pressed, motion, dark mode, untested widths (`INSPECTION.md:84-85`) | **KEEP** |
| Interactive UI | `pw.snapshot` + per-step `pw.evaluate` assertion, break set (`INSPECTION.md:88-105`) | perceived latency, animation quality, anything past the first error | **KEEP** |
| Real-time 3D | `pane.javascript_tool` rAF sampler (two calls, `n===600`), `window.__probe`, soak, console (`:107-141`) | input feel, netcode; and the bar is footage, so frame times are **budget checks only** | **KEEP, proxy-labelled** |
| Motion | `getAnimations().pause()` + `currentTime` sweep + ffmpeg tile (`:143-176`) | easing feel, audio sync; **void** for rAF/canvas/WebGL/GSAP without a `window.__setTime` hook | **KEEP, with the hook as a build requirement** |
| API | `curl` matrix incl. `--path-as-is`, side-effect query (`:178-205`) | sustained load, value correctness | **KEEP** |
| Data | differential recomputation from the **spec** (`:207-225`) | a definition wrong-but-consistent | **KEEP** |
| Performance | n = 30 serial loop, p50/p95, cold vs warm, `/usr/bin/time -l` (`:227-247`) | **real concurrency and p99.9 — no load tool installed** (`:246-247`) | **KEEP, "real load" struck** |
| Prose | independent-reader Agent, cut test, cadence script, banned-phrase grep (`:249-280`) | **read-aloud: the agent cannot hear** (`:272`); factual accuracy | **KEEP, read-aloud → HUMAN GATE** |
| **Audio / voice** | `ffprobe`/`ebur128`/`astats`/`silencedetect`; provider transcript + tool-call log (`:284-293`) | **timbre, prosody, mispronunciation, artefacts — and the critic cannot hear at all; no ASR installed** (`:300-301`) | **ROUTE TO PROXY, and the product's audio claims must be cut** |
| Mobile | `ios(attach/launch/screenshot/tap/swipe/text/button/open_url)` + `Read` the PNG series (`:303-318`) | real-device perf, thermals, battery, camera, push; **simulator timings are never device timings** (`:322-325`) | **KEEP simulator; bar acquisition needs a human** |
| CLI | full parity — `gh`/`rg` install locally (`:327-345`) | startup distribution, long-run stability, concurrency, clean install | **KEEP (the strongest row)** |
| Agent systems | ≥20-case frozen eval, k = 3, transcript + tool-call trace, pass@k (`:347-363`) | 1-in-200 tail failures | **KEEP** |

## C5-1 — the flagship audio emission orders a deaf critic to judge a recording (BLOCKER) — wave-1 finding, CONFIRMED at both cited sites

`LAUNCH.md:78`, the row copied verbatim into every voice emission:
> "audio, voice, music, phone agent → runs the whole thing end to end and **judges the recording
> itself** — turn timing, interruptions, **the transcript against the audio**"

`LAUNCH.md:280-284`, example 5b's shipped prompt:
> "That critic runs the whole thing end to end and judges the recording itself … Then put our call and
> the rep's side by side, unlabelled, **matched for loudness, and make it pick**."

`INSPECTION.md:284`:
> "State the limit first: **the critic cannot hear.**"

`INSPECTION.md:300-301`: "**CANNOT DETECT** — Timbre, prosody, mispronounced proper nouns, artefacts →
human gate. **No ASR is installed here**, so do not claim a round-trip check." Verified: `whisper` is
absent.

"The transcript against the audio" is doubly impossible — it needs either hearing or ASR, and the
harness has neither. `LAUNCH.md:267-268`'s header partially concedes it ("Prosody and mispronunciation
are a human gate, not a critic call (INSPECTION.md §9)") while the prompt below it still orders the
blind audio pick. `LAUNCH.md:159` names the cost in its own reject table: "confident false passes, the
failure that killed a real run."

**Resolution — the decision C5 must make.** Audio is **routed to a named proxy**, not removed, because
the measurable half is real and verified (`ebur128`, `astats`, `silencedetect` all present) and
`EXAMPLES.md:130-134`/`:195-199` already models the honest form. Concretely:

- Row 78 becomes: "audio, voice, music, phone agent → **runs the call end to end and judges the
  transcript, the turn-timing marks and the tool-call trace; the audio itself is a HUMAN GATE**".
- Every audio verdict carries `parity: "proxy-biased"` (`INSPECTION.md:33-34`), so per
  `DOCTRINE.md:269` and `INSPECTION.md:34` it "may inform a round and may **never satisfy bar
  crossing**".
- `LAUNCH.md` 5b's forced-choice sentence is rewritten to the transcript-plus-timing pair, and its
  `MODALITY` header gains the `HUMAN GATE` line EXAMPLES already uses.

## C5-2 — BARS disqualifies the only audio comparison the harness can perform (BLOCKER)

`BARS.md:283`:
> "Compare **audio** — **transcript-only comparison is disqualified**, because timing is the whole game."

`BARS.md:294-295` (ANTI-BAR):
> "**grading the transcript**, or grading against the script document. Both are blind to latency,
> interruption, and prosody, which is where voice agents actually fail."

`INSPECTION.md:291-293`:
> "Voice agents: drive the real thing and **assert on the transcript**, never on "it sounded natural".
> Use `flowforge_run_test` or `flowforge_start_call`, then `flowforge_get_call` for the transcript and
> tool-call log."

`INSPECTION.md:299`: "A transcript-only bar reduces to transcript comparison, verdict `proxy-biased`."

BARS forbids exactly what INSPECTION prescribes, and forbids it as an ANTI-BAR — the strongest negative
label in the file. Under BARS the voice domain has no admissible probe at all.

**Resolution.** `BARS.md:283` becomes: "Compare transcript + timing marks + tool-call trace; the audio
A/B is a human gate. Label every verdict `proxy-biased`." The ANTI-BAR entry survives as "grading
against the **script document**" — that one is genuinely circular (`DOCTRINE.md:213`).

## C5-3 — two files send an unattended critic to place real phone calls (BLOCKER)

`BARS.md:281-282`: "**ACQUIRE** — Pull top-outcome recordings from the call platform's call list …
**place real test calls for yours**."
`BARS.md:279-280`: "Alt: … **a competitor's live inbound line, dialled and recorded** — check consent
law for the jurisdiction first."
`INSPECTION.md:292`: "Use `flowforge_run_test` or **`flowforge_start_call`**".

Against the repo's own carve-out, stated twice:
`README.md:157-158`: "**Actions are irreversible or side-effectful.** Sent messages, migrations,
filings, money. A critic cannot un-send. **Gate those on a human, always.**"
`DOCTRINE.md:398`: "**Side-effectful work** … Re-doing sends, payments, deploys, or writes to shared
state is not iteration, it is damage. → Loop on the artifact. **Execute once, outside the loop, with
human approval.**"

A gauntlet loop re-runs its probes every round (`FAILURE-MODES.md:240-241`, F17: the frozen probe set
"re-runs every round"). A frozen probe that dials a competitor's inbound line re-dials it every round.

**Resolution.** C5 marks live-call placement **operator-only, outside the loop**: the operator records
N calls once at round 0 into `bar/` and `probes/fixtures/`, and the in-loop probe is
`flowforge_run_test` against a test number or a replay fixture — never `flowforge_start_call` to a real
destination. Delete the competitor-line alt bar; it is a third-party recording decision no agent should
be told to make.

## C5-4 — "read it aloud" is prescribed in five files and disclaimed in the one that owns probes (MAJOR)

| Prescribes read-aloud as a critic act | Text |
|---|---|
| `LAUNCH.md:79` | "copy, docs, narrative, script → **reads it aloud** start to finish and **marks every line it stumbles on**" |
| `DOCTRINE.md:263` | "prose needs read-aloud" |
| `README.md:74` | "prose→read-aloud" |
| `install/SKILL.md:138` | "prose → read-aloud" |
| `BARS.md:199-200` | "Then **read both aloud** — cadence failures are inaudible on the page." |
| `ROLES.md:179` | "If it is prose, **read it aloud**." |

`INSPECTION.md:272`, in the prose recipe:
> "For a human ear: `say -o out.aiff -f draft.txt`, then hand the operator the `afplay` command. **The
> agent cannot hear it and must not pretend otherwise.**"

"Marks every line it stumbles on" is the same category error as the audio row: stumbling is an auditory
event. `ROLES.md:222`'s enum even blesses it as a modality value (`read_aloud`), and `EXAMPLES.md:441`
registers part C8 as `read_aloud` — where the actual probe is "fresh agent integrates from the doc
alone", which is INSPECTION's *independent reader* (`:252-255`), not read-aloud at all.

**Resolution.** C5 renames the capability to what the harness actually does. Row 79 becomes: "copy,
docs, narrative, script → **hands it to a fresh reader who has never seen the intent, and diffs what
they took away against what it was for; then runs the cadence script over both sides**". The enum value
becomes `independent_reader`; `say`/`afplay` stays as a HUMAN GATE line. `BARS.md:199-200` gets the same
treatment.

## C5-5 — "measures it under real load" is unavailable and the repo knows it (BLOCKER)

`LAUNCH.md:74`: "endpoint, query, render loop, build → **measures it under real load** and reads the
trace, not the summary"

`INSPECTION.md:246-247`: "**CANNOT DETECT** — Real concurrency and p99.9 **without a load tool. None is
installed here**, so say so rather than implying coverage." Verified: no `hyperfine`, no load generator.

`EXAMPLES.md:446-450` had to work around it in the one run that used this row:
> "There is no load generator on this machine — `INSPECTION.md` §7 says so in its CANNOT DETECT line and
> it is still true. So C5 is recipe 7's serial curl loop … and `p99 at sustained concurrency: NOT
> PROBED` appears in every C5 verdict."

`EXAMPLES.md:511-512` names the stake: "implying that coverage would be the exact **modality lie this
system exists to prevent**."

**Resolution.** Row 74 becomes: "endpoint, query, render loop, build → **times it n≥30 in one session,
reports p50/p95 cold and warm against a stated budget, and reads the trace, not the summary**". C5's
performance row states "sustained concurrency and p99.9: UNAVAILABLE → budget check or human gate".

## C5-6 — "pick which one feels faster" asks for a quality INSPECTION lists as undetectable (MAJOR)

`LAUNCH.md:314`, shipped example 5c:
> "Then have it type the same query into both, unlabelled, and pick **which one feels faster**."

`INSPECTION.md:104`: "**CANNOT DETECT** — **Perceived latency**, animation quality, anything past the
first error".

`LAUNCH.md:298` even declares the right modality in its own header ("latency and traces. Pixels would
pass a slow build that looks fine") and then asks for a feel judgment.

**Resolution.** "…and pick which one it would rather type into, citing the p95 and the trace" — the
forced choice survives; the perceptual claim does not.

## C5-7 — the data row hands probe selection to the critic, which DOCTRINE calls handing over the verdict (BLOCKER)

`LAUNCH.md:77`: "data, model, retrieval → runs it on **inputs it chose itself**, which the builders
never saw"

`DOCTRINE.md:265-267`: "**Evidence parity.** Both candidates captured by the same harness-owned probe,
at the same fidelity, with **candidate-independent selection: the probe set is fixed before either
artifact is looked at**".
`DOCTRINE.md:287-288` (Article 1): "**Choosing which probe runs** … is a judging power: it belongs to
the harness".
`DOCTRINE.md:244-245`: "Someone picked probes that flatter the work … **Probe selection is a judging
power; hand it to an interested party and you handed over the verdict.**"
`ROLES.md:163`/`:177`: the critic runs `{{PROBE}}`, singular, given to it.
`INSPECTION.md:210-211`: the data probe is a pre-authored `recompute.py` "from the SPEC, not from the
builder's code" — and `FAILURE-MODES.md:240` freezes it into `probes/`.

The row's *intent* (builders must not see the eval set) is right and is exactly `INSPECTION.md:350`'s
"Eval set ≥20 cases, **frozen**". Its *wording* gives the choice to the critic.

**Resolution.** "data, model, retrieval → **runs the frozen input set the builders never saw, and
recomputes the expected answer independently of their code**".

## C5-8 — the mobile row promises a comparison whose bar half needs a human and a physical device (MAJOR)

`LAUNCH.md:79`: "mobile app → drives it on the simulator at device scale, with real taps"

The candidate half is real (every `ios(...)` action verified). The **bar** half is not, and two files say
so:
`BARS.md:113-114`: "**ACQUIRE** — **Install the bar on the same device class and screen-record** the same
flow."
`INSPECTION.md:320-323`: "The bar **does not run in a simulator** … So: bar **screen-recorded on a real
device**, candidate via `xcrun simctl io booted recordVideo` … **Simulator timings are never device
timings**, so cold start, jank and haptics are budget checks or human gates, never A/B claims."

Nothing in the harness can install Things 3 on a physical iPhone or drive it. `BARS.md:125-126` also
rules out the two proxies an agent could reach ("the Human Interface Guidelines … and App Store
screenshots").

**Resolution.** C5's mobile row: candidate = simulator, **AVAILABLE**; bar = operator-supplied device
recording, **HUMAN-DEPENDENT, obtained at round 0**; every mobile verdict `parity: "proxy-biased"` unless
the operator supplied the recording; timing claims are budget checks only. `LAUNCH.md:79` gains the
proxy clause, and the `ACCESS` header must name who recorded the bar and when.

## C5-9 — the 3D bar's acquisition path is undocumented, and the one installed tool for it is unlisted (MINOR)

`BARS.md:50-51`: "For Doom, extract 3–5 stills and one 10s clip **from public gameplay footage**."
`INSPECTION.md:137-139` then assumes footage in hand ("The bar is footage and footage cannot be
measured") and gives the ffmpeg reduction.

No file names a tool that obtains the footage. `WebFetch` cannot download video. **`yt-dlp` is installed**
(`/usr/local/bin/yt-dlp`) and is absent from `INSPECTION.md:52-56`'s otherwise-accurate "Verified
installed" list.

**Resolution.** Add `yt-dlp` to the verified list with the one caveat that matters (the operator, not the
agent, decides what is lawful to download), and give `BARS.md:50` the concrete two-line acquisition
recipe. This also makes `EXAMPLES.md:78`'s "1080p60 screen recording + 240fps phone capture" reproducible.

## C5-10 — BARS' mimicry test 2 requires a channel ROLES forbids (MAJOR)

`BARS.md:445`: "**Four tests the critic runs.**" Test 2 (`:449-450`):
> "**Why test.** **Builder justifies** five borrowed decisions by the constraint each resolves. "Because
> Linear does" is a fail."

`ROLES.md:346-356` (ANTI-CAPTURE): "**Must never cross from builder to critic:** Any builder-authored
text: return, summary, transcript, plan, TODO list". `ROLES.md:399-400`: feedback to the builder is
"`largest_gap.gap` and nothing else". `ROLES.md:174-175`: "Do not read summaries, READMEs, changelogs,
commit messages … **Written claims about an artifact are never evidence about it.**"
`INSPECTION.md:392`: "A builder's summary is never evidence."

A critic that asks a builder to justify decisions is running F6 (`FAILURE-MODES.md:105-113`) as a probe.

**Resolution.** The why-test is an **orchestrator/red-team** check on the artifact, not a critic probe,
and it is answered from the source, not from the builder: `INSPECTION.md:406-410`'s compliance greps plus
`FAILURE-MODES.md:74-79`'s token-lift `comm -12`. C5 assigns each of BARS' four mimicry tests to a role.

## C5-11 — BARS' tell test requires the critic to know which side is the bar (MAJOR)

`BARS.md:454-455`: "**Tell test.** **Grep the artifact for the bar's literal strings**, hexes, class
names, and asset names."

`ROLES.md:210-213` (Forbidden knowledge): "which path is the candidate … **the goal statement and the
bar's name (both leak the mapping)**". A critic cannot grep for "the bar's strings" without being told
which artifact is the bar, and `ROLES.md:377-379`'s seal actively *fails the round* if a bar-naming
string is reachable from the arena.

**Resolution.** F4's version is already correct and role-safe (`FAILURE-MODES.md:74-77`: the
orchestrator greps `$RUN/bar` against `./src` and pipes to `comm -12`). C5 points BARS at F4 and deletes
the critic-facing wording.

## C5-12 — `LAUNCH.md`'s row-matching rule has no matrix to match against (MAJOR)

`LAUNCH.md:79-83`:
> "If no row matches, write one phrase in the same shape … **Never fall back to the nearest word match**:
> the word "agent" in a row is not a licence to click a phone agent instead of running the call and
> judging the recording"

The instruction is right and the example is the very case C5-1 shows is impossible. And the generator has
no capability table to consult: `LAUNCH.md:38-40`'s question 2 ("Can a fresh agent, with the tools on
this machine, actually open and inspect that artifact") is answered from the model's guess, not from
`INSPECTION.md`'s verified tool list, because `LAUNCH.md` never tells it to read INSPECTION.

**Resolution.** Make C5 **normative and loaded at STEP 2**: the generator picks a row from the matrix,
and a goal whose modality is marked UNAVAILABLE either gets its named proxy or halts. That closes the
deaf-critic class permanently, which is the point of C5 existing.

---

# §6. Self-referential failures — rules that condemn correct output

Beyond C1-9 (F8 cannot fire), C2-11 (I5's grep flags ROLES), C3-2 (the installer commits the failure it
warns about) and C4-5 (BARS' length signal beats the product), five more.

## §6-1 — F10's `/Users/` grep voids every verdict that obeys OPERATIONS and INSPECTION (BLOCKER)

`FAILURE-MODES.md:152` and the round-close audit `:381`:
> `grep -nEi 'our (version|build)|the candidate|localhost|/Users/' "${V[@]}"   # F10`
with `FAILURE-MODES.md:373`: "**Any hit stops the round.**"

Now the two rules that guarantee a hit:
`OPERATIONS.md:55`: "The script cannot write the run directory. It **passes absolute paths in prompts**".
`INSPECTION.md:439-440`: "`observations[].probe_step` carries the **copy-pasteable command**, not a
description of one."

A compliant critic on this machine writes `probe_step: "pw.navigate file:///Users/Nathan/…/arena/A/index.html"`
into the record, the flattener copies observations into the `.md` (`FAILURE-MODES.md:17`), and F10 fires
on correct output. `EXAMPLES.md`'s three verdicts avoid it only by paraphrasing commands
(`"probes/horde-converge.mjs vs A and B: …"`), which is what `INSPECTION.md:439` forbids.

Worse, `ROLES.md:379`'s seal has the same pattern **before** the round: `grep -rqiE
"$BAR_SLUG|$PRODUCT_SLUG|localhost|127\.0\.0\.1|/Users/" "$ARENA" && fail 'a side names itself'`. Any
real build tree contains `/Users/` in a lockfile, a source map, or a `.tsbuildinfo`. The seal aborts every
round on a real artifact.

**Resolution.** Both patterns must distinguish **provenance** from **location**. Concretely: grep for
`/Users/` only in prose fields (`largest_gap.*`, `compromised_how`, `NOTES`), never in `probe_step`; and
in the seal, restrict to the diffable surface (`git ls-files`-equivalent, excluding lockfiles, maps and
build output) and drop `/Users/` in favour of `$PRODUCT_SLUG` and the arena's own absolute prefix.

## §6-2 — F9's audit stops the round on correct static-visual verdicts (BLOCKER)

`FAILURE-MODES.md:139-142` gives F9 two forms. The structural one is conditional on human judgment ("any
**behavioural, timing or correctness** dimension there is a mismatch"), but the round-close audit
(`:392-393`) runs the **lexical** one with no dimension filter:
```bash
grep -lEi 'screenshot|\.png' "${V[@]}" \
  | xargs grep -LEi 'trace|assert|exit code|\.log|frame time|contract test'        # F9
```
Apply it to `EXAMPLES.md:296-315`, verdict B6 — a correct `measured` verdict whose probes include
`pw.take_screenshot … then Read both PNGs`: it matches `.png`, and contains none of `trace|assert|exit
code|.log|frame time|contract test`. Flagged. Round stopped.
Apply it to any correct recipe-1 verdict (`EXAMPLES.md:286-294` registers five parts as
`viewed_at_target_sizes` — B1, B2, B3, B7, B9): all flagged. Recipe 1 **is** the right modality for a
static-visual dimension, and `INSPECTION.md:64-85` is the file that says so.

Note also the pattern drift: F9's body version (`:139`) greps for `trace|assert|exit code|.log|frame
time|p95|read.aloud|contract test|input sequence`; the audit (`:393`) drops `p95`, `read.aloud` and
`input sequence`. Same check, two vocabularies.

**Resolution.** F9's only gate is the structural form, and it needs C1's `recipe_class` to be
mechanical — `INSPECTION.md:447-449` already spells out the fix:
`select(.recipe_class.n | IN(1,4))` intersected with a declared behavioural/timing/correctness dimension
class. C1 must therefore make `recipe_class` required (C1-4), and the dimension registry must carry a
`defect_class`. Until then, F9 stays a hint, not an audit line.

## §6-3 — the repo's own bar is below its own ceiling, by its own probe (MAJOR)

`DOCTRINE.md:190`: "**Above the ceiling** | Do one unassisted pass and blind-compare it to the bar. Does
your pass **lose**? | Fails when: **Your one pass wins or ties** — the bar is below the ceiling".
`DOCTRINE.md:192`: "It is the engine."

This system's own bar for its own domain is the baseline prompt (`BARS.md:362`). Its own wave-1 result:
`RESUME.md:27` — "**Every file scored `forced_choice: THIS_FILE_WINS`.** The content beats a smart
operator holding only the baseline prompt", corroborated in `reference/WAVE1-VERDICTS.md:4`.

By `DOCTRINE.md:190`, a first pass that wins means the bar is below the ceiling and must be escalated
(`BARS.md:416`). The system has not escalated; `BARS.md:362` still names the baseline as the default.

**Resolution.** Honest options, and C5/C4 should record which: (a) accept that the ten files are not the
emission — the *emitted launch prompt* is, and that comparison is `RESUME.md`'s untested W2-D; or (b)
escalate the agent-systems bar to a harder artifact (`BARS.md:365` already names two:
`~/.claude/skills/verification-loop/SKILL.md`, `eval-harness/SKILL.md`, both verified present). The
current state — a won pass against an unescalated bar — is the F1/soft-bar signature this repo exists to
catch.

## §6-4 — F1's soft-bar grep cannot match the phrase the skill advertises (MINOR)

`FAILURE-MODES.md:39`:
> `grep -nEi '(high|professional|production|world.?class|top.?tier|premium|polished)[ -](quality|grade|standard|level)' "$RUN"/launch-prompt.md`

`install/SKILL.md:8` lists as a trigger phrase: "**build this at AAA quality**". "AAA" is not in the
alternation, so the single most likely soft bar in this system's own inbound traffic — and the baseline's
own adjective (`reference/baseline-gauntlet-prompt.md:13`, "AAA quality") — passes F1 clean.

**Resolution.** Add `AAA|triple.?A|best.in.class|enterprise.grade|state.of.the.art` and drop the
requirement that a noun follow.

## §6-5 — the round-1 audit reports a stopped round on every healthy run (MINOR)

`FAILURE-MODES.md:394`: `git diff --shortstat "gauntlet-r$((N-1))..gauntlet-r$N"` — at N = 1 this is
`gauntlet-r0..gauntlet-r1`, and `gauntlet-r0` is never created (`OPERATIONS.md:117` and
`FAILURE-MODES.md:21` both tag from round 1). Git errors, and `FAILURE-MODES.md:398-399` reads an error as
"the record was never written — a stopped round".

**Resolution.** `[ "$N" -gt 1 ] && git diff --shortstat …`, or tag `gauntlet-r0` at round zero — which is
independently useful, because `DOCTRINE.md:196-197` makes the unassisted pass "**the round-0 artifact**
every marginal-gain comparison later measures against".

---

# §7. Claims about the harness that are false, invented, or stale

Almost all of the repo's harness knowledge checks out — this section is short because `OPERATIONS.md` and
`INSPECTION.md` did their homework. Verified true and worth protecting: Claude Code **2.1.207**
(`OPERATIONS.md:14`); the session-scoped workflows path (`:343-346`); the null-`durationMs` truncation
trap (`:356-360`); the `/loop`-is-the-interval-skill correction (`:24`, `LAUNCH.md:173-175`);
`pw.take_screenshot`'s `target` and `scale:"device"`; `pane.computer action:"zoom", region:[…]`; every iOS
`control` action plus `…__build`; the codex-cli explicit-model caveat; the full "Verified installed" and
"Absent" lists in `INSPECTION.md:52-56`.

| # | Claim | File:line | Status |
|---|---|---|---|
| 1 | `GAIN = {5:5, 7:6, 9:7}` is the wiring in `OPERATIONS.md` §5 | `DOCTRINE.md:366`, `:373`; `FAILURE-MODES.md:290` | **FALSE** — no such object exists anywhere in `OPERATIONS.md`. See C2-4, C2-5. |
| 2 | "Alpha and MIE are **not variables in that script**" | `DOCTRINE.md:373` | **FALSE** — `OPERATIONS.md:199` is `const MIE = 0.65`. |
| 3 | "Both rules below are then **integer lookups**" | `DOCTRINE.md:317` | **FALSE** for rule (b); `OPERATIONS.md:196` says "Compute it — do not tabulate it". |
| 4 | `INSPECTION.md` § Evidence hygiene contains a plaintext verdict block with `NOT PROBED` / `ORDER-SWAP RECHECK` | `ROLES.md:241-244` | **FALSE** — those labels appear nowhere in `INSPECTION.md`. See C1-5. |
| 5 | `LAUNCH.md` §7 holds the proxy rules | `install/SKILL.md:31`, `:74` | **FALSE** — `LAUNCH.md` ends at §6. |
| 6 | `LAUNCH.md` §2b | `EXAMPLES.md:85`, `:258`, `:407` | **FALSE** — STEP 2b is inside §1. |
| 7 | The verdict schema "does not list" `not_probed` and `order_swap` | `EXAMPLES.md:26-28` | **FALSE** — `ROLES.md:219-220`, `:237`. |
| 8 | A critic can judge a recording / compare audio blind / check "the transcript against the audio" | `LAUNCH.md:78`, `:280-284`; `BARS.md:283` | **UNRUNNABLE** — no hearing, no ASR (`whisper` absent). See C5-1, C5-2. |
| 9 | A critic can "read it aloud and mark every line it stumbles on" | `LAUNCH.md:79`; `ROLES.md:179`; `BARS.md:199` | **UNRUNNABLE** — `INSPECTION.md:272`. See C5-4. |
| 10 | A critic can measure "under real load" | `LAUNCH.md:74` | **UNRUNNABLE** — no load tool (`INSPECTION.md:246`, `EXAMPLES.md:446`). See C5-5. |
| 11 | A critic can pick "which one feels faster" | `LAUNCH.md:314` | **UNRUNNABLE** — `INSPECTION.md:104`. |
| 12 | `--resume` resumes a prior session's Workflow by `runId` | `install/SKILL.md:13`, `:151` | **UNRUNNABLE** — `OPERATIONS.md:408`, `RESUME.md:90-91`. See C2-13. |
| 13 | F8's score-delta signal | `FAILURE-MODES.md:129` | **UNRUNNABLE** — no score field exists. See C1-9. |
| 14 | `critic-seal.sh` runs as written | `ROLES.md:363-391` | **UNRUNNABLE** — `$BAR_SLUG`, `$PRODUCT_SLUG`, `$USER_DESC`, `$PROBE`, `$BUDGET` are unset under `set -u`; `$TPL` and `r$R/builder-*.json` are undeclared paths. See C3-3. |
| 15 | The installed skill can open `reference/baseline-gauntlet-prompt.md` | `BARS.md:362` | **UNRESOLVABLE after install** — `install/SKILL.md:160` deletes `reference/`. See C3-5. |
| 16 | The install run-dir list is what the audit greps | `install/SKILL.md:66-71` | **INCOMPLETE** — missing `gaps.tsv`, `.sides`, `evidence/`, `report.md`, `current`. See C3-2. |
| 17 | `yt-dlp` is not among the verified tools | `INSPECTION.md:52-56` | **STALE** — it is installed, and `BARS.md:50` depends on the capability. See C5-9. |
| 18 | Three independent runs each spent exactly "165 panel judgments" | `EXAMPLES.md:200`, `:345`, `:505` | **UNSUPPORTED** — identical totals across runs of 8, 9 and 8 parts over 5, 5 and 4 rounds is a copy-paste artefact. (The three spend sums do reconcile: 26+165+5+4 = 200, 33+165 = 198, 17+165+4 = 186.) |
| 19 | `isolation: 'remote'` throws in this build; `[stall]` = 180s × 5 attempts; `phase()`/nested `workflow()` | `OPERATIONS.md:105`, `:372-374`, `:22` | **UNVERIFIED HERE** — consistent with `reference/BUILD-BRIEF.md:84-89`; flag as version-pinned, do not assume stale. |
| 20 | `DOCTRINE.md:349`'s `9/21 = [0.25, 0.64]` | `DOCTRINE.md:349` | **ROUNDING SLIP** — the true lower bound is `0.2447` → `0.24`. The band membership is unaffected. |

---

# §8. Recommended freeze order

1. **Write `CONTRACTS.md` with five sections and nothing else.** C1 = the merged schema (ROLES' fields +
   `recipe_class`/`parity`/`budget_checks` promoted to `required`) + the writer table + the `.md` footer.
   C2 = one rule with two clauses, both computable from `verdicts[]`/`deltas[]` and nothing else, floors
   n ≥ 10 and n ≥ 9, the pooled Wilson band as the decider, `MAX_ROUNDS` as an abort, and the honest
   headline: **marginal-gain collapse is the exit; bar crossing is rare by design.** C3 = the tree,
   including `templates/`, `r<N>/prompts/`, `r<N>/builder-<part>.json`, `gaps.tsv` (4 cols), `.sides`,
   `arbiter-log.tsv`, `spend.tsv` (round/agents/**tokens**), the `current` symlink, and what survives
   installation. C4 = one word cap (150) and one token denominator (per round, seeded 500k for 4 parts)
   plus the agent-run conversion and a default derived from C2's panel sizes. C5 = the twelve-row matrix,
   normative, loaded at `LAUNCH.md` STEP 2, with audio/mobile routed to named proxies and
   read-aloud/real-load/feels-faster struck.
2. **Then the three files that will crash a run:** `install/SKILL.md` (C2-2, C2-3, C3-1, C3-2, C4-2),
   `ROLES.md` (C2-10, C1-5, C3-3), `FAILURE-MODES.md` (C2-4, C1-9, §6-1, §6-2).
3. **Then `LAUNCH.md` STEP 2b** — four rows rewritten (C5-1, C5-4, C5-5, C5-7) and two example prompts
   (5b, 5c). This is the deaf-critic sweep `RESUME.md:65-68` scoped; it is wider than audio.
4. **Then `EXAMPLES.md`** — it cannot be patched. Re-cut all three runs against the frozen C2 panel sizes
   and the C1 schema. Preserve the four narratives that earn the file its place (bar interrogation, the R2
   modality void, the R1 blindness break, the C5 budget abort).
5. **Then `DOCTRINE.md:362-375`** (delete, point at C2) and **`BARS.md:457-467`** (delete the third
   verdict contract), **`BARS.md:283`/`:294`** (C5-2), **`BARS.md:449-455`** (C5-10, C5-11),
   **`BARS.md:410-411`** (C2-12).
6. **Then the citation sweep:** §7 rows 1–7, 17, 20 and C3-6 through C3-10. Cheap, and each one is a
   reader who follows a reference into nothing.
7. **Only then re-gate, and only then run W2-D.** `RESUME.md:74-80` is right that the blind A/B tournament
   is the gate that matters — but a tournament run against emissions produced by a router that still
   orders a deaf critic to judge a recording tests the wrong artifact.
