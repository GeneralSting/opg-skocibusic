import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { business, siteUrl } from "./site";
import { productsData } from "./data";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = `${business.tagline} - ${business.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Required for canonical and Open Graph URLs to resolve to absolute paths
  title,
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
    title,
    description: business.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  additionalType: "https://schema.org/Farm",
  "@id": `${siteUrl}/#business`,
  name: business.name,
  legalName: business.legalName,
  description: business.description,
  url: siteUrl,
  telephone: business.phone,
  email: business.email,
  image: `${siteUrl}/opengraph-image.jpg`,
  // The apple icon rather than favicon.ico: structured-data consumers want a  real raster image, and this one has an opaque background
  logo: `${siteUrl}/apple-icon.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.locality,
    addressRegion: business.region,
    addressCountry: business.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.latitude,
    longitude: business.longitude,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: business.region,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Naši proizvodi",
    itemListElement: productsData.map((product) => ({
      "@type": "Offer",
      availability:
        product.tag === "Dostupno"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      itemOffered: {
        "@type": "Product",
        name: product.title,
        description: product.desc,
        image: `${siteUrl}${product.img}`,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
