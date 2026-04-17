import mongoose from "mongoose";

import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { TestimonialModel } from "@/lib/models/Testimonial";
import { seedProducts, seedTestimonials } from "@/lib/seed-data";

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error(
      "Error: MONGODB_URI is not set. Add it to .env.local (see .env.example).",
    );
    process.exit(1);
  }

  await dbConnect();
  console.log("Connected to MongoDB.");

  await Promise.all([
    ProductModel.deleteMany({}),
    TestimonialModel.deleteMany({}),
  ]);
  console.log("Cleared products and testimonials collections.");

  const products = await ProductModel.insertMany(seedProducts);
  const testimonials = await TestimonialModel.insertMany(seedTestimonials);

  console.log(
    `Seeded ${products.length} products and ${testimonials.length} testimonials.`,
  );

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
