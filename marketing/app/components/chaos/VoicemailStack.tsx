"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface VoicemailStackProps {
  progress: MotionValue<number>;
  range?: [number, number, number];
}

const VOICEMAILS = [
  { name: "Tasha L.", time: "8:14 AM", role: "Banquet server" },
  { name: "Marco B.", time: "8:42 AM", role: "Forklift op" },
  { name: "Ren K.", time: "9:01 AM", role: "CNA" },
  { name: "Jose D.", time: "9:33 AM", role: "Banquet server" },
  { name: "Aisha P.", time: "10:11 AM", role: "Warehouse" },
  { name: "Devon R.", time: "10:48 AM", role: "Hospitality" },
  { name: "Sara M.", time: "11:24 AM", role: "Banquet server" },
];

interface VMItemProps {
  i: number;
  name: string;
  time: string;
  role: string;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
}

function VMItem({ i, name, time, role, progress, rangeStart, rangeEnd }: VMItemProps) {
  const enter = rangeStart + i * 0.012;
  const opacity = useTransform(progress, [enter, enter + 0.04, rangeEnd, rangeEnd + 0.08], [0, 1, 1, 0.3]);
  const x = useTransform(progress, [enter, enter + 0.04], [-30, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="bg-paper border-l-2 border-alarm/70 px-3 py-1.5 shadow-sm flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-alarm text-xs">●</span>
        <span className="font-mono text-[11px] text-ink-soft tabular-nums">{time}</span>
        <span className="text-[12px] font-medium truncate">{name}</span>
        <span className="text-[11px] text-ink-faint truncate hidden sm:inline">— {role}</span>
      </div>
      <span className="font-mono text-[10px] text-ink-faint shrink-0">0:32</span>
    </motion.div>
  );
}

export function VoicemailStack({ progress, range = [0.32, 0.45, 0.62] }: VoicemailStackProps) {
  const opacity = useTransform(progress, [range[0], range[1], range[2], range[2] + 0.1], [0, 1, 1, 0.3]);
  const y = useTransform(progress, [range[0], range[1]], [30, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-[8%] left-[6%] w-[55%] max-w-[340px]"
    >
      <div className="bg-paper-2/90 border border-ink/15 rounded-md overflow-hidden shadow-xl">
        <div className="px-3 py-1.5 bg-ink/[0.06] flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Voicemail · 7 unread
          </span>
          <span className="font-mono text-[10px] text-alarm">▲ +3 since 9am</span>
        </div>
        <div className="divide-y divide-ink/5">
          {VOICEMAILS.map((vm, i) => (
            <VMItem
              key={i}
              i={i}
              {...vm}
              progress={progress}
              rangeStart={range[0]}
              rangeEnd={range[2]}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
