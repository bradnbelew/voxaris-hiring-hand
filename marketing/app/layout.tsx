import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const TITLE = "Hiring Hand — Every applicant. Interviewed. Scored.";
const DESCRIPTION =
  "Jordan is an AI video hiring agent. Every applicant gets a structured, EEOC-compliant pre-screen in 14 minutes — recruiters wake up to a ranked, scored shortlist on their dashboard.";
const SITE_URL = "https://hiringhand.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Hiring Hand",
  },
  description: DESCRIPTION,
  applicationName: "Hiring Hand",
  authors: [{ name: "Voxaris LLC", url: "https://voxaris.io" }],
  generator: "Next.js",
  keywords: [
    "AI hiring agent",
    "AI video interview",
    "candidate pre-screening",
    "AI recruiter",
    "staffing automation",
    "EEOC compliant interview",
    "candidate scoring",
    "high-volume hiring",
    "automotive dealership hiring",
  ],
  category: "business",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "Hiring Hand",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Hiring Hand — every applicant interviewed and scored",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD structured data — Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Hiring Hand",
                url: SITE_URL,
                logo: `${SITE_URL}/icon.svg`,
                parentOrganization: {
                  "@type": "Organization",
                  name: "Voxaris",
                  url: "https://voxaris.io",
                },
                sameAs: ["https://voxaris.io"],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Hiring Hand",
                url: SITE_URL,
                description: DESCRIPTION,
              },
              {
                "@context": "https://schema.org",
                "@type": "Product",
                name: "Hiring Hand",
                description:
                  "An AI video interviewer that screens every applicant — structured, EEOC-compliant, scored — and delivers ranked candidate cards to a recruiter dashboard.",
                brand: {
                  "@type": "Brand",
                  name: "Hiring Hand",
                },
                category: "AI hiring software",
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-full">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-accent focus:text-ink focus:px-4 focus:py-2 focus:rounded-full focus:text-[12px] focus:font-mono focus:uppercase focus:tracking-[0.15em]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
