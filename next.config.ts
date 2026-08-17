import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 restricts optimisation to this allowlist and coerces any other
    // `quality` prop to the nearest allowed value. Without 50 and 70 listed the
    // quality props on the hero, slider and product images silently became 75.
    qualities: [50, 70, 75],
    // Defaults plus 512. The gallery column renders at 486px on desktop, and
    // without a candidate between 384 and 640 the browser had to take 640 and
    // throw away 42% of it. Entries must stay below deviceSizes[0] (640).
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
    remotePatterns: [
      {
        // Used by the "Biljni terarij" product image in app/data.ts.
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
