"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { RingingPhone } from "./chaos/RingingPhone";
import { StickyNotePile } from "./chaos/StickyNotePile";
import { CalendarReshuffle } from "./chaos/CalendarReshuffle";
import { VoicemailStack } from "./chaos/VoicemailStack";
import { InboxOverflow } from "./chaos/InboxOverflow";

interface ChaosColumnProps {
  progress: MotionValue<number>;
}

export function ChaosColumn({ progress }: ChaosColumnProps) {
  // Color drain: full saturation early, gradually desaturate, fade
  const saturate = useTransform(progress, [0, 0.6, 0.95], [1.05, 0.7, 0]);
  const brightness = useTransform(progress, [0, 0.6, 0.95], [1, 0.95, 1.15]);
  const filter = useTransform(
    [saturate, brightness],
    ([s, b]: number[]) => `saturate(${s}) brightness(${b})`
  );
  const overlayOpacity = useTransform(progress, [0, 0.55, 0.95], [0, 0.4, 0.85]);

  return (
    <motion.div
      style={{ filter }}
      className="relative h-full bg-paper paper-grain overflow-hidden"
    >
      {/* Faint chaos label — top left */}
      <div className="absolute top-6 left-6 z-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          The way it works now
        </div>
        <div className="font-serif italic text-3xl md:text-4xl mt-1 text-ink leading-tight max-w-[16ch]">
          One recruiter. <br />
          Three thousand <br /> resumes.
        </div>
      </div>

      {/* Vignettes */}
      <RingingPhone progress={progress} />
      <StickyNotePile progress={progress} />
      <CalendarReshuffle progress={progress} />
      <VoicemailStack progress={progress} />
      <InboxOverflow progress={progress} />

      {/* Drain overlay — washes the whole side gray as you scroll */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-paper-2 pointer-events-none"
      />

      {/* Final state caption — appears late */}
      <FinalCaption progress={progress} />
    </motion.div>
  );
}

function FinalCaption({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.85, 0.97], [0, 1]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-x-6 bottom-6 z-20 pointer-events-none"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
        Recruiter, 11:47 PM
      </div>
      <div className="font-serif italic text-2xl md:text-3xl mt-1 text-ink-soft leading-tight max-w-[22ch]">
        Still 142 candidates left. <br /> She gives up and goes home.
      </div>
    </motion.div>
  );
}
