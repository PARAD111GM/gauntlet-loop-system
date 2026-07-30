export const meta = {
  name: 'gauntlet-wave2-contract-freeze',
  description: 'Wave 2A-C: freeze the shared contracts, conform all 10 files, re-gate with hostile critics, then red-team and coherence',
  phases: [
    { title: 'Archaeology' },
    { title: 'Freeze' },
    { title: 'FreezeGate' },
    { title: 'Conform' },
    { title: 'Regate' },
    { title: 'Repair' },
    { title: 'RedTeam' },
    { title: 'Coherence' },
  ],
}

const ROOT = (typeof args === 'string' && args) ? args : '/Users/Nathan/Code/gauntlet-loop-system'
const BRIEF = `${ROOT}/reference/BUILD-BRIEF.md`
const BASE = `${ROOT}/reference/baseline-gauntlet-prompt.md`
const VERDICTS = `${ROOT}/reference/WAVE1-VERDICTS.md`
const LEDGER = `${ROOT}/reference/CONFLICT-LEDGER.md`
const CONTRACTS = `${ROOT}/CONTRACTS.md`

const FILES = [
  { key: 'README', file: `${ROOT}/README.md`, cap: 180 },
  { key: 'DOCTRINE', file: `${ROOT}/DOCTRINE.md`, cap: 400 },
  { key: 'LAUNCH', file: `${ROOT}/LAUNCH.md`, cap: 360 },
  { key: 'BARS', file: `${ROOT}/BARS.md`, cap: 470 },
  { key: 'ROLES', file: `${ROOT}/ROLES.md`, cap: 400 },
  { key: 'INSPECTION', file: `${ROOT}/INSPECTION.md`, cap: 420 },
  { key: 'FAILURE-MODES', file: `${ROOT}/FAILURE-MODES.md`, cap: 400 },
  { key: 'OPERATIONS', file: `${ROOT}/OPERATIONS.md`, cap: 420 },
  { key: 'EXAMPLES', file: `${ROOT}/EXAMPLES.md`, cap: 450 },
  { key: 'INSTALL', file: `${ROOT}/install/SKILL.md`, cap: 200 },
]

const CANON = `THE FOUR-PLUS-ONE FROZEN CONTRACTS — these and only these live in ${CONTRACTS}:
  C1. THE CRITIC VERDICT SCHEMA. One JSON schema. Every file that mentions a verdict field must
      reference C1, never restate it.
  C2. THE STOP RULE. Exactly ONE rule, mechanically applicable by a human or a script using only
      data the harness actually produces. It must be consistent with what OPERATIONS.md can really
      run. No statistic that nothing in the repo computes. Name the normal exit honestly.
  C3. THE PATH LAYOUT. Canonical repo paths, the evidence/artifact directory layout, and how paths
      resolve from the installed-skill location (the wave-1 critics found every ../ path in
      install/SKILL.md resolves wrong).
  C4. THE EMISSION BUDGET. The launch prompt word ceiling and the STOP-token budget, as ONE number
      each (wave-1 found install/SKILL.md and LAUNCH.md disagreeing by 40x).
  C5. THE MODALITY CAPABILITY MATRIX. For each modality (static visual, interactive UI, real-time
      3D, motion, API, data, performance, prose, AUDIO/VOICE, mobile, CLI, agent systems): what a
      critic in this harness CAN actually inspect, with the real tool that does it, and what it
      CANNOT. This is the permanent fix for the deaf-critic bug: LAUNCH.md ordered critics to
      blind-compare recordings while INSPECTION.md says "the critic cannot hear." Any modality the
      matrix marks unavailable must be either removed from the product or routed to a named proxy
      whose weaker evidential status is stated. Decide which, and make the matrix normative.`

const READ_ALL = `MANDATORY READING before you write anything:
- ${BRIEF} (house style, hard-won lessons)
- ${BASE} (the baseline we must beat, and why it works)
- ${VERDICTS} (what the wave-1 critics found)
- every .md in ${ROOT} and ${ROOT}/install (use Glob, then Read them)`

// ---------- Phase 1: archaeology ----------
phase('Archaeology')
const LEDGER_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['conflicts', 'restatement_sites', 'recommendation'],
  properties: {
    conflicts: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['topic', 'sides', 'severity', 'resolution_needed'],
        properties: {
          topic: { type: 'string' },
          sides: { type: 'array', items: { type: 'string' } },
          severity: { type: 'string', enum: ['BLOCKER', 'MAJOR', 'MINOR'] },
          resolution_needed: { type: 'string' },
        },
      },
    },
    restatement_sites: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['contract', 'file', 'what_to_do'],
        properties: {
          contract: { type: 'string', enum: ['C1_SCHEMA', 'C2_STOP_RULE', 'C3_PATHS', 'C4_BUDGET', 'C5_MODALITY'] },
          file: { type: 'string' },
          what_to_do: { type: 'string', enum: ['CUT_AND_REFERENCE', 'KEEP_AS_OWNER', 'REWRITE_TO_MATCH'] },
        },
      },
    },
    recommendation: { type: 'string' },
  },
}

const ledger = await agent(
  `You are a contract archaeologist. This repo has ten documentation files that each restate the
same shared contracts in their own words, and they have drifted apart. Your job is to produce the
complete, exhaustive ledger of that drift so an author can freeze one canonical version.

${READ_ALL}

${CANON}

FIND, with file:line citations for every side:
1. Every place any of C1-C5 is stated, defined, implied, or depended on. Be exhaustive — a missed
   site becomes a bug that survives the freeze.
2. Every pairwise CONTRADICTION between those statements. Quote both sides. The wave-1 critics
   already found several (README's promised exit vs LAUNCH section 2 vs OPERATIONS section 5;
   DOCTRINE's statistical termination vs OPERATIONS:197,210-217; INSPECTION's verdict contract vs
   ROLES; FAILURE-MODES F20 vs BARS bar-escalation; install/SKILL.md paths and STOP arithmetic;
   LAUNCH STEP 2b audio vs INSPECTION section 9 "the critic cannot hear"). Verify each of those
   actually exists at the cited location, correct the citation if wrong, then find the ones nobody
   has found yet.
3. Every claim about the Claude Code harness that is FALSE or invented — wrong tool name, wrong
   model name, a feature that does not exist, an unrunnable snippet, a path that cannot resolve.
4. Self-referential failures: any rule in any file that, applied to this repo's own artifacts,
   would wrongly condemn correct output. Wave 1 flagged one ("the noun test condemns the product's
   own emissions"). Find the rest.

Then write your full findings to ${LEDGER} as a readable markdown ledger organised by contract,
with a section per conflict showing both sides and your recommended resolution. Also return the
structured summary.

Be exhaustive and precise. Citations that do not resolve are worse than useless — verify each one
by reading the actual line.`,
  { label: 'archaeology', phase: 'Archaeology', schema: LEDGER_SCHEMA, effort: 'high' },
)

log(`Ledger: ${(ledger && ledger.conflicts ? ledger.conflicts.length : 0)} conflicts, ${(ledger && ledger.restatement_sites ? ledger.restatement_sites.length : 0)} restatement sites`)

// ---------- Phase 2: freeze ----------
phase('Freeze')
await agent(
  `You are the authority who freezes the shared contracts for this system. Your output becomes
normative: nine other agents will conform their files to it, and disagreement with you will be
treated as their bug.

${READ_ALL}
- and ${LEDGER} (the conflict ledger just produced — this is your work order)

${CANON}

WRITE ${CONTRACTS}. Requirements:
- Resolve EVERY conflict in the ledger. For each, pick one answer and state it as law. Where the
  ledger recommends something, you may overrule it, but say why in one line.
- C2 in particular: wave 1 died on this. Produce ONE stop rule an operator can apply mechanically
  from data the harness really produces. If the honest answer is that the normal exit is
  marginal-gain collapse rather than beating the bar, say that plainly — the system's credibility
  depends on not overselling the exit. Do not invent statistics the repo cannot compute.
- C5: decide, per modality, REMOVE or PROXY. For every PROXY, name the real tool and state the
  evidential downgrade in one sentence. Audio/voice is the known offender — settle it.
- This file is a contract, not an essay. Tables, schemas, and numbered laws. Under 260 lines.
- Every law must be checkable: a reader must be able to look at a file and say "this conforms" or
  "this does not."
- Add a short OWNERSHIP TABLE: for each contract, which file is the owner and which files are
  merely allowed to reference it.
- Never invent a tool, API, model name, or Claude Code feature. If the harness cannot do
  something, the contract must say so rather than wish it.

Return: the path, the line count, and a numbered list of the rulings you made (one line each), so
downstream agents have a changelog.`,
  { label: 'freeze:author', phase: 'Freeze', effort: 'high' },
)

// ---------- Phase 3: gate the contract itself ----------
phase('FreezeGate')
const FREEZE_GATE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'unresolved_conflicts', 'uncheckable_laws', 'harness_lies', 'largest_gap'],
  properties: {
    verdict: { type: 'string', enum: ['PASS', 'FAIL'] },
    unresolved_conflicts: { type: 'array', items: { type: 'string' } },
    uncheckable_laws: { type: 'array', items: { type: 'string' } },
    harness_lies: { type: 'array', items: { type: 'string' } },
    largest_gap: { type: 'string' },
    fixes: { type: 'array', items: { type: 'string' } },
  },
}

let freezeVerdict = null
for (let r = 1; r <= 2; r++) {
  freezeVerdict = await agent(
    `You are a hostile fresh-context critic reviewing the frozen contract file that nine other
agents are about to conform to. If it is wrong, every downstream file inherits the error, so you
are the highest-leverage gate in this run.

Read ${CONTRACTS}, ${LEDGER}, ${BRIEF}, and every .md in ${ROOT} and ${ROOT}/install.

CHECK, in this order:
1. UNRESOLVED: every conflict in ${LEDGER} that ${CONTRACTS} does not actually settle, or settles
   ambiguously enough that two conformers would read it differently. Ambiguity here is a BLOCKER.
2. UNCHECKABLE: every "law" a reader cannot mechanically verify a file against. A contract nobody
   can check is decoration.
3. HARNESS LIES: any invented tool, wrong model name, non-existent Claude Code feature, unrunnable
   snippet, or path that will not resolve. Verify path claims by actually testing them (ls / Glob).
4. C2 SANITY: is the stop rule genuinely computable from data the harness produces? Walk it through
   one concrete hypothetical run and confirm a human could execute it without inventing numbers.
5. C5 SANITY: does the modality matrix match reality? Specifically confirm the audio ruling is
   consistent and that no modality is promised elsewhere in the repo that the matrix denies.
6. SELF-CONSISTENCY: does the contract obey the system's own doctrine (minimal, no prescription
   creep, under 260 lines)?

Default to FAIL. Cite file:line for everything. Do not invent findings — a citation I cannot
resolve discredits your whole verdict.`,
    { label: `freeze:gate:r${r}`, phase: 'FreezeGate', schema: FREEZE_GATE_SCHEMA, effort: 'high' },
  )
  if (freezeVerdict && freezeVerdict.verdict === 'PASS') { log(`CONTRACTS.md passed on round ${r}`); break }
  log(`CONTRACTS.md round ${r} FAIL: ${freezeVerdict ? freezeVerdict.largest_gap : 'critic died'}`)
  if (r === 2) break
  await agent(
    `Revise ${CONTRACTS} to close these gaps found by an independent critic. Read the file and
${LEDGER} first. Verdict:
${JSON.stringify(freezeVerdict, null, 2)}

Fix every unresolved conflict, make every uncheckable law checkable or cut it, and correct every
harness lie. Prefer cutting to adding — this file must stay under 260 lines. Return the path, new
line count, and what you changed.`,
    { label: 'freeze:revise', phase: 'Freeze' },
  )
}

// ---------- Phase 4+5: conform, then re-gate ----------
const REGATE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'forced_choice', 'contract_violations', 'largest_gap', 'gaps', 'ship_test'],
  properties: {
    verdict: { type: 'string', enum: ['PASS', 'FAIL'] },
    forced_choice: { type: 'string', enum: ['THIS_FILE_WINS', 'BASELINE_ALONE_WINS', 'TOO_CLOSE_TO_CALL'] },
    contract_violations: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['contract', 'site', 'violation'],
        properties: {
          contract: { type: 'string' },
          site: { type: 'string' },
          violation: { type: 'string' },
        },
      },
    },
    largest_gap: { type: 'string' },
    gaps: {
      type: 'array',
      maxItems: 10,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['severity', 'what', 'concrete_fix'],
        properties: {
          severity: { type: 'string', enum: ['BLOCKER', 'MAJOR', 'MINOR'] },
          what: { type: 'string' },
          concrete_fix: { type: 'string' },
        },
      },
    },
    ship_test: { type: 'string' },
    padding_found: { type: 'array', items: { type: 'string' } },
  },
}

function conformPrompt(f) {
  return `You are conforming ONE file to the newly frozen system contracts, and fixing the specific
gaps an independent critic already found in it.

${READ_ALL}
- ${CONTRACTS} — NORMATIVE. It outranks your file. Disagreement with it is your bug, not its.
- ${LEDGER} — the drift ledger; find every entry naming your file.

YOUR FILE (edit in place, you own it exclusively): ${f.file}

DO, in this order:
1. CONFORM. For every place your file restates a frozen contract (C1 verdict schema, C2 stop rule,
   C3 paths, C4 emission/STOP budget, C5 modality capability), CUT the restatement and reference
   ${CONTRACTS} instead — unless the ownership table in ${CONTRACTS} names your file as the owner,
   in which case make your statement match the contract exactly. Zero divergent restatements may
   survive. This is the primary job.
2. FIX YOUR WAVE-1 GAPS. Read the section for your file in ${VERDICTS} and fix the largest_gap and
   every BLOCKER/MAJOR listed. These are real, located, and verified.
3. MODALITY TRUTH. Delete or re-route any instruction that tells a critic to inspect something the
   C5 matrix says the harness cannot inspect. Audio is the known case; check for others.
4. SELF-TEST. Apply your own file's rules to this repo's own artifacts. If a rule you wrote would
   wrongly condemn our own correct output, the rule is broken — fix the rule.
5. TRIM. Your file must end at or under ${f.cap} lines. Cut padding, not substance. Deleting is as
   valuable as adding; the system's thesis is that volume is a liability. Do not answer criticism
   by getting longer.

RULES
- Never invent a tool, API, model name, or Claude Code feature.
- Do not edit any file other than ${f.file}.
- A hostile fresh-context critic will re-gate this and will check contract conformance
  mechanically. Write for that adversary.

Return ONLY: path, new line count, contracts conformed, wave-1 gaps fixed, anything you declined
and why.`
}

function regatePrompt(f, round) {
  return `You are a hostile, fresh-context critic. You did not write this file and cannot see the
author's reasoning.

Round ${round} re-gate of: ${f.file}

Read: ${BRIEF}, ${BASE}, ${CONTRACTS}, ${VERDICTS}, ${f.file}, and the sibling .md files in
${ROOT} and ${ROOT}/install.

GATE CRITERIA — all must hold for PASS:
1. CONTRACT CONFORMANCE. Zero divergent restatements of C1-C5. Where the file references
   ${CONTRACTS}, the reference must be correct and the path must resolve. Where the ownership table
   in ${CONTRACTS} names this file as owner, its statement must match the contract exactly.
   Any divergence is a BLOCKER — this is what wave 1 died on.
2. WAVE-1 GAPS CLOSED. Read this file's section in ${VERDICTS}. Every BLOCKER and MAJOR must be
   genuinely fixed, not paraphrased away.
3. MODALITY TRUTH. No instruction to inspect what C5 says the harness cannot inspect.
4. NO HARNESS LIES. Invented tools, wrong model names, non-existent features, unrunnable
   snippets, unresolvable paths — each is an automatic BLOCKER. Verify paths by testing them.
5. THE FORCED CHOICE. Would an expert operator get better real output from this file, or from just
   the raw baseline prompt (${BASE}) plus their own judgment? Anything other than THIS_FILE_WINS
   means the file is not earning its existence.
6. SHIP TEST. Would a top practitioner in this domain put their name on it?
7. LENGTH AND PADDING. At or under ${f.cap} lines. List every line a reader cannot act on.
8. SELF-CONSISTENCY. A file that violates the doctrine it teaches is a BLOCKER.

CALIBRATION: default to FAIL. PASS only if you would be genuinely impressed receiving this from a
senior specialist you were paying well. "Solid" and "comprehensive" mean FAIL. Never soften a FAIL
into a caveated PASS. But do not manufacture objections on a file that clears the bar — padding a
gap list on excellent work wastes a round. Cite located evidence for every gap.`
}

async function conformAndGate(f) {
  await agent(conformPrompt(f), { label: `conform:${f.key}`, phase: 'Conform' })
  let v = null
  const history = []
  for (let round = 1; round <= 2; round++) {
    v = await agent(regatePrompt(f, round), {
      label: `regate:${f.key}:r${round}`, phase: 'Regate', schema: REGATE_SCHEMA, effort: 'high',
    })
    if (!v) { history.push({ round: round, verdict: 'CRITIC_DIED' }); continue }
    const violations = v.contract_violations || []
    const gaps = v.gaps || []
    history.push({
      round: round,
      verdict: v.verdict,
      forced_choice: v.forced_choice,
      violations: violations.length,
      blockers: gaps.filter(g => g.severity === 'BLOCKER').length,
      largest_gap: v.largest_gap,
    })
    if (v.verdict === 'PASS' && v.forced_choice === 'THIS_FILE_WINS' && violations.length === 0) {
      log(`${f.key}: PASS on regate round ${round}`)
      return { key: f.key, passed: true, rounds: round, history: history }
    }
    log(`${f.key}: regate r${round} ${v.verdict} (${violations.length} contract violations) — ${v.largest_gap}`)
    if (round === 2) break
    await agent(
      `Repair ${f.file} against this independent critic verdict. Read ${f.file} and ${CONTRACTS}
first — ${CONTRACTS} is normative.

${JSON.stringify(v, null, 2)}

Fix every contract_violation and every BLOCKER/MAJOR. Delete everything in padding_found. Stay at
or under ${f.cap} lines — get shorter if you can. If forced_choice was not THIS_FILE_WINS, the file
has an existential problem: restructure around the unique leverage it actually provides, or cut it
to just that part. You may decline a gap only with stated evidence. Never invent harness features.
Return: path, new line count, what you fixed, what you declined and why.`,
      { label: `repair:${f.key}:r${round}`, phase: 'Repair' },
    )
  }
  return { key: f.key, passed: false, rounds: 2, history: history, final: v }
}

log('Conforming and re-gating 10 files against the frozen contracts.')
const conformedRaw = await parallel(FILES.map(f => () => conformAndGate(f)))
const conformed = conformedRaw.filter(Boolean)
log(`Re-gate complete. Passed: ${conformed.filter(r => r.passed).length}/${conformed.length}`)

// ---------- Phase 6: red team (needs the whole conformed tree) ----------
phase('RedTeam')
const RED_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['findings', 'worst_finding', 'system_survives'],
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['attack', 'permitting_text', 'outcome', 'fix_needed'],
        properties: {
          attack: { type: 'string' },
          permitting_text: { type: 'string' },
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
  `DOMAIN COVERAGE. Find goals where this system fails: goals with no external bar, pure-taste
   goals, multi-modality goals, goals whose best-in-class reference is proprietary and unopenable,
   goals where best-in-class is WORSE than what the operator needs, and regulated/novel domains
   with no incumbent. Walk the system as written for each and show exactly where it breaks.`,
  `JUDGMENT MACHINERY. Attack the critic. Find concrete ways a critic here gets captured, fooled,
   or laundered into passing bad work: the builder signalling through the artifact itself, the
   critic inferring which side is "ours" from formatting/filenames/paths, bar drift between rounds,
   evidence that looks like evidence but proves nothing, surface mimicry passing as quality, and
   collusion when the same model plays both roles. Quote the exact text permitting each.`,
  `OPERABILITY AND TRUTH. Hunt every invented tool, wrong model name, non-existent Claude Code
   feature, unrunnable snippet, and unresolvable path — VERIFY by actually running/globbing the
   paths and commands you can. Then attack economics: construct the run that blows the budget or
   never terminates while obeying every rule as written, including the new C2 stop rule.`,
]

const redRaw = await parallel(RED_ANGLES.map((angle, i) => () => agent(
  `You are a red-team adversary trying to BREAK this master prompting system.

Read ${BRIEF}, ${BASE}, ${CONTRACTS}, and every .md under ${ROOT} (Glob then Read).

YOUR ATTACK ANGLE
${angle}

Every finding must quote the exact passage that permits it, with file:line. A finding I cannot
locate is a finding you invented, which is worse than missing one. Report only ways the system
produces WORSE OUTPUT or FALSE CONFIDENCE in the real world — not style opinions. Rank findings
and make the worst one unmissable. Where the system HELD against your attack, say so; a red team
that reports only breaks is not calibrated.`,
  { label: `redteam:${i + 1}`, phase: 'RedTeam', schema: RED_SCHEMA, effort: 'high' },
)))
const red = redRaw.filter(Boolean)

// ---------- Phase 7: coherence ----------
phase('Coherence')
const coherence = await agent(
  `You are the integration critic. Individual files passed their own gates; judge the SYSTEM as one
artifact. Read ${BRIEF}, ${BASE}, ${CONTRACTS}, ${LEDGER}, and every .md under ${ROOT}.

Report on:
1. RESIDUAL CONTRADICTIONS after the contract freeze. Quote both sides with file:line.
2. DUPLICATION: same guidance in several files — name the owner, name the copies to cut.
3. GAPS: something the system needs that no file owns.
4. THE GOLDEN PATH: trace one operator end to end from a raw goal — README, LAUNCH, BARS,
   INSPECTION, ROLES, OPERATIONS, CONTRACTS — and report every point where they get stuck, guess,
   or must open a file nothing pointed them to. Be specific about the step number.
5. TERMINOLOGY DRIFT: one concept, several names.
6. SELF-CONSISTENCY: does the system obey its own doctrine that length and prescription are
   liabilities? Give a direct verdict with the total line count as evidence.
7. WEAKEST FILE, named, with the reason.
8. READINESS: is this ready for the blind A/B tournament against the baseline prompt? If not, the
   ordered list of what must be fixed first.

Cite file and section for everything. Be concrete enough that a fixer can act without re-deriving.`,
  { label: 'coherence', phase: 'Coherence', effort: 'high' },
)

return {
  ledger: {
    conflicts: (ledger && ledger.conflicts ? ledger.conflicts.length : 0),
    sites: (ledger && ledger.restatement_sites ? ledger.restatement_sites.length : 0),
  },
  contracts_gate: freezeVerdict,
  files: conformed.map(r => ({ key: r.key, passed: r.passed, rounds: r.rounds, history: r.history })),
  still_failing: conformed.filter(r => !r.passed).map(r => ({ key: r.key, final: r.final })),
  redteam: red,
  coherence: coherence,
}
