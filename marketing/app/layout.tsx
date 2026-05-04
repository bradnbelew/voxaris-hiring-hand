import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TITLE = "Hiring Hand — By dawn, your shortlist is on your desk.";
const DESCRIPTION =
  "Jordan handles every first-round interview on video — structured, EEOC-aligned, scored against your rubric. By morning the shortlist (and the tape) is on your desk.";
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
    "hiring agent",
    "video interview",
    "candidate pre-screening",
    "AI recruiter",
    "staffing automation",
    "EEOC compliant interview",
    "candidate scoring",
    "high-volume hiring",
    "automotive dealership hiring",
  ],
  category: "business",
  alternates: { canonical: SITE_URL },
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
        alt: "Hiring Hand — every applicant interviewed and scored by morning",
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
  themeColor: "#050714",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetBrains.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
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
                  "A hiring agent that interviews every applicant on video — structured, EEOC-aligned, scored against your rubric — and delivers a ranked shortlist to your desk by morning.",
                brand: { "@type": "Brand", name: "Hiring Hand" },
                category: "Hiring software",
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-full">
        <a href="#top" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
