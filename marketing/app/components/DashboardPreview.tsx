"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      id="product"
      ref={ref}
      className="relative bg-paper text-ink py-24 md:py-36 px-6 md:px-10 border-t border-paper-2"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink/50 mb-6">
          The product · 02
        </div>

        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <h2 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2rem,5vw,4.25rem)] leading-[1.02] max-w-[20ch]">
              What lands on your desk:{" "}
              <span className="font-serif italic font-normal">
                every candidate, scored.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-ink/65 text-[16px] md:text-[17px] leading-relaxed">
              Jordan finishes the interview. Twelve seconds later, this card is in your dashboard. Score, summary, strengths, concerns, and a transcript you can scrub. The only thing left is your judgment call.
            </p>
          </div>
        </div>

        {/* The dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 md:mt-20"
        >
          <DashboardWindow inView={inView} />
        </motion.div>

        {/* Below dashboard: feature row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {[
            ["Live scoring", "Each answer scored against your rubric in real time."],
            ["Structured summary", "Every interview, the same fields. No fishing through transcripts."],
            ["EEOC-compliant", "Disclosure, consent, protected-class guardrails baked in."],
            ["One click to schedule", "Approved candidates land on the right recruiter's calendar."],
          ].map(([title, body]) => (
            <div key={title} className="border-l-2 border-accent pl-4">
              <div className="font-sans font-semibold text-[15px] text-ink">
                {title}
              </div>
              <p className="mt-2 text-[13px] text-ink/65 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardWindow({ inView }: { inView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ringFill = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div
      ref={ref}
      className="bg-ink rounded-2xl border border-line shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-ink-2">
        <span className="w-2.5 h-2.5 rounded-full bg-paper/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-paper/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-paper/15" />
        <div className="ml-3 text-[11px] font-mono text-paper/40">
          dashboard.hiringhand.io / candidates / maria-vega
        </div>
        <div className="ml-auto flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          live
        </div>
      </div>

      {/* Body */}
      <div className="grid lg:grid-cols-12 bg-ink text-paper">
        {/* Left: candidate header + transcript */}
        <div className="lg:col-span-8 p-6 md:p-8 border-r border-line/50">
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-full shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, #2a2d36 0%, #4a4d56 50%, #2a2d36 100%)",
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-sans font-semibold text-2xl">Maria Vega</h3>
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent border border-accent/40 px-2 py-0.5 rounded-full">
                  Strong signal
                </span>
              </div>
              <div className="mt-1 text-[13px] font-mono text-paper/55 uppercase tracking-[0.1em]">
                Banquet Server · Anchor Hospitality · Interview 14m 22s
              </div>
              <div className="mt-3 text-[14px] text-paper/75 italic font-serif">
                &ldquo;Calm under pressure, hospitality-fluent, available evenings.
                Recommend scheduling.&rdquo;
              </div>
            </div>
          </div>

          {/* Strengths / Concerns chips */}
          <div className="mt-7 grid sm:grid-cols-2 gap-6">
            <ChipGroup
              label="Strengths"
              items={[
                "4y banquet experience",
                "ServSafe certified",
                "Available evenings + weekends",
                "Bilingual EN/ES",
              ]}
              tone="positive"
            />
            <ChipGroup
              label="Concerns"
              items={["No driver's license", "Notice period: 2 wks"]}
              tone="warn"
            />
          </div>

          {/* Transcript scrub */}
          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-paper/55">
                Transcript · jump to moment
              </div>
              <div className="text-[10px] font-mono text-paper/40">14:22 total</div>
            </div>
            <div className="space-y-2 font-mono text-[12px]">
              <TranscriptRow time="00:42" who="Jordan" text="Walk me through your last banquet shift." />
              <TranscriptRow
                time="02:11"
                who="Maria"
                text="We had a 200-person rehearsal dinner that turned into 240. I…"
                highlight
              />
              <TranscriptRow time="05:33" who="Jordan" text="What's the longest shift you've held?" />
              <TranscriptRow time="07:01" who="Maria" text="Twelve hours, opening to close. I'm comfortable on my feet." />
              <TranscriptRow time="10:14" who="Jordan" text="Are you authorized to work in the US?" />
              <TranscriptRow time="10:16" who="Maria" text="Yes." />
            </div>
          </div>
        </div>

        {/* Right: score ring + decision */}
        <div className="lg:col-span-4 p-6 md:p-8 flex flex-col gap-6 bg-ink-2">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-paper/55">
            Composite score
          </div>

          <div className="flex items-center justify-center py-2">
            <ScoreRing value={8.4} max={10} progress={ringFill} />
          </div>

          {/* Sub-scores */}
          <div className="space-y-3">
            <SubScore label="Communication" value={9.0} />
            <SubScore label="Relevant experience" value={8.7} />
            <SubScore label="Reliability signal" value={8.1} />
            <SubScore label="Job fit (rubric)" value={7.8} />
          </div>

          {/* Decision buttons */}
          <div className="mt-auto pt-4 border-t border-line/50 flex flex-col gap-2">
            <button className="w-full px-4 py-3 bg-accent hover:bg-accent-2 text-ink rounded-md text-[13px] font-medium transition flex items-center justify-between">
              <span>Schedule with Lisa</span>
              <span>→</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-4 py-2.5 border border-line hover:border-paper/40 text-paper/80 rounded-md text-[12px] font-mono uppercase tracking-[0.1em] transition">
                Hold
              </button>
              <button className="px-4 py-2.5 text-paper/40 hover:text-paper/70 rounded-md text-[12px] font-mono uppercase tracking-[0.1em] transition">
                Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChipGroup({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "positive" | "warn";
}) {
  const dotClass = tone === "positive" ? "bg-accent" : "bg-paper/40";
  return (
    <div>
      <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-paper/55 mb-3">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <span
            key={it}
            className="inline-flex items-center gap-2 bg-ink-3 border border-line/70 rounded-full px-3 py-1 text-[12px] text-paper/85"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

function TranscriptRow({
  time,
  who,
  text,
  highlight,
}: {
  time: string;
  who: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex gap-3 px-3 py-1.5 rounded-md ${
        highlight ? "bg-accent/10 border border-accent/30" : "hover:bg-ink-2"
      } transition cursor-pointer`}
    >
      <span className="tabular-nums text-paper/40 shrink-0">{time}</span>
      <span className={`shrink-0 ${who === "Jordan" ? "text-accent" : "text-paper/70"}`}>
        {who}:
      </span>
      <span className="text-paper/80 truncate">{text}</span>
    </div>
  );
}

function SubScore({ label, value }: { label: string; value: number }) {
  const pct = (value / 10) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12px] text-paper/70">{label}</span>
        <span className="font-sans font-semibold text-[14px] text-paper tabular-nums">
          {value.toFixed(1)}
        </span>
      </div>
      <div className="h-1 bg-line rounded-full overflow-hidden">
        <div
          className="h-full bg-accent"
          style={{ width: `${pct}%`, transition: "width 1.2s ease-out" }}
        />
      </div>
    </div>
  );
}

function ScoreRing({
  value,
  max,
  progress,
}: {
  value: number;
  max: number;
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  const r = 72;
  const c = 2 * Math.PI * r;
  const target = (value / max) * c;
  const dashOffset = useTransform(progress, [0, 1], [c, c - target]);

  return (
    <div className="relative w-44 h-44">
      <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="6"
        />
        <motion.circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-sans font-semibold text-5xl tabular-nums text-paper">
          {value.toFixed(1)}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper/40 mt-1">
          / {max}
        </div>
      </div>
    </div>
  );
}
