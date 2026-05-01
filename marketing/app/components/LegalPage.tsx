import type { ReactNode } from "react";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}

export function LegalPage({ eyebrow, title, updated, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <article className="flex-1 px-6 md:px-10 pt-32 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink/55 mb-4">
            {eyebrow}
          </div>
          <h1 className="font-sans font-semibold tracking-[-0.02em] text-[clamp(2rem,5vw,4rem)] leading-[1.05]">
            {title}
          </h1>
          <div className="mt-3 text-[12px] font-mono uppercase tracking-[0.15em] text-ink/45">
            Last updated · {updated}
          </div>

          <div className="mt-12 space-y-8 text-[15px] md:text-[16px] leading-relaxed text-ink/75 [&_h2]:text-ink [&_h2]:font-sans [&_h2]:font-semibold [&_h2]:text-[20px] [&_h2]:md:text-[22px] [&_h2]:tracking-[-0.01em] [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-ink [&_h3]:font-sans [&_h3]:font-semibold [&_h3]:text-[16px] [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:max-w-prose [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:max-w-prose [&_ul]:space-y-1 [&_a]:text-accent-2 [&_a]:underline hover:[&_a]:no-underline [&_strong]:text-ink">
            {children}
          </div>

          <div className="mt-16 pt-8 border-t border-ink/10">
            <Link
              href="/"
              className="text-[12px] font-mono uppercase tracking-[0.2em] text-ink/55 hover:text-ink transition"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
