import { z } from "zod";

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(120),
  phone: optionalTrimmed(40),
  message: z.string().trim().min(10).max(2000),
  productSlug: optionalTrimmed(120),
});

export type ContactPayload = z.infer<typeof contactSchema>;
