import { FC } from "react";
import { ContactButtons } from "./contact-buttons";

/** Contact prompt closing the catalogue, inside its cream section */
const CatalogCta: FC = () => (
  <div className="catalog-cta">
    <div>
      <h2>Zanima vas dostupnost?</h2>
      <p>
        Ne nudimo online kupnju. Javite se za informacije o količinama,
        cijenama, preuzimanju ili uslugama na terenu.
      </p>
    </div>
    <ContactButtons />
  </div>
);

export default CatalogCta;
