"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface InboxOverflowProps {
  progress: MotionValue<number>;
  range?: [number, number, number];
}

const SUBJECTS = [
  "Re: Following up on the banquet role",
  "Re: Re: Following up",
  "Re: Re: Re: Following up",
  "Re: Re: Re: Re: Following up — last try",
  "Final follow-up — please respond",
  "checking in (3rd attempt)",
  "Are you still hiring?",
  "Re: Application — banquet server",
  "FW: Re: Application — banquet server",
  "Re: FW: Re: Application — banquet server",
  "REMINDER: interview today?",
  "moving on",
];

export function InboxOverflow({ progress, range = [0.45, 0.58, 0.7] }: InboxOverflowProps) {
  const opacity = useTransform(
    progress,
    [range[0], range[1], range[2], range[2] + 0.1],
    [0, 1, 1, 0.3]
  );
  const x = useTransform(progress, [range[0], range[1]], [40, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute bottom-[6%] right-[4%] w-[48%] max-w-[300px]"
    >
      <div className="bg-paper border border-ink/15 rounded shadow-xl overflow-hidden">
        <div className="bg-ink/[0.06] px-3 py-1.5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Inbox · candidates
          </span>
          <span className="font-mono text-[10px] text-alarm">2,431 unread</span>
        </div>
        <div className="max-h-[140px] overflow-hidden relative">
          <div className="scrolling-text">
            {[...SUBJECTS, ...SUBJECTS].map((s, i) => (
              <div
                key={i}
                className="px-3 py-1 text-[11px] font-medium text-ink/80 border-b border-ink/5 truncate flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-alarm/80 shrink-0" />
                {s}
              </div>
            ))}
          </div>
          {/* fade gradients */}
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-paper to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-paper to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}
