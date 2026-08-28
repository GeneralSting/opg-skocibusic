import { ImageResponse } from "next/og";
import { business, internalOrigin } from "./site";

/**
 * Generated Open Graph cards
 *
 * Every route renders its own card through the `opengraph-image` file
 * convention, so no two pages share a preview image. An item with a photo gets
 * that photo; an item still waiting for one gets the typographic layout, and
 * upgrades itself the day the photo lands
 *
 * No `fonts` option, so @vercel/og's bundled Geist is used. It is the only
 * weight available, which is why hierarchy here comes from size and colour
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Loads a catalogue photo in a format Satori can actually read
 *
 * Satori rasterises these cards and cannot decode WebP — it throws outright —
 * which is what every photo in `public/` is stored as. Rather than keeping a
 * second set of files in sync, this asks the image optimiser Next already runs
 * for a JPEG: it transcodes to JPEG whenever the caller does not accept a
 * modern format, and resizes on the way, keeping the payload near 100KB
 * against @vercel/og's 500KB budget
 *
 * Returns null on any failure, so an unreachable optimiser costs the card its
 * photograph rather than the whole image
 */
async function photoDataUri(src: string): Promise<string | null> {
  try {
    const url = `${internalOrigin}/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75`;
    const response = await fetch(url, { headers: { accept: "image/jpeg" } });
    if (!response.ok) return null;

    const type = response.headers.get("content-type") ?? "";
    // A proxy that hands back WebP or AVIF anyway would crash the render
    if (!type.includes("jpeg") && !type.includes("png")) return null;

    const bytes = Buffer.from(await response.arrayBuffer());
    return `data:${type};base64,${bytes.toString("base64")}`;
  } catch {
    return null;
  }
}

// Resolves an item's photo for a card, or null when there is nothing to show
export const cardPhoto = (src: string) => (src ? photoDataUri(src) : null);

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

export function ogCard({
  kicker,
  title,
  description,
  badge,
  photo,
}: {
  kicker: string;
  title: string;
  description: string;
  badge?: string;
  photo?: string | null;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#1e2d18",
        // Spread rather than `undefined`: Satori's style parser trims every
        // value it is handed and throws on an explicitly undefined one
        ...(photo
          ? {}
          : {
              backgroundImage:
                "linear-gradient(135deg, #1e2d18 0%, #33512a 58%, #4a753b 100%)",
            }),
        color: "#f5f0e8",
      }}
    >
      {photo ? (
        /* eslint-disable-next-line @next/next/no-img-element -- Satori JSX:
             next/image does not run inside ImageResponse. The alt text for the
             finished picture comes from each route's generateImageMetadata. */
        <img
          alt=""
          src={photo}
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}

      {/*
       * Scrim. All the type is stacked in the lower half, so only the lower
       * half darkens and the top of the frame stays untouched photograph. A
       * flat veil over the whole card keeps text safe but greys the food out,
       * which is the one thing a photographic card exists to avoid
       *
       * The band is near-opaque by the time it reaches the type rather than
       * merely tinted, because the photographs are whatever gets added next
       * and legibility cannot depend on one happening to be dark. Softer
       * versions measured 1.1:1 for the kicker against a white worktop
       */}
      {photo ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(180deg, rgba(18,30,14,0) 0%, rgba(18,30,14,0.06) 24%, rgba(18,30,14,0.55) 38%, rgba(18,30,14,0.93) 46%, rgba(18,30,14,0.97) 100%)",
          }}
        />
      ) : null}

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
        {photo ? <div style={{ display: "flex" }} /> : headRow(kicker, badge)}

        {/*
         * Typographic card only: title and description in the middle, with
         * the footer as a third row. On a photograph the title joins the
         * footer at the bottom instead, so all the type shares one dark base
         * and the top two thirds of the frame stay the picture.
         *
         * The description is dropped there as well — Facebook, WhatsApp and X
         * all render `og:description` next to the image themselves, so
         * printing it inside would cost a third of the frame to say it twice.
         */}
        {photo ? null : (
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
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          {photo ? headRow(kicker, badge) : null}
          {photo ? (
            <div style={{ ...titleStyle(title), marginTop: 22 }}>{title}</div>
          ) : null}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: photo ? 34 : 0,
              paddingTop: 28,
              borderTop: "1px solid rgba(184, 216, 154, 0.28)",
              fontSize: 26,
              color: "#b8d89a",
            }}
          >
            <div style={{ display: "flex" }}>
              {`${business.name} · ${business.locality}, ${business.region}`}
            </div>
            <div style={{ display: "flex" }}>{business.phoneDisplay}</div>
          </div>
        </div>
      </div>
    </div>,
    OG_SIZE,
  );
}
