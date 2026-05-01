"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface RingingPhoneProps {
  progress: MotionValue<number>;
  /** Scroll range during which this vignette is visible: [start, peak, end] */
  range?: [number, number, number];
}

export function RingingPhone({ progress, range = [0, 0.08, 0.4] }: RingingPhoneProps) {
  const opacity = useTransform(progress, [range[0], range[1], range[2], range[2] + 0.1], [0, 1, 1, 0.3]);
  const y = useTransform(progress, [range[0], range[1]], [40, 0]);
  const ringIntensity = useTransform(progress, [range[0], range[1], range[2]], [0, 1, 0.6]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-[12%] left-[8%] w-[42%] max-w-[280px]"
    >
      <div className="relative bg-paper-2 border border-ink/15 rounded-2xl px-4 py-3 shadow-xl">
        <div className="flex items-center gap-3">
          <motion.div
            style={{ scale: ringIntensity }}
            className="w-9 h-9 rounded-full bg-alarm/15 flex items-center justify-center"
          >
            <motion.span
              className="text-alarm text-lg"
              style={{
                animationName: "ring",
                animationDuration: "0.7s",
                animationIterationCount: "infinite",
                display: "inline-block",
              }}
            >
              ☎
            </motion.span>
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-widest text-alarm">
              Incoming · 2 min
            </div>
            <div className="text-sm font-medium text-ink truncate">+1 (407) 555‑0119</div>
            <div className="text-[11px] text-ink-faint">Maria — Banquet server applicant</div>
          </div>
        </div>
        <div className="mt-2 h-1 bg-ink/5 rounded overflow-hidden">
          <motion.div
            style={{ scaleX: ringIntensity, transformOrigin: "left" }}
            className="h-full bg-alarm/60"
          />
        </div>
      </div>
    </motion.div>
  );
}
