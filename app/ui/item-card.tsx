import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { itemPath, truncateText } from "../utilities";
import { Availability, CatalogItem } from "../types";
import { MISSING_IMAGE_TEXT } from "../data";

/** Tag colour per availability: green available now, amber by prior agreement, grey not yet */
const TAG_CLASS: Record<Availability, string> = {
  Dostupno: "tag-now",
  "Po narudžbi": "tag-order",
  Uskoro: "tag-soon",
};

export const AvailabilityTag: FC<{ tag: Availability }> = ({ tag }) => (
  <span className={`tag ${TAG_CLASS[tag]}`}>{tag}</span>
);

interface ItemCardProps {
  catalogItem: CatalogItem;
  sizes: string;
  dialogTitle?: boolean;
}

/**
 * Rendered width of one `.items-grid` cell, used by the listing and the
 * "related items" strip
 *
 * The grid is `repeat(auto-fill, minmax(300px, 1fr))` with a 2rem gap inside
 * the 1100px-capped container, so it steps 1 → 2 → 3 columns. The breakpoints
 * sit slightly above the true column thresholds because CSS `100vw` counts the
 * scrollbar while the layout does not: erring high costs a few KB, erring low
 * renders a blurry image
 */
export const GRID_CARD_SIZES =
  "(min-width: 1148px) 346px, (min-width: 1040px) calc((100vw - 112px) / 3), (min-width: 700px) calc((100vw - 80px) / 2), calc(100vw - 48px)";

/**
 * Characters of the lead a card shows, roughly 10–15 words. The full lead is
 * on the detail page; measured to stay within 2–3 lines at every card width
 */
const LEAD_PREVIEW_LENGTH = 90;

/**
 * Card for a single catalogue item. Shared by the /proizvodi-i-usluge listing,
 * the branch modal on the home page and the "related items" strip on a detail
 * page, so `sizes` is passed in by the caller — the rendered width differs in
 * each of those three places
 */
export const ItemCard = ({
  catalogItem,
  sizes,
  dialogTitle = false,
}: ItemCardProps) => {
  const [cover] = catalogItem.gallery;

  const hierarchicalHeader = dialogTitle ? (
    <h4>{catalogItem.title}</h4>
  ) : (
    <h3>{catalogItem.title}</h3>
  );

  return (
    <Link href={itemPath(catalogItem)} className="item-card">
      <div className="item-card-media">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            quality={70}
            sizes={sizes}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span className="photo-pending">{MISSING_IMAGE_TEXT}</span>
        )}
      </div>

      <div className="item-card-body">
        <div>
          {hierarchicalHeader}
          <p>{truncateText(catalogItem.lead, LEAD_PREVIEW_LENGTH)}</p>
        </div>
        <AvailabilityTag tag={catalogItem.tag} />
      </div>
    </Link>
  );
};
