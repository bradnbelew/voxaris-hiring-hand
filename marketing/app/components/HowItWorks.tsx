"use client";

import { motion } from "motion/react";
import { Mail, MessageSquare, QrCode, Building2, ArrowRight, CheckCircle, CheckCheck, X } from "lucide-react";

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative bg-ink text-paper py-24 md:py-36 px-6 md:px-10 border-t border-line/40 grain"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-violet-400 mb-6">
          How it works · 03
        </div>

        <h2 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2rem,5vw,4.25rem)] leading-[1.02] max-w-[18ch]">
          Three steps.{" "}
          <span className="font-serif italic font-normal text-paper/55">
            One of them is yours.
          </span>
        </h2>

        <div className="mt-20 space-y-32">
          <Step
            n="01"
            title="Candidates apply, Jordan picks up."
            body="From your job board, an Indeed reply, an SMS link, or a QR code at a hiring event. Within 60 seconds Jordan sends back a personalized interview link — day, night, weekend, holiday."
            visual={<ApplyVisual />}
          />
          <Step
            n="02"
            title="Jordan interviews. Live scoring."
            body="Structured, EEOC-compliant, video-first. He follows your role rubric, asks behavioral questions, and scores against your criteria as the candidate answers. The candidate sees a real face, not a chatbot."
            visual={<InterviewVisual />}
            reverse
          />
          <Step
            n="03"
            title="You shortlist with one click."
            body="A scored review card with summary, strengths, concerns, and a scrubbable transcript lands in your dashboard. Shortlist or archive — approved candidates auto-schedule, rejected candidates get a kind reply."
            visual={<DecideVisual />}
          />
        </div>
      </div>
    </section>
  );
}

function Step({
  n,
  title,
  body,
  visual,
  reverse,
}: {
  n: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`grid md:grid-cols-12 gap-10 md:gap-16 items-center ${
        reverse ? "md:[direction:rtl]" : ""
      }`}
    >
      <div className="md:col-span-5 [direction:ltr]">
        <div className="text-[60px] md:text-[88px] font-sans font-semibold tabular-nums leading-none text-violet-500/25">
          {n}
        </div>
        <h3 className="mt-3 font-sans font-semibold text-[clamp(1.6rem,3vw,2.5rem)] leading-tight tracking-[-0.01em]">
          {title}
        </h3>
        <p className="mt-5 text-paper/65 text-[16px] leading-relaxed max-w-md">
          {body}
        </p>
      </div>
      <div className="md:col-span-7 [direction:ltr]">{visual}</div>
    </motion.div>
  );
}

/* ============================================================ */
/*  STEP 01 — Phone with SMS interaction                         */
/* ============================================================ */

function ApplyVisual() {
  const channels = [
    { icon: Building2, label: "Indeed", sub: "Job posting reply", color: "from-blue-500/30 to-blue-700/15", border: "border-blue-500/40", iconColor: "text-blue-400" },
    { icon: MessageSquare, label: "SMS", sub: "Direct text link", color: "from-emerald-500/30 to-teal-700/15", border: "border-emerald-500/40", iconColor: "text-emerald-400" },
    { icon: QrCode, label: "QR code", sub: "Hiring event scan", color: "from-amber-500/30 to-orange-700/15", border: "border-amber-500/40", iconColor: "text-amber-400" },
    { icon: Mail, label: "Job board", sub: "Career site form", color: "from-pink-500/30 to-rose-700/15", border: "border-pink-500/40", iconColor: "text-pink-400" },
  ];

  return (
    <div className="relative h-[560px] md:h-[600px] bg-ink-2 border border-line/60 rounded-2xl overflow-hidden p-6 md:p-8 pb-10 md:pb-12 flex flex-col items-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Top: channels supported — horizontal row */}
      <div className="relative z-10 w-full flex flex-col items-center gap-3 mb-5">
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-violet-400">
          Channels supported
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-2.5">
          {channels.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative bg-gradient-to-br ${c.color} backdrop-blur-sm border ${c.border} rounded-lg px-3 py-2 flex items-center gap-2`}
            >
              <c.icon className={`w-4 h-4 ${c.iconColor} shrink-0`} strokeWidth={2} />
              <span className="text-[12px] font-sans font-semibold text-paper">
                {c.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Center: phone — dead center */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative w-[180px] aspect-[9/18] rounded-[26px] p-1.5"
          style={{
            background: "linear-gradient(160deg, #2a2c33 0%, #14161a 100%)",
            boxShadow:
              "0 0 0 2px rgba(255,255,255,0.06), 0 30px 60px -20px rgba(0,0,0,0.7)",
          }}
        >
          <div className="relative w-full h-full bg-[#0a0a0c] rounded-[20px] overflow-hidden flex flex-col">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-black rounded-full z-10" />

            <div className="flex items-center justify-between px-3 pt-2 text-[8px] font-mono text-paper/55">
              <span>9:14</span>
              <span>87%</span>
            </div>

            <div className="px-2.5 pt-2 pb-1.5 border-b border-line/40 flex items-center gap-1.5">
              <div
                className="w-5 h-5 rounded-full shrink-0"
                style={{
                  background: "linear-gradient(135deg, #2dd87e 0%, #1a8d4e 100%)",
                  boxShadow: "0 0 8px rgba(34,215,126,0.4)",
                }}
              />
              <div className="min-w-0">
                <div className="text-[9px] font-sans font-semibold text-paper truncate leading-tight">
                  Jordan · Prestige
                </div>
                <div className="text-[7px] font-mono text-accent uppercase tracking-[0.12em]">
                  ● online
                </div>
              </div>
            </div>

            <div className="flex-1 px-2 pt-2 pb-2 flex flex-col gap-1.5 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="self-end max-w-[88%] bg-violet-600 rounded-xl rounded-br-sm px-2.5 py-1.5"
              >
                <div className="text-[9px] text-white leading-snug">
                  Applied — F&I Manager
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 1.0 }}
                className="self-start max-w-[92%] bg-ink-3 border border-line/70 rounded-xl rounded-bl-sm px-2.5 py-1.5"
              >
                <div className="text-[9px] text-paper leading-snug">
                  Hi Sandra — picked up your app. Got 14 min for a quick interview?
                </div>
                <div className="mt-1.5 bg-accent rounded-md px-2 py-1 text-[8px] font-semibold text-ink text-center">
                  ▶ Start interview
                </div>
              </motion.div>
            </div>

            {/* Subtle home indicator */}
            <div className="pb-1 flex justify-center">
              <span className="block w-12 h-0.5 rounded-full bg-paper/20" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Time-to-reply callout — bottom, centered, with breathing room */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="relative z-10 mt-5 mb-4 text-center"
      >
        <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-paper/45">
          time to first reply
        </div>
        <div className="font-sans font-bold text-[34px] md:text-[40px] text-accent leading-none mt-1 tabular-nums">
          60<span className="text-[18px] md:text-[22px] text-paper/55 ml-1">s</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================ */
/*  STEP 02 — Jordan interview with live scoring                 */
/* ============================================================ */

function InterviewVisual() {
  return (
    <div className="relative h-80 md:h-[420px] bg-ink-2 border border-line/60 rounded-2xl overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line/60 bg-ink-3/40">
        <span className="w-2 h-2 rounded-full bg-paper/15" />
        <span className="w-2 h-2 rounded-full bg-paper/15" />
        <span className="w-2 h-2 rounded-full bg-paper/15" />
        <span className="ml-2 text-[10px] font-mono text-paper/40">
          jordan.hiringhand.io · interview · sandra-mills
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          live · 04:21
        </span>
      </div>

      <div className="relative h-[calc(100%-40px)] grid grid-cols-[1fr_180px] gap-0">
        {/* Video area */}
        <div className="relative p-4 grid grid-cols-2 gap-3">
          {/* Jordan tile */}
          <div
            className="relative rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #143d27 0%, #1f6b3c 60%, #225433 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(34, 215, 126, 0.4) 0%, transparent 60%)",
              }}
            />
            <div
              className="relative w-[40%] aspect-square rounded-full"
              style={{
                background: "linear-gradient(135deg, #2dd87e 0%, #1a8d4e 100%)",
                boxShadow: "0 0 24px rgba(34, 215, 126, 0.55)",
              }}
            />
            <div className="absolute bottom-2 left-2 text-[10px] font-mono uppercase tracking-[0.15em] text-paper bg-ink/65 backdrop-blur px-2 py-0.5 rounded">
              Jordan
            </div>
            {/* Live waveform */}
            <div className="absolute bottom-2 right-2 flex items-end gap-[2px] h-3.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className="block w-[2px] bg-accent rounded-full origin-bottom"
                  style={{
                    height: `${30 + ((i * 17) % 60)}%`,
                    animation: `wave ${0.6 + i * 0.08}s ease-in-out ${i * 0.05}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Candidate tile */}
          <div
            className="relative rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #2a2d36 0%, #4a4d56 50%, #2a2d36 100%)",
            }}
          >
            <div
              className="w-[40%] aspect-square rounded-full"
              style={{
                background: "linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)",
              }}
            />
            <div className="absolute bottom-2 left-2 text-[10px] font-mono uppercase tracking-[0.15em] text-paper bg-ink/65 backdrop-blur px-2 py-0.5 rounded">
              Sandra Mills · F&I
            </div>
          </div>

          {/* Transcript bar */}
          <div className="col-span-2 mt-1 px-3 py-2 bg-ink/60 backdrop-blur border border-line/60 rounded-md font-mono text-[10px] md:text-[11px] flex items-start gap-2">
            <span className="text-accent shrink-0 mt-px">Jordan:</span>
            <span className="text-paper/85 cursor-blink leading-snug">
              Walk me through your last per-copy objective performance
            </span>
          </div>
        </div>

        {/* Live scoring panel */}
        <div className="border-l border-line/60 bg-ink/40 p-3 flex flex-col">
          <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-paper/55 mb-3">
            Live scoring
          </div>
          <div className="space-y-2.5 flex-1">
            <ScoreBar label="Engagement" pct={91} />
            <ScoreBar label="Professional" pct={94} />
            <ScoreBar label="F&I signal" pct={88} />
            <ScoreBar label="Compliance" pct={89} />
          </div>
          <div className="mt-3 pt-3 border-t border-line/60 text-center">
            <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-accent mb-1">
              Composite
            </div>
            <div className="font-sans font-bold text-[28px] tabular-nums text-accent leading-none">
              91
            </div>
            <div className="text-[9px] font-mono text-paper/40 mt-0.5">/100</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, pct }: { label: string; pct: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-[10px] text-paper/65">{label}</span>
        <span className="text-[10px] font-mono font-semibold text-paper tabular-nums">{pct}</span>
      </div>
      <div className="h-1.5 rounded-full bg-line/80 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
          className="h-full bg-accent rounded-full"
        />
      </div>
    </motion.div>
  );
}

/* ============================================================ */
/*  STEP 03 — Review card lands on dashboard                     */
/* ============================================================ */

function DecideVisual() {
  return (
    <div className="relative h-80 md:h-[420px] bg-ink-2 border border-line/60 rounded-2xl overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line/60 bg-ink-3/40">
        <span className="w-2 h-2 rounded-full bg-paper/15" />
        <span className="w-2 h-2 rounded-full bg-paper/15" />
        <span className="w-2 h-2 rounded-full bg-paper/15" />
        <span className="ml-2 text-[10px] font-mono text-paper/40">
          dashboard.hiringhand.io · pending review
        </span>
      </div>

      {/* Light dashboard area */}
      <div className="relative h-[calc(100%-40px)] p-4 md:p-5" style={{ background: "#f4f5f9" }}>
        {/* Mini violet header */}
        <div className="rounded-lg overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-3 py-2 mb-3 flex items-center justify-between">
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-widest text-violet-200">
              Review Queue
            </div>
            <div className="text-[13px] font-bold text-white leading-tight">
              Pending Review
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/15 border border-white/20 rounded px-2 py-1 text-center">
              <div className="text-[14px] font-bold text-white leading-none tabular-nums">12</div>
              <div className="text-[7px] text-violet-200 mt-0.5 uppercase tracking-wider">to review</div>
            </div>
          </div>
        </div>

        {/* The featured review card — Sandra */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden"
        >
          <div className="h-1 w-full bg-emerald-500" />
          <div className="p-3 md:p-4">
            <div className="flex gap-3">
              {/* Avatar + score */}
              <div className="flex flex-col items-center gap-1 shrink-0 w-11">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center text-[12px] font-bold text-white">
                  SM
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-bold leading-none text-emerald-600">94</div>
                  <div className="text-[8px] text-slate-400 leading-tight">/100</div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[14px] font-semibold text-slate-900 leading-tight">
                        Sandra Mills
                      </h4>
                      <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold bg-emerald-100 text-emerald-700">
                        Strong Yes
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-500 flex-wrap">
                      <span>F&I Manager</span>
                      <span className="text-slate-300">·</span>
                      <span>AutoNation Toyota</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition" type="button">
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <button className="flex items-center gap-1.5 text-[11px] font-semibold bg-violet-600 text-white rounded-md px-3 py-1.5 hover:bg-violet-700 transition shadow-sm" type="button">
                      <CheckCheck className="h-3 w-3" />
                      Shortlist
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-slate-700 leading-snug line-clamp-2">
                  12 years F&I at AutoNation + Hendrick. 145% per-copy objective. JM&A + Zurich + AFIP certified.
                </p>

                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5">
                    <CheckCircle className="h-2.5 w-2.5 shrink-0" />
                    12y dealer-group F&I
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5">
                    <CheckCircle className="h-2.5 w-2.5 shrink-0" />
                    145% per-copy
                  </span>
                </div>

                <div className="mt-2.5 flex gap-3">
                  <MiniBar label="Engagement" pct={95} />
                  <MiniBar label="Professional" pct={97} />
                  <MiniBar label="Fit" pct={94} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-3 text-center text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">
          + 11 more candidates ranked below
        </div>
      </div>
    </div>
  );
}

function MiniBar({ label, pct }: { label: string; pct: number }) {
  const color = pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="flex-1">
      <div className="flex justify-between mb-0.5">
        <span className="text-[9px] text-slate-500">{label}</span>
        <span className="text-[9px] font-semibold text-slate-700 tabular-nums">{pct}</span>
      </div>
      <div className="h-1 rounded-full bg-slate-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}
