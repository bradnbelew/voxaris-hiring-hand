import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | Voxaris",
  description:
    "How Voxaris secures customer data across voxaris.io, audit.voxaris.io, pitch.voxaris.io, talkingpostcard.io, and hiringhand.io. Coordinated-disclosure policy.",
  alternates: { canonical: "https://voxaris.io/security" },
};

export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24 text-neutral-800">
      <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-3">Trust</p>
      <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6">Security</h1>
      <p className="text-sm text-neutral-500 mb-10">
        Last updated: <time dateTime="2026-05-24">May 24, 2026</time>
      </p>

      <div className="space-y-8 text-[15px] leading-relaxed text-neutral-700">
        <p>
          Voxaris operates production AI infrastructure that handles customer data,
          voice calls, SMS, and CRM webhooks for service businesses. Security is
          treated as a product requirement, not an afterthought.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">Reporting a vulnerability</h2>
          <p>
            Email <a className="text-rose-700 hover:underline" href="mailto:security@voxaris.io">security@voxaris.io</a> or{" "}
            <a className="text-rose-700 hover:underline" href="mailto:admin@voxaris.io">admin@voxaris.io</a>. Targets:
            acknowledgment in 2 business days, triage in 5, critical patches in 14.
            See <a className="text-rose-700 hover:underline" href="/.well-known/security.txt">/.well-known/security.txt</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">How we secure data</h2>
          <p className="mb-3">
            <strong>Encryption.</strong> TLS 1.2+ on every surface, 2-year HSTS preload,
            secrets in environment-scoped secret managers, never in source control.
          </p>
          <p className="mb-3">
            <strong>Database.</strong> Row-level security on every multi-tenant table.
            Cross-tenant reads are not possible.
          </p>
          <p className="mb-3">
            <strong>Voice &amp; SMS.</strong> LiveKit Cloud + Twilio Elastic SIP. Outbound
            voice requires per-lead TCPA voice-consent (FCC AI-voice disclosure,
            Feb 2024). Outbound SMS handles STOP, HELP, and quiet hours.
          </p>
          <p>
            <strong>Code.</strong> Builds gate on CI (build + typecheck + lint).
            Security-relevant changes get a second-engineer or agent review before merge.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">Subprocessors</h2>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Vercel — hosting + edge</li>
            <li>Supabase — Postgres + auth + storage</li>
            <li>Neon — Postgres (audit.voxaris.io)</li>
            <li>Twilio — SMS + voice telephony</li>
            <li>LiveKit Cloud — voice AI media routing</li>
            <li>Google Cloud — Gemini + Solar + Maps</li>
            <li>Anthropic — Claude API</li>
            <li>OpenAI — speech-to-text + select inference</li>
          </ul>
          <p className="mt-3">
            We do not sell or rent customer data to any third party.
          </p>
        </section>

        <section id="acknowledgments">
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">Acknowledgments</h2>
          <p className="italic">None yet — be the first.</p>
        </section>
      </div>
    </main>
  );
}
