export const CATALOG_SORT_VALUES = [
  "featured",
  "priceAsc",
  "priceDesc",
  "newest",
] as const;

export type CatalogSort = (typeof CATALOG_SORT_VALUES)[number];

export const DEFAULT_SORT: CatalogSort = "featured";

export const SORT_LABELS: Record<CatalogSort, string> = {
  featured: "Recomandate",
  priceAsc: "Preț crescător",
  priceDesc: "Preț descrescător",
  newest: "Cele mai noi",
};
