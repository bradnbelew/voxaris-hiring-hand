import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 px-6 md:px-10 flex items-center justify-between backdrop-blur-md bg-ink/60 border-b border-line/40">
      <Link href="/" className="flex items-center gap-2 text-paper">
        <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
        <span className="font-sans font-medium tracking-tight text-[15px]">
          Hiring Hand
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-7 text-[12px] font-mono uppercase tracking-[0.15em] text-paper/70">
        <Link href="#problem" className="hover:text-paper transition">Problem</Link>
        <Link href="#product" className="hover:text-paper transition">Product</Link>
        <Link href="#how" className="hover:text-paper transition">How</Link>
        <Link href="#proof" className="hover:text-paper transition">Proof</Link>
      </nav>

      <div className="flex items-center gap-2">
        <Link
          href="/talk"
          className="hidden sm:inline-block px-3 py-1.5 text-[12px] font-mono uppercase tracking-[0.12em] text-paper/80 border border-line hover:border-paper/40 hover:text-paper rounded-full transition"
        >
          Try it live
        </Link>
        <Link
          href="#demo"
          className="px-3 py-1.5 text-[12px] font-mono uppercase tracking-[0.12em] text-ink bg-accent hover:bg-accent-2 rounded-full transition"
        >
          Book a demo
        </Link>
      </div>
    </header>
  );
}
