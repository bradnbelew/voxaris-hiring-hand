import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found · Hiring Hand",
};

export default function NotFound() {
  return (
    <div className="status-page">
      <header className="doc-head" style={{ borderBottomColor: "rgba(239,231,214,.18)" }}>
        <Link href="/" className="doc-wm" style={{ color: "var(--text)" }}>
          <span className="dot" />
          Hiring Hand
        </Link>
      </header>

      <main className="status-main">
        <div className="status-eyebrow">Error · 404</div>
        <div className="status-bignum">404</div>
        <h1 className="status-h1">Jordan can&apos;t find that page.</h1>
        <p className="status-lede">
          He&apos;s very good at interviews and very bad at navigating to URLs that don&apos;t
          exist. The page you wanted isn&apos;t here — but the front door is.
        </p>
        <div className="status-actions">
          <Link href="/" className="cta">
            Take me home
            <span className="arrow" />
          </Link>
          <Link href="/talk" className="status-link-secondary">
            Or try a sample interview
          </Link>
        </div>
      </main>

      <style>{`
        .status-page{
          min-height: 100vh;
          background: linear-gradient(to bottom, #050714 0%, #0a0e22 100%);
          color: var(--text);
          display: flex; flex-direction: column;
        }
        .status-main{
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 60px 32px; text-align: center;
        }
        .status-eyebrow{
          font-family: var(--f-mono); font-size: 11px; letter-spacing: .25em;
          text-transform: uppercase; color: var(--amber);
          margin-bottom: 24px;
        }
        .status-bignum{
          font-family: var(--f-display); font-variation-settings: "opsz" 144;
          font-weight: 400;
          font-size: clamp(120px, 22vw, 280px);
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: rgba(239,231,214,.12);
          user-select: none;
        }
        .status-h1{
          font-family: var(--f-display); font-variation-settings: "opsz" 96;
          font-weight: 500;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 12px 0 18px;
          color: var(--text);
          max-width: 22ch;
        }
        .status-lede{
          font-size: 16px; line-height: 1.55;
          color: var(--text-soft);
          max-width: 48ch;
          margin: 0 0 36px;
        }
        .status-actions{
          display: flex; gap: 18px; align-items: center; flex-wrap: wrap;
          justify-content: center;
        }
        .status-link-secondary{
          font-family: var(--f-mono); font-size: 11.5px; letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--text-soft);
          text-decoration: underline;
          text-underline-offset: 5px;
          text-decoration-color: var(--rule);
          transition: color .2s, text-decoration-color .2s;
        }
        .status-link-secondary:hover{
          color: var(--text);
          text-decoration-color: var(--text);
        }
      `}</style>
    </div>
  );
}
