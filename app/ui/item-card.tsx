import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { itemPath } from "../utilities";
import { CatalogItem } from "../types";

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
 * Card for a single catalogue item. Shared by the /proizvodi-i-usluge listing,
 * the branch modal on the home page and the "related items" strip on a detail
 * page, so `sizes` is passed in by the caller — the rendered width differs in
 * each of those three places
 */
export const ItemCard: FC<{ item: CatalogItem; sizes: string }> = ({
  item,
  sizes,
}) => (
  <Link href={itemPath(item)} className="item-card">
    <div className="item-card-media">
      {item.img ? (
        <Image
          src={item.img}
          alt={item.title}
          fill
          quality={70}
          sizes={sizes}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <span className="photo-pending">Potrebna fotografija</span>
      )}
    </div>

    <div className="item-card-body">
      <div>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
      <AvailabilityTag tag={item.tag} />
    </div>
  </Link>
);

export const AvailabilityTag: FC<{ tag: CatalogItem["tag"] }> = ({ tag }) => (
  <span className={`tag ${tag === "Dostupno" ? "tag-now" : "tag-soon"}`}>
    {tag}
  </span>
);
