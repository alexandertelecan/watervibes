import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

// Robots directive — block admin + API surfaces, expose everything else,
// and advertise the sitemap. Reads NEXT_PUBLIC_SITE_URL via the shared
// SEO helper so dev / prod preview / prod all emit correct absolute
// URLs.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
