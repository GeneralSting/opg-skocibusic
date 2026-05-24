import { FC } from "react";
import Image from "next/image";

type ProductStatus = "Dostupno" | "Uskoro";

interface Product {
  img: string;
  title: string;
  desc: string;
  tag: ProductStatus;
}

const productsData: Product[] = [
  {
    img: "/meat.webp",
    title: "Domaće meso",
    desc: "Govedina, svinjetina, janjetina...",
    tag: "Dostupno",
  },
  {
    img: "/chicken-eggs.webp",
    title: "Kokošja Jaja",
    desc: "Svježa jaja slobodnih kokoša",
    tag: "Dostupno",
  },
  {
    img: "/agro-services.webp",
    title: "Poljoprivredne usluge",
    desc: "Usluge poljoprivrednim strojevima u ratarstvu i ugovaranje proizvodnje",
    tag: "Dostupno",
  },
  {
    img: "/livestock-feed.webp",
    title: "Hrana za stoku",
    desc: "Kukuruz, pšenica, ječam...",
    tag: "Dostupno",
  },
  {
    img: "/vegetables-seedings.webp",
    title: "Presadnice povrća",
    desc: "Kvalitetno suho drvo za grijanje, pripremljeno i složeno.",
    tag: "Uskoro",
  },
  {
    img: "/vegetables.webp",
    title: "Povrće",
    desc: "Minijaturni vrt u staklenki — savršen ukras za dom.",
    tag: "Uskoro",
  },
  {
    img: "/vegetables.webp",
    title: "Presadnice drveća",
    desc: "Breza, hrast, joha, platana (javorlisna)...",
    tag: "Uskoro",
  },
  {
    img: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    title: "Biljni terarij",
    desc: "U staklenkama kapaciteta 100ml i 150ml",
    tag: "Uskoro",
  },
];

const ProductCard: FC<{ prod: Product }> = ({ prod }) => {
  const isAvailable = prod.tag === "Dostupno";

  return (
    <div className={`product-card ${!isAvailable ? "upcoming" : ""}`}>
      {/* Container za sliku s fiksnim omjerom (aspect-ratio) */}
      <div className="product-img-container">
        <Image
          src={prod.img}
          alt={prod.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="product-img"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="product-body">
        <h3>{prod.title}</h3>
        <p>{prod.desc}</p>
        <span className={`product-tag ${isAvailable ? "tag-now" : "tag-soon"}`}>
          {prod.tag}
        </span>
      </div>
    </div>
  );
};

const Products: FC = () => {
  return (
    <section id="products">
      <div className="container">
        <div className="products-header">
          <div className="section-label">Ponuda</div>
          <h2 className="section-title">Naši Proizvodi</h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Uzgojimo, pa prodamo. Zato se lista mijenja - pratite što je
            trenutno dostupno.
          </p>
        </div>

        <div className="products-grid">
          {productsData.map((prod, index) => (
            <ProductCard key={index} prod={prod} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
