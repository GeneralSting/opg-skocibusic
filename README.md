# OPG Skočibušić

Marketing site for OPG Skočibušić, a family farm in Koritna, Slavonia. Built
with Next.js 16 (App Router) and Tailwind CSS 4. Single statically prerendered
page — no database, no CMS, no online ordering.

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
  layout.tsx        Root layout, metadata and LocalBusiness JSON-LD
  page.tsx          Composes the page sections
  site.ts           Canonical URL + business details (single source of truth)
  data.ts           Product and gallery content
  types.ts          Shared content types
  globals.css       All styling
  robots.ts         robots.txt
  sitemap.ts        sitemap.xml
  favicon.ico       Browser tab icon
  apple-icon.png    iOS home-screen icon (180x180)
  opengraph-image.jpg      Social sharing preview (1200x630)
  opengraph-image.alt.txt  Alt text for the preview
  ui/               Section components
public/             Images, served from /
```

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
- The footer's copyright year is baked in at build time, since the page is fully
  static. It updates on the next deploy.
