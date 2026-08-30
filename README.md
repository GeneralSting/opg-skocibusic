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

| Command           | Description                |
| ----------------- | -------------------------- |
| `pnpm dev`        | Start the dev server       |
| `pnpm build`      | Production build           |
| `pnpm start`      | Serve the production build |
| `pnpm lint`       | Run ESLint                 |
| `pnpm test`       | Run the tests once         |
| `pnpm test:watch` | Run them in watch mode     |

## Configuration

`NEXT_PUBLIC_SITE_URL` must be set to the canonical production origin (for
example `https://opg-skocibusic.hr`). It drives `metadataBase`, the canonical
link, Open Graph URLs, `robots.txt` and `sitemap.xml`. On Vercel it falls back
to the deployment's production URL, and to `http://localhost:3000` locally, so
local development needs no setup.

## Structure

```
app/
  layout.tsx                    Root layout, site-wide metadata, pre-paint nav script
  page.tsx                      Home page: hero, about, djelatnosti, contact
  proizvodi-i-usluge/
    page.tsx                    Catalogue listing, grouped by line of business
    opengraph-image.tsx         Share card for the listing
    [id]/page.tsx               One prerendered detail page per catalogue item
    [id]/opengraph-image.tsx    Share card per item
  navbar/                       Navigation feature
    navbar.tsx                  Open/closed state, scroll handlers, the single <nav>
    navbar-desktop.tsx          Wide-viewport links
    navbar-mobile.tsx           Hamburger and the panel it opens
    use-nav-scroll.ts           Active section and transparent-bar state
    utilities.ts                Scroll geometry, all of it pure
    utilities.test.ts           Scroll maths and threshold guards
    data.ts                     Thresholds and tuning constants
    types.ts                    Props and geometry types
    index.ts                    Public export
  ui/                           Page sections and shared components
  data.ts                       All content: catalogue, gallery photos, nav sections
  data.test.ts                  Content and structured-data guards
  utilities.ts                  Catalogue lookups and route helpers
  schema.ts                     JSON-LD builders (see Structured data)
  site.ts                       Canonical URL, business details, social-tag helper
  og-card.tsx                   Shared layout for the generated share cards
  types.ts                      Shared content types
  globals.css                   All styling
  robots.ts                     robots.txt
  sitemap.ts                    sitemap.xml — home, listing, and every item
  favicon.ico                   Browser tab icon
  apple-icon.png                iOS home-screen icon (180x180)
  opengraph-image.jpg           Home page share image (1200x630)
  opengraph-image.alt.txt       Alt text for it
public/                         Images, served from /
```

## Content

[`app/data.ts`](app/data.ts) drives the whole catalogue. Each branch holds
its items, and adding an item there is enough to give it a card on the home page,
an entry in the listing, a prerendered detail page, a generated share card, a
sitemap URL and a place in the `LocalBusiness` offer catalogue. An item with
`img: ""` renders a "Fotografija dolazi" placeholder rather than breaking the
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
| Home    | `LocalBusiness`/`Farm` with the full offer catalogue           |
| Listing | business stub, `CollectionPage` + `ItemList`, `BreadcrumbList` |
| Item    | business stub, `Product` or `Service`, `BreadcrumbList`        |

The farm is described in full on the home page only. Everywhere else it appears
as a stub carrying the same `@id`, which is enough for `seller` and `provider`
references to resolve without repeating the whole catalogue on all thirteen
other pages.

Offers deliberately carry no `price` — nothing is sold online and prices are
agreed by phone. Google reports the missing price in the Rich Results Test; the
markup is there for entity understanding, not price snippets.

## Tests

Deliberately narrow. `pnpm build` prerenders all 22 pages, so a broken route or
a type error already fails the build, and anything visually wrong is obvious on
the page. The tests cover only what passes the build, looks right in the
browser, and is still wrong:

[`app/data.test.ts`](app/data.test.ts) guards the content, since
[`app/data.ts`](app/data.ts) is the file that keeps being edited. Duplicate item
ids (two items sharing one route, the second losing its page), ids that are not
URL-safe slugs, `seoTitle` past the length Google truncates at, image paths with
no file behind them, and `HOME_SECTION_IDS` drifting from the `<section id>`
values written by hand in the JSX. It also walks each page's JSON-LD and checks
every bare `{ "@id": ... }` pointer lands on a node the same graph defines — a
dangling one is dropped silently by Google.

[`app/navbar/utilities.test.ts`](app/navbar/utilities.test.ts) covers the scroll
maths. The thresholds in [`app/navbar/data.ts`](app/navbar/data.ts) were tuned
against a real browser, and the tests freeze that result: the transparent-bar
hysteresis, and a jittering scroll through a section handover that has to flip
the highlight exactly once. Drop `SWITCH_MARGIN` to zero and that walk flips 15
times, which is the flicker the margin exists to prevent.
