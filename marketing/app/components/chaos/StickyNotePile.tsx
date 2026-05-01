"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface StickyNotePileProps {
  progress: MotionValue<number>;
  range?: [number, number, number];
}

interface Note {
  text: string;
  color: string;
  rot: number;
  x: number;
  y: number;
}

const NOTES: Note[] = [
  { text: "Call back Maria", color: "bg-canary", rot: -6, x: -8, y: 0 },
  { text: "Follow up Tues", color: "bg-amber/80", rot: 4, x: 12, y: -10 },
  { text: "Reject ATS pile", color: "bg-canary", rot: -2, x: -4, y: -22 },
  { text: "5pm — Jose call", color: "bg-amber/80", rot: 8, x: 18, y: -34 },
  { text: "Did we EVER hear back from Tasha??", color: "bg-canary", rot: -4, x: -12, y: -48 },
  { text: "Reschedule — AGAIN", color: "bg-alarm/30", rot: 10, x: 6, y: -64 },
  { text: "Email recruiter intake", color: "bg-amber/80", rot: -8, x: -16, y: -82 },
  { text: "WHO has been reviewed?", color: "bg-canary", rot: 5, x: 14, y: -98 },
];

interface StickyNoteProps {
  note: Note;
  progress: MotionValue<number>;
  enterStart: number;
}

function StickyNote({ note, progress, enterStart }: StickyNoteProps) {
  const opacity = useTransform(progress, [enterStart, enterStart + 0.04], [0, 1]);
  const scale = useTransform(progress, [enterStart, enterStart + 0.04], [0.6, 1]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        rotate: note.rot,
        x: note.x,
        y: note.y,
      }}
      className={`absolute inset-x-0 top-0 ${note.color} px-3 py-2 shadow-md w-[180px] text-[12px] font-medium text-ink/85 rounded-sm`}
    >
      {note.text}
    </motion.div>
  );
}

export function StickyNotePile({ progress, range = [0.05, 0.18, 0.5] }: StickyNotePileProps) {
  const containerOpacity = useTransform(
    progress,
    [range[0], range[1], range[2], range[2] + 0.1],
    [0, 1, 1, 0.3]
  );

  return (
    <motion.div
      style={{ opacity: containerOpacity }}
      className="absolute top-[42%] left-[15%] w-[60%] max-w-[320px]"
    >
      <div className="relative">
        {NOTES.map((note, i) => (
          <StickyNote
            key={i}
            note={note}
            progress={progress}
            enterStart={range[0] + i * 0.015}
          />
        ))}
      </div>
    </motion.div>
  );
}
