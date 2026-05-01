# Voxaris Hiring Hand

The Voxaris hiring product: a Tavus video agent (**Jordan**) that pre-screens candidates, plus a Next.js admin dashboard for recruiters to review sessions, manage tenants, and configure interviews.

This repo holds two independently deployable apps that share a single Supabase database:

| Path | What it is | Deploys as |
|---|---|---|
| [`video-agent/`](./video-agent) | Tavus CVI staffing interviewer (Vercel serverless functions + static HTML embeds) | Vercel project |
| [`dashboard/`](./dashboard) | Next.js App Router admin panel (auth, session viewer, billing) | Vercel project |
| [`marketing/`](./marketing) | Next.js 16 marketing site for [hiringhand.io](https://hiringhand.io) — split-screen "chaos vs. Jordan" homepage | Vercel project |

The two pieces are **not** glued at the code level — they're glued at the **data layer**:

- The `video-agent` writes interview sessions to Supabase (`shared/supabase-store.js`) and to a Google Sheets log.
- The `dashboard` reads those Supabase rows and renders them for the recruiter.

That means you can deploy, version, and roll back each side independently. They share the schema in `video-agent/supabase/schema.sql` (canonical) and `dashboard/supabase/*.sql` (dashboard-specific migrations like billing).

---

## Quick start

```bash
# Clone
git clone https://github.com/<you>/voxaris-hiring-hand.git
cd voxaris-hiring-hand

# Install + run video-agent
cd video-agent
cp .env.example .env   # fill in Tavus, Google Sheets, Supabase, n8n
npm install
vercel dev             # http://localhost:3000

# In a second terminal — install + run dashboard
cd ../dashboard
cp .env.local.example .env.local
npm install
npm run dev            # http://localhost:3001 (or wherever Next picks)
```

See each subdir's README for full setup and deploy steps.

---

## Lineage

This repo combines two predecessor repos:

- [`bradnbelew/Voxaris-Video-Agent`](https://github.com/bradnbelew/Voxaris-Video-Agent) — the dual-vertical Tavus platform. Realty (`Aria`) was removed; only the staffing vertical (`Jordan`) is kept here.
- [`bradnbelew/voxaris-dashboard`](https://github.com/bradnbelew/voxaris-dashboard) — already staffing-only; copied verbatim.

Git history was not preserved in the merge — both originals remain on GitHub for archeology.

---

## Related

- Cold-outreach pipeline that *sells* this product: `voxaris-hiring-outreach` (separate repo, not part of this monorepo).
