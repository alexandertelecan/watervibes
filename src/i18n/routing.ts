import { defineRouting } from "next-intl/routing";

// Romanian is the primary market — `/` resolves to `/ro`, and `hreflang
// x-default` points at the RO tree (see `src/lib/seo.ts`). English is kept
// for non-Romanian-speaking visitors inside Romania.
export const routing = defineRouting({
  locales: ["ro", "en"],
  defaultLocale: "ro",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
