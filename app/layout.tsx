import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Domaći Proizvodi iz Slavonije | OPG Skočibušić",
  description:
    "Uživajte u okusima tradicije uz domaće meso, voće i povrće OPG-a Skočibušić. Prirodni sastojci iz srca Slavonije, bez aditiva.",
  keywords: [
    "OPG Skočibušić",
    "domaći proizvodi",
    "Slavonija",
    "sadnice",
    "meso",
    "povrće",
    "zdrava hrana",
  ],
  authors: [{ name: "OPG Skočibušić" }],
  icons: {
    icon: "/favicon.webp",
    apple: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
