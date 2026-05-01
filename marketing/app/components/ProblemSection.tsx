"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const NAMES = [
  "Maria V.", "Devon R.", "Aisha P.", "Marco B.", "Jose D.",
  "Tasha L.", "Ren K.", "Sara M.", "Liam O.", "Priya S.",
  "Noah K.", "Ana T.", "Quinn B.", "Yusuf A.", "Eli C.",
  "Hana J.", "Ravi M.", "Tess W.", "Imani N.", "Caleb F.",
  "Maya R.", "Diego H.", "Ines D.", "Owen P.", "Zara K.",
];
const ROLES = [
  "Banquet Server", "Forklift Op", "CNA", "Warehouse Assoc.",
  "Hospitality Lead", "Line Cook", "Caregiver", "Retail Assoc.",
  "Dispatcher", "Cashier", "Server", "Janitorial",
];

interface CardData {
  name: string;
  role: string;
  exp: string;
  stamp: "rejected" | "queued" | "no_response" | null;
}

const STAMPS = ["rejected", "queued", "no_response", null, null] as const;

function buildCards(count: number): CardData[] {
  return Array.from({ length: count }, (_, i) => ({
    name: NAMES[i % NAMES.length],
    role: ROLES[(i * 3) % ROLES.length],
    exp: `${1 + (i % 9)}y exp`,
    stamp: STAMPS[(i * 7) % STAMPS.length],
  }));
}

const STACK = buildCards(80);

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Resume column scrolls upward as user scrolls down through this section
  const stackY = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  // Stamp pile-up: number of visible stamps grows
  const stampPhase = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <section
      id="problem"
      ref={ref}
      className="relative bg-ink text-paper border-t border-line/40"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Resume stack column */}
        <div className="relative md:col-span-5 lg:col-span-5 h-[100vh] md:sticky md:top-0 overflow-hidden border-r border-line/30 bg-ink-2">
          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 h-32 z-20 pointer-events-none bg-gradient-to-b from-ink-2 to-transparent" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 z-20 pointer-events-none bg-gradient-to-t from-ink-2 to-transparent" />

          {/* Counter overlay */}
          <div className="absolute top-6 right-6 z-30 text-right">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper/40">
              Open req
            </div>
            <div className="font-sans font-semibold text-2xl text-paper">
              Banquet Server
            </div>
            <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-accent">
              {STACK.length} applicants
            </div>
          </div>

          {/* The stack itself */}
          <motion.div
            style={{ y: stackY }}
            className="absolute inset-x-4 top-0 flex flex-col gap-2 pt-12"
          >
            {STACK.map((c, i) => (
              <ResumeCard key={i} card={c} index={i} stampPhase={stampPhase} />
            ))}
          </motion.div>
        </div>

        {/* Right column: editorial */}
        <div className="md:col-span-7 lg:col-span-7 px-6 md:px-12 lg:px-16 py-24 md:py-40 flex flex-col justify-center min-h-[100vh]">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent mb-6">
            The problem · 01
          </div>

          <h2 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2rem,5vw,4.25rem)] leading-[1.02] max-w-[18ch]">
            The problem isn&apos;t candidates.{" "}
            <span className="font-serif italic font-normal text-accent">It&apos;s volume.</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 max-w-2xl">
            <Stat value="3,200" label="Avg applicants per open hourly role" />
            <Stat value="87 hrs" label="Manual screening time" sub="per role" />
            <Stat value="$18k" label="Lost productivity" sub="per unfilled month" />
            <Stat value="<5%" label="Of applicants ever get a callback" />
          </div>

          <p className="mt-12 text-paper/65 text-[16px] md:text-[17px] leading-relaxed max-w-xl">
            One human recruiter can read fast. They cannot read{" "}
            <span className="text-paper">three thousand résumés</span> a week, return every voicemail, and run a 30-minute pre-screen on each candidate worth a closer look. So the funnel ends where their day ends.
          </p>

          <p className="mt-6 text-paper/65 text-[16px] md:text-[17px] leading-relaxed max-w-xl">
            The candidates who would have been your best hires bounce to the next listing.
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="border-l border-line pl-4">
      <div className="font-sans font-semibold text-2xl md:text-3xl text-paper tabular-nums">
        {value}
      </div>
      <div className="mt-1 text-[11px] font-mono uppercase tracking-[0.15em] text-paper/55 leading-snug">
        {label}
      </div>
      {sub && (
        <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-paper/35">
          {sub}
        </div>
      )}
    </div>
  );
}

function ResumeCard({
  card,
  index,
  stampPhase,
}: {
  card: CardData;
  index: number;
  stampPhase: ReturnType<typeof useTransform<number, number>>;
}) {
  // Reveal stamps progressively based on stampPhase * total
  const stampOpacity = useTransform(stampPhase, [0, 1], [
    index < 8 ? 1 : 0,
    1,
  ]);

  return (
    <div className="relative bg-ink-3 border border-line/60 rounded-md px-3 py-2 flex items-center gap-3 shrink-0">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-line shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-medium text-paper/85 truncate">{card.name}</div>
        <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-paper/40 truncate">
          {card.role} · {card.exp}
        </div>
      </div>

      {/* Stamp */}
      {card.stamp && (
        <motion.div
          style={{ opacity: stampOpacity }}
          className={`shrink-0 px-1.5 py-0.5 rounded-sm border text-[9px] font-mono uppercase tracking-[0.1em] -rotate-3 ${stampClasses(card.stamp)}`}
        >
          {stampLabel(card.stamp)}
        </motion.div>
      )}
    </div>
  );
}

function stampClasses(s: NonNullable<CardData["stamp"]>) {
  switch (s) {
    case "rejected":
      return "border-paper/40 text-paper/55";
    case "queued":
      return "border-accent/50 text-accent";
    case "no_response":
      return "border-paper/30 text-paper/40";
  }
}

function stampLabel(s: NonNullable<CardData["stamp"]>) {
  switch (s) {
    case "rejected":
      return "✕ rejected";
    case "queued":
      return "queued · day 4";
    case "no_response":
      return "no reply";
  }
}
