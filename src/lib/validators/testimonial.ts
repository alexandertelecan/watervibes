import { z } from "zod";

export const testimonialSchema = z.object({
  author: z.string().trim().min(1).max(80),
  location: z.string().trim().min(1).max(80),
  quote: z.string().trim().min(10, "quote must be at least 10 characters").max(500),
  rating: z.number().int().min(1).max(5),
  featured: z.boolean(),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
