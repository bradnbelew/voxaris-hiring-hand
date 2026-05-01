import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "Page not found · Hiring Hand",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink text-paper flex flex-col grain">
      <Header />
      <section className="flex-1 flex items-center justify-center px-6 md:px-10 pt-24 pb-16">
        <div className="max-w-2xl w-full text-center">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent mb-6">
            Error · 404
          </div>

          <div className="font-sans font-semibold text-[clamp(4rem,16vw,12rem)] leading-none tracking-[-0.04em] text-paper/15 select-none">
            404
          </div>

          <h1 className="mt-2 font-sans font-semibold text-[clamp(1.75rem,4vw,3rem)] leading-tight tracking-[-0.02em]">
            Jordan can&apos;t find that page.
          </h1>

          <p className="mt-5 text-paper/65 text-[15px] md:text-[16px] leading-relaxed max-w-md mx-auto">
            He&apos;s very good at interviews and very bad at navigating to URLs that don&apos;t exist. The page you wanted isn&apos;t here — but the front door is.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-2 text-ink rounded-full text-[13px] font-medium transition"
            >
              ← Take me home
            </Link>
            <Link
              href="/talk"
              className="inline-flex items-center gap-2 px-5 py-3 border border-line hover:border-paper/40 text-paper/85 rounded-full text-[13px] font-medium transition"
            >
              Talk to Jordan
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
