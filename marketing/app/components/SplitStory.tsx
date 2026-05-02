"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { Phone, PhoneMissed, Mail, Calendar, CheckCircle, CheckCircle2, CheckCheck, Inbox, TrendingUp, Users, X, Pause, Play } from "lucide-react";

const APPLICANTS = 50;
const SCENE_DURATION = 5500; // ms per scene

type Scene = {
  time: string;
  title: string;
  isFinale: boolean;
  // Headline metrics — these ARE the story
  recruiterTime: string;       // hh:mm — wall-clock time the human spent
  recruiterScreened: number;   // candidates actually screened
  aiInterviewed: number;       // candidates Jordan completed
  // The anchoring detail under each big stat
  leftFact: string;
  rightFact: string;
  // Right side highlight — the named candidate moment
  showSandraScheduled: boolean;
};

const SCENES: Scene[] = [
  {
    time: "9:00 AM",
    title: "Same 50 applications. Two completely different days.",
    recruiterTime: "0:00",
    recruiterScreened: 0,
    aiInterviewed: 2,
    leftFact: "Hasn't opened the first résumé yet.",
    rightFact: "Jordan picked up the first 2 in parallel — 60 seconds each.",
    showSandraScheduled: false,
    isFinale: false,
  },
  {
    time: "10:00 AM",
    title: "After one hour: the recruiter has done one phone screen. Jordan has interviewed 18.",
    recruiterTime: "0:45",
    recruiterScreened: 1,
    aiInterviewed: 18,
    leftFact: "1 phone screen done. 6 voicemails out, none returned.",
    rightFact: "18 interviewed and scored. Top 3 already on the shortlist.",
    showSandraScheduled: false,
    isFinale: false,
  },
  {
    time: "11:00 AM",
    title:
      "Sandra Mills is your top F&I candidate. The recruiter just left her a voicemail. Jordan booked her with Lisa an hour ago.",
    recruiterTime: "1:30",
    recruiterScreened: 2,
    aiInterviewed: 32,
    leftFact: "Voicemail #1 → Sandra Mills · 9:14 AM. No callback.",
    rightFact: "Sandra Mills · score 9.4 · scheduled with Lisa @ 11:00 ✓",
    showSandraScheduled: true,
    isFinale: false,
  },
  {
    time: "5:00 PM",
    title:
      "End of day. The recruiter spent 5+ hours screening 5 candidates. Jordan handled all 50 in zero of your time.",
    recruiterTime: "5:30",
    recruiterScreened: 5,
    aiInterviewed: APPLICANTS,
    leftFact: "5 phone screens. ~3 top candidates lost to competing offers.",
    rightFact: "50 / 50 interviewed · 12 ranked · 4 on Lisa's calendar.",
    showSandraScheduled: true,
    isFinale: false,
  },
  {
    time: "Tomorrow, 9:00 AM",
    title: "Your desk now looks like this.",
    recruiterTime: "5:30",
    recruiterScreened: 5,
    aiInterviewed: APPLICANTS,
    leftFact: "",
    rightFact: "",
    showSandraScheduled: true,
    isFinale: true,
  },
];

export function SplitStory() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Single continuous progress value 0..1 across the full cycle
  const cycleProgress = useMotionValue(0);
  const totalDuration = SCENE_DURATION * SCENES.length; // ms

  useAnimationFrame((_, delta) => {
    if (paused || hovered) return;
    const cur = cycleProgress.get();
    const next = (cur * totalDuration + delta) % totalDuration / totalDuration;
    cycleProgress.set(next);
  });

  // Derive sceneIdx from progress so visuals stay in sync with the bar
  useMotionValueEvent(cycleProgress, "change", (v) => {
    const idx = Math.min(SCENES.length - 1, Math.floor(v * SCENES.length));
    setSceneIdx((prev) => (prev === idx ? prev : idx));
  });

  const handleSceneJump = (i: number) => {
    cycleProgress.set(i / SCENES.length + 0.0001);
    setSceneIdx(i);
  };

  const scene = SCENES[sceneIdx];

  return (
    <section
      id="split"
      className="relative bg-ink text-paper overflow-hidden"
      style={{ height: "min(940px, 100vh)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="relative z-30 px-6 md:px-10 pt-10 md:pt-12 pb-2 flex flex-col items-center text-center gap-1.5">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-violet-400">
            Prestige Auto Group · 5 open roles · {APPLICANTS} applicants
          </div>
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={sceneIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="font-sans font-semibold text-[26px] md:text-[32px] tabular-nums text-paper leading-none"
              >
                {scene.time}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Caption */}
        <div className="relative z-30 px-6 md:px-10 pb-3 md:pb-4 min-h-[80px] md:min-h-[90px] flex items-start">
          <div className="max-w-4xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.h2
                key={sceneIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
                className="font-sans font-semibold tracking-[-0.02em] text-[clamp(1.15rem,2.2vw,1.75rem)] leading-[1.2] text-paper text-center"
              >
                {scene.title.split(/(\bSandra\b|\b287\b|\b9\b|\bJordan\b|\b18\b|\b22\b|\b6\b|\bPrestige Auto Group\b)/g).map((part, i) =>
                  ["Sandra", "Jordan", "287", "18", "9", "22", "6", "Prestige Auto Group"].includes(part) ? (
                    <span key={i} className="text-accent">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

        {/* Stage — split desks or finale */}
        <div className="relative flex-1 mx-px">
          <AnimatePresence>
            {!scene.isFinale && (
              <motion.div
                key="split"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 grid grid-cols-2 gap-px bg-line/30"
              >
                <LeftDesk scene={scene} sceneIdx={sceneIdx} />
                <RightDesk scene={scene} sceneIdx={sceneIdx} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {scene.isFinale && (
              <motion.div
                key="finale"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center px-6"
              >
                <FinaleDashboard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer — scene dots + autoplay progress */}
        <SceneFooter
          sceneIdx={sceneIdx}
          onJump={handleSceneJump}
          paused={paused}
          hovered={hovered}
          setPaused={setPaused}
          cycleProgress={cycleProgress}
        />
      </div>
    </section>
  );
}

/* ============================================================ */
/*  SCENE FOOTER                                                 */
/* ============================================================ */

function SceneFooter({
  sceneIdx,
  onJump,
  paused,
  hovered,
  setPaused,
  cycleProgress,
}: {
  sceneIdx: number;
  onJump: (i: number) => void;
  paused: boolean;
  hovered: boolean;
  setPaused: (b: boolean) => void;
  cycleProgress: import("motion/react").MotionValue<number>;
}) {
  const widthPct = useTransform(cycleProgress, (v) => `${v * 100}%`);
  const isStopped = paused || hovered;

  return (
    <div className="relative z-30 h-[88px] px-5 md:px-10 flex items-center justify-center gap-6 border-t border-violet-500/30 bg-ink/95 backdrop-blur">
      {/* Play / pause button — prominent */}
      <button
        onClick={() => setPaused(!paused)}
        className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700 transition shadow-[0_0_24px_rgba(124,58,237,0.45)]"
        aria-label={paused ? "Resume" : "Pause"}
      >
        {paused ? <Play className="w-5 h-5 ml-0.5" fill="currentColor" /> : <Pause className="w-5 h-5" fill="currentColor" />}
      </button>

      {/* Continuous progress bar with checkpoint markers — the centerpiece */}
      <div className="flex-1 max-w-[760px] mx-auto">
        <div className="relative h-12 flex items-center">
          {/* Track */}
          <div className="absolute inset-x-0 h-[3px] bg-line rounded-full" />
          {/* Continuous fill */}
          <motion.div
            className="absolute left-0 h-[3px] rounded-full bg-violet-500"
            style={{ width: widthPct }}
          />

          {/* Checkpoint markers */}
          {SCENES.map((s, i) => {
            const pos = (i / SCENES.length) * 100;
            const reached = sceneIdx >= i;
            return (
              <button
                key={i}
                onClick={() => onJump(i)}
                style={{ left: `${pos}%` }}
                className="group absolute -translate-x-1/2 flex flex-col items-center gap-1.5"
                aria-label={`Jump to ${s.time}`}
              >
                <span
                  className={`block w-2.5 h-2.5 rounded-full transition-all ${
                    i === sceneIdx
                      ? "bg-violet-500 ring-2 ring-violet-500/30 scale-125"
                      : reached
                        ? "bg-violet-500/70"
                        : "bg-line group-hover:bg-paper/30"
                  }`}
                />
                <span
                  className={`text-[10px] font-mono uppercase tracking-[0.15em] transition whitespace-nowrap ${
                    i === sceneIdx
                      ? "text-paper font-semibold"
                      : "text-paper/40 group-hover:text-paper/65"
                  }`}
                >
                  {s.time}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Status — minimal, right-aligned */}
      <div className="shrink-0 hidden lg:flex flex-col items-end gap-0.5">
        <div className={`text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-1.5 ${isStopped ? "text-paper/55" : "text-violet-300"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isStopped ? "bg-paper/40" : "bg-violet-400 animate-pulse"}`} />
          {isStopped ? (paused ? "Paused" : "Hovered") : "Auto-playing"}
        </div>
        <div className="text-[9px] font-mono uppercase tracking-[0.15em] text-paper/40">
          Scene {sceneIdx + 1} / {SCENES.length} · click to jump
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  LEFT PANEL — manual recruiter stats (clean, big numbers)     */
/* ============================================================ */

function LeftDesk({ scene }: { scene: Scene; sceneIdx: number }) {
  return (
    <div
      className="relative overflow-hidden flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 30% 30%, rgba(245, 158, 11, 0.06) 0%, transparent 60%), linear-gradient(160deg, #1a1410 0%, #0f0c08 60%, #0a0805 100%)",
      }}
    >
      <PanelChrome
        side="left"
        title="Manual recruiter"
        subtitle="One person, one inbox, one phone."
      />

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-10 gap-7 md:gap-9">
        <ProgressRing
          value={scene.recruiterScreened}
          total={APPLICANTS}
          label="screened"
          tone="warn"
        />

        <TimeStat
          value={scene.recruiterTime}
          label="hours of your team's time"
          tone="warn"
        />

        <FactLine text={scene.leftFact} tone="warn" />
      </div>
    </div>
  );
}

/* ============================================================ */
/*  RIGHT PANEL — Hiring Hand pipeline (clean, big numbers)      */
/* ============================================================ */

function RightDesk({ scene }: { scene: Scene; sceneIdx: number }) {
  return (
    <div
      className="relative overflow-hidden flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 25%, rgba(34, 215, 126, 0.07) 0%, transparent 60%), linear-gradient(160deg, #0d1110 0%, #08100c 60%, #050a07 100%)",
      }}
    >
      <PanelChrome
        side="right"
        title="Hiring Hand"
        subtitle="Jordan + your recruiter."
        live
      />

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-10 gap-7 md:gap-9">
        <ProgressRing
          value={scene.aiInterviewed}
          total={APPLICANTS}
          label="interviewed & scored"
          tone="success"
        />

        <TimeStat
          value="0:00"
          label="of your team's time"
          tone="success"
        />

        <FactLine text={scene.rightFact} tone="success" />
      </div>
    </div>
  );
}

/* ============================================================ */
/*  SHARED PIECES                                                */
/* ============================================================ */

function PanelChrome({
  side,
  title,
  subtitle,
  live,
}: {
  side: "left" | "right";
  title: string;
  subtitle: string;
  live?: boolean;
}) {
  const isRight = side === "right";
  return (
    <div className="relative z-10 px-6 md:px-10 pt-5 pb-3 flex items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            isRight
              ? "bg-accent shadow-[0_0_10px_var(--color-accent)] animate-pulse"
              : "bg-amber-500/70 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
          }`}
        />
        <div>
          <div
            className={`text-[10px] font-mono uppercase tracking-[0.22em] leading-none ${
              isRight ? "text-accent" : "text-amber-400/80"
            }`}
          >
            {title}
          </div>
          <div className="text-[11px] font-sans text-paper/55 mt-1 leading-tight">
            {subtitle}
          </div>
        </div>
      </div>
      {live && (
        <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-accent/80 flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
          live
        </div>
      )}
    </div>
  );
}

function ProgressRing({
  value,
  total,
  label,
  tone,
}: {
  value: number;
  total: number;
  label: string;
  tone: "warn" | "success";
}) {
  const targetFraction = Math.max(0, Math.min(1, value / total));
  const fraction = useMotionValue(0);

  useEffect(() => {
    const controls = animate(fraction, targetFraction, {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [targetFraction, fraction]);

  const counter = useMotionValue(0);
  const counterDisplay = useTransform(counter, (v) => Math.round(v).toString());

  useEffect(() => {
    const controls = animate(counter, value, { duration: 1.0, ease: "easeOut" });
    return () => controls.stop();
  }, [value, counter]);

  const r = 90;
  const c = 2 * Math.PI * r;
  const dashOffset = useTransform(fraction, (f) => c * (1 - f));

  const stroke = tone === "success" ? "var(--color-accent)" : "#f59e0b";
  const numberColor = tone === "success" ? "text-paper" : "text-amber-200";
  const labelColor = tone === "success" ? "text-paper/55" : "text-amber-300/65";

  return (
    <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="6"
          opacity="0.4"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          style={{ strokeDashoffset: dashOffset }}
          filter={tone === "success" ? "drop-shadow(0 0 6px rgba(34,215,126,0.5))" : "drop-shadow(0 0 6px rgba(245,158,11,0.4))"}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline gap-1">
          <motion.div className={`font-sans font-bold text-[64px] md:text-[80px] tabular-nums leading-none ${numberColor}`}>
            {counterDisplay}
          </motion.div>
          <div className={`text-[20px] md:text-[24px] font-mono ${labelColor}`}>
            /{total}
          </div>
        </div>
        <div className={`mt-2 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] ${labelColor}`}>
          {label}
        </div>
      </div>
    </div>
  );
}

function TimeStat({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: "warn" | "success";
}) {
  const numberColor = tone === "success" ? "text-accent" : "text-amber-300";
  const labelColor = tone === "success" ? "text-paper/55" : "text-amber-300/55";

  return (
    <div className="flex flex-col items-center text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className={`font-sans font-semibold text-[44px] md:text-[56px] tabular-nums leading-none ${numberColor}`}
        >
          {value}
        </motion.div>
      </AnimatePresence>
      <div className={`mt-1.5 text-[11px] font-mono uppercase tracking-[0.18em] ${labelColor}`}>
        {label}
      </div>
    </div>
  );
}

function FactLine({ text, tone }: { text: string; tone: "warn" | "success" }) {
  if (!text) return null;
  const color =
    tone === "success"
      ? "text-paper/85 border-accent/40"
      : "text-amber-100/85 border-amber-700/40";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.4 }}
        className={`max-w-[28ch] text-center text-[13px] md:text-[14px] leading-relaxed border-t-2 pt-3 ${color}`}
      >
        {text}
      </motion.div>
    </AnimatePresence>
  );
}

function MissedSignals({ scene }: { scene: Scene }) {
  const lost = scene.recruiterTime === "5:30" ? 3 : scene.recruiterTime === "1:30" ? 1 : 0;
  const voicemails =
    scene.recruiterTime === "0:00" ? 0 :
    scene.recruiterTime === "0:45" ? 6 :
    scene.recruiterTime === "1:30" ? 11 : 17;
  const unread =
    scene.recruiterTime === "0:00" ? 12 :
    scene.recruiterTime === "0:45" ? 28 :
    scene.recruiterTime === "1:30" ? 41 : 50;

  return (
    <div className="relative z-10 px-6 md:px-10 pb-5 pt-3 flex items-center justify-around gap-2 border-t border-amber-700/20">
      <SmallStat icon="✉" label="unread" value={unread} />
      <SmallStat icon="☎" label="voicemails" value={voicemails} />
      <SmallStat icon="✕" label="lost to competitors" value={lost} emphasized={lost > 0} />
    </div>
  );
}

function SmallStat({
  icon,
  label,
  value,
  emphasized,
}: {
  icon: string;
  label: string;
  value: number;
  emphasized?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 min-w-0">
      <div className="flex items-baseline gap-1.5">
        <span className="text-[11px] opacity-60" aria-hidden>{icon}</span>
        <span
          className={`font-sans font-semibold tabular-nums text-[18px] leading-none ${
            emphasized ? "text-amber-200" : "text-amber-200/75"
          }`}
        >
          {value}
        </span>
      </div>
      <div className="text-[9px] font-mono uppercase tracking-[0.15em] text-amber-300/45">
        {label}
      </div>
    </div>
  );
}

function SandraScheduledCard({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-[18%] right-5 md:right-8 z-20 w-[210px] bg-ink-2/85 backdrop-blur-sm border border-accent/45 rounded-lg p-3 shadow-[0_15px_30px_-10px_rgba(34,215,126,0.3)]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-accent flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
              Strong signal
            </div>
            <span className="text-[10px] font-mono text-paper/45">9:32</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-center w-[44px] shrink-0">
              <div className="text-[22px] font-sans font-bold leading-none text-accent">
                94
              </div>
              <div className="text-[8px] font-mono text-paper/40">/100</div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-sans font-semibold text-paper truncate">
                Sandra Mills
              </div>
              <div className="text-[10px] font-mono text-paper/45 uppercase tracking-[0.1em]">
                F&I Manager
              </div>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-line/60 flex items-center justify-between text-[10px] font-mono">
            <span className="text-accent uppercase tracking-[0.12em]">Lisa @ 11:00</span>
            <Calendar className="w-3 h-3 text-accent/70" strokeWidth={2} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function JordanLiveTile({ aiInterviewed }: { aiInterviewed: number }) {
  if (aiInterviewed === 0) return null;
  return (
    <div className="absolute bottom-5 left-5 md:left-8 z-20 flex items-center gap-2.5 px-3 py-2 bg-ink-2/85 backdrop-blur-sm border border-line/60 rounded-lg shadow-[0_10px_20px_-6px_rgba(0,0,0,0.6)]">
      <div className="relative shrink-0">
        <div
          className="w-8 h-8 rounded-full"
          style={{
            background: "linear-gradient(135deg, #2dd87e 0%, #1a8d4e 100%)",
            boxShadow: "0 0 12px rgba(34,215,126,0.5)",
          }}
        />
        <span
          className="absolute inset-0 rounded-full border border-accent/60"
          style={{ animation: "ring-wave 2s ease-out infinite" }}
        />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
          Jordan · interviewing
        </div>
        <div className="flex items-end gap-[2px] mt-1 h-3">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <span
              key={i}
              className="block w-[2px] bg-accent rounded-full origin-bottom"
              style={{
                height: `${30 + ((i * 17) % 60)}%`,
                animation: `wave ${0.7 + i * 0.08}s ease-in-out ${i * 0.04}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* === TIME BADGE — the headline contrast metric === */
function TimeBadge({
  side,
  label,
  value,
  screened,
}: {
  side: "left" | "right";
  label: string;
  value: string;
  screened: number;
}) {
  const isLeft = side === "left";

  return (
    <div className="absolute top-[44px] right-5 z-30">
      <div
        className={`px-4 py-3 rounded-lg backdrop-blur-sm shadow-[0_10px_25px_-6px_rgba(0,0,0,0.6)] ${
          isLeft
            ? "bg-[#221208]/90 border border-amber-700/45 shadow-[0_0_24px_-10px_rgba(245,158,11,0.35)]"
            : "bg-[#0a1814]/90 border border-accent/45 shadow-[0_0_24px_-8px_rgba(34,215,126,0.3)]"
        }`}
      >
        <div
          className={`text-[9px] font-mono uppercase tracking-[0.18em] text-right ${
            isLeft ? "text-amber-300/85" : "text-accent"
          }`}
        >
          {label}
        </div>
        <div className="flex items-baseline justify-end gap-1 mt-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className={`font-sans font-semibold text-[36px] md:text-[42px] tabular-nums leading-none ${
                isLeft ? "text-amber-200" : "text-accent"
              }`}
            >
              {value}
            </motion.div>
          </AnimatePresence>
          <span
            className={`text-[11px] font-mono uppercase tracking-[0.15em] ${
              isLeft ? "text-amber-300/55" : "text-accent/70"
            }`}
          >
            hrs
          </span>
        </div>
        <div
          className={`mt-1.5 pt-1.5 border-t text-right text-[10px] font-mono uppercase tracking-[0.12em] ${
            isLeft ? "border-amber-700/30 text-amber-200/65" : "border-accent/25 text-paper/75"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={screened}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="tabular-nums"
            >
              {screened}
            </motion.span>
          </AnimatePresence>
          <span className={isLeft ? "text-amber-300/40" : "text-paper/45"}>
            {" "}/ {APPLICANTS} screened
          </span>
        </div>
      </div>
    </div>
  );
}

function JordanCall({ interviewN, sceneIdx }: { interviewN: number; sceneIdx: number }) {
  const candidates = ["Sandra Mills · F&I", "Marcus Williams · Sales", "Rachel Thompson · Service", "Kevin Park · F&I"];
  const candidateName = candidates[Math.min(sceneIdx, candidates.length - 1)];

  const counter = useMotionValue(0);
  const counterDisplay = useTransform(counter, (v) => `Interview #${Math.round(v)}`);

  useEffect(() => {
    const controls = animate(counter, interviewN, { duration: 0.9, ease: "easeOut" });
    return () => controls.stop();
  }, [interviewN, counter]);

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      <div
        className="rounded-t-lg p-2.5"
        style={{
          background: "linear-gradient(180deg, #1c1d22 0%, #2a2c33 100%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 30px 60px -20px rgba(0,0,0,0.7)",
        }}
      >
        <div className="bg-ink-2 rounded-md overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-line/60">
            <span className="w-2 h-2 rounded-full bg-paper/15" />
            <span className="w-2 h-2 rounded-full bg-paper/15" />
            <span className="w-2 h-2 rounded-full bg-paper/15" />
            <span className="ml-2 text-[10px] font-mono text-paper/40 truncate flex-1">
              <motion.span>{counterDisplay}</motion.span>
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              live
            </span>
          </div>

          <div className="relative aspect-[16/10] bg-ink p-3 grid grid-cols-2 gap-2">
            {/* Jordan */}
            <div
              className="relative rounded overflow-hidden flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #143d27 0%, #1f6b3c 60%, #225433 100%)" }}
            >
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background: "radial-gradient(circle at 50% 45%, rgba(34, 215, 126, 0.35) 0%, transparent 60%)",
                }}
              />
              <div
                className="relative w-[40%] aspect-square rounded-full"
                style={{
                  background: "linear-gradient(135deg, #2dd87e 0%, #1a8d4e 100%)",
                  boxShadow: "0 0 24px rgba(34, 215, 126, 0.45)",
                }}
              />
              <div className="absolute bottom-1.5 left-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-paper/85 bg-ink/60 backdrop-blur px-1.5 py-0.5 rounded">
                Jordan
              </div>
            </div>

            {/* Candidate */}
            <div
              className="relative rounded overflow-hidden flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #2a2d36 0%, #4a4d56 50%, #2a2d36 100%)" }}
            >
              <div
                className="w-[40%] aspect-square rounded-full"
                style={{ background: "linear-gradient(135deg, #b3a784 0%, #6e6448 100%)" }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={candidateName}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-1.5 left-1.5 text-[9px] font-mono uppercase tracking-[0.1em] text-paper bg-ink/60 backdrop-blur px-1.5 py-0.5 rounded truncate max-w-[80%]"
                >
                  {candidateName}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="px-3 py-2 bg-ink-3/50 border-t border-line/60 font-mono text-[10px] flex items-center gap-2">
            <span className="text-accent shrink-0">Jordan:</span>
            <span className="text-paper/80 truncate">
              Walk me through your last F&I per-copy objective.
            </span>
          </div>
        </div>
      </div>

      <div className="h-2 mx-[-2%] rounded-b-xl" style={{ background: "linear-gradient(180deg, #2a2c33 0%, #1c1d22 100%)" }} />
    </div>
  );
}

function AishaCard({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full bg-ink-2 border border-accent rounded-md p-3 shadow-[0_25px_50px_-15px_rgba(34,215,126,0.35)]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-accent flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
              strong signal
            </div>
            <div className="text-[9px] font-mono text-paper/40">9:32</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-[60px] h-[60px] shrink-0">
              <ScoreRing score={9.4} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-sans font-semibold text-[13px] text-paper truncate">
                Sandra Mills
              </div>
              <div className="text-[9px] font-mono text-paper/45 uppercase tracking-[0.12em]">
                F&I Manager · 14m interview
              </div>
              <div className="mt-1 text-[10px] text-paper/65 leading-snug font-serif italic">
                &ldquo;12y AutoNation. 145% per-copy.&rdquo;
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2.5 border-t border-line/60 flex items-center justify-between text-[9px] font-mono">
            <span className="text-accent uppercase tracking-[0.15em]">→ Lisa @ 11:00</span>
            <span className="text-paper/45 uppercase tracking-[0.1em]">auto-scheduled</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 24;
  const c = 2 * Math.PI * r;
  const target = (score / 10) * c;
  const offset = useMotionValue(c);

  useEffect(() => {
    const controls = animate(offset, c - target, { duration: 1.0, ease: "easeOut" });
    return () => controls.stop();
  }, [target, c, offset]);

  return (
    <>
      <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
        <circle cx="30" cy="30" r={r} fill="none" stroke="var(--color-line)" strokeWidth="3" />
        <motion.circle
          cx="30"
          cy="30"
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-sans font-semibold text-[16px] tabular-nums text-paper">
          {score.toFixed(1)}
        </span>
      </div>
    </>
  );
}

function CalendarWidget({ visible, sceneIdx }: { visible: boolean; sceneIdx: number }) {
  const slots = [
    { time: "11:00", name: "Sandra Mills", show: sceneIdx >= 2 },
    { time: "11:30", name: "Rachel Thompson", show: sceneIdx >= 2 },
    { time: "12:00", name: "Marcus Williams", show: sceneIdx >= 2 },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-[200px] bg-ink-2 border border-line rounded-md overflow-hidden shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-ink-3/60 border-b border-line/70">
            <Calendar className="w-3 h-3 text-accent" strokeWidth={2} />
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-paper/65">
              Lisa&apos;s calendar · today
            </span>
          </div>
          <div className="divide-y divide-line/50">
            {slots.map((s, i) => (
              <CalendarSlot key={s.time} {...s} delay={i * 0.15} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RankedQueueMini({ visible, sceneIdx }: { visible: boolean; sceneIdx: number }) {
  const ROWS = [
    { rank: 1, name: "Sandra Mills",    role: "F&I",     score: 9.4, scheduled: true },
    { rank: 2, name: "Rachel Thompson", role: "Service", score: 9.1, scheduled: true },
    { rank: 3, name: "Marcus Williams", role: "Sales",   score: 8.7, scheduled: sceneIdx >= 3 },
    { rank: 4, name: "Kevin Park",      role: "F&I",     score: 7.9, scheduled: false },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="absolute bottom-[14%] right-[5%] w-[230px] z-15 bg-ink-2 border border-line rounded-md overflow-hidden shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center justify-between px-2.5 py-1.5 bg-ink-3/60 border-b border-line/70">
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-paper/65">
              Top of the queue
            </span>
            <span className="text-[9px] font-mono text-accent">22 ranked</span>
          </div>
          <div className="divide-y divide-line/40">
            {ROWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-2 px-2.5 py-1.5 text-[10px]"
              >
                <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center font-sans font-semibold text-[9px] tabular-nums ${
                  i === 0 ? "bg-accent text-ink" : "bg-line text-paper/65"
                }`}>
                  {r.rank}
                </span>
                <span className="flex-1 min-w-0 truncate text-paper/85">{r.name}</span>
                <span className="text-[9px] font-mono text-paper/40 shrink-0">{r.role}</span>
                <span className="font-sans font-semibold text-paper tabular-nums shrink-0">
                  {r.score.toFixed(1)}
                </span>
                {r.scheduled && (
                  <CheckCircle2 className="w-3 h-3 text-accent shrink-0" strokeWidth={2.5} />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CalendarSlot({
  time,
  name,
  show,
  delay,
}: {
  time: string;
  name: string;
  show: boolean;
  delay: number;
}) {
  return (
    <div className="relative px-2.5 py-2 flex items-center gap-2">
      <span className="text-[9px] font-mono text-paper/55 tabular-nums shrink-0 w-9">{time}</span>
      <div className="relative flex-1 h-5 rounded bg-line/60 overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: show ? "100%" : "0%" }}
          transition={{ duration: 0.7, delay, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-accent/20 border-r-2 border-accent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          className="absolute inset-0 flex items-center px-2 text-[10px] font-medium text-paper truncate"
        >
          {name}
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  FINALE — replica of the actual dashboard ReviewFeed          */
/* ============================================================ */

type Recommendation = "strong_yes" | "yes" | "maybe" | "no";

interface FinaleCandidate {
  name: string;
  role: string;
  fitScore: number | null;
  recommendation: Recommendation;
  employer: string;
  date: string;
  summary: string;
  strengths: [string, string];
  concern: string;
  engagement: number | null;
  professional: number | null;
  gradient: string;
}

const FINALE_CANDIDATES: FinaleCandidate[] = [
  {
    name: "Sandra Mills",
    role: "Finance & Insurance Manager",
    fitScore: 94,
    recommendation: "strong_yes",
    employer: "AutoNation Toyota",
    date: "Mar 24",
    summary:
      "Twelve years of F&I experience at top national dealer groups with consistent 135–150% per-copy performance. Fully licensed in FL, JM&A and Zurich certified, deep CFPB compliance discipline. Strong leader who has trained finance office staff at two prior stores.",
    strengths: [
      "12y F&I at top national dealer groups",
      "135–150% per-copy objective performance",
    ],
    concern: "Currently $8K above mid-range comp — confirm budget fit",
    engagement: 95,
    professional: 97,
    gradient: "from-fuchsia-500 to-purple-500",
  },
  {
    name: "Rachel Thompson",
    role: "Service Advisor",
    fitScore: 91,
    recommendation: "strong_yes",
    employer: "Coggin Ford",
    date: "Mar 23",
    summary:
      "Six years of high-volume service advisor experience at an OEM franchise store. ASE C1 certified, Reynolds & Reynolds and CDK fluent. RO upsell averages $445 vs. ~$350 industry benchmark. Available opening shift and Saturdays.",
    strengths: [
      "6y high-volume service advisor at OEM store",
      "$445 avg RO upsell vs. ~$350 benchmark",
    ],
    concern: "Notice period: 2 weeks at current employer",
    engagement: 92,
    professional: 94,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Marcus Williams",
    role: "Sales Consultant",
    fitScore: 87,
    recommendation: "strong_yes",
    employer: "Group 1 Honda",
    date: "Mar 23",
    summary:
      "Eight years of automotive retail sales at AutoNation Chevrolet and Group 1 Honda. Documented 23% close rate on floor traffic. Relationship-based selling philosophy aligns with Prestige customer satisfaction culture. Available all shifts including evenings and weekends.",
    strengths: [
      "8y automotive retail at major dealer groups",
      "23% close rate on floor traffic",
    ],
    concern: "Voluntary departure from prior role — brief follow-up suggested",
    engagement: 88,
    professional: 91,
    gradient: "from-violet-500 to-indigo-500",
  },
];

function FinaleDashboard() {
  return (
    <div className="relative w-full max-w-[860px] mx-auto">
      {/* Halo */}
      <div
        className="absolute inset-0 -m-12 rounded-[40px] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124, 58, 237, 0.22) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div
        className="relative rounded-xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]"
        style={{ background: "#f8f8fa" }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 bg-slate-100">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e85a4f]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#e8b94f]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#5fa757]" />
          <div className="ml-3 text-[11px] font-mono text-slate-500 truncate">
            dashboard.hiringhand.io · Prestige Auto Group
          </div>
        </div>

        {/* Gradient banner — matches the real dashboard */}
        <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-5 md:px-7 py-5">
          <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 left-1/4 h-40 w-40 rounded-full bg-indigo-300/20 blur-2xl" />
          <div className="pointer-events-none absolute top-4 right-1/3 h-24 w-24 rounded-full bg-fuchsia-400/10 blur-2xl" />

          <div className="relative flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-200 mb-1">
                Review Queue
              </p>
              <h1 className="text-[22px] md:text-[26px] font-bold text-white tracking-tight leading-tight">
                Pending Review
              </h1>
              <p className="mt-1 text-[12px] text-violet-200 max-w-md">
                AI-screened candidates ranked by fit score — shortlist the ones worth your time.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <BannerStat icon={<Inbox className="h-3.5 w-3.5 text-violet-200 shrink-0" />} value="22" label="To Review" />
              <BannerStat icon={<TrendingUp className="h-3.5 w-3.5 text-violet-200 shrink-0" />} value="78" label="Avg Score" />
              <BannerStat icon={<Users className="h-3.5 w-3.5 text-violet-200 shrink-0" />} value="6" label="Recommended" />
            </div>
          </div>
        </div>

        {/* Candidate cards */}
        <div className="px-4 md:px-6 py-4 space-y-3 bg-slate-50/60">
          {FINALE_CANDIDATES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
            >
              <ReviewCard candidate={c} />
            </motion.div>
          ))}

          <div className="text-center text-[11px] font-mono text-slate-400 pt-1">
            + 19 more candidates ranked
          </div>
        </div>
      </div>
    </div>
  );
}

function BannerStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-3.5 py-2">
      {icon}
      <div>
        <p className="text-[18px] font-bold text-white leading-none tabular-nums">{value}</p>
        <p className="text-[9px] text-violet-200 mt-0.5 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

function ReviewCard({ candidate }: { candidate: FinaleCandidate }) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const accent = scoreAccent(candidate.fitScore);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className={`h-1 w-full ${accent.bar}`} />

      <div className="p-3.5 md:p-4">
        <div className="flex gap-3">
          {/* Avatar + score column */}
          <div className="flex flex-col items-center gap-1 shrink-0 w-12">
            <div
              className={`h-10 w-10 rounded-full bg-gradient-to-br ${candidate.gradient} flex items-center justify-center text-[12px] font-bold text-white`}
            >
              {initials}
            </div>
            {candidate.fitScore !== null && (
              <div className="text-center">
                <div className={`text-[20px] font-bold leading-none ${accent.text}`}>
                  {candidate.fitScore}
                </div>
                <div className="text-[8px] text-slate-400 leading-tight">/100</div>
              </div>
            )}
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-[14px] font-semibold text-slate-900 leading-tight">
                    {candidate.name}
                  </h3>
                  <RecPill rec={candidate.recommendation} />
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500 flex-wrap">
                  <span>{candidate.role}</span>
                  <span className="text-slate-300">·</span>
                  <span>{candidate.date}</span>
                  <span className="hidden sm:inline truncate">· {candidate.employer}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="hidden md:flex items-center gap-1.5 shrink-0">
                <button
                  className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-400"
                  aria-label="Archive"
                  type="button"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <button
                  className="flex items-center gap-1.5 text-[12px] font-semibold bg-violet-600 text-white rounded-md px-3 py-1.5 shadow-sm"
                  type="button"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Shortlist
                </button>
              </div>
            </div>

            {/* AI summary */}
            <p className="mt-2 text-[12px] text-slate-700 leading-relaxed line-clamp-2">
              {candidate.summary}
            </p>

            {/* Strengths + concern chips */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {candidate.strengths.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5"
                >
                  <CheckCircle className="h-2.5 w-2.5 shrink-0" />
                  <span className="truncate max-w-[180px]">{s}</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-2 py-0.5">
                <span className="truncate max-w-[180px]">{candidate.concern}</span>
              </span>
            </div>

            {/* Mini bars */}
            <div className="mt-2.5 flex gap-3">
              <MiniBar label="Engagement" value={candidate.engagement} />
              <MiniBar label="Professional" value={candidate.professional} />
              <MiniBar label="Fit" value={candidate.fitScore} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function scoreAccent(score: number | null) {
  if (score === null) return { bar: "bg-slate-200", text: "text-slate-400" };
  if (score >= 80) return { bar: "bg-emerald-500", text: "text-emerald-600" };
  if (score >= 60) return { bar: "bg-amber-500", text: "text-amber-600" };
  return { bar: "bg-red-500", text: "text-red-600" };
}

function RecPill({ rec }: { rec: Recommendation }) {
  const map: Record<Recommendation, { label: string; cls: string }> = {
    strong_yes: { label: "Strong Yes", cls: "bg-emerald-100 text-emerald-700" },
    yes: { label: "Yes", cls: "bg-emerald-50 text-emerald-600" },
    maybe: { label: "Maybe", cls: "bg-amber-100 text-amber-700" },
    no: { label: "No", cls: "bg-red-100 text-red-700" },
  };
  const { label, cls } = map[rec];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${cls}`}>
      {label}
    </span>
  );
}

function MiniBar({ label, value }: { label: string; value: number | null }) {
  const pct = value !== null ? Math.min(100, Math.max(0, value)) : 0;
  const color = pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-400" : pct > 0 ? "bg-red-400" : "bg-slate-200";
  return (
    <div className="flex-1">
      <div className="flex justify-between mb-0.5">
        <span className="text-[10px] text-slate-500">{label}</span>
        <span className="text-[10px] font-semibold text-slate-700 tabular-nums">{value ?? "—"}</span>
      </div>
      <div className="h-1 rounded-full bg-slate-200">
        <div className={`h-1 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
