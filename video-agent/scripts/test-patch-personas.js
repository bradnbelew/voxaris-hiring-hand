#!/usr/bin/env node
/**
 * Exercises the patch-persona endpoint logic directly against live Tavus.
 * Imports the same modules the Vercel handlers use, so a green run here
 * means the deployed endpoints will succeed with the same env vars.
 */

require("dotenv").config();

const { patchPersona } = require("../shared/tavus-client");

// Duplicate the exact payload from the handler so we exercise it without
// spinning up Vercel dev. Keep this script in sync if you edit the handler.
const JORDAN_PERCEPTION = {
  perception_model: "raven-1",
  visual_awareness_queries: [
    "Does the candidate appear nervous, calm, or confident based on posture and facial expression?",
    "Is the candidate dressed professionally, casually, or informally for the interview?",
    "Is the candidate maintaining eye contact with the camera or frequently looking away?",
    "Is there anything in the background that appears unprofessional or distracting?",
  ],
  audio_awareness_queries: [
    "Does the candidate sound confident and clear, or hesitant and uncertain?",
    "Is the candidate speaking at a natural pace, or rushing and stumbling over words?",
    "Does the candidate sound genuinely enthusiastic about the role, or disengaged?",
  ],
  perception_analysis_queries: [
    "Overall, how would you rate the candidate's professional presentation on a scale of 1-10 based on visual appearance and setting?",
    "Were there moments where the candidate appeared visibly uncomfortable or evasive — if so, at what point in the conversation?",
    "Did the candidate's energy and engagement increase, decrease, or stay flat throughout the session?",
    "Was the candidate alone during the interview, or was anyone else present in the frame?",
    "On a scale of 1-100, how often was the candidate maintaining direct eye contact with the camera?",
  ],
};

async function tryPatch(label, personaId, valueBlock, path) {
  console.log(`\n→ ${label} — replace ${path}`);
  try {
    const r = await patchPersona(personaId, [
      { op: "replace", path, value: valueBlock },
    ]);
    console.log("  ✓ replace OK:", JSON.stringify(r).slice(0, 200));
    return true;
  } catch (e) {
    console.log("  ✗ replace failed:", e.message.slice(0, 300));
  }
  console.log(`→ ${label} — add ${path}`);
  try {
    const r = await patchPersona(personaId, [
      { op: "add", path, value: valueBlock },
    ]);
    console.log("  ✓ add OK:", JSON.stringify(r).slice(0, 200));
    return true;
  } catch (e) {
    console.log("  ✗ add failed:", e.message.slice(0, 300));
    return false;
  }
}

async function main() {
  const jordanId = process.env.TAVUS_STAFFING_PERSONA_ID;

  if (!jordanId) {
    console.error("TAVUS_STAFFING_PERSONA_ID missing from .env");
    process.exit(1);
  }

  await tryPatch(
    "Jordan perception",
    jordanId,
    JORDAN_PERCEPTION,
    "/layers/perception"
  );
}

main().catch((e) => {
  console.error("fatal:", e);
  process.exit(1);
});
