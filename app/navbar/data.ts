export const NAV_HEIGHT = 70; // Height of the fixed navbar

export const MOBILE_MEDIA_QUERY = "(max-width: 768px)";

/**
 * How far ahead a section must be before it takes over. Without it the two
 * sections sharing the screen sit within a point or two of each other at the
 * handover and trackpad jitter flips the highlight back and forth - about 3%
 * of the page is that close
 */
export const SWITCH_MARGIN = 0.08;

/** Dead zone for the transparent-to-solid switch, so it cannot pulse either */
export const SOLID_ABOVE = 72;
export const TRANSPARENT_BELOW = 40;

/** Quiet time after the last scroll event that counts as "the scroll finished" */
export const SETTLE_MS = 140;

/** Class on <html> that makes the bar transparent. See app/globals.css */
export const AT_TOP_CLASS = "nav-at-top";
