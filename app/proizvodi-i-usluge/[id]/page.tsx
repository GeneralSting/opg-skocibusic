import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "../../navbar";
import Footer from "../../ui/footer";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { ContactButtons } from "../../ui/contact-buttons";
import { ProductGallery } from "../../product-gallery";
import { ItemCard, AvailabilityTag, GRID_CARD_SIZES } from "../../ui/item-card";
import { JsonLd } from "../../ui/json-ld";
import { catalogItems, FACT_CARD_COPY, MISSING_IMAGE_TEXT } from "../../data";
import { findItem, itemPath } from "../../utilities";
import { business, siteUrl, socialMeta } from "../../site";
import {
  breadcrumbSchema,
  businessStub,
  graph,
  itemSchema,
  itemUrl,
} from "../../schema";

type Props = { params: Promise<{ id: string }> };

/** Every catalogue item gets a prerendered page at build time. */
export function generateStaticParams() {
  return catalogItems.map((item) => ({ id: item.id }));
}

// The catalogue is fixed at build time, so any other slug is a plain 404 instead of a page rendered on request
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = findItem((await params).id);
  if (!found) return {};

  const { catalogItem } = found;
  const path = itemPath(catalogItem);

  return {
    title: catalogItem.seoTitle,
    description: catalogItem.seoDescription,
    alternates: { canonical: path },
    ...socialMeta({
      title: catalogItem.seoTitle,
      description: catalogItem.seoDescription,
      path,
    }),
  };
}

export default async function DetaljiProizvoda({ params }: Props) {
  const found = findItem((await params).id);
  if (!found) notFound();

  const { branch, catalogItem } = found;
  const factCopy = FACT_CARD_COPY[branch.kind];
  const related = branch.items.filter(
    (branchItem) => branchItem.id !== catalogItem.id,
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="detail-head">
          <div className="container">
            <Breadcrumbs
              crumbs={[
                { label: "Naslovnica", href: "/" },
                { label: "Proizvodi i usluge", href: "/proizvodi-i-usluge" },
                { label: catalogItem.title },
              ]}
            />

            <div className="detail-layout">
              {catalogItem.gallery.length > 0 ? (
                <ProductGallery
                  title={catalogItem.title}
                  media={catalogItem.gallery}
                />
              ) : (
                <div className="detail-media">
                  <div className="photo-pending-block">
                    <span className="photo-pending">{MISSING_IMAGE_TEXT}</span>
                    <span>{catalogItem.title}</span>
                  </div>
                </div>
              )}

              <div>
                <p className="section-label">{branch.label}</p>
                <h1 className="detail-title">{catalogItem.title}</h1>
                <p className="detail-lead">{catalogItem.lead}</p>
                <AvailabilityTag tag={catalogItem.tag} />

                <div className="detail-actions">
                  <ContactButtons />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="detail-facts">
          <div className="container detail-facts-layout">
            <div>
              <h2 className="section-label">U ponudi</h2>
              <ul className="bullet-grid">
                {catalogItem.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span aria-hidden="true">—</span> {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="fact-card">
              <div className="fact">
                <h3 className="fact-label">Dostupnost</h3>
                <div className="fact-value">{catalogItem.availability}</div>
              </div>
              <div className="fact bordered">
                <h3 className="fact-label">{factCopy.settleLabel}</h3>
                <div className="fact-value">{catalogItem.settle}</div>
              </div>
              <div className="fact bordered">
                <h3 className="fact-label">Lokacija</h3>
                <div className="fact-value">
                  {business.locality}, {business.municipality}
                </div>
              </div>
              <p className="fact-note">{factCopy.note}</p>
            </aside>
          </div>
        </section>

        {related.length > 0 && (
          <section className="related">
            <div className="container">
              <p className="group-kicker">Iz iste djelatnosti</p>
              <div className="group-divider">
                <span className="rule" />
                <div className="group-heading">
                  <h2>{branch.title}</h2>
                </div>
                <span className="rule" />
              </div>

              <div className="items-grid">
                {related.map((relatedItem) => (
                  <ItemCard
                    key={relatedItem.id}
                    catalogItem={relatedItem}
                    sizes={GRID_CARD_SIZES}
                  />
                ))}
              </div>

              <div className="related-footer">
                <Link href="/proizvodi-i-usluge" className="btn btn-ghost">
                  Svi proizvodi i usluge
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      <JsonLd
        schema={graph(
          businessStub(),
          itemSchema(catalogItem, branch),
          breadcrumbSchema([
            { name: "Naslovnica", url: siteUrl },
            {
              name: "Proizvodi i usluge",
              url: `${siteUrl}/proizvodi-i-usluge`,
            },
            { name: catalogItem.title, url: itemUrl(catalogItem) },
          ]),
        )}
      />
    </>
  );
}
