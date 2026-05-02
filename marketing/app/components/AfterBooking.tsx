"use client";

import { motion } from "motion/react";

const STEPS = [
  {
    when: "Day 0",
    label: "You book",
    body: "20-minute discovery call. We run a real Jordan interview against one of your live job specs so you can see the output before you commit.",
  },
  {
    when: "Day 3",
    label: "Rubric tuned",
    body: "We translate your hiring rubric into Jordan's structured prompt — must-haves, nice-to-haves, role-specific behavioral questions.",
  },
  {
    when: "Day 7",
    label: "First live interviews",
    body: "Jordan starts taking real applicants on a single role of your choice. You watch the first scored cards land in your dashboard in real time.",
  },
  {
    when: "Day 14",
    label: "Full deploy",
    body: "After you've reviewed the first batch, we expand to all roles. Webhook into your ATS or iframe-embed Jordan into your apply page — your call.",
  },
];

export function AfterBooking() {
  return (
    <section id="onboarding" className="bg-ink text-paper py-24 md:py-32 px-6 md:px-10 border-t border-line/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-violet-400 mb-6">
          Onboarding · 07
        </div>
        <h2 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] max-w-[20ch]">
          What happens after you{" "}
          <span className="font-serif italic font-normal">book.</span>
        </h2>
        <p className="mt-6 text-paper/65 max-w-xl text-[16px] leading-relaxed">
          No 60-day implementation. Your first scored candidates land in the dashboard inside week one — and you don&apos;t replace anyone before you&apos;ve seen Jordan run on your real roles.
        </p>

        <div className="mt-14 relative">
          {/* Vertical timeline rail */}
          <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-line" />

          <div className="space-y-8 md:space-y-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.when}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12 md:pl-16"
              >
                <div className="absolute left-0 top-1.5 w-7 md:w-9 flex justify-center">
                  <span className="block w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper/45">
                  {s.when}
                </div>
                <h3 className="mt-1 font-sans font-semibold text-[18px] md:text-[20px] tracking-[-0.01em]">
                  {s.label}
                </h3>
                <p className="mt-2 text-[14px] md:text-[15px] text-paper/65 leading-relaxed max-w-xl">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
