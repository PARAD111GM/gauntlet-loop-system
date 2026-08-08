export const meta = {
  name: 'gauntlet-blind-ab-tournament',
  description: 'Wave 2D: blind A/B our emitted launch prompts vs Shumer baseline adapted to the same goals — 4 prediction pairs plus 1 real outcome build-off',
  phases: [
    { title: 'Emit' },
    { title: 'Steelman' },
    { title: 'Sanitize' },
    { title: 'Judge' },
    { title: 'BuildOff' },
    { title: 'JudgeArtifacts' },
    { title: 'Diagnose' },
  ],
}

const ROOT = (typeof args === 'string' && args) ? args : '/Users/Nathan/Code/gauntlet-loop-system'
const BASE = `${ROOT}/reference/baseline-gauntlet-prompt.md`
const ARENA = `${ROOT}/arena`

const GOALS = [
  {
    id: 'G1',
    modality: 'product UI',
    goal: 'Build the billing and invoices settings page for a B2B SaaS product.',
  },
  {
    id: 'G2',
    modality: 'real-time 3D in the browser',
    goal: 'Build a third-person skateboarding game that runs in the browser.',
  },
  {
    id: 'G3',
    modality: 'backend engineering (non-visual)',
    goal: 'Build a REST API and Postgres schema for a double-entry payments ledger.',
  },
  {
    id: 'G4',
    modality: 'long-form prose (non-visual)',
    goal: 'Write a 2,000-word strategy memo arguing a specific position on how AI agent products should be priced.',
  },
]

const OUTCOME_GOAL = 'Build a single self-contained HTML page that teaches how one transformer attention head works, with an interactive diagram.'

// ---------------- Phase 1: our system emits ----------------
phase('Emit')
const EMIT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['emission', 'word_count', 'chosen_bar', 'modality_ruling', 'rejected_bar'],
  properties: {
    emission: { type: 'string', description: 'The launch prompt, exactly as the system would hand it to the operator. Prose only.' },
    word_count: { type: 'integer' },
    chosen_bar: { type: 'string' },
    modality_ruling: { type: 'string' },
    rejected_bar: { type: 'string' },
  },
}

const emissions = await parallel(GOALS.map(g => () => agent(
  `You are executing THE GAUNTLET's launch-prompt generator exactly as specified. You are not
improvising and you are not improving on it — you are running it as written, the way an operator
would get if they installed this system today.

Read, in this order, and follow them literally:
- ${ROOT}/LAUNCH.md  (the generator: bar interrogation, modality routing, emission template, pre-emission self-check)
- ${ROOT}/CONTRACTS.md  (normative: emission word ceiling, modality capability matrix)
- ${ROOT}/BARS.md  (the bar library — find the entry matching this goal's domain)
- ${ROOT}/INSPECTION.md  (how the critic will actually inspect this artifact class)

OPERATOR GOAL (verbatim, deliberately vague — this is realistic input):
"${g.goal}"

Run the generator end to end: bar interrogation, bar selection from BARS.md, modality routing
against the C5 capability matrix, then emit. Run the pre-emission self-check and regenerate if it
fails. Obey the emission word ceiling in CONTRACTS.md.

Return the emission as PLAIN PROSE PARAGRAPHS ONLY. No markdown headings, no bullet lists, no
bold, no labels, no preamble, no filenames, no reference to THE GAUNTLET or to any file in this
repo. It must read like a person typed it into Claude Code in one go. Anything that looks like
generated documentation rather than a typed prompt will be discarded.

Also report: the bar you chose, one strong bar you rejected and why, and your modality ruling.`,
  { label: `emit:${g.id}`, phase: 'Emit', schema: EMIT_SCHEMA, effort: 'high' },
)))

// ---------------- Phase 2: steelman the baseline ----------------
phase('Steelman')
const STEEL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['adaptation', 'word_count', 'fidelity_note'],
  properties: {
    adaptation: { type: 'string' },
    word_count: { type: 'integer' },
    fidelity_note: { type: 'string', description: 'What you preserved from the original and what you had to change' },
  },
}

const steelmen = await parallel(GOALS.map(g => () => agent(
  `You are adapting a known-excellent prompt to a new goal, and your job is to make it as STRONG as
possible. This is a steelman, not a straw man. If you weaken it, the experiment it feeds is void
and worthless.

Read ${BASE} — it contains the original prompt verbatim and an analysis of the five properties
that make it work.

NEW GOAL:
"${g.goal}"

Produce the adaptation an intelligent, experienced operator would write if they had the original
prompt in front of them and wanted the best possible result for this new goal. That means:
- Preserve all five load-bearing properties: a named concrete external bar, delegated
  decomposition, builder/critic separation, blind side-by-side forced choice, no round limit.
- Preserve the original's register and economy — the same confident, compressed, slightly informal
  voice. Roughly the same length as the original.
- Swap in the strongest real-world bar YOU would pick for this goal. Choose well; this is the
  baseline's best shot and you should give it a genuinely good bar.
- Keep the harness idioms the original uses where they apply.
- Do NOT add structure, headings, checklists, or process the original does not have. Its
  minimalism is a feature; adding scaffolding would misrepresent it.

Return PLAIN PROSE PARAGRAPHS ONLY. No headings, no bullets, no labels, no preamble, no mention of
where the prompt came from or who wrote it. It must read like a person typed it in one go.`,
  { label: `steelman:${g.id}`, phase: 'Steelman', schema: STEEL_SCHEMA, effort: 'high' },
)))

// ---------------- Phase 3: sanitize for genuine blindness ----------------
phase('Sanitize')
const SANITIZE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['alpha', 'beta', 'tells_removed', 'residual_tells', 'blindness_ok'],
  properties: {
    alpha: { type: 'string' },
    beta: { type: 'string' },
    tells_removed: { type: 'array', items: { type: 'string' } },
    residual_tells: { type: 'array', items: { type: 'string' }, description: 'Tells you could NOT remove without changing substance. Be honest.' },
    blindness_ok: { type: 'boolean' },
  },
}

const pairs = await pipeline(
  GOALS.map((g, i) => ({ g: g, i: i })),
  async (item) => {
    const g = item.g
    const i = item.i
    const ours = emissions[i]
    const theirs = steelmen[i]
    if (!ours || !theirs) return null
    const flip = (i % 2) === 1
    const first = flip ? theirs.adaptation : ours.emission
    const second = flip ? ours.emission : theirs.adaptation
    const sanitized = await agent(
      `You are the blinding officer for a controlled comparison. Two prompts target the same goal.
They came from different sources. Judges must be unable to tell which is which, and must judge only
substance.

GOAL BOTH PROMPTS TARGET: "${g.goal}"

--- PROMPT ONE ---
${first}

--- PROMPT TWO ---
${second}

YOUR JOB — normalise presentation ONLY. You must not change what either prompt actually asks for.
Permitted and required:
- Identical formatting for both: plain prose paragraphs, no headings, no bullets, no bold, no
  numbered lists, no code fences. If one has structure the other lacks, flatten both to prose.
- Remove provenance tells: any product/system name, any file path, any repo terminology, any
  reference to a methodology by name, any distinctive label or token that only one side would use.
- Normalise register lightly so one does not read as documentation and the other as chat — same
  person, same voice, both plausibly typed in one sitting.
- Do NOT equalise length by padding the shorter or cutting the longer. Length is substance here.
- Do NOT add, remove, or soften any instruction, bar, criterion, or requirement. Do NOT improve
  either prompt. Do NOT make them more similar in content.

Then audit your own work: list the tells you removed, and honestly list any residual tell a
knowledgeable judge could still use to identify a source — including whether either prompt is
likely to be RECOGNISED as a well-known published prompt. Recognition risk is the most important
residual tell; do not downplay it.

Return PROMPT ONE as "alpha" and PROMPT TWO as "beta", sanitized. Set blindness_ok false if you
believe a judge can still identify the sources.`,
      { label: `sanitize:${g.id}`, phase: 'Sanitize', schema: SANITIZE_SCHEMA, effort: 'high' },
    )
    if (!sanitized) return null
    return {
      id: g.id,
      goal: g.goal,
      modality: g.modality,
      alpha: sanitized.alpha,
      beta: sanitized.beta,
      // ours is alpha when not flipped
      oursIs: flip ? 'beta' : 'alpha',
      residual_tells: sanitized.residual_tells,
      blindness_ok: sanitized.blindness_ok,
      chosen_bar: ours.chosen_bar,
      their_bar_note: theirs.fidelity_note,
      our_words: ours.word_count,
      their_words: theirs.word_count,
    }
  },
)

// ---------------- Phase 4: blind judging ----------------
const JUDGE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['choice', 'confidence', 'reasoning', 'decisive_difference', 'weaknesses_of_winner', 'could_you_tell'],
  properties: {
    choice: { type: 'string', enum: ['ALPHA', 'BETA', 'TOO_CLOSE'] },
    confidence: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
    reasoning: { type: 'string' },
    decisive_difference: { type: 'string', description: 'The single difference that decided it' },
    weaknesses_of_winner: { type: 'array', items: { type: 'string' } },
    could_you_tell: { type: 'string', description: 'Could you identify either prompts origin, and on what basis? Answer honestly; this audits the blinding, and saying yes costs you nothing.' },
  },
}

const JUDGE_LENSES = [
  `OUTCOME PREDICTION. You will run exactly one of these in Claude Code with ultracode and many
   sub-agents, and you get one shot. Which produces the better FINAL ARTIFACT? Reason about what
   each prompt actually causes an agent fleet to do.`,
  `THE CRITIC'S EXECUTABILITY. For each prompt, ask whether the quality check it demands can
   actually be carried out by a fresh sub-agent in this harness. A prompt demanding an inspection
   the harness cannot perform yields confident fabricated verdicts, which is worse than no check.
   Judge on whether the verification loop would really close.`,
  `SEARCH-SPACE AND OVER-PRESCRIPTION. Prompts that specify more can narrow what the model
   explores and substitute the author's judgment for the model's. Judge which prompt leaves the
   model the most room while still supplying real directional pressure. Penalise prescription that
   buys nothing; penalise vagueness that supplies no pressure.`,
  `FAILURE MODES AND TERMINATION. Which prompt better survives contact with reality — a bar the
   agent cannot access, a critic that rationalises, a loop that never ends, budget exhaustion,
   plateau at "good for AI"? Judge which one an experienced operator would trust unattended.`,
  `THE EXPERT SNIFF TEST. You are the leading practitioner in this goal's domain. Ignore process
   theory. Which prompt would a person with your taste rather have been handed, and which
   describes a destination you actually recognise as the ceiling in your field?`,
]

const verdicts = await pipeline(
  pairs.filter(Boolean),
  async (pair) => {
    const votes = await parallel(JUDGE_LENSES.map((lens, j) => () => {
      const swap = (j % 2) === 1
      const shownAlpha = swap ? pair.beta : pair.alpha
      const shownBeta = swap ? pair.alpha : pair.beta
      return agent(
        `You are judging two candidate prompts blind. You have not been told where either came from,
and you must not speculate about provenance while deciding — decide on substance only.

THE GOAL BOTH PROMPTS TARGET
"${pair.goal}"
Domain: ${pair.modality}

--- PROMPT ALPHA ---
${shownAlpha}

--- PROMPT BETA ---
${shownBeta}

YOUR JUDGING LENS
${lens}

RULES
- Forced choice. Pick ALPHA or BETA. Use TOO_CLOSE only if you genuinely cannot separate them after
  real analysis; it is an admission of failure, not a safe answer.
- Longer is not better. Shorter is not better. Judge what each prompt CAUSES.
- Name the single decisive difference. A verdict without one is not a verdict.
- Name real weaknesses in the option you chose. Every prompt has them.
- Then answer could_you_tell honestly: could you identify either prompt's origin, and how? This
  audits whether the comparison was truly blind. Being honest here costs you nothing and protects
  the experiment.`,
        { label: `judge:${pair.id}:L${j + 1}`, phase: 'Judge', schema: JUDGE_SCHEMA, effort: 'high' },
      ).then(v => {
        if (!v) return null
        // Un-swap so the recorded choice refers to the pair's canonical alpha/beta.
        let canonical = v.choice
        if (swap && v.choice === 'ALPHA') canonical = 'BETA'
        else if (swap && v.choice === 'BETA') canonical = 'ALPHA'
        // pair.oursIs is lowercase ('alpha'/'beta'); canonical is the judge's uppercase enum.
        // Comparing them directly silently scored every verdict BASELINE.
        const winner = canonical === 'TOO_CLOSE' ? 'TOO_CLOSE' : (canonical === pair.oursIs.toUpperCase() ? 'OURS' : 'BASELINE')
        return { lens: j + 1, winner: winner, confidence: v.confidence, decisive: v.decisive_difference, could_you_tell: v.could_you_tell, weaknesses: v.weaknesses_of_winner, reasoning: v.reasoning }
      })
    }))
    const clean = votes.filter(Boolean)
    const ours = clean.filter(v => v.winner === 'OURS').length
    const base = clean.filter(v => v.winner === 'BASELINE').length
    const tie = clean.filter(v => v.winner === 'TOO_CLOSE').length
    log(`${pair.id} (${pair.modality}): OURS ${ours} — BASELINE ${base} — tie ${tie}`)
    return {
      id: pair.id,
      modality: pair.modality,
      goal: pair.goal,
      our_bar: pair.chosen_bar,
      our_words: pair.our_words,
      their_words: pair.their_words,
      blindness_ok: pair.blindness_ok,
      residual_tells: pair.residual_tells,
      tally: { ours: ours, baseline: base, tie: tie },
      votes: clean,
    }
  },
)

// ---------------- Phase 5: the real outcome build-off ----------------
phase('BuildOff')
const outcomeEmit = await agent(
  `Run THE GAUNTLET's launch-prompt generator, exactly as written, for this operator goal.

Read ${ROOT}/LAUNCH.md, ${ROOT}/CONTRACTS.md, ${ROOT}/BARS.md, ${ROOT}/INSPECTION.md and follow
them literally.

GOAL: "${OUTCOME_GOAL}"

Return the emission as plain prose paragraphs only — no headings, no bullets, no repo terminology,
no mention of this system. It must read like a person typed it in one go.`,
  { label: 'emit:OUTCOME', phase: 'BuildOff', schema: EMIT_SCHEMA, effort: 'high' },
)

const outcomeSteel = await agent(
  `Read ${BASE}. Adapt that original prompt to this goal as strongly as you can — a steelman, with
its five load-bearing properties preserved, its economy and register preserved, and the best
real-world bar you would pick. Add no structure it does not have.

GOAL: "${OUTCOME_GOAL}"

Return plain prose paragraphs only, no headings, no attribution, no mention of provenance.`,
  { label: 'steelman:OUTCOME', phase: 'BuildOff', schema: STEEL_SCHEMA, effort: 'high' },
)

let buildoff = null
if (outcomeEmit && outcomeSteel) {
  const sides = [
    { tag: 'X', dir: `${ARENA}/side-x`, prompt: outcomeEmit.emission, source: 'OURS' },
    { tag: 'Y', dir: `${ARENA}/side-y`, prompt: outcomeSteel.adaptation, source: 'BASELINE' },
  ]
  const built = await parallel(sides.map(s => () => agent(
    `You are the lead agent receiving the prompt below. Execute it to the best of your ability.

CONSTRAINTS THAT APPLY EQUALLY TO EVERY PARTICIPANT IN THIS EXERCISE
- You have ONE context. You cannot spawn sub-agents. Where the prompt asks you to fan out or to use
  a separate critic, simulate that discipline yourself as rigorously as you can: build, then
  deliberately switch into an adversarial reviewing stance against the named bar, then revise. Do
  at least two such passes.
- Write your deliverable to exactly this path: ${s.dir}/index.html
- It must be ONE self-contained HTML file. No external network requests, no CDN links, no external
  fonts or images. Inline all CSS and JS. It must render correctly opened directly from disk.
- Stop when you have done your honest best within a single context. Do not ask questions.

THE PROMPT
${s.prompt}

Return: the file path, its byte size, and three sentences on what you judge strongest and weakest
about your result.`,
    { label: `build:side-${s.tag}`, phase: 'BuildOff', effort: 'high' },
  )))

  phase('JudgeArtifacts')
  const ART_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: ['choice', 'confidence', 'decisive_difference', 'evidence', 'flaws_x', 'flaws_y', 'could_you_tell'],
    properties: {
      choice: { type: 'string', enum: ['X', 'Y', 'TOO_CLOSE'] },
      confidence: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
      decisive_difference: { type: 'string' },
      evidence: { type: 'array', items: { type: 'string' }, description: 'What you actually observed, and how you observed it' },
      flaws_x: { type: 'array', items: { type: 'string' } },
      flaws_y: { type: 'array', items: { type: 'string' } },
      could_you_tell: { type: 'string' },
    },
  }

  const ART_LENSES = [
    'VISUAL AND TYPOGRAPHIC CRAFT. Optical alignment, type scale, colour discipline, spacing rhythm, restraint. Judge as a design director would.',
    'INTERACTION AND CORRECTNESS. Actually exercise the interactive parts. Does the explanation of attention hold up technically? Is the interaction real and responsive, or decorative? Behaviour, not stills.',
    'PEDAGOGICAL POWER. Would a smart person who does not know how attention works actually understand it after two minutes? Judge the teaching, not the polish.',
  ]

  const artVotes = await parallel(ART_LENSES.map((lens, j) => () => {
    const swap = (j % 2) === 1
    const shownX = swap ? `${ARENA}/side-y/index.html` : `${ARENA}/side-x/index.html`
    const shownY = swap ? `${ARENA}/side-x/index.html` : `${ARENA}/side-y/index.html`
    return agent(
      `You are blind-judging two artifacts built for the same goal by two different processes. You do
not know which is which and must not speculate while deciding.

GOAL BOTH TARGETED: "${OUTCOME_GOAL}"

ARTIFACT X: ${shownX}
ARTIFACT Y: ${shownY}

YOUR LENS
${lens}

YOU MUST ACTUALLY INSPECT BOTH, not merely read the source. Open each in a browser and look at it.
Use the browser tools available to you: open the file with a file:// URL, read the rendered page,
take screenshots, click and drag the interactive elements, read the console for errors. A verdict
based only on reading HTML source is void for this lens — say so and inspect properly instead.
Inspect BOTH the same way, in the same viewport, so the comparison is fair.

Forced choice: X or Y. TOO_CLOSE only if genuinely inseparable after real inspection.
Cite what you actually observed as evidence, including screenshot paths or console output.
List real flaws in both. Then answer could_you_tell honestly — it audits the blinding.`,
      { label: `judge-artifact:L${j + 1}`, phase: 'JudgeArtifacts', schema: ART_SCHEMA, effort: 'high' },
    ).then(v => {
      if (!v) return null
      let canonical = v.choice
      if (swap && v.choice === 'X') canonical = 'Y'
      else if (swap && v.choice === 'Y') canonical = 'X'
      const winner = canonical === 'TOO_CLOSE' ? 'TOO_CLOSE' : (canonical === 'X' ? 'OURS' : 'BASELINE')
      return { lens: j + 1, winner: winner, confidence: v.confidence, decisive: v.decisive_difference, evidence: v.evidence, could_you_tell: v.could_you_tell }
    })
  }))
  const av = artVotes.filter(Boolean)
  buildoff = {
    goal: OUTCOME_GOAL,
    our_emission: outcomeEmit.emission,
    our_bar: outcomeEmit.chosen_bar,
    baseline_adaptation: outcomeSteel.adaptation,
    build_reports: built.filter(Boolean),
    tally: {
      ours: av.filter(v => v.winner === 'OURS').length,
      baseline: av.filter(v => v.winner === 'BASELINE').length,
      tie: av.filter(v => v.winner === 'TOO_CLOSE').length,
    },
    votes: av,
  }
  log(`BUILD-OFF: OURS ${buildoff.tally.ours} — BASELINE ${buildoff.tally.baseline} — tie ${buildoff.tally.tie}`)
}

// ---------------- Phase 6: diagnose every loss ----------------
phase('Diagnose')
const clean = verdicts.filter(Boolean)
const totals = {
  ours: clean.reduce((a, r) => a + r.tally.ours, 0),
  baseline: clean.reduce((a, r) => a + r.tally.baseline, 0),
  tie: clean.reduce((a, r) => a + r.tally.tie, 0),
}
log(`PREDICTION TOTALS — OURS ${totals.ours}, BASELINE ${totals.baseline}, TIE ${totals.tie}`)

const lost = clean.filter(r => r.tally.baseline >= r.tally.ours)
let diagnosis = null
if (lost.length > 0 || (buildoff && buildoff.tally.baseline >= buildoff.tally.ours)) {
  diagnosis = await agent(
    `Our system's emitted launch prompts lost or tied against the baseline in at least one blind
comparison. Diagnose WHY, and locate the cause in our source files so it can be fixed.

Read ${ROOT}/LAUNCH.md, ${ROOT}/CONTRACTS.md, ${ROOT}/BARS.md, ${ROOT}/INSPECTION.md and ${BASE}.

THE LOSSES AND TIES, with the judges' stated decisive differences:
${JSON.stringify(lost.map(r => ({ id: r.id, modality: r.modality, tally: r.tally, decisive: r.votes.map(v => ({ winner: v.winner, decisive: v.decisive })) })), null, 2)}

${buildoff ? 'BUILD-OFF RESULT:\n' + JSON.stringify({ tally: buildoff.tally, votes: buildoff.votes.map(v => ({ winner: v.winner, decisive: v.decisive })) }, null, 2) : 'No build-off result.'}

For each loss or tie, answer:
1. Which specific instruction, template line, or rule in OUR files produced the weaker emission?
   Cite file:line.
2. Is the root cause bar selection, modality routing, the emission template, prescription creep,
   or word-ceiling pressure squeezing out something load-bearing?
3. The exact edit that fixes it — quote the current text and the replacement.
4. Is there a case for the baseline simply being better on this dimension, meaning we should adopt
   its approach rather than patch ours? Say so plainly if true. Do not defend our system.

Then step back: is there a PATTERN across the losses that indicates a structural flaw rather than
local bugs? Answer directly, and if the honest answer is that our added machinery is hurting more
than helping in some domain, say exactly that and name the domain.`,
    { label: 'diagnose', phase: 'Diagnose', effort: 'high' },
  )
}

return {
  prediction_totals: totals,
  per_goal: clean.map(r => ({
    id: r.id,
    modality: r.modality,
    tally: r.tally,
    our_bar: r.our_bar,
    words: { ours: r.our_words, baseline: r.their_words },
    blindness_ok: r.blindness_ok,
    residual_tells: r.residual_tells,
    decisive_differences: r.votes.map(v => ({ lens: v.lens, winner: v.winner, decisive: v.decisive })),
    blindness_audit: r.votes.map(v => v.could_you_tell),
  })),
  buildoff: buildoff,
  diagnosis: diagnosis,
}
