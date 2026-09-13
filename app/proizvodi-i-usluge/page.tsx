import type { Metadata } from "next";
import { Navbar } from "../navbar";
import Footer from "../ui/footer";
import CtaBand from "../ui/cta-band";
import { Breadcrumbs } from "../ui/breadcrumbs";
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

const title = "Proizvodi i usluge";
const description =
  "Cjelovita ponuda OPG-a Skočibušić iz Koritne: meso, jaja i hrana za stoku, povrće i presadnice, biljni terariji te usluge košnje, krčenja i rada strojevima.";
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
          <div className="container">
            <Breadcrumbs
              variant="dark"
              crumbs={[
                { label: "Naslovnica", href: "/" },
                { label: "Proizvodi i usluge" },
              ]}
            />
            <h1>Sve što nudimo, na jednom mjestu</h1>
            <p>
              Proizvodi iz vlastitog uzgoja i usluge na terenu, razdvojeni po
              djelatnostima. Klikom na karticu otvaraju se detalji, dostupnost i
              način preuzimanja.
            </p>
          </div>
        </section>

        <section className="catalog">
          <div className="container catalog-groups">
            {branches.map((branch) => (
              <div key={branch.id}>
                <div className="group-divider">
                  <span className="rule" />
                  <div className="group-heading">
                    <div className="group-kicker">Djelatnost {branch.num}</div>
                    <h2>{branch.title}</h2>
                  </div>
                  <span className="rule" />
                </div>

                <div className="items-grid">
                  {branch.items.map((item) => (
                    <ItemCard key={item.id} item={item} sizes={GRID_CARD_SIZES} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CtaBand />
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
