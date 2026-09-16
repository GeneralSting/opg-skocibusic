import { ImageResponse } from "next/og";
import { business, internalOrigin } from "./site";

/**
 * Generated Open Graph cards
 *
 * Every route renders its own card through the `opengraph-image` file
 * convention, so no two pages share a preview image. An item with a photo
 * shares that photograph on its own (`sharePhoto`); an item still waiting for
 * one gets the typographic layout, and upgrades itself the day a photo lands
 *
 * No `fonts` option, so @vercel/og's bundled Geist is used. It is the only
 * weight available, which is why hierarchy here comes from size and colour
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * An item's own photograph as its share image, the way the home page shares a
 * plain photograph rather than a designed card
 *
 * The photo comes from the image optimiser Next already runs, which transcodes
 * to JPEG for any caller that does not accept a modern format and resizes on
 * the way, landing near 120KB. Drawing it through `ImageResponse` instead would
 * hand back a 1-2MB PNG — fine for Facebook, but past the size WhatsApp fetches
 * for a link preview, and WhatsApp is how most of these links get shared
 *
 * The photo keeps its own proportions; every platform crops the preview to its
 * own shape anyway
 *
 * Returns null on any failure, so an unreachable optimiser costs the page its
 * photographic card and falls back to the typographic one
 */
export async function sharePhoto(src: string): Promise<Response | null> {
  if (!src) return null;

  for (const width of SHARE_PHOTO_WIDTHS) {
    const photo = await fetchJpeg(src, width);
    if (photo) {
      return new Response(photo, {
        headers: {
          "content-type": SHARE_PHOTO_CONTENT_TYPE,
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    }
  }

  return null;
}

export const SHARE_PHOTO_CONTENT_TYPE = "image/jpeg";

/**
 * Widths to ask for, largest first, all from Next's default `deviceSizes`
 *
 * Vercel's optimiser does not always transcode: for the BuzzCut logo it handed
 * back the original WebP at 1200 and 1080 and only returned a JPEG from 828
 * down, apparently keeping the original whenever a JPEG would come out heavier.
 * Flat artwork like a logo does. So a smaller size is tried before giving up
 */
const SHARE_PHOTO_WIDTHS = [1200, 1080, 828, 640];

async function fetchJpeg(
  src: string,
  width: number,
): Promise<ArrayBuffer | null> {
  try {
    const url = `${internalOrigin}/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
    const response = await fetch(url, { headers: { accept: "image/jpeg" } });
    if (!response.ok) return null;

    // WebP or AVIF would break older crawlers
    const type = response.headers.get("content-type") ?? "";
    if (!type.includes("jpeg")) return null;

    return await response.arrayBuffer();
  } catch {
    return null;
  }
}

/** Kicker and availability badge. Sits at the top of a typographic card and at
 * the head of the bottom stack on a photograph
 */
const headRow = (kicker: string, badge?: string) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div
      style={{
        display: "flex",
        fontSize: 26,
        letterSpacing: 5,
        color: "#b8d89a",
      }}
    >
      {kicker.toUpperCase()}
    </div>
    {badge ? (
      <div
        style={{
          display: "flex",
          padding: "10px 26px",
          borderRadius: 999,
          backgroundColor: "rgba(184, 216, 154, 0.16)",
          border: "1px solid rgba(184, 216, 154, 0.45)",
          color: "#cde6b4",
          fontSize: 24,
          letterSpacing: 2,
        }}
      >
        {badge.toUpperCase()}
      </div>
    ) : null}
  </div>
);

/** Long titles would wrap to a third line and crowd whatever sits under them */
const titleStyle = (title: string) => ({
  display: "flex",
  fontSize: title.length > 30 ? 70 : 86,
  lineHeight: 1.06,
  color: "#ffffff",
});

/** The card for pages with no photograph of their own: the catalogue, and any item still waiting for one */
export function ogCard({
  kicker,
  title,
  description,
  badge,
}: {
  kicker: string;
  title: string;
  description: string;
  badge?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#1e2d18",
        backgroundImage:
          "linear-gradient(135deg, #1e2d18 0%, #33512a 58%, #4a753b 100%)",
        color: "#f5f0e8",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
        }}
      >
        {headRow(kicker, badge)}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={titleStyle(title)}>{title}</div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              maxWidth: 900,
              fontSize: 29,
              lineHeight: 1.45,
              color: "rgba(245, 240, 232, 0.86)",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid rgba(184, 216, 154, 0.28)",
            fontSize: 26,
            color: "#b8d89a",
          }}
        >
          <div style={{ display: "flex" }}>
            {`${business.name} · ${business.locality}, ${business.municipality}`}
          </div>
          <div style={{ display: "flex" }}>{business.phoneDisplay}</div>
        </div>
      </div>
    </div>,
    OG_SIZE,
  );
}
