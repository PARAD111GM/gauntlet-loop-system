# SHARED BUILD BRIEF — read before writing anything

Every builder and critic agent working on this project MUST read this file and
`reference/baseline-gauntlet-prompt.md` first.

## What we are building

**THE GAUNTLET** — a master prompting system that lets an operator take *any* goal in
*any* domain and launch a Gauntlet Loop that reliably produces work at or above a named
real-world quality bar. It is a *system for generating and running* gauntlet loops, not a
single prompt.

Repo root: `/Users/Nathan/Code/gauntlet-loop-system/`

## The one constraint that overrides everything

**The launch prompt we emit must stay short.** The baseline is ~120 words and beats
carefully engineered long prompts. We are not allowed to win by writing more. We win by:

- choosing a **better bar** than the operator would have chosen alone (this is the single
  highest-leverage contribution — bar selection is the hard part and the baseline leaves
  it entirely to the human);
- making the critic **actually inspect the artifact** in the right modality (a screenshot
  cannot detect a behavioural bug — see Hard-Won Lesson 1);
- closing the **known failure modes** (critic capture, self-grading leakage, bar drift,
  non-termination, runaway cost) that the baseline leaves open;
- being **operable**: installable, re-runnable, resumable, cost-bounded.

Depth belongs in reference files the orchestrator *may* load. Prescription must never
reach the launch prompt. If a section of your file would end up pasted into a launch
prompt, cut it to a single line.

## Hard-won lessons that MUST be encoded (these came from real failed runs)

1. **A subsystem must never grade itself, and screenshots cannot find behavioural bugs.**
   A prior visual-only critic loop drove a browser game from 27 → 43 on its own rubric
   while real behavioural bugs survived untouched, because every check was a still image.
   Critics need *modality-matched* probes: behaviour needs behavioural probes, perf needs
   traces, prose needs read-aloud, APIs need contract tests.
2. **Never trust a builder's claim of compliance.** "Built on the design system" was false
   in a real run; only grepping the imports revealed it. Critics verify by inspecting
   artifacts and evidence, never by reading the builder's summary.
3. **Resumed agents silently revert to the session default model.** Model choice must be
   set at spawn, never after resume.
4. **The rubric-inflation trap.** Self-scored rubrics climb while quality stagnates. Forced
   blind pairwise choice is the only scoring primitive we trust as a gate.

## File manifest (one owner each — do not write outside your file)

| File | Purpose |
|---|---|
| `README.md` | Entry point. Operator gets a running loop in 60 seconds. |
| `DOCTRINE.md` | The theory: the five invariants, why each exists, what breaks without it. |
| `LAUNCH.md` | The meta-prompt: goal in → minimal launch prompt out. The product's core. |
| `BARS.md` | The bar library: concrete, inspectable bars across every major domain. |
| `ROLES.md` | Verbatim role prompts: orchestrator, builder, blind critic, arbiter. |
| `INSPECTION.md` | Modality-matched inspection recipes: how a critic actually verifies. |
| `FAILURE-MODES.md` | Anti-pattern catalogue with detection signal + mitigation each. |
| `OPERATIONS.md` | Running it: parallelism, cost ceilings, termination, resume, artifacts. |
| `EXAMPLES.md` | Three fully worked end-to-end runs in different domains. |
| `install/SKILL.md` | Installable Claude Code skill so `/gauntlet <goal>` just works. |

## House style (non-negotiable)

- **Dense, declarative, zero filler.** No "in today's fast-paced world." No restating the
  section title. No hedging. Every line either instructs or informs.
- **Show, don't describe.** Prefer a copy-pasteable block over a paragraph about it.
- **Tables and checklists over prose** wherever the content is enumerable.
- **Every claim actionable.** If a reader cannot do something differently after a line,
  delete the line.
- **Target length: 150–400 lines per file.** Over 400 means you are padding. Cut.
- **No em-dash-heavy AI cadence.** Vary sentence length. Write like a senior operator
  handing over a runbook.
- Markdown only. Fenced blocks for anything meant to be copied, tagged with the language.

## Compose with what already exists on this machine — do not reinvent

Read these before writing; reference them rather than duplicating their content:
- `/Users/Nathan/.claude/skills/verification-loop/SKILL.md`
- `/Users/Nathan/.claude/skills/subagent-driven-development/SKILL.md`
- `/Users/Nathan/.claude/skills/eval-harness/SKILL.md`
- `/Users/Nathan/.claude/plugins/cache/claude-plugins-official/superpowers/*/skills/*/dispatching-parallel-agents/SKILL.md` (if present)

The harness this runs on is Claude Code with: `Workflow` (deterministic JS orchestration,
`agent()`/`parallel()`/`pipeline()`, concurrency cap ~16, agent cap 1000), `Agent`
(subagents), `/loop`, ultracode mode, worktree isolation, and MCP tools including
Playwright and a browser pane. Ground all operational advice in these real primitives —
never invent a feature. Current best models: Opus 5 (`claude-opus-5`), Sonnet 5, Fable 5,
Haiku 4.5.

## Definition of done for your file

A hostile critic with fresh context will blind-compare your work against the baseline and
against a strong reference in your file's category. You pass only if the critic, without
knowing which artifact is which, picks yours as the one that would produce better real
output. Write for that reader.
