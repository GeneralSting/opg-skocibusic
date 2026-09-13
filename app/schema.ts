import { business, siteUrl } from "./site";
import { branches } from "./data";
import { itemPath } from "./utilities";
import type { Branch, CatalogItem } from "./types";

/**
 * schema.org builders for the JSON-LD each page emits
 *
 * One graph per page, assembled from these nodes. The business is described in
 * full on the home page only; everywhere else it appears as a stub carrying
 * the same `@id`, so `seller`/`provider` references resolve without repeating
 * the whole offer catalogue on all sixteen other pages
 */

/** Stable node identity for the business, referenced across the site */
const BUSINESS_ID = `${siteUrl}/#business`;

const absolute = (path: string) => `${siteUrl}${path}`;

export const itemUrl = (item: CatalogItem) => absolute(itemPath(item));

const availability = (item: CatalogItem) =>
  item.tag === "Dostupno"
    ? "https://schema.org/InStock"
    : "https://schema.org/PreOrder";

/**
 * Offers carry no `price`: nothing is sold online and prices are agreed by
 * phone. Google will report a missing price in the Rich Results Test, which is
 * expected — the markup is here for entity understanding, not price snippets
 */
function offer(item: CatalogItem) {
  return {
    "@type": "Offer",
    availability: availability(item),
    url: itemUrl(item),
    seller: { "@id": BUSINESS_ID },
  };
}

/**
 * Product or Service, depending on which line of business the item sits in
 *
 * No `offers` here: inside the offer catalogue this node is already the
 * `itemOffered` of an Offer, and repeating it would describe every item twice.
 * `itemSchema` adds it back for the detail pages, where the node stands alone
 */
function itemNode(item: CatalogItem, branch: Branch) {
  const url = itemUrl(item);
  const shared = {
    "@id": `${url}#item`,
    name: item.title,
    description: item.lead,
    url,
    category: branch.label,
    keywords: item.bullets.join(", "),
    ...(item.img ? { image: absolute(item.img) } : {}),
  };

  return branch.kind === "service"
    ? {
        "@type": "Service",
        ...shared,
        serviceType: item.title,
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "AdministrativeArea", name: business.municipality },
      }
    : {
        "@type": "Product",
        ...shared,
        brand: { "@type": "Brand", name: business.name },
      };
}

/**
 * Pointer to an item, for the offer catalogue
 *
 * Same `@id` as the full node on the item's own page, so consumers merge the
 * two rather than reading two half-descriptions — which keeps the home page
 * from carrying a second copy of the whole catalogue
 */
function itemRef(item: CatalogItem, branch: Branch) {
  return {
    "@type": branch.kind === "service" ? "Service" : "Product",
    "@id": `${itemUrl(item)}#item`,
    name: item.title,
    url: itemUrl(item),
  };
}

/** The item as the main entity of its own detail page */
export function itemSchema(item: CatalogItem, branch: Branch) {
  return { ...itemNode(item, branch), offers: offer(item) };
}

/** Minimal stand-in so `@id` references on subpages point at a real node */
export function businessStub() {
  return {
    "@type": ["LocalBusiness", "Farm"],
    "@id": BUSINESS_ID,
    name: business.name,
    url: siteUrl,
  };
}

/** The full description of the farm. Home page only */
export function localBusinessSchema() {
  return {
    ...businessStub(),
    legalName: business.legalName,
    description: business.description,
    telephone: business.phone,
    email: business.email,
    image: absolute("/opengraph-image.jpg"),
    // The apple icon rather than favicon.ico: structured-data consumers want a
    // real raster image, and this one has an opaque background
    logo: absolute("/apple-icon.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      postalCode: business.postalCode,
      addressLocality: business.locality,
      addressRegion: business.county,
      addressCountry: business.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.latitude,
      longitude: business.longitude,
    },
    hasMap: business.mapsUrl,
    areaServed: { "@type": "AdministrativeArea", name: business.municipality },
    // Nested one level so the catalogue mirrors the site: a sub-catalogue per
    // line of business, each holding that branch's offers
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Proizvodi i usluge",
      itemListElement: branches.map((branch) => ({
        "@type": "OfferCatalog",
        name: branch.label,
        itemListElement: branch.items.map((item) => ({
          ...offer(item),
          itemOffered: itemRef(item, branch),
        })),
      })),
    },
  };
}

type Crumb = { name: string; url: string };

export function breadcrumbSchema(trail: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/** A page that lists items: the catalogue and each line of business */
export function collectionSchema({
  path,
  name,
  description,
  items,
}: {
  path: string;
  name: string;
  description: string;
  items: CatalogItem[];
}) {
  const url = absolute(path);

  return {
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    url,
    name,
    description,
    inLanguage: "hr",
    about: { "@id": BUSINESS_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: itemUrl(item),
      })),
    },
  };
}

/** Wraps page nodes into the single graph a page emits */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
