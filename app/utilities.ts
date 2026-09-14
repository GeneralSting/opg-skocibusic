import { branches } from "./data";
import { Branch, CatalogItem } from "./types";

// Route for one product or service
export const itemPath = (item: Pick<CatalogItem, "id">) =>
  `/proizvodi-i-usluge/${item.id}`;

// Item with this slug and the branch it belongs to, or null if there is none
export function findItem(
  id: string,
): { branch: Branch; item: CatalogItem } | null {
  for (const branch of branches) {
    const item = branch.items.find((branchItem) => branchItem.id === id);
    if (item) return { branch, item };
  }
  return null;
}

/*
 * `text` cut back to the last whole word within `maxLength` characters, with
 * "..." after it. Punctuation left dangling at the cut goes, so it never reads
 * "govedina,...". Text that already fits comes back untouched
 */
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;

  // One character past the limit, so a word ending exactly on it still counts as whole
  const candidate = text.slice(0, maxLength + 1);
  const lastSpace = candidate.lastIndexOf(" ");
  const wholeWords =
    lastSpace > 0 ? candidate.slice(0, lastSpace) : text.slice(0, maxLength);

  return `${wholeWords.replace(/[\s.,;:!?—–-]+$/, "")}...`;
}
