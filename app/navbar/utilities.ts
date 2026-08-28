import { HOME_SECTION_IDS } from "../data";
import { NavbarSectionId } from "../types";
import {
  AT_TOP_CLASS,
  NAV_HEIGHT,
  SOLID_ABOVE,
  TRANSPARENT_BELOW,
} from "./data";
import { Band, SectionBox } from "./types";

/** The hero has no nav item of its own, so it leads by clearing the highlight */
export const highlightFor = (id: NavbarSectionId | null) =>
  id === HOME_SECTION_IDS[0] ? null : id;

/**
 * Reads every section's box. The only function here that touches layout, which
 * is why it is called on mount and resize rather than while scrolling
 */
export function measureSections(): SectionBox[] {
  return HOME_SECTION_IDS.flatMap((id) => {
    const element = document.getElementById(id);
    if (!element) return [];

    const rect = element.getBoundingClientRect();
    return [
      {
        id,
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
      },
    ];
  });
}

export function visibleBand(scrollY: number): Band {
  const top = scrollY + NAV_HEIGHT;
  const bottom = scrollY + window.innerHeight;
  return { top, bottom, height: bottom - top };
}

/**
 * How much of the band this section covers, 0 to 1.
 *
 * Share of the *band*, not of the section: `IntersectionObserver`'s ratio is a
 * fraction of the target, which would penalise "Djelatnosti" for being 3.2
 * viewports tall while a short section scores full marks just by fitting. Here
 * every section is measured against the same denominator
 */
export function shareOfBand(box: SectionBox, band: Band): number {
  const overlap =
    Math.min(box.bottom, band.bottom) - Math.max(box.top, band.top);
  return Math.max(0, overlap) / band.height;
}

/** The section covering most of the band. Ties go to the one higher up the page */
export function leadingSection(boxes: SectionBox[], band: Band) {
  let leader: { id: NavbarSectionId; share: number } | null = null;

  for (const box of boxes) {
    const share = shareOfBand(box, band);
    if (share > (leader?.share ?? 0)) leader = { id: box.id, share };
  }

  return leader;
}

/** What the section holding the highlight covers right now, 0 if it has gone */
export function shareOfSection(
  boxes: SectionBox[],
  id: NavbarSectionId | null,
  band: Band,
): number {
  const box = boxes.find((candidate) => candidate.id === id);
  return box ? shareOfBand(box, band) : 0;
}

/**
 * Hysteresis: between the two marks the bar keeps whatever it already was.
 *
 * The current value is read back off <html> rather than held in state. The
 * inline script in app/layout.tsx sets it before the first paint, so React
 * never owns it — and the bar changing no longer re-renders the navbar
 */
export function syncBar(scrollY: number) {
  const element = document.documentElement;
  const wasAtTop = element.classList.contains(AT_TOP_CLASS);
  const atTop =
    scrollY <= TRANSPARENT_BELOW
      ? true
      : scrollY >= SOLID_ABOVE
        ? false
        : wasAtTop;

  element.classList.toggle(AT_TOP_CLASS, atTop);
}

/** Leaving the home page: the bar is solid everywhere else */
export const clearBar = () =>
  document.documentElement.classList.remove(AT_TOP_CLASS);
