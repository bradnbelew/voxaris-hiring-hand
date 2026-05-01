"use client";

import { motion } from "motion/react";

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative bg-ink text-paper py-24 md:py-36 px-6 md:px-10 border-t border-line/40 grain"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent mb-6">
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
            title="Candidates apply."
            body="From your job board, an SMS link, an Indeed reply, or a QR code at a hiring event. Jordan picks up within 60 seconds — day, night, weekend, holiday."
            visual={<ApplyVisual />}
          />
          <Step
            n="02"
            title="Jordan interviews."
            body="Structured, EEOC-compliant, video-first. He follows your role rubric, asks behavioral questions, scores live. The candidate sees a face, not a chatbot."
            visual={<InterviewVisual />}
            reverse
          />
          <Step
            n="03"
            title="You decide."
            body="A scored card with summary, strengths, concerns, and a scrubbable transcript lands on your dashboard. Approve, hold, or pass — one click. Approved candidates get scheduled, rejected candidates get a kind reply."
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
        <div className="text-[60px] md:text-[88px] font-sans font-semibold tabular-nums leading-none text-paper/15">
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

/* === Step visuals === */

function ApplyVisual() {
  return (
    <div className="relative h-72 md:h-96 bg-ink-2 border border-line/60 rounded-2xl overflow-hidden flex items-center justify-center">
      {/* Phone frame */}
      <div className="relative w-44 h-80 bg-ink rounded-[28px] border border-line shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] p-3">
        <div className="h-full w-full bg-ink-2 rounded-[22px] p-4 flex flex-col">
          <div className="flex items-center justify-between text-[9px] font-mono text-paper/40">
            <span>9:41</span>
            <span className="flex gap-1">
              <span className="w-3 h-1 bg-paper/40 rounded-sm" />
              <span className="w-3 h-1 bg-paper/40 rounded-sm" />
              <span className="w-3 h-1 bg-paper/60 rounded-sm" />
            </span>
          </div>
          <div className="mt-2 text-[10px] font-mono uppercase tracking-[0.15em] text-paper/40">
            iMessage
          </div>
          <div className="mt-3 self-start max-w-[80%] bg-ink-3 border border-line/70 rounded-lg rounded-tl-sm px-3 py-2 text-[11px] text-paper/85">
            You applied to Banquet Server at Anchor Hospitality. Tap to start your interview with Jordan now.
          </div>
          <div className="mt-3 self-start bg-accent text-ink rounded-md px-2.5 py-1.5 text-[10px] font-medium">
            ▶ Start interview
          </div>
          <div className="mt-auto text-center text-[9px] font-mono text-accent">
            ● Connected
          </div>
        </div>
      </div>

      {/* Particles around phone */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-accent/50 rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + ((i * 11) % 40)}%`,
              animation: `pulse-soft ${2 + (i % 3) * 0.5}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function InterviewVisual() {
  return (
    <div className="relative h-72 md:h-96 bg-ink-2 border border-line/60 rounded-2xl overflow-hidden flex items-center justify-center">
      {/* Two-bubble face-to-face */}
      <div className="grid grid-cols-2 gap-6 w-[85%]">
        <Bubble label="Jordan" subtitle="AI Interviewer" tone="accent" />
        <Bubble label="Candidate" subtitle="Maria · Banquet Server" tone="paper" />
      </div>

      {/* Connecting line w/ data flow */}
      <div className="absolute top-1/2 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent">
        <div className="absolute inset-y-0 w-12 bg-accent shadow-[0_0_12px_var(--color-accent)] rounded-full"
          style={{ animation: "drift 2.5s linear infinite", left: "0" }}
        />
      </div>

      {/* Live tag */}
      <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-accent">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        live · 04:21
      </div>

      {/* Bottom transcript flash */}
      <div className="absolute bottom-4 left-4 right-4 bg-ink/80 backdrop-blur border border-line/60 rounded-md px-3 py-2 font-mono text-[11px]">
        <span className="text-accent">Jordan:</span>{" "}
        <span className="text-paper/80 cursor-blink">Walk me through your last banquet shift</span>
      </div>
    </div>
  );
}

function Bubble({
  label,
  subtitle,
  tone,
}: {
  label: string;
  subtitle: string;
  tone: "accent" | "paper";
}) {
  const ring = tone === "accent" ? "ring-accent/40" : "ring-paper/20";
  const glow = tone === "accent" ? "shadow-[0_0_40px_rgba(34,215,126,0.25)]" : "";
  const fill =
    tone === "accent"
      ? "linear-gradient(135deg, #1a3a26 0%, #225433 50%, #1a3a26 100%)"
      : "linear-gradient(135deg, #2a2d36 0%, #4a4d56 50%, #2a2d36 100%)";

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`w-24 h-24 md:w-28 md:h-28 rounded-full ring-2 ${ring} ${glow}`}
        style={{ background: fill, animation: "pulse-soft 4s ease-in-out infinite" }}
      />
      <div className="text-center">
        <div className="font-sans font-semibold text-sm">{label}</div>
        <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-paper/45">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function DecideVisual() {
  return (
    <div className="relative h-72 md:h-96 bg-ink-2 border border-line/60 rounded-2xl overflow-hidden p-5">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper/40 mb-3">
        dashboard · today
      </div>

      <div className="space-y-2">
        {[
          { n: "Maria V.", role: "Banquet Server", score: "8.4", state: "ready" },
          { n: "Devon R.", role: "Forklift Op", score: "7.1", state: "ready" },
          { n: "Aisha P.", role: "CNA", score: "9.1", state: "approved" },
          { n: "Marco B.", role: "Forklift Op", score: "5.4", state: "passed" },
          { n: "Jose D.", role: "Banquet Server", score: "8.0", state: "ready" },
          { n: "Tasha L.", role: "Banquet Server", score: "7.8", state: "ready" },
        ].map((row, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-3 py-2 rounded-md border text-[12px] ${
              row.state === "approved"
                ? "bg-accent/10 border-accent/40"
                : row.state === "passed"
                  ? "bg-ink-3 border-line/40 opacity-50"
                  : "bg-ink-3 border-line/60"
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-line shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-paper/90 truncate">{row.n}</div>
              <div className="text-[10px] font-mono text-paper/45 uppercase tracking-[0.1em] truncate">
                {row.role}
              </div>
            </div>
            <div className="font-sans font-semibold text-paper tabular-nums">{row.score}</div>
            {row.state === "approved" && (
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-accent border border-accent/40 px-1.5 py-0.5 rounded-sm">
                scheduled
              </span>
            )}
            {row.state === "passed" && (
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-paper/40 border border-line/40 px-1.5 py-0.5 rounded-sm">
                pass
              </span>
            )}
            {row.state === "ready" && (
              <button className="text-[9px] font-mono uppercase tracking-[0.15em] text-ink bg-accent px-2 py-0.5 rounded-sm">
                review
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
