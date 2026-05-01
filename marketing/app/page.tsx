import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />

      {/* How it works — terminal-style data section */}
      <section id="how" className="bg-jordan-bg text-jordan-glow py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-jordan-glow/60">
            How it works
          </div>
          <h2 className="font-serif italic text-4xl md:text-6xl mt-3 leading-tight max-w-[18ch]">
            Jordan does the first interview.{" "}
            <span className="not-italic font-sans text-electric">
              You do the last.
            </span>
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                label: "Candidate applies",
                body: "From your job board, an SMS link, or an Indeed reply. Jordan picks up within 60 seconds, day or night.",
              },
              {
                step: "02",
                label: "Jordan screens",
                body: "Structured, EEOC-compliant, video-first. He follows your role brief, scores against your rubric, flags strong signal in real time.",
              },
              {
                step: "03",
                label: "You decide",
                body: "Approved candidates land on your recruiter's calendar. Rejected ones get a kind, immediate response. Inbox: empty.",
              },
            ].map((s) => (
              <div key={s.step}>
                <div className="font-mono text-xs text-jordan-glow/40">{s.step}</div>
                <div className="font-serif italic text-2xl mt-2">{s.label}</div>
                <p className="text-sm text-jordan-glow/70 leading-relaxed mt-3">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live ops terminal aesthetic */}
      <section id="proof" className="bg-paper py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
            Live this minute
          </div>
          <h2 className="font-serif italic text-4xl md:text-6xl mt-3 leading-tight max-w-[20ch]">
            What Jordan is doing right now.
          </h2>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-sm">
            {[
              ["Interviews live", "23"],
              ["Roles screened today", "487"],
              ["Avg time to shortlist", "14m"],
              ["Languages supported", "47"],
            ].map(([label, val]) => (
              <div key={label} className="border-l-2 border-electric pl-4">
                <div className="text-[10px] uppercase tracking-widest text-ink-faint">
                  {label}
                </div>
                <div className="font-serif text-4xl md:text-5xl mt-1 text-ink not-italic">
                  {val}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-jordan-bg text-jordan-glow rounded-lg p-6 font-mono text-xs leading-loose">
            <div className="text-jordan-glow/40">$ tail -f hiringhand.live</div>
            <div className="mt-2">
              <span className="text-emerald-400">✓</span> 14:02:11 · Maria · Banquet Server · scored 8.4 · routed to Lisa{" "}
              <span className="text-jordan-glow/40">(Anchor Hospitality)</span>
            </div>
            <div>
              <span className="text-emerald-400">✓</span> 14:02:43 · Devon · Forklift Op · scored 7.1 · routed to Marcus{" "}
              <span className="text-jordan-glow/40">(GulfWorks Staffing)</span>
            </div>
            <div>
              <span className="text-amber">!</span> 14:03:08 · candidate paused — Jordan rephrased question
            </div>
            <div>
              <span className="text-emerald-400">✓</span> 14:03:51 · Aisha · CNA · scored 9.1 ·{" "}
              <span className="text-electric">strong signal flagged</span>
            </div>
            <div className="text-jordan-glow/40">…</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="bg-paper-2 py-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
            Two ways to start
          </div>
          <h2 className="font-serif italic text-5xl md:text-7xl mt-4 leading-[0.95] text-ink">
            Talk to Jordan, <br />or talk to us.
          </h2>
          <p className="mt-6 text-ink-soft text-lg max-w-xl mx-auto">
            Sit on the candidate side for 60 seconds and feel what your applicants will feel. Or book a 20-minute demo and we&apos;ll wire Jordan into your hiring pipeline.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/talk"
              className="px-6 py-3 border border-ink rounded-full text-sm font-medium hover:bg-ink hover:text-paper transition"
            >
              Talk to Jordan now
            </a>
            <a
              href="mailto:hello@hiringhand.io?subject=Hiring%20Hand%20demo"
              className="px-6 py-3 bg-electric text-paper rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              Book a demo
            </a>
          </div>
          <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Booking via Cal.com — coming soon
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
