import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.base44.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Dodajemo odmah i Unsplash za proizvode
      },
    ],
  },
};

export default nextConfig;
