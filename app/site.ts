import type { Metadata } from "next";

/**
 * Single source of truth for the canonical site URL and business details.
 *
 * The base URL is needed for `metadataBase`, the canonical link, Open Graph
 * tags, robots.txt and sitemap.xml. Set `NEXT_PUBLIC_SITE_URL` to the real
 * domain in the deployment environment (e.g. https://opg-skocibusic.hr).
 * On Vercel it falls back to the production URL, and to localhost in dev
 */
function resolveSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");

  // Trailing slashes break canonical/OG URL comparisons
  return fromEnv.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

/**
 * Origin for calling our own image optimiser, used by the share cards.
 *
 * Deliberately not `siteUrl`: that is the canonical public domain, which a
 * local server or a preview deployment is not — and `.env` sets it to the
 * production domain even in development. The optimiser only has to be reached,
 * not linked to, so the nearest running instance is the right target
 */
export const internalOrigin = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://127.0.0.1:${process.env.PORT ?? 3000}`;

/**
 * Open Graph + Twitter tags for a subpage
 *
 * Both objects have to be given in full: a page that sets only `openGraph`
 * still inherits the layout's `twitter`, which would advertise the home page's
 * title and description on X
 *
 * Deliberately no `images`: each route ships an `opengraph-image.tsx`, and
 * file-based metadata outranks anything set here. Twitter has no image of its
 * own either - Next falls back to the Open Graph one
 */
export function socialMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "hr_HR",
      siteName: business.name,
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const business = {
  name: "OPG Skočibušić",
  legalName: "OPG Skočibušić Mario",
  // Feeds the home page <title>, which the brand suffix pushes to 55 chars
  tagline: "Domaći proizvodi i usluge iz Slavonije",
  // Feeds <meta name="description">, og:description and twitter:description
  // Keep it under ~160 characters or Google truncates it in results
  description:
    "Domaći proizvodi i poljoprivredne usluge OPG-a Skočibušić iz Koritne: meso, svježa jaja, povrće i presadnice. Okusi tradicije iz srca Slavonije, bez aditiva.",
  phone: "+385914345249",
  phoneDisplay: "+385 91 434 5249",
  email: "drskocibusic@gmail.com",
  whatsapp: "https://wa.me/385914345249",
  facebook: "https://facebook.com/placeholder",
  street: "Kolodvorska 129",
  postalCode: "31402",
  locality: "Koritna",
  region: "Slavonija",
  country: "HR",
  latitude: 45.391542,
  longitude: 18.557852,
  /**
   * Google Business Profile link, in the `?cid=` form Google itself hands out.
   * Decimal of the CID in the map embed on the contact section
   * (0x87d045fb24c5f5bb), whose label decodes to "OPG Skočibušić Mario".
   * Feeds `hasMap`, which helps Google tie this site to that profile
   */
  mapsUrl: "https://maps.google.com/?cid=9786398935232148923",
} as const;
