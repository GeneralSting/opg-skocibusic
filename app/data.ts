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

/** Fact card wording on a detail page that differs between goods and work performed */
export const FACT_CARD_COPY: Record<
  Branch["kind"],
  { settleLabel: string; note: string }
> = {
  product: {
    settleLabel: "Preuzimanje",
    note: "Ne nudimo online kupnju. Dostupnost i isporuka dogovaraju se osobno.",
  },
  service: {
    settleLabel: "Obračun",
    note: "Ne nudimo online kupnju. Obračun se dogovara osobno.",
  },
};

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
    img: "/products/pork-chop.webp",
    imgAlt: "Sirovi svinjski kotleti s kosti na drvenoj dasci",
    items: [
      {
        id: "meso",
        seoTitle: "Domaće Meso: Svinjetina, Janjetina i Junetina",
        seoDescription:
          "Domaće meso iz vlastitog uzgoja u Koritni: svinjetina, janjetina i junetina u paketima od 5 kg. Po narudžbi, uz preuzimanje na gospodarstvu ili dostavu.",
        title: "Domaće meso",
        tag: "Po narudžbi",
        gallery: [
          {
            type: "image",
            src: "/products/pork-chop.webp",
            alt: "Sirovi svinjski kotleti s kosti na drvenoj dasci",
          },
          {
            type: "image",
            src: "/products/lamb-meat.webp",
            alt: "Sirovi komadi janjetine s kosti na drvenoj dasci",
          },
          {
            type: "image",
            src: "/products/beef-pack.webp",
            alt: "Komadi junetine koji se stavljaju u paket junetine od 5 kila",
          },
        ],
        lead: "Meso iz vlastitog uzgoja na obiteljskom gospodarstvu u Koritni. U ponudi su svinjetina, janjetina i junetina, a količine ovise o trenutnoj dostupnosti i prodaju se prema prethodnom dogovoru.",
        bullets: ["Svinjetina", "Janjetina", "Junetina (paketi od 5 kg)"],
        availability: "Cijele godine, po dogovoru",
        settle: "Preuzimanje na gospodarstvu ili dostava",
      },
      {
        id: "hrana-za-stoku",
        seoTitle: "Stočna Hrana: Kukuruz, Žito, Ječam i Sijeno",
        seoDescription:
          "Kukuruz, žito, ječam i lucerna/sijeno s naših polja u Koritni. Hrana za stoku u vrećama ili u rinfuzi, s utovarom na gospodarstvu, dostupno cijele godine.",
        title: "Hrana za stoku",
        tag: "Dostupno",
        gallery: [
          {
            type: "image",
            src: "/products/livestock-feed.webp",
            alt: "Zrna ječma i kukuruza jedna uz druga",
          },
        ],
        lead: "Žitarice sa zlatnih slavonskih polja koje koristimo i za hranidbu vlastitih životinja. Stočna hrana prodaje se u vrećama ili u rinfuzi, na kilogram ili na komad.",
        bullets: [
          "Kukuruz",
          "Žito",
          "Ječam",
          "Sijeno i lucerna",
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
    desc: "Sezonsko voće i povrće te njihove presadnice iz vlastitog rasada za vrt i plastenik.",
    img: "/products/vegetables.webp",
    imgAlt:
      "Pletena košara puna rajčica, paprika, patlidžana, tikvica i drugog povrća",
    items: [
      {
        id: "povrce",
        seoTitle: "Sezonsko Voće i Povrće iz Koritne",
        seoDescription:
          "Sezonsko voće i povrće iz Koritne: salata, rajčica, paprika, jagode, dinje i lubenice. Uzgoj i priprema po narudžbi, od proljeća do jeseni.",
        title: "Voće i povrće",
        tag: "Po narudžbi",
        gallery: [
          {
            type: "image",
            src: "/products/vegetables.webp",
            alt: "Pletena košara puna rajčica, paprika, patlidžana, tikvica i drugog povrća",
          },
          {
            type: "image",
            src: "/products/watermelons.webp",
            alt: "Lubenice dozrijevaju na polju",
          },
          {
            type: "image",
            src: "/products/tomatoes-on-vine.webp",
            alt: "Crvene i zelene rajčice dozrijevaju na stabljikama",
          },
          {
            type: "image",
            src: "/products/strawberries.webp",
            alt: "Zrele i nedozrele jagode na slami ispod lišća",
          },
          {
            type: "image",
            src: "/products/radishes.webp",
            alt: "Svežanj crvenih rotkvica s lišćem, jedna prerezana na pola",
          },
          {
            type: "image",
            src: "/products/raised-bed-greens.webp",
            alt: "Salata i lisnato povrće na povišenoj drvenoj gredici",
          },
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
        availability: "Od proljeća do jeseni, po dogovoru",
        settle: "Preuzimanje na gospodarstvu ili dostava",
      },
      {
        id: "presadnice-povrca",
        seoTitle: "Presadnice Povrća za Vrt i Plastenik",
        seoDescription:
          "Presadnice paprike, rajčice, patlidžana, jagoda, lubenica i dinja iz vlastitog rasada u Koritni. Za vrt i plastenik, priprema po narudžbi,a dostupnost početkom proljeća.",
        title: "Presadnice povrća",
        tag: "Po narudžbi",
        gallery: [
          {
            type: "image",
            src: "/products/vegetables-seedings.webp",
            alt: "Mlade presadnice s prvim listovima u kontejneru za sjetvu",
          },
          {
            type: "image",
            src: "/products/tomato-seedlings.webp",
            alt: "Presadnice rajčice u kalićima",
          },
          {
            type: "image",
            src: "/products/seedling-trays.webp",
            alt: "Tek iznikle klice u kontejneru za sjetvu u plasteniku",
          },
          {
            type: "image",
            src: "/products/seedling-pricking.webp",
            alt: "Presadnice u crnim kalićima složene u bijelu gajbu",
          },
          {
            type: "image",
            src: "/about/vegetables-growing.webp",
            alt: "Mlade biljke povrća u kalićima na tlu plastenika",
          },
        ],
        lead: "Mlade presadnice iz vlastitog rasada, spremne za sadnju u vrt ili plastenik u proljeće. Ponuda i količine dogovaraju se unaprijed, stoga je poželjno na vrijeme najaviti željene vrste i količine.",
        bullets: [
          "Paprika",
          "Rajčica",
          "Patlidžan",
          "Jagoda",
          "Lubenica",
          "Dinja",
          "Ostalo po dogovoru",
        ],
        availability: "Početkom proljeća, po dogovoru",
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
    desc: "Strojna obrada zemlje, sjetva, krčenje zaraslih površina i košnja vlastitom mehanizacijom na području Općine Semeljci.",
    img: "/products/agro-services.webp",
    imgAlt: "Traktor sa sijačicom na pripremljenoj njivi",
    items: [
      {
        id: "strojevi",
        seoTitle: "Usluge Oranja, Tanjuranja i Sjetve",
        seoDescription:
          "Oranje, tanjuranje, sjetva i košnja vlastitom mehanizacijom na području Općine Semeljci. Obračun po površini ili satu, prema ratarskoj sezoni.",
        title: "Strojna obrada zemlje",
        tag: "Dostupno",
        gallery: [
          {
            type: "image",
            src: "/products/agro-services.webp",
            alt: "Traktor sa sijačicom na pripremljenoj njivi",
          },
          {
            type: "image",
            src: "/about/tractor-service.webp",
            alt: "Traktor s kosilicom kosi travu na livadi u suton",
          },
        ],
        lead: "Obrada zemljišta, sjetva i radovi prihrane zemlje vlastitom poljoprivrednom mehanizacijom. Usluge prilagođavamo potrebama proizvodnje i stanju zemljišta.",
        bullets: [
          "Oranje",
          "Tanjuranje",
          "Sjetva",
          "Košnja",
          "Ostale usluge po dogovoru",
        ],
        availability: "Prema ratarskoj sezoni",
        settle: "Obračun po površini ili satu",
      },
      {
        id: "krcenje",
        seoTitle: "Krčenje Šikare i Održavanje Zelenih Površina",
        seoDescription:
          "Krčenje zaraslih parcela, uklanjanje šikare, grmlja i drvenastog raslinja te košnja na području Općine Semeljci. Obračun prema satu i procjeni na terenu.",
        title: "Krčenje zaraslih površina",
        tag: "Dostupno",
        gallery: [
          {
            type: "image",
            src: "/products/buzz-cut.webp",
            alt: "Logo BuzzCut s traktorom, sjedećom kosilicom i trimerom: košnja, čišćenje, održavanje",
          },
          {
            type: "video",
            src: "/products/buzz-cut.mp4",
            poster: "/products/buzz-cut-poster.webp",
          },
        ],
        lead: "Standardna košnja, čišćenje zaraslih i zapuštenih parcela te uklanjanje šikare, drvenastog raslinja i samoniklog grmlja.",
        bullets: [
          "Krčenje zaraslih parcela",
          "Uklanjanje šikare",
          "Uklanjanje grmlja",
          "Uklanjanje drvenastog raslinja",
          "Održavanje zelenih površina",
          "Košnja sjedećom kosilicom",
          "Košnja trimerom",
        ],
        availability: "Cijele godine",
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
    desc: "Sadnice listopadnog drveća za vrt i pošumljavanje te ručno rađeni mali biljni terariji u staklenkama.",
    img: "/products/oak-trees.webp",
    imgAlt: "Mlade sadnice hrasta u crnim plastičnim posudama",
    items: [
      {
        id: "sadnice-drveca",
        seoTitle: "Sadnice Drveća: Hrast, Breza, Bagrem ",
        seoDescription:
          "Mlade sadnice breze, bagrema, johe, javorolisne platane i hrasta iz Koritne, za dvorišta, poljoprivredne površine i pošumljavanje. Dostupne cijele godine.",
        title: "Sadnice drveća",
        tag: "Dostupno",
        gallery: [
          {
            type: "image",
            src: "/products/oak-trees.webp",
            alt: "Mlade sadnice hrasta u crnim plastičnim posudama",
          },
          {
            type: "image",
            src: "/products/tree-seedlings.webp",
            alt: "Sadnice listopadnog drveća u posudama na vrtnom stolu",
          },
        ],
        lead: "Raznolike mlade sadnice listopadnog drveća, stare tek nekoliko mjeseci, uzgojene iz prirodno ubranog sjemena. Idealne su za sadnju u dvorištima, na poljoprivrednim površinama, u šumama i za obnovu šumskih područja.",
        bullets: [
          "Sadnice breza",
          "Sadnice bagrema",
          "Sadnice Johe",
          "Sadnice javorolisne platane",
          "Sadnice hrasta",
        ],
        availability: "Cijele godine",
        settle: "Preuzimanje na gospodarstvu ili dostava",
      },
      {
        id: "biljni-terariji",
        seoTitle: "Biljnji Terarij Fitonija",
        seoDescription:
          "Ručno rađeni biljni terariji u staklenkama od 100 ml i 150 ml, s fitonijama, mahovinom i ukrasnim kamenjem. Zatvoreni sustav traži vrlo malo njege.",
        title: "Biljni terariji",
        tag: "Dostupno",
        gallery: [
          {
            type: "image",
            src: "/products/terrariums-bottles.webp",
            alt: "Tri staklena terarija s plutenim čepom, fitonijama i mahovinom na drvenoj polici",
          },
          {
            type: "image",
            src: "/products/terrariums-cork.webp",
            alt: "Tri uska staklena terarija s plutenim čepom pune mahovine i fitonija",
          },
          {
            type: "image",
            src: "/products/fittonia.webp",
            alt: "Pogled odozgo u stakleni terarij s bijelo-zelenom fitonijom na mahovini",
          },
          {
            type: "image",
            src: "/products/fittonia-red.webp",
            alt: "Pogled odozgo u staklenki terarij s crvenom fitonijom na mahovini",
          },
        ],
        lead: "Ručno rađeni, unikatni zatvoreni biljni sustavi u staklenkama, većinom u manjim dimenzijama. Svaki terarij sastoji se od ukrasnog kamenja, sloja zemlje, fitonija (cvijeća) i različitih vrsta mahovine. Zatvoren sustav prirodno zadržava vlagu, pa terariji traže vrlo malo njege i dugo ostaju lijepi.",
        bullets: [
          "Razne vrste fitonija",
          "Razne vrste mahovine",
          "Ukrasno kamenje",
          "Staklenke od 100 ml i 150 ml",
          "Druge dimenzije po dogovoru",
        ],
        availability: "Cijele godine",
        settle: "Preuzimanje na gospodarstvu ili dostava",
      },
    ],
  },
];

export const allItems: CatalogItem[] = branches.flatMap(
  (branch) => branch.items,
); // every item across all branches, in catalogue order
