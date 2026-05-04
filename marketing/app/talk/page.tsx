import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Talk to Jordan — Hiring Hand",
  description:
    "Sit on the candidate side. Take a 60-second sample interview with Jordan, your hiring agent.",
};

export default function TalkPage() {
  return (
    <div className="talk-page">
      <header className="doc-head" style={{ borderBottomColor: "rgba(239,231,214,.18)" }}>
        <Link href="/" className="doc-wm" style={{ color: "var(--text)" }}>
          <span className="dot" />
          Hiring Hand
        </Link>
        <Link href="/" className="doc-back" style={{ color: "rgba(239,231,214,.65)" }}>
          ← Back to home
        </Link>
      </header>

      <main className="talk-main">
        <div className="talk-inner">
          <div className="talk-stamp">
            <span className="swatch" />
            Sandbox · live in 60 seconds
          </div>

          <h1 className="talk-h1">
            Sit on the <span className="talk-h1-accent">candidate</span> side.
          </h1>

          <p className="talk-lede">
            You&apos;re about to be interviewed by Jordan for a sample role. The session is short
            &mdash; about 60 to 90 seconds &mdash; and the goal is just to feel what your applicants
            will feel. Nothing is recorded; no scoring lands anywhere; you can stop at any time.
          </p>

          <div className="talk-card">
            <div className="talk-card-head">
              <span>Pre-flight check</span>
              <span>v0.1 · sandbox</span>
            </div>

            <ul className="talk-list">
              <li>You&apos;ll need camera + microphone access for ~90 seconds.</li>
              <li>
                Use a quiet room and a real device (this doesn&apos;t work great in a noisy coffee
                shop).
              </li>
              <li>
                Jordan will open with an AI disclosure and ask for your consent. That&apos;s
                required by law and isn&apos;t a bug.
              </li>
            </ul>

            <div className="talk-status">
              <div className="talk-status-row">
                <span className="talk-status-label">Sandbox status</span>
                <span className="talk-status-tag">in progress</span>
              </div>
              <div className="talk-status-line">Wiring up the live interview persona</div>
              <p className="talk-status-p">
                We&apos;re finishing the marketing-sandbox interview persona. In the meantime, the
                fastest way to see Jordan in action is a live walkthrough &mdash; we&apos;ll spin up
                a real interview against your roles.
              </p>

              <div className="talk-actions">
                <a
                  href="mailto:hello@hiringhand.io?subject=Live%20Jordan%20demo&body=I'd%20like%20to%20see%20Jordan%20interview%20a%20candidate%20for%20one%20of%20our%20roles.%20Best%20times%20this%20week%3A"
                  className="cta"
                >
                  Get a live walkthrough
                  <span className="arrow" />
                </a>
                <a
                  href="mailto:hello@hiringhand.io?subject=Notify%20me%20when%20sandbox%20is%20live"
                  className="talk-link-secondary"
                >
                  Notify me when sandbox is live
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .talk-page{
          min-height: 100vh;
          background: linear-gradient(to bottom, #050714 0%, #0a0e22 100%);
          color: var(--text);
          display: flex; flex-direction: column;
        }
        .talk-main{
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          padding: 80px 32px 60px;
        }
        .talk-inner{
          max-width: 720px; width: 100%;
        }
        .talk-stamp{
          display: inline-flex; align-items: center; gap: 14px;
          font-family: var(--f-mono); font-size: 11px; letter-spacing: .25em;
          text-transform: uppercase;
          color: var(--text-soft);
          margin-bottom: 28px;
        }
        .talk-stamp .swatch{
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--phosphor); box-shadow: 0 0 12px var(--phosphor);
          animation: pulse-dot 1.6s ease-in-out infinite;
        }
        .talk-h1{
          font-family: var(--f-display); font-variation-settings: "opsz" 144;
          font-weight: 400;
          font-size: clamp(40px, 6.4vw, 84px);
          line-height: 0.96;
          letter-spacing: -0.03em;
          margin: 0 0 28px;
          color: var(--text);
        }
        .talk-h1-accent{ color: var(--amber); font-weight: 500; }
        .talk-lede{
          font-size: clamp(16px, 1.4vw, 18px);
          line-height: 1.55;
          color: var(--text-soft);
          max-width: 56ch;
          margin: 0 0 40px;
        }
        .talk-card{
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--rule);
          border-radius: 4px;
          padding: 28px 30px 32px;
          backdrop-filter: blur(4px);
        }
        .talk-card-head{
          display: flex; justify-content: space-between;
          font-family: var(--f-mono); font-size: 10.5px; letter-spacing: .2em;
          text-transform: uppercase; color: var(--text-mute);
          margin-bottom: 22px;
        }
        .talk-list{
          list-style: none; padding: 0; margin: 0 0 28px;
        }
        .talk-list li{
          position: relative; padding-left: 22px; margin-bottom: 10px;
          font-size: 15px; line-height: 1.55;
          color: var(--text);
        }
        .talk-list li::before{
          content: "·";
          position: absolute; left: 4px; top: -3px;
          color: var(--phosphor);
          font-size: 26px; font-weight: 700; line-height: 1;
        }
        .talk-status{
          padding-top: 24px;
          border-top: 1px solid var(--rule);
        }
        .talk-status-row{
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 8px;
        }
        .talk-status-label{
          font-family: var(--f-mono); font-size: 11px; letter-spacing: .22em;
          text-transform: uppercase; color: var(--text-soft); font-weight: 500;
        }
        .talk-status-tag{
          font-family: var(--f-mono); font-size: 10px; letter-spacing: .18em;
          text-transform: uppercase; color: var(--text-mute);
        }
        .talk-status-line{
          font-family: var(--f-display); font-variation-settings: "opsz" 36;
          font-size: 17px; color: var(--text);
          margin-bottom: 10px;
        }
        .talk-status-p{
          font-size: 14px; line-height: 1.55;
          color: var(--text-soft);
          margin: 0 0 22px;
          max-width: 56ch;
        }
        .talk-actions{
          display: flex; gap: 16px; flex-wrap: wrap; align-items: center;
        }
        .talk-link-secondary{
          font-family: var(--f-mono); font-size: 11.5px; letter-spacing: .14em;
          text-transform: uppercase; color: var(--text-soft);
          text-decoration: underline;
          text-underline-offset: 5px;
          text-decoration-color: var(--rule);
          transition: color .2s, text-decoration-color .2s;
        }
        .talk-link-secondary:hover{
          color: var(--text);
          text-decoration-color: var(--text);
        }
      `}</style>
    </div>
  );
}
