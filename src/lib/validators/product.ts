import { z } from "zod";

import { PRODUCT_SIZES } from "@/lib/constants";

const specsSchema = z.object({
  lengthMm: z.number().int().positive(),
  widthMm: z.number().int().positive(),
  heightMm: z.number().int().positive(),
  waterVolumeL: z.number().int().positive(),
  capacity: z.number().int().min(1),
  loungeSeats: z.number().int().min(0),
  seatedSeats: z.number().int().min(0),
  power: z.string().min(1),
  material: z.string().min(1),
});

const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "colorHex must be #RRGGBB");

const slug = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case");

export const productSchema = z.object({
  slug,
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  size: z.enum(PRODUCT_SIZES as unknown as [string, ...string[]]),
  color: z.string().min(1),
  colorHex: hexColor,
  price: z.number().positive(),
  images: z.array(z.string().min(1)).min(1),
  specs: specsSchema,
  features: z.array(z.string().min(1)).default([]),
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
