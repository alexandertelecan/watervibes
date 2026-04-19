import { z } from "zod";

const specs = z.object({
  dimensions: z.string().min(1),
  jets: z.number().int().min(0),
  capacity: z.number().int().min(1),
  power: z.string().min(1),
  weightEmpty: z.string().min(1),
  weightFull: z.string().min(1),
});

// `size` is intentionally NOT in this schema — the admin UI lets the operator
// set capacity freely; the server-side `size` bucket is derived from capacity
// at submit time so existing catalog filters keep working.
export const productFormSchema = z.object({
  // Optional in the form because we auto-derive from `name` on submit when
  // empty (e.g. brand-new products). The server validator still requires it.
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case")
    .optional()
    .or(z.literal("")),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  color: z.string().min(1, "Adăugați un nume pentru culoare"),
  colorHex: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Cod hex invalid"),
  price: z.number().positive("Introduceți un preț"),
  images: z
    .array(z.string().min(1))
    .min(1, "Adăugați cel puțin o imagine"),
  specs,
  features: z.array(z.string().min(1)),
  featured: z.boolean(),
  order: z.number().int(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
