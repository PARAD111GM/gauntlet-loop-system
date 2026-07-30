# CONTRACTS — frozen 2026-07-29
Five contracts live here and nowhere else. Every other file **references** them and restates **zero** of them. A sibling that disagrees with this file
is the bug. Input: `reference/CONFLICT-LEDGER.md`; **every** numbered conflict is resolved in this file, its recommendation overruled only where a line
says so. Four need no contract section and are ruled right here, one line each, for the file that owns them: F1's soft-bar grep gains
`AAA|triple.?A|best.in.class|enterprise.grade|state.of.the.art`, trailing noun **optional**; `ROLES.md`'s "supersedes `INSPECTION.md` § Evidence hygiene"
paragraph collapses to "The C1 schema is the critic's whole reply", the cited section having never existed; `DOCTRINE.md`'s `9/21` lower bound is **0.24**;
`EXAMPLES.md`'s three identical "165 panel judgments" are a copy-paste artefact, re-cut with the runs. Nothing else in the ledger is outstanding.
**Conformance check.** Any *definition* of a schema field, a stop threshold, a run path, a word or token ceiling, or a modality capability is a violation unless
that file is the contract's implementation. `per C2` is legal; a copy is not. `install/SKILL.md`'s gate is the one place a contract is reprinted verbatim, and it
may not paraphrase. Where the table below licenses a file to *wire* a number, writing that number there is the wiring, not a forbidden copy.

| Contract | Sole implementation (the wiring) | May reference, must not restate | Must not mention |
|---|---|---|---|
| **C1** verdict schema | `ROLES.md` §3 emits it; `OPERATIONS.md` §6 writer table | `INSPECTION.md`, `FAILURE-MODES.md`, `EXAMPLES.md`, `DOCTRINE.md` | `BARS.md`, `README.md`, `LAUNCH.md` |
| **C2** stop rule | `OPERATIONS.md` §5 (the script) | `DOCTRINE.md` (why), `FAILURE-MODES.md` F20, `install/SKILL.md` gate (verbatim), `README.md` | **all of** `LAUNCH.md` (§2's termination prose is deleted, not just the emission), `ROLES.md` prompts, `BARS.md` |
| **C3** path layout | `OPERATIONS.md` §6 tree; `install/SKILL.md` step 6.1 creates it | every file that greps a path | — |
| **C4** emission budget | `LAUNCH.md` §1 BLOCK 1/2 + STEP 4; `install/SKILL.md` gate; `OPERATIONS.md` §4's `let roundCost =` line, the one **executable** copy of C4.2's number | `README.md`, `DOCTRINE.md`, `BARS.md` | `ROLES.md` |
| **C5** modality matrix | `LAUNCH.md` §1 STEP 2b router; `INSPECTION.md` recipes 1–12 | `BARS.md` ACQUIRE/BLIND, `ROLES.md` `{{PROBE}}`, `EXAMPLES.md` | — |

# C1 — THE CRITIC VERDICT SCHEMA
**C1.1** The whole schema — `ROLES.md`'s fields plus `INSPECTION.md`'s additions. No file adds, renames, retypes, or omits.

```json
{ "type":"object", "required":["dimension","modality","recipe_class","parity","probes_run","observations",
              "choice","margin","largest_gap","not_probed","blind_integrity"], "properties": {
  "dimension": {"type":"string"}, "margin": {"enum":["decisive","slight","equal"]},
  "modality": {"enum":["executed","interacted","measured","independent_reader","called_api","viewed_at_target_sizes","other"]},
  "recipe_class": {"type":"object","required":["n","name"], "properties":{
    "n":{"type":"integer","minimum":1,"maximum":12},"name":{"type":"string"}}},
  "parity": {"enum":["matched","proxy-biased"]}, "probes_run": {"type":"array","minItems":1,"items":{"type":"string"}},
  "observations": {"type":"array","minItems":2,"items":{"type":"object",
    "required":["artifact","probe_step","observed"], "properties":{"artifact":{"enum":["A","B"]},
      "probe_step":{"type":"string","description":"the copy-pasteable command, not a description of one"},
      "observed":{"type":"string","description":"literal: console line, timing, quote, status code"}}}},
  "choice": {"enum":["A","B","indistinguishable",null]},
  "blocker": {"type":["string","null"], "description":"required when choice is null"},
  "largest_gap": {"type":"object","required":["artifact","gap","evidence","why_it_dominates"], "properties":{
    "artifact":{"enum":["A","B"]},"gap":{"type":"string"},"evidence":{"type":"string"},"why_it_dominates":{"type":"string"}}},
  "not_probed": {"type":"array","minItems":1,"items":{"type":"string"},
    "description":"each string ENDS with the covering recipe: 'hover and focus states -> recipe 2'"},
  "budget_checks": {"type":"array","items":{"type":"object","required":["metric","budget","observed","pass"], "properties":{
    "metric":{"type":"string"},"budget":{"type":"string"},"observed":{"type":"string"},"pass":{"type":"boolean"}}}},
  "human_gate": {"type":["string","null"],
    "description":"file path + exactly what a human must hear or see; C1.4's audit line decides when it is required"},
  "order_swap": {"enum":["not_run","same","flipped"],
    "description":"orchestrator-only, ABSENT from every critic return; the orchestrator sets it on the joined pair"},
  "blind_integrity": {"enum":["intact","compromised"]}, "compromised_how": {"type":["string","null"]} }}
```

**C1.2** `not_probed` is `array<string>`, `minItems 1`. Never objects, never a bare string.
**C1.3** `order_swap` is orchestrator-written and **absent from a critic's return** — which is why it is not in `required`. A critic that emits the key at all, `not_run` included, has seen its twin: `blind_integrity` is false, discard and re-judge.
**C1.4** `recipe_class` and `parity` are **required**; `budget_checks` is optional, empty when the SPLIT move never fired. `blocker` is required when `choice` is
null; `human_gate` on every `proxy-biased` verdict (C5.4, C5.6) and every `independent_reader` one (C5.7) — that pair is the whole of "where C5 says HUMAN GATE".
JSON Schema expresses neither, so the round-close agent runs one audit line before copying any verdict and **non-empty output is a reject**: `jq -r 'select((.choice==null and (.blocker|not)) or ((.parity=="proxy-biased" or .modality=="independent_reader") and (.human_gate|not))) | input_filename' "$RUN"/r$N-*-verdict.json`
**C1.5** No **score, rating, total, or rubric field** at any depth. Detection is structural — `jq 'paths(type=="number")'` returns only paths inside `recipe_class.n`; any other numeric path is F8. This retires F8's score-delta signal, which could never fire.
**C1.6** `modality` is that closed enum, one value, no composites. `read_aloud` is deleted; `independent_reader` replaces it.
**C1.7** **`indistinguishable` never counts as a win and never clears anything.** It is in the denominator of both C2 panels, never the numerator, and never closes
a part; it is the signal to change modality (`OPERATIONS.md` §9 move 2). Every contrary rule elsewhere is deleted.
**C1.8** No second verdict contract exists. `BARS.md`'s plaintext block — `BLIND RESULT`, `MIMICRY FINDINGS`, the `pass | pass-with-mimicry | fail` enum — is
deleted; a hedged pass is F5 by construction. Mimicry findings go to `observations`, a `not_probed` entry, and `report.md`.
**C1.9** The `.md` twin is a flattened copy; the `.json` is the authority. Footer = exactly four lines in this order, **all four written at once by the round-close
agent** after judging, which reads the fourth out of `.sides`: `MODEL:` (the spawn call's `opts.model`) · `CHOICE: <A|B|indistinguishable|null>` ·
`BLOCKER: <string or ->` · `SIDES: candidate=<A|B>`. **One encoding of that fact exists** — `.sides` column 3, copied verbatim; `OPERATIONS.md` §6's
`A=bar|cand` form is deleted, and nothing writes `bar`/`cand`, which names the side the blind is hiding.
**C1.10** Two writers, and **neither holds termination authority**; termination lives only in the script. The **arena agent** (round-boundary spawn) writes
arena `{A,B}`, `.sides` and the `critic-seal.sh` run. The **round-close agent** writes `r<N>-<part>-j<NN>-verdict.json` (verbatim copy of the validated
return), all four footer lines including `SIDES:`, `spend.tsv`, `gaps.tsv` and `report.md`. Nothing else writes any of them.
**C1.11** Provenance greps read prose fields only — `largest_gap.*`, `compromised_how`, `NOTES`. `probe_step` and `probes_run` carry absolute `/Users/…`
arena paths by contract, so F10's `/Users/` pattern over a whole record voids correct output. Same principle for the seal: C3.8.
**C1.12** F9 has one gate, the structural one, and C3.2 makes it runnable: `jq -r 'select(.recipe_class.n | IN(1,4)) | .dimension'` intersected with the
dimensions whose `plan.md` `DEFECT_CLASS:` is `behavioural`, `timing` or `correctness`. The lexical `screenshot|\.png` grep is a hint, never an audit line.

# C2 — THE STOP RULE
**The honest headline. It leads every file the C2 row licenses to mention termination, and no other file raises the subject.** The bar is above the ceiling by
construction, so **the normal exit is marginal-gain collapse: the panel can no longer demonstrate that this round beat the last one, and the best gain still
available is not worth paying for.** That is not "we beat the bar." Bar crossing is real and **rare by design**; budget exhaustion is an **abort**, reported with
the word *abort*. Most runs end on collapse or abort.
**C2.1 — THE RULE.** One rule, evaluated once at round close, in this order, on data the harness produces today. Stop at the first clause that fires.

| # | Clause | Outcome |
|---|---|---|
| 0 | **VETO** — a probe in `$RUN/probes/` that passed in an earlier round now fails | round is FAIL; **no stop may be declared this round**; go to 1 |
| 1 | **ABORT (budget)** — `budget.total && budget.remaining() < roundCost`, or `r > MAX_ROUNDS` | ABORT. Say *abort*, record the resume handle |
| 2 | **AUTHORING ABORT** — `n_V ∉ {10,15,20,30}` on a crossing round, or `n_D < 9` | ABORT with the throw text |
| 3 | **STOP: bar crossing** — `k_V >= CROSS[n_V]`, `CROSS = {10:9, 15:12, 20:15, 30:20}` | STOP. Rare by design |
| 4 | **STOP: marginal-gain collapse** — `dry >= 2` and `band(pool.k, pool.n) === 'collapse'` | STOP. **The normal exit.** Report standing gaps |
| 5 | **STOP: regression** — `dry >= 2` and `band(pool.k, pool.n) === 'regression'` | STOP, roll back to `gauntlet-r<N−1>`, re-cut. **Not** a completion |
| 6 | otherwise | continue to round `r+1` |

Definitions, and nothing else is a definition:
- `side_X = candAt(r, X)`, `X` = `WHOLE = parts.length` or `DELTA = parts.length + 1`. **One arena, one side, whole panel** — never
  `candAt(r, judgeIndex)`, which turns a clean 10–0 into 5.
- `verdicts[]` = the crossing panel's validated returns for arena `whole`, **excluding every verdict with `parity: "proxy-biased"`**; `n_V` = what
  remains, and below 10 no crossing is available this round; `k_V` = count where `choice === side_WHOLE`.
- `deltas[]` = **every** validated return for arena `delta` **regardless of `parity`** (the exclusion above is crossing-only: a proxy shows round-over-round
  direction where it can never cross a bar); `k_D` = count where `choice === side_DELTA`. Excluding proxies here would put audio (C5.4) and unrecorded
  mobile (C5.6) into clause 2 at every round close, making both structurally unrunnable — read this sentence, not the word "likewise".
- A **blocked** verdict (`choice: null`, `blocker` set) validates but counts in **neither `k` nor `n` of either panel** and is re-judged by a fresh critic.
  Panels therefore spawn **one reserve judge**, scored only in place of a blocked verdict, so `n_V` still lands on a listed `CROSS` value and no blocker can abort a round under clause 2.
- `MIE = 0.65`, `alpha = 0.05` one-tailed — written into `run.json` before round 1, never touched. A run lacking them terminates on budget only.
- `band(k,n)` = the 95% two-sided **Wilson score interval** (z = 1.96), **computed, not tabulated**: `hi < 0.5` → `regression`; `lo <= 0.5 && hi < MIE` →
  `collapse`; else `live`.
- A round is **dry** when all three hold: `band(k_D, n_D) !== 'live'`; the round-close agent appended **no `gaps.tsv` row with `status: open`** (dedup is that
  agent's job and that column its whole vocabulary — a gap matching any earlier `gap_id` is written `dup:<gap_id>`, never `open`); and **insertions + deletions
  < 25**, summed, from `git diff --shortstat gauntlet-r$((N-1))..gauntlet-r$N`. Round 1 is never dry. Dry increments `dry` and accumulates `pool`; any live round resets both.
- `dry >= 2` only **triggers** the test; the pooled band **decides**. Above the band: log it, `dry = 1`, enlarge the delta panel, continue.

**C2.2 — the same rule by hand**, from the run directory, no script:

```bash
S=$(awk -v r="r$N" '$1==r && $2=="whole"{print $3}' "$RUN"/.sides | sed 's/candidate=//')
V='select(.parity=="matched" and .choice!=null)'; D='select(.choice!=null)'   # delta keeps proxies
nV=$(jq -s "[.[]|$V]|length" "$RUN"/r$N-whole-j*-verdict.json)
kV=$(jq -r "$V|.choice" "$RUN"/r$N-whole-j*-verdict.json | { grep -cx "$S" || true; })   # || true: k=0 exits 1
band(){ python3 -c 'import sys,math;k,n=int(sys.argv[1]),int(sys.argv[2]);p=k/n;z=1.96;d=1+z*z/n
c=(p+z*z/(2*n))/d;h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;lo,hi=c-h,c+h
print(round(lo,4),round(hi,4),"regression" if hi<0.5 else "collapse" if lo<=0.5 and hi<0.65 else "live")' $1 $2; }
# clause 3: nV listed AND kV >= CROSS[nV]. Repeat nV/kV over delta-j* with $D (side_DELTA, proxies kept), then
# `band $kD $nD` for dryness, `band $poolK $poolN` for clauses 4 and 5.  Verified: `band 9 21` -> 0.2447 0.6345 collapse.
```

**C2.3 — schedule and floors.** The delta panel (`n_D >= 9`) runs at **every** round close; the crossing panel (`n_V >= 10`) at **round 1** and on **every round where `dry >= 1`**. Round *down* to a listed `n` when you **size** a panel; an unlisted `n` at scoring time is clause 2.
**C2.4** `MAX_ROUNDS = 12` and every other number adjacent to `round` is an abort backstop living in the **Workflow script**. No counter, stall trigger, or
`rounds_without_gap_movement` threshold sits in a role prompt: the two-round no-movement escalation moves out of `ROLES.md`'s orchestrator block into the script.
**C2.5** **Parts never terminate anything.** A part is *advisory-cleared* when its panel finds no fresh gap; one critic closing a part is n = 1 and is forbidden. Only the `whole` and `delta` panels terminate a run.
**C2.6** There is **no** "judge twice with sides swapped, then stop": the swap is a blindness check on one judgment (F11), and two judgments is p = 0.25 against
a coin. `GAIN = {5:5, 7:6, 9:7}` does not exist and is deleted from `DOCTRINE.md` and `FAILURE-MODES.md`; `DOCTRINE.md`'s `n=5, k=5` row survives only as a
**pedagogical** row marked "clears alpha, below the C2 floor — not a permitted stop".
**C2.7 — precedence over bar escalation.** A panel satisfying clause 3 **stops the run**. Escalating the bar is an operator decision available only *after* a
stop, and it opens a new run-id with a fresh comparison history, as a re-fetched bar does (F3). The "indistinguishable twice" trigger is deleted (C1.7).
**C2.8** `--resume` re-reads `bar.sha256`, `launch-prompt.md` and `run.json`, verifies the hash, and starts a **new** Workflow from the last completed round's
state. `resumeFromRunId` is same-session only, so cross-session resume is not in the flag's contract and must not be advertised.

# C3 — THE PATH LAYOUT
**C3.1 — two roots, never confused.** `SKILL_DIR` holds `SKILL.md`; every sibling resolves as `SKILL_DIR/<FILE>.md` with **no `../` segment anywhere**.
`RUN` is `<target-repo>/.gauntlet/<run-id>`, never under `SKILL_DIR`, and nothing in a run directory is ever written into `SKILL_DIR`.
**C3.2 — the tree.** The complete list. `install/SKILL.md` step 6.1 says "create the layout in C3", enumerating nothing.

```text
.gauntlet/current -> <run-id>        symlink BESIDE the run dir, written by the round-zero agent
.gauntlet/<run-id>/
├── launch-prompt.md                 verbatim, never edited after launch
├── run.json                         keys per C3.3
├── plan.md                          part registry; per part one ARTIFACT:, one EVIDENCE: (F15), one DEFECT_CLASS: behavioural|timing|correctness|visual|other (C1.12)
├── bar/                             frozen snapshot, fetched ONCE, FLAT — no subdirectories
├── bar.sha256                       written by C3.7's command
├── templates/critic.txt             the ROLES.md §3 block, verbatim, slots UNFILLED
├── probes/                          one file per frozen probe. Append only, never delete (F17)
│   └── fixtures/                    round-0 replay fixtures for side-effectful probes (C5.5)
├── gaps.tsv                         round<TAB>part<TAB>gap_id<TAB>status (4 cols; F2 reads col 3); status ∈ open|closed|dup:<gap_id>, the whole vocabulary
├── spend.tsv                        round<TAB>agents<TAB>tokens          (run-record .tokens totals)
├── arbiter-log.tsv                  round<TAB>critic_choice<TAB>arbiter_choice   (F14)
├── .sides                           round<TAB>arena<TAB>candidate=A|B    (outside every arena)
├── r<N>-<part>-j<NN>-verdict.json   the validated schema return. THE AUTHORITY
├── r<N>-<part>-j<NN>-verdict.md     flattened twin, footer per C1.9
└── r<N>/
    ├── arena/{whole,delta,<dimension>}/{A,B}   i = parts.length | parts.length + 1 | that part's stable index
    ├── prompts/critic-<dimension>.txt
    ├── builder-<part>.json          builder returns; seal check 4 reads this glob
    ├── evidence/                    immutable per round; never overwrite an earlier round
    └── report.md                    deltas, choices, cost, standing gaps
```

**C3.3 — `run.json` required keys.** `runId`, `scriptPath`, `models`, `budget`, `alpha`, `MIE`, `agents_per_round`, `bar_name`, `bar_slug`, `product_slug`,
part→owner map — the complete list. `locator_floor` and `access_path` are **deleted**: neither had a definition, a producer or a consumer. `critic-seal.sh`
reads `bar_slug`/`product_slug` from here via `jq` rather than inheriting unset variables under `set -u`; `$USER_DESC`, `$PROBE`, `$BUDGET` come from `plan.md`.
**C3.4 — verdict naming.** `r<N>-<part>-j<NN>-verdict.{json,md}`; `<part>` is a dimension key or the reserved `whole`/`delta`, `j01…jNN` the judge's ordinal in
its panel. The ordinal is **mandatory** — C2 puts ten or more verdicts on one part in one round and `r<N>-<part>-verdict.json` collides. Advisory singles use `j01`.
**C3.5 — `spend.tsv` column 3 is TOKENS**, from the run record's `.tokens` totals — never `budget.spent()`, never seconds, which leave F21's BREACH check running but unable to fire.
**C3.6** The Workflow script has no filesystem: it passes **absolute** paths in prompts, agents write files, structured returns come via `schema`.
**C3.7 — hash commands, cwd-pinned**, since `shasum` embeds the path as given and a relative/absolute mismatch reports F3 on an unchanged bar: freeze once with
`(cd "$RUN" && shasum -a 256 bar/* > bar.sha256)`, check with `(cd "$RUN" && shasum -a 256 bar/* | diff - bar.sha256)`.
**C3.8 — the seal's grep surface.** `critic-seal.sh` check 2 scans only the diffable surface (tracked source; exclude lockfiles, source maps, build output,
`.tsbuildinfo`) and matches `$BAR_SLUG`, `$PRODUCT_SLUG` and the arena's absolute prefix — **not** a bare `/Users/`, which every build tree contains.
**C3.9** Any command referencing `gauntlet-r$((N-1))` is guarded by `[ "$N" -gt 1 ]`, unless the round-0 unassisted pass was tagged `gauntlet-r0` — worth doing, since that pass is round 1's comparand.
**C3.10 — what survives installation.** The install copies every root `.md` **plus** `reference/baseline-gauntlet-prompt.md` →
`SKILL_DIR/bars/baseline-gauntlet-prompt.md`, and deletes `install/` and the rest of `reference/`. Overruling the ledger's either/or: it is attributed
third-party text reproduced *as a comparison bar*, and deleting it left the agent-systems default bar resolving to nothing. `BARS.md` cites the installed path;
the verify `ls` and the reference map both cover **`CONTRACTS.md`** (an install that ships the law without loading it fails the gate), `EXAMPLES.md`, `README.md`.
**C3.11** `README.md` states no absolute repo path for itself — it is copied to `SKILL_DIR`, where that is false. `{{WORKTREE}}` is whatever the harness reports (`git worktree list`), never a literal.
**C3.12 — citations that must be correct.** Proxy rules are `LAUNCH.md` **§6**; the modality router is `LAUNCH.md` **§1 STEP 2b**, normative source C5; synthetic bars are `BARS.md` **§ BAR CONSTRUCTION**.

# C4 — THE EMISSION BUDGET
**C4.1 — word ceiling: 150. One number, and there is no second one.** Counted with `wc -w` over BLOCK 2 alone. Every "~120", "~130" and "100–150"
elsewhere becomes a pointer here; all six shipped emissions pass at 133–145.
**C4.2 — token ceiling: one number, one denominator.** `ROUND_COST_SEED = 800_000 output tokens per round at P = 4 parts, +100k per part beyond 4.`
**Per round**, never per agent-run, and **output** tokens — the only unit `budget.spent()` counts, where the record's `totalTokens` is ~10× larger.
**Derived, not asserted:** C4.3's `agents_per_round` at P = 4 is 19 judges + 4 builders + 2, and `OPERATIONS.md` §4 measures ~32k output per judge (318k record
÷ ~10) and ~45k per builder → ~610k + ~180k. The ledger's 500k was computed against a 13-agent round and is superseded by C2's panel sizes; "~150k output tokens
per agent-run" is deleted. `OPERATIONS.md` §4's seed line reads 800_000. Recalibrate from the `budget.spent()` delta after round 1 — target, never ceiling.
**C4.3 — two currencies, one round count, no rate conversion.** Output tokens is the **harness** currency, agent-runs the **operator** currency; both
ceilings derive from the same chosen round count `R`, never from each other: `agents_per_round = P builders + n_V + n_D + 2` (arena agent + round-close
agent) · `token target = R × ROUND_COST_SEED`, the `+<N>k` in the launching message · `agent-run ceiling = R × agents_per_round`, the `budget=<n>` flag.
`{{BUDGET}}` in `ROLES.md` is stated in output tokens. "Turns" is not a currency here, and no knob takes dollars.
**C4.4 — default ceiling, derived not asserted.** `default budget = 6 × agents_per_round`, floor 150 — at P = 4, `n_V = 10`, `n_D = 9` that is 25/round →
**150 agent-runs**. The **earliest** the normal exit can fire is round **3**: round 1 is never dry, so rounds 2–3 are the first consecutive dry pair. 6 is
twice that, because clause 0's VETO and clause 4's enlargement each push the exit out a round and neither is rare. The old default of 40 could not fund one
compliant termination test. The gate prints this derivation, doubling included.
**C4.5 — scope note, recorded not resolved.** `BARS.md`'s agent-systems signal is "shorter at equal power always wins" and that domain's default bar is the
~120-word baseline, so at 133–145 words our emissions lose that signal unless they carry more power — and the tournament establishing "equal power" has not
run. The cap **bounds** that loss; it does not win the comparison.

# C5 — THE MODALITY CAPABILITY MATRIX
**C5.1** Normative, and **loaded at `LAUNCH.md` STEP 2**. The generator picks a row; it does not guess from file type and does not improvise a phrase for a
capability marked UNAVAILABLE. A goal whose deciding modality is UNAVAILABLE gets the named proxy below, or the generator **halts and names the missing
capability**. No file may order an inspection this table does not grant. **No row matches ⇒ halt** — `LAUNCH.md` STEP 2b's "if no row matches, write one phrase
in the same shape" is deleted, an improvised phrase being exactly how a critic gets ordered to hear. The two `BARS.md` domains lacking a row of their own
**route**, they do not improvise: *Infrastructure & IaC* → the CLI row for `plan`/`fmt`/`apply` output plus the Data row for differential recomputation against
the spec; *Security posture* → the Prose row (independent reader) over the review artifact, any exploitability claim being a `human_gate`.

| Modality | CAN inspect — the real tool | CANNOT | Ruling |
|---|---|---|---|
| Static visual | `pw.navigate/resize/take_screenshot` (+`target`, `scale:"device"`) then **`Read` the PNG**; `pane.computer action:"zoom"`; `pw.evaluate` for overflow and computed contrast | hover/focus/pressed, motion, dark mode, untested widths | **AVAILABLE** |
| Interactive UI | `pw.snapshot` + a per-step `pw.evaluate` assertion + the break set | **perceived latency**, animation quality, anything past the first error | **AVAILABLE**; "feels faster / smoother" **REMOVED** |
| Real-time 3D | `pane.javascript_tool` rAF sampler in two calls (accept only `n===600`), `window.__probe`, soak, `pane.read_console_messages` | input feel, netcode | **AVAILABLE**; the bar is footage, so frame times are **budget checks only** |
| Motion | `getAnimations().pause()` + `currentTime` sweep + zero-padded frames + ffmpeg tile → `Read` | easing feel, audio sync; **void** for rAF/canvas/WebGL/GSAP with no hook | **AVAILABLE only with a `window.__setTime(ms)` build requirement**; without it the sheet is void and must be declared void |
| API | the `curl` matrix incl. `--path-as-is`, plus the store query proving the side effect | sustained load, correctness of returned values | **AVAILABLE** |
| Data | differential recomputation from the **spec**, on a **frozen** input set the builders never saw | a definition wrong but consistently applied | **AVAILABLE**; probe selection is harness-owned, never the critic's |
| Performance | n ≥ 30 serial loop, p50/p95, cold vs warm, same machine same session, `/usr/bin/time -l` | **sustained concurrency, p99.9 — no load tool installed** | **AVAILABLE**; "under real load" **REMOVED** → budget check or human gate |
| Prose | fresh-context `Agent` as independent reader; the 70% cut test; the cadence script; banned-phrase grep | **hearing anything**; factual accuracy | **AVAILABLE as independent reader**; read-aloud **REMOVED** as a critic act → HUMAN GATE |
| **Audio / voice** | `ffprobe`; `ffmpeg -af ebur128 / astats / silencedetect`; `flowforge_run_test` → `flowforge_get_call` for transcript, tool-call log, turn-timing marks | **timbre, prosody, mispronunciation, artefacts — the critic cannot hear, and no ASR is installed (`whisper` absent)** | **PROXY** (C5.4) |
| Mobile | candidate: `ios(attach/launch/screenshot/tap/swipe/text/button/open_url)` + `…__build`, `Read` the padded PNG series, `xcrun simctl io booted recordVideo` | real-device perf, thermals, battery, camera, push; **simulator timings are never device timings** | candidate **AVAILABLE**; bar half **PROXY**, human-dependent (C5.6) |
| CLI | every line of recipe 11 against both sides — `gh`/`rg`-class bars install locally | startup distribution, long-run stability, concurrency, clean install | **AVAILABLE** (full parity) |
| Agent systems | frozen ≥ 20-case eval, k = 3, transcript + tool-call trace, pass@k per `eval-harness` | 1-in-200 tail failures | **AVAILABLE**; bar per C5.8 |

**C5.2 — installed, verified on this machine 2026-07-29.** `ffmpeg` (libx264, loudnorm, ebur128, astats, silencedetect), `ffprobe`, `curl`, `jq`, `python3`,
`sqlite3`, `say`, `afplay`, `screencapture`, `xcrun`, **`yt-dlp`**. **Absent:** ImageMagick, `hyperfine`, `duckdb`, `whisper`. `yt-dlp` obtains bar footage
for the 3D and motion rows, and **the operator, never the agent, decides what is lawful to download**. **Scope:** this is the *media and measurement* surface —
no file may claim a media or measurement binary it does not name, the defect that produced the deaf critic. It rules nothing about ordinary developer tools
(`git`, `gh`, `rg`, `grep`, `awk`, `sed`, `shasum`, `diff`, `wc`, `/usr/bin/time`) or the MCP tools the matrix itself names.
**C5.3 — every UNAVAILABLE cell has one of exactly two fates.** REMOVED: struck from the router phrase, the example emissions, and the recipes. PROXY: a named
tool stands in and the verdict carries `parity: "proxy-biased"`, which per C2.1 **counts in the delta panel and can never satisfy bar crossing**. No third option.
**C5.4 — AUDIO, settled.** Audio is **PROXY, not removed**, because the measurable half is real and verified: **the transcript, turn-timing marks and tool-call
trace** via `flowforge_run_test` then `flowforge_get_call`, plus loudness, clipping and dead-air from `ebur128`, `astats`, `silencedetect` as `budget_checks`.
**The evidential downgrade, in one sentence:** this proxy cannot observe timbre, prosody, mispronunciation or artefacts — where callers actually judge a voice
agent — so every audio verdict carries `parity: "proxy-biased"`, can never satisfy clause 3, and must carry a `human_gate` naming the file and what to listen
for. It **does** count in the delta panel, which is what keeps an all-audio run runnable at all. `LAUNCH.md`'s audio row and example 5b lose "judges the
recording itself" and "the transcript against the audio"; `BARS.md`'s "transcript-only comparison is disqualified" is deleted, its ANTI-BAR surviving only as
"grading against the **script document**", which is genuinely circular.
**C5.5 — no live calls inside the loop.** A frozen probe re-runs every round, so a probe that dials a real number dials it every round. The operator records N
calls **once, at round 0**, into `bar/` and `probes/fixtures/`; in-loop probes use `flowforge_run_test` against a test destination or a fixture replay.
`flowforge_start_call` to a real destination is forbidden in-loop; the "competitor's live inbound line, dialled and recorded" alt bar is deleted.
**C5.6 — MOBILE, settled.** Candidate = simulator, AVAILABLE. Bar = **operator-supplied real-device screen recording, obtained at round 0**; nothing here can
drive a third-party app on a physical device, and HIG and App Store screenshots are ruled out as bars. Without that recording every mobile verdict is
`parity: "proxy-biased"` with a `human_gate` — and still counts in the delta panel. Cold start, jank and haptics are budget checks or human gates, never A/B claims; `ACCESS` names who recorded the bar and when.
**C5.7 — read-aloud, settled.** The agent cannot hear, so "reads it aloud and marks every line it stumbles on" is deleted from all six sites. The critic act is:
**hand the artifact to a fresh reader that never saw the intent, diff what it took away against what the piece was for, then run the cadence script over both
sides.** `say -o out.aiff` plus `afplay` goes to the operator as a `human_gate`; the enum value is `independent_reader`.
**C5.8 — the agent-systems bar, and the self-reference.** By `DOCTRINE.md`'s "above the ceiling" test, a first unassisted pass that **wins** means the bar is
below the ceiling — and every wave-1 file beat the baseline prompt. Ruling: the ten reference files are **not** the emission, so that result does not condemn the
bar; the emission is the *launch prompt*, and the licensing comparison is the untested blind A/B tournament. Two levels, output-level breaking ties: prompt-level
= the installed baseline (C3.10); output-level = both prompts on one goal at the same model and budget, artifacts compared blind.
`~/.claude/skills/verification-loop/SKILL.md` and `eval-harness/SKILL.md` (both verified present) are the escalation targets.
**C5.9 — the four mimicry tests are assigned to roles, and none asks a builder anything.** Novel-region → the **orchestrator** registers `<part>-novel`, a critic
judges it as a normal part. Substitution → the **orchestrator** authors the changed input, a critic judges normally. Tell test → the **round-close agent**, via
F4's `comm -12` of the bar's tokens against source, since a critic cannot grep for "the bar's strings" without being told which side is the bar. **Why test →
REMOVED as a critic probe**: it needs builder-authored justification, which is F6 run as a probe; it survives as the round-close agent's compliance greps only.

**Rulings here are law** for every other file in this repo; a file that disagrees is revised, not argued with. Changing a contract requires a new dated freeze line at the top and a re-gate of every file in that contract's referencing column.
