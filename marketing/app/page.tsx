"use client";

import { useEffect, useRef } from "react";

// ──────────────────────────────────────────────────────────────
// Color interpolation tables — drives the dawn animation
// ──────────────────────────────────────────────────────────────
type Stop = { at: number; val: number[]; a?: number };
const hex = (s: string) => {
  const c = s.replace("#", "");
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
};
const mix = (a: number[], b: number[], t: number) => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];
const rgb = (arr: number[]) => `rgb(${arr[0]},${arr[1]},${arr[2]})`;
const rgba = (arr: number[], a: number) => `rgba(${arr[0]},${arr[1]},${arr[2]},${a})`;

const SKY_TOP: Stop[] = [
  { at: 0.0, val: hex("#050714") },
  { at: 0.18, val: hex("#0a0d22") },
  { at: 0.32, val: hex("#161538") },
  { at: 0.46, val: hex("#2c1f48") },
  { at: 0.58, val: hex("#5a2e4d") },
  { at: 0.7, val: hex("#9c4d34") },
  { at: 0.82, val: hex("#dba26a") },
  { at: 1.0, val: hex("#fbf2da") },
];
const SKY_BOT: Stop[] = [
  { at: 0.0, val: hex("#0a0e22") },
  { at: 0.18, val: hex("#15182f") },
  { at: 0.32, val: hex("#1f1b3a") },
  { at: 0.46, val: hex("#3a2548") },
  { at: 0.58, val: hex("#7a3d40") },
  { at: 0.7, val: hex("#cb6a36") },
  { at: 0.82, val: hex("#f0c887") },
  { at: 1.0, val: hex("#fbf2da") },
];
const SUN_CORE: Stop[] = [
  { at: 0.0, val: [255, 220, 150], a: 0 },
  { at: 0.4, val: [255, 220, 150], a: 0 },
  { at: 0.55, val: [255, 215, 145], a: 0.55 },
  { at: 0.7, val: [255, 230, 170], a: 0.85 },
  { at: 0.85, val: [255, 248, 220], a: 0.95 },
  { at: 1.0, val: [255, 252, 230], a: 0.9 },
];
const SUN_GLOW: Stop[] = [
  { at: 0.0, val: [255, 180, 110], a: 0 },
  { at: 0.4, val: [255, 180, 110], a: 0 },
  { at: 0.55, val: [255, 175, 100], a: 0.35 },
  { at: 0.7, val: [255, 195, 130], a: 0.55 },
  { at: 0.85, val: [255, 220, 175], a: 0.55 },
  { at: 1.0, val: [255, 230, 200], a: 0.4 },
];
const TEXT: Stop[] = [
  { at: 0.0, val: hex("#efe7d6") },
  { at: 0.62, val: hex("#efe7d6") },
  { at: 0.74, val: hex("#80684b") },
  { at: 0.86, val: hex("#3a2c1c") },
  { at: 1.0, val: hex("#181410") },
];
const CTA_FG: Stop[] = [
  { at: 0.0, val: hex("#181410") },
  { at: 0.62, val: hex("#181410") },
  { at: 0.86, val: hex("#fbf2da") },
  { at: 1.0, val: hex("#fbf2da") },
];
const TEXT_SOFT: Stop[] = [
  { at: 0.0, val: hex("#a59f8c") },
  { at: 0.62, val: hex("#a59f8c") },
  { at: 0.78, val: hex("#7a6c52") },
  { at: 1.0, val: hex("#5a4a36") },
];
const TEXT_MUTE: Stop[] = [
  { at: 0.0, val: hex("#7c7666") },
  { at: 0.62, val: hex("#7c7666") },
  { at: 0.78, val: hex("#82745a") },
  { at: 1.0, val: hex("#7a6a52") },
];
const RULE: Stop[] = [
  { at: 0.0, val: hex("#3d3a2c") },
  { at: 0.55, val: hex("#3d3a2c") },
  { at: 0.78, val: hex("#7a6a52") },
  { at: 1.0, val: hex("#a59778") },
];

function interp(stops: Stop[], t: number) {
  if (t <= stops[0].at) return stops[0];
  if (t >= stops[stops.length - 1].at) return stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i],
      b = stops[i + 1];
    if (t >= a.at && t <= b.at) {
      const local = (t - a.at) / (b.at - a.at);
      const out: Stop = { at: t, val: mix(a.val, b.val, local) };
      if (a.a !== undefined && b.a !== undefined) out.a = a.a + (b.a - a.a) * local;
      return out;
    }
  }
  return stops[stops.length - 1];
}

const pad = (n: number) => String(n).padStart(2, "0");
function fmtTime(t: number) {
  const totalMin = 23 * 60 + Math.floor(t * 10 * 60);
  const hr = Math.floor(totalMin / 60) % 24;
  const min = totalMin % 60;
  const ampm = hr >= 12 && hr < 24 ? "PM" : "AM";
  let h12 = hr % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${pad(min)} ${ampm}`;
}

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const skyboxRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  // Generate stars + wire scroll handlers
  useEffect(() => {
    const starsEl = starsRef.current;
    const skyboxEl = skyboxRef.current;
    const root = document.documentElement;
    document.body.classList.add("dawn-body");

    // Stars
    if (starsEl && starsEl.childElementCount === 0) {
      const N = 110;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < N; i++) {
        const s = document.createElement("div");
        s.className = "star";
        const size = Math.random() < 0.12 ? 2 : 1;
        const o = 0.25 + Math.random() * 0.75;
        s.style.left = (Math.random() * 100).toFixed(2) + "vw";
        s.style.top = (Math.random() * 95).toFixed(2) + "vh";
        s.style.width = s.style.height = size + "px";
        s.style.setProperty("--o", o.toFixed(2));
        s.style.opacity = o.toFixed(2);
        s.style.animationDelay = (Math.random() * 5).toFixed(2) + "s";
        s.style.animationDuration = (3.5 + Math.random() * 4).toFixed(1) + "s";
        frag.appendChild(s);
      }
      starsEl.appendChild(frag);
    }

    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      root.style.setProperty("--scroll", t.toFixed(4));

      const top = interp(SKY_TOP, t).val;
      const bot = interp(SKY_BOT, t).val;
      if (skyboxEl) {
        skyboxEl.style.background = `linear-gradient(to bottom, ${rgb(top)} 0%, ${rgb(bot)} 100%)`;
      }

      const core = interp(SUN_CORE, t);
      const glow = interp(SUN_GLOW, t);
      root.style.setProperty("--sun-core", rgba(core.val, core.a ?? 0));
      root.style.setProperty("--sun-glow", rgba(glow.val, glow.a ?? 0));

      let sunY: number;
      if (t < 0.4) sunY = 70;
      else if (t < 0.85) sunY = 70 - ((t - 0.4) / 0.45) * 90;
      else sunY = -20 - ((t - 0.85) / 0.15) * 10;
      root.style.setProperty("--sun-y", sunY.toFixed(1) + "vh");

      const horizonOp = Math.min(1, Math.max(0, (t - 0.35) / 0.35));
      root.style.setProperty("--horizon-op", horizonOp.toFixed(3));

      const starsOp = Math.max(0, 1 - t / 0.55);
      if (starsEl) starsEl.style.setProperty("--stars-op", starsOp.toFixed(3));

      root.style.setProperty("--text", rgb(interp(TEXT, t).val));
      root.style.setProperty("--text-soft", rgb(interp(TEXT_SOFT, t).val));
      root.style.setProperty("--text-mute", rgb(interp(TEXT_MUTE, t).val));
      root.style.setProperty("--rule", rgb(interp(RULE, t).val));
      root.style.setProperty("--cta-fg", rgb(interp(CTA_FG, t).val));

      const time = fmtTime(t);
      document.querySelectorAll(".js-clock").forEach((el) => {
        (el as HTMLElement).textContent = time;
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    // Reveal observer
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      io.disconnect();
      document.body.classList.remove("dawn-body");
    };
  }, []);

  return (
    <div className="dawn">
      <div ref={skyboxRef} className="skybox" aria-hidden="true" />
      <div ref={starsRef} className="stars" aria-hidden="true" />
      <div className="sun" aria-hidden="true" />

      <header className="head">
        <a href="#top" className="wm">
          <span className="dot" />
          Hiring Hand
        </a>
        <div className="clock">
          <span className="live" />
          <span className="label">EST</span> <span className="js-clock">11:00 PM</span>
        </div>
        <a href="#book" className="pilot">
          Book a call
        </a>
      </header>

      <div className="rail" aria-hidden="true">
        <div className="ticks">
          <span>11 PM</span>
          <span>3 AM</span>
          <span>6 AM</span>
          <span>9 AM</span>
        </div>
      </div>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-stamp">
            <span className="swatch" />
            Hiring Hand · first-round interviews, handled
          </div>
          <h1>
            By dawn,<br />
            your shortlist<br />
            <span className="a">is on your desk.</span>
          </h1>
          <p className="lede">
            Stop losing your week to phone screens. Every applicant gets a real video interview the
            same day, scored against your rubric &mdash; so by morning you have a ranked shortlist,
            and the tape behind every call.
          </p>
          <div className="cta-row">
            <a href="#book" className="cta">
              Book a call
              <span className="arrow" />
            </a>
          </div>
          <div className="hero-cue">
            <span className="down" />
            Scroll to dawn
          </div>
        </section>

        {/* THE PROMISE */}
        <section className="night">
          <div className="kicker reveal">
            <span className="dash" /> 01 · The promise
          </div>
          <h2 className="section-h reveal reveal-1" style={{ maxWidth: "26ch" }}>
            You can&apos;t interview everyone.{" "}
            <span style={{ color: "var(--amber)" }}>Jordan can.</span>
          </h2>
          <p
            className="bignum-label reveal reveal-2"
            style={{ fontSize: "clamp(20px,1.8vw,26px)", maxWidth: "50ch" }}
          >
            Most teams interview the top of the stack and hope. Hiring Hand interviews the whole
            stack &mdash; on the candidate&apos;s schedule, on your rubric, with the video and
            transcript saved for review. The good ones stop falling through the cracks.
          </p>
          <div className="bignum-tail reveal reveal-3">
            <span>
              Mode<span className="v">Live video, two-way</span>
            </span>
            <span>
              Recruiter time spent in the call<span className="v">0 min</span>
            </span>
            <span>
              Output<span className="v">Tape · Transcript · Score</span>
            </span>
            <span>
              Audit trail<span className="v">Saved for review</span>
            </span>
          </div>
        </section>

        {/* METHOD */}
        <section className="method" id="method">
          <div className="kicker reveal">
            <span className="dash" /> 02 · The method
          </div>
          <h2 className="section-h reveal reveal-1">An interview, not a form.</h2>
          <div className="method-grid">
            <article className="method-card reveal reveal-1">
              <div className="step">Stage 01</div>
              <h3>Intake</h3>
              <p>
                Résumé arrives via your ATS or careers page. Jordan parses it, picks the gaps worth
                asking about.
              </p>
            </article>
            <article className="method-card reveal reveal-2">
              <div className="step">Stage 02</div>
              <h3>Conversation</h3>
              <p>
                Live face-to-face video interview &mdash; a calibrated set of questions, follow-ups
                when answers are thin, the same rubric for every candidate.
              </p>
            </article>
            <article className="method-card reveal reveal-3">
              <div className="step">Stage 03</div>
              <h3>Score</h3>
              <p>
                Each answer graded against the rubric you signed off on. Strengths cited verbatim,
                concerns flagged with timestamps.
              </p>
            </article>
          </div>
        </section>

        {/* EXCHANGE */}
        <section className="exchange" id="interview">
          <div className="kicker reveal">
            <span className="dash" /> 03 · An exchange, from a sample tape
          </div>
          <h2 className="section-h reveal reveal-1">Sandra Mills, F&amp;I.</h2>
          <div className="exchange-card reveal reveal-2">
            <div className="left">
              <div className="meta-row">
                <span>FILE · Mills_S_F&amp;I_2026-03-04.txt</span>
                <span>Q&nbsp;07 OF 15 · 11:32 AM</span>
              </div>
              <div className="turn">
                <div className="who">Jordan</div>
                <div className="text">
                  You&apos;ve spent eight years selling F&amp;I products into one of the worst
                  markets dealers have seen. Walk me through a deal you almost lost &mdash; and what
                  you said in the box that turned it around.
                </div>
              </div>
              <div className="turn">
                <div className="who candidate">Sandra Mills</div>
                <div className="text">
                  Last August. <span className="hl">Couple in their sixties, cash buyer on a used
                  Tahoe.</span> The default move is to skip the F&amp;I pitch entirely &mdash;
                  they&apos;re paying cash, why bother. <span className="hl">I asked them, instead,
                  what would happen if the transmission went next March.</span> They didn&apos;t
                  have an answer. By the time we walked through the GAP and the powertrain warranty
                  against their actual driving pattern &mdash; Florida, towing a boat &mdash; they
                  took both. Three thousand back of the house on a deal we almost stamped
                  paid-in-full and walked.
                </div>
              </div>
              <div className="turn">
                <div className="who">Jordan</div>
                <div className="text">
                  What&apos;s the one thing you&apos;d want a finance director to know about you in
                  their first week?
                </div>
              </div>
              <div className="turn">
                <div className="who candidate">Sandra Mills</div>
                <div className="text">
                  That I will not lie to a customer to clear a deal. <span className="hl">I have
                  walked away from three months of a board because the manager wanted me to bury a
                  fee.</span> If you need that, hire someone else.
                </div>
              </div>
            </div>
            <div className="right">
              <h4>Scoring · as you wrote it</h4>
              {[
                { name: "Closing instinct", pts: 19, w: 95 },
                { name: "Product knowledge", pts: 18, w: 90 },
                { name: "Compliance posture", pts: 20, w: 100 },
                { name: "Tenure & stability", pts: 17, w: 85 },
                { name: "Cultural fit (your spec)", pts: 20, w: 100 },
              ].map((c) => (
                <div key={c.name} className="crit">
                  <div className="crit-row">
                    <div className="crit-name">{c.name}</div>
                    <div className="crit-pts">
                      {c.pts}
                      <span className="max">/20</span>
                    </div>
                  </div>
                  <div className="crit-bar">
                    <i style={{ width: c.w + "%" }} />
                  </div>
                </div>
              ))}
              <div className="crit-total">
                <div className="label">Composite</div>
                <div className="v">
                  94<span className="denom">/100</span>
                </div>
              </div>
              <div className="verdict">Strong yes · Hold for hiring manager</div>
            </div>
          </div>
        </section>

        {/* BRIEF */}
        <section className="brief" id="brief">
          <div className="kicker reveal">
            <span className="dash" /> 04 · By 9 AM
          </div>
          <h2 className="section-h reveal reveal-1">On your desk.</h2>
          <div className="brief-paper reveal reveal-2">
            <div className="brief-head">
              <div className="l">Issue 1,047 · Vol IV</div>
              <h3>
                Morning Brief &mdash; <span className="a">Tuesday, Mar 4</span>
              </h3>
              <div className="r">Pemberton Auto Group · Tampa</div>
            </div>
            <div className="brief-stats">
              {[
                ["In the funnel", "50"],
                ["Strong yes", "3"],
                ["Yes", "3"],
                ["Bottom of stack", "12"],
              ].map(([l, v]) => (
                <div key={l} className="s">
                  <div className="l">{l}</div>
                  <div className="v">{v}</div>
                </div>
              ))}
            </div>
            <table className="brief-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Candidate</th>
                  <th>One-line strength</th>
                  <th>Verdict</th>
                  <th style={{ textAlign: "right" }}>Score</th>
                  <th style={{ textAlign: "right" }}>Tape</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["01", "Sandra Mills", "F&I · 8 yrs", "“I will not lie to a customer to clear a deal.”", "Strong yes", "94"],
                  ["02", "Rachel Thompson", "Service · 6 yrs", "Built +$140 ARO on a fixed-ops team in 90 days.", "Strong yes", "91"],
                  ["03", "Marcus Williams", "Sales · stair-step from BDC", "Reads buying signals well; specific deal stories.", "Strong yes", "87"],
                  ["04", "Kevin Park", "F&I · cross-trained service", "Quiet, methodical. Likely strong with cash buyers.", "Yes", "79"],
                  ["05", "Tyler Johnson", "Parts · counter & wholesale", "Knows wholesale cadence; could grow into a manager.", "Yes", "76"],
                  ["06", "Brittany Chen", "Sales · CDJR background", "Strong CRM hygiene; turns leads into appointments.", "Yes", "74"],
                ].map(([rk, name, role, one, vd, sc]) => (
                  <tr key={rk}>
                    <td className="rk">{rk}</td>
                    <td className="nm">
                      {name}
                      <small>{role}</small>
                    </td>
                    <td className="one">{one}</td>
                    <td>
                      <span className="vd go">{vd}</span>
                    </td>
                    <td className="sc">{sc}</td>
                    <td style={{ textAlign: "right" }}>
                      <a href="#" className="lk">
                        Tape ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="brief-foot">
              <div>50 interviewed · 6 advanced · 12 explained · 32 bottom of stack</div>
              <div className="stamp">Reviewed by Jordan · 8:42 AM</div>
              <div>Lisa&apos;s calendar · 6 holds posted</div>
            </div>
          </div>
        </section>

        {/* MORNING */}
        <section className="morning" id="book">
          <div className="kicker reveal">
            <span className="dash" /> 05 · 9:00 AM
          </div>
          <h1 className="display reveal reveal-1">
            Try it on your <span className="accent">real roles.</span>
          </h1>
          <p className="reveal reveal-2">
            Bring us one open req &mdash; we&apos;ll wire Jordan to your rubric, point him at your
            applicants, and you&apos;ll have ranked tape on your desk by morning. No long contract;
            talk to us first.
          </p>
          <div className="cta-row reveal reveal-3">
            <a
              href="mailto:hello@hiringhand.io?subject=Jordan%20demo&body=Hi%20-%20I'd%20like%20to%20see%20Jordan%20interview%20a%20candidate%20for%20one%20of%20our%20open%20roles.%20Best%20times%20this%20week%3A"
              className="cta"
            >
              Book a call
              <span className="arrow" />
            </a>
            <a href="#interview" className="secondary">
              Or read the sample interview
            </a>
          </div>
        </section>
      </main>

      <footer className="dawn-footer">
        <div className="inner">
          <div className="brand">
            <div className="logo">Hiring Hand</div>
            <p>
              Built by Voxaris. Jordan handles every first-round interview &mdash; structured,
              EEOC-aligned, on video. Your team gets the ranked shortlist and the tape. The humans
              stay in charge of the hire.
            </p>
          </div>
          <div>
            <h5>Product</h5>
            <ul>
              <li>
                <a href="#method">The method</a>
              </li>
              <li>
                <a href="#interview">Sample interview</a>
              </li>
              <li>
                <a href="#brief">Morning brief</a>
              </li>
              <li>
                <a href="/talk">Try a sample interview</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
              <li>
                <a href="/biometric-policy">Biometric policy</a>
              </li>
              <li>
                <a href="/compliance">Compliance</a>
              </li>
              <li>
                <a href="mailto:hello@hiringhand.io">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="colophon">
          <span>© {new Date().getFullYear()} Voxaris LLC · hiringhand.io</span>
          <span>EEOC-aligned · structured interview · audit trail</span>
        </div>
      </footer>
    </div>
  );
}
