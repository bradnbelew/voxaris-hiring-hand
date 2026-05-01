#!/usr/bin/env node
/**
 * Attempts to populate visual_tools + audio_tools on Jordan's persona.
 * Raven-1 tool calls (like candidate_strong_signal, escalate_to_recruiter)
 * surface client-side via Daily.js app-message events — Tavus itself does
 * NOT route them to the webhook callback — but they still have to exist on
 * the persona before Raven-1 will emit them.
 *
 * We try multiple schemas because Tavus docs are sparse on the exact shape.
 * Whichever schema Tavus accepts wins.
 *
 * Reads TAVUS_API_KEY and TAVUS_STAFFING_PERSONA_ID from .env.
 */

require("dotenv").config();

const { patchPersona } = require("../shared/tavus-client");

// OpenAI function-tool format (most common across Tavus layers)
const JORDAN_VISUAL_TOOLS = [
  {
    type: "function",
    function: {
      name: "flag_unprofessional_setting",
      description:
        "Trigger when the candidate's environment contains clearly unprofessional or distracting visual elements that should be noted for the recruiter review",
      parameters: {
        type: "object",
        properties: {
          observation: {
            type: "string",
            description: "Description of the visual element detected",
            maxLength: 300,
          },
        },
        required: ["observation"],
      },
    },
  },
];

const JORDAN_AUDIO_TOOLS = [
  {
    type: "function",
    function: {
      name: "candidate_strong_signal",
      description:
        "Trigger when candidate consistently sounds confident, articulate, and enthusiastic — strong forward pipeline signal",
      parameters: {
        type: "object",
        properties: {
          standout_moment: {
            type: "string",
            description:
              "The specific answer or moment that most stood out positively",
            maxLength: 300,
          },
        },
        required: ["standout_moment"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "escalate_to_recruiter",
      description:
        "Trigger when candidate is distressed, confused, or discloses something requiring human recruiter intervention",
      parameters: {
        type: "object",
        properties: {
          reason: {
            type: "string",
            description: "Why escalation is needed",
            maxLength: 300,
          },
        },
        required: ["reason"],
      },
    },
  },
];

const JORDAN_VISUAL_TOOL_PROMPT =
  "You have a tool called `flag_unprofessional_setting`. Use it if the candidate's background contains clearly distracting, inappropriate, or unprofessional elements that a recruiter should be aware of.";

const JORDAN_AUDIO_TOOL_PROMPT =
  "You have two tools: `candidate_strong_signal` and `escalate_to_recruiter`. Use `candidate_strong_signal` when the candidate sounds confident, articulate, and genuinely enthusiastic across multiple answers. Use `escalate_to_recruiter` if the candidate becomes visibly or audibly distressed, confused, or if they discloses something that requires human follow-up.";

async function tryStrategies(label, personaId, visualTools, audioTools, visualPrompt, audioPrompt) {
  console.log(`\n=== ${label} (${personaId}) ===`);

  // Strategy 1: Replace the whole perception layer atomically
  console.log("→ Strategy 1: replace /layers/perception with tools populated");
  try {
    const r = await patchPersona(personaId, [
      {
        op: "replace",
        path: "/layers/perception/visual_tools",
        value: visualTools,
      },
      {
        op: "replace",
        path: "/layers/perception/audio_tools",
        value: audioTools,
      },
      {
        op: "replace",
        path: "/layers/perception/visual_tool_prompt",
        value: visualPrompt,
      },
      {
        op: "replace",
        path: "/layers/perception/audio_tool_prompt",
        value: audioPrompt,
      },
    ]);
    console.log("  ✓ Strategy 1 SUCCESS:", r && r.status ? r.status : "200");
    return "strategy-1";
  } catch (e) {
    console.log("  ✗ Strategy 1 failed:", e.message.slice(0, 400));
  }

  // Strategy 2: Add individual tools via array append
  console.log("→ Strategy 2: add /layers/perception/visual_tools/- per tool");
  try {
    const ops = [];
    visualTools.forEach((t) => {
      ops.push({
        op: "add",
        path: "/layers/perception/visual_tools/-",
        value: t,
      });
    });
    audioTools.forEach((t) => {
      ops.push({
        op: "add",
        path: "/layers/perception/audio_tools/-",
        value: t,
      });
    });
    ops.push({
      op: "replace",
      path: "/layers/perception/visual_tool_prompt",
      value: visualPrompt,
    });
    ops.push({
      op: "replace",
      path: "/layers/perception/audio_tool_prompt",
      value: audioPrompt,
    });
    const r = await patchPersona(personaId, ops);
    console.log("  ✓ Strategy 2 SUCCESS:", r && r.status ? r.status : "200");
    return "strategy-2";
  } catch (e) {
    console.log("  ✗ Strategy 2 failed:", e.message.slice(0, 400));
  }

  // Strategy 3: Simplified tool schema (no wrapper function object)
  console.log("→ Strategy 3: simplified tool schema");
  try {
    const simplifiedVisual = visualTools.map((t) => ({
      name: t.function.name,
      description: t.function.description,
      parameters: t.function.parameters,
    }));
    const simplifiedAudio = audioTools.map((t) => ({
      name: t.function.name,
      description: t.function.description,
      parameters: t.function.parameters,
    }));
    const r = await patchPersona(personaId, [
      {
        op: "replace",
        path: "/layers/perception/visual_tools",
        value: simplifiedVisual,
      },
      {
        op: "replace",
        path: "/layers/perception/audio_tools",
        value: simplifiedAudio,
      },
    ]);
    console.log("  ✓ Strategy 3 SUCCESS:", r && r.status ? r.status : "200");
    return "strategy-3";
  } catch (e) {
    console.log("  ✗ Strategy 3 failed:", e.message.slice(0, 400));
  }

  console.log("\n⚠ All strategies exhausted — perception tool PATCH is not supported in current Tavus API");
  return null;
}

async function main() {
  if (!process.env.TAVUS_API_KEY) {
    console.error("TAVUS_API_KEY missing");
    process.exit(1);
  }
  const jordanId = process.env.TAVUS_STAFFING_PERSONA_ID;
  if (!jordanId) {
    console.error("TAVUS_STAFFING_PERSONA_ID missing from .env");
    process.exit(1);
  }

  await tryStrategies(
    "Jordan",
    jordanId,
    JORDAN_VISUAL_TOOLS,
    JORDAN_AUDIO_TOOLS,
    JORDAN_VISUAL_TOOL_PROMPT,
    JORDAN_AUDIO_TOOL_PROMPT
  );
}

main().catch((e) => {
  console.error("fatal:", e.message);
  process.exit(1);
});
