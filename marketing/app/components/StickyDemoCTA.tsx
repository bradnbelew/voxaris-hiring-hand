"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export function StickyDemoCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      // Show after the visitor has clearly committed to the page
      const past = y > window.innerHeight * 0.8;
      // Hide if they're at the very bottom (CTA section already in view)
      const near = y + window.innerHeight > document.documentElement.scrollHeight - 600;
      setShow(past && !near);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-40 lg:right-20"
        >
          <Link
            href="#demo"
            className="group flex items-center gap-3 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-full text-[13px] font-medium shadow-[0_8px_30px_rgba(124,58,237,0.45)] transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Book a demo
            <span className="text-base group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
