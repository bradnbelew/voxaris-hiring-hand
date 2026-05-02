"use client";

import { motion } from "motion/react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col bg-ink text-paper overflow-hidden grain"
    >
      {/* Volumetric beam — sits behind everything */}
      <div className="absolute inset-0 beam pointer-events-none" aria-hidden />

      {/* Subtle drifting particle dust */}
      <ParticleField />

      {/* Top label */}
      <div className="absolute top-20 md:top-24 left-6 md:left-10 z-10">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-paper/50">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>An AI hiring agent for high-volume roles</span>
        </div>
      </div>

      {/* Center: the H1 */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-10">
        <div className="max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95]"
          >
            Every applicant.{" "}
            <span className="font-serif italic font-normal text-accent">Interviewed.</span>{" "}
            <span className="font-serif italic font-normal text-accent">Scored.</span>{" "}
            <br className="hidden md:block" />
            On your desk by morning.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="mt-7 max-w-xl text-paper/70 text-[17px] md:text-[18px] leading-relaxed"
          >
            Jordan is an AI video interviewer that screens every applicant the moment they hit submit — structured, EEOC-compliant, video-first. Recruiters wake up to a ranked shortlist with summaries, scores, and decision buttons.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link
              href="/talk"
              className="group inline-flex items-center gap-3 px-6 py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-[14px] font-medium transition shadow-[0_10px_30px_-8px_rgba(124,58,237,0.55)]"
            >
              See a sample interview
              <span className="text-lg group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <Link
              href="#split"
              className="text-[13px] font-mono uppercase tracking-[0.15em] text-paper/60 hover:text-paper transition"
            >
              Or watch the day
            </Link>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-6 max-w-3xl"
          >
            {[
              ["14m", "Avg time to scored shortlist"],
              ["24/7", "Interview window"],
              ["47", "Languages supported"],
              ["100%", "Of applicants reach a screen"],
            ].map(([val, label]) => (
              <div key={label} className="border-l border-line/60 pl-4">
                <div className="font-sans font-semibold text-2xl md:text-3xl text-paper">
                  {val}
                </div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.15em] text-paper/50 leading-tight max-w-[18ch]">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right-side ambient — Jordan presence */}
      <JordanPresence />

      {/* Scroll cue — bottom-center, persistent */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-paper/40 scroll-hint">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <span className="block w-px h-10 bg-paper/40" />
      </div>
    </section>
  );
}

function ParticleField() {
  // 24 deterministic particles using inline styles
  const particles = Array.from({ length: 24 }, (_, i) => {
    const seed = (i * 37) % 100;
    const left = (seed * 7) % 100;
    const delay = (seed * 0.13) % 6;
    const duration = 12 + ((seed * 0.7) % 14);
    const size = 1 + (seed % 3) * 0.4;
    return { left, delay, duration, size, key: i };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.key}
          className="absolute bg-accent/40 rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-2%",
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

function JordanPresence() {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-2/5 pointer-events-none flex items-center justify-center" aria-hidden>
      {/* Soft halo */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[480px] h-[480px] max-w-[80vw] max-h-[80vw]"
      >
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(34, 215, 126, 0.35) 0%, rgba(34, 215, 126, 0.08) 35%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Live waveform — center, bottom of halo */}
      <div className="absolute bottom-[28%] right-[5%] md:right-[8%] flex flex-col items-end gap-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper/50">
          Jordan · live
        </div>
        <div className="flex items-end gap-[3px] h-7">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="block w-[2px] bg-accent rounded-full origin-bottom"
              style={{
                height: `${20 + ((i * 13) % 60)}%`,
                animation: `wave ${0.7 + (i * 0.07) % 0.6}s ease-in-out ${i * 0.04}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
