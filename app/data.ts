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

export const PRODUCTS_AND_SERVICES_PATH = "proizvodi-i-usluge";
export const PRODUCTS_AND_SERVICES_NAV = "Proizvodi / Usluge";

export const CATALOG_HREF = `/${PRODUCTS_AND_SERVICES_PATH}`; // Catalogue route, shared by the desktop and mobile navigation

/**
 * Every section on the home page, top to bottom
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
    label: "Stočarstvo",
    kind: "product",
    num: "01",
    kicker: "01 — Stočarstvo",
    title: "Meso, jaja i hrana za stoku",
    desc: "Govedina, svinjetina i janjetina s vlastitog uzgoja, jaja slobodnih kokoši te kukuruz, žito i ječam za stočnu hranu.",
    img: "/products/meat.webp",
    items: [
      {
        id: "meso",
        seoTitle: "Domaće meso iz vlastitog uzgoja",
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
        seoTitle: "Svježa jaja iz slobodnog uzgoja",
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
    id: "povrtlarstvo",
    label: "Povrtlarstvo",
    kind: "product",
    num: "02",
    kicker: "02 — Povrtlarstvo",
    title: "Povrće, lubenice i presadnice",
    desc: "Salata, luk, rajčica, grašak, jagode i lubenice u sezoni, uz presadnice povrća i drveća za vaš vrt.",
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
        lead: "Presadnice iz vlastitog rasada, spremne za sadnju u vrt ili vrtnu gredicu.",
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
      {
        id: "presadnice-drveca",
        seoTitle: "Presadnice drveća: breza, hrast, joha",
        title: "Presadnice drveća",
        desc: "Presadnice breza, hrasta, johe, platana (javorlisna)...",
        tag: "Uskoro",
        img: "/about/vegetables-growing.webp",
        lead: "Sadnice listopadnog drveća za dvorište, vjetrozaštitni pojas ili pošumljavanje.",
        bullets: ["Breza", "Hrast", "Joha", "Platana (javorlisna)"],
        availability: "Proljeće i jesen",
        settle: "Preuzimanje na gospodarstvu, veće količine po dogovoru",
      },
    ],
  },
  {
    id: "terariji",
    label: "Biljni terariji",
    kind: "product",
    num: "03",
    kicker: "03 — Biljni terariji",
    title: "Zelenilo u staklenki",
    desc: "Mali zatvoreni vrtovi u staklenkama od 100 ml i 150 ml. Traže malo pažnje, a drže se godinama.",
    img: "",
    items: [
      {
        id: "terarij-100",
        seoTitle: "Biljni terarij 100 ml u staklenki",
        title: "Biljni terarij 100 ml",
        desc: "Manja staklenka, za radni stol i policu",
        tag: "Uskoro",
        img: "",
        lead: "Zatvoreni biljni svijet u staklenki od 100 ml. Sam održava vlagu, pa je zalijevanje potrebno rijetko.",
        bullets: [
          "Staklenka 100 ml",
          "Zatvoreni sustav",
          "Rijetko zalijevanje",
          "Prikladno za dar",
        ],
        availability: "Uskoro u ponudi",
        settle: "Preuzimanje na gospodarstvu ili dostava po dogovoru",
      },
      {
        id: "terarij-150",
        seoTitle: "Biljni terarij 150 ml u staklenki",
        title: "Biljni terarij 150 ml",
        desc: "Veća staklenka, više prostora za biljke",
        tag: "Uskoro",
        img: "",
        lead: "Ista ideja u većem formatu — više prostora znači i više vrsta biljaka u jednoj staklenki.",
        bullets: [
          "Staklenka 150 ml",
          "Zatvoreni sustav",
          "Više biljnih vrsta",
          "Prikladno za dar",
        ],
        availability: "Uskoro u ponudi",
        settle: "Preuzimanje na gospodarstvu ili dostava po dogovoru",
      },
    ],
  },
  {
    id: "usluge",
    label: "Usluge",
    kind: "service",
    num: "04",
    kicker: "04 — Usluge",
    title: "Košnja, krčenje i strojevi",
    desc: "Košnja trave i voćnjaka, krčenje zarasle šikare, rad strojevima u ratarstvu i ugovaranje proizvodnje.",
    img: "/products/agro-services.webp",
    items: [
      {
        id: "kosnja",
        seoTitle: "Košnja trave i voćnjaka u Slavoniji",
        title: "Košnja trave i voćnjaka",
        desc: "Okućnice, livade i međuredovi u voćnjaku",
        tag: "Dostupno",
        img: "",
        lead: "Redovno održavanje okućnica, livada i međuredova u voćnjaku. Kosimo i površine koje su predugo stajale, gdje obična kosilica više ne prolazi.",
        bullets: [
          "Okućnice i dvorišta",
          "Livade i veće parcele",
          "Međuredovi u voćnjaku",
          "Jednokratno ili kroz sezonu",
        ],
        availability: "Travanj – listopad",
        settle: "Obračun po površini, izlazak na procjenu bez naplate",
      },
      {
        id: "krcenje",
        seoTitle: "Krčenje šikare i priprema zemljišta",
        title: "Krčenje zarasle šikare",
        desc: "Čišćenje zapuštenih površina i priprema zemljišta",
        tag: "Dostupno",
        img: "",
        lead: "Zapuštena parcela vraća se u upotrebljivo stanje: uklanjamo šikaru, samoniklo grmlje i visoku travu, a zemljište pripremamo za daljnju obradu.",
        bullets: [
          "Zarasle i zapuštene parcele",
          "Uklanjanje grmlja i šikare",
          "Čišćenje međa i kanala",
          "Priprema zemlje za obradu",
        ],
        availability: "Cijelu godinu",
        settle: "Obračun nakon procjene na terenu",
      },
      {
        id: "strojevi",
        seoTitle: "Strojne usluge u ratarstvu",
        title: "Strojevi u ratarstvu",
        desc: "Radovi vlastitom mehanizacijom, od pripreme zemlje do žetve",
        tag: "Dostupno",
        img: "/products/agro-services.webp",
        lead: "Radovi u ratarstvu vlastitom mehanizacijom. Za manje posjednike bez strojeva, ali i kao dopuna vlastitoj mehanizaciji u vrijeme najvećeg posla.",
        bullets: [
          "Obrada i priprema zemlje",
          "Sjetva i njega nasada",
          "Radovi u žetvi",
          "Prijevoz i utovar",
        ],
        availability: "Prema ratarskoj sezoni",
        settle: "Obračun po hektaru ili satu",
      },
      {
        id: "ugovorna-proizvodnja",
        seoTitle: "Ugovorna proizvodnja ratarskih kultura",
        title: "Ugovorna proizvodnja",
        desc: "Dogovor proizvodnje za veće i predvidive količine",
        tag: "Dostupno",
        img: "/products/livestock-feed.webp",
        lead: "Za kupce kojima trebaju veće i predvidive količine dogovaramo proizvodnju unaprijed — kulturu, površinu i rok preuzimanja utvrdimo prije sezone.",
        bullets: [
          "Dogovor prije sezone",
          "Ratarske kulture i povrće",
          "Poznata količina i rok",
          "Fiksna cijena kroz sezonu",
        ],
        availability: "Dogovor studeni – ožujak",
        settle: "Obračun prema ugovoru",
      },
    ],
  },
];

export const allItems: CatalogItem[] = branches.flatMap((b) => b.items); // every item across all branches, in catalogue order
