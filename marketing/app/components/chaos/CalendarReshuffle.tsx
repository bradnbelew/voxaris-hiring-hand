"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface CalendarReshuffleProps {
  progress: MotionValue<number>;
  range?: [number, number, number];
}

const DAYS = ["MON", "TUE", "WED", "THU", "FRI"];
const HOURS = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];

// Pre-defined "reshuffles" — each step shows a different layout of busy slots
const SCHEDULES = [
  // step 0 — light
  [[0, 0], [2, 1], [4, 3]],
  // step 1 — busier
  [[0, 0], [0, 1], [1, 2], [2, 3], [3, 0], [4, 4]],
  // step 2 — even more
  [[0, 0], [0, 1], [0, 5], [1, 2], [1, 3], [2, 1], [2, 3], [3, 0], [3, 4], [4, 2], [4, 5]],
  // step 3 — disaster
  [[0, 0], [0, 1], [0, 2], [0, 5], [1, 1], [1, 2], [1, 3], [1, 6], [2, 1], [2, 3], [2, 4], [3, 0], [3, 2], [3, 4], [3, 5], [4, 1], [4, 2], [4, 4], [4, 5], [4, 7]],
];

export function CalendarReshuffle({ progress, range = [0.18, 0.32, 0.55] }: CalendarReshuffleProps) {
  const opacity = useTransform(
    progress,
    [range[0], range[1], range[2], range[2] + 0.1],
    [0, 1, 1, 0.3]
  );
  const x = useTransform(progress, [range[0], range[1]], [40, 0]);

  // step picker — discretized 0..3 across the range
  const stepRaw = useTransform(progress, [range[0], range[2]], [0, 3.99]);

  // Build all unique cells across all schedules; render each once with an animated visibility
  const allCells: string[] = Array.from(
    new Set(SCHEDULES.flatMap((s) => s.map(([c, r]) => `${c}-${r}`)))
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute top-[8%] right-[6%] w-[44%] max-w-[280px]"
    >
      <div className="bg-paper-2 border border-ink/15 rounded-lg p-3 shadow-xl">
        <div className="flex items-baseline justify-between mb-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Recruiter calendar
          </div>
          <motion.div
            className="font-mono text-[10px] text-alarm"
            initial={false}
          >
            ⚠ rescheduled
          </motion.div>
        </div>
        <div className="grid grid-cols-5 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-[9px] font-mono text-ink-faint text-center">
              {d}
            </div>
          ))}
        </div>
        <div className="relative grid grid-cols-5 grid-rows-9 h-[160px] bg-ink/[0.04] rounded">
          {allCells.map((cell) => {
            const [c, r] = cell.split("-").map(Number);
            return <CalendarBlock key={cell} col={c} row={r} stepValue={stepRaw} />;
          })}
        </div>
      </div>
    </motion.div>
  );
}

function CalendarBlock({
  col,
  row,
  stepValue,
}: {
  col: number;
  row: number;
  stepValue: MotionValue<number>;
}) {
  // Compute visibility per step
  const visibilityArray = SCHEDULES.map((s) =>
    s.some(([c, r]) => c === col && r === row) ? 1 : 0
  );
  // visibilityArray[0..3] — useTransform with stops at 0..3 to interpolate
  const opacity = useTransform(
    stepValue,
    [0, 1, 2, 3],
    visibilityArray
  );
  const scale = useTransform(stepValue, [0, 1, 2, 3], visibilityArray.map((v) => (v ? 1 : 0.5)));

  return (
    <motion.div
      style={{
        opacity,
        scale,
        left: `calc(${(col / DAYS.length) * 100}% + 2px)`,
        top: `calc(${(row / HOURS.length) * 100}% + 2px)`,
        width: `calc(${100 / DAYS.length}% - 4px)`,
        height: `calc(${100 / HOURS.length}% - 4px)`,
      }}
      className="absolute bg-alarm/85 rounded-[2px]"
    />
  );
}
