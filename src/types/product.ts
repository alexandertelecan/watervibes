import type { ProductColor, ProductSize } from "@/lib/constants";

export { PRODUCT_SIZES } from "@/lib/constants";
export type { ProductColor, ProductSize } from "@/lib/constants";

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
  name: string;
  tagline: string;
  description: string;
  size: ProductSize;
  color: ProductColor;
  colorHex: string;
  price: number;
  images: string[];
  specs: ProductSpecs;
  features: string[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};
