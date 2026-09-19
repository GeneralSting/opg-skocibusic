import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "./site";
import { catalogItems } from "./data";
import { itemPath } from "./utilities";
import type {
  CatalogItem,
  GalleryImage,
  GalleryMedia,
  GalleryVideo,
} from "./types";

const isImage = (media: GalleryMedia): media is GalleryImage =>
  media.type === "image";

const isVideo = (media: GalleryMedia): media is GalleryVideo =>
  media.type === "video";

/**
 * One entry per catalogue item, carrying its gallery so Google Images and video
 * search can find the photos and clips, which sit in a carousel that only loads
 * past the first slide once the visitor uses it
 */
const itemEntry = (
  item: CatalogItem,
  lastModified: Date,
): MetadataRoute.Sitemap[number] => {
  // Widened from the "photo first" tuple, whose filter() overloads drop the type guards
  const media: GalleryMedia[] = item.gallery;

  return {
    url: absoluteUrl(itemPath(item)),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
    images: media.filter(isImage).map((image) => absoluteUrl(image.src)),
    videos: media.filter(isVideo).map((video) => ({
      title: item.title,
      description: item.seoDescription,
      thumbnail_loc: absoluteUrl(video.poster),
      content_loc: absoluteUrl(video.src),
    })),
  };
};

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
      url: absoluteUrl("/proizvodi-i-usluge"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...catalogItems.map((item) => itemEntry(item, lastModified)),
  ];
}
