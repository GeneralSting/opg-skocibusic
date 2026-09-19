import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy. Static, so every page stays statically rendered
 *
 * Almost everything the site loads is its own: next/font self-hosts Inter,
 * photos and the video are in public/, and Vercel Analytics is served from
 * /_vercel/*. The one outside source is the Google Maps embed in the contact
 * section, hence `frame-src`.
 *
 * 'unsafe-inline' is required for Next's inline hydration scripts and the
 * navbar's boot script in app/layout.tsx. 'unsafe-eval' and Vercel's debug
 * analytics script are needed in development only
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  images: {
    /**
     * Next.js 16 restricts optimisation to this allowlist and coerces any other `quality` prop
     * to the nearest allowed value. Without 50 and 70 listed the quality props on the hero,
     * slider and produc images silently became 75
     */
    qualities: [50, 70, 75],
    /**
     * Defaults plus 512. The gallery column renders at 486px on desktop, and without candidate
     * between 384 and 640 the browser had to take 640 and throw away 42% of it.
     * Entries must stay below deviceSizes[0] (640)
     */
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Full address to this site, only the domain to others, nothing over plain HTTP
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Browsers trust the declared file type instead of guessing it
          { key: "X-Content-Type-Options", value: "nosniff" },
          // No other site may show these pages in a frame. `frame-ancestors` says the same for current browsers
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
        ],
      },
    ];
  },
};

export default nextConfig;
