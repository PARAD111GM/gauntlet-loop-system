export const meta = {
  name: 'gauntlet-conform-v2',
  description: 'Conform all 10 files to CONTRACTS v2, purge v1 machinery, re-gate each with a hostile fresh-context critic',
  phases: [
    { title: 'Conform' },
    { title: 'Regate' },
    { title: 'Repair' },
  ],
}

const ROOT = (typeof args === 'string' && args) ? args : '/Users/Nathan/Code/gauntlet-loop-system'
const BRIEF = `${ROOT}/reference/BUILD-BRIEF.md`
const BASE = `${ROOT}/reference/baseline-gauntlet-prompt.md`
const VERDICTS = `${ROOT}/reference/WAVE1-VERDICTS.md`
const LEDGER = `${ROOT}/reference/CONFLICT-LEDGER.md`
const CONTRACTS = `${ROOT}/CONTRACTS.md`

const FILES = [
  { key: 'README', file: `${ROOT}/README.md`, cap: 180, v1: true },
  { key: 'DOCTRINE', file: `${ROOT}/DOCTRINE.md`, cap: 400, v1: false },
  { key: 'LAUNCH', file: `${ROOT}/LAUNCH.md`, cap: 360, v1: true },
  { key: 'BARS', file: `${ROOT}/BARS.md`, cap: 470, v1: false },
  { key: 'ROLES', file: `${ROOT}/ROLES.md`, cap: 400, v1: false },
  { key: 'INSPECTION', file: `${ROOT}/INSPECTION.md`, cap: 420, v1: true },
  { key: 'FAILURE-MODES', file: `${ROOT}/FAILURE-MODES.md`, cap: 400, v1: false },
  { key: 'OPERATIONS', file: `${ROOT}/OPERATIONS.md`, cap: 420, v1: true },
  { key: 'EXAMPLES', file: `${ROOT}/EXAMPLES.md`, cap: 450, v1: false },
  { key: 'INSTALL', file: `${ROOT}/install/SKILL.md`, cap: 200, v1: true },
]

const V1_PURGE = `PURGE LIST — v1 machinery that is now VOID. Delete it wherever it appears in your
file. Do NOT translate it into v2 terms; DELETE it and reference ${CONTRACTS} instead:
  - Wilson score intervals, \`band(k,n)\`, confidence intervals on win rates, "pooled" panels
  - \`MIE\`, \`alpha\`, one-tailed tests, binomial tables, p-values, any statistical threshold
  - \`CROSS = {10:9, 15:12, 20:15, 30:20}\`, \`GAIN = {5:5, 7:6, 9:7}\`, any k-of-n lookup table
    other than v2's "4 or 5 of 5"
  - reserve judges, judge ordinals \`j01…jNN\` used as a scoring mechanism, panels of 9/10/15/20/30
  - 19 judges per round, 25 agents per round, 800_000 output tokens per round, 150 agent-runs
  - \`rounds_without_gap_movement\`, \`locator_floor\`, \`access_path\`, \`recipe_class\`,
    \`budget_checks\` as a required field, \`order_swap\`
  - the two-tier "definition vs mention" conformance test — v2 has ONE test
Any of these surviving in your file is an automatic BLOCKER at re-gate. A grep will be run.`

function conformPrompt(f) {
  return `You are conforming ONE file to CONTRACTS **v2**, which was frozen minutes ago and replaces v1.

READ FIRST, in full:
- ${CONTRACTS} — NORMATIVE, v2. It outranks your file. Disagreement with it is your bug.
- ${BRIEF} — house style, hard-won lessons
- ${BASE} — the baseline we must beat, and why it works
- ${VERDICTS} — what the wave-1 critics found in YOUR file specifically
- ${f.file} — your file, in full
- the sibling .md files in ${ROOT} and ${ROOT}/install, so you compose instead of duplicating

WHY v2 EXISTS — this is the point of the whole pass. v1 built a statistical governance apparatus
(Wilson intervals, 10-to-30-judge panels, reserve judges, pooled bands) that priced a minimum run
at 25 agents and ~800k output tokens per round, and it still failed its own hostile gate on four
BLOCKERs including an arithmetically unreachable branch. v2 keeps every load-bearing idea and
deletes the apparatus: panels of 5, count on your fingers, 15 agents and 250k output tokens per
round. The governing lesson, which this system teaches and then violated: **machinery is a
liability, and so is length.**

YOUR FILE (edit in place, you own it exclusively): ${f.file}
${f.v1 ? `\n*** WARNING: your file was already conformed to v1 earlier today. It very likely contains
v1 machinery that is now void. Purging it is your FIRST job. ***\n` : ''}
${V1_PURGE}

DO, in this order:
1. PURGE v1 machinery per the list above.
2. CONFORM to v2. Wherever your file *defines* a schema field, a stop threshold, a run path, a
   ceiling, or a modality capability, cut the definition and reference ${CONTRACTS} — unless the
   ownership table in ${CONTRACTS} names your file as that contract's implementation, in which case
   your statement must match v2 exactly. One conformance test, stated once in v2: referencing is
   legal, copying a definition is not.
3. FIX YOUR WAVE-1 GAPS. Read your file's section in ${VERDICTS}. Fix the largest_gap and every
   BLOCKER and MAJOR. These were located and verified by an independent critic.
4. MODALITY TRUTH. Delete or re-route any instruction telling a critic to inspect what v2's C5
   matrix says this harness cannot inspect. Audio (the deaf-critic defect) is the known case; also
   check motion without a time hook, perceived latency, sustained load, and read-aloud.
5. SELF-TEST. Apply your own file's rules to this repo's own artifacts. If a rule you wrote would
   wrongly condemn our own correct output, the rule is broken — fix the rule, not the output.
6. TRIM to ${f.cap} lines or fewer. Cut padding, not substance. Deleting is as valuable as adding.
   Do not answer criticism by getting longer — that is how v1 died.

RULES
- Never invent a tool, API, model name, or Claude Code feature. v2's C5.2 lists the media and
  measurement tools verified present on this machine; claiming one outside that list is a BLOCKER.
- Do not edit any file other than ${f.file}.

Return ONLY: path, new line count, v1 machinery purged, contracts conformed, wave-1 gaps fixed, and
anything you declined with your evidence.`
}

const REGATE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'forced_choice', 'v1_machinery_found', 'contract_violations', 'largest_gap', 'gaps', 'ship_test'],
  properties: {
    verdict: { type: 'string', enum: ['PASS', 'FAIL'] },
    forced_choice: { type: 'string', enum: ['THIS_FILE_WINS', 'BASELINE_ALONE_WINS', 'TOO_CLOSE_TO_CALL'] },
    v1_machinery_found: { type: 'array', items: { type: 'string' } },
    contract_violations: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['contract', 'site', 'violation'],
        properties: { contract: { type: 'string' }, site: { type: 'string' }, violation: { type: 'string' } },
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
    line_count: { type: 'integer' },
    padding_found: { type: 'array', items: { type: 'string' } },
  },
}

function regatePrompt(f, round) {
  return `You are a hostile, fresh-context critic. You did not write this file and cannot see the
author's reasoning. Round ${round} re-gate of: ${f.file}

Read ${CONTRACTS} (v2, NORMATIVE), ${BRIEF}, ${BASE}, ${VERDICTS}, ${f.file}, and the sibling .md
files in ${ROOT} and ${ROOT}/install.

ALL of these must hold for PASS:
1. NO v1 MACHINERY. Grep the file for: Wilson, band(, MIE, alpha, binomial, CROSS, GAIN, reserve
   judge, pooled, j01, 19 judges, 25 agents, 800_000, 800k, 150 agent-runs, recipe_class,
   order_swap, locator_floor, access_path, rounds_without_gap_movement. Every hit is a BLOCKER
   unless it is explicitly labelled as superseded history. Report each in v1_machinery_found.
2. CONTRACT CONFORMANCE to v2. Zero *definitions* of a schema field, stop threshold, run path,
   ceiling, or modality capability — unless v2's ownership table names this file as that contract's
   implementation, in which case the statement must match v2 exactly. Any divergence is a BLOCKER.
   Verify every path reference actually resolves (test it).
3. WAVE-1 GAPS CLOSED. Read this file's section in ${VERDICTS}; every BLOCKER and MAJOR genuinely
   fixed, not paraphrased away.
4. MODALITY TRUTH. No instruction to inspect what C5 denies. No media or measurement binary claimed
   outside C5.2's verified list.
5. NO HARNESS LIES. Invented tool, wrong model name, non-existent Claude Code feature, unrunnable
   snippet, unresolvable path — each is an automatic BLOCKER. Test what you can actually test.
6. THE FORCED CHOICE. Would an expert operator get better real output from this file, or from just
   the raw baseline prompt (${BASE}) plus their own judgment? Anything but THIS_FILE_WINS means the
   file is not earning its existence.
7. SHIP TEST. Would a top practitioner in this domain put their name on it?
8. LENGTH. At or under ${f.cap} lines — report the actual count. List every line a reader cannot act
   on. This system's thesis is that length is a liability; a file that violates the doctrine it
   teaches is a BLOCKER.

CALIBRATION: default to FAIL. PASS only if you would be genuinely impressed receiving this from a
senior specialist you were paying well. "Solid" and "comprehensive" mean FAIL. Never soften a FAIL
into a caveated PASS. But do not manufacture objections on a file that clears the bar — padding a
gap list on excellent work wastes a round. Cite located evidence for every gap; a citation I cannot
resolve discredits your whole verdict.`
}

async function run(f) {
  await agent(conformPrompt(f), { label: `conform:${f.key}`, phase: 'Conform' })
  let v = null
  const history = []
  for (let round = 1; round <= 2; round++) {
    v = await agent(regatePrompt(f, round), {
      label: `regate:${f.key}:r${round}`, phase: 'Regate', schema: REGATE_SCHEMA, effort: 'high',
    })
    if (!v) { history.push({ round: round, verdict: 'CRITIC_DIED' }); continue }
    const viol = v.contract_violations || []
    const v1 = v.v1_machinery_found || []
    const gaps = v.gaps || []
    history.push({
      round: round, verdict: v.verdict, forced_choice: v.forced_choice,
      v1_hits: v1.length, violations: viol.length,
      blockers: gaps.filter(g => g.severity === 'BLOCKER').length,
      lines: v.line_count, largest_gap: v.largest_gap,
    })
    const clean = v.verdict === 'PASS' && v.forced_choice === 'THIS_FILE_WINS' && viol.length === 0 && v1.length === 0
    if (clean) { log(`${f.key}: PASS r${round} (${v.line_count} lines)`); return { key: f.key, passed: true, rounds: round, history: history } }
    log(`${f.key}: r${round} ${v.verdict} — ${v1.length} v1 hits, ${viol.length} violations — ${v.largest_gap}`)
    if (round === 2) break
    await agent(
      `Repair ${f.file} against this independent critic verdict. Read ${f.file} and ${CONTRACTS} (v2,
normative) first.

${JSON.stringify(v, null, 2)}

${V1_PURGE}

Fix every v1_machinery_found entry, every contract_violation, and every BLOCKER/MAJOR. Delete
everything in padding_found. End at or under ${f.cap} lines — shorter is better. If forced_choice was
not THIS_FILE_WINS, this file is not earning its existence: restructure around the unique leverage it
actually provides, or cut it to just that part. You may decline a gap only with stated evidence.
Never invent harness features. Return: path, new line count, what you fixed, what you declined.`,
      { label: `repair:${f.key}`, phase: 'Repair' },
    )
  }
  return { key: f.key, passed: false, rounds: 2, history: history, final: v }
}

log('Conforming 10 files to CONTRACTS v2 and re-gating each.')
const out = (await parallel(FILES.map(f => () => run(f)))).filter(Boolean)
log(`Done. Passed: ${out.filter(r => r.passed).length}/${out.length}`)

return {
  passed: out.filter(r => r.passed).map(r => ({ key: r.key, rounds: r.rounds, lines: r.history[r.history.length - 1].lines })),
  failed: out.filter(r => !r.passed).map(r => ({
    key: r.key,
    history: r.history,
    largest_gap: r.final ? r.final.largest_gap : null,
    v1_machinery_found: r.final ? r.final.v1_machinery_found : null,
    contract_violations: r.final ? r.final.contract_violations : null,
    blockers: r.final && r.final.gaps ? r.final.gaps.filter(g => g.severity === 'BLOCKER') : null,
  })),
}
