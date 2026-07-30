# CONTRACTS — frozen 2026-07-29 (v2, replaces v1)

Five contracts live here and nowhere else. A sibling file that disagrees with this one is the bug.
Rulings here are law; changing one requires a new dated freeze line and a re-gate of every file
that references it.

**v1 is superseded** — kept at `reference/CONTRACTS-v1-overbuilt.md` with the gate verdict that killed
it. v1 priced a minimum run at 25 agents and ~800k output tokens per round and still failed its own
gate on four BLOCKERs, one of them an arithmetically unreachable branch. v2 keeps every load-bearing
idea and deletes the apparatus. The lesson is the one this system teaches and then broke:
**machinery is a liability.**

**What v2 gives up, plainly.** Five judges cannot support a confident claim about a *small* quality
difference. Accepted: the alternative was a rule nobody can run or afford, which supports no claim
at all. Blind forced choice at n=5 speaks loudly about large gaps and stays honestly silent about
small ones. Report it that way.

**Conformance test — one test, stated once.** A file violates a contract when it *defines* a schema
field, a stop threshold, a run path, a ceiling, or a modality capability. Referencing one is legal;
`per C2` is legal; a copy is not. One file per contract may write the value, named below. There is
no second, stronger test — v1 had two, and nine conformers read them differently.

| Contract | Implementation (may write the value) | May reference, must not define |
|---|---|---|
| **C1** verdict schema | `ROLES.md` §3 (the critic block) | `INSPECTION.md`, `FAILURE-MODES.md`, `EXAMPLES.md`, `OPERATIONS.md` |
| **C2** stop rule | `OPERATIONS.md` §5 | `DOCTRINE.md` (why), `FAILURE-MODES.md`, `README.md`, `install/SKILL.md` |
| **C3** path layout | `OPERATIONS.md` §6 | every file that names a path |
| **C4** budget | `LAUNCH.md` (word ceiling), `OPERATIONS.md` §4 (token seed) | `README.md`, `install/SKILL.md` |
| **C5** modality matrix | this file; wired at `LAUNCH.md` STEP 2b and `INSPECTION.md` recipes | `BARS.md`, `ROLES.md`, `EXAMPLES.md` |

---

# C1 — THE CRITIC VERDICT SCHEMA

**C1.1** This is the whole schema. No file adds, renames, retypes, or omits a field.

```json
{ "type": "object",
  "required": ["dimension", "modality", "parity", "choice", "margin", "blind_integrity"],
  "properties": {
    "dimension":   { "type": "string" },
    "modality":    { "enum": ["executed","interacted","measured","independent_reader","called_api","viewed","other"] },
    "parity":      { "enum": ["matched","proxy-biased"] },
    "choice":      { "enum": ["A","B","indistinguishable",null] },
    "blocker":     { "type": ["string","null"], "description": "required when choice is null; null otherwise" },
    "margin":      { "enum": ["decisive","slight","equal"] },
    "probes_run":  { "type": "array", "items": { "type": "string" } },
    "observations":{ "type": "array", "items": { "type": "object",
                       "required": ["artifact","probe_step","observed"],
                       "properties": { "artifact": { "enum": ["A","B"] },
                                       "probe_step": { "type": "string" },
                                       "observed": { "type": "string" } } } },
    "largest_gap": { "type": ["object","null"],
                       "properties": { "artifact": { "enum": ["A","B"] }, "gap": { "type": "string" },
                                       "evidence": { "type": "string" } } },
    "not_probed":  { "type": "array", "items": { "type": "string" } },
    "human_gate":  { "type": ["string","null"] },
    "blind_integrity": { "enum": ["intact","compromised"] } } }
```

**C1.2 The blocked path is emittable.** A critic blocked before probing returns `choice: null` with
`blocker` set; `probes_run`, `observations` and `largest_gap` may then be empty. v1 required all
three unconditionally, forcing a blocked critic to *invent* evidence in the one path built to avoid
invention. When `choice` is **not** null, the critic must supply one `probes_run` entry, two
`observations` (one per artifact), and a `largest_gap`.

**C1.3 No score, rating, total, or rubric field, at any depth.** Detection is structural:
`jq 'paths(type=="number")'` over a verdict must return nothing. Numeric self-scoring is the
rubric-inflation failure — banned outright, not bounded.

**C1.4** `indistinguishable` never counts as a win and never closes anything. It is the signal to
change modality, not to stop.

**C1.5** `human_gate` is required on every `proxy-biased` and every `independent_reader` verdict —
exactly the cases where the harness cannot see what decides quality.

**C1.6** A verdict is void without evidence a third party can re-run. `probe_step` holds the
copy-pasteable command, not a description of one; `observed` holds literal output — a console line,
a timing, a status code, a quotation. A builder's summary is never evidence.

---

# C2 — THE STOP RULE

**The honest headline, and it leads every file licensed to mention termination.** The bar is above
the ceiling by construction, so **the normal exit is marginal-gain collapse: the panel can no longer
show that this round beat the last one.** That is not "we beat the bar." Bar crossing is real and
rare. Budget exhaustion is an **abort**, and must be reported using the word *abort*.

**C2.1 The rule.** Evaluated once at round close. Stop at the first clause that fires.

| # | Clause | Outcome |
|---|---|---|
| 0 | **VETO** — a probe in `probes/` that passed in an earlier round now fails | round is FAIL; no stop may be declared this round; continue to 1 |
| 1 | **ABORT** — budget remaining is below one round's cost, or `round > 12` | ABORT. Say *abort*. Record the resume handle |
| 2 | **STOP: bar crossing** — the crossing panel picks our side **4 or 5 of 5** | STOP. Rare by design |
| 3 | **STOP: collapse** — **two consecutive dry rounds** | STOP. The normal exit. Report standing gaps |
| 4 | **STOP: regression** — a dry round in which the delta panel picks the **previous** artifact 4 or 5 of 5 | STOP, roll back one round, re-cut |
| 5 | otherwise | continue |

Definitions, and nothing else here is a definition:

- **Panel size is 5.** Both panels. Five fresh critics, one judgment each.
- **Crossing panel:** our current artifact versus the frozen bar, blind. Verdicts with
  `parity: "proxy-biased"` are excluded — a proxy can show direction but can never establish that a
  bar was crossed. If fewer than 5 matched verdicts remain, no crossing is available this round.
- **Delta panel:** this round's artifact versus last round's, blind. **All** verdicts count,
  including `proxy-biased` ones. Excluding them would make audio and unrecorded mobile runs
  structurally unable to ever close.
- A **blocked** verdict (`choice: null`) counts in neither numerator nor denominator and is
  re-judged by one fresh critic. No reserve judges, no ordinal bookkeeping.
- A round is **dry** when both hold: the delta panel gives our new artifact **3 or fewer of 5**,
  and the round opened **no new gap**. Round 1 is never dry.
- Two consecutive dry rounds fire clause 3. Any non-dry round resets the count to zero.

**C2.2 The same rule by hand.** `$RUN` is the run directory, `$N` the round.

```bash
# Which side is ours this round. The round key is the literal string r<N> — e.g. "r3", never "3".
S=$(awk -v r="r$N" '$1==r && $2=="whole" {print $3}' "$RUN/.sides" | sed 's/candidate=//')
[ -n "$S" ] || { echo "FATAL: no .sides row for r$N"; exit 1; }   # empty S would silently score 0

count() { jq -r "$2 | .choice" "$RUN"/r$N-$1-j*-verdict.json | { grep -cx "$S" || true; }; }
total() { jq -s "[.[] | $2 | select(.choice != null)] | length" "$RUN"/r$N-$1-j*-verdict.json; }

kX=$(count whole 'select(.parity=="matched" and .choice!=null)')   # crossing: proxies excluded
nX=$(total whole 'select(.parity=="matched")')
kD=$(count delta 'select(.choice!=null)')                          # delta: proxies kept
echo "crossing $kX/$nX   delta $kD/5"
# clause 2: nX == 5 && kX >= 4   ·   dry: kD <= 3 && no new gap   ·   clause 3: two dry in a row
```

**C2.3** No counter other than the round cap decides anything, and the cap lives in the Workflow
script as an abort backstop — never in a role prompt.

**C2.4 Parts never terminate a run.** A part is *advisory-cleared* when its critic finds no fresh
gap. One critic closing a part is n=1 and is forbidden. Only the whole and delta panels stop a run.

**C2.5 Crossing outranks bar escalation.** A panel that satisfies clause 2 stops the run. Raising
the bar is an operator decision available only *after* a stop, and it opens a new run with a fresh
comparison history — as does re-fetching a bar.

**C2.6** `--resume` re-reads the bar hash, the launch prompt, and `run.json`, verifies the hash, and
starts a new Workflow from the last completed round. `resumeFromRunId` is same-session only, so
cross-session resume must not be advertised.

---

# C3 — THE PATH LAYOUT

**C3.1 Two roots, never confused.** `SKILL_DIR` holds `SKILL.md`; every sibling resolves as
`SKILL_DIR/<FILE>.md` with **no `../` segment anywhere**. `RUN` is
`<target-repo>/.gauntlet/<run-id>`, never under `SKILL_DIR`.

**C3.2 The tree.** The complete list.

```text
.gauntlet/current -> <run-id>          symlink beside the run dir
.gauntlet/<run-id>/
├── launch-prompt.md                   verbatim, never edited after launch
├── run.json                           runId, models, budget, bar_name, bar_slug, product_slug, part->owner
├── plan.md                            per part: one ARTIFACT:, one EVIDENCE:, one DEFECT_CLASS:
├── bar/                               frozen snapshot, fetched once, flat — no subdirectories
├── bar.sha256                         written by C3.4's command
├── probes/                            one file per frozen probe. Append only, never delete
│   └── fixtures/                      round-0 replay fixtures for side-effectful probes
├── gaps.tsv                           round<TAB>gap_id<TAB>status   (append-only log; see C3.3)
├── spend.tsv                          round<TAB>agents<TAB>output_tokens
├── .sides                             round<TAB>arena<TAB>candidate=A|B   — round key is literal "r<N>"
├── r<N>-<part>-j<NN>-verdict.json     the validated return. THE AUTHORITY
└── r<N>/
    ├── arena/{whole,delta,<part>}/{A,B}
    ├── evidence/                      immutable per round; never overwrite an earlier round
    └── report.md                      deltas, choices, cost, standing gaps
```

**C3.3 `gaps.tsv` is an append-only log and `closed` is reachable.** A new gap is appended `open`.
A gap that matches an existing `gap_id` is appended `dup:<gap_id>`. Closing a gap appends a **new
row** for that same `gap_id` with status `closed`; current status is the last row for that id. v1
forced every repeat id to `dup:` and made `closed` unwritable.

**C3.4 Hash commands are cwd-pinned,** because `shasum` embeds the path as given and a
relative/absolute mismatch reports bar drift on an unchanged bar:

```bash
(cd "$RUN" && shasum -a 256 bar/* > bar.sha256)                    # freeze once
(cd "$RUN" && shasum -a 256 bar/* | diff - bar.sha256)             # check each round
```

**C3.5** The Workflow script has no filesystem access: it passes **absolute** paths in prompts,
agents write the files, and structured returns come back via `schema`.

**C3.6** Provenance greps read prose fields only — `largest_gap`, `blocker`, notes. `probe_step`
carries absolute arena paths by contract, so a bare `/Users/` pattern over a whole record would void
correct output.

**C3.7** Any command referencing round `N-1` is guarded by `[ "$N" -gt 1 ]`.

**C3.8 What survives installation.** The install copies every root `.md` — `CONTRACTS.md` included,
since an install that ships the law without loading it fails its own gate — plus
`reference/baseline-gauntlet-prompt.md` to `SKILL_DIR/bars/`, because that attributed third-party
text is the default bar for the agent-systems domain. `install/` and the rest of `reference/` are
not copied. `README.md` states no absolute path for itself; it is copied to `SKILL_DIR`.

---

# C4 — THE BUDGET

**C4.1 Word ceiling: 150.** One number, and there is no second one. Counted with `wc -w` over the
emitted launch prompt alone. Every "~120", "~130" and "100–150" elsewhere becomes a pointer here.

**C4.2 Round cost seed: 250,000 output tokens per round** at 4 parts, +40k per part beyond 4.
Derived, not asserted: 5 crossing judges + 5 delta judges + 4 builders + 1 round-close agent = 15
agents, at roughly 32k output tokens for a judging agent and 45k for a builder. **Output** tokens is
the only unit `budget.spent()` counts; a run record's total is roughly 10× larger. Recalibrate from
the actual delta after round 1 — this is a target, not a ceiling.

**C4.3 Default agent-run ceiling: 60.** Fifteen agents per round, and the earliest the normal exit
can fire is round 3, since round 1 is never dry and clause 3 needs two consecutive dry rounds.
Four rounds of headroom funds one compliant termination test plus a veto round.

**C4.4 Two currencies, one round count.** Output tokens is the harness currency and agent-runs the
operator currency. Both derive from the chosen round count, never from each other. Turns are not a
currency and no knob takes dollars.

---

# C5 — THE MODALITY CAPABILITY MATRIX

**C5.1 Normative, and loaded before the launch prompt is emitted.** The generator picks a row; it
does not guess from file type and does not improvise a phrase for a capability marked UNAVAILABLE.
A goal whose deciding modality is UNAVAILABLE gets the named proxy, or the generator **halts and
names the missing capability**. No file may order an inspection this table does not grant. This is
the permanent fix for the deaf-critic defect, where one file ordered critics to blind-compare
recordings while another stated the critic cannot hear.

Two domains route rather than improvise: *Infrastructure & IaC* → the CLI row for plan/apply output,
plus the Data row for differential recomputation against the spec. *Security posture* → the Prose
row over the review artifact, with any exploitability claim as a `human_gate`.

| Modality | CAN inspect — the real tool | CANNOT | Ruling |
|---|---|---|---|
| Static visual | Playwright navigate/resize/screenshot then **Read the PNG**; `evaluate` for overflow and computed contrast | hover/focus/pressed, motion, dark mode, untested widths | **AVAILABLE** |
| Interactive UI | `snapshot` + a per-step `evaluate` assertion + the break set | **perceived latency**, animation quality, anything past the first error | **AVAILABLE**; "feels faster" REMOVED |
| Real-time 3D | in-page rAF sampler, `window.__probe`, soak, console messages | input feel, netcode | **AVAILABLE**; the bar is footage, so frame times are budget checks only |
| Motion | `getAnimations().pause()` + `currentTime` sweep + padded frames + `ffmpeg` tile → Read | easing feel, audio sync | **AVAILABLE only with a `window.__setTime(ms)` hook**; without it the sheet is void and must be declared void |
| API | the `curl` matrix, plus the store query proving the side effect | sustained load, correctness of returned values | **AVAILABLE** |
| Data | differential recomputation from the **spec** on a frozen input set the builders never saw | a definition wrong but consistently applied | **AVAILABLE**; probe selection is harness-owned |
| Performance | n ≥ 30 serial loop, p50/p95, cold vs warm, same machine and session, `/usr/bin/time -l` | **sustained concurrency, p99.9 — no load tool installed** | **AVAILABLE**; "under real load" REMOVED |
| Prose | fresh-context agent as independent reader; the 70% cut test; banned-phrase grep | **hearing anything**; factual accuracy | **AVAILABLE as independent reader**; read-aloud REMOVED → HUMAN GATE |
| **Audio / voice** | `ffprobe`; `ffmpeg -af ebur128 / astats / silencedetect`; a test-call run for transcript, tool-call log, turn timing | **timbre, prosody, mispronunciation, artefacts — the critic cannot hear, and no ASR is installed** | **PROXY** (C5.3) |
| Mobile | simulator attach/launch/screenshot/tap/swipe, Read the PNG series, `xcrun simctl io recordVideo` | real-device perf, thermals, battery, camera, push | candidate **AVAILABLE**; bar half **PROXY** (C5.4) |
| CLI | every probe step against both sides; `gh`/`rg`-class bars install locally | startup distribution, long-run stability, clean install | **AVAILABLE** (full parity) |
| Agent systems | frozen ≥20-case eval, k=3, transcript and tool-call trace, pass@k | 1-in-200 tail failures | **AVAILABLE**; bar per C5.5 |

**C5.2 Media and measurement tools, verified present on this machine 2026-07-29:** `ffmpeg`
(libx264, loudnorm, ebur128, astats, silencedetect), `ffprobe`, `curl`, `jq`, `python3`, `sqlite3`,
`say`, `afplay`, `screencapture`, `xcrun`, `yt-dlp`. **Verified absent:** ImageMagick, `hyperfine`,
`duckdb`, `whisper`. No file may claim a media or measurement binary this list does not name — that
defect is what produced the deaf critic. This rules nothing about ordinary developer tools or about
the MCP tools the matrix names. The operator, never the agent, decides what is lawful to download.

**C5.3 Every UNAVAILABLE cell has exactly one of two fates.** REMOVED: struck from the router
phrase, the example emissions, and the recipes. PROXY: a named tool stands in, the verdict carries
`parity: "proxy-biased"`, and per C2 it counts in the delta panel but can never establish bar
crossing. There is no third option.

**C5.4 Audio and mobile, settled.** Audio is PROXY, not removed: the measurable half is real —
transcript, turn timing and tool-call trace from a test call, plus loudness, clipping and dead-air
from `ebur128`/`astats`/`silencedetect`. **The downgrade in one sentence:** this proxy cannot observe
timbre, prosody, mispronunciation or artefacts, which is where callers actually judge a voice agent
— so every audio verdict is `proxy-biased`, can never cross a bar, and must carry a `human_gate`
naming the file and what to listen for. Mobile: candidate is the simulator; the bar half needs an
operator-supplied real-device recording captured at round 0, and without it every mobile verdict is
`proxy-biased` with a `human_gate`. Simulator timings are never device timings.

**C5.5 No live calls inside the loop.** A frozen probe re-runs every round, so a probe that dials a
real number dials it every round. Record calls **once, at round 0**; in-loop probes hit a test
destination or replay a fixture.

**C5.6 The self-reference, ruled.** Every wave-1 reference file beat the baseline prompt in blind
forced choice, which under the "above the ceiling" test would imply the bar sits below our ceiling.
That does **not** condemn the bar: the ten reference files are not the product — **the emission is**
— and the licensing comparison is the blind A/B tournament of emitted launch prompts, which has not
run. **Nothing in this repo may claim the baseline has been beaten until it does.**
