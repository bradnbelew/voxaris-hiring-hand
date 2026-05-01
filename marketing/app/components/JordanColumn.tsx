"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface JordanColumnProps {
  progress: MotionValue<number>;
}

export function JordanColumn({ progress }: JordanColumnProps) {
  // Right side stays calm; just becomes more present (brighter, less vignette) as scroll progresses
  const presence = useTransform(progress, [0, 0.7], [0.55, 1]);
  const vignette = useTransform(progress, [0, 0.7], [1, 0.4]);
  const haloScale = useTransform(progress, [0, 0.6, 1], [0.9, 1.1, 1.2]);
  const haloOpacity = useTransform(progress, [0, 0.5, 1], [0.2, 0.45, 0.6]);
  const captionOpacity = useTransform(progress, [0.7, 0.92], [0, 1]);
  const brightnessFilter = useTransform(presence, (p) => `brightness(${p})`);

  return (
    <motion.div
      style={{ filter: brightnessFilter }}
      className="relative h-full bg-jordan-bg overflow-hidden flex items-center justify-center"
    >
      {/* Soft radial halo behind Jordan */}
      <motion.div
        style={{ scale: haloScale, opacity: haloOpacity }}
        className="absolute w-[70%] aspect-square rounded-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, var(--color-jordan-glow) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Placeholder Jordan avatar — breathing */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.015, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden ring-1 ring-white/10 shadow-[0_0_80px_rgba(207,214,230,0.15)]"
        >
          {/* Faux face — soft gradient. Will be replaced with Tavus loop. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, #3a4258 0%, #1f2330 55%, #14171f 100%)",
            }}
          />
          {/* Subtle eye highlights */}
          <div className="absolute inset-0 flex items-center justify-center gap-6 mt-[-12%]">
            <span className="w-2 h-2 rounded-full bg-jordan-glow/70" />
            <span className="w-2 h-2 rounded-full bg-jordan-glow/70" />
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <div className="font-serif italic text-2xl md:text-3xl text-jordan-glow">
            Jordan
          </div>
          <div className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-jordan-glow/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Ready · interviewing 23 globally
          </div>
        </div>
      </div>

      {/* Vignette overlay */}
      <motion.div
        style={{ opacity: vignette }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </motion.div>

      {/* Caption — appears late */}
      <motion.div
        style={{ opacity: captionOpacity }}
        className="absolute inset-x-8 bottom-8 text-jordan-glow"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">
          The way it works with Hiring Hand
        </div>
        <div className="font-serif italic text-3xl md:text-4xl mt-1 leading-tight max-w-[18ch]">
          One Jordan. <br />
          Every candidate, <br /> face to face.
        </div>
      </motion.div>
    </motion.div>
  );
}
