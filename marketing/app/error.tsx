"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Hiring Hand client error:", error);
  }, [error]);

  return (
    <div className="status-page">
      <header className="doc-head" style={{ borderBottomColor: "rgba(239,231,214,.18)" }}>
        <Link href="/" className="doc-wm" style={{ color: "var(--text)" }}>
          <span className="dot" />
          Hiring Hand
        </Link>
      </header>

      <main className="status-main">
        <div className="status-eyebrow" style={{ color: "var(--rust)" }}>
          Unexpected error
        </div>
        <h1 className="status-h1">Something broke on our end.</h1>
        <p className="status-lede">
          We&apos;re looking at it. In the meantime, you can try again or head back home.
        </p>
        {error.digest && (
          <div
            style={{
              marginBottom: 24,
              fontFamily: "var(--f-mono)",
              fontSize: 10,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "var(--text-mute)",
            }}
          >
            ref · {error.digest}
          </div>
        )}
        <div className="status-actions">
          <button onClick={reset} className="cta">
            Try again
            <span className="arrow" />
          </button>
          <Link href="/" className="status-link-secondary">
            Or head home
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
        .status-h1{
          font-family: var(--f-display); font-variation-settings: "opsz" 96;
          font-weight: 500;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 18px;
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
