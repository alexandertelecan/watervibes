import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { absoluteUrl, hreflangFor } from "@/lib/seo";
import type { Locale } from "@/types/product";

// Static + dynamic sitemap. Every entry carries per-locale `alternates`
// so Google treats the RO + EN variants as the same resource in two
// languages (plus the canonical x-default). Priority is highest on the
// home + catalog surfaces; product pages follow with monthly change.

const STATIC_PATHS = ["", "/catalog", "/about", "/contact"] as const;

function staticPriority(path: string): number {
  if (path === "") return 1;
  if (path === "/catalog") return 0.9;
  return 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale as Locale, path),
      lastModified: now,
      changeFrequency: (path === "" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: staticPriority(path),
      alternates: {
        languages: hreflangFor(path),
      },
    })),
  );

  try {
    await dbConnect();
    const docs = await ProductModel.find().select("slug updatedAt").lean();
    const productEntries: MetadataRoute.Sitemap = docs.flatMap((doc) => {
      const path = `/catalog/${doc.slug}`;
      const lastModified =
        doc.updatedAt instanceof Date ? doc.updatedAt : now;
      const alternates = { languages: hreflangFor(path) };

      return routing.locales.map((locale) => ({
        url: absoluteUrl(locale as Locale, path),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates,
      }));
    });
    return [...staticEntries, ...productEntries];
  } catch {
    // DB unavailable during prerender — still emit the static surfaces.
    return staticEntries;
  }
}

export const revalidate = 3600;
