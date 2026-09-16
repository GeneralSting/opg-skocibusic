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
import { allItems, FACT_CARD_COPY, MISSING_IMAGE_TEXT } from "../../data";
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
  return allItems.map((item) => ({ id: item.id }));
}

// The catalogue is fixed at build time, so any other slug is a plain 404 instead of a page rendered on request
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = findItem((await params).id);
  if (!found) return {};

  const { item } = found;
  const path = itemPath(item);

  return {
    title: item.seoTitle,
    description: item.seoDescription,
    alternates: { canonical: path },
    ...socialMeta({
      title: item.seoTitle,
      description: item.seoDescription,
      path,
    }),
  };
}

export default async function DetaljiProizvoda({ params }: Props) {
  const found = findItem((await params).id);
  if (!found) notFound();

  const { branch, item } = found;
  const factCopy = FACT_CARD_COPY[branch.kind];
  const related = branch.items.filter(
    (branchItem) => branchItem.id !== item.id,
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
                { label: item.title },
              ]}
            />

            <div className="detail-layout">
              {item.gallery.length > 0 ? (
                <ProductGallery title={item.title} media={item.gallery} />
              ) : (
                <div className="detail-media">
                  <div className="photo-pending-block">
                    <span className="photo-pending">{MISSING_IMAGE_TEXT}</span>
                    <span>{item.title}</span>
                  </div>
                </div>
              )}

              <div>
                <div className="section-label">{branch.label}</div>
                <h1 className="detail-title">{item.title}</h1>
                <p className="detail-lead">{item.lead}</p>
                <AvailabilityTag tag={item.tag} />

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
              <div className="section-label">U ponudi</div>
              <ul className="bullet-grid">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span aria-hidden="true">—</span> {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="fact-card">
              <div className="fact">
                <div className="fact-label">Dostupnost</div>
                <div className="fact-value strong">{item.availability}</div>
              </div>
              <div className="fact bordered">
                <div className="fact-label">{factCopy.settleLabel}</div>
                <div className="fact-value">{item.settle}</div>
              </div>
              <div className="fact bordered">
                <div className="fact-label">Lokacija</div>
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
              <div className="group-kicker">Iz iste djelatnosti</div>
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
                    item={relatedItem}
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
          itemSchema(item, branch),
          breadcrumbSchema([
            { name: "Naslovnica", url: siteUrl },
            {
              name: "Proizvodi i usluge",
              url: `${siteUrl}/proizvodi-i-usluge`,
            },
            { name: item.title, url: itemUrl(item) },
          ]),
        )}
      />
    </>
  );
}
