import { z } from "zod";

import { PRODUCT_SIZES } from "@/lib/constants";

const bilingual = z.object({
  en: z.string().min(1),
  ro: z.string().min(1),
});

const specs = z.object({
  dimensions: z.string().min(1),
  jets: z.number().int().min(0),
  capacity: z.number().int().min(1),
  power: z.string().min(1),
  weightEmpty: z.string().min(1),
  weightFull: z.string().min(1),
});

export const productFormSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  name: bilingual,
  tagline: bilingual,
  description: bilingual,
  size: z.enum(PRODUCT_SIZES as unknown as [string, ...string[]]),
  color: z.string().min(1),
  colorHex: z.string().regex(/^#[0-9a-fA-F]{6}$/, "colorHex must be #RRGGBB"),
  price: z.number().positive(),
  images: z.array(z.url()).min(1),
  specs,
  features: z.object({
    en: z.array(z.string()),
    ro: z.array(z.string()),
  }),
  featured: z.boolean(),
  order: z.number().int(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
