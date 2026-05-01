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
    // Forward to error reporting once we wire one up
    console.error("Hiring Hand client error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-ink text-paper min-h-screen flex items-center justify-center p-6 font-[var(--font-sans)] grain">
        <div className="max-w-md w-full text-center">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent mb-6">
            Unexpected error
          </div>
          <h1 className="font-sans font-semibold text-3xl md:text-4xl tracking-[-0.02em] leading-tight">
            Something broke on our end.
          </h1>
          <p className="mt-4 text-paper/65 text-[15px] leading-relaxed">
            We&apos;re looking at it. In the meantime, you can try again or head back home.
          </p>
          {error.digest && (
            <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.15em] text-paper/35">
              ref · {error.digest}
            </div>
          )}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={reset}
              className="px-5 py-3 bg-accent hover:opacity-90 text-ink rounded-full text-[13px] font-medium transition"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-5 py-3 border border-paper/30 hover:border-paper/60 rounded-full text-[13px] font-medium transition"
            >
              ← Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
