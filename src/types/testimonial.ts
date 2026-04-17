import type { Bilingual } from "./product";

export type TestimonialRating = 1 | 2 | 3 | 4 | 5;

export type Testimonial = {
  _id: string;
  author: string;
  location: string;
  quote: Bilingual;
  rating: TestimonialRating;
  featured: boolean;
  createdAt: string;
};
