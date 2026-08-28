import { FC } from "react";
import { business } from "../site";

/** Green contact band closing the catalogue pages. */
const CtaBand: FC = () => (
  <section className="cta-band">
    <div className="container cta-band-inner">
      <div>
        <h2>Zanima vas dostupnost?</h2>
        <p>
          Ne nudimo online kupnju. Javite se za količine, cijene, preuzimanje
          ili izlazak na terenu.
        </p>
      </div>
      <div className="cta-band-actions">
        <a
          href={`tel:${business.phone}`}
          rel="nofollow"
          className="btn btn-on-green"
        >
          {business.phoneDisplay}
        </a>
        <a
          href={business.whatsapp}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="btn btn-on-green-outline"
        >
          WhatsApp
        </a>
      </div>
    </div>
  </section>
);

export default CtaBand;
