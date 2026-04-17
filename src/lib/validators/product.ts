import { z } from "zod";

import { PRODUCT_SIZES } from "@/lib/constants";

const bilingual = z.object({
  en: z.string().min(1),
  ro: z.string().min(1),
});

const bilingualList = z.object({
  en: z.array(z.string().min(1)).default([]),
  ro: z.array(z.string().min(1)).default([]),
});

const specsSchema = z.object({
  dimensions: z.string().min(1),
  jets: z.number().int().min(0),
  capacity: z.number().int().min(1),
  power: z.string().min(1),
  weightEmpty: z.string().min(1),
  weightFull: z.string().min(1),
});

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "colorHex must be #RRGGBB");

const slug = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case");

export const productSchema = z.object({
  slug,
  name: bilingual,
  tagline: bilingual,
  description: bilingual,
  size: z.enum(PRODUCT_SIZES as unknown as [string, ...string[]]),
  color: z.string().min(1),
  colorHex: hexColor,
  price: z.number().positive(),
  images: z.array(z.url()).min(1),
  specs: specsSchema,
  features: bilingualList,
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export type ProductInput = z.infer<typeof productSchema>;

export const productUpdateSchema = productSchema.partial();
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;

export const productQuerySchema = z.object({
  size: z.string().optional(),
  color: z.string().optional(),
});

export type ProductQueryInput = z.infer<typeof productQuerySchema>;
