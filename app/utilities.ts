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
    const item = branch.items.find((i) => i.id === id);
    if (item) return { branch, item };
  }
  return null;
}
