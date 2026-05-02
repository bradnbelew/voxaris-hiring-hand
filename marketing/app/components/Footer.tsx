import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-paper border-t border-line/40 px-6 md:px-10 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Brand column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
              <span className="font-sans font-medium tracking-tight text-[15px]">
                Hiring Hand
              </span>
            </div>
            <p className="mt-4 text-paper/55 text-[14px] max-w-sm leading-relaxed">
              An AI hiring agent that interviews every applicant — structured, EEOC-compliant, scored — and lands ranked candidates on your dashboard by morning.
            </p>
            <div className="mt-6 text-[10px] font-mono uppercase tracking-[0.2em] text-paper/35">
              A Voxaris product · Orlando · Nashville
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterCol
              label="Product"
              links={[
                { label: "How it works", href: "#how" },
                { label: "Dashboard", href: "#product" },
                { label: "Try it live", href: "/talk" },
                { label: "Book a demo", href: "#demo" },
              ]}
            />
            <FooterCol
              label="Built for"
              links={[
                { label: "Staffing agencies", href: "#proof" },
                { label: "Mid-market hiring", href: "#proof" },
                { label: "Enterprise TA", href: "#proof" },
              ]}
            />
            <FooterCol
              label="Legal"
              links={[
                { label: "Privacy", href: "/privacy" },
                { label: "Biometric policy", href: "/biometric-policy" },
                { label: "EEOC compliance", href: "/compliance" },
                { label: "Contact", href: "mailto:hello@hiringhand.io" },
              ]}
            />
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line/40 flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/35">
          <span>© {new Date().getFullYear()} Voxaris LLC</span>
          <span>
            Built by Voxaris · Made in Nashville
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  label,
  links,
}: {
  label: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper/40 mb-4">
        {label}
      </div>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-[13px] text-paper/75 hover:text-accent transition"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
