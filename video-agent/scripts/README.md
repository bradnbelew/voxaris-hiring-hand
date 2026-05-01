# scripts/

Maintenance utilities for Jordan's Tavus persona. None of these are required for runtime — `staffing/config/staffing-config.js` is the source of truth and `/api/staffing/setup` builds a persona from it. These scripts are useful when you have an *existing* Tavus persona ID and want to evolve it in place without re-creating it.

All scripts read `TAVUS_API_KEY` and `TAVUS_STAFFING_PERSONA_ID` from `.env`.

## Living utilities

- **`patch-personas-v2.js`** — push the canonical `/personas/jordan.json` snapshot to the live Tavus persona. Supports `--dry-run`. Use this as the main "sync persona" script.
- **`test-conversation.js`** — end-to-end sanity check: creates a real Tavus conversation and prints the URL.
- **`test-patch-personas.js`** — exercises the same `patchPersona` flow the `/api/staffing/patch-persona` endpoint uses, against the live Tavus persona.

## One-off historical migrations (kept for reference)

These were applied once during persona evolution. They're idempotent — re-running them is generally safe but typically unnecessary because their effects are already baked into `staffing-config.js` and `personas/jordan.json`.

- **`patch-compliance.js`** — prepends the AI Disclosure & Consent preamble (FL SB 482, IL AI Video Interview Act, NYC AEDT, FL two-party recording).
- **`patch-context-merge.js`** — migrates the deprecated top-level `/context` field into `/system_prompt` (Tavus deprecation, 2026-02-12).
- **`patch-emotion-prompts.js`** — adds Phoenix-4 micro-expression steering + Cartesia sonic-3 SSML guidance.
- **`patch-perception-tools.js`** — populates `visual_tools` + `audio_tools` (Raven-1 tool-call definitions for `flag_unprofessional_setting`, `candidate_strong_signal`, `escalate_to_recruiter`).
- **`patch-phase1-tools.js`** — pushes the latest `save_candidate_screening` tool definition from `staffing-config.js`.
- **`patch-schema-modernization.js`** — full Tavus schema modernization pass (gpt-4o → gpt-oss, stt-advanced → stt-auto, adds `conversational_flow` layer, tightens perception queries, removes deprecated fields, fixes `[Staffing Agency Name]` placeholder).

> All scripts here operate only on the staffing/Jordan persona. Realty/Aria branches were stripped when this repo was forked from `bradnbelew/Voxaris-Video-Agent`.
