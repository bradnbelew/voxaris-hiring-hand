"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform } from "motion/react";
import { ChaosColumn } from "./ChaosColumn";
import { JordanColumn } from "./JordanColumn";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress through the section. Section is 4x viewport tall;
  // sticky inner stays fixed while we drive animations from progress 0..1.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Subtle parallax of a center divider that thickens as you scroll
  const dividerWidth = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Mobile: stacked vertically. Desktop: horizontal split. */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="hidden md:block h-full">
            <ChaosColumn progress={scrollYProgress} />
          </div>
          <div className="hidden md:block h-full">
            <JordanColumn progress={scrollYProgress} />
          </div>

          {/* Mobile fallback: stacked */}
          <div className="md:hidden h-1/2">
            <ChaosColumn progress={scrollYProgress} />
          </div>
          <div className="md:hidden h-1/2">
            <JordanColumn progress={scrollYProgress} />
          </div>
        </div>

        {/* Center seam — animated */}
        <motion.div
          style={{ scaleX: dividerWidth }}
          className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-ink/20 origin-center"
        />

        {/* Scroll cue — only visible at very top */}
        <ScrollCue progress={scrollYProgress} />
      </div>
    </section>
  );
}

function ScrollCue({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(progress, [0, 0.05], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-ink-faint"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
        Scroll
      </span>
      <span className="w-px h-8 bg-ink-faint animate-pulse" />
    </motion.div>
  );
}
