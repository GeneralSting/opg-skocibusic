export type AboutImage = {
  src: string;
  alt: string;
};

/** "Po narudžbi": offered only once the customer agrees it with us in advance */
export type Availability = "Dostupno" | "Po narudžbi" | "Uskoro";

export type GalleryImage = {
  type: "image";
  src: string;
  alt?: string; // Falls back to the item title
};

export type GalleryVideo = {
  type: "video";
  src: string; // mp4 (H.264) plays in every browser
  poster: string; // Image shown on the thumbnail and before playback starts
};

export type GalleryMedia = GalleryImage | GalleryVideo;

// Single product or service, with its own detail page
export type CatalogItem = {
  id: string; // URL slug, used as the detail route segment
  title: string;
  /**
   * Title for `<title>`, Open Graph and the generated share card — longer and
   * more descriptive than the on-page `title`, which stays the plain `<h1>`.
   * The brand suffix is appended by the metadata template, so keep this under
   * ~43 characters
   */
  seoTitle: string;
  tag: Availability;
  /**
   * Photos and videos on the detail page. The first entry must be a photo: it
   * is also the card image, the share card photo and the structured data image.
   * An empty list renders a "Fotografija dolazi" placeholder
   */
  gallery: [] | [GalleryImage, ...GalleryMedia[]];
  lead: string;
  bullets: string[];
  availability: string;
  settle: string;
};

/** One line of business, grouping the items it offers. */
export type Branch = {
  id: string; // Stable key for the branch; also the home page's modal target
  label: string; // Short name for share cards and structured data, e.g. "Stočarstvo"
  /**
   * Whether the items here are goods or work performed. Decides between
   * schema.org Product and Service in the structured data.
   */
  kind: "product" | "service";
  num: string;
  title: string;
  desc: string;
  img: string;
  items: CatalogItem[];
};

export type NavbarSectionId = "naslovna" | "o-nama" | "djelatnosti" | "kontakt";
