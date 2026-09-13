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
    desc: "Domaće meso i jaja iz vlastitog uzgoja te žitarice i hrana za životinje s naših polja",
    img: "/products/meat.webp",
    items: [
      {
        id: "meso",
        seoTitle: "Domaće meso iz vlastitog uzgoja, Koritna",
        title: "Domaće meso",
        desc: "Govedina, svinjetina, janjetina...",
        tag: "Dostupno",
        img: "/products/meat.webp",
        lead: "Meso iz vlastitog uzgoja, od životinja koje su rasle slobodno i svojim tempom. Količine su ograničene, pa se narudžba dogovara unaprijed.",
        bullets: [
          "Govedina",
          "Svinjetina",
          "Janjetina",
          "Životinje iz slobodnog uzgoja",
          "Hrana s vlastitih polja",
          "Bez stimulatora rasta",
        ],
        availability: "Cijelu godinu, po dogovoru",
        settle: "Preuzimanje na gospodarstvu ili dostava po dogovoru",
      },
      {
        id: "jaja",
        seoTitle: "Svježa jaja iz slobodnog uzgoja, Koritna",
        title: "Kokošja jaja",
        desc: "Svježa jaja slobodnih kokoši",
        tag: "Dostupno",
        img: "/products/chicken-eggs.webp",
        lead: "Jaja kokoši koje se slobodno kreću po dvorištu i hrane se zrnom s naših polja.",
        bullets: [
          "Svakodnevno svježa",
          "Slobodan uzgoj",
          "Bez dodataka u hrani",
          "Pakiranje po dogovoru",
        ],
        availability: "Cijelu godinu",
        settle: "Preuzimanje na gospodarstvu",
      },
      {
        id: "hrana-za-stoku",
        seoTitle: "Hrana za stoku: kukuruz, žito, ječam",
        title: "Hrana za stoku",
        desc: "Kukuruz, žito, ječam...",
        tag: "Dostupno",
        img: "/products/livestock-feed.webp",
        lead: "Žitarice s naših polja, iste one kojima hranimo vlastite životinje. Prodaja u rinfuzi ili vrećama.",
        bullets: [
          "Kukuruz",
          "Žito",
          "Ječam",
          "Rinfuza ili vreće",
          "Vlastita proizvodnja",
        ],
        availability: "Nakon žetve, do proljeća",
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
        title: "Povrće i lubenice",
        desc: "Salata, luk, rajčica, grašak, jagode, lubenice...",
        tag: "Uskoro",
        img: "/products/vegetables.webp",
        lead: "Sezonsko povrće i lubenice s naših gredica. Bere se po potrebi, pa je ponuda vezana na sezonu.",
        bullets: [
          "Salata i luk",
          "Rajčica i grašak",
          "Jagode",
          "Lubenice",
          "Bez nepotrebnih dodataka",
        ],
        availability: "U sezoni, od proljeća do jeseni",
        settle: "Preuzimanje na gospodarstvu",
      },
      {
        id: "presadnice-povrca",
        seoTitle: "Presadnice povrća za vrt i plastenik",
        title: "Presadnice povrća",
        desc: "Presadnice paprike, rajčice, patlidžana, jagoda...",
        tag: "Uskoro",
        img: "/products/vegetables-seedings.webp",
        lead: "Mlade presadnice iz vlastitog rasada, spremne za sadnju u vrt ili plastenik u proljeće.",
        bullets: [
          "Paprika",
          "Rajčica",
          "Patlidžan",
          "Jagode",
          "Vlastiti rasad",
        ],
        availability: "Proljeće, do početka lipnja",
        settle: "Preuzimanje na gospodarstvu, narudžba unaprijed",
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
        title: "Strojni radovi i ugovorna proizvodnja",
        desc: "Oranje, tanjuranje, sjetva i ugovaranje cijele proizvodnje",
        tag: "Dostupno",
        img: "/products/agro-services.webp",
        lead: "Obrada zemlje i ratarski radovi vlastitom mehanizacijom, od oranja i tanjuranja do sjetve. Za veće i predvidive količine dogovaramo i cijelu proizvodnju unaprijed.",
        bullets: [
          "Oranje",
          "Tanjuranje",
          "Sjetva i ostali ratarski radovi",
          "Ugovaranje cijele proizvodnje",
        ],
        availability: "Prema ratarskoj sezoni",
        settle:
          "Obračun po hektaru ili satu, ugovorna proizvodnja prema ugovoru",
      },
      {
        id: "krcenje",
        seoTitle: "Krčenje šikare i čišćenje parcela, Semeljci",
        title: "Krčenje zarasle šikare",
        desc: "Čišćenje zapuštenih površina i priprema zemljišta",
        tag: "Dostupno",
        img: "",
        lead: "Zapuštenu parcelu vraćamo u upotrebljivo stanje: posebnim strojem uklanjamo šikaru, drvenasto raslinje i samoniklo grmlje, a zemljište pripremamo za daljnju namjenu.",
        bullets: [
          "Zarasle i zapuštene parcele",
          "Uklanjanje šikare i drvenastog raslinja",
          "Čišćenje međa i kanala",
          "Priprema zemlje za daljnju namjenu",
        ],
        availability: "Cijelu godinu",
        settle: "Obračun nakon procjene na terenu",
      },
      {
        id: "kosnja",
        seoTitle: "Košnja trave i voćnjaka, Koritna i Semeljci",
        title: "Košnja trave i voćnjaka",
        desc: "Okućnice, livade i međuredovi u voćnjaku",
        tag: "Dostupno",
        img: "",
        lead: "Redovito ili jednokratno održavanje okućnica, većih livada i međuredova u voćnjacima. Kosimo i površine koje su predugo stajale, gdje obična kosilica više ne prolazi.",
        bullets: [
          "Okućnice i dvorišta",
          "Livade i veće parcele",
          "Međuredovi u voćnjaku",
          "Jednokratno ili kroz sezonu",
        ],
        availability: "Travanj – listopad",
        settle: "Obračun po površini, izlazak na procjenu bez naplate",
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
        desc: "Breza, hrast, joha i javorolisna platana",
        tag: "Uskoro",
        img: "/about/vegetables-growing.webp",
        lead: "Mlade sadnice listopadnog drveća iz vlastitog uzgoja, za pošumljavanje, vjetrozaštitne pojaseve ili uređenje dvorišta.",
        bullets: ["Breza", "Hrast", "Joha", "Javorolisna platana"],
        availability: "Proljeće i jesen",
        settle: "Preuzimanje na gospodarstvu, veće količine po dogovoru",
      },
      {
        id: "biljni-terariji",
        seoTitle: "Ručno rađeni biljni terariji u staklenkama",
        title: "Biljni terariji",
        desc: "Ručno rađeni zatvoreni vrtovi od 100 ml i 150 ml",
        tag: "Uskoro",
        img: "",
        lead: "Ručno rađeni, unikatni zatvoreni ekosustavi u staklenkama od 100 ml i 150 ml. Sami recikliraju vlagu, pa traže vrlo malo njege i dugo ostaju lijepi — idealni za poklon.",
        bullets: [
          "Staklenke od 100 ml i 150 ml",
          "Ručno rađeni i unikatni",
          "Sami održavaju vlagu",
          "Prikladni za poklon",
        ],
        availability: "Uskoro u ponudi",
        settle: "Preuzimanje na gospodarstvu ili dostava po dogovoru",
      },
    ],
  },
];

export const allItems: CatalogItem[] = branches.flatMap((b) => b.items); // every item across all branches, in catalogue order
