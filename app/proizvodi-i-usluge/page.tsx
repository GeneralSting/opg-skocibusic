import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "../navbar";
import Footer from "../ui/footer";
import CatalogCta from "../ui/catalog-cta";
import { Breadcrumbs } from "../ui/breadcrumbs";
import { ContactButtons } from "../ui/contact-buttons";
import { ItemCard, GRID_CARD_SIZES } from "../ui/item-card";
import { JsonLd } from "../ui/json-ld";
import { allItems, branches } from "../data";
import { siteUrl, socialMeta } from "../site";
import {
  breadcrumbSchema,
  businessStub,
  collectionSchema,
  graph,
} from "../schema";

const title = "Domaće Meso, Stočna Hrana i Presadnice";
const description =
  "Ponuda OPG-a Skočibušić iz Koritne, Općine Semeljci: meso i hrana za stoku, voće i povrće, presadnice, sadnice drveća i biljni terariji te krčenje, košnja i obrada zemlje.";
const path = "/proizvodi-i-usluge";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...socialMeta({ title, description, path }),
};

export default function ProizvodiIUsluge() {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-head">
          <Image
            src="/products-services-bg.webp"
            alt=""
            fill
            preload
            quality={75}
            sizes="100vw"
            className="page-head-bg"
          />

          <div className="container page-head-content">
            <Breadcrumbs
              variant="dark"
              crumbs={[
                { label: "Naslovnica", href: "/" },
                { label: "Proizvodi i usluge" },
              ]}
            />
            <h1>Ponuda s našeg gospodarstva</h1>
            <p>
              Pogledajte što trenutno nudimo s našeg obiteljskog gospodarstva te
              koje poljoprivredne i strojne usluge pružamo na području Općine
              Semeljci.
            </p>
            <div className="page-head-actions">
              <ContactButtons variant="dark" />
            </div>
          </div>
        </section>

        <section className="catalog">
          <div className="container catalog-groups">
            {branches.map((branch) => (
              <div key={branch.id}>
                <div className="group-divider">
                  <span className="rule" />
                  <div className="group-heading">
                    <h2>{branch.title}</h2>
                  </div>
                  <span className="rule" />
                </div>

                <div className="items-grid">
                  {branch.items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      sizes={GRID_CARD_SIZES}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="container">
            <CatalogCta />
          </div>
        </section>
      </main>
      <Footer />

      <JsonLd
        schema={graph(
          businessStub(),
          collectionSchema({
            path,
            name: title,
            description,
            items: allItems,
          }),
          breadcrumbSchema([
            { name: "Naslovnica", url: siteUrl },
            { name: title, url: `${siteUrl}${path}` },
          ]),
        )}
      />
    </>
  );
}
