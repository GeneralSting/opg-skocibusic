import { notFound } from "next/navigation";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  SHARE_PHOTO_CONTENT_TYPE,
  ogCard,
  sharePhoto,
} from "../../og-card";
import { findItem } from "../../utilities";
import { business } from "../../site";

type Props = { params: Promise<{ id: string }> };

/**
 * One card per item, with the item's own alt text. `generateImageMetadata` is
 * what allows the alt to vary by param — a plain `alt` export is static.
 *
 * An item with a photo shares that photograph, at its own proportions, so no
 * `size` is declared for it: platforms crop previews to their own shape and
 * measure the picture themselves. The typographic fallback is a fixed 1200×630.
 *
 * These cards are rendered on the first request for each item and cached from
 * then on, not built ahead of time: Next 16.2.4 refuses to boot when an
 * `opengraph-image` route exports `generateStaticParams` ("Cannot find module
 * for page"), and `dynamic = "force-static"` does not prerender them either.
 */
export async function generateImageMetadata({ params }: Props) {
  const found = findItem((await params).id);
  const alt = found
    ? `${found.item.title} — ${business.name}`
    : `${business.name}`;

  if (found?.item.gallery.length) {
    return [{ id: "card", alt, contentType: SHARE_PHOTO_CONTENT_TYPE }];
  }

  return [{ id: "card", alt, size: OG_SIZE, contentType: OG_CONTENT_TYPE }];
}

export default async function Image({ params }: Props) {
  const found = findItem((await params).id);
  if (!found) notFound();

  const { branch, item } = found;
  const [cover] = item.gallery;

  const photo = cover ? await sharePhoto(cover.src) : null;
  if (photo) return photo;

  return ogCard({
    kicker: branch.label,
    title: item.title,
    description: item.lead,
    badge: item.tag,
  });
}
