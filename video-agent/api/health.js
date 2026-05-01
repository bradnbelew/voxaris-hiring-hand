/**
 * GET /health → /api/health
 * Quick readiness probe — confirms which env vars are wired up.
 */

module.exports = (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "voxaris-videoagent",
    verticals: ["staffing"],
    timestamp: new Date().toISOString(),
    env: {
      tavus_api_key: !!process.env.TAVUS_API_KEY,
      tavus_staffing: !!(
        process.env.TAVUS_STAFFING_PERSONA_ID &&
        process.env.TAVUS_STAFFING_REPLICA_ID
      ),
      google_sheets: !!(
        process.env.GOOGLE_SHEET_ID &&
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
        process.env.GOOGLE_PRIVATE_KEY
      ),
      n8n_interview: !!process.env.N8N_INTERVIEW_WEBHOOK,
      patch_endpoints: true,
    },
  });
};
