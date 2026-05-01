#!/usr/bin/env node
/**
 * Merges the deprecated top-level /context field into /system_prompt
 * and removes /context from Jordan's persona.
 *
 * Driven by Gemini Deep Research audit finding:
 * "As of February 12, 2026, the context field has been officially
 *  deprecated across the Tavus API in favor of a unified system_prompt
 *  field."
 *
 * Safe operation: reads current /context, appends it to /system_prompt
 * under a CONVERSATION CONTEXT section, then removes the top-level
 * /context field.
 *
 * Reads TAVUS_API_KEY and TAVUS_STAFFING_PERSONA_ID from .env.
 */

require("dotenv").config();

const { patchPersona } = require("../shared/tavus-client");
const https = require("https");

function fetchPersona(id) {
  return new Promise((resolve, reject) => {
    https
      .request(
        {
          host: "tavusapi.com",
          path: "/v2/personas/" + id,
          headers: {
            "x-api-key": process.env.TAVUS_API_KEY,
            Accept: "application/json",
          },
        },
        (res) => {
          let raw = "";
          res.on("data", (c) => (raw += c));
          res.on("end", () => resolve(JSON.parse(raw)));
        }
      )
      .on("error", reject)
      .end();
  });
}

async function mergeAndRemoveContext(id, label) {
  console.log(`\n=== ${label} (${id}) ===`);
  const persona = await fetchPersona(id);

  if (!("context" in persona) || !persona.context) {
    console.log("  ⚠ No /context field present — skipping");
    return;
  }

  const currentPrompt = persona.system_prompt || "";
  const contextValue = persona.context;

  if (currentPrompt.includes("## CONVERSATION CONTEXT (merged from deprecated /context field)")) {
    console.log("  ⚠ Context already merged into system_prompt — just removing /context");
    try {
      await patchPersona(id, [{ op: "remove", path: "/context" }]);
      console.log("  ✓ /context removed");
    } catch (e) {
      console.log("  ✗ remove failed:", e.message.slice(0, 300));
    }
    return;
  }

  const mergedSection = [
    "",
    "",
    "---",
    "",
    "## CONVERSATION CONTEXT (merged from deprecated /context field)",
    "",
    contextValue,
  ].join("\n");

  const newPrompt = currentPrompt + mergedSection;

  console.log(`  current system_prompt: ${currentPrompt.length} chars`);
  console.log(`  context to merge: ${contextValue.length} chars`);
  console.log(`  new system_prompt: ${newPrompt.length} chars`);

  try {
    await patchPersona(id, [
      { op: "replace", path: "/system_prompt", value: newPrompt },
    ]);
    console.log("  ✓ system_prompt merged");
  } catch (e) {
    console.log("  ✗ system_prompt merge failed:", e.message.slice(0, 300));
    return;
  }

  try {
    await patchPersona(id, [{ op: "remove", path: "/context" }]);
    console.log("  ✓ /context removed");
  } catch (e) {
    console.log("  ✗ /context remove failed:", e.message.slice(0, 300));
  }

  // Verify
  const after = await fetchPersona(id);
  console.log("  verified: /context still present =", "context" in after && !!after.context);
  console.log("  verified: new system_prompt length =", (after.system_prompt || "").length);
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
  await mergeAndRemoveContext(jordanId, "Jordan");
  console.log("\n✅ /context deprecation resolved on Jordan");
}

main().catch((e) => {
  console.error("fatal:", e.message);
  process.exit(1);
});
