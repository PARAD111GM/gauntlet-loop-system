export const meta = {
  name: 'gauntlet-redteam-coherence',
  description: 'The passes wave 2A never reached: three red-team adversaries, one integration critic, one readiness verdict',
  phases: [
    { title: 'RedTeam' },
    { title: 'Coherence' },
    { title: 'Readiness' },
  ],
}

const ROOT = (typeof args === 'string' && args) ? args : '/Users/Nathan/Code/gauntlet-loop-system'
const BRIEF = `${ROOT}/reference/BUILD-BRIEF.md`
const BASE = `${ROOT}/reference/baseline-gauntlet-prompt.md`
const CONTRACTS = `${ROOT}/CONTRACTS.md`

phase('RedTeam')
const RED_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['findings', 'worst_finding', 'system_survives'],
  properties: {
    findings: {
      type: 'array',
      maxItems: 12,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['attack', 'permitting_text', 'outcome', 'fix_needed'],
        properties: {
          attack: { type: 'string' },
          permitting_text: { type: 'string', description: 'file:line plus the quoted passage that allows it' },
          outcome: { type: 'string', enum: ['SYSTEM_HELD', 'SYSTEM_BROKE'] },
          fix_needed: { type: 'string' },
        },
      },
    },
    worst_finding: { type: 'string' },
    system_survives: { type: 'boolean' },
  },
}

const ANGLES = [
  `DOMAIN COVERAGE. Find goals where this system fails. Try: goals with no external bar; pure-taste
   goals; goals spanning several modalities at once; goals whose best-in-class reference is
   proprietary and cannot be opened; goals where the best-in-class artifact is WORSE than what the
   operator actually needs; novel or regulated domains with no incumbent. Walk the system as
   written for each — LAUNCH.md's bar interrogation, BARS.md's library, CONTRACTS C5's matrix — and
   show exactly which step breaks and what the operator is left holding.`,
  `JUDGMENT MACHINERY. Attack the critic. Find concrete ways a critic here is captured, fooled, or
   laundered into passing bad work: the builder signalling through the artifact itself; the critic
   inferring which side is "ours" from formatting, filenames, or paths; bar drift between rounds;
   evidence that looks like evidence but proves nothing; surface mimicry passing as quality; the
   same model playing builder and critic. Quote the exact text that permits each. Then attack the
   C2 stop rule specifically: at a panel of 5, construct the run that stops too early and the run
   that never stops.`,
  `OPERABILITY AND TRUTH. Hunt every invented tool, wrong model name, non-existent Claude Code
   feature, unrunnable snippet, and unresolvable path — and VERIFY by actually running the commands
   and globbing the paths you can. CONTRACTS C5.2 lists the media and measurement binaries verified
   present; check every media/measurement claim in every file against that list. Then attack
   economics: construct the run that blows the budget while obeying every rule as written.`,
]

const red = (await parallel(ANGLES.map((angle, i) => () => agent(
  `You are a red-team adversary trying to BREAK this master prompting system.

Read ${BRIEF}, ${BASE}, ${CONTRACTS}, and every .md under ${ROOT} and ${ROOT}/install (Glob, then Read).
Note that ${ROOT}/reference/ holds superseded history — CONTRACTS-v1-overbuilt.md is a DEAD file kept
for audit. Do not report findings against it; report only against the live system.

YOUR ATTACK ANGLE
${angle}

Every finding must quote the exact passage that permits it, with file:line. A finding I cannot
locate is a finding you invented, and inventing is worse than missing. Report only ways the system
produces WORSE OUTPUT or FALSE CONFIDENCE in the real world — not style opinions. Rank your findings
and make the worst one unmissable. Where the system HELD against your attack, say so: a red team
that reports only breaks is not calibrated and I will discount it.`,
  { label: `redteam:${i + 1}`, phase: 'RedTeam', schema: RED_SCHEMA, effort: 'high' },
)))).filter(Boolean)

log(`Red team: ${red.reduce((a, r) => a + (r.findings || []).filter(f => f.outcome === 'SYSTEM_BROKE').length, 0)} breaks, ${red.reduce((a, r) => a + (r.findings || []).filter(f => f.outcome === 'SYSTEM_HELD').length, 0)} holds`)

phase('Coherence')
const coherence = await agent(
  `You are the integration critic. Individual files passed their own gates; judge the SYSTEM as one
artifact. Read ${BRIEF}, ${BASE}, ${CONTRACTS}, and every .md under ${ROOT} and ${ROOT}/install.
${ROOT}/reference/ is superseded history — read it for context, judge only the live system.

Report, citing file and section for everything:
1. RESIDUAL CONTRADICTIONS after the v2 contract freeze. Quote both sides.
2. DUPLICATION: the same guidance in several files. Name the owner, name the copies to cut.
3. GAPS: something the system needs that no file owns.
4. THE GOLDEN PATH: trace one operator end to end from a raw goal — README, LAUNCH, BARS,
   INSPECTION, ROLES, OPERATIONS, CONTRACTS — and report every point where they get stuck, guess,
   or must open a file nothing pointed them to. Give the step number for each.
5. TERMINOLOGY DRIFT: one concept under several names.
6. SELF-CONSISTENCY: the system's own thesis is that length and prescription are liabilities. Does
   the system obey it? Give a direct verdict with the total line count as evidence, and name any
   file that violates the doctrine it teaches.
7. WEAKEST FILE, named, with the reason.

Be concrete enough that a fixer can act without re-deriving your analysis.`,
  { label: 'coherence', phase: 'Coherence', effort: 'high' },
)

phase('Readiness')
const READY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['ship_verdict', 'must_fix_before_ship', 'honest_summary', 'beats_baseline'],
  properties: {
    ship_verdict: { type: 'string', enum: ['SHIP', 'FIX_FIRST', 'STRUCTURAL_PROBLEM'] },
    must_fix_before_ship: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['what', 'file', 'why'],
        properties: { what: { type: 'string' }, file: { type: 'string' }, why: { type: 'string' } },
      },
    },
    honest_summary: { type: 'string', description: 'What this system genuinely adds over the baseline prompt, and what it does not. No marketing.' },
    beats_baseline: { type: 'string', enum: ['YES', 'NO', 'ONLY_IN_SOME_DOMAINS', 'UNPROVEN'] },
  },
}

const readiness = await agent(
  `You are giving the final honest verdict on whether this system is ready to be used and shared.

Read ${CONTRACTS}, ${BASE}, and every .md under ${ROOT} and ${ROOT}/install.

Here is what three red-team adversaries just found:
${JSON.stringify(red, null, 2)}

Here is what the integration critic found:
${coherence}

Deliver:
1. SHIP VERDICT. SHIP, FIX_FIRST, or STRUCTURAL_PROBLEM.
2. The ordered must-fix list, if any.
3. An HONEST SUMMARY of what this system genuinely adds over the raw baseline prompt and what it
   does not. No marketing language. If the honest answer is that most of its value sits in two
   things — bar selection and modality-matched inspection — say exactly that.
4. BEATS_BASELINE. Answer UNPROVEN unless you can point to evidence in this repo that a blind
   comparison was actually run and won. CONTRACTS C5.6 forbids claiming the baseline has been
   beaten without it. Check whether such evidence exists before answering; do not assume.

You are the last gate. Be the person who tells the truth about the work rather than the person who
signs off on it.`,
  { label: 'readiness', phase: 'Readiness', schema: READY_SCHEMA, effort: 'high' },
)

return { redteam: red, coherence: coherence, readiness: readiness }
