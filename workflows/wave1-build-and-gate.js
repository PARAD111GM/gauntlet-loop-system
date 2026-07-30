export const meta = {
  name: 'gauntlet-master-build',
  description: 'Build THE GAUNTLET master prompting system: 10 components, each gated by a hostile fresh-context critic looping until pass',
  phases: [
    { title: 'Build' },
    { title: 'Critique' },
    { title: 'Revise' },
    { title: 'RedTeam' },
    { title: 'Coherence' },
  ],
}

const ROOT = (typeof args === 'string' && args) ? args : '/Users/Nathan/Code/gauntlet-loop-system'
const BRIEF = `${ROOT}/reference/BUILD-BRIEF.md`
const BASE = `${ROOT}/reference/baseline-gauntlet-prompt.md`

const READ_FIRST = `Before writing a single word, Read BOTH of these in full:
- ${BRIEF}  (shared build brief, house style, hard-won lessons, file manifest)
- ${BASE}   (the third-party baseline artifact we must beat, plus why it works)
Also Read any existing sibling files in ${ROOT} that are already written, so your file
composes with them instead of duplicating them. Do NOT edit any file other than your own.`

const COMPONENTS = [
  {
    key: 'DOCTRINE',
    file: `${ROOT}/DOCTRINE.md`,
    spec: `The theory layer. What must be in it:
- The five invariants (concrete external bar / delegated decomposition / separation of powers /
  blind forced-choice judgment / no round limit). For EACH: one-line statement, why it exists,
  the exact failure that occurs when it is dropped, and how to detect that it has been dropped.
- "Minimalism is load-bearing": argue precisely why a longer launch prompt performs WORSE.
  Name the mechanism (it substitutes the author's judgment for the model's, and narrows search).
  State the corollary: depth lives in reference files, never in the launch prompt.
- What a BAR actually is. Necessary properties: external (not authored by the builder),
  inspectable (a critic can open it), named (a specific artifact, not a category),
  and above the ceiling (unreachable, so it never stops supplying pressure). Give the
  anti-examples: "production-ready", "beautiful", "10/10", "better than before".
- Epistemics of judgment: why forced blind pairwise choice beats rubric scoring. Rubrics are
  self-referential and inflate; pairwise choice against a fixed external artifact cannot inflate
  without the artifact changing. Cover the known rubric-inflation incident from the brief.
- Separation of powers, stated as a constitution: who may build, who may judge, who may
  arbitrate, and what each is forbidden to see. Include the "no subsystem grades itself" rule.
- Termination theory: quality-driven and marginal-gain stopping rules, never a counter.
- A short section "when NOT to run a gauntlet loop" (cost-dominated tasks, tasks with a single
  correct answer, tasks where no external bar can exist, tasks under a hard deadline).
This file is read once by a human and then rarely. It must be the most convincing 250 lines
they read this month. It is theory, but every claim must cash out in an operator behaviour.`,
  },
  {
    key: 'LAUNCH',
    file: `${ROOT}/LAUNCH.md`,
    spec: `THE CORE PRODUCT. A meta-prompt system that converts any goal into a minimal, devastating
launch prompt. Structure:
1. A copy-pasteable META-PROMPT the operator gives to a lead agent, containing their raw goal.
   It instructs the lead agent to: interrogate the goal, select the strongest concrete bar,
   choose the inspection modality, then EMIT a launch prompt under 150 words and nothing else.
2. The BAR INTERROGATION question set the lead agent runs internally (6-10 questions, e.g.
   "what artifact in the world would make a domain expert say 'that is the ceiling'?",
   "can a fresh agent actually open and inspect that artifact?", "what modality reveals
   quality here — pixels, behaviour, latency, or prose rhythm?", "what would an expert notice
   in 5 seconds that an amateur would miss?").
3. The EMITTED LAUNCH PROMPT TEMPLATE with explicit slots: {GOAL}, {NAMED BAR}, {MODALITY},
   {MEDIUM if genuinely constrained}. It must read like a human wrote it in one breath. It must
   contain: the bar by name, the fan-out instruction, the fresh harsh critic, the blind
   side-by-side forced choice, and no stopping condition other than the bar. Under 150 words.
4. A PRE-EMISSION SELF-CHECK the generator must pass before returning (a hard checklist:
   under 150 words? bar named and openable? zero architecture prescribed? zero technology
   choices unless genuinely required? modality matched to the artifact class? no round limit?
   no rubric? critic separation stated?). Any failure = regenerate, do not ship.
5. THREE example emissions across different domains, shown as goal -> emitted prompt, so the
   operator can see the shape immediately.
6. A short "escape hatches" section: what to do when the goal has no external bar, when the
   goal is multi-domain, and when the operator insists on a technology.
Hard requirement: nothing in the emitted prompt may prescribe decomposition, architecture,
file layout, or an iteration count. The generator's value is bar selection and modality
selection, not instruction volume.`,
  },
  {
    key: 'BARS',
    file: `${ROOT}/BARS.md`,
    spec: `The bar library — the highest-leverage original contribution in this system, because
choosing the bar is the hard part and the baseline leaves it entirely to the human.
Cover AT MINIMUM these domains, each as a compact entry:
real-time 3D / browser games; web marketing site & landing page; product app UI (dashboards,
settings, data tables); mobile / iOS app; backend API or service; data pipeline & analytics;
ML system & evals; long-form prose & strategy memos; marketing copy & paid ads; brand and
visual identity; slide decks and client deliverables; voice / phone agents; CLI and developer
tooling; infrastructure & IaC; security posture; agent & prompt systems themselves.
For EACH domain give exactly these fields, in a consistent format:
- BAR: one to three named real-world artifacts (be specific and real — name products, sites,
  papers, publications, companies). Say which is the default pick and why.
- ACQUIRE: how a fresh critic agent physically gets the reference to inspect (fetch the URL,
  screenshot at a named viewport, pull the public docs, download the sample, record the call).
- STAGE THE BLIND: exactly how to present ours vs theirs so the judge cannot tell which is
  which (strip chrome, normalise viewport/format, randomise order, label A/B only).
- SIGNALS: the 4-8 things an expert notices in this domain that an amateur misses. Be concrete
  and physical (e.g. for UI: optical alignment, type scale ratio, shadow physics, focus states,
  empty/loading/error states, motion easing, density).
- ANTI-BAR: what people wrongly use as the bar here and why it fails.
Then three cross-cutting sections:
- BAR CONSTRUCTION when no external artifact exists: synthesise a reference by commissioning
  an independent expert-persona artifact first, freeze it, and judge against the frozen copy.
- BAR ESCALATION: how and when to raise the bar mid-run once the current bar is being matched,
  and why you must never lower it.
- OVERFITTING WARNING: matching the bar's surface (mimicry) versus matching its quality; how a
  critic distinguishes the two.
Format as scannable entries. This file is allowed to be the longest, up to ~450 lines, because
it is a lookup table, not something read start to finish.`,
  },
  {
    key: 'ROLES',
    file: `${ROOT}/ROLES.md`,
    spec: `Verbatim, spawnable role prompts. Each role gets a fenced block that can be pasted
directly into an Agent/Workflow spawn with slot substitution. Roles:
- ORCHESTRATOR (lead): mandate is decomposition into smallest INDEPENDENTLY JUDGEABLE parts,
  spawning, scheduling, and holding the bar. Forbidden: building anything itself, judging
  anything itself, revealing builder rationale to critics.
- BUILDER (specialist): mandate is to make the artifact and to respond to gap feedback.
  Forbidden: grading its own work, claiming compliance without evidence, touching another
  builder's surface. Must return evidence, not assurances.
- BLIND CRITIC: the most important prompt in the file. It must include: fresh-context
  declaration; the artifact paths; the reference artifact; an explicit instruction that it has
  NOT been told which artifact is which and must not attempt to infer it; the forced-choice
  question; a demand that it actually open/execute the artifacts in the correct modality and
  cite the specific evidence it observed; a bias toward FAIL under uncertainty; and a required
  output contract. It must be instructed to name the single largest gap, not a list of 20 nits.
- ARBITER: resolves disagreement between critics or a builder's appeal; sees both cases and the
  evidence but not the identities; breaks ties; may overrule a critic only on evidence grounds.
- RED TEAM: tries to make the artifact fail in ways the critic's modality cannot see.
For each role also specify: inputs, forbidden knowledge (be explicit — this is the anti-capture
mechanism), output contract as a JSON schema, model tier recommendation with a one-line reason,
and refusal conditions (when the role must stop and escalate rather than guess).
Include one short section on ANTI-CAPTURE: the specific pieces of information that must never
cross from builder to critic, and how a workflow author enforces that (pass file paths, never
the builder's return text; never let a critic read the build transcript).`,
  },
  {
    key: 'INSPECTION',
    file: `${ROOT}/INSPECTION.md`,
    spec: `Modality-matched inspection recipes — how a critic ACTUALLY verifies, per artifact class.
Open with the load-bearing lesson: a still screenshot cannot detect a behavioural bug. Tell the
real incident from the build brief (a visual-only critic loop drove a browser game 27 -> 43 on
its own rubric while behavioural bugs survived untouched) and derive the rule: every quality
claim needs a probe in the modality where that quality lives.
Then a recipe per artifact class. Classes to cover: static visual (page, poster, deck);
interactive UI; real-time 3D / game; motion & animation; API / service; data correctness;
performance & latency; prose & narrative; audio / voice; mobile app; CLI; agent or prompt
system. For each: 
- PROBE: the exact sequence a critic executes (real commands and tools — Playwright MCP,
  the browser pane tools, iOS simulator control, curl/contract tests, perf traces, read-aloud).
- EVIDENCE: what artifact the critic must attach to its verdict (screenshot path, trace, diff,
  transcript, log excerpt).
- BLIND STAGING: how to normalise ours vs the reference for this class.
- CANNOT DETECT: the explicit blind spot of this probe, and which additional probe covers it.
Include a compact BEHAVIOURAL PROBE DESIGN section for interactive artifacts: state coverage,
adversarial input, boundary and interruption cases, and why a probe must assert on observable
state rather than on absence of errors.
Include EVIDENCE HYGIENE: verdicts without attached evidence are void; a builder's summary is
never evidence; grep the imports rather than trusting a compliance claim.
Ground every tool reference in primitives that actually exist in Claude Code today. Do not
invent tool names.`,
  },
  {
    key: 'FAILURE-MODES',
    file: `${ROOT}/FAILURE-MODES.md`,
    spec: `The anti-pattern catalogue. Cover at least these, and add any you can justify:
soft bar; bar so far out of reach the loop thrashes; critic capture (critic sees builder
rationale and rationalises); self-grading leakage (same context builds and judges); rubric
inflation; modality mismatch; decomposition into parts that are not independently judgeable;
integration rot (every part passes, the whole is incoherent); non-termination / infinite polish;
cost blowout; model downgrade on resume; builder false compliance claims; critic drift and
fatigue across rounds; overfitting to the bar (surface mimicry); premature parallelism (fanning
out before the interfaces are stable); orphaned work (parallel builders producing conflicting
foundations); bar drift (the reference artifact silently changes or is re-fetched differently);
verdict laundering (a FAIL rewritten as a PASS with caveats).
For EACH entry use exactly this structure:
- NAME
- SYMPTOM: what the operator observes.
- WHY IT HAPPENS: the mechanism.
- DETECTION SIGNAL: a specific, checkable thing that reveals it (a number, a grep, a pattern in
  the verdict text). Make these genuinely operational.
- MITIGATION: what to change in the prompt, roles, or workflow.
- VIOLATES: which of the five invariants from DOCTRINE.md.
End with a one-page TRIAGE TABLE: "loop is doing X" -> "you have failure mode Y" -> "do Z",
so an operator watching a live run can diagnose in ten seconds.`,
  },
  {
    key: 'OPERATIONS',
    file: `${ROOT}/OPERATIONS.md`,
    spec: `The runbook. Everything about actually running a gauntlet loop on Claude Code.
- HARNESS SELECTION: Workflow (deterministic JS orchestration with agent()/parallel()/pipeline(),
  concurrency cap ~16, lifetime agent cap 1000, resumeFromRunId) vs plain Agent fan-out vs
  /loop vs ultracode mode. Give a decision table: which primitive for which shape of run, and
  the specific reason. Note that pipeline() beats parallel() barriers for multi-stage per-item
  work, and when a barrier IS correct (cross-item dedup, early exit, comparative context).
- MODEL ASSIGNMENT by role, with reasons: judgment-heavy roles get the strongest model; volume
  builders can go cheaper; and the hard-won trap — a RESUMED agent silently reverts to the
  session default model, so model must be set at spawn.
- ISOLATION: when parallel builders need git worktrees to avoid mutating the same files, and
  the cost of that isolation.
- COST CONTROL: a budget-driven loop pattern (scale rounds to remaining budget rather than a
  fixed count), what a typical run costs in orders of magnitude, and where the money actually
  goes (critic rounds, not builds).
- TERMINATION POLICY: the marginal-gain rule and the dry-round rule, stated so an operator can
  apply them mechanically. Explicitly: never a fixed round count.
- EVIDENCE LAYOUT: a concrete directory structure for artifacts, verdicts, and screenshots per
  round, so a run is auditable afterwards.
- LIVE OBSERVATION: how to watch a run without interrupting it, and why interrupting is costly.
- STALL PLAYBOOK: the loop is running but quality is flat — the ordered list of things to change
  (raise the bar, change the modality, re-decompose, swap the critic, shrink the unit of work).
- RESUME AND REPAIR: recovering a run after a kill or a script edit.
Give real, runnable code/config snippets where they help. Ground everything in primitives that
exist. Do not invent features.`,
  },
  {
    key: 'EXAMPLES',
    file: `${ROOT}/EXAMPLES.md`,
    spec: `Three fully worked end-to-end runs. Deliberately span modalities so the reader sees the
system is universal, not visual-only:
A) A browser real-time 3D game — the baseline's own home turf, to demonstrate parity and then
   an edge (better bar acquisition, behavioural probes the baseline's visual-only critic misses).
B) A production product UI surface (pick something concrete: an analytics dashboard or a
   settings/billing surface), bar = a named best-in-class real product.
C) A NON-VISUAL run. Pick one and commit: a backend service with a latency and correctness bar,
   or a long-form strategy memo with a named publication as the bar. Non-visual is where most
   readers assume gauntlet loops do not work, so this example carries the most weight.
For each run show, in order:
1. The raw operator goal (one sentence, realistically vague).
2. The bar interrogation output and the CHOSEN bar, with the reasoning for that choice and one
   rejected candidate bar with why it was rejected.
3. The EMITTED launch prompt, verbatim, under 150 words.
4. The orchestrator's decomposition (the actual list of independently judgeable parts).
5. One full sample critic verdict, in the real output contract, with cited evidence — including
   a FAIL verdict, because a run of all-passes teaches nothing.
6. Round-by-round deltas: what changed, what the critic said next, where it plateaued.
7. Termination: which stopping rule fired and what the final gap to the bar was, stated honestly.
Make these read like real run logs, not marketing. Include at least one thing that went wrong
and how the system caught it. Concrete numbers and names throughout; no placeholders.`,
  },
  {
    key: 'INSTALL',
    file: `${ROOT}/install/SKILL.md`,
    spec: `An installable Claude Code skill so the operator types /gauntlet <goal> and the system runs.
Requirements:
- Correct skill frontmatter: name (kebab-case), description written for TRIGGERING (third
  person, packed with the phrases a user would actually say: "gauntlet loop", "build this at
  AAA quality", "beat <product>", "make this world-class", "run a gauntlet"). The description
  is a retrieval surface — write it as such.
- A compact operating procedure the agent follows: read the goal, run bar interrogation from
  LAUNCH.md, select bar from BARS.md, select modality from INSPECTION.md, emit the launch
  prompt, confirm the bar with the operator in ONE question, then orchestrate using ROLES.md
  and OPERATIONS.md.
- The one confirmation gate: the operator approves the BAR before compute is spent, because a
  wrong bar wastes the entire run. Everything else runs unattended.
- Progressive disclosure: the SKILL.md body stays lean and points at the sibling reference
  files by path rather than inlining them. State this explicitly as the reason.
- Also include, in the same file, the install steps (where to copy the directory so Claude Code
  picks it up as a personal skill, and how to verify it loaded).
- Keep it under 200 lines. A bloated skill file defeats its own purpose.
Follow real Claude Code skill conventions. Do not invent frontmatter fields.`,
  },
  {
    key: 'README',
    file: `${ROOT}/README.md`,
    spec: `The entry point. Write it LAST in spirit — assume all sibling files exist and reference them.
Must deliver, in this order:
- One-sentence statement of what this is and the promise it makes.
- The 60-SECOND QUICKSTART: the literal minimum an operator does to get a running loop. Show
  the actual paste-able meta-prompt call and the one decision they must make (the bar).
- WHAT THIS ADDS over the raw baseline prompt, as a short honest table: the baseline already
  nails five things (list them, credit Matt Shumer by name with the source link); this system
  adds bar selection, modality-matched inspection, closed failure modes, and operability.
  Do not overclaim. Credit is not optional.
- THE LOOP IN ONE DIAGRAM: an ASCII or mermaid diagram of goal -> bar -> decompose -> build ||
  -> blind critic -> pass/fail -> loop -> ship. Must be genuinely legible in a terminal.
- FILE MAP: one line per sibling file saying when to open it.
- WHEN NOT TO USE THIS: honest, three or four bullets.
- COST EXPECTATION: an order-of-magnitude statement so nobody is surprised.
Scannable in 30 seconds, complete in 3 minutes. Ruthlessly short — under 180 lines.`,
  },
]

const CRITIC_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'forced_choice', 'largest_gap', 'gaps', 'evidence_cited', 'ship_test'],
  properties: {
    verdict: { type: 'string', enum: ['PASS', 'FAIL'] },
    forced_choice: {
      type: 'string',
      enum: ['THIS_FILE_WINS', 'BASELINE_ALONE_WINS', 'TOO_CLOSE_TO_CALL'],
      description: 'Would an expert operator get better real-world output from this file, or from just the raw baseline prompt plus their own judgment?',
    },
    largest_gap: { type: 'string', description: 'The single biggest weakness, stated concretely' },
    gaps: {
      type: 'array',
      maxItems: 12,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['severity', 'what', 'why_it_matters', 'concrete_fix'],
        properties: {
          severity: { type: 'string', enum: ['BLOCKER', 'MAJOR', 'MINOR'] },
          what: { type: 'string' },
          why_it_matters: { type: 'string' },
          concrete_fix: { type: 'string' },
        },
      },
    },
    evidence_cited: { type: 'array', items: { type: 'string' }, description: 'Specific lines/sections observed' },
    ship_test: { type: 'string', description: 'Would a top practitioner in this domain put their name on this file? Answer and justify in 2 sentences.' },
    padding_found: { type: 'array', items: { type: 'string' }, description: 'Lines or sections that are filler and should be cut' },
  },
}

function criticPrompt(c, round) {
  return `You are a hostile, fresh-context quality critic. You did NOT write the file you are judging
and you have no access to the author's reasoning. Judge only the artifact on disk.

Round ${round} review of: ${c.file}

MANDATORY FIRST STEPS
1. Read ${BRIEF} and ${BASE} in full.
2. Read ${c.file} in full.
3. Read the other files that already exist in ${ROOT} (use Glob) so you can judge coherence,
   duplication, and contradictions with siblings.

WHAT THIS FILE WAS SUPPOSED TO BE
${c.spec}

HOW TO JUDGE — in this order
A. THE FORCED CHOICE. An expert operator wants to produce world-class work. Option 1: they get
   this file. Option 2: they get only the raw baseline prompt (see ${BASE}) plus their own
   judgment. Which produces better real output? If this file does not clearly beat "smart person
   with the baseline prompt", it is not earning its existence. Answer honestly. A file that only
   restates what a competent operator would already do is a FAIL.
B. THE SHIP TEST. Would a top practitioner in this specific domain put their name on this file?
C. OPERATIONAL BITE. Go line by line looking for claims that cannot change anyone's behaviour.
   Every one you find is padding. List them. Vague advice is the primary failure mode of
   documents like this and you must be merciless about it.
D. CORRECTNESS. Any invented tool name, invented API, invented Claude Code feature, wrong model
   name, or factually wrong claim is an automatic BLOCKER. Verify tool/feature claims against
   what the build brief says actually exists.
E. HOUSE STYLE. Filler openings, restated headings, AI cadence, over-length (>400 lines except
   BARS.md at ~450), missing fenced blocks where content is meant to be copied.
F. SELF-CONSISTENCY WITH THE THESIS. This system's own thesis is that prescription and length
   are liabilities. A file that violates its own doctrine is a BLOCKER.

CALIBRATION — read this carefully
Default to FAIL. You are the gate that stops mediocre work from shipping, and the operator has
explicitly asked for a bar most work does not clear. PASS only when you would be genuinely
impressed receiving this from a senior specialist you were paying well. "Solid", "comprehensive",
and "a good start" all mean FAIL. Do not soften a FAIL into a PASS with caveats — that is verdict
laundering. If you find even one BLOCKER, the verdict is FAIL.
Conversely: do not manufacture objections to look rigorous. If the file genuinely clears the bar,
say PASS and say why. Padding your gap list with nits on an excellent file wastes rounds.

Cite specific evidence (section names, line content) for every gap. A gap I cannot locate in the
file is a gap you invented, and inventing gaps is worse than missing them.`
}

function builderPrompt(c) {
  return `You are a specialist writer building ONE component of a master prompting system.

${READ_FIRST}

YOUR FILE (create it; you own it exclusively): ${c.file}

SPECIFICATION
${c.spec}

RULES
- Write the complete file with the Write tool. Create parent directories if needed.
- Obey the house style in the build brief: dense, declarative, zero filler, tables and
  checklists over prose, every claim actionable, copy-pasteable blocks for anything meant to
  be used verbatim.
- Never invent a tool, API, model name, or Claude Code feature. If unsure whether a primitive
  exists, either verify it or leave it out. Invented features are the single worst failure here.
- This system's own thesis is that length and prescription are liabilities. Your file must not
  violate the doctrine it teaches. Cut anything a reader cannot act on.
- A hostile fresh-context critic will blind-compare your file against "a smart operator holding
  only the raw baseline prompt". If your file does not clearly beat that, it fails. Write for
  that adversary.

Return ONLY a 3-line summary: the file path, the line count, and the single strongest thing
about it. Your summary is NOT shown to the critic, so do not argue your case here.`
}

function revisePrompt(c, verdict, round) {
  return `You are revising a file to close specific gaps found by an independent critic.

${READ_FIRST}

FILE TO REVISE (edit in place): ${c.file}
Read it in full first.

ORIGINAL SPECIFICATION
${c.spec}

CRITIC VERDICT (round ${round}) — this critic never saw your reasoning and is not negotiable:
${JSON.stringify(verdict, null, 2)}

RULES
- Fix every BLOCKER and every MAJOR. Fix MINORs where the fix is clearly an improvement.
- DELETE everything listed in padding_found. Deleting is as valuable as adding. The file should
  often get SHORTER, not longer. Do not respond to criticism by bulking up.
- Address largest_gap directly and structurally, not with a hand-wave sentence.
- If the critic's forced_choice was not THIS_FILE_WINS, the file has an existential problem:
  it is not clearly better than a smart operator with the raw baseline prompt. Restructure
  around whatever unique leverage this file actually provides, or cut it to the part that does.
- If you believe a specific gap is factually wrong, you may decline it, but you must say so
  explicitly in your return summary with the evidence. Silently ignoring a gap is not allowed.
- Never invent tools, APIs, model names, or Claude Code features.

Return ONLY: the file path, the new line count, which gaps you fixed, and any gap you declined
with your evidence.`
}

async function buildAndGate(c) {
  await agent(builderPrompt(c), { label: `build:${c.key}`, phase: 'Build' })

  let verdict = null
  const history = []
  for (let round = 1; round <= 3; round++) {
    verdict = await agent(criticPrompt(c, round), {
      label: `critic:${c.key}:r${round}`,
      phase: 'Critique',
      schema: CRITIC_SCHEMA,
      effort: 'high',
    })
    if (!verdict) {
      log(`${c.key}: critic round ${round} returned nothing — treating as FAIL`)
      history.push({ round, verdict: 'CRITIC_DIED' })
      continue
    }
    history.push({
      round,
      verdict: verdict.verdict,
      forced_choice: verdict.forced_choice,
      largest_gap: verdict.largest_gap,
      blockers: (verdict.gaps || []).filter(g => g.severity === 'BLOCKER').length,
    })
    const clean = verdict.verdict === 'PASS' && verdict.forced_choice === 'THIS_FILE_WINS'
    if (clean) {
      log(`${c.key}: PASSED on round ${round}`)
      return { key: c.key, file: c.file, passed: true, rounds: round, history }
    }
    log(`${c.key}: round ${round} ${verdict.verdict}/${verdict.forced_choice} — ${verdict.largest_gap}`)
    if (round === 3) break
    await agent(revisePrompt(c, verdict, round), { label: `revise:${c.key}:r${round}`, phase: 'Revise' })
  }
  return { key: c.key, file: c.file, passed: false, rounds: 3, history, final: verdict }
}

log(`Building ${COMPONENTS.length} components, each gated by a hostile critic (up to 3 rounds).`)
const results = await parallel(COMPONENTS.map(c => () => buildAndGate(c)))
const settled = results.filter(Boolean)
log(`Build+gate complete. Passed: ${settled.filter(r => r.passed).length}/${settled.length}`)

// Red team + coherence need the whole tree present, so a barrier here is correct.
phase('RedTeam')
const RED_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['break_attempts', 'worst_finding', 'system_survives'],
  properties: {
    break_attempts: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['attack', 'outcome', 'fix_needed'],
        properties: {
          attack: { type: 'string' },
          outcome: { type: 'string', enum: ['SYSTEM_HELD', 'SYSTEM_BROKE'] },
          fix_needed: { type: 'string' },
        },
      },
    },
    worst_finding: { type: 'string' },
    system_survives: { type: 'boolean' },
  },
}

const RED_ANGLES = [
  `Find a DOMAIN where this system fails. Try goals with no external bar, goals that are pure
   taste, goals spanning several modalities at once, goals where the "real-world equivalent" is
   proprietary and unopenable, and goals where the best-in-class artifact is worse than what the
   operator actually needs. For each, walk the system as written and show exactly where it breaks.`,
  `Attack the JUDGMENT machinery. Find concrete ways a critic in this system could be captured,
   fooled, or laundered into passing bad work: builder signalling through the artifact itself,
   critics inferring which artifact is "ours" from formatting or filenames, bar drift between
   rounds, evidence that looks like evidence but proves nothing, and the overfitting/mimicry hole.
   Show the exact text in the files that permits each attack.`,
  `Attack OPERABILITY and TRUTHFULNESS. Hunt for any invented tool, invented Claude Code feature,
   wrong model name, unrunnable snippet, wrong path, or claim about the harness that is false.
   Then attack economics: construct the run that blows the budget or never terminates while
   obeying every rule as written. Quote the permitting text.`,
]

const red = await parallel(RED_ANGLES.map((angle, i) => () => agent(
  `You are a red-team adversary trying to BREAK the master prompting system in ${ROOT}.

Read ${BRIEF}, ${BASE}, and every .md file under ${ROOT} (use Glob then Read).

YOUR ATTACK ANGLE
${angle}

Be specific and textual. Every finding must quote or cite the exact passage that permits the
failure, and name the file. A finding I cannot locate is a finding you invented. Do not report
stylistic opinions — only ways the system produces WORSE OUTPUT or FALSE CONFIDENCE in the real
world. Rank your findings and make the worst one unmissable.`,
  { label: `redteam:${i + 1}`, phase: 'RedTeam', schema: RED_SCHEMA, effort: 'high' },
)))

phase('Coherence')
const coherence = await agent(
  `You are the integration critic. Individual files passed their own gates; your job is to judge
the SYSTEM as one artifact. Read ${BRIEF}, ${BASE}, and every .md file under ${ROOT}.

Judge and report on:
1. CONTRADICTIONS between files. Quote both sides of each.
2. DUPLICATION: the same guidance in several files. Say which file should own it and which
   copies to cut.
3. GAPS: something the system needs that no file owns.
4. THE GOLDEN PATH: trace one operator end to end — raw goal, through README, LAUNCH, BARS,
   INSPECTION, ROLES, OPERATIONS — and report every point where they would get stuck, guess,
   or have to read a file the previous file never pointed them to.
5. TERMINOLOGY DRIFT: the same concept under different names across files.
6. SELF-CONSISTENCY: does the system as a whole obey its own doctrine that length and
   prescription are liabilities? Give a verdict on this specifically.
7. WEAKEST FILE, named, with the reason.

Cite file and section for everything. Be concrete enough that a fixer agent can act on your
report without re-deriving it.`,
  { label: 'coherence', phase: 'Coherence', effort: 'high' },
)

return {
  components: settled.map(r => ({ key: r.key, passed: r.passed, rounds: r.rounds, history: r.history })),
  unpassed: settled.filter(r => !r.passed).map(r => ({ key: r.key, final: r.final })),
  redteam: red.filter(Boolean),
  coherence,
}
