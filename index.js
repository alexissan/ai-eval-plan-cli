#!/usr/bin/env node

const OpenAI = require("openai");

async function main() {
  const idea = process.argv.slice(2).join(" ");
  if (!idea) {
    console.error("Usage: ai-eval-plan \"short description of your AI feature/agent\"");
    process.exit(1);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY env var.");
    process.exit(1);
  }

  const client = new OpenAI({ apiKey });

  const prompt = `You are an AI engineer designing evaluation plans for real products.

Feature/agent idea:
${idea}

Produce a tight evaluation plan in this exact structure:

1) Summary (2 sentences)
2) Key user-facing behaviours to protect (3 bullets)
3) Scenarios to test (5-7 bullets, concrete, realistic)
4) Metrics (offline + online, with rough formulas or examples)
5) Risks & failure modes (3-5 bullets)
6) One tweet (no hashtags, casual tone) summarising what we’re trying to prove with this eval.

Keep it concise and execution-focused, like notes for an engineer and PM who will actually run the eval.
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      throw new Error("No content from OpenAI");
    }

    console.log(text.trim());
  } catch (error) {
    console.error("Error generating eval plan:", error.message || error);
    process.exit(1);
  }
}

main();
