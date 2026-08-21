import Link from "next/link";
import { FC } from "react";
import {
  CATALOG_HREF,
  NAVBAR_SECTIONS,
  PRODUCTS_AND_SERVICES_NAV,
} from "../data";
import { NavbarDesktopProps } from "../types";

/**
 * Wide-viewport navigation: the section links laid out in the bar itself
 * `.nav-links` hides this below 768px, where NavbarMobile takes over
 */
export const NavbarDesktop: FC<NavbarDesktopProps> = ({
  onCatalog,
  sectionHref,
  onSectionClick,
}) => (
  <ul className="nav-links">
    {NAVBAR_SECTIONS.map((section) => (
      <li key={section.id}>
        <Link
          href={sectionHref(section.id)}
          onClick={(event) => onSectionClick(event, section.id)}
        >
          {section.label}
        </Link>
      </li>
    ))}
    <li>
      <Link
        href={CATALOG_HREF}
        className={`nav-pill ${onCatalog ? "active" : ""}`}
        aria-current={onCatalog ? "page" : undefined}
      >
        {PRODUCTS_AND_SERVICES_NAV}
      </Link>
    </li>
  </ul>
);
