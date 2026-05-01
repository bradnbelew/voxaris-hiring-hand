export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink text-paper grain">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-12 h-12">
          <span className="absolute inset-0 rounded-full border border-line" />
          <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin" />
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-paper/50">
          Loading
        </div>
      </div>
    </div>
  );
}
