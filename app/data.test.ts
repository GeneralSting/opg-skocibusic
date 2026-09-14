import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  aboutImages,
  allItems,
  branches,
  HOME_SECTION_IDS,
  NAVBAR_SECTIONS,
} from "./data";
import {
  breadcrumbSchema,
  businessStub,
  collectionSchema,
  graph,
  itemSchema,
  localBusinessSchema,
} from "./schema";
import { siteUrl } from "./site";

/**
 * Guards for the failures this project cannot see: everything here passes the build and looks
 * correct in the browser. Anything not noticable by opening the page is deliberately not tested
 */

const appDir = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(appDir, "..");

describe("catalogue ids", () => {
  // IDs become URL segments, so a duplicate means two items share one route and findItem only ever resolves first
  // - the second siltently loses its page
  it("are unique across every branch", () => {
    const ids = allItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("are unique across branches themselves", () => {
    const ids = branches.map((branch) => branch.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // Croatina copy is full of č/ć/š/ž, and one of them in an id would be percent-encoded in the URL
  // and in every canonical and sitemap entry
  it("are lowercase slugs, safe to put in a URL", () => {
    for (const item of allItems) {
      expect(item.id, item.title).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("give every branch at least one item", () => {
    for (const branch of branches) {
      expect(branch.items.length, branch.label).toBeGreaterThan(0);
    }
  });
});

describe("SEO titles", () => {
  // The metadata template appends the brand suffix. Past this, Google truncates the result in search
  // - invisible locally, since nothing renders seoTitle
  const MAX = 43;

  it(`stay under ${MAX} characters`, () => {
    for (const item of allItems) {
      expect(item.seoTitle.length, item.seoTitle).toBeLessThanOrEqual(MAX);
    }
  });

  it("are present on every item", () => {
    for (const item of allItems) {
      expect(item.seoTitle.trim(), item.id).not.toBe("");
    }
  });
});

describe("images", () => {
  // Typo here renders "Fotografija dolazi" placeholder or a broken box, which is easy to miss on a page
  const exists = (src: string) => existsSync(join(projectRoot, "public", src));

  it("and videos in catalogue galleries exist in public/", () => {
    for (const item of allItems) {
      for (const media of item.gallery) {
        expect(exists(media.src), `${item.id}: ${media.src}`).toBe(true);
        if (media.type === "video") {
          expect(exists(media.poster), `${item.id}: ${media.poster}`).toBe(true);
        }
      }
    }
  });

  it("referenced by branches exist in public/", () => {
    for (const branch of branches) {
      expect(exists(branch.img), branch.img).toBe(true);
    }
  });

  it("in the about slider exist in public/", () => {
    for (const image of aboutImages) {
      expect(exists(image.src), image.src).toBe(true);
    }
  });

  it("in the about slider all carry alt text", () => {
    for (const image of aboutImages) {
      expect(image.alt.trim(), image.src).not.toBe("");
    }
  });
});

describe("font sizes", () => {
  // Nothing on the site goes below 14px. A 12px label still looks fine at a glance, so only this catches it
  const MIN_PX = 14;

  const toPx = (value: string) => {
    const match = value.trim().match(/^([\d.]+)(rem|px)$/);
    if (!match) return null;
    return Number(match[1]) * (match[2] === "rem" ? 16 : 1);
  };

  it(`never go below ${MIN_PX}px in globals.css`, () => {
    const css = readFileSync(join(appDir, "globals.css"), "utf8");

    for (const [, value] of css.matchAll(/font-size:\s*([^;]+);/g)) {
      // A clamp() can only be as small as its first argument. Other expressions (min, calc) are not checked
      const smallest = value.startsWith("clamp(")
        ? value.slice("clamp(".length).split(",")[0]
        : value;
      const px = toPx(smallest);
      if (px !== null) {
        expect(px, `font-size: ${value}`).toBeGreaterThanOrEqual(MIN_PX);
      }
    }
  });
});

describe("home sections", () => {
  // HOME_SECTION_IDS drives the anchor links and the scroll tracking, but the IDs themselves are written
  // by hand in the JSX. When the two drift apart the link goes nowhere and the nav never lights up, with no error
  const sourceIds = () => {
    const files = [
      join(appDir, "page.tsx"),
      ...readdirSync(join(appDir, "ui"))
        .filter((name) => name.endsWith(".tsx"))
        .map((name) => join(appDir, "ui", name)),
    ];

    const found = new Set<string>();
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(/<section[^>]*\sid="([^"]+)"/g)) {
        found.add(match[1]);
      }
    }
    return found;
  };

  it("each have a matching <section id> in the source", () => {
    const rendered = sourceIds();
    for (const id of HOME_SECTION_IDS) {
      expect(rendered, `no <section id="${id}">`).toContain(id);
    }
  });

  it("cover every navbar link", () => {
    for (const section of NAVBAR_SECTIONS) {
      expect(HOME_SECTION_IDS).toContain(section.id);
    }
  });
});

describe("structured data", () => {
  /**
   * A bare `{ "@id": ... }` is a pointer to a node described elsewhere in the
   * same graph. If nothing defines it the reference resolves to nothing and
   * Google quietly drops it, so every pointer must land on a real node
   */
  const check = (page: object) => {
    const defined = new Set<string>();
    const referenced = new Set<string>();

    const walk = (value: unknown) => {
      if (Array.isArray(value)) return value.forEach(walk);
      if (!value || typeof value !== "object") return;

      const node = value as Record<string, unknown>;
      const id = node["@id"];
      if (typeof id === "string") {
        if (Object.keys(node).length === 1) referenced.add(id);
        else defined.add(id);
      }
      Object.values(node).forEach(walk);
    };

    walk(page);
    for (const id of referenced) expect(defined, id).toContain(id);
    return referenced;
  };

  it("resolves every reference on the home page", () => {
    // The full business plus the whole offer catalogue: every offer points its
    // seller back at the business node this same graph defines
    expect(check(graph(localBusinessSchema())).size).toBeGreaterThan(0);
  });

  it("resolves every reference on the catalogue listing", () => {
    const page = graph(
      businessStub(),
      collectionSchema({
        path: "/proizvodi-i-usluge",
        name: "Proizvodi i usluge",
        description: "Popis",
        items: allItems,
      }),
      breadcrumbSchema([{ name: "Početna", url: siteUrl }]),
    );

    expect(check(page).size).toBeGreaterThan(0);
  });

  it("resolves every reference on each item page", () => {
    for (const branch of branches) {
      for (const item of branch.items) {
        const page = graph(
          businessStub(),
          itemSchema(item, branch),
          breadcrumbSchema([{ name: "Početna", url: siteUrl }]),
        );

        expect(check(page).size, item.id).toBeGreaterThan(0);
      }
    }
  });

  it("types every item as a Product or a Service", () => {
    for (const branch of branches) {
      for (const item of branch.items) {
        const node = itemSchema(item, branch) as { "@type": string };
        expect(node["@type"], item.id).toBe(
          branch.kind === "service" ? "Service" : "Product",
        );
      }
    }
  });
});
