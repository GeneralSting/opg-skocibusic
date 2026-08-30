import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "../../navbar";
import Footer from "../../ui/footer";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { ItemCard, AvailabilityTag, GRID_CARD_SIZES } from "../../ui/item-card";
import { JsonLd } from "../../ui/json-ld";
import { allItems, MISSING_IMAGE_TEXT } from "../../data";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = findItem((await params).id);
  if (!found) return {};

  const { item } = found;
  const path = itemPath(item);

  return {
    title: item.seoTitle,
    description: item.lead,
    alternates: { canonical: path },
    ...socialMeta({ title: item.seoTitle, description: item.lead, path }),
  };
}

export default async function DetaljiProizvoda({ params }: Props) {
  const found = findItem((await params).id);
  if (!found) notFound();

  const { branch, item } = found;
  const related = branch.items.filter((i) => i.id !== item.id);

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
              <div className="detail-media">
                {item.img ? (
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    quality={70}
                    sizes="(min-width: 1148px) 518px, (min-width: 861px) calc((100vw - 112px) / 2), calc(100vw - 48px)"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="photo-pending-block">
                    <span className="photo-pending">{MISSING_IMAGE_TEXT}</span>
                    <span>{item.title}</span>
                  </div>
                )}
              </div>

              <div>
                <div className="section-label">{branch.kicker}</div>
                <h1 className="detail-title">{item.title}</h1>
                <p className="detail-lead">{item.lead}</p>
                <AvailabilityTag tag={item.tag} />

                <div className="detail-actions">
                  <a
                    href={`tel:${business.phone}`}
                    rel="nofollow"
                    className="btn btn-primary"
                  >
                    Pozovite nas
                  </a>
                  <a
                    href={business.whatsapp}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    WhatsApp
                  </a>
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
                <div className="fact-label">Preuzimanje i obračun</div>
                <div className="fact-value">{item.settle}</div>
              </div>
              <div className="fact bordered">
                <div className="fact-label">Lokacija</div>
                <div className="fact-value">
                  {business.locality}, {business.region}
                </div>
              </div>
              <p className="fact-note">
                Ne nudimo online kupnju. Dostupnost i termin dogovaraju se
                telefonom.
              </p>
            </aside>
          </div>
        </section>

        {related.length > 0 && (
          <section className="related">
            <div className="container">
              <div className="group-divider">
                <span className="rule" />
                <div className="group-heading">
                  <div className="group-kicker">Iz iste djelatnosti</div>
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
