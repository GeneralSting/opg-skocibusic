import { SHARE_PHOTO_CONTENT_TYPE, ogCard, sharePhoto } from "../og-card";
import { allItems, CATALOG_HEAD_PHOTO } from "../data";

export const alt = "Katalog proizvoda i usluga OPG-a Skočibušić";
export const contentType = SHARE_PHOTO_CONTENT_TYPE;

/*
 * The photograph the page opens with, shared as it is, like the home page and
 * every item page. No `size` export: the picture keeps its own proportions
 *
 * The typographic card stands in only if the image optimiser cannot be reached
 */
export default async function Image() {
  const photo = await sharePhoto(CATALOG_HEAD_PHOTO);
  if (photo) return photo;

  return ogCard({
    kicker: "Katalog",
    title: "Proizvodi i usluge",
    description:
      "Meso i hrana za stoku, voće i povrće, presadnice, sadnice drveća i biljni terariji te krčenje, košnja i obrada zemlje.",
    badge: `${allItems.length} stavki`,
  });
}
