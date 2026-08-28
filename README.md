# OPG Skočibušić

Marketing site for OPG Skočibušić, a family farm in Koritna, Slavonia. Built
with Next.js 16 (App Router) and Tailwind CSS 4. Statically prerendered — no
database, no CMS, no online ordering.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command      | Description                |
| ------------ | -------------------------- |
| `pnpm dev`   | Start the dev server       |
| `pnpm build` | Production build           |
| `pnpm start` | Serve the production build |
| `pnpm lint`  | Run ESLint                 |

## Configuration

`NEXT_PUBLIC_SITE_URL` must be set to the canonical production origin (for
example `https://opg-skocibusic.hr`). It drives `metadataBase`, the canonical
link, Open Graph URLs, `robots.txt` and `sitemap.xml`. On Vercel it falls back
to the deployment's production URL, and to `http://localhost:3000` locally, so
local development needs no setup.

## Structure

```
app/
  layout.tsx        Root layout and site-wide metadata
  page.tsx          Home page: hero, about, djelatnosti, contact
  proizvodi-i-usluge/
    page.tsx        Catalogue listing, grouped by line of business
    opengraph-image.tsx    Share card for the listing
    [id]/page.tsx          One prerendered detail page per catalogue item
    [id]/opengraph-image.tsx  Share card per item
  site.ts           Canonical URL, business details, social-tag helper
  utilities.ts      Catalogue lookups and route helpers
  schema.ts         JSON-LD builders (see Structured data)
  og-card.tsx       Shared layout for the generated share cards
  navbar/           Navigation feature: components, scroll hook, utilities, types
  data.ts           All content: catalogue, gallery photos, nav sections
  types.ts          Shared content types
  globals.css       All styling
  robots.ts         robots.txt
  sitemap.ts        sitemap.xml — home, listing, and every item
  favicon.ico       Browser tab icon
  apple-icon.png    iOS home-screen icon (180x180)
  opengraph-image.jpg      Home page share image (1200x630)
  opengraph-image.alt.txt  Alt text for it
  ui/               Section and shared components
public/             Images, served from /
```

## Content

[`app/data.ts`](app/data.ts) drives the whole catalogue. Each branch holds
its items, and adding an item there is enough to give it a card on the home page,
an entry in the listing, a prerendered detail page, a generated share card, a
sitemap URL and a place in the `LocalBusiness` offer catalogue. An item with
`img: ""` renders a "Potrebna fotografija" placeholder rather than breaking the
layout.

`title` is the on-page `<h1>`; `seoTitle` is the longer variant used for
`<title>`, Open Graph and the share card. The brand suffix is appended by the
metadata template, so keep `seoTitle` under about 43 characters or Google
truncates the result. Branches also carry `kind`, which decides whether their
items are described as schema.org `Product` or `Service`.

Branches have no pages of their own. They are a grouping — a modal on the home
page and a divided section on the listing — and a page per branch would have
duplicated content the listing already carries, for two to four items.

Gallery photos for the about slider live in [`app/data.ts`](app/data.ts).

Icons and the sharing image live in `app/` rather than `public/` because they are
Next.js [metadata file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata):
Next emits the `<link>` and `<meta>` tags for them automatically, with hashed
URLs and the correct `type`/`sizes` attributes. Everything referenced from JSX by
path stays in `public/`.

`apple-icon.png` has the brand green baked in because iOS composites transparent
icons onto black, and the logo mark is white on transparency — it was drawn for
the dark navbar. If the logo changes, this file needs regenerating alongside
`favicon.ico`.

Content changes (products, gallery photos, availability) live in
[`app/data.ts`](app/data.ts). Contact details and the canonical URL live in
[`app/site.ts`](app/site.ts).

## Structured data

[`app/schema.ts`](app/schema.ts) builds one JSON-LD graph per page:

| Page    | Graph                                                          |
| ------- | -------------------------------------------------------------- |
| Home    | `LocalBusiness`/`Farm` with the full offer catalogue             |
| Listing | business stub, `CollectionPage` + `ItemList`, `BreadcrumbList`   |
| Item    | business stub, `Product` or `Service`, `BreadcrumbList`          |

The farm is described in full on the home page only. Everywhere else it appears
as a stub carrying the same `@id`, which is enough for `seller` and `provider`
references to resolve without repeating the whole catalogue on all thirteen
other pages.

Offers deliberately carry no `price` — nothing is sold online and prices are
agreed by phone. Google reports the missing price in the Rich Results Test; the
markup is there for entity understanding, not price snippets.

## Notes

- Images are optimised by `next/image`. Allowed `quality` values are declared in
  [`next.config.ts`](next.config.ts) — Next.js 16 coerces any value not in
  `images.qualities` to the nearest allowed one, so a new `quality` prop needs
  to be added there too.
- Only the hero image uses `preload`; it is the LCP element. Note that React 19
  also emits a preload for any `<img>` that is not `loading="lazy"`, so
  below-the-fold images must stay lazy or they will compete with the hero.
- One product image is remote (Unsplash); its host is allowlisted under
  `images.remotePatterns`. Remote images need their host added there.
- `sizes` on the gallery and product images describes the real rendered width,
  not a viewport fraction — `.container` caps at 1100px, so those columns stop
  growing at 486px and 345px. If that layout changes, update `sizes` too.
- The ids in `HOME_SECTION_IDS` must match the `id` on each home-page
  `<section>`. They drive the anchor links, and
  [`app/navbar/use-nav-scroll.ts`](app/navbar/use-nav-scroll.ts) measures those
  elements to decide which nav item is highlighted — a mismatch fails silently,
  as a dead link and a nav item that never lights up.
- The footer's copyright year is baked in at build time, since the page is fully
  static. It updates on the next deploy.
- Every route generates its own Open Graph card from
  [`app/og-card.tsx`](app/og-card.tsx), so no two pages share a preview image.
  An item with a photo gets a photographic card; one still waiting for a photo
  gets the typographic layout and upgrades itself when the photo lands. They use
  @vercel/og's bundled Geist font, which has only one weight — hierarchy comes
  from size and colour.
- Satori, which rasterises those cards, cannot decode WebP and throws on it, so
  the photos are pulled through Next's own image optimiser with an
  `accept: image/jpeg` header rather than read off disk. That is also what
  resizes them, keeping each card's payload near 100KB against @vercel/og's
  500KB budget. Any failure falls back to the typographic card.
- `internalOrigin` in [`app/site.ts`](app/site.ts) is what those cards call, and
  it is deliberately not `siteUrl`: the optimiser only has to be reached, not
  linked to, so it targets the running instance rather than the canonical
  domain.
- Cards on dynamic routes are rendered on first request and cached, not built
  ahead of time. Next 16.2.4 fails to build if an `opengraph-image` route
  exports `generateStaticParams`, and `dynamic = "force-static"` does not
  prerender them either.
- `business.facebook` is still a placeholder. It is intentionally left out of
  the JSON-LD `sameAs`: publishing a fake profile URL to Google is worse than
  publishing none. Add it there once the real page exists.
