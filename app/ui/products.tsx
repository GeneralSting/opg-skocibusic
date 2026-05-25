import { FC } from "react";
import Image from "next/image";
import { Product } from "../types";
import { productsData } from "../data";

const ProductCard: FC<{ prod: Product }> = ({ prod }) => {
  const isAvailable = prod.tag === "Dostupno";

  return (
    <div className={`product-card ${!isAvailable ? "upcoming" : ""}`}>
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
