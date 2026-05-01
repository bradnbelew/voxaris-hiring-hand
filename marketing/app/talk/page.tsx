import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Talk to Jordan — Hiring Hand",
  description:
    "Sit on the candidate side. Take a 60-second sample interview with Jordan, our AI hiring agent.",
};

export default function TalkPage() {
  return (
    <main className="min-h-screen flex flex-col bg-ink text-paper grain">
      <Header />

      <section className="flex-1 flex items-center justify-center px-6 md:px-10 pt-24 pb-16">
        <div className="max-w-3xl w-full">
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Sandbox · live in 60 seconds
          </div>

          <h1 className="mt-6 font-sans font-semibold tracking-[-0.02em] text-[clamp(2.25rem,6vw,5rem)] leading-[0.95]">
            Sit on the{" "}
            <span className="font-serif italic font-normal text-accent">candidate</span>{" "}
            side.
          </h1>

          <p className="mt-6 text-paper/65 text-[16px] md:text-[17px] leading-relaxed max-w-xl">
            You&apos;re about to be interviewed by Jordan for a sample role. The session is short — about 60 to 90 seconds — and the goal is just to feel what your applicants will feel. Nothing is recorded; no scoring lands anywhere; you can stop at any time.
          </p>

          <div className="mt-10 bg-ink-2 border border-line/60 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper/40">
                Pre-flight check
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-paper/40">
                v0.1 · sandbox
              </div>
            </div>

            <ul className="space-y-3 text-[14px] text-paper/80">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">●</span>
                <span>You&apos;ll need camera + microphone access for ~90 seconds.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">●</span>
                <span>Use a quiet room and a real device (this doesn&apos;t work great in a noisy coffee shop).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-0.5">●</span>
                <span>Jordan will open with an AI disclosure and ask for your consent. That&apos;s required by law and isn&apos;t a bug.</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-line/40">
              <div className="text-[12px] font-mono uppercase tracking-[0.15em] text-paper/55 mb-3">
                Sandbox status
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-paper/85 text-[15px]">
                  Wiring up to live Tavus persona
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-paper/40">
                  in progress
                </span>
              </div>
              <p className="mt-3 text-[13px] text-paper/55 leading-relaxed">
                We&apos;re finishing the marketing-sandbox interview persona. In the meantime, the fastest way to see Jordan in action is a live demo over Zoom — we&apos;ll spin up a real interview against your roles.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="mailto:hello@hiringhand.io?subject=Live%20Jordan%20demo&body=I'd%20like%20to%20see%20Jordan%20interview%20a%20candidate%20for%20one%20of%20our%20roles.%20Best%20times%20this%20week%3A"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-2 text-ink rounded-full text-[13px] font-medium transition"
                >
                  Get a live walkthrough
                  <span>→</span>
                </Link>
                <Link
                  href="mailto:hello@hiringhand.io?subject=Notify%20me%20when%20sandbox%20is%20live"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-line hover:border-paper/40 text-paper/85 rounded-full text-[13px] font-medium transition"
                >
                  Notify me when sandbox is live
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="text-[12px] font-mono uppercase tracking-[0.2em] text-paper/45 hover:text-paper/80 transition"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
