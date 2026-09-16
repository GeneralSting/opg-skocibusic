import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "./navbar";
import Footer from "./ui/footer";
import { CATALOG_HREF } from "./data";

export const metadata: Metadata = {
  title: "Stranica nije pronađena",
};

/**
 * Any URL the site does not have, including catalogue slugs that are not in
 * app/data.ts. Next marks it `noindex` and answers with a 404 status on its own
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="not-found">
          <div className="not-found-content">
            <div className="section-label">Greška 404</div>
            <h1 className="detail-title">Stranica nije pronađena</h1>
            <p className="detail-lead">
              Stranica koju tražite ne postoji ili je premještena. Pogledajte
              našu ponudu ili se vratite na naslovnicu.
            </p>
            <div className="button-pair">
              <Link href={CATALOG_HREF} className="btn btn-primary">
                Proizvodi i usluge
              </Link>
              <Link href="/" className="btn btn-ghost">
                Naslovnica
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
