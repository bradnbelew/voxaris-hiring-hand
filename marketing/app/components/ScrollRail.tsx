"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "problem", label: "Problem" },
  { id: "product", label: "Product" },
  { id: "how", label: "How" },
  { id: "compare", label: "Compare" },
  { id: "proof", label: "Proof" },
  { id: "onboarding", label: "Onboarding" },
  { id: "faq", label: "FAQ" },
  { id: "demo", label: "Demo" },
];

export function ScrollRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry most-visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <Link
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3 justify-end"
          >
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.18em] transition-all ${
                isActive
                  ? "opacity-100 text-accent"
                  : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 text-current mix-blend-difference"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                isActive
                  ? "w-8 bg-accent shadow-[0_0_8px_var(--color-accent)]"
                  : "w-4 bg-current opacity-40 mix-blend-difference group-hover:w-6 group-hover:opacity-70"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
