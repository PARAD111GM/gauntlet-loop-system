# INSPECTION — how a critic actually verifies

Turn "compare it to the bar" into probes that run, on both sides, at the same fidelity. `DOCTRINE.md` says why; this is the how. Bar
acquisition and per-domain neutralisation: `BARS.md`.

**Scope, and the law over it.** `CONTRACTS.md` is normative for every schema field, stop threshold, run path, ceiling and capability
claim. Nothing here restates one, and where this file and that one disagree, **this file is the bug.** What this file owns is the probe
text that fills `{{PROBE}}` in `ROLES.md`'s blind-critic block: **recipe *n* is C5 row *n*, in the matrix's own order.** Pick the row
with C5.1 (`LAUNCH.md` STEP 2b is the router) and **halt if no row matches** rather than improvising a phrase. C5.1 also routes the two
`BARS.md` domains with no row of their own; here they land on recipes 11 + 6 (*Infrastructure & IaC*) and 8 (*Security posture*).

## The rule

The founding incident is `DOCTRINE.md` invariant 4: the visual-only loop that scored itself 27 → 38 → 43 while a divergent integrator and
a silently failing Pointer Lock survived every round. A still frame carries no frame time, no input, no state transition, no elapsed time
— that defect class was not *representable* in the evidence type. What this file adds is the mechanism.

**THE RULE.** A verdict is valid only for the qualities its probe can observe. Declare the modality before the verdict; anything
unprobed goes in `not_probed`, never into the choice. Corollaries: capturing a screenshot is not seeing it, so the critic must `Read`
the PNG. No behaviour claim from static evidence, no perf claim from a single run, no correctness claim from a test suite the builder
also wrote, no compliance claim from the builder's prose.

## Fidelity parity, settled before the first probe

The candidate is live: you can drive it, time it, break it. The bar usually is not. `BARS.md` sources Doom from public gameplay footage
and rules **frames and clips, never live builds**; its mobile bar half cannot be driven here at all. Asymmetry is the normal case, and
the asymmetric comparison — live-probed candidate against three stills of the bar — is the one `DOCTRINE.md` calls
rigged-and-looks-rigorous. Three moves; each recipe's **PARITY** line says which applies.

1. **REDUCE.** Capture both sides in the lowest form either side can supply, through one harness-owned command: stills against stills at
   identical encode, clip against clip at identical length, fps, codec. Re-encode the candidate even when its capture was born lossless,
   or the encode is the tell.
2. **SPLIT.** What only the candidate can yield (frame times, RSS, exit codes, DB state, pass@k) stops being a comparison and becomes a
   **budget check** against a number stated before the round. It is written into the round's evidence and reported there (C3.2) and
   never touches `choice`. "p95 14 ms against a 16.7 ms budget" is a fact; "smoother than the bar" is not.
3. **LABEL.** Reduction impossible (docs-only, paywalled, described-only bar)? The verdict carries `parity: "proxy-biased"`, and C5.3
   fixes exactly what that costs it.

## Tool namespaces (real primitives, this machine)

| Short name | Actual tool |
|---|---|
| `pw.<x>` drive | `mcp__plugin_playwright_playwright__browser_<x>`: navigate, resize, click, type, fill_form, press_key, hover, drag, select_option, handle_dialog, tabs, close |
| `pw.<x>` read | same prefix: snapshot, take_screenshot, evaluate, wait_for, console_messages, network_requests |
| `pane.<x>` | `mcp__Claude_Browser__<x>`: preview_start/stop, navigate, computer, form_input, resize_window, read_page, get_page_text, javascript_tool, read_console_messages, read_network_requests, preview_logs |
| `ios(action)` | `mcp__Claude_Code_iOS_Simulator__control`: attach, launch, screenshot, detach, tap, swipe, touch_path, touch2_path, text, button, open_url (plus `…__build`) |
| `Read` / `Bash` / `Grep` / `Agent` | Claude Code built-ins. `Read` displays PNG/JPG/PDF. `Agent` is a fresh-context subagent. |

`pw.evaluate` takes `function: "() => …"`. `pw.take_screenshot` takes `target: <ref>` for a component crop and `scale: "device"` for
native DPR. `pane.computer` takes `action: "zoom", region: [x,y,w,h]`. **Media and measurement binaries: C5.2 is the list, and no
recipe here uses one it does not name.** Also usable, none of them media tools: `mcp__codex-cli__review` (cross-model; pass an explicit
model, the default fails here), `mcp__neon__run_sql`, `mcp__Blender__render_viewport_to_path`. **Route on the claim, never the file type**:
a static PNG of a game goes to recipe 3 because the claim is "runs smooth", and "built on X" is a source claim for Evidence hygiene.

---

## 1. Static visual — page, poster, deck, render

```text
pw.navigate url → pw.resize 1440x900 → pw.wait_for text/selector proving webfonts+data loaded
pw.take_screenshot fullPage → Read the PNG               (seeing, not capturing)
pw.resize 390x844 → pw.take_screenshot → Read
pw.take_screenshot target:<ref> scale:"device"           (component crop at native DPR)
pane.computer action:"zoom" region:[x,y,w,h]             (the densest region, enlarged)
pw.evaluate function: "() => [...document.querySelectorAll('*')].filter(e => e.scrollWidth > e.clientWidth+1
  && !/(auto|scroll)/.test(getComputedStyle(e).overflowX)).slice(0,10).map(e => e.tagName+'.'+e.className)"
```
The overflow array must come back `[]`. Not a URL? `Read` the exported PNG or PDF (Blender → `render_viewport_to_path` → `Read`). Judge
at consumption size plus one zoomed crop; small renders hide everything.
**EVIDENCE** — `A-desktop.png`, `A-mobile.png`, matching `B-*.png`, the overflow array, one named defect.
**STAGE** — Same viewport, DPR, crop box, background. Filenames `A`/`B` only; the arbiter holds the mapping. Strip captions, watermarks,
EXIF, randomise order.
**PARITY** — Usually free, since stills are the bar's native form. Re-encode both through one command anyway so compression is not a
tell. Vendor hero shot only? Crop the candidate to the same framing; never full page against hero crop.
**CANNOT DETECT** — Hover, focus and pressed states, motion, dark mode, untested widths, all behaviour → recipes 2 and 4. Numeric
contrast via `pw.evaluate` on computed colours.

## 2. Interactive UI

One primary flow end to end, then break it.
```text
pw.navigate → pw.snapshot                    (a11y tree = the state assertion surface)
pw.fill_form / pw.type / pw.click … per step
after EVERY step: pw.snapshot + pw.evaluate the one observable proving the step landed
pw.press_key Tab ×N → pw.evaluate function:"() => document.activeElement.outerHTML.slice(0,120)"
pw.console_messages, pw.network_requests     (read AFTER, as corroboration only)
```
Then the break set: double-submit, back mid-flow, 4000-char paste, empty required, expired session.
**EVIDENCE** — Ordered step log (asserted plus actual, per step), snapshots at the two decisive steps, a shot of any divergence, console
and network excerpt.
**STAGE** — Identical seed data, script, viewport and starting URL depth. Compare *step counts and failure points*, not vibes.
**PARITY** — Bar not drivable (no account, paywalled)? Do not compare walks. Reduce to matched state stills (empty, one, loaded,
loading, error) from its published captures and your own walk; break-set results become budget checks.
**CANNOT DETECT** — Perceived latency, animation quality, anything past the first error, because the walk stops there. C5 strikes
"feels faster" and "feels smoother" from this modality: no probe stands behind either. Re-run from a clean state per branch → 4, 7.

## 3. Real-time 3D / game

**An artifact with no queryable state is unverifiable. Demand `window.__probe = { ...state, fps }` as a build requirement, not a
favour.**
```text
pane.preview_start → pane.navigate
pane.javascript_tool   install the sampler (payload 1), returns immediately
pane.computer action:"key"/"left_click" … drive real input for ~10s
pane.javascript_tool   SEPARATE call, not optional: read the percentiles (payload 2)
pane.javascript_tool   read window.__probe after each input; assert the state changed as specified
pane.read_console_messages    (errors thrown inside rAF never surface visually)
soak: repeat a spawn/destroy cycle 200×, then compare renderer.info.memory + object counts to t0
```
```js
// payload 1
window.__ft=[]; (function s(p){requestAnimationFrame(t=>{if(p)window.__ft.push(t-p);
  if(window.__ft.length<600) s(t)})})(0); 'started'

// payload 2. It must be its own tool call: 600 rAF frames is ~10s of async collection and the tool
// serialises a return value, so the obvious one-liner hands back a Promise or undefined instead.
const v=[...window.__ft].sort((a,b)=>a-b);
({n:v.length,p50:v[v.length>>1],p95:v[Math.floor(v.length*.95)],worst:v.at(-1)})
// accept only n===600. A short array means the tab was backgrounded and the sample is void.
```
`worst` is a finding on its own: a 60 fps mean with 180 ms spikes is unplayable.
**EVIDENCE** — Frame-time JSON, input→state table, t0 vs t+N object and memory counts, console excerpt, shots for any visual claim.
**STAGE** — Same machine, same window size, other tabs closed. Report the machine.
**PARITY** — The bar is footage and footage cannot be measured, so frame times, soak and `window.__probe` assertions are candidate-only
budget checks against numbers stated before the round (p95 ≤ 16.7 ms, worst ≤ 33 ms, object count flat at t+200 cycles) — never a claim
of beating the bar. Both sides become clips at identical length, fps, encode, no audio: capture the candidate with
`screencapture -V 10 cand.mov` (needs screen permission), fetch the bar's footage with `yt-dlp` (C5.2 — the operator, never the agent,
decides what is lawful to download), then on **both** sides run
`ffmpeg -y -i in.mov -t 10 -r 30 -an -vf scale=1280:-2 -c:v libx264 -crf 23 out.mp4`.
**CANNOT DETECT** — Input feel and netcode. A stamped round trip (`performance.now()` at dispatch against the first frame reflecting the change) is a budget check, not a claim about feel.

## 4. Motion & animation

Control the clock, don't chase it.
```text
pw.evaluate            pause every animation (payload below)
for t in 0,80,160,…:   pw.evaluate set each animation's currentTime = t
                       pw.take_screenshot filename:"f$(printf %05d $t).png"
# zero-pad or the sheet lies: glob sorts lexicographically, so f80.png lands after f720.png
```
```js
() => document.getAnimations().forEach(a=>a.pause())
```
```bash
# pw.take_screenshot writes a relative filename into ITS OWN output directory and returns the
# absolute path it wrote. cd "$(dirname <that path>)" first, or this glob finds nothing.
ffmpeg -y -pattern_type glob -i 'f*.png' -filter_complex tile=4x3 sheet.png
```
Then `Read sheet.png` and judge the sequence. `getAnimations()` reaches CSS transitions and the Web Animations API only. rAF motion,
canvas and WebGL, GSAP tickers and scroll-linked JS keep advancing while you capture, so the tiles become twelve unrelated moments. For
those, C5 makes this recipe **available only with a `window.__setTime(ms)` build requirement** (recipe 3's `window.__probe` by another
name; stubbing `performance.now` and calling render directly is the same requirement by hand). Without one, **the sheet is void and you
must declare it void.** Jank is a separate probe: run the recipe-3 sampler while the animation plays, and assert that
`@media (prefers-reduced-motion: reduce)` changes something.
**EVIDENCE** — `sheet.png`, the frame PNGs, frame-time JSON. A GIF is not evidence; nothing reads it back.
**STAGE** — Identical time marks, tile grid and tile size both sides.
**PARITY** — The bar side is a clip (`yt-dlp` per C5.2 if it must be fetched). Sample it at the same marks with ffmpeg, which
zero-pads for you, then run the same tile command: `ffmpeg -y -i bar.mp4 -vf fps=12.5 -frames:v 12 b%05d.png` gives 12 marks over ~1s,
matching `f00000`…`f00880`.
**CANNOT DETECT** — Easing feel, audio sync, any motion `getAnimations()` does not own → human gate, recipe 9, or the clock hook above.

## 5. API / service

```bash
B=https://host; T="Authorization: Bearer $TOKEN"
curl -sS -o r.json -w '%{http_code} %{time_total}\n' -H "$T" "$B/v1/thing/1"
jq -e '.id and .createdAt and (.secret|not)' r.json            # shape + leak assertion
curl -sS -X POST "$B/v1/thing" -H "$T" -d '{"name":"x","unknownField":1}' -w ' %{http_code}\n'
curl -sS -X POST "$B/v1/thing" -H "$T" -H 'Idempotency-Key: k1' -d '{"name":"x"}'   # ×2 → one row
curl -sS "$B/v1/thing/1" -w ' %{http_code}\n'                  # no auth → expect 401, not 200/500
# --path-as-is is mandatory: without it curl collapses ../ locally, the server receives GET /etc/passwd,
# the route under test is never probed, and its clean 404 means nothing.
curl -sS --path-as-is "$B/v1/thing/../../etc/passwd" -H "$T" -w ' %{http_code}\n'
curl -sS "$B/v1/thing/%2e%2e%2f%2e%2e%2fetc/passwd" -H "$T" -w ' %{http_code}\n'  # encoded: sent untouched
# both traversal calls: expect 400/404 from the router, never 200 and never a 500 stack
python3 -c "print('x'*2000000)" | curl -sS -X POST "$B/v1/thing" -H "$T" --data-binary @- -w ' %{http_code}\n'
{ for i in $(seq 20); do curl -sS -o /dev/null -w '%{http_code}\n' -H "$T" "$B/v1/thing" & done; wait; } \
  | sort | uniq -c   # expect a mix incl. 429, zero 5xx; all 200 = no limiter, all 429 = limit < one client
curl -sS -D - -o /dev/null -H "$T" "$B/v1/thing" | grep -i retry-after    # every 429 must carry Retry-After
```
Assert on status **and** body shape **and** side effect (query the store). Error bodies get the same scrutiny as success. The fan-out
above probes the limiter, not load — that is recipe 7.
**EVIDENCE** — Per call: method, status, timing, body with secrets redacted, plus the store query proving one side effect, exactly once.
**STAGE** — Same request set, payloads and auth posture; label transcripts `A`/`B`, strip hostnames.
**PARITY** — A Stripe-class bar is callable, so parity is normally full. A docs-only bar with no sandbox key cannot be called: reduce
to contract comparison per `BARS.md` (one resource schema, one success, one error, the idempotency clause), set
`parity: "proxy-biased"`, and run the adversarial and side-effect results as candidate budget checks.
**CANNOT DETECT** — Sustained load, correctness of the values returned, migration safety → 6, 7.

## 6. Data correctness

Differential recomputation, the only probe that catches a confidently wrong pipeline. **The input set is frozen before either artifact
is looked at and the critic never chooses it** — probe selection is harness-owned (C5, Data row), and no builder may have seen the set.
```bash
# 1. independent second implementation from the SPEC, not from the builder's code
python3 recompute.py raw/*.csv > expected.csv     # or sqlite3 / mcp__neon__run_sql
diff <(sort actual.csv) <(sort expected.csv) | head -40      # empty is the only pass
sqlite3 db "SELECT count(*), count(*)-count(DISTINCT pk), sum(amount) FROM t;  -- rows vs source, dupes=0, total
            SELECT count(*) FROM t WHERE amount IS NULL;  -- nulls, expect 0"       # comments stay INSIDE
# boundary rows: min/max dates, DST switch day, tz-crossing timestamps, negative, zero, unicode
```
**EVIDENCE** — `recompute.py`, `expected.csv`, the diff output (show the command even when empty), invariants, boundary row dumps.
**STAGE** — Same raw inputs, same recompute script; compare each pipeline's diff size.
**PARITY** — A reference project ships code and often data, so run your script against both for full parity. A bar with no data (style
guide only) reduces to model and test *structure*, and diff size becomes a candidate budget check.
**CANNOT DETECT** — A definition wrong but consistently applied, since both implementations inherit it. Quote the spec line each metric
implements, and cross-check one metric against a third source.

## 7. Performance & latency

Single measurements are void. Report `n`, p50, p95, cold against warm, and the machine.
```bash
for i in $(seq 30); do curl -sS -o /dev/null -w '%{time_total}\n' "$URL"; done > t.txt
python3 -c "import statistics as s;v=sorted(map(float,open('t.txt')));print('n',len(v),'p50',v[len(v)//2],'p95',v[int(len(v)*.95)])"
for i in $(seq 10); do /usr/bin/time -l ./bin/cmd big.input 2>>time.log >/dev/null; done  # -l = peak RSS
```
```text
# Web page, per run, fresh context each time:
pw.evaluate function:"() => performance.getEntriesByType('navigation')[0].toJSON()"
pw.evaluate function:"() => performance.getEntriesByType('largest-contentful-paint').map(e=>e.startTime)"
pw.network_requests → total bytes, request count, blocking chain
```
**EVIDENCE** — Raw per-run numbers, not just the summary; the percentile computation; machine and load; the budget.
**STAGE** — Same machine, same session, alternate A/B/A/B to cancel drift, other work stopped.
**PARITY** — Timings compare only when both sides ran here, this session. A published number from another machine is a budget target.
**CANNOT DETECT** — Sustained concurrency and p99.9: no load generator appears in C5.2's list, so they go to a budget check or a human
gate, and **"under real load" is not a phrase this recipe can support**.

## 8. Prose & narrative

Declare `modality: "independent_reader"`, which per C1.5 owes a `human_gate`. **Read-aloud is not this recipe's** — C5 strikes it from
the Prose row and sends it to that gate, so the agent must never claim to have heard anything.
```text
1. INDEPENDENT READER: Agent, fresh context, given ONLY the artifact and never the intent: "What is this
   arguing? Who is it for? What question does it raise and never answer? Which paragraph would you
   delete — quote it." Diff what it took away against what the piece was for. The reader is never wrong.
2. CUT TEST: produce a 70%-length version. Nothing lost means the original was padded — that is the verdict.
3. CADENCE: the script below, identical over both sides, so numbers are diffable across rounds.
```
```bash
# Strip fenced code and tables first, or the numbers describe the code and not the prose:
awk '/^```/{f=!f;next} !f && $0 !~ /^\|/' in.md > "$F"
python3 - "$F" <<'PY'
import re,sys,statistics as st
t=open(sys.argv[1]).read(); s=[x for x in re.split(r'(?<=[.!?])\s+',t.strip()) if x]
L=[len(x.split()) for x in s]; o=[x.split()[0].lower() for x in s if x.split()]; r=mx=1
for a,b in zip(o,o[1:]): r=r+1 if a==b else 1; mx=max(mx,r)
print({'n':len(s),'mean':round(sum(L)/len(L),1),'stdev':round(st.pstdev(L),1),'max_run_same_opener':mx,
 'adverbs_ly':len(re.findall(r'\b\w+ly\b',t)),
 'hedges':len(re.findall(r'\b(perhaps|arguably|somewhat|quite|rather|maybe|possibly|generally)\b',t,re.I))})
PY
grep -inE "in today's|it's worth noting|delve|tapestry|game.chang|not only .* but also|—.*—.*—" "$F"
```
Low `stdev` with a high `max_run_same_opener` is the machine signature. **Both readouts are comparative: diff the two sides' numbers and
hit counts against each other, never against a threshold** — a dense reference file scores "badly" on adverbs and em-dashes and is still
the better artifact, and a document quoting the phrase list matches itself.
**EVIDENCE** — The reader's verbatim answer, cadence JSON both sides, banned-phrase hits with line numbers, the 70% cut.
**STAGE** — Strip bylines, formatting, house tells; same reader prompt for both.
**PARITY** — Full and cheap, because text reduces losslessly. Trim the longer side to the shorter's word count (`BARS.md`: never pad
the shorter) and flatten both to the same markdown first. Length wins pairwise on nothing but bulk.
**CANNOT DETECT** — Hearing anything; factual accuracy and citation integrity. Build a claim→source table, each row verified with
`WebFetch` or the primary document.

## 9. Audio / voice — PROXY, and the verdict says so

State the limit first: **the critic cannot hear.** C5.4 rules this row a proxy, so every audio verdict carries
`parity: "proxy-biased"` and a `human_gate` naming the file and what to listen for. Probe the measurable half; gate the audible half.
```bash
ffprobe -v error -show_entries stream=codec_name,sample_rate,channels,duration -of json in.wav
ffmpeg -i in.wav -af ebur128=peak=true -f null -             # integrated LUFS + true peak
ffmpeg -i in.wav -af astats -f null - 2>&1 | grep -Ei 'peak|clip|dc offset'
ffmpeg -i in.wav -af silencedetect=n=-45dB:d=0.6 -f null -   # dead air, cut-off endings
```
Those four are budget checks, not a comparison of how it sounds. Voice agents: drive the thing and assert on the **transcript, the
turn-timing marks and the tool-call trace** — never on "it sounded natural". In-loop that is `flowforge_run_test` against a test
destination or a fixture replay, then `flowforge_get_call`. **`flowforge_start_call` to a real destination is forbidden inside the loop**
(C5.5): a frozen probe re-runs every round, so it would re-dial every round; the operator records the reference calls **once, at round
0**, into the run's `bar/` and `probes/fixtures/` (C3.2). Assert: goal reached, disclosure spoken, tool called with the right args, no
loop, interruption and silence handled.
**EVIDENCE** — ffprobe/ffmpeg output as budget checks, transcript with tool-call trace and timing marks, the `human_gate` line.
**STAGE** — Same script, same lines, same sample rate.
**PARITY** — Proxy-biased either way, and loudness still matters because louder simply wins a human A/B: reduce both with
`ffmpeg -y -i in.wav -af loudnorm=I=-16:TP=-1.5 -ar 48000 out.wav` (`BARS.md`'s −16 LUFS), same codec, same 60–90s trim, before
anything reaches the operator.
**CANNOT DETECT** — Timbre, prosody, mispronounced proper nouns, artefacts. No ASR appears in C5.2's list, so no round-trip check
exists and no verdict may imply one.

## 10. Mobile app (iOS simulator)

Coordinates are device points, origin top-left; `launch` reports the point size.
```text
ios(attach)                     open the panel BEFORE building, so the operator watches
…__build  → ios(launch, app_path, bundle_id)
ios(screenshot) → save s001.png → Read it     zero-padded: filename order IS chronological order
ios(tap x,y) / ios(text "…") / ios(swipe) / ios(touch_path) → ios(screenshot) → s002.png → Read
ios(button HOME) → ios(launch again)          backgrounding: does state restore or reset?
ios(open_url "myapp://deep/link")             cold-start deep link
```
Gotcha that silently invalidates scroll tests: a swipe or `touch_path` starting within 4 pt of a screen edge fires the OS gesture
(back, shade, home, Control Center), not your drag. Start further in.
**EVIDENCE** — The `s00N.png` series with the action between each, `Read` in filename order, plus `launch` output (bundle id, point size).
**STAGE** — Same device points, OS version, appearance and text-size settings, same neutral seeded dataset each side.
**PARITY** — The candidate side is available; the bar side is not. Per C5.4 the bar is an **operator-supplied real-device screen
recording obtained at round 0** — nothing here drives a third-party app on a physical device, and the HIG and App Store screenshots are
ruled out as bars (`BARS.md`). With that recording: candidate via `xcrun simctl io booted recordVideo cand.mov` (SIGINT stops it), both
trimmed to identical length at identical device points by recipe 3's ffmpeg line, and the record names who captured the bar, on which
device and OS build, and when. Without it, every mobile verdict is `parity: "proxy-biased"` with a `human_gate`. Simulator timings are
never device timings, so cold start, jank and haptics are budget checks or human gates, never A/B claims.
**CANNOT DETECT** — Real-device performance, thermals, battery, camera, push → device build plus human gate. The simulator substitutes
for none of them.

## 11. CLI

```bash
cmd --help | head -30 ; echo "exit=$?"
COLUMNS=40 cmd --help                  # wrapping
cmd | cat                              # no TTY: colour codes and spinners must vanish
NO_COLOR=1 cmd
cmd --nonexistent-flag; echo "exit=$?" # expect non-zero + actionable message on STDERR
cmd < /dev/null                        # empty stdin
cmd big.input > out.txt 2> err.txt; diff out.txt golden/out.txt   # stdout is data, stderr is chat
cmd slow-op & p=$!; sleep 2; kill -INT $p; wait $p; echo "sigint exit=$?"   # no half-written file
cmd idempotent-op && cmd idempotent-op # second run must not error or double-apply
```
**EVIDENCE** — Command, exit code, stdout and stderr captured separately, golden diff, post-interrupt file state.
**STAGE** — Same terminal width, same `TERM`, same input fixtures for both tools.
**PARITY** — Full, the strongest row in the matrix: `gh`- and `rg`-class bars install locally, so run every line above against both.
**CANNOT DETECT** — Startup distribution (→ 7); long-run stability (→ soak `for i in $(seq 500); do cmd op; done` under
`/usr/bin/time -l`, peak RSS against one run); concurrency (two writers, one target file); clean install (human gate).

## 12. Agent or prompt system

```text
Eval set ≥20 cases, frozen: 3 adversarial, 2 prompt-injection, 2 refusal-correct, 3 ambiguous-input,
2 tool-failure. Run k=3 per case. Variance is the finding.
Assert on the TRANSCRIPT and the TOOL-CALL TRACE, never the closing summary.
Cost check: tokens and wall time per case.
```
Use `pass@k` / `pass^k` and the grader taxonomy from `~/.claude/skills/eval-harness/SKILL.md`.
**EVIDENCE** — Per-case transcripts, tool-call traces, the frozen case file, pass@k/pass^k table, token and time totals.
**STAGE** — Identical cases and grader prompt; strip system-prompt identifiers and model names before grading.
**PARITY** — Both sides through the same frozen case file and the same grader, or the numbers are not comparable. When the bar is a
*prompt* rather than a runnable system, the two-level blinding in `BARS.md` (Agent & prompt systems, BLIND) applies and **output-level
breaks ties**: both prompts run on one goal at the same model and budget, their artifacts compared blind by whichever recipe the
output's modality selects. Prompt-level alone is `parity: "proxy-biased"` and the pass@k table is a budget check. **C5.6 stands over this
whole row: nothing may report that the baseline has been beaten until that output-level tournament has run.** Escalation targets if the
bar proves to sit below the ceiling: `~/.claude/skills/verification-loop/SKILL.md`, `eval-harness/SKILL.md`.
**CANNOT DETECT** — Rare tail failures at 1-in-200 → volume run. Tail-risk classes (injection, exfil) get dedicated cases, not sampling.

## Behavioural probe design — anything with state (recipes 2, 3, 5, 10, 12)

**State coverage.** Enumerate before probing; each state gets a probe or a `not_probed` entry: empty · one · many · maximum · loading ·
error · offline · unauthorised · expired · mid-flight · returning user · concurrent second actor.
**Adversarial input.** Per field: empty, whitespace only, 4000 chars, emoji + RTL, `<script>`, `'; DROP`, `../../`, negative, `0`,
`007`, `1e309`, a pasted value (paste bypasses keystroke handlers), and the wrong type entirely.
**Boundary and interruption.** Double-click submit · back or reload mid-flow · navigate away with a request in flight · token expiry
mid-session · two tabs mutating one record · network failure, stubbed via `pw.evaluate function:"() => { window.fetch = () =>
Promise.reject(new Error('probe')) }"` or `pane.preview_stop` to kill the server under a live page.
**Assert on observable state, never on the absence of errors.** "No console errors" passes on a frozen screen, a silently dropped
write, a spinner that never resolves, and a form that clears itself. Write the assertion first:

```text
STEP 4  click #submit
EXPECT  a11y tree contains "Order #" AND GET /orders returns 1 new row AND #submit is disabled
ACTUAL  a11y tree contains "Order #1041" · 1 new row · #submit still enabled  → DEFECT (double-submit)
```

A probe with no pre-declared expected observable is a tour, not a test.

## Evidence hygiene

| Rule | Enforcement |
|---|---|
| A completed verdict with no attached evidence is void | Round scores as FAIL, re-run the probe. C1.2 exempts the blocked path; C1.6 is the standard |
| A builder's summary is never evidence | The critic never receives it: the orchestrator passes arena paths only. See † |
| A captured screenshot that was never `Read` is not evidence | Verdict cites the Read, not the path |
| Compliance claims get grepped | See the block below |
| Sides inspected at different fidelity | Void. Reduce, split, or set `parity: "proxy-biased"` |
| Evidence is immutable per round | The round's `evidence/` directory (C3.2); never overwrite an earlier round |
| Secrets redacted before evidence is written | Tokens, keys, PII out of transcripts and logs |
| Every completed verdict declares its blind spots | `not_probed` per C1; an unprobed area counts neither for nor against |

† If a summary, README, CHANGELOG or commit message is reachable from an arena path, staging failed: re-strip and re-spawn. The pre-flight
that catches it is `ROLES.md`'s `critic-seal.sh`, whose grep surface is C3.6's — prose fields and tracked source only, never a bare
`/Users/`, which every build tree contains and which fails the seal on correct output. Compliance claims ("built on the design system",
"fully typed", "no direct DOM access") were false in a real run, and only the source revealed it:

```bash
grep -rEn "from ['\"](@/components/ui|@/design-system|@radix-ui)" src/ | wc -l   # claimed usage
grep -rEn "<(div|button|input|select)[^>]*(style=\{|className=\"[^\"]*\b(p|m|w|h|text)-)" src/ | head -20
grep -rn "any\b" src/ --include=*.ts | wc -l
```

## What the verdict wants from a recipe

**C1 is the schema, and this file adds no field, type or requirement to it.** Four notes for whoever writes the probe text:

- **Declare the modality before you probe, not after the finding.** `modality` is C1's enum; a recipe number is this file's routing
  label and never enters the JSON.
- **Numbers stay out of the record.** C1.3 bans a numeric field at any depth, so every timing, percentile, count and budget check
  travels as literal text in `observed` — `"p95 14 ms"`, never `14`. A recipe asking for a bare number breaks that check.
- **`parity` follows the fidelity move the PARITY line forced on you:** REDUCE or SPLIT → `matched`; LABEL → `proxy-biased`. Recipe 9
  is always `proxy-biased`, recipe 10 unless the operator supplied the round-0 device recording (C5.4). C1.5 then owes a `human_gate`.
- **Name the covering recipe for each blind spot.** "hover and focus states → recipe 2" is next-round triage; "hover states" is a
  shrug.

**Nothing in this file tells the critic that a round number, a prior verdict, or a swapped twin of its judgment exists.** Position-bias
staging belongs to the orchestrator (`FAILURE-MODES.md` F11) and decides nothing about a run; a critic that can describe it has been
leaked to, and the verdict is void.

The F9 read is structural: the modality that came back, against the defect class the part declared in `plan.md` (C3.2). The lexical
`screenshot|\.png` grep is a hint and must never run as an audit line — recipes 1 and 4 are the *correct* modality for a static-visual
dimension, so it flags every correct one. Coverage read-out for the round-close agent, a report and not a gate:

```bash
jq -r '[input_filename, .modality, .parity, (.not_probed // [] | length)] | @tsv' "$RUN"/r$N-*-verdict.json
```

A part whose modality never changes while its gaps keep repeating is the modality stall: change the modality (`OPERATIONS.md` §9
move 2), not the wording of the probe.
