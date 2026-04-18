import { z } from "zod";

const bilingualQuote = z.object({
  en: z.string().trim().min(10, "quote.en must be at least 10 characters").max(500),
  ro: z.string().trim().min(10, "quote.ro must be at least 10 characters").max(500),
});

export const testimonialSchema = z.object({
  author: z.string().trim().min(1).max(80),
  location: z.string().trim().min(1).max(80),
  quote: bilingualQuote,
  rating: z.number().int().min(1).max(5),
  featured: z.boolean(),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
