export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper px-6 md:px-10 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="font-serif italic text-2xl">Hiring Hand</div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-faint mt-2">
            A Voxaris product · Orlando · Nashville
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-ink-soft">
          <a href="mailto:hello@hiringhand.io" className="hover:text-ink transition">
            hello@hiringhand.io
          </a>
          <span className="hidden md:inline text-ink-faint">·</span>
          <a href="/privacy" className="hover:text-ink transition">
            Privacy
          </a>
          <span className="hidden md:inline text-ink-faint">·</span>
          <a href="/biometric-policy" className="hover:text-ink transition">
            Biometric policy
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-ink/5 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
        © {new Date().getFullYear()} Voxaris LLC · Made with Tavus, Cartesia, Deepgram, and Raven-1
      </div>
    </footer>
  );
}
