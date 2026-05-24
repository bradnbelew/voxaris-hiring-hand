import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies & Tracking | Voxaris",
  description:
    "What cookies Voxaris uses, how to decline analytics, and how we honor Do Not Track / Global Privacy Control.",
  alternates: { canonical: "https://voxaris.io/cookies" },
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24 text-neutral-800">
      <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-3">Legal</p>
      <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6">Cookies &amp; Tracking</h1>
      <p className="text-sm text-neutral-500 mb-10">
        Last updated: <time dateTime="2026-05-24">May 24, 2026</time>
      </p>

      <div className="space-y-8 text-[15px] leading-relaxed text-neutral-700">
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">What we use</h2>
          <p className="mb-3">
            <strong>Strictly-necessary.</strong> A session cookie keeps you logged
            in when you sign into a Voxaris customer dashboard.
          </p>
          <p className="mb-3">
            <strong>Analytics.</strong> Voxaris uses Google Analytics (GA4) to
            understand aggregate site traffic. We do not enable Google Signals,
            Demographics, or Interest reporting.
          </p>
          <p>
            <strong>No advertising cookies.</strong> No remarketing pixels (Meta,
            TikTok, LinkedIn), display-ads tracking, or cross-site behavioral
            profiling.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">Your choices</h2>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Block <code>googletagmanager.com</code> + <code>google-analytics.com</code> in your browser to decline analytics.</li>
            <li>We honor <code>Sec-GPC: 1</code> and the legacy DNT header — when either is set, GA4 is not loaded.</li>
            <li>Clear cookies for the relevant Voxaris domain in your browser settings.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">Subprocessors</h2>
          <p>
            See <a className="text-rose-700 hover:underline" href="https://voxaris.io/security">voxaris.io/security</a> for
            the full subprocessor list.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">Contact</h2>
          <p>
            Questions: <a className="text-rose-700 hover:underline" href="mailto:admin@voxaris.io">admin@voxaris.io</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
