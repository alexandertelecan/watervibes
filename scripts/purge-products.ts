import mongoose from "mongoose";

import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";

const isDryRun = process.argv.slice(2).some((a) => a === "--dry-run");

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error(
      "Error: MONGODB_URI is not set. Add it to .env.local (see .env.example).",
    );
    process.exit(1);
  }

  if (isDryRun) {
    await dbConnect();
    const count = await ProductModel.countDocuments({});
    console.log(`[dry-run] Would delete ${count} products.`);
    return;
  }

  await dbConnect();
  console.log("Connected to MongoDB.");

  const { deletedCount } = await ProductModel.deleteMany({});
  console.log(`Deleted ${deletedCount} products.`);
}

main()
  .catch((err) => {
    console.error("Purge failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
