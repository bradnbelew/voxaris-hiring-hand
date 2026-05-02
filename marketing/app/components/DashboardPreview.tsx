"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CheckCheck, CheckCircle, Inbox, TrendingUp, Users, X } from "lucide-react";

type Recommendation = "strong_yes" | "yes" | "maybe" | "no";

interface DashCandidate {
  name: string;
  role: string;
  score: number | null;
  rec: Recommendation;
  employer: string;
  date: string;
  summary: string;
  strengths: string[];
  concern: string | null;
  engagement: number | null;
  professional: number | null;
  gradient: string;
}

const CANDIDATES: DashCandidate[] = [
  {
    name: "Sandra Mills",
    role: "Finance & Insurance Manager",
    score: 94,
    rec: "strong_yes",
    employer: "AutoNation Toyota",
    date: "Mar 24",
    summary:
      "Twelve years of F&I experience at top national dealer groups with consistent 135–150% per-copy performance. Fully licensed in FL, JM&A and Zurich certified, deep CFPB compliance discipline. Strong leader who has trained finance office staff at two prior stores.",
    strengths: [
      "12y F&I at AutoNation + Hendrick",
      "135–150% per-copy objective",
      "JM&A + Zurich + AFIP certified",
    ],
    concern: "Currently $8K above mid-range comp band",
    engagement: 95,
    professional: 97,
    gradient: "from-fuchsia-500 to-purple-500",
  },
  {
    name: "Rachel Thompson",
    role: "Service Advisor",
    score: 91,
    rec: "strong_yes",
    employer: "Coggin Ford",
    date: "Mar 23",
    summary:
      "Six years of high-volume service advisor experience at OEM franchise store. ASE C1 certified, Reynolds & Reynolds and CDK fluent. RO upsell averages $445 vs ~$350 industry benchmark. Available opening shift and Saturdays.",
    strengths: [
      "6y high-volume service advisor",
      "$445 avg RO upsell vs ~$350 benchmark",
      "ASE C1 · R&R + CDK fluent",
    ],
    concern: "Notice period: 2 weeks at current employer",
    engagement: 92,
    professional: 94,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Marcus Williams",
    role: "Sales Consultant",
    score: 87,
    rec: "strong_yes",
    employer: "Group 1 Honda",
    date: "Mar 23",
    summary:
      "Eight years of automotive retail sales at AutoNation Chevrolet and Group 1 Honda. Documented 23% close rate on floor traffic. Relationship-based selling philosophy aligns with Prestige customer satisfaction culture.",
    strengths: [
      "8y automotive retail at major dealer groups",
      "23% close rate on floor traffic",
    ],
    concern: "Voluntary departure from prior role — brief follow-up suggested",
    engagement: 88,
    professional: 91,
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    name: "Kevin Park",
    role: "F&I Manager",
    score: 79,
    rec: "yes",
    employer: "Autonation Nissan",
    date: "Mar 22",
    summary:
      "Five years of F&I at a major dealer group franchise. Florida dealer license active. Zurich certified, solid compliance awareness. Good availability including weekends.",
    strengths: ["5y F&I at major dealer group", "FL dealer license + Zurich certified"],
    concern: "Less per-copy data than top F&I candidate",
    engagement: 79,
    professional: 83,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Tyler Johnson",
    role: "Parts Counter Specialist",
    score: 76,
    rec: "yes",
    employer: "O'Reilly Auto Parts",
    date: "Mar 22",
    summary:
      "Four years of parts counter and inventory management. Familiar with DMS lookup tools and OEM vs. aftermarket trade-offs. Full availability including evenings and weekends.",
    strengths: ["4y parts counter + inventory", "DMS lookup tools fluent"],
    concern: "No dealer-side experience yet",
    engagement: 76,
    professional: 78,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    name: "Brittany Chen",
    role: "Sales Consultant",
    score: 74,
    rec: "yes",
    employer: "Hendrick Honda",
    date: "Mar 22",
    summary:
      "Three years of Honda sales experience. Strong Honda brand and import product knowledge. Coachable, growth-oriented attitude. Available full schedule including weekends.",
    strengths: ["3y Honda dealership sales", "Strong import product knowledge"],
    concern: "Lower close-rate data vs top sales candidate",
    engagement: 74,
    professional: 79,
    gradient: "from-pink-500 to-rose-500",
  },
];

const COMPACT_ROWS: { name: string; role: string; score: number | null; rec: Recommendation; employer: string }[] = [
  { name: "Derek Okafor", role: "Service Advisor", score: 71, rec: "yes", employer: "Firestone Complete Auto Care" },
  { name: "Ashley Rivera", role: "BDC Representative", score: 62, rec: "maybe", employer: "NextGear Capital" },
  { name: "Jordan Martinez", role: "Sales Consultant", score: 58, rec: "maybe", employer: "Best Buy" },
  { name: "Brandon Lopez", role: "Sales Consultant", score: null, rec: "no", employer: "—" },
];

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      id="product"
      ref={ref}
      className="relative py-24 md:py-36 px-6 md:px-10 border-t border-paper-2 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fafafa 0%, #f4f5f9 50%, #fafafa 100%)",
      }}
    >
      {/* Subtle violet wash to bridge to dashboard chrome */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(124, 58, 237, 0.04) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-violet-700 mb-6">
          The product · 02
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-end">
          <div className="md:col-span-7">
            <h2 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2rem,5vw,4.25rem)] leading-[1.02] max-w-[20ch] text-ink">
              Your morning queue,{" "}
              <span className="font-serif italic font-normal text-violet-700">already ranked.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-ink/65 text-[16px] md:text-[17px] leading-relaxed">
              Every applicant interviewed, scored, and sorted by signal strength
              before you open your laptop. This is the actual dashboard your
              recruiters log into Tuesday morning.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16"
        >
          <DashboardWindow />
        </motion.div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {[
            ["Ranked queue", "Sorted by composite score the moment each interview ends."],
            ["Structured summary", "Same fields every time. No fishing through transcripts."],
            ["Strengths + concerns", "Pulled directly from the conversation, not boilerplate."],
            ["One-click shortlist", "Approved candidates land on the right recruiter's calendar."],
          ].map(([title, body]) => (
            <div key={title} className="border-l-2 border-violet-500 pl-4">
              <div className="font-sans font-semibold text-[15px] text-ink">{title}</div>
              <p className="mt-2 text-[13px] text-ink/65 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardWindow() {
  return (
    <div className="relative">
      {/* Soft halo behind the dashboard frame */}
      <div
        className="absolute inset-0 -m-10 rounded-[40px] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(124, 58, 237, 0.18) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div
        className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.25)]"
        style={{ background: "var(--color-slate-bg)" }}
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

        {/* Violet gradient banner — exact match to the real dashboard */}
        <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-5 md:px-8 py-6">
          <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 left-1/4 h-40 w-40 rounded-full bg-indigo-300/20 blur-2xl" />
          <div className="pointer-events-none absolute top-4 right-1/3 h-24 w-24 rounded-full bg-fuchsia-400/10 blur-2xl" />

          <div className="relative flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-violet-200 mb-1.5">
                Review Queue
              </p>
              <h3 className="text-[24px] md:text-[30px] font-bold text-white tracking-tight leading-tight">
                Pending Review
              </h3>
              <p className="mt-1.5 text-[13px] text-violet-200 max-w-md">
                AI-screened candidates ranked by fit score — shortlist the ones worth your time.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <BannerStat icon={<Inbox className="h-4 w-4 text-violet-200 shrink-0" />} value="22" label="To Review" />
              <BannerStat icon={<TrendingUp className="h-4 w-4 text-violet-200 shrink-0" />} value="78" label="Avg Score" />
              <BannerStat icon={<Users className="h-4 w-4 text-violet-200 shrink-0" />} value="6" label="Recommended" />
            </div>
          </div>
        </div>

        {/* Cards list */}
        <div className="px-4 md:px-6 py-5 space-y-3">
          {CANDIDATES.map((c) => (
            <ReviewCard key={c.name} candidate={c} />
          ))}

          {/* Compact rows — lower scores */}
          <div className="pt-2 mt-2 border-t border-slate-200/80">
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 px-2 mb-2">
              Lower priority — quick review
            </div>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-sm">
              {COMPACT_ROWS.map((r) => (
                <CompactRow key={r.name} row={r} />
              ))}
            </div>
          </div>

          <div className="text-center text-[11px] font-mono text-slate-400 pt-3">
            + 12 more candidates ranked
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
    <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5">
      {icon}
      <div>
        <p className="text-[20px] font-bold text-white leading-none tabular-nums">{value}</p>
        <p className="text-[10px] text-violet-200 mt-0.5 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

function ReviewCard({ candidate }: { candidate: DashCandidate }) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const accent = scoreAccent(candidate.score);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-violet-300/50 transition-all">
      <div className={`h-1 w-full ${accent.bar}`} />

      <div className="p-4 md:p-5">
        <div className="flex gap-4">
          {/* Avatar + score column */}
          <div className="flex flex-col items-center gap-1.5 shrink-0 w-12">
            <div
              className={`h-11 w-11 rounded-full bg-gradient-to-br ${candidate.gradient} flex items-center justify-center text-[13px] font-bold text-white`}
            >
              {initials}
            </div>
            {candidate.score !== null && (
              <div className="text-center">
                <div className={`text-[22px] font-bold leading-none ${accent.text}`}>
                  {candidate.score}
                </div>
                <div className="text-[9px] text-slate-400 leading-tight">/100</div>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-[15px] font-semibold text-slate-900 leading-tight">
                    {candidate.name}
                  </h4>
                  <RecPill rec={candidate.rec} />
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[12px] text-slate-500 flex-wrap">
                  <span>{candidate.role}</span>
                  <span className="text-slate-300">·</span>
                  <span>{candidate.date}</span>
                  <span className="hidden sm:inline truncate">· {candidate.employer}</span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 shrink-0">
                <button
                  className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition"
                  type="button"
                  aria-label="Archive"
                >
                  <X className="h-4 w-4" />
                </button>
                <button
                  className="flex items-center gap-1.5 text-[12px] font-semibold bg-violet-600 text-white rounded-lg px-3.5 py-2 shadow-sm hover:bg-violet-700 transition"
                  type="button"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Shortlist
                </button>
              </div>
            </div>

            <p className="mt-2.5 text-[13px] text-slate-700 leading-relaxed line-clamp-2">
              {candidate.summary}
            </p>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {candidate.strengths.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2.5 py-0.5"
                >
                  <CheckCircle className="h-3 w-3 shrink-0" />
                  <span className="truncate max-w-[200px]">{s}</span>
                </span>
              ))}
              {candidate.concern && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-100 rounded-full px-2.5 py-0.5">
                  <span className="truncate max-w-[200px]">{candidate.concern}</span>
                </span>
              )}
            </div>

            <div className="mt-3 flex gap-3 md:gap-5">
              <MiniBar label="Engagement" value={candidate.engagement} />
              <MiniBar label="Professional" value={candidate.professional} />
              <MiniBar label="Fit" value={candidate.score} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactRow({
  row,
}: {
  row: { name: string; role: string; score: number | null; rec: Recommendation; employer: string };
}) {
  const accent = scoreAccent(row.score);
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
        {row.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-slate-900 truncate">{row.name}</span>
          <RecPill rec={row.rec} />
        </div>
        <div className="text-[11px] text-slate-500 truncate">{row.role} · {row.employer}</div>
      </div>
      <div className="text-right shrink-0">
        <div className={`text-[16px] font-bold leading-none ${accent.text}`}>
          {row.score ?? "—"}
        </div>
        <div className="text-[9px] text-slate-400 mt-0.5">/100</div>
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
