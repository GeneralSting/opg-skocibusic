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
    img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80",
    title: "Goveđe meso",
    desc: "Svježe meso domaćeg goveda, uzgojenog na prirodnoj paši.",
    tag: "Dostupno",
  },
  {
    img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&q=80",
    title: "Svinjsko meso",
    desc: "Tradicionalno uzgojene svinje domaćeg podrijetla.",
    tag: "Dostupno",
  },
  {
    img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&q=80",
    title: "Kokošja jaja",
    desc: "Svježa jaja slobodnih kokoši — bogata okusom.",
    tag: "Dostupno",
  },
  {
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    title: "Sezonsko Povrće",
    desc: "Domaći uzgoj bez pesticida, ovisno o trenutnoj sezoni.",
    tag: "Uskoro", // Primjer statusa
  },
  {
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    title: "Presadnice povrća",
    desc: "Zdrave sadnice za vaš vrt — rajčice, paprike i drugo.",
    tag: "Dostupno",
  },
  {
    img: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=600&q=80",
    title: "Drvo za ogrjev",
    desc: "Kvalitetno suho drvo za grijanje, pripremljeno i složeno.",
    tag: "Dostupno",
  },
  {
    img: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    title: "Biljni terarij",
    desc: "Minijaturni vrt u staklenki — savršen ukras za dom.",
    tag: "Dostupno",
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
