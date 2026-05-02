"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";

/* ============================================================ */
/*  Candidate data — 50 total                                    */
/* ============================================================ */

type Candidate = {
  id: string;
  name: string;
  role: string;
  score: number;
  rec: "strong_yes" | "yes" | "maybe" | "no";
  gradient: string;
  named?: boolean;
};

const NAMED_CANDIDATES: Candidate[] = [
  { id: "c01", name: "Sandra Mills",    role: "F&I",     score: 94, rec: "strong_yes", gradient: "from-fuchsia-500 to-purple-600", named: true },
  { id: "c02", name: "Rachel Thompson", role: "Service", score: 91, rec: "strong_yes", gradient: "from-emerald-500 to-teal-600",   named: true },
  { id: "c03", name: "Marcus Williams", role: "Sales",   score: 87, rec: "strong_yes", gradient: "from-violet-500 to-indigo-600",  named: true },
  { id: "c04", name: "Kevin Park",      role: "F&I",     score: 79, rec: "yes",        gradient: "from-blue-500 to-cyan-600",       named: true },
  { id: "c05", name: "Tyler Johnson",   role: "Parts",   score: 76, rec: "yes",        gradient: "from-orange-500 to-amber-600",    named: true },
  { id: "c06", name: "Brittany Chen",   role: "Sales",   score: 74, rec: "yes",        gradient: "from-pink-500 to-rose-600",       named: true },
  { id: "c07", name: "Derek Okafor",    role: "Service", score: 71, rec: "yes",        gradient: "from-cyan-500 to-blue-600",       named: true },
  { id: "c08", name: "Ashley Rivera",   role: "BDC",     score: 62, rec: "maybe",      gradient: "from-amber-500 to-yellow-600",    named: true },
  { id: "c09", name: "Jordan Martinez", role: "Sales",   score: 58, rec: "maybe",      gradient: "from-slate-500 to-slate-700",     named: true },
  { id: "c10", name: "Brandon Lopez",   role: "Sales",   score: 28, rec: "no",         gradient: "from-slate-600 to-slate-800",     named: true },
];

function buildGenericCandidates(): Candidate[] {
  const initials = [
    "AK", "BP", "CR", "DL", "ES", "FM", "GT", "HN", "ID", "JW",
    "KB", "LH", "MC", "NV", "OG", "PJ", "QF", "RA", "SE", "TO",
    "UY", "VZ", "WX", "XU", "YH", "ZI", "AR", "BS", "CT", "DV",
    "EW", "FY", "GZ", "HL", "IN", "JO", "KP", "LQ", "MR", "NS",
  ];
  const roles = ["Sales", "Service", "Parts", "BDC", "F&I"];
  // Diverse, warm-leaning palette so every tile feels like a person, not a placeholder
  const grads = [
    "from-cyan-500 to-blue-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-teal-500 to-emerald-600",
    "from-indigo-500 to-violet-600",
    "from-yellow-500 to-amber-600",
    "from-pink-500 to-fuchsia-600",
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-green-600",
    "from-orange-500 to-rose-600",
    "from-violet-500 to-purple-600",
    "from-sky-500 to-cyan-600",
    "from-fuchsia-500 to-pink-600",
    "from-lime-500 to-emerald-600",
    "from-red-500 to-rose-600",
  ];
  const scoreSeed = [
    82, 68, 55, 71, 49, 63, 58, 73, 41, 66,
    57, 80, 35, 62, 70, 53, 67, 44, 75, 60,
    52, 65, 48, 78, 56, 72, 38, 64, 59, 69,
    50, 61, 77, 47, 54, 70, 42, 68, 51, 65,
  ];
  return Array.from({ length: 40 }, (_, i) => {
    const score = scoreSeed[i] ?? 60;
    const rec: Candidate["rec"] =
      score >= 80 ? "yes" : score >= 60 ? "maybe" : score >= 45 ? "maybe" : "no";
    return {
      id: `g${i + 1}`,
      name: initials[i] ?? `??`,
      role: roles[i % roles.length],
      score,
      rec,
      // Distribute through palette using a stride so adjacent tiles don't repeat
      gradient: grads[(i * 7) % grads.length],
    };
  });
}

const ALL_CANDIDATES: Candidate[] = [...NAMED_CANDIDATES, ...buildGenericCandidates()];

/* ============================================================ */
/*  Phases — slower, more readable timing                        */
/* ============================================================ */

type Phase = "intake" | "interviewing" | "scoring" | "ranking" | "shortlist";

const PHASE_DURATIONS: Record<Phase, number> = {
  intake: 2800,
  interviewing: 5500,
  scoring: 4500,
  ranking: 4500,
  shortlist: 6500,
};
const PHASE_ORDER: Phase[] = ["intake", "interviewing", "scoring", "ranking", "shortlist"];

const PHASE_CAPTIONS: Record<Phase, { kicker: string; line: string }> = {
  intake: {
    kicker: "This week · 5 open roles",
    line: "50 applications came in this week across the dealership.",
  },
  interviewing: {
    kicker: "Each one within 60 seconds",
    line: "Jordan runs a face-to-face video interview with every applicant — in parallel.",
  },
  scoring: {
    kicker: "Live, structured scoring",
    line: "Each candidate scored against your role rubric as they answer.",
  },
  ranking: {
    kicker: "Sorted by composite fit",
    line: "All 50 ranked. No human review needed to get to the shortlist.",
  },
  shortlist: {
    kicker: "Monday morning",
    line: "Your top 6 are already on Lisa's calendar. Sandra Mills · 94 leads the queue.",
  },
};

/* ============================================================ */
/*  Main hero                                                    */
/* ============================================================ */

export function CandidateWall() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const phase = PHASE_ORDER[phaseIdx];

  // Respect prefers-reduced-motion: pause autoplay by default for accessibility users
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setPaused(true);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setPhaseIdx((p) => (p + 1) % PHASE_ORDER.length);
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phaseIdx, paused, phase]);

  const ordered =
    phaseIdx >= 3
      ? [...ALL_CANDIDATES].sort((a, b) => b.score - a.score)
      : ALL_CANDIDATES;

  const topFive = [...ALL_CANDIDATES].sort((a, b) => b.score - a.score).slice(0, 5);
  const caption = PHASE_CAPTIONS[phase];

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-ink text-paper overflow-hidden flex flex-col"
    >
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124, 58, 237, 0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(34, 215, 126, 0.07) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* === STATIC HERO HEADER === */}
      <div className="relative z-30 pt-24 md:pt-28 pb-4 px-6 md:px-10 text-center">
        <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-violet-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
          AI Video Interviewer · Hiring Hand
        </div>

        <h1 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2rem,5vw,4.25rem)] leading-[1.02] max-w-[22ch] mx-auto">
          Every applicant gets a real interview.{" "}
          <span className="font-serif italic font-normal text-accent">
            Face to face.
          </span>
        </h1>

        <p className="mt-5 text-paper/65 text-[15px] md:text-[17px] leading-relaxed max-w-xl mx-auto">
          Jordan video-interviews all of them in parallel — structured,
          EEOC-compliant, scored. Your shortlist is ranked and ready before
          your team opens a laptop.
        </p>
      </div>

      {/* === PHASE CAPTION — anchored, no position drift between phases === */}
      <div className="relative z-30 px-6 md:px-10 mt-2 mb-6">
        <div className="max-w-3xl mx-auto text-center relative h-[112px] md:h-[124px]">
          {/* Kicker — pinned to top */}
          <div className="absolute top-0 inset-x-0 h-5 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${phase}-kicker`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.5 }}
                className="text-[11px] font-mono uppercase tracking-[0.22em] text-violet-400 flex items-center justify-center gap-2"
              >
                <span className="inline-block w-6 h-px bg-violet-400/60" />
                {caption.kicker}
                <span className="inline-block w-6 h-px bg-violet-400/60" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Line — pinned below kicker, content always grows downward from same Y */}
          <div className="absolute top-9 inset-x-0 px-2 flex items-start justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${phase}-line`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5 }}
                className="font-sans font-medium text-[clamp(1.05rem,1.8vw,1.55rem)] text-paper leading-snug max-w-[52ch] mx-auto"
              >
                {caption.line.split(/(\b50\b|\bSandra Mills\b|\b94\b|\b6\b|\bJordan\b|\bparallel\b|\bface-to-face\b|\bsame time\b)/g).map((part, i) =>
                  ["50", "Sandra Mills", "94", "6"].includes(part) ? (
                    <span key={i} className="text-accent font-semibold">{part}</span>
                  ) : ["Jordan", "parallel", "face-to-face", "same time"].includes(part) ? (
                    <span key={i} className="text-violet-400 font-semibold">{part}</span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* === CANDIDATE WALL — responsive: 5 cols mobile, 8 tablet, 10 desktop === */}
      <div className="relative z-10 flex items-center justify-center px-3 sm:px-6 md:px-10 py-4">
        <div className="relative w-full max-w-[1100px]">
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1.5 sm:gap-2 md:gap-2.5">
            {ordered.map((c, idx) => (
              <CandidateTile
                key={c.id}
                candidate={c}
                phase={phase}
                index={idx}
                isTopFive={topFive.some((t) => t.id === c.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* === BIG STAT NUMBERS — below the grid === */}
      <div className="relative z-30 px-6 md:px-10 mt-8 mb-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 md:gap-8 items-end">
          <BigStat
            label="Applicants"
            value="50"
            sub="across 5 open roles"
            tone="paper"
          />
          <BigStat
            label="Your team's time"
            value="0:00"
            sub="hrs spent screening"
            tone="accent"
            pulse
          />
          <BigStat
            label="Top score"
            value={phaseIdx >= 2 ? "94" : "—"}
            sub={phaseIdx >= 2 ? "Sandra Mills · F&I" : "scoring in progress"}
            tone="violet"
          />
        </div>
      </div>

      {/* === CTAs + Phase indicator === */}
      <div className="relative z-30 pb-14 md:pb-16 pt-3 px-6 md:px-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/talk"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-full text-[14px] font-medium transition shadow-[0_15px_40px_-10px_rgba(124,58,237,0.55)]"
            >
              See a sample interview
              <span className="text-lg group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <Link
              href="#product"
              className="px-6 py-3.5 border border-paper/25 hover:border-paper/55 text-paper/85 hover:text-paper rounded-full text-[13px] font-medium transition"
            >
              Or scroll to the dashboard
            </Link>
          </div>

          <PhaseIndicator
            phaseIdx={phaseIdx}
            paused={paused}
            onJump={(i) => setPhaseIdx(i)}
            onTogglePaused={() => setPaused(!paused)}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Candidate tile — designed as a video-call participant card    */
/* ============================================================ */

function CandidateTile({
  candidate,
  phase,
  index,
  isTopFive,
}: {
  candidate: Candidate;
  phase: Phase;
  index: number;
  isTopFive: boolean;
}) {
  const row = Math.floor(index / 10);
  const col = index % 10;
  // Slower wave: more spread out
  const waveDelay = (row * 0.12 + col * 0.1) % 1.6;

  const inInterviewing = phase === "interviewing";
  const showInterviewing = inInterviewing || phase === "scoring";
  const showScore = phase === "scoring" || phase === "ranking" || phase === "shortlist";
  const showName = phase === "shortlist" && isTopFive && candidate.named;
  const dimmed = phase === "shortlist" && !isTopFive;

  const initials = candidate.named
    ? candidate.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : candidate.name;

  const scoreTier =
    candidate.score >= 80 ? "emerald" : candidate.score >= 60 ? "amber" : "rose";

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 50, damping: 26, mass: 1.4 }}
      style={{ aspectRatio: "1 / 1.18" }}
      className="relative"
    >
      <motion.div
        animate={{
          opacity: dimmed ? 0.25 : 1,
          scale: phase === "shortlist" && isTopFive ? 1.05 : 1,
        }}
        transition={{ duration: 0.8 }}
        className={`relative w-full h-full rounded-md overflow-hidden border-2 ${
          isTopFive && phase === "shortlist"
            ? "border-accent shadow-[0_0_20px_rgba(34,215,126,0.45)]"
            : showInterviewing
              ? "border-line/60"
              : "border-line/45"
        }`}
        style={{
          background: "linear-gradient(180deg, #181c2a 0%, #0e111a 100%)",
        }}
      >
        {/* Gradient-tinted "video feed" area — every tile gets full color */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${candidate.gradient} opacity-65`}
        />
        {/* Soft top-down shading so it reads as an actual screen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 25%, rgba(255,255,255,0.14) 0%, transparent 60%)",
          }}
        />

        {/* Human silhouette portrait — head + shoulders, like a video call participant */}
        <PortraitSilhouette index={index} />

        {/* Center: initials shown over the silhouette as a "name tag" */}
        <div className="absolute inset-0 flex items-end justify-center pb-[26%]">
          <div
            className="px-1.5 py-px rounded font-sans font-bold tracking-tight text-white text-[10px] md:text-[11px] bg-black/35 backdrop-blur-[2px]"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
          >
            {initials}
          </div>
        </div>

        {/* Top bar: live indicator + Jordan PiP during interviewing */}
        <AnimatePresence>
          {showInterviewing && (
            <motion.div
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: inInterviewing ? waveDelay : 0,
              }}
              className="absolute top-1 left-1 right-1 flex items-center justify-between"
            >
              {/* LIVE tag */}
              <span className="flex items-center gap-1 text-[7px] md:text-[8px] font-mono uppercase tracking-[0.1em] text-white bg-ink/60 backdrop-blur-sm px-1 py-px rounded">
                <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                LIVE
              </span>
              {/* Tiny Jordan PiP */}
              <span
                className="block w-3 h-3 md:w-3.5 md:h-3.5 rounded-full ring-1 ring-accent/70"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, #2dd87e 0%, #0e6e3c 100%)",
                  boxShadow: "0 0 6px rgba(34,215,126,0.6)",
                }}
                aria-label="Jordan interviewer"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active interviewing pulse — sweeps across as the wave hits */}
        {inInterviewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0.55, 0.15] }}
            transition={{
              duration: 2.4,
              delay: waveDelay,
              times: [0, 0.25, 0.7, 1],
            }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(34, 215, 126, 0.35) 0%, transparent 75%)",
              boxShadow: "inset 0 0 0 2px rgba(34, 215, 126, 0.5)",
            }}
          />
        )}

        {/* Bottom bar: role + score */}
        <div className="absolute bottom-0 inset-x-0 bg-ink/65 backdrop-blur-sm flex items-center justify-between gap-1 px-1.5 py-1 border-t border-white/10">
          <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.08em] text-white/85 truncate">
            {candidate.role}
          </span>
          <AnimatePresence>
            {showScore && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: phase === "scoring" ? waveDelay * 0.5 : 0,
                }}
                className={`px-1 py-px rounded text-[8px] md:text-[10px] font-bold tabular-nums ${
                  scoreTier === "emerald"
                    ? "bg-emerald-500 text-white"
                    : scoreTier === "amber"
                      ? "bg-amber-500 text-slate-900"
                      : "bg-rose-600 text-white"
                }`}
              >
                {candidate.score}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Top-of-pack name banner during shortlist */}
        <AnimatePresence>
          {showName && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 inset-x-0 bg-accent text-ink px-1 py-0.5 text-center text-[8px] md:text-[9px] font-mono uppercase tracking-[0.06em] font-semibold truncate"
            >
              {candidate.name.split(" ")[0]}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================ */
/*  Portrait silhouette — head + shoulders, slight per-tile      */
/*  variation so the wall reads as 50 distinct people            */
/* ============================================================ */

function PortraitSilhouette({ index }: { index: number }) {
  // Wider variation — head size, position, shoulder shape — so 50 portraits feel distinct
  const headR = 13 + ((index * 17) % 11) * 0.55;        // 13..19
  const headOffsetX = ((index * 13) % 9) - 4;           // -4..+4
  const headY = 30 + ((index * 19) % 9);                // 30..38
  const shoulderTopY = 58 + ((index * 11) % 8);         // 58..65
  const shoulderEdge = 6 + ((index * 5) % 8);           // 6..13
  const tilt = (((index * 23) % 11) - 5) * 0.6;         // -3..+3 deg subtle tilt
  // A subset get a slight neck taper so they look more "person-like"
  const hasNeck = (index * 31) % 5 !== 0;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYEnd meet"
      className="absolute inset-0 w-full h-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`portrait-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.78)" />
        </linearGradient>
      </defs>
      <g transform={`rotate(${tilt} 50 60)`}>
        {/* Head */}
        <circle
          cx={50 + headOffsetX}
          cy={headY}
          r={headR}
          fill={`url(#portrait-${index})`}
          opacity="0.6"
        />
        {/* Neck taper (most tiles) */}
        {hasNeck && (
          <rect
            x={50 + headOffsetX - headR * 0.4}
            y={headY + headR - 1}
            width={headR * 0.8}
            height={shoulderTopY - (headY + headR) + 3}
            fill={`url(#portrait-${index})`}
            opacity="0.55"
          />
        )}
        {/* Shoulders — soft rounded silhouette */}
        <path
          d={`M ${shoulderEdge} 100
             L ${shoulderEdge} ${shoulderTopY + 10}
             Q ${shoulderEdge} ${shoulderTopY - 2}, ${shoulderEdge + 12} ${shoulderTopY - 4}
             Q 50 ${shoulderTopY - 8}, ${100 - shoulderEdge - 12} ${shoulderTopY - 4}
             Q ${100 - shoulderEdge} ${shoulderTopY - 2}, ${100 - shoulderEdge} ${shoulderTopY + 10}
             L ${100 - shoulderEdge} 100 Z`}
          fill={`url(#portrait-${index})`}
          opacity="0.6"
        />
      </g>
    </svg>
  );
}

/* ============================================================ */
/*  Helpers                                                      */
/* ============================================================ */

function BigStat({
  label,
  value,
  sub,
  tone,
  pulse,
}: {
  label: string;
  value: string;
  sub?: string;
  tone: "paper" | "accent" | "violet";
  pulse?: boolean;
}) {
  const valueColor =
    tone === "accent"
      ? "text-accent"
      : tone === "violet"
        ? "text-violet-300"
        : "text-paper";

  return (
    <div className="text-center flex flex-col items-center">
      <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.18em] md:tracking-[0.22em] text-paper/45 mb-1.5 md:mb-2 flex items-center gap-1.5 justify-center">
        {pulse && <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-accent animate-pulse" />}
        <span className="truncate">{label}</span>
      </div>
      <div
        className={`font-sans font-bold tabular-nums leading-none ${valueColor}`}
        style={{ fontSize: "clamp(1.8rem, 6vw, 5rem)" }}
      >
        {value}
      </div>
      {sub && (
        <div className="mt-1.5 md:mt-2 text-[9px] md:text-[11px] font-mono uppercase tracking-[0.15em] md:tracking-[0.18em] text-paper/40 truncate">
          {sub}
        </div>
      )}
    </div>
  );
}

function PhaseIndicator({
  phaseIdx,
  paused,
  onJump,
  onTogglePaused,
}: {
  phaseIdx: number;
  paused: boolean;
  onJump: (i: number) => void;
  onTogglePaused: () => void;
}) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-paper/45">
      <button
        onClick={onTogglePaused}
        className="hover:text-paper transition flex items-center gap-1.5"
        aria-label={paused ? "Resume" : "Pause"}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${paused ? "bg-paper/45" : "bg-accent animate-pulse"}`} />
        {paused ? "paused" : "playing"}
      </button>
      <span className="block w-px h-3 bg-line" />
      <div className="flex items-center gap-1.5">
        {PHASE_ORDER.map((p, i) => (
          <button
            key={p}
            onClick={() => onJump(i)}
            aria-label={p}
            className={`transition ${
              i === phaseIdx
                ? "w-6 h-1 bg-violet-500 rounded-full"
                : "w-1.5 h-1.5 bg-line rounded-full hover:bg-paper/35"
            }`}
          />
        ))}
      </div>
      <span className="text-paper/35">{PHASE_ORDER[phaseIdx]}</span>
    </div>
  );
}
