import type { MetadataRoute } from "next";

import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { absoluteUrl } from "@/lib/seo";

const STATIC_PATHS = ["", "/catalog", "/about", "/contact"] as const;

function staticPriority(path: string): number {
  if (path === "") return 1;
  if (path === "/catalog") return 0.9;
  return 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: (path === "" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: staticPriority(path),
  }));

  try {
    await dbConnect();
    const docs = await ProductModel.find().select("slug updatedAt").lean();
    const productEntries: MetadataRoute.Sitemap = docs.map((doc) => ({
      url: absoluteUrl(`/catalog/${doc.slug}`),
      lastModified: doc.updatedAt instanceof Date ? doc.updatedAt : now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
    return [...staticEntries, ...productEntries];
  } catch {
    return staticEntries;
  }
}

export const revalidate = 3600;
