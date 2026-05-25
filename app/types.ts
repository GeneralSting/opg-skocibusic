export type AboutImage = {
  src: string;
  alt: string;
};

type ProductStatus = "Dostupno" | "Uskoro";

export type Product = {
  img: string;
  title: string;
  desc: string;
  tag: ProductStatus;
};
