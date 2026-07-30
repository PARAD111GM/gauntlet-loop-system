# Workflow scripts

The four Claude Code `Workflow` scripts that built and gated this system. Kept in the repo so a run
can be resumed on any machine, not just the one it started on.

Run one with:

```
Workflow({ scriptPath: "<abs path to this repo>/workflows/<script>.js",
           args: "<abs path to this repo>" })
```

`args` overrides the repo root. Omit it and the scripts fall back to
`/Users/Nathan/Code/gauntlet-loop-system`.

| Script | Phase | Status |
|---|---|---|
| `wave1-build-and-gate.js` | Build 10 components, 3-round hostile critic gate each | run 2026-07-29; 1 clean pass, 9 failed on cross-file contract drift |
| `wave2a-contract-freeze.js` | Drift archaeology → freeze `CONTRACTS.md` → gate it → conform → re-gate → red-team → coherence | partial: archaeology + freeze + gate ran; v1 contract failed its gate on 4 BLOCKERs and was replaced by hand-authored v2 |
| `wave2b-conform-v2.js` | Conform all 10 files to CONTRACTS v2, purge v1 machinery, re-gate | ran to near-completion; net -99 lines. 3 files still over cap |
| `wave2d-blind-tournament.js` | **The gate that matters.** 4 blind prediction pairs + 1 real build-off vs the baseline prompt, blindness audit, loss diagnosis | **NEVER RUN** |

`resumeFromRunId` is same-session only, so a run that dies with its process cannot be resumed —
relaunch fresh against the files on disk. The files are the state.

Still outstanding: red-team ×3 and the coherence integrator (both defined in `wave2a`, never
reached), the three over-cap files, and the tournament. Per `CONTRACTS.md` C5.6, no claim that the
baseline prompt has been beaten is licensed until the tournament runs.
