import type { ReactNode } from "react";
import Link from "next/link";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}

export function LegalPage({ eyebrow, title, updated, children }: LegalPageProps) {
  return (
    <div className="doc-page">
      <header className="doc-head">
        <Link href="/" className="doc-wm">
          <span className="dot" />
          Hiring Hand
        </Link>
        <Link href="/" className="doc-back">
          ← Back to home
        </Link>
      </header>

      <article className="doc-article">
        <div className="doc-article-inner">
          <div className="doc-eyebrow">{eyebrow}</div>
          <h1 className="doc-title">{title}</h1>
          <div className="doc-updated">Last updated · {updated}</div>
          <div className="doc-body">{children}</div>
        </div>
      </article>

      <footer className="doc-foot">
        <span>© {new Date().getFullYear()} Voxaris LLC · hiringhand.io</span>
        <span>EEOC-aligned · structured interview · audit trail</span>
      </footer>
    </div>
  );
}
