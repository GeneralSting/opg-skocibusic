/**
 * Single source of truth for the canonical site URL and business details.
 *
 * The base URL is needed for `metadataBase`, the canonical link, Open Graph
 * tags, robots.txt and sitemap.xml. Set `NEXT_PUBLIC_SITE_URL` to the real
 * domain in the deployment environment (e.g. https://opg-skocibusic.hr).
 * On Vercel it falls back to the production URL, and to localhost in dev.
 */
function resolveSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");

  // Trailing slashes break canonical/OG URL comparisons.
  return fromEnv.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export const business = {
  name: "OPG Skočibušić",
  legalName: "OPG Skočibušić Mario",
  tagline: "Domaći Proizvodi iz Slavonije",
  // Feeds <meta name="description">, og:description and twitter:description.
  // Keep it under ~160 characters or Google truncates it in results.
  description:
    "Domaći proizvodi i poljoprivredne usluge OPG-a Skočibušić iz Koritne: meso, svježa jaja, povrće i presadnice. Okusi tradicije iz srca Slavonije, bez aditiva.",
  phone: "+385914345249",
  phoneDisplay: "+385 91 434 5249",
  email: "drskocibusic@gmail.com",
  whatsapp: "https://wa.me/385914345249",
  facebook: "https://facebook.com/placeholder",
  locality: "Koritna",
  region: "Slavonija",
  country: "HR",
  latitude: 45.391542,
  longitude: 18.557852,
} as const;
