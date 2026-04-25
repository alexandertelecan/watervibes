import { z } from "zod";

const specs = z.object({
  lengthMm: z.number().int().positive("Introduceți lungimea în mm"),
  widthMm: z.number().int().positive("Introduceți lățimea în mm"),
  heightMm: z.number().int().positive("Introduceți înălțimea în mm"),
  waterVolumeL: z.number().int().positive("Introduceți volumul de apă"),
  capacity: z.number().int().min(1, "Cel puțin o persoană"),
  loungeSeats: z.number().int().min(0),
  seatedSeats: z.number().int().min(0),
  power: z.string().min(1, "Adăugați alimentarea electrică"),
  material: z.string().min(1, "Adăugați materialul cuvei"),
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
  name: z.string().min(1, "Adăugați un nume"),
  tagline: z.string().min(1, "Adăugați un slogan"),
  description: z.string().min(1, "Adăugați o descriere"),
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
