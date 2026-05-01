export function ComplianceBar() {
  const items = [
    { code: "EEOC", label: "Equal Employment" },
    { code: "BIPA", label: "Biometric consent" },
    { code: "IL AIVIA", label: "AI Video Interview Act" },
    { code: "NYC AEDT", label: "Auto Employment Decision" },
    { code: "FL SB 482", label: "AI disclosure" },
    { code: "SOC 2", label: "Type II in progress" },
  ];

  return (
    <section className="bg-ink text-paper border-t border-line/30 py-10 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper/40 mb-5">
          Built compliant from day one
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {items.map((it) => (
            <div key={it.code} className="flex items-baseline gap-2">
              <span className="font-mono text-[12px] tracking-wide text-paper/85">
                {it.code}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-paper/40">
                {it.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
