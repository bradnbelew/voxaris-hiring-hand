"use client";

import { motion } from "motion/react";

const LOG_LINES = [
  { ok: true, time: "14:02:11", who: "Maria · Banquet Server", score: "8.4", routed: "Lisa @ Anchor Hospitality" },
  { ok: true, time: "14:02:43", who: "Devon · Forklift Op", score: "7.1", routed: "Marcus @ GulfWorks" },
  { warn: true, time: "14:03:08", note: "candidate paused — Jordan rephrased question" },
  { ok: true, time: "14:03:51", who: "Aisha · CNA", score: "9.1", routed: "strong-signal queue", strong: true },
  { ok: true, time: "14:04:22", who: "Jose · Banquet Server", score: "8.0", routed: "Lisa @ Anchor Hospitality" },
  { warn: true, time: "14:05:00", note: "Spanish-bilingual flag detected — added to recruiter notes" },
  { ok: true, time: "14:05:48", who: "Tasha · Banquet Server", score: "7.8", routed: "Lisa @ Anchor Hospitality" },
];

const USE_CASES = [
  {
    label: "Staffing agencies",
    headline: "Replace a $60K recruiter without missing a shift fill.",
    body: "Run 24/7 on hospitality, light industrial, and healthcare-support roles. Jordan does first-round, your recruiters close. You take more roles without adding headcount.",
    metric: "3.2x roles per recruiter",
  },
  {
    label: "Mid-market w/ high churn",
    headline: "Fill the front line before they ghost you.",
    body: "Hourly hospitality, retail, and warehouse teams lose candidates to whoever calls back first. Jordan calls back in 60 seconds, regardless of when the application landed.",
    metric: "<60s to first contact",
  },
  {
    label: "Enterprise TA teams",
    headline: "Give your recruiters back the only thing that matters.",
    body: "Stop spending 60% of TA hours on first-round screens. Jordan handles the structured pre-screen, your team focuses on closing top-of-funnel candidates and final-round fit.",
    metric: "60% recruiter time recovered",
  },
];

export function ProofSection() {
  return (
    <section
      id="proof"
      className="relative bg-paper text-ink py-24 md:py-36 px-6 md:px-10 border-t border-paper-2"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink/50 mb-6">
          Proof · 05
        </div>

        <h2 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2rem,5vw,4.25rem)] leading-[1.02] max-w-[20ch]">
          What Jordan is doing{" "}
          <span className="font-serif italic font-normal">right now.</span>
        </h2>

        {/* Stat strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
          {[
            ["23", "Interviews live"],
            ["487", "Roles screened today"],
            ["14m", "Avg time to shortlist"],
            ["47", "Languages supported"],
          ].map(([val, label]) => (
            <div key={label} className="border-l-2 border-accent pl-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-ink/55">
                {label}
              </div>
              <div className="font-sans font-semibold text-3xl md:text-5xl mt-1 text-ink tabular-nums">
                {val}
              </div>
            </div>
          ))}
        </div>

        {/* Live ops terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-ink text-paper rounded-xl p-6 font-mono text-[12px] leading-relaxed shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center justify-between mb-4 text-paper/45">
            <span>$ tail -f hiringhand.live</span>
            <span className="flex items-center gap-2 text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              streaming
            </span>
          </div>
          {LOG_LINES.map((l, i) => (
            <div key={i} className="flex gap-3 py-0.5">
              {l.ok && <span className="text-accent shrink-0">✓</span>}
              {l.warn && <span className="text-paper/55 shrink-0">!</span>}
              <span className="text-paper/40 tabular-nums shrink-0">{l.time}</span>
              {l.who ? (
                <>
                  <span className="text-paper/85">{l.who}</span>
                  <span className="text-paper/40">·</span>
                  <span className="text-paper">scored {l.score}</span>
                  <span className="text-paper/40">→</span>
                  <span className={l.strong ? "text-accent" : "text-paper/65"}>
                    {l.routed}
                  </span>
                </>
              ) : (
                <span className="text-paper/55 italic">{l.note}</span>
              )}
            </div>
          ))}
          <div className="text-paper/30">…</div>
        </motion.div>

        {/* Use cases */}
        <div className="mt-24">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink/50 mb-6">
            Built for · 05b
          </div>
          <h3 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(1.6rem,3.5vw,2.75rem)] leading-tight max-w-[24ch]">
            High-volume hiring is the same problem in three jobs.
          </h3>

          <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
            {USE_CASES.map((u) => (
              <div
                key={u.label}
                className="group relative bg-paper-2 hover:bg-ink hover:text-paper transition-colors duration-500 rounded-xl p-6 md:p-7 border border-paper-3/60 flex flex-col"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink/55 group-hover:text-accent transition-colors">
                  {u.label}
                </div>
                <h4 className="mt-3 font-sans font-semibold text-[18px] md:text-[20px] leading-snug tracking-[-0.01em]">
                  {u.headline}
                </h4>
                <p className="mt-4 text-[14px] text-ink/65 group-hover:text-paper/65 leading-relaxed flex-1">
                  {u.body}
                </p>
                <div className="mt-6 pt-4 border-t border-ink/10 group-hover:border-paper/15 transition-colors">
                  <div className="font-sans font-semibold text-2xl tabular-nums">
                    {u.metric}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
