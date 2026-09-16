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

// Site-relative path as a full URL on the canonical domain, for structured data and the sitemap
export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

/**
 * Origin for calling our own image optimiser, used by the share cards.
 *
 * On the production deployment it is the public domain. The deployment's own
 * `VERCEL_URL` does not work there: Vercel's Deployment Protection puts that
 * `*.vercel.app` address behind a login, and the catalogue card is rendered
 * during the build, before the new deployment answers at all. Either way the
 * fetch failed and every link preview fell back to the typographic card. The
 * live domain answers in both cases
 *
 * Previews and local runs keep their own instance: `.env` sets `siteUrl` to the
 * production domain even in development, which would miss photos not yet
 * deployed
 */
export const internalOrigin =
  process.env.VERCEL_ENV === "production"
    ? siteUrl
    : process.env.VERCEL_URL
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
  // Feeds the home page <title>, which the brand suffix pushes to 58 chars
  tagline: "Domaći Proizvodi i Usluge iz Koritne",
  // Feeds <meta name="description">, og:description and twitter:description
  // Keep it under ~160 characters or Google truncates it in results
  description:
    "OPG Skočibušić iz Koritne u općini Semeljci: domaće meso, voće i povrće, presadnice i sadnice s plodne slavonske zemlje te krčenje, košnja i strojni radovi.",
  phone: "+385914345249",
  phoneDisplay: "+385 91 434 5249",
  email: "drskocibusic@gmail.com",
  whatsapp: "https://wa.me/385914345249",
  // Facebook page URL. While null, the contact section and footer leave the
  // Facebook link out and the JSON-LD has no `sameAs`: a dead profile link is
  // worse than none. Filling it in turns all three on
  facebook: "https://web.facebook.com/opg.skocibusic",
  street: "Kolodvorska 129",
  postalCode: "31402",
  locality: "Koritna",
  municipality: "Općina Semeljci",
  county: "Osječko-baranjska županija",
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
