import type { MetadataRoute } from "next";
import { siteUrl } from "./site";
import { allItems } from "./data";
import { itemPath } from "./utilities";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/proizvodi-i-usluge`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...allItems.map((item) => ({
      url: `${siteUrl}${itemPath(item)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
