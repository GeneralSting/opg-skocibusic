import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { business, siteUrl } from "./site";

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
    "Slavonija",
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
  // No `icons` field: app/icon.tsx and app/apple-icon.tsx are file conventions, so Next emits the links with correct type and size attributes itself
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
