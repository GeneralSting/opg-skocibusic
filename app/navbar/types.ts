import type { MouseEvent, RefObject } from "react";
import { NavbarSectionId } from "../types";

/** Everything both layouts need. `NavbarSectionId` stays in app/types.ts because app/data.ts owns the section list */
export type NavbarDesktopProps = {
  onCatalog: boolean; // True while the catalogue is the current page, for the pill's active state
  activeSection: NavbarSectionId | null; // Section filling most of the screen, highlighted in both layouts
  sectionHref: (id: NavbarSectionId) => string; // Anchor on the home page, full path anywhere else
  onSectionClick: (
    event: MouseEvent<HTMLAnchorElement>,
    id: NavbarSectionId,
  ) => void;
};

export type NavbarMobileProps = NavbarDesktopProps & {
  menuRef: RefObject<HTMLDivElement | null>; // Owned by Navbar, which needs to detect clicks outside the menu
  hamburgerRef: RefObject<HTMLButtonElement | null>; // Owned by Navbar, which needs to detect clicks outside the menu
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

/** A section's position in page coordinates, so it survives scrolling */
export type SectionBox = { id: NavbarSectionId; top: number; bottom: number };

/** The strip of page on show: everything below the fixed bar */
export type Band = { top: number; bottom: number; height: number };

export type NavScrollState = {
  activeSection: NavbarSectionId | null; // Section filling most of the screen, or null while the hero leads
  /**
   * Pin the highlight to a section and hold it until scrolling stops. Called
   * when a nav link is clicked: a smooth scroll travels through every section
   * in between, and without this each one would take the highlight for a few
   * frames on the way past, flickering the underline through the whole bar
   */
  lockTo: (id: NavbarSectionId) => void;
};
