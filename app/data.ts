import { AboutImage, Branch, CatalogItem, NavbarSectionId } from "./types";

export const aboutImages: AboutImage[] = [
  {
    src: "/about/sheeps.webp",
    alt: "Skupina ovaca, jedna ovca je u fokusu dok su ostale u pozadini",
  },
  {
    src: "/about/watering-vegetables.webp",
    alt: "Kanta za zalijevanje sipa vodu po mladim biljkama povrća",
  },
  {
    src: "/about/vegetables-growing.webp",
    alt: "Mlade biljke povrća razvijaju se u kalićima",
  },
  {
    src: "/about/small-cow.webp",
    alt: "Smeđe bijela glava teleta",
  },
  {
    src: "/about/pig.webp",
    alt: "Malo prase na travi",
  },
  {
    src: "/about/ducks-and-chicken.webp",
    alt: "Pet pataka i pijetao",
  },
  {
    src: "/about/lamb-and-sheep.webp",
    alt: "Janje i njegova mater ovce u pozadini",
  },
  {
    src: "/about/cow.webp",
    alt: "Krava na ispaši",
  },
  {
    src: "/about/tractor-service.webp",
    alt: "Traktorom i kosilicom se kosi djetelina",
  },
  {
    src: "/about/sheep-bottle-feeding.webp",
    alt: "Janje pije iz flaše s dudom",
  },
  {
    src: "/about/lamb.webp",
    alt: "Janje u fokusu, ostatak ovaca u pozadini",
  },
];

export const MISSING_IMAGE_TEXT = "Fotografija dolazi";

export const PRODUCTS_AND_SERVICES_PATH = "proizvodi-i-usluge";
export const PRODUCTS_AND_SERVICES_NAV = "Proizvodi / Usluge";

export const CATALOG_HREF = `/${PRODUCTS_AND_SERVICES_PATH}`; // Catalogue route, shared by the desktop and mobile navigation

/**
 * Every section on the home page, top to bottom
 *
 * Each id must match the `id` on the matching <section>. They drive the anchor
 * links, and app/navbar/use-nav-scroll.ts measures those elements to decide
 * which nav item is highlighted — a mismatch fails silently, as a dead link and
 * a nav item that never lights up
 *
 * The hero is in here even though it has no nav item: the scroll tracking
 * compares all four, and the hero has to be able to win so that nothing is
 * highlighted while the visitor is still looking at it
 */
export const HOME_SECTION_IDS: NavbarSectionId[] = [
  "naslovna",
  "o-nama",
  "djelatnosti",
  "kontakt",
];

export const NAVBAR_SECTIONS: { id: NavbarSectionId; label: string }[] = [
  { id: "o-nama", label: "O nama" },
  { id: "djelatnosti", label: "Djelatnosti" },
  { id: "kontakt", label: "Kontakt" },
];

/**
 * Shared catalogue of lines of business, products and services
 *
 * This is the single source for the "Djelatnosti" section on the home page,
 * the /proizvodi-i-usluge listing, every detail page, and the LocalBusiness
 * offer catalogue in the root layout. Adding an item here is enough to give it
 * a statically generated detail page
 */
export const branches: Branch[] = [
  {
    id: "stocarstvo",
    label: "Stočarstvo i ratarstvo",
    kind: "product",
    num: "01",
    title: "Stočarstvo i ratarstvo",
    desc: "Domaće meso iz vlastitog uzgoja te žitarice i hrana za životinje s naših polja.",
    img: "/products/meat.webp",
    items: [
      {
        id: "meso",
        seoTitle: "Domaće meso iz vlastitog uzgoja, Koritna",
        title: "Domaće meso",
        tag: "Po narudžbi",
        gallery: [
          { type: "image", src: "/products/meat.webp" },
          { type: "image", src: "/products/pork-chop.webp" },
          { type: "image", src: "/products/lamb-meat.jpg" },
        ],
        lead: "Meso iz vlastitog uzgoja na obiteljskom gospodarstvu u Koritni. U ponudi su govedina, svinjetina i janjetina, a količine ovise o trenutnoj dostupnosti i prodaju se prema prethodnom dogovoru.",
        bullets: ["Svinjetina", "Janjetina", "Junetina (5kg paketi)"],
        availability: "Cijelu godinu, po dogovoru",
        settle: "Preuzimanje na gospodarstvu ili dostava",
      },
      {
        id: "hrana-za-stoku",
        seoTitle: "Hrana za stoku: kukuruz, žito, ječam",
        title: "Hrana za stoku",
        tag: "Dostupno",
        gallery: [{ type: "image", src: "/products/livestock-feed.webp" }],
        lead: "Žitarice sa zlatnih slavonskih polja koje koristimo i za hranidbu vlastitih životinja. Stočna hrana se pakira u vreće ili rinfuzu, a prodaje na kile ili komade.",
        bullets: [
          "Kukuruz",
          "Žito",
          "Ječam",
          "Sijeno/lucerna",
          "Ostalo po dogovoru",
        ],
        availability: "Cijele godine",
        settle: "Preuzimanje na gospodarstvu, utovar osiguran",
      },
    ],
  },
  {
    id: "vrtlarstvo",
    label: "Vrtlarstvo",
    kind: "product",
    num: "02",
    title: "Vrtlarstvo",
    desc: "Sezonsko voće i povrće te njihove presadnice iz vlastitog rasada za vrt i plastenik",
    img: "/products/vegetables.webp",
    items: [
      {
        id: "povrce",
        seoTitle: "Sezonsko povrće i lubenice iz Koritne",
        title: "voće i povrće",
        tag: "Po narudžbi",
        gallery: [
          { type: "image", src: "/products/vegetables.webp" },
          { type: "image", src: "/products/watermelons.jpg" },
          { type: "image", src: "/products/tomatoes-on-vine.jpeg" },
          { type: "image", src: "/products/strawberries.jpg" },
          { type: "image", src: "/products/radishes.jpg" },
          { type: "image", src: "/products/raised-bed-greens.jpg" },
        ],
        lead: "Sezonsko voće i povrće uzgajano na tlu i gredicama na našem gospodarstvu u Koritni. Proizvodnja koja se planira prema prethodnom dogovoru, pa je poželjno unaprijed najaviti željene vrste i količine kako bi se proizvodnja mogla pripremiti.",
        bullets: [
          "Salata",
          "Luk",
          "Rotkvice",
          "Rajčica",
          "Paprika",
          "Grašak",
          "Jagode",
          "Dinje",
          "Lubenice",
          "Ostalo po dogovoru",
        ],
        availability: "U sezoni, od proljeća do jeseni (uz dogovor)",
        settle: "Preuzimanje na gospodarstvu ili dostava",
      },
      {
        id: "presadnice-povrca",
        seoTitle: "Presadnice povrća za vrt i plastenik",
        title: "Presadnice povrća",
        tag: "Po narudžbi",
        gallery: [
          { type: "image", src: "/products/vegetables-seedings.webp" },
          { type: "image", src: "/products/tomato-seedlings.jpg" },
          { type: "image", src: "/products/seedling-trays.jpg" },
          { type: "image", src: "/products/seedling-pricking.jpg" },
          { type: "image", src: "/about/vegetables-growing.webp" },
        ],
        lead: "Mlade presadnice iz vlastitog rasada, spremne za sadnju u vrt ili plastenik u proljeće. Ponuda i količine dogovaraju se unaprijed, stoga je poželjno na vrijeme najaviti željene vrste i količine.",
        bullets: [
          "Paprika",
          "Rajčica",
          "Patlidžan",
          "Jagode",
          "Lubenica",
          "Dinja",
          "Ostalo po dogovoru",
        ],
        availability: "Početak proljeća (uz dogovor)",
        settle: "Preuzimanje na gospodarstvu ili dostava",
      },
    ],
  },
  {
    id: "usluge",
    label: "Poljoprivredne i strojne usluge",
    kind: "service",
    num: "03",
    title: "Poljoprivredne i strojne usluge",
    desc: "Strojni radovi u ratarstvu, ugovorna proizvodnja, krčenje zaraslih površina te košnja okućnica, livada i voćnjaka.",
    img: "/products/agro-services.webp",
    items: [
      {
        id: "strojevi",
        seoTitle: "Oranje, tanjuranje i sjetva, Semeljci",
        title: "Strojna obrada zemlje",
        tag: "Dostupno",
        gallery: [
          { type: "image", src: "/products/agro-services.webp" },
          { type: "image", src: "/about/tractor-service.webp" },
        ],
        lead: "Obrada zemljišta, sjetva i radovi prihrane zemlje vlastitom poljoprivrednom mehanizacijom. Usluge prilagođavamo potrebama proizvodnje i stanju zemljišta.",
        bullets: [
          "Oranje",
          "Tanjuranje",
          "Sijanje",
          "Košnja",
          "Ostale usluge po dogovoru",
        ],
        availability: "Prema ratarskoj sezoni",
        settle: "Obračun po površini ili satu",
      },
      {
        id: "krcenje",
        seoTitle: "Krčenje šikare i čišćenje parcela, Semeljci",
        title: "Krčenje zarasle površina",
        tag: "Dostupno",
        gallery: [
          { type: "image", src: "/products/buzz-cut.jpeg" },
          {
            type: "video",
            src: "/products/buzz-cut.mp4",
            poster: "/about/tractor-service.webp",
          },
        ],
        lead: "Standardna košnja te čišćenje zarasle i zapuštene parcele te uklanjanje šikare, drvenastog raslinja i samoniklog grmlja.",
        bullets: [
          "Krčenje zaraslih parcela",
          "Uklanjanje šikare",
          "Uklanjanje grmlja",
          "Uklanjanje drvenastog raslinja",
          "Košnja sjedećom kosilicom",
          "Košnja trimerom",
        ],
        availability: "Cijelu godinu",
        settle: "Obračun prema satu i procjeni na terenu",
      },
    ],
  },
  {
    id: "hortikultura",
    label: "Hortikultura",
    kind: "product",
    num: "04",
    title: "Hortikultura",
    desc: "Sadnice listopadnog drveća za vrt i pošumljavanje te ručno rađeni mali biljni terariji u staklenkama",
    img: "",
    items: [
      {
        id: "sadnice-drveca",
        seoTitle: "Sadnice drveća: breza, hrast, joha",
        title: "Sadnice drveća",
        tag: "Dostupno",
        gallery: [
          { type: "image", src: "/products/oak-trees.webp" },
          { type: "image", src: "/products/tree-seedlings.webp" },
        ],
        lead: "Raznolike mlade sadnice listopadnog drveća, stare tek nekoliko mjeseci, uzgojene iz prirodno ubranog sjemena. Idealne su za sadnju u dvorištima, na poljoprivrednim površinama, u šumama i za obnovu šumskih područja.",
        bullets: ["Breza", "Bagrem", "Joha", "Javorolisna platana", "Hrast"],
        availability: "Cijele godine",
        settle: "Preuzimanje na gospodarstvu ili dostava",
      },
      {
        id: "biljni-terariji",
        seoTitle: "Ručno rađeni biljni terariji u staklenkama",
        title: "Biljni terariji",
        tag: "Dostupno",
        gallery: [
          { type: "image", src: "/products/terrariums-bottles.jpg" },
          { type: "image", src: "/products/terrariums-cork.jpg" },
          { type: "image", src: "/products/fittonia.webp" },
        ],
        lead: "Ručno rađeni, unikatni zatvoreni biljni sustavi u staklenkama, većinom u manjim dimenzijama. Svaki terarij sastoji se od ukrasnog kamenja, sloja zemlje, fitonija (cvijeća) i različitih vrsta mahovine. Zatvoren sustav prirodno zadržava vlagu, pa terariji traže vrlo malo njege i dugo ostaju lijepi.",
        bullets: [
          "Razno fitonija cvijeće",
          "Razne vrste mahovine",
          "Ukrasno kamenje",
          "Staklenke 100ml i 150ml",
          "Druge dimenzije po dogovoru",
        ],
        availability: "Cijele godine",
        settle: "Preuzimanje na gospodarstvu ili dostava",
      },
    ],
  },
];

export const allItems: CatalogItem[] = branches.flatMap((b) => b.items); // every item across all branches, in catalogue order
