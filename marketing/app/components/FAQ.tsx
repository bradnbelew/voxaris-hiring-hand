"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const FAQS = [
  {
    q: "How is this different from an AI chatbot screener?",
    a: "Jordan is video-first. Candidates see and hear a face, deliver answers in plain speech, and the visual + audio signal — eye contact, tone, hesitation — gets analyzed alongside the words. That gives you a screen that feels like an interview, not a form. The result is qualitative summaries plus quantitative scores, not just keyword matches.",
  },
  {
    q: "Can the candidate tell it's AI? Is that legal?",
    a: "Yes — and it has to be. Jordan opens every session with explicit disclosure: he is an AI, the session is recorded, no automated hiring decision is made, and the candidate can opt for a human interview at any time. This is required under Florida SB 482, Illinois AI Video Interview Act, NYC Automated Employment Decision Tool rules, and the EU AI Act. We bake the disclosure into the first turn so you can't accidentally skip it.",
  },
  {
    q: "What about EEOC compliance and protected-class disclosures?",
    a: "Jordan never asks about age, race, religion, national origin, marital status, pregnancy, disability status, or any other protected class. If a candidate volunteers protected-class info, Jordan acknowledges, redirects, and the disclosure does not influence the score. Every interview is logged with timestamped transcript, available for audit on request.",
  },
  {
    q: "What roles is this best for?",
    a: "High-volume hourly and structured-skill roles: hospitality, healthcare support (CNA, HHA), light industrial, warehouse, retail, dispatch. Anywhere you have more applicants than recruiters and the screening criteria are well-defined. Less effective today for senior knowledge-work roles where unstructured judgment dominates.",
  },
  {
    q: "How does this integrate with our ATS?",
    a: "Two paths. (1) Webhook: we POST scored candidate cards to whatever ATS endpoint you give us — Greenhouse, Lever, BambooHR, ICIMS, custom. (2) Embed: we render Jordan inside an iframe on your apply page; candidates never leave your domain. Pick one or both at setup. Setup time: usually 1–3 days from contract.",
  },
  {
    q: "What languages does Jordan speak?",
    a: "47 languages with native-feeling voice and turn-taking, including Spanish, Mandarin, Tagalog, Haitian Creole, Vietnamese, Portuguese, French, and Arabic. Candidate picks at session start. Transcripts are stored in original language plus an English translation for the recruiter dashboard.",
  },
  {
    q: "How is pricing structured?",
    a: "Per-interview, per-role, or unlimited monthly — picked to match your volume. Most clients land between replacing one full-time recruiter ($60K/yr) and three. Book a 20-minute demo and we'll size it against your real volume.",
  },
  {
    q: "Where is candidate data stored, and for how long?",
    a: "Tavus handles video infra; transcripts and structured candidate data live in our Supabase instance (US-East), encrypted at rest. Default retention is 90 days post-interview, configurable per client. Candidates can request deletion at any time per CCPA/GDPR.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-paper text-ink py-24 md:py-32 px-6 md:px-10 border-t border-paper-2">
      <div className="max-w-4xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink/50 mb-6">
          Anticipated objections · 08
        </div>

        <h2 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] max-w-[18ch]">
          The questions you&apos;d ask{" "}
          <span className="font-serif italic font-normal">on the demo call.</span>
        </h2>

        <div className="mt-12 border-t border-ink/10">
          {FAQS.map((f, i) => (
            <FaqRow key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ink/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <span className="font-sans font-medium text-[16px] md:text-[18px] text-ink group-hover:text-accent-2 transition-colors">
          {q}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center text-ink transition-transform ${open ? "rotate-45 bg-accent border-accent" : ""}`}
        >
          <span className="text-[12px] leading-none">+</span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-[15px] text-ink/70 leading-relaxed max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
