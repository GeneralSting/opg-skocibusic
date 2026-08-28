import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "../og-card";
import { allItems } from "../data";

export const alt = "Katalog proizvoda i usluga OPG-a Skočibušić";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({
    kicker: "Katalog",
    title: "Proizvodi i usluge",
    description:
      "Meso, jaja i hrana za stoku, povrće i presadnice, biljni terariji te usluge košnje, krčenja i rada strojevima.",
    badge: `${allItems.length} stavki`,
  });
}
