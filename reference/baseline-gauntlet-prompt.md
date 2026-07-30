# BASELINE — Third-party reference artifact (do not edit)

**Author:** Matt Shumer. **Source:** https://github.com/mshumer/Claude-of-Duty/blob/main/prompt.md
**Method write-up:** https://somethingbig.ai/gauntlet-loop

This is the artifact our system must beat in blind A/B comparison. It is reproduced here
verbatim, with attribution, solely as the comparison baseline. It is third-party work.

---

## The original Gauntlet Loop prompt (verbatim)

> I want you to build a first-person shooter at the level of the most recent Call of Duty games. It should be utterly perfect, visually beautiful, with every single thing done at AAA quality—from textures to physics to anything you could think of.
>
> Fan out sub-agents and have sub-agents tackle each one individually so that the game is utterly perfect. You should /loop on each item and have a separate sub-agent check it visually to ensure it looks triple A. That separate sub-agent should be a really harsh critic, and if it doesn't look triple A, it should keep going.
>
> Don't stop until each sub-agent is utterly wowed with the quality when compared with the actual Call of Duty game. It should literally compare them side by side blind and say which one looks better. Do this in ThreeJS. /loop until it's utterly perfect. Fan out sub-agents and ultracode.

---

## Why this prompt works (analysis, not quotation)

Five load-bearing properties. Any replacement must preserve all five or it is a regression:

1. **A concrete, external, inspectable bar.** Not "high quality" — a named real-world
   artifact the critic can actually look at. The bar is deliberately unreachable, which
   supplies directional pressure and prevents stopping at "good for AI."
2. **Decomposition is delegated, not prescribed.** The agent splits the goal. The human
   never hands down an architecture, a system list, or a definition of AAA.
3. **Separation of powers.** The builder never grades itself. A fresh-context critic does.
4. **Blind A/B against the bar.** Not rubric scoring — a forced choice between two
   artifacts, which is far harder to rationalize past.
5. **No round limit.** Termination is quality-driven or human-driven, never a counter.

## The trap for any "improved" version

The original is ~120 words and prescribes almost nothing. That minimalism *is* a feature:
it leaves model judgment intact. The obvious failure mode for a "master prompting system"
is to become a 40-page framework that out-documents the original while performing worse,
because it replaces the model's judgment with the author's. Length is a liability here.
Our system must add leverage **without** adding prescription to the launch prompt itself:
depth lives in reference files the orchestrator may consult, never in the prompt handed
to the model.
