export type Locale = "en" | "ro";
export type Bilingual = { en: string; ro: string };
export type BilingualList = { en: string[]; ro: string[] };

export const PRODUCT_SIZES = ["2-person", "4-person", "6+person"] as const;
export type ProductSize = (typeof PRODUCT_SIZES)[number];

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
  color: string;
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
