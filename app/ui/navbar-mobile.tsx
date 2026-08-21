import Link from "next/link";
import { FC, RefObject } from "react";
import {
  CATALOG_HREF,
  NAVBAR_SECTIONS,
  PRODUCTS_AND_SERVICES_NAV,
} from "../data";
import { NavbarDesktopProps } from "../types";

type NavbarMobileProps = NavbarDesktopProps & {
  menuRef: RefObject<HTMLDivElement | null>; // Owned by Navbar, which needs to detect clicks outside the menu
  hamburgerRef: RefObject<HTMLButtonElement | null>; // Owned by Navbar, which needs to detect clicks outside the menu
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

/**
 * Narrow-viewport navigation: the hamburger and the panel it opens
 * `.hamburger` is hidden above 768px, so nothing here is reachable there
 *
 * The panel is `position: fixed`, so sitting inside the `<nav>` costs it
 * nothing in layout terms while putting its links in the navigation landmark,
 * where a screen reader expects to find them.
 */
export const NavbarMobile: FC<NavbarMobileProps> = ({
  onCatalog,
  isOpen,
  menuRef,
  hamburgerRef,
  sectionHref,
  onSectionClick,
  onToggle,
  onClose,
}) => (
  <>
    <button
      ref={hamburgerRef}
      type="button"
      className="hamburger"
      onClick={onToggle}
      aria-label={isOpen ? "Zatvori izbornik" : "Otvori izbornik"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div
      ref={menuRef}
      id="mobile-menu"
      className={`mobile-menu ${isOpen ? "open" : ""}`}
    >
      {NAVBAR_SECTIONS.map((section) => (
        <Link
          key={section.id}
          href={sectionHref(section.id)}
          onClick={(event) => onSectionClick(event, section.id)}
        >
          {section.label}
        </Link>
      ))}
      <Link
        href={CATALOG_HREF}
        className={`nav-pill ${onCatalog ? "active" : ""}`}
        aria-current={onCatalog ? "page" : undefined}
        onClick={onClose}
      >
        {PRODUCTS_AND_SERVICES_NAV}
      </Link>
    </div>
  </>
);
