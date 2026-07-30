# BARS.md — the bar library

Lookup table. Do not read start to finish. Find the domain, take the default, paste the clause, hand the rest to the roles each
block names. Every contract this file touches lives in `CONTRACTS.md` and is referenced here, never restated: the verdict schema
(C1), the stop rule (C2), the run layout (C3), the emission budget (C4), the modality capability matrix (C5).

## Rules of the bar

1. **One bar per comparison.** Where a default names two artifacts (3D, product UI, data, CLI) each owns a *different axis* and is
   judged on that axis alone. Averaging two bars into one call is what kills the pressure. Never merge them.
2. **A bar is an artifact someone can open** — not a standard, rubric, or adjective. Either a fresh critic can fetch, screenshot,
   download or record it inside the run, *or* the **operator** captures it once at round 0 and `ACCESS` names who captured it, on
   what, and when. Mobile and voice are operator-captured by nature; nothing vaguer than that is a bar.
3. **Only the clause enters the launch prompt.** ACQUIRE / BLIND / SIGNALS load at spawn, for the role each block names. Never
   inline them.
4. **Pick a bar you will lose to.** A reachable bar leaves the loop at "fine". Run `DOCTRINE.md`'s above-the-ceiling probe to settle
   it; never settle it by feel.
5. **Inspect in the artifact's own modality, and only where C5 grants the capability.** A cell marked UNAVAILABLE there is REMOVED
   or PROXY, never improvised around. Recipes: `INSPECTION.md`.
6. **Frozen at launch.** Never soften it, never let the builder restate it, never regenerate it mid-run.

## Quick pick

| Domain | Default bar | Clause to paste |
|---|---|---|
| Real-time 3D / browser game | Doom (2016) for feel + PlayCanvas *Seemore* for browser ceiling | `at the level of Doom (2016), in a browser at locked 60fps` |
| Marketing site / landing page | linear.app | `at the level of linear.app` |
| Product app UI | Linear app (density) + Stripe Dashboard (data surfaces) | `at the level of the Linear app and the Stripe Dashboard` |
| Mobile / iOS app | Things 3 (Cultured Code) | `at the level of Things 3 on iOS` |
| Backend API / service | Stripe API | `at the level of the Stripe API` |
| Data pipeline & analytics | dbt Labs' public style guide + `jaffle_shop` | `at the level of a dbt Labs reference project` |
| ML system & evals | SWE-bench (Jimenez et al., 2023) | `at the level of SWE-bench's evaluation design` |
| Long-form prose / memo | Amazon shareholder letters (Bezos, 1997–2020) | `at the level of a Bezos shareholder letter` |
| Marketing copy / paid ads | Longest-running top-spend ads in category (Meta Ad Library) | `at the level of the highest-spend ads running in this category` |
| Brand & visual identity | Pentagram case study (pentagram.com/work) | `at the level of a Pentagram identity case study` |
| Slide deck / client deliverable | Benedict Evans' annual presentation | `at the level of a Benedict Evans annual deck` |
| Voice / phone agent | Recording of your best human agent on this call type | `at the level of our best human agent on this call` |
| CLI / dev tooling | `gh` (GitHub CLI) for shape, `rg` for speed | `at the level of the GitHub CLI` |
| Infrastructure / IaC | `terraform-aws-modules/terraform-aws-vpc` | `at the level of the terraform-aws-modules VPC module` |
| Security posture | A Trail of Bits public audit report | `at the level of a Trail of Bits audit` |
| Agent & prompt systems | The baseline Gauntlet prompt | `at the level of the original Gauntlet prompt, and shorter` |

**Domain not listed?** (1) Name the product a practitioner would be embarrassed to be compared against. (2) Confirm a fresh agent —
or the operator at round 0 — can acquire it. (3) Check it is one notch past current reach. (4) Confirm C5 grants an inspection that
shows this goal's defect class; no row means halt and name the missing capability, never improvise. (5) Nothing acquirable exists:
go to BAR CONSTRUCTION.

---

## Real-time 3D / browser games

**BAR** — Default **Doom (2016)** for movement feel, weapon readability and encounter pacing, paired with **PlayCanvas *Seemore***
(`seemore.playcanvas.com`) as the frame-cost ceiling: a browser bar alone caps ambition, a console bar alone yields 5fps slideshows.
**ACQUIRE** — Web bars in the browser pane: screenshot 1280×800, record 10s of play. Doom is footage, and `yt-dlp` is the one
installed tool that obtains footage — the **operator** picks the source and decides what is lawful to download, never the agent:

```bash
yt-dlp -f 'bv*[height<=1080][fps>=60]' -o bar/doom-raw.mp4 <operator-chosen URL>
ffmpeg -y -ss 00:01:12 -i bar/doom-raw.mp4 -t 10 -r 30 -an -vf scale=1280:-2 -c:v libx264 -crf 23 bar/doom-10s.mp4
```
**BLIND** — Frames and clips, never live builds. Crop HUD, logos, watermarks and every text UI; identical resolution; the candidate
capture through that same ffmpeg line, so one command produced both encodes and the encode is not the tell. Sides are
harness-assigned, never chosen here.
**SIGNALS**
- p95 frame time and the worst single frame, not mean fps — spikes are what players feel. The bar is footage, so these are budget
  checks against numbers stated before the round, never A/B claims (C5).
- Input→photon round trip, stamped: `performance.now()` at dispatch against the first frame that reflects the change. Also a budget
  check; input *feel* is not inspectable here. Camera motion carries accel/decel weight, not a ramp.
- Light coherence: every surface agrees on light direction, shadow contact included.
- Material variety — amateur scenes share one roughness value across every object.
- Silhouette readability at 20% scale, foreground/background separation, and the failure surfaces: pause, death, respawn, resize,
  tab-out.
**ANTI-BAR** — Call of Duty at face value (the baseline's own bar): drives asset chasing the browser cannot win, while still-image
critics score lighting as the game plays badly. Also the three.js example gallery — demos, not games.

## Web marketing site / landing page

**BAR** — Default **linear.app**: highest craft-per-pixel, and every choice is legible in a screenshot, so the critic can name what
it is losing on. Alt: **stripe.com** (IA across many audiences), **vercel.com** (motion discipline).
**ACQUIRE** — WebFetch for copy structure; Playwright or the browser pane for full-page shots at 1440×900 and 375×812. Hover, focus
and pressed states are **not** screenshot work — C5's static-visual row excludes them. They route to the interactive row: set the
state, then assert the computed style with `evaluate`.
**BLIND** — Same viewport, crop height and DPR. Swap both wordmarks for a neutral block, global-replace both product names with
`ACME`, strip cookie banners and chat widgets. Stacked A/B images, and `Read` them — a capture nobody read is not evidence.
**SIGNALS**
- Type scale is a ratio, not arbitrary sizes; ≤3 weights, ≤2 families.
- Optical alignment over metric alignment (icons and quote marks nudged, not centred).
- Shadow physics: one light source; consistent y-offset and blur ratio across all cards.
- Section padding drawn from one spacing scale — vertical rhythm survives scrolling.
- Copy carries numbers, names, verbs. Not "seamlessly empower".
- Computed transition durations under 250ms and eased, and `prefers-reduced-motion` actually changes something. Motion *quality*
  needs C5's motion row, which is void without a `window.__setTime(ms)` hook — absent the hook it is an operator gate, not a round.
- Mobile designed, not reflowed: ≥44px targets, an empty overflow array, no orphans.
**ANTI-BAR** — Awwwards Site of the Day: rewards spectacle that tanks conversion and Lighthouse. Also apple.com — unmatchable
budget, almost no functional surface to learn from.

## Product app UI (dashboards, settings, data tables)

**BAR** — Default **Linear** (the app, not the site) for density, keyboard model and instant transitions; **Stripe Dashboard** for
anything with rows and filters. Marketing sites are useless bars here — product surfaces have states. Alt: **Notion** for inline
editing.
**ACQUIRE** — Screenshot the real app if the operator has an account, else vendor product shots plus published shortcuts. Capture
five states — empty, one row, loaded, loading, error — plus one keyboard-only flow.
**BLIND** — Same viewport, both sides in the **light** theme — C5's static-visual row does not grant dark-mode inspection, so a dark
variant is an operator gate rather than a round. Chrome cropped, brand neutralised. Retype the bar's table with your own rows so
content is not a tell. Compare state by state — empty vs empty, error vs error: most losses live in the states nobody screenshots.
**SIGNALS**
- Row height, column alignment (numerals right, tabular figures), truncation with tooltip.
- Focus ring, tab order, no focus trap — focus the element, then assert the computed outline with `evaluate`. A screenshot cannot
  see focus (C5).
- Empty states teach and offer the next action; errors name cause and fix.
- Optimistic updates with rollback, versus a spinner on everything.
- Selection, bulk action, undo. Transitions ≤150ms; zero layout shift on load.
- Keyboard: shortcut for the primary action, `Esc` closes, `Enter` commits.
**ANTI-BAR** — a shadcn/ui or Tailwind UI gallery: correct parts, no context, so matching them yields an app that looks assembled.
Also Material Design docs — a standard, not an artifact.

## Mobile / iOS app

**BAR** — Default **Things 3**: every animation was authored rather than defaulted, so it exposes generic component output
immediately. Alt: **Apple Weather / Reminders** for the platform-idiomatic ceiling, **Duolingo** for reward motion and state
choreography.
**ACQUIRE** — Split, and the split is the whole story (C5.4). **Candidate:** the iOS Simulator — `…__build`, `ios(launch)`, then a
zero-padded `ios(screenshot)` series `Read` in filename order, or `xcrun simctl io booted recordVideo`; recipe 10 in
`INSPECTION.md` has the step forms. **Bar:** nothing here can drive a third-party app on a physical device, so the bar half is an
**operator-supplied real-device screen recording obtained at round 0**, with `ACCESS` naming who recorded it, on which device and OS
build, and when. Without it, C5.4's proxy consequence applies for the life of the run.
**BLIND** — Recordings trimmed to identical length at identical device points, status bar cropped, app names and icons masked, the
same neutral dataset both sides. For stills, identical scroll offset. Start any swipe more than 4pt from a screen edge, or the OS
gesture fires instead of your drag.
**SIGNALS**
- Gesture handoff: the drag tracks the finger 1:1 across a `touch_path` series, then carries momentum.
- Interruptibility and authored spring motion — overshoot, settle, and an in-flight animation reversing mid-gesture instead of
  completing first — read off `recordVideo` frames, which carry their own time base. Easing *feel* does not (C5): operator gate.
  Nothing over 350ms.
- Safe area, keyboard avoidance, Dynamic Type at the largest setting; offline and permission-denied paths; backgrounding restores
  state rather than resetting it.
- Cold start, jank and haptics are **budget checks or operator gates, never A/B claims** (C5.4); haptics are not observable at all.
**ANTI-BAR** — the Human Interface Guidelines (rules, not an artifact; compliance yields correct and forgettable) and App Store
screenshots (art-directed composites of screens that do not exist). Neither is admissible as the bar half, and neither substitutes
for the round-0 device recording.

## Backend API / service

**BAR** — Default **Stripe API**: its error taxonomy and idempotency contract are the two things generated APIs almost always miss,
and both are documented publicly. Alt: **Twilio** for webhook semantics, **GitHub REST + GraphQL** for pagination and rate limits.
**ACQUIRE** — WebFetch the reference for the two or three closest resources, plus its OpenAPI description if published. Then hit
your own endpoints with real requests; capture raw responses including headers. A live API is not a bar of record — the frozen
transcript set is.
**BLIND** — Compare *contracts*, not doc prose: per side, one resource schema, one success response, three error responses, the
header set, pagination params — same layout, product nouns replaced with `thing`, order harness-assigned.
**SIGNALS**
- Errors typed and machine-branchable: stable code + human message + offending field.
- Idempotency keys on every non-idempotent write, with documented replay semantics.
- Cursor pagination, stable under insertion. Versioning strategy and deprecation path stated.
- Consistent time (RFC 3339 UTC), money (minor units + currency), and id conventions.
- Rate limits in headers with retry guidance; partial failure and long-running work have a shape (async job + status resource).
**ANTI-BAR** — your own OpenAPI file or an internal "REST guidelines" wiki: both encode existing habits, so the loop converges on
itself. Also 200-with-error-in-body APIs from big vendors — popularity is not craft.

## Data pipeline & analytics

**BAR** — Default **dbt Labs' public dbt style guide + `jaffle_shop`**: code you can read line for line, so the critic compares
artifacts instead of opinions. Alt: **Great Expectations** suites for validation posture, **Netflix Metaflow** docs for
orchestration ergonomics.
**ACQUIRE** — Fetch the reference; read model files, `schema.yml` tests, directory layout. Produce the same three artifacts: DAG
image, one staging + one mart model, test manifest.
**BLIND** — Rename entities in both to the same neutral set (`customer`, `order`, `event`), strip comments and headers, run the same
formatter over both, pair DAG vs DAG, model vs model, tests vs tests. The input set the differential probe runs on is frozen and
harness-chosen, never the builders'.
**SIGNALS**
- Layer separation (source → staging → intermediate → mart) with no cross-layer joins.
- Idempotent restartable runs; backfill is a parameter, not a code edit.
- Tests on grain: uniqueness + not-null on every key, accepted values on every enum.
- Late, duplicate and out-of-order events handled explicitly.
- Freshness and volume monitors, not only correctness tests.
- Cost awareness: partition/cluster keys, incremental strategy, full-refresh justified.
**ANTI-BAR** — a working dashboard. It hides the pipeline entirely; a beautiful chart over double-counted rows scores well and is
worse than useless.

## ML system & evals

**BAR** — Default **SWE-bench** (Jimenez et al., 2023): executable grading is the property generated eval suites lack. Alt: **HELM**
(Stanford CRFM) for coverage and reporting, **"Judging LLM-as-a-Judge…"** (Zheng et al., 2023) for when a model judge is admissible.
**ACQUIRE** — Fetch the papers and the harness README; read the grader, not the abstract. Compose with
`~/.claude/skills/eval-harness/SKILL.md` instead of rebuilding a runner. No C5 row covers this domain, so it **routes or halts**
(C5.1): the design comparison is the Prose row as independent reader, the grader itself is the Data row run on the frozen input set,
and the agent-systems row covers the system the eval grades. Anything outside those three halts and names the gap.
**BLIND** — Compare eval *designs*: task spec, one sample item, the grading function, the reported metric with its error bars. Strip
project and model names. The judge picks which design catches a regression the other misses.
**SIGNALS**
- Ground truth executable or adjudicated — never vibes-scored by the same model family.
- Contamination story and date-bounded sources.
- A trivial baseline included (majority class, copy input) to expose fake lift.
- Variance reported: n, seeds, spread. One number is not a result.
- Failure taxonomy with an example per bucket; metric matches the decision being made.
- Prompt, version and config pinned per run and stored with results.
**ANTI-BAR** — a leaderboard score: the output of an eval, not an eval, and it invites tuning to the metric. Also an LLM-scored 1–10
rubric — the inflation trap this system exists to defeat.

## Long-form prose & strategy memos

**BAR** — Default **Amazon shareholder letters (Bezos, 1997–2020)** for internal memos: free, short, structurally legible. Alt:
Stratechery for external analysis (structure and the turn), The Economist's briefings for compression and clause discipline.
**ACQUIRE** — WebFetch one full piece of the closest type and length. Read the whole thing; excerpting destroys the structure being
judged.
**BLIND** — Same word count (trim the longer, never pad the shorter), same markdown, headings stripped, proper nouns replaced with
placeholders, order harness-assigned. Then the two probes that **replace reading aloud, because the agent cannot hear** — C5's prose
row removes read-aloud and routes it to a gate: hand each side to a fresh-context reader that never saw the intent and diff what it
took away against what the piece was for, then run `INSPECTION.md` recipe 8's cadence script over both and compare the two sets of
numbers to each other, never to a threshold. `say -o out.aiff` plus `afplay` is the operator gate C1.5 requires on an
independent-reader verdict, never a critic act.
**SIGNALS**
- One thesis, stated early, load-bearing in every section.
- Concrete nouns and real numbers; every claim has a mechanism, not an adjective.
- Sentence length varies; never three consecutive same-shape sentences.
- The strongest counterargument is engaged, not gestured at.
- Paragraphs open with the point; the piece ends on a decision, not a summary of itself.
- AI cadence — triads, "not just X but Y", em-dash pile-ups, "in a world where" — counted on **both** sides and compared side to
  side, never against a threshold. A dense artifact can hit the phrase list and still be the better one (recipe 8).
**ANTI-BAR** — consulting-report prose and LinkedIn thought leadership. Both optimise for sounding senior, so imitation produces
confident emptiness that rubrics love.

## Marketing copy & paid ads

**BAR** — Default **the longest-running top-spend ads in the category, from the Meta Ad Library**: an ad running on real budget for
months has passed a harder test than any award jury. Alt: Ogilvy's Rolls-Royce "At 60 miles an hour" for the specific detail, Apple's
"Get a Mac" for positioning in 30 seconds.
**ACQUIRE** — Search the Ad Library for the category; pull the ads with the longest continuous run. Save creative, primary text and
hook; screenshot at feed dimensions. Video ads: `ffmpeg` the first three seconds to a frame tile and `Read` it (`INSPECTION.md`
recipe 4) — the audio track is not judged here, and C5 is why.
**BLIND** — Render both at the same placement size with the same neutral mark, same category noun, same offer. Judge **hook only**
first (first three seconds, or first line), then the full creative. A losing hook cannot be rescued downstream.
**SIGNALS**
- The hook makes a claim or shows a state change within three seconds.
- One idea per ad; the concept survives one-sentence description.
- Specificity beats superlatives: "render time 40 min → 90 sec".
- The main objection is handled inside the creative, not on a later page.
- Reads at thumbnail scale, sound off, captions burned in.
- CTA matches awareness stage; format-native, not a resized rectangle.
**ANTI-BAR** — Cannes reels and brand manifesto films: optimised for peers, not purchase. Copying them yields expensive-looking ads
with no offer.

## Brand & visual identity

**BAR** — Default a **Pentagram case study** (`pentagram.com/work`) in the adjacent sector: their write-ups show the system across
many applications, which is exactly where amateur identities collapse. Alt: **Stripe's brand system** (works at 16px and on a
billboard), **Linear's identity** (minimal palette, real proprietary character).
**ACQUIRE** — Fetch the case study, download application images, `Read` any public guideline PDF page by page. Reproduce the *same*
applications: wordmark, app icon, one dense screen, one printed surface, one social avatar.
**BLIND** — Same application set, same sizes, identical neutral backgrounds, and the same invented product name on both so the mark
is judged rather than the name. Include one deliberately tiny rendering (16px favicon) in the pair.
**SIGNALS**
- The mark survives 16px, one colour, and being embroidered or etched.
- Palette has hierarchy (one brand, one accent, a neutral ramp), not six equal colours.
- Type pairs by contrast of structure, with a stated reason.
- The system defines behaviour: on dark, over photography, when cramped.
- Icon set agrees on stroke width and corner radius — consistent optical weight.
- No effects doing the work (gradients, glows, bevels hiding a weak silhouette).
**ANTI-BAR** — Dribbble and Behance logo presentations: mockups in perfect light with no application constraints, so matching them
produces marks that die in product.

## Slide decks & client deliverables

**BAR** — Default **Benedict Evans' annual presentation**: public, downloadable and impossible to fake — if a slide must be read
rather than seen, you lose immediately. Alt: **the original Airbnb and Uber pitch decks** for narrative compression, **Bain's Global
Private Equity Report** for exhibit craft at consulting standard.
**ACQUIRE** — Download the deck as PDF, export yours at the same page size, and `Read` both page by page — judged as rendered pages,
never as editable files. That is the whole conversion step: ImageMagick is absent (C5.2), so assume no image-export pass exists.
**BLIND** — Same page size, logos and footers cropped, client and company names replaced identically. Pair like with like:
title vs title, chart vs chart, recommendation vs recommendation. Judge each pair before any deck-level call.
**SIGNALS**
- Slide titles are assertions ("Margins compress after month 6"), not labels ("Margins").
- One message per slide; the chart proves the title and nothing else.
- Chart integrity: zero baseline where required, units labelled, source cited, no 3D.
- Data ink dominates; gridlines, legends and borders recede.
- One grid — text blocks and exhibits land on the same margins slide to slide.
- Numbers reconcile across slides; the recommendation lands in the first three slides.
**ANTI-BAR** — internal all-hands decks and Canva templates. Both reward decoration, and the first has a captive audience, which is
the opposite of a client.

## Voice / phone agents

**BAR** — Default **a recording of your best human agent on the same call type**: nothing published matches a real rep on your
calls, and the recording already exists in the call log. Alt: the **Google Duplex demo (2018)** for turn-taking and disfluency. Not
a competitor's live line — dialling a third party is not an agent's decision to make, and a frozen probe re-dials it every round
(C5.5).
**ACQUIRE** — Operator, once, at round 0: pull top-outcome recordings plus transcripts from the call platform, and record the
candidate side against a **test destination** into `$RUN/bar/` and `$RUN/probes/fixtures/` (C3). In-loop the probe is
`flowforge_run_test` then `flowforge_get_call`, or a fixture replay. `flowforge_start_call` to a real destination is forbidden
inside the loop.
**BLIND** — Normalise both with `ffmpeg -af loudnorm=I=-16:TP=-1.5`, same codec, same 60–90s window over the same call stage, brand
and rep names bleeped, TTS intro tells stripped. Then compare **transcript + turn-timing marks + tool-call trace** — the whole of
what this harness can observe. The critic cannot hear and no ASR is installed, so voice is **PROXY** under C5.4, which states what
such a verdict carries, what it can never establish, and the operator gate it must name.
**SIGNALS** — the first five read off the trace; the last two do not.
- Barge-in: the interrupted turn ends early in the timing marks, and the next turn resumes correctly.
- Turn latency under ~700ms and *consistent* — variance reads as broken, not as thinking.
- Backchannels present, but not on every turn. Survives the caller going off-script twice without a flow restart.
- Numbers, dates and spellings confirmed back in the caller's own format.
- Escalation, voicemail and silence-timeout paths, and the CRM/webhook side effect actually fired.
- Loudness, clipping and dead air from `ebur128`, `astats`, `silencedetect` — budget checks.
- Timbre, prosody, mispronounced proper nouns, artefacts — **operator gate** (C5.4). Where callers actually judge a voice agent.
**ANTI-BAR** — grading against the **script document**: circular, since the script is what the builder was handed. Grading the
transcript is *not* the anti-bar — it is the only comparison the harness can run, and its evidential limit is stated above rather
than hidden.

## CLI & developer tooling

**BAR** — Default **`gh` (GitHub CLI)** for subcommand structure, auth flow and machine-readable output, plus **`rg` (ripgrep)** for
speed and help ergonomics. Both install locally, so the critic can *run* the bar instead of reading about it — full parity, the only
domain that gets it for free. Alt: **`httpie`**.
**ACQUIRE** — Install and run the bar: `--help` at root and two levels deep, one happy path, one error path, one piped-to-`jq` path,
`time` on a large input. Capture stdout, stderr and exit codes verbatim. Same for yours.
**BLIND** — Captured terminal output at 80 columns, same theme, ANSI preserved, tool name replaced with `tool` in both. Pair help vs
help, error vs error, timing vs timing.
**SIGNALS**
- `--help` fits a screen, leads with examples, lists subcommands before flags.
- Errors state what happened, what was expected, what to run next; exit codes are distinct.
- Machine mode (`--json`) is stable; human mode detects non-TTY and drops colour and progress.
- Flag names match sibling tools' conventions; short flags only for the common few.
- Dry-run on anything destructive; confirmation prompts only when interactive.
- Startup p50 under ~50ms, measured by C5's performance-row method; `hyperfine` is absent (C5.2), so it is a serial loop or nothing.
  Config precedence documented: flag > env > file > default.
**ANTI-BAR** — your own current `--help` text (circular) or `clig.dev` alone (a good checklist, but not an artifact the critic can
run and be beaten by).

## Infrastructure & IaC

**BAR** — Default **`terraform-aws-modules/terraform-aws-vpc`**: real, heavily reviewed code, and its variable/output design is
exactly what generated IaC gets wrong. Alt: **Google SRE Workbook** chapters for operational posture and SLOs; **AWS
Well-Architected** as a review lens, not a bar.
**ACQUIRE** — Clone it; read `variables.tf`, `outputs.tf`, `examples/`, generated README. For yours, produce `terraform plan` output
and docs from the same tooling. This domain has **no C5 row of its own and routes rather than improvising** (C5.1): the CLI row for
`plan`/`fmt`/`apply` output on both sides, plus the Data row for differential recomputation of the plan against the spec. Nothing
here provisions real infrastructure.
**BLIND** — Resource names normalised, account ids and regions replaced with placeholders, `terraform fmt` over both, paired as
variables / outputs / example / plan, order harness-assigned.
**SIGNALS**
- Variables have types, descriptions, sane defaults and validation blocks.
- No hardcoded ids, regions, CIDRs or secrets; nothing plaintext in state-visible fields.
- State strategy explicit: remote backend, locking, per-environment isolation.
- `plan` is clean and a repeat `apply` is a no-op — no perpetual diff.
- Blast radius: least-privilege IAM, no `*` actions, resources scoped.
- Restore *tested* with a documented RTO; alarms and dashboards ship with the resource.
**ANTI-BAR** — a successful `apply`. It proves nothing about drift, teardown, cost or the second environment, and "it deployed" is
the most common false green in this domain.

## Security posture

**BAR** — Default **a Trail of Bits public audit report** (`github.com/trailofbits/publications`) as the bar for the *review
artifact*: severity discipline, reproduction steps and exploitability reasoning internal reviews rarely reach. Alt: **OWASP ASVS
L2** as the checklist behind the bar (a standard, not a bar); **a published CVE write-up in your stack** for depth on a single
finding.
**ACQUIRE** — Download two reports in an adjacent technology; read the findings format. Produce yours identically: title, severity,
target, description, exploit scenario, recommendation, code reference. This domain has no C5 row and **routes to the Prose row**
(C5.1): a fresh-context independent reader over the review artifact, and any exploitability claim is an operator gate, not a critic
call.
**BLIND** — Findings-level: five findings per side, project names stripped, paths reduced to `module/`, same template. The judge
answers which set a competent attacker would fear more. Never compare summary sections.
**SIGNALS**
- Severity argued from exploitability and impact, not asserted.
- Every finding has a reproduction or proof-of-concept.
- Authorisation checked per object, not per route — IDOR is the modal real bug.
- Secrets: provenance, rotation, and whether they ever entered git history.
- Trust boundaries drawn; every input crossing one validated at the boundary.
- Failure mode is deny; logs capture auth decisions without capturing credentials or PII.
**ANTI-BAR** — "OWASP Top 10 covered" or a clean `npm audit`: awareness signals that produce green checkmarks over unauthenticated
endpoints. Scanners find categories; bars find bugs.

## Agent & prompt systems

**BAR** — Default **the baseline Gauntlet prompt**, at the installed path C3.8 names — never the build-time `reference/` copy, which
does not survive installation. It is the shortest working thing in the category, so comparing against it punishes this domain's
signature failure, length as evidence of effort. Alt, and the two escalation targets, both verified present:
`~/.claude/skills/verification-loop/SKILL.md` and `~/.claude/skills/eval-harness/SKILL.md`. Also **Anthropic's "Building effective
agents"** post.
**ACQUIRE** — Read the local files directly; WebFetch the published post. Then run both systems on one goal and compare *outputs*,
not documents.
**BLIND** — Two levels, output-level breaking ties (C5.6). (1) Prompt-level: both stripped of names, same formatting, word counts
stated. (2) Output-level: each prompt run on one identical goal at the same model and the same budget, artifacts compared blind. A
whole-system-versus-one-prompt pairing is **not** blind — the length tells the judge instantly.
**SIGNALS**
- Prescription-to-leverage ratio: does each line change behaviour, or only constrain it.
- Separation of powers — nothing grades itself, ever.
- Modality match between check and artifact, and no check the harness cannot actually run.
- Its own exit condition is stated and can actually occur; a round counter is not one.
- Model set at spawn, not after resume — resumed agents revert to the session default.
- State survives a crash. Shorter at equal power always wins.
**HONEST SELF-TEST** — this system competes in this domain, so two facts stay on the record. (1) Its emissions run longer than the
baseline, so on the last signal above they lose any pair where power is genuinely equal; C4's word ceiling *bounds* that loss, it does
not win the comparison, and the tournament that would establish equal power has not run. (2) Wave 1's reference files beating the
baseline does **not** put this bar below the ceiling, and C5.6 is the ruling: the files are not the emission. Until the tournament
runs, the default above stands, the escalation targets wait, and no line in this file claims the baseline has been beaten.
**ANTI-BAR** — awesome-prompts repos and "ultimate prompt engineering guide" documents. The defect is volume in the **emission**,
not depth in a reference file an agent may consult after it has seen the artifact; imitate the former and you ship the 40-page
framework that loses to the baseline.

---

## BAR CONSTRUCTION — when no external artifact exists

For genuinely novel goals, proprietary references, or domains with no public exemplar. Never substitute an adjective for a bar.

1. **Commission before you build.** Spawn one agent with no knowledge of your plan, given an expert persona anchored in named real
   practice ("you have shipped three payment ledgers"). Ask only for the artifact, at its best, with no reference to our attempt.
2. **Commission three, keep one.** Different anchors, in parallel. Take the single best artifact, never a merge — merges regress to
   the mean.
3. **Freeze it** into `$RUN/bar/`, read-only, then hash it. C3 owns that directory, its flatness and the cwd-pinned hash command;
   nest nothing under it, or the hash command fails.
4. **Record provenance in that same flat directory** — `PROVENANCE.md`, so `bar.sha256` covers it: model, date, the persona prompt
   verbatim, the artifact's digest, and why synthetic.
5. **The builder never sees `bar/`.** Only the critic loads it. A builder that has read the bar produces mimicry, and the comparison
   becomes meaningless.
6. **Never regenerate mid-run.** A moving synthetic bar makes rounds incomparable. If the bar is wrong: stop, replace it, and open a
   new run-id.
7. **Log it as synthetic** — weaker evidence than a real bar. Beating it is necessary, not sufficient.

## BAR ESCALATION — raising it between runs

**When.** Never from inside a round and never triggered by a round's result. Escalation is an operator decision, admissible only
where C2.5 permits it, and it opens a **new run-id** with a fresh comparison history — the treatment a re-fetched bar gets under
`F3`. **This file states no trigger of its own:** a trigger here would convert every clearing event into a new epoch and an expected
loss, and void the comparison history the harness computes across rounds.

| Step | Action |
|---|---|
| 1 | Log the close: run-id, the panel record, the artifact hash. A milestone, not a reset. |
| 2 | Escalate along **one** axis: next-tier artifact, harder surface, or stricter modality. |
| 3 | Prefer *harder surface* first — same bar, uglier conditions (mobile, cold cache, 3× data, hostile caller, adversarial input). Costs nothing, finds more. |
| 4 | Open the new run-id, name the new bar in it, freeze and hash the bar again. Rounds compare only inside one run-id. |
| 5 | Expect the first round under the new bar to lose. That loss is not a regression. |

**Ladders** (surface → tier): site → mobile viewport + cold cache → stripe.com. Product UI → five states + keyboard-only → Linear's command
palette. API → partial failure and replay → GraphQL parity. Game → 40-active frame budget → Doom's encounter pacing.

**Never lower the bar** — not to end the run sooner, not because rounds are expensive, not because the critic seems stuck. Lowering
it retroactively invalidates every prior round and is the most common route to confident mediocrity. Budget exhaustion is an **abort**
under C2, not a reason to soften the bar: report the last honest comparison, because a truthful loss is usable and a manufactured win
is not. Two exceptions, each needing an explicit human decision in the log — the bar was mis-specified, or the goal changed.

## OVERFITTING WARNING — mimicry vs quality

Mimicry copies the bar's decisions. Quality reproduces the reasoning that produced them. Mimicry wins blind comparisons for two or
three rounds, then collapses on the first surface the bar never covered.

| | Mimicry | Quality |
|---|---|---|
| Colour / type | Bar's exact hex and font | A scale with a stated ratio and reason |
| Copy | Bar's phrasing, nouns swapped | Our claim, their discipline |
| Structure | Bar's section order preserved | Structure derived from our content |
| New surface | Falls apart | Extends coherently |
| "Why this choice?" | Restates the bar | Names the constraint it resolves |

**Four tests, each owned by a named role — and none of them asks a builder anything** (C1.6: a builder's summary is never evidence).
Any failure is a mimicry finding whatever the blind pick was.

| Test | Owner | What it is |
|---|---|---|
| **Novel region** | orchestrator | Registers `<part>-novel` on a surface the snapshot lacks — an extra state, a second breakpoint, an error path, one more call turn. A critic then judges it as an ordinary part. Mimics have nothing to copy there. |
| **Substitution** | orchestrator | Authors one changed governing input (brand colour, audience, data volume, platform) and registers it. Quality adapts; mimicry breaks, or silently keeps the bar's answer. |
| **Tell** | round-close agent | `F4`'s token lift: hexes, font stacks, class names and literal strings from `$RUN/bar` intersected with the source via `comm -12`. A critic cannot run this — it would have to be told which side is the bar, which ends blindness. |
| **Why** | **nobody — removed** | Asking a builder to justify borrowed decisions is `F6` run as a probe, and a builder's summary is never evidence. It survives only as the round-close compliance greps in `INSPECTION.md`. |

Mimicry findings are **not** a verdict field, and this file defines no verdict format: C1 owns the critic's whole reply, and a mimicry
finding travels in the prose fields C1 already provides. No second verdict contract exists anywhere. The hedged pass this section used
to print is `F5` by construction, and C1's `choice` enum is what closes that channel — it has no room for a modifier, and a modifier
is what the hedge was. A win built on lifted surface is a loss that has not happened yet.
