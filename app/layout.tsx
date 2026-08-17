import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Domaći Proizvodi iz Slavonije - OPG Skočibušić",
  description:
    "Uživajte u okusima tradicije uz domaće meso, voće i povrće OPG-a Skočibušić. Prirodni sastojci iz srca Slavonije, bez aditiva.",
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
  authors: [{ name: "OPG Skočibušić" }],
  icons: {
    icon: "/favicon.webp",
    apple: "/favicon.webp",
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
    <html lang="hr" className={`${inter.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
