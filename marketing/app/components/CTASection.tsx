import Link from "next/link";

export function CTASection() {
  return (
    <section
      id="demo"
      className="relative bg-ink text-paper py-32 md:py-44 px-6 md:px-10 border-t border-line/40 overflow-hidden grain"
    >
      {/* Beam */}
      <div className="absolute inset-0 beam pointer-events-none" aria-hidden />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-violet-400 mb-8">
          Two ways to start · 09
        </div>

        <h2 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">
          <span className="font-serif italic font-normal">Stop screening résumés.</span>
          <br />
          Start meeting candidates.
        </h2>

        <p className="mt-8 text-paper/65 text-[16px] md:text-[18px] leading-relaxed max-w-xl mx-auto">
          Sit on the candidate side for 60 seconds and feel what your applicants will feel. Or book a 20-minute demo and we&apos;ll wire Jordan into your hiring pipeline.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/talk"
            className="group inline-flex items-center gap-3 px-7 py-4 border border-paper/30 hover:border-paper hover:bg-paper hover:text-ink rounded-full text-[14px] font-medium transition"
          >
            Talk to Jordan now
            <span className="text-lg">↗</span>
          </Link>
          <Link
            href="mailto:hello@hiringhand.io?subject=Hiring%20Hand%20demo"
            className="group inline-flex items-center gap-3 px-7 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-[14px] font-medium transition shadow-[0_15px_40px_-10px_rgba(124,58,237,0.55)]"
          >
            Book a 20-min demo
            <span className="text-lg group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        <div className="mt-6 text-[10px] font-mono uppercase tracking-[0.2em] text-paper/35">
          Cal.com booking — coming soon
        </div>
      </div>
    </section>
  );
}
