import Link from "next/link";

export function Header() {
  return (
    <header className="absolute top-0 inset-x-0 z-50 h-14 px-6 md:px-10 flex items-center justify-between mix-blend-difference text-paper">
      <Link href="/" className="font-serif italic text-xl tracking-tight">
        Hiring Hand
      </Link>
      <nav className="flex items-center gap-6 text-[13px] font-mono uppercase tracking-wider">
        <Link href="#how" className="hidden sm:inline opacity-80 hover:opacity-100 transition">
          How it works
        </Link>
        <Link href="#proof" className="hidden sm:inline opacity-80 hover:opacity-100 transition">
          Proof
        </Link>
        <Link
          href="/talk"
          className="px-3 py-1.5 border border-current rounded-full hover:bg-paper hover:text-ink transition"
        >
          Talk to Jordan
        </Link>
        <Link
          href="#demo"
          className="px-3 py-1.5 bg-electric text-paper rounded-full hover:opacity-90 transition"
        >
          Book a demo
        </Link>
      </nav>
    </header>
  );
}
