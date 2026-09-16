import { FC } from "react";
import { business } from "../site";

interface ContactButtonsProps {
  variant?: "dark" | "light"; // The background the buttons sit on, as with Breadcrumbs
}

/**
 * Call and WhatsApp buttons, shared by the catalogue header, the catalogue's
 * closing prompt and every detail page. Both buttons are always the same width
 * (see `.button-pair` in globals.css)
 */
export const ContactButtons: FC<ContactButtonsProps> = ({
  variant = "light",
}) => (
  <div className="button-pair">
    <a href={`tel:${business.phone}`} rel="nofollow" className="btn btn-primary">
      Nazovite
    </a>
    <a
      href={business.whatsapp}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={`btn ${variant === "dark" ? "btn-outline" : "btn-ghost"}`}
    >
      WhatsApp
    </a>
  </div>
);
