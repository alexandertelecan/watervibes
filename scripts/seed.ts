import mongoose from "mongoose";

import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { TestimonialModel } from "@/lib/models/Testimonial";
import { seedProducts, seedTestimonials } from "@/lib/seed-data";

const isDryRun = process.argv.slice(2).some((a) => a === "--dry-run");

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error(
      "Error: MONGODB_URI is not set. Add it to .env.local (see .env.example).",
    );
    process.exit(1);
  }

  if (isDryRun) {
    console.log("[dry-run] Would seed:");
    console.log(`  - ${seedProducts.length} products`);
    for (const p of seedProducts) {
      console.log(`      · ${p.slug} — ${p.name} (${p.size}, ${p.color})`);
    }
    console.log(`  - ${seedTestimonials.length} testimonials`);
    for (const t of seedTestimonials) {
      console.log(`      · ${t.author} — ${t.rating}★`);
    }
    console.log("[dry-run] No database writes were performed.");
    return;
  }

  await dbConnect();
  console.log("Connected to MongoDB.");

  const [productsDeleted, testimonialsDeleted] = await Promise.all([
    ProductModel.deleteMany({}),
    TestimonialModel.deleteMany({}),
  ]);
  console.log(
    `Cleared collections — products: ${productsDeleted.deletedCount}, testimonials: ${testimonialsDeleted.deletedCount}.`,
  );

  const products = await ProductModel.insertMany(seedProducts);
  const testimonials = await TestimonialModel.insertMany(seedTestimonials);

  console.log(
    `Inserted ${products.length} products and ${testimonials.length} testimonials.`,
  );
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
