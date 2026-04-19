export type TestimonialRating = 1 | 2 | 3 | 4 | 5;

export type Testimonial = {
  _id: string;
  author: string;
  location: string;
  quote: string;
  rating: TestimonialRating;
  featured: boolean;
  createdAt: string;
};
