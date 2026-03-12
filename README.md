# AI Eval Plan CLI

Turn an AI feature or agent idea into a concrete evaluation plan in one command.

You paste a short description of what you’re building, and `ai-eval-plan` gives you:

1. A 2-sentence summary
2. Key user-facing behaviours to protect
3. 5–7 concrete scenarios to test
4. Offline + online metrics (with rough formulas/examples)
5. Risks & failure modes
6. A tweet summarising what you’re trying to prove with this eval

## Setup

```bash
git clone https://github.com/alexissan/ai-eval-plan-cli.git
cd ai-eval-plan-cli
npm install

export OPENAI_API_KEY=sk-...
```

## Usage

From inside `ai-eval-plan-cli/`:

```bash
node index.js "An agent that watches my iOS repo and opens GitHub issues when Xcode builds fail in CI."
```

Or, after a global install:

```bash
npm install -g .
ai-eval-plan "An AppBrandKit AI \"Magic Flow\" that goes from brief -> icon -> ASO storyboard -> screenshots."
```

Example output shape:

```text
1) Summary
A "Magic Flow" in AppBrandKit AI that takes a short product brief and walks the user through icon, ASO storyboard, and screenshot generation in one guided sequence. The eval focuses on whether the flow produces coherent, on-brief assets and feels faster than doing each step manually.

2) Key behaviours to protect
- The flow respects the original brief and doesn’t drift off-topic.
- Each step (icon, ASO copy, screenshots) feels connected instead of random.
- Users can recover from one bad step without losing overall progress.

3) Scenarios to test
- Happy path: well-written brief for a productivity app.
- Underspecified brief: 1–2 sentences, vague category.
- Overly long brief with conflicting goals.
- Non-English brief.
- Brief that includes brand constraints (colors, tone, do/don’t).
- User edits the ASO copy mid-flow and regenerates screenshots.
- User skips icon generation and only wants copy + screenshots.

4) Metrics
- Offline: human-rated coherence (1–5) across icon/copy/screenshots, on-brief score (1–5), time-to-first-valid-set.
- Online: completion rate from brief start -> export, number of regenerations per step, drop-off per step, NPS-style satisfaction score.

5) Risks & failure modes
- Flow feels like a random sequence of tools instead of one guided journey.
- Copy and visuals diverge (e.g. copy talks about feature A, screenshots show feature B).
- Users feel locked in and can’t easily correct one step without restarting.

6) One tweet
Building a "Magic Flow" for AppBrandKit AI: brief -> icon -> ASO storyboard -> screenshots, all in one guided run. The real test isn’t "does it work" but "does it feel like one coherent story that ships faster than doing everything by hand".
```

Use this to:
- Design eval plans for new agents/features before you over-build
- sanity-check that you’re actually measuring the right behaviours
- generate quick tweet-sized summaries of what an eval is trying to prove.
