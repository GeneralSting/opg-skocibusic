import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { business, siteUrl } from "./site";
import { ScrollReveal } from "./ui/scroll-reveal";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = `${business.tagline} — ${business.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Required for canonical and Open Graph URLs to resolve to absolute paths
  // Subpages set a bare title; the template appends the brand to it
  title: {
    default: title,
    template: `%s — ${business.name}`,
  },
  description: business.description,
  keywords: [
    "OPG",
    "Skocibusic",
    "domaci proizvodi",
    "Koritna",
    "Semeljci",
    "sadnice",
    "meso",
    "povrce",
    "zdrava hrana",
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  alternates: {
    canonical: "/",
  },
  /**
   * No `icons` field: app/icon.tsx and app/apple-icon.tsx are file convertions, so Next emits the link
   * with correct type and size attributes itself
   */
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: "/",
    siteName: business.name,
    title: {
      default: title,
      template: `%s — ${business.name}`,
    },
    description: business.description,
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: title,
      template: `%s — ${business.name}`,
    },
    description: business.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "k5LOiq2TUnYo0Opm5M7tl5X1yslDPQ8gihe5ne0IYMI",
  },
};

/**
 * Decides whether the navbar starts transparent, before anything is painted
 *
 * This cannot be rendered: the server has no way of knowing the scroll offset,
 * so any value it picks is wrong half the time and the bar corrects itself in
 * view. The class goes on <html> so React never owns it — hence
 * `suppressHydrationWarning` below.
 *
 * It runs twice on purpose. The first call covers a normal load, where the
 * page starts at the top. The second waits a frame because a reload restores
 * the previous scroll offset only after the document is parsed: measured on
 * this page, an inline script reads `scrollY` as 0 while the first animation
 * frame already reads the restored 1500 — and that frame still lands before
 * the first paint.
 */
const navBootScript = `(function(){var d=document.documentElement;function s(){d.classList.toggle("nav-at-top",location.pathname==="/"&&window.scrollY<=40)}s();requestAnimationFrame(s)})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={inter.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: navBootScript }} />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
