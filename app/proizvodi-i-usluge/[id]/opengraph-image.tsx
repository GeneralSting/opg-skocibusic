import { notFound } from "next/navigation";
import { cardPhoto, OG_CONTENT_TYPE, OG_SIZE, ogCard } from "../../og-card";
import { findItem } from "../../utilities";
import { business } from "../../site";

type Props = { params: Promise<{ id: string }> };

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * One card per item, with the item's own alt text. `generateImageMetadata` is
 * what allows the alt to vary by param — a plain `alt` export is static.
 *
 * These cards are rendered on the first request for each item and cached from
 * then on, not built ahead of time: Next 16.2.4 refuses to boot when an
 * `opengraph-image` route exports `generateStaticParams` ("Cannot find module
 * for page"), and `dynamic = "force-static"` does not prerender them either.
 */
export async function generateImageMetadata({ params }: Props) {
  const found = findItem((await params).id);

  return [
    {
      id: "card",
      alt: found
        ? `${found.item.title} — ${business.name}`
        : `${business.name}`,
      size: OG_SIZE,
      contentType: OG_CONTENT_TYPE,
    },
  ];
}

export default async function Image({ params }: Props) {
  const found = findItem((await params).id);
  if (!found) notFound();

  const { branch, item } = found;

  return ogCard({
    kicker: branch.label,
    title: item.title,
    description: item.lead,
    badge: item.tag,
    photo: await cardPhoto(item.gallery[0]?.src ?? ""),
  });
}
