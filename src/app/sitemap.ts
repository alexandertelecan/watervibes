import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";

const STATIC_PATHS = ["", "/catalog", "/about", "/contact"] as const;

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      STATIC_PATHS.map((path) => ({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
      })),
  );

  let productSlugs: string[] = [];
  try {
    await dbConnect();
    const docs = await ProductModel.find().select("slug updatedAt").lean();
    productSlugs = docs.map((d) => d.slug);
    const productEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
      (locale) =>
        docs.map((doc) => ({
          url: `${base}/${locale}/catalog/${doc.slug}`,
          lastModified:
            doc.updatedAt instanceof Date ? doc.updatedAt : now,
          changeFrequency: "monthly",
          priority: 0.8,
        })),
    );
    return [...staticEntries, ...productEntries];
  } catch {
    void productSlugs;
    return staticEntries;
  }
}
