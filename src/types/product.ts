import type { ProductColor, ProductSize } from "@/lib/constants";

export { PRODUCT_SIZES } from "@/lib/constants";
export type { ProductColor, ProductSize } from "@/lib/constants";

export type Locale = "en" | "ro";
export type Bilingual = { en: string; ro: string };
export type BilingualList = { en: string[]; ro: string[] };

export type ProductSpecs = {
  dimensions: string;
  jets: number;
  capacity: number;
  power: string;
  weightEmpty: string;
  weightFull: string;
};

export type Product = {
  _id: string;
  slug: string;
  name: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  size: ProductSize;
  color: ProductColor;
  colorHex: string;
  price: number;
  images: string[];
  specs: ProductSpecs;
  features: BilingualList;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};
