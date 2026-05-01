"use client";

import { motion } from "motion/react";

const ROWS = [
  {
    label: "Time to first contact",
    hh: "60 seconds",
    recruiter: "1–4 days",
    ats: "Auto, but no screening",
    chatbot: "Instant, text-only",
  },
  {
    label: "Conducts a real interview",
    hh: true,
    recruiter: true,
    ats: false,
    chatbot: false,
  },
  {
    label: "Video-first (face to face)",
    hh: true,
    recruiter: true,
    ats: false,
    chatbot: false,
  },
  {
    label: "Runs 24/7 / 47 languages",
    hh: true,
    recruiter: false,
    ats: "n/a",
    chatbot: "Limited",
  },
  {
    label: "Structured score per candidate",
    hh: true,
    recruiter: "Subjective",
    ats: "Keyword match",
    chatbot: "Limited",
  },
  {
    label: "EEOC + AIVIA + AEDT compliant",
    hh: true,
    recruiter: "Depends",
    ats: "Depends",
    chatbot: "Often no",
  },
  {
    label: "Marginal cost per interview",
    hh: "Low",
    recruiter: "$60–120",
    ats: "$0",
    chatbot: "Low",
  },
  {
    label: "Cost annually (1,000 hires)",
    hh: "—",
    recruiter: "$60K+ recruiter salary",
    ats: "Sunk software cost",
    chatbot: "Software cost",
  },
];

interface Col {
  key: "hh" | "recruiter" | "ats" | "chatbot";
  label: string;
  primary?: boolean;
}

const COLS: Col[] = [
  { key: "hh", label: "Hiring Hand", primary: true },
  { key: "recruiter", label: "Human recruiter" },
  { key: "ats", label: "ATS auto-screen" },
  { key: "chatbot", label: "AI chatbot screener" },
];

export function ComparisonTable() {
  return (
    <section id="compare" className="bg-paper text-ink py-24 md:py-32 px-6 md:px-10 border-t border-paper-2">
      <div className="max-w-6xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink/55 mb-6">
          Where Jordan fits · 05
        </div>
        <h2 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2rem,5vw,4rem)] leading-[1.05] max-w-[22ch]">
          Not a chatbot.{" "}
          <span className="font-serif italic font-normal">Not another recruiter.</span>
        </h2>
        <p className="mt-6 text-ink/65 max-w-xl text-[16px] leading-relaxed">
          The other options either don&apos;t scale, don&apos;t score, or
          don&apos;t feel like a real conversation. Jordan is purpose-built for
          one job: the structured first-round interview, at any volume.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 overflow-x-auto"
        >
          <div className="min-w-[720px] grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-px bg-paper-3 rounded-xl overflow-hidden border border-paper-3">
            {/* Header row */}
            <div className="bg-paper-2 px-5 py-4 text-[11px] font-mono uppercase tracking-[0.15em] text-ink/55">
              &nbsp;
            </div>
            {COLS.map((col) => (
              <div
                key={col.key}
                className={`px-5 py-4 text-[13px] font-sans font-semibold ${
                  col.primary
                    ? "bg-ink text-paper"
                    : "bg-paper-2 text-ink/85"
                }`}
              >
                {col.label}
                {col.primary && (
                  <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent mt-0.5">
                    What we do
                  </div>
                )}
              </div>
            ))}

            {/* Rows */}
            {ROWS.map((row) => (
              <RowGroup key={row.label} row={row} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type RowVal = string | boolean;
interface RowData {
  label: string;
  hh: RowVal;
  recruiter: RowVal;
  ats: RowVal;
  chatbot: RowVal;
}

function RowGroup({ row }: { row: RowData }) {
  return (
    <>
      <div className="bg-paper px-5 py-3.5 text-[14px] text-ink/80">{row.label}</div>
      <Cell value={row.hh} primary />
      <Cell value={row.recruiter} />
      <Cell value={row.ats} />
      <Cell value={row.chatbot} />
    </>
  );
}

function Cell({ value, primary }: { value: RowVal; primary?: boolean }) {
  if (typeof value === "boolean") {
    return (
      <div
        className={`px-5 py-3.5 text-[14px] flex items-center ${
          primary ? "bg-ink text-paper" : "bg-paper text-ink/80"
        }`}
      >
        {value ? (
          <span className={`${primary ? "text-accent" : "text-accent-2"}`}>
            ●
          </span>
        ) : (
          <span className={primary ? "text-paper/30" : "text-ink/25"}>—</span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`px-5 py-3.5 text-[13px] ${
        primary ? "bg-ink text-paper font-sans font-medium" : "bg-paper text-ink/65"
      }`}
    >
      {value}
    </div>
  );
}
