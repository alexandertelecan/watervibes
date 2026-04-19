import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const TestimonialSchema = new Schema(
  {
    author: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "rating must be an integer between 1 and 5",
      },
    },
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export type TestimonialDoc = InferSchemaType<typeof TestimonialSchema>;

export const TestimonialModel: Model<TestimonialDoc> =
  (mongoose.models.Testimonial as Model<TestimonialDoc>) ??
  mongoose.model<TestimonialDoc>("Testimonial", TestimonialSchema);
