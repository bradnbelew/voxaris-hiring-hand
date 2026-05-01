# Voxaris Hiring Hand — Video Agent

Tavus CVI (Conversational Video Interface) staffing interviewer. Candidates land on a page, talk face-to-face with **Jordan**, and complete a structured EEOC-compliant pre-screening interview. Approved profiles route to a recruiter calendar via n8n.

Powered by **Phoenix-4** replica (Benjamin Office for Jordan; Rose Office as female alt), **tavus-harmony-3** LLM, **Cartesia** TTS, **Deepgram** STT, and **Raven-1** perception (visual + audio + end-of-call analysis).

> Companion app: the [`../dashboard`](../dashboard) Next.js admin panel reads sessions from Supabase. The two pieces are glued at the data layer, not at the code layer — they deploy as separate Vercel projects.

---

## Architecture at a glance

```
/api
  /health.js                           GET   /health
  /staffing
    /setup/index.js                    POST  /api/staffing/setup
    /conversations/index.js            POST  /api/staffing/conversations
    /tools/index.js                    GET/POST /api/staffing/tools
    /patch-persona/index.js            POST  /api/staffing/patch-persona
    /brand/index.js                    GET   /api/staffing/brand

/shared
  /tavus-client.js                     Zero-dep Node https Tavus client
  /google-sheets.js                    Service-account JWT → Sheets v4
  /n8n-trigger.js                      Fire-and-forget n8n webhook POST
  /supabase-store.js                   Supabase session writes (consumed by /dashboard)
  /session-store.js                    Live session state
  /token-resolver.js                   Per-tenant token resolution
  /webhook-verify.js                   Webhook signature verification
  /dashboard-trigger.js                Dashboard sync hook

/staffing
  /config/persona-prompt.md            Reference copy of Jordan's system prompt
  /config/staffing-config.js           Persona payload, objectives, guardrails, Raven-1 perception
  /lib/role-context.js                 Role-specific job briefs (warehouse, hospitality, healthcare, general)
  /lib/sheets-logger.js                Append to "Staffing Interviews" tab

/personas/jordan.json                  Persona JSON snapshot

/public
  /index.html                          Landing page
  /staffing.html                       Jordan basic embed
  /staffing-embed.html                 Jordan full-viewport embed
  /apply.html                          Candidate apply form
  /complete.html                       Post-interview completion screen
  /biometric-policy.html               BIPA / consent disclosure

/supabase/schema.sql                   Postgres schema (shared with dashboard)

/scripts                               Persona maintenance utilities (see scripts/README.md)
  /patch-personas-v2.js                Push personas/jordan.json to live persona (--dry-run supported)
  /test-conversation.js                Sanity test — create real Tavus conversation
  /test-patch-personas.js              Exercise patch-persona flow against live Tavus
  /patch-compliance.js                 Prepend AI disclosure preamble (FL/IL/NYC compliance)
  /patch-context-merge.js              Migrate deprecated /context → /system_prompt
  /patch-emotion-prompts.js            Phoenix-4 micro-expressions + Cartesia SSML
  /patch-perception-tools.js           Populate Raven-1 visual_tools + audio_tools
  /patch-phase1-tools.js               Push save_candidate_screening tool def
  /patch-schema-modernization.js       Full Tavus schema modernization pass

/vercel.json                           version 2, 30s maxDuration, CORS, rewrites
/package.json                          Deps: @supabase/supabase-js, dotenv
/.env.example                          All env vars
```

### Session flow

1. Visitor loads `/staffing?name=Maria&role=warehouse`
2. Frontend POSTs to `/api/staffing/conversations`
3. Backend builds the role brief (warehouse / hospitality / healthcare / general), assembles the greeting + `conversational_context`, and calls `POST https://tavusapi.com/v2/conversations` with `persona_id`, `replica_id`, and the full `conversation_rules` block
4. Tavus returns `{ conversation_id, conversation_url }` — the frontend embeds it in a camera/mic-enabled iframe
5. As Jordan completes objectives, Tavus fires **Format C objective callbacks** to `/api/staffing/tools` with `{ objective_name, output_variables, conversation_id }`
6. The tools endpoint ACKs HTTP 200 immediately, then merges output variables into the Live Sessions sheet row and writes to Supabase for the dashboard
7. On terminal objectives (`closing_confirmed` or `end_screening_ineligible`), the router fires `N8N_INTERVIEW_WEBHOOK` to schedule a recruiter call or send a polite rejection
8. `conversation.ended` lifecycle events flush the final session to the `Staffing Interviews` tab
9. Raven-1 perception tool calls (`candidate_strong_signal`, `candidate_disengaged`, `candidate_distressed`, etc.) surface client-side via Daily.js `app-message` → forwarded to `/api/staffing/tools` via `window.postMessage`

### Important Tavus API facts

- Auth: `x-api-key` header (NOT Bearer)
- Create conversation: `POST https://tavusapi.com/v2/conversations`
- PATCH persona: JSON Patch RFC 6902 (array of ops), `application/json-patch+json` content type
- LLM model: `tavus-harmony-3`
- STT: `deepgram`
- TTS: `cartesia` with `external_voice_id`
- Perception: `raven-1` (required for audio awareness)
- `apply_conversation_rules: true` activates objectives + guardrails
- Raven-1 perception tool calls are **not** executed by Tavus backend — they arrive on Daily.js `app-message` events and the client must forward them to your own webhook
- 1000 char limit per perception query; audio analysis capped at 32 tokens per utterance
- ALWAYS `res.status(200).json({ ok: true })` first, then do async work — Tavus freezes the call if ACK is slow

---

## Setup sequence

### 1 · Install & link

```bash
cd video-agent
npm install
npm i -g vercel
vercel login
vercel link
```

### 2 · Google Sheet setup (manual)

1. Create a Google Sheet named **"Voxaris Hiring Hand"**.
2. Create two tabs: `Live Sessions`, `Staffing Interviews`.
3. Add headers to row 1:
   - **Live Sessions**: `conversation_id | json_data | updated_at`
   - **Staffing Interviews**: `Timestamp | Source | Full Name | Email | Phone | Role | Work Authorized | Years Exp | Skills | Shift Pref | Start Date | Profile Summary | Disqualified | Recruiter Call | Callback Time | Conversation ID | Status`
4. Create a Google Cloud **Service Account** → enable Google Sheets API → create a JSON key → download.
5. From the JSON, copy `client_email` and `private_key` (keep literal `\n` sequences intact).
6. Share the sheet with the service account `client_email` as **Editor**.
7. Copy the sheet ID from its URL.

### 3 · Pick replica

`.env.example` ships with the recommended pick:

- **Jordan** → `r1a4e22fa0d9` (Benjamin Office — professional B2B) or `r1af76e94d00` (Rose Office — female alt)

Phoenix-4, honours `tts_emotion_control` micro-expressions.

### 4 · Push env vars to Vercel

```bash
vercel env add TAVUS_API_KEY production
vercel env add TAVUS_STAFFING_REPLICA_ID production   # r1a4e22fa0d9
vercel env add GOOGLE_SHEET_ID production
vercel env add GOOGLE_SERVICE_ACCOUNT_EMAIL production
vercel env add GOOGLE_PRIVATE_KEY production
vercel env add CARTESIA_API_KEY production
vercel env add CARTESIA_VOICE_ID_JORDAN production
vercel env add N8N_INTERVIEW_WEBHOOK production
vercel env add STAFFING_BASE_URL production
```

*Skip `TAVUS_STAFFING_PERSONA_ID` for now — added in step 6.*

### 5 · First deploy

```bash
vercel --prod --yes
curl https://your-domain.vercel.app/health
```

Expect `env.tavus_api_key: true`, `env.google_sheets: true`, but `env.tavus_staffing: false` (no persona yet).

### 6 · Create the persona

```bash
curl -X POST https://your-domain.vercel.app/api/staffing/setup
# → copy persona_id into vercel env: TAVUS_STAFFING_PERSONA_ID

vercel env add TAVUS_STAFFING_PERSONA_ID production
vercel --prod --yes
curl https://your-domain.vercel.app/health   # tavus_staffing should now be true
```

### 7 · Smoke test

```
https://your-domain.vercel.app/staffing?name=Test+Candidate&role=hospitality
```

---

## Local dev

```bash
cp .env.example .env
# fill in TAVUS_API_KEY, sheet creds, etc.
vercel dev
```

```bash
curl http://localhost:3000/health
curl -X POST http://localhost:3000/api/staffing/conversations \
  -H "Content-Type: application/json" \
  -d '{"visitor_name":"Maria","role":"warehouse","source":"local"}'
```

---

## n8n workflow — Recruiter routing

Triggered on Jordan's `closing_confirmed` or `end_screening_ineligible` objective.

1. **Webhook** — POST path `/route-candidate`. Copy URL → `N8N_INTERVIEW_WEBHOOK`.
2. **IF** — `disqualified === false` AND `work_authorized === true`.
3. **Branch PASS**:
   - **Google Calendar → Create Event**: `Recruiter Call — {{full_name}} for {{applied_role}}`, time from `preferred_callback_time`, attendee = candidate email
   - **Gmail (Candidate)**: "Your interview is complete! A recruiter will call you on [date/time]…"
   - **Gmail (Recruiter)**: full structured candidate profile
4. **Branch FAIL**:
   - **Gmail (Candidate)**: polite rejection (work authorization required)
5. **Respond to Webhook** — `{ success: true }`.

---

## Webhook data flow reference

The `/api/staffing/tools` router handles four payload shapes:

| Format | Shape | Source |
|---|---|---|
| A (legacy tool call) | `{ tool_name, tool_call_id, conversation_id, parameters }` | Direct tool definitions or perception forwards from the frontend |
| B (lifecycle event) | `{ event_type: "conversation.ended", conversation_id, properties }` | Tavus callback URL |
| C (objective callback) | `{ objective_name, output_variables, conversation_id }` | Tavus when `apply_conversation_rules: true` |
| D (guardrail trigger) | `{ guardrail_name, conversation_id, ... }` | Tavus callback URL |

Format C is the primary data flow. Format A is kept for backwards compatibility and for forwarding Raven-1 perception tool calls from the browser.

---

## Raven-1 perception

Jordan ships with a full Raven-1 perception layer:

- **`visual_awareness_queries`** — run ~once per second, feed into LLM context as `user_visual_analysis`
- **`audio_awareness_queries`** — run per utterance, feed into LLM context as `user_audio_analysis` (capped at 32 tokens per answer — keep queries focused)
- **`perception_analysis_queries`** — fire once at end of call, returned in `application.perception_analysis` webhook for recruiter audit
- **`visual_tools` / `audio_tools`** — Raven-emitted function calls for high-signal moments (candidate strong, disengaged, distressed, etc.)

Tavus **does not** execute perception tool calls on the backend. The frontend listens for `conversation.tool_call` events via `window.postMessage` (Daily.js `app-message` bridge) and forwards them to `/api/staffing/tools` as Format A payloads.

---

## Execution rules baked into the code

1. Every tool-call handler ACKs with HTTP 200 before doing async work — Tavus freezes the call if ACK is slow.
2. `conversation_url` is embedded in an iframe with `allow="camera; microphone; autoplay; display-capture; fullscreen"` — without that the Daily.co room black-boxes.
3. Persona creation is one-time. After `POST /api/staffing/setup`, copy `persona_id` into env and redeploy.
4. Google service-account JWTs are RS256 signed in-process, exchanged at `oauth2.googleapis.com/token`, and cached 60s before expiry.
5. `putSession()` upserts by scanning column A of "Live Sessions" and falling back to append.
6. All secrets are environment variables. Never commit `.env`.
