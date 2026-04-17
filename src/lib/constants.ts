export const SIZES = [
  { value: "2-person", labelKey: "common.sizes.2-person" },
  { value: "4-person", labelKey: "common.sizes.4-person" },
  { value: "6+person", labelKey: "common.sizes.6+person" },
] as const;

export type ProductSize = (typeof SIZES)[number]["value"];

export const PRODUCT_SIZES = SIZES.map((s) => s.value) as readonly ProductSize[];

export const COLORS = [
  { value: "white", hex: "#FFFFFF", labelKey: "common.colors.white" },
  { value: "graphite", hex: "#2E2E2E", labelKey: "common.colors.graphite" },
  { value: "teak", hex: "#8B5E3C", labelKey: "common.colors.teak" },
  { value: "pearl", hex: "#EDE8DF", labelKey: "common.colors.pearl" },
  { value: "midnight", hex: "#0E1A24", labelKey: "common.colors.midnight" },
] as const;

export type ProductColor = (typeof COLORS)[number]["value"];

export const PRODUCT_COLORS = COLORS.map((c) => c.value) as readonly ProductColor[];

export function isProductSize(value: string): value is ProductSize {
  return (PRODUCT_SIZES as readonly string[]).includes(value);
}

export function isProductColor(value: string): value is ProductColor {
  return (PRODUCT_COLORS as readonly string[]).includes(value);
}

// Server-only. Never import from a client component — CONTACT_EMAIL is not a
// NEXT_PUBLIC_ env var, so in a client bundle process.env.CONTACT_EMAIL is
// inlined as undefined by Next.js and this helper will throw.
export function getContactEmail(): string {
  const value = process.env.CONTACT_EMAIL;
  if (!value) {
    throw new Error("CONTACT_EMAIL is not set");
  }
  return value;
}
