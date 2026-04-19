import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { SIZES } from "@/lib/constants";
import type { Locale, Product } from "@/types/product";

// Single source of truth for every absolute URL, hreflang map, canonical
// link, structured-data NAP, and product SEO copy. Any SEO decision that
// would otherwise be duplicated across generateMetadata callers lives
// here.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000"
);

// Canonical business profile (ENSAMA SRL). Used by Organization /
// LocalBusiness schema, the About page NAP block, and the footer. Change
// here and every surface updates.
export const BUSINESS = {
  legalName: "ENSAMA SRL",
  brand: "WaterVibe",
  streetAddress: "Bulevardul Carol I 90",
  locality: "Câmpina",
  region: "Prahova",
  country: "RO",
  countryName: { ro: "România", en: "Romania" } as const,
  postalCode: "105600",
  phone: "+40726793993",
  phoneDisplay: "+40 726 793 993",
  whatsapp: "+40726793993",
  email: "hello@watervibe.ro",
  areaServed: { ro: "România", en: "Romania" } as const,
  social: {
    facebook:
      "https://www.facebook.com/people/WaterVibe/61588031158675/",
  },
} as const;

// Human-readable W3C locale tags, used for OpenGraph + schema.
export const OG_LOCALES: Record<Locale, string> = {
  ro: "ro_RO",
  en: "en_US",
};

// Narrow a raw route string to a known locale. Falls back to the default
// locale (ro) if the path isn't one of the configured ones.
export function assertLocale(value: string): Locale {
  return (routing.locales as readonly string[]).includes(value)
    ? (value as Locale)
    : (routing.defaultLocale as Locale);
}

// Build an absolute URL from a locale + route fragment. `path` must start
// with `/` and MUST NOT include the locale prefix — e.g. `/catalog` not
// `/ro/catalog`.
export function absoluteUrl(locale: Locale, path: string = ""): string {
  const normalized = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${normalized}`;
}

// Hreflang map for a given route fragment. Every generateMetadata on a
// locale-aware page should spread this into alternates.languages.
// x-default points at the RO version (primary market).
export function hreflangFor(path: string = ""): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const locale of routing.locales) {
    entries[locale] = absoluteUrl(locale as Locale, path);
  }
  entries["x-default"] = absoluteUrl(routing.defaultLocale as Locale, path);
  return entries;
}

// Full alternates block — canonical + hreflang + x-default — used as the
// `alternates` field on every localized page's metadata.
export function alternatesFor(locale: Locale, path: string = "") {
  return {
    canonical: absoluteUrl(locale, path),
    languages: hreflangFor(path),
  };
}

// OpenGraph helper — fills in url + locale + alternateLocale so callers
// only need to pass title + description. Next.js will auto-attach the
// route-level `opengraph-image` so we deliberately omit `images`.
export function openGraphFor(
  locale: Locale,
  path: string,
  {
    title,
    description,
    type = "website",
  }: { title: string; description: string; type?: "website" | "article" },
): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    url: absoluteUrl(locale, path),
    siteName: BUSINESS.brand,
    locale: OG_LOCALES[locale],
    alternateLocale: routing.locales
      .filter((l) => l !== locale)
      .map((l) => OG_LOCALES[l as Locale]),
    type,
  };
}

// Twitter card helper — summary_large_image falls back to OG image via
// Next.js route conventions, so we only set card + text.
export function twitterFor({
  title,
  description,
}: {
  title: string;
  description: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
  };
}

// --------------------------------------------------------------------
// Product-level SEO (auto-generated from the Product document).
// --------------------------------------------------------------------

const SIZE_PERSON_COUNT: Record<string, number> = {
  "2-person": 2,
  "4-person": 4,
  "6+person": 6,
};

type TranslateFn = (key: string) => string;

function productSizeLabel(size: Product["size"], t: TranslateFn): string {
  const entry = SIZES.find((s) => s.value === size);
  return entry ? t(entry.labelKey) : size;
}

// Format the price as a plain "€ 1,234" string for use inside meta
// descriptions. We don't want full Intl.NumberFormat punctuation here
// because it can break description length budgets.
function formatPriceForMeta(price: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Product meta title — keyword-front-loaded, under ~60 chars where the
// name allows. Root layout.tsx appends " · WaterVibe" via title.template,
// so we deliberately leave branding off here.
export function productMetaTitle(
  product: Product,
  locale: Locale,
  t: TranslateFn,
): string {
  const name = product.name[locale];
  const sizeLabel = productSizeLabel(product.size, t);
  const colorLabel = t(`common.colors.${product.color}`);
  if (locale === "ro") {
    return `Jacuzzi ${name}, ${sizeLabel}, ${colorLabel}`;
  }
  return `${name} Jacuzzi, ${sizeLabel}, ${colorLabel}`;
}

// Product meta description — dense with entities (size, capacity, jets,
// price, delivery signal). Caps around 160 chars.
export function productMetaDescription(
  product: Product,
  locale: Locale,
  t: TranslateFn,
): string {
  const name = product.name[locale];
  const count = SIZE_PERSON_COUNT[product.size] ?? product.specs.capacity;
  const jets = product.specs.jets;
  const price = formatPriceForMeta(product.price, locale);
  const colorLabel = t(`common.colors.${product.color}`).toLowerCase();

  if (locale === "ro") {
    return `Jacuzzi ${name} pentru ${count} persoane. ${jets} duze de hidromasaj, finisaj ${colorLabel}. Livrare în România, instalare inclusă. De la ${price}.`;
  }
  return `${name} jacuzzi for ${count}. ${jets} hydromassage jets, ${colorLabel} finish. Delivered across Romania with installation. From ${price}.`;
}

// Alt text for the primary product image. Used by gallery + card so
// search crawlers and screen readers see the same description.
// Takes only the fields it needs so callers can pass raw Mongoose leans
// alongside fully-serialized Product objects.
export type ProductAltSource = {
  name: Product["name"];
  size: Product["size"];
  color: Product["color"];
  specs: Pick<Product["specs"], "capacity">;
};

export function productAltText(
  product: ProductAltSource,
  locale: Locale,
  t: TranslateFn,
  imageIndex: number = 0,
): string {
  const name = product.name[locale];
  const count = SIZE_PERSON_COUNT[product.size] ?? product.specs.capacity;
  const colorLabel = t(`common.colors.${product.color}`).toLowerCase();
  const frame = imageIndex + 1;

  if (locale === "ro") {
    return `Jacuzzi ${name} WaterVibe, ${count} persoane, finisaj ${colorLabel}, imaginea ${frame}`;
  }
  return `WaterVibe ${name} jacuzzi, ${count}-person, ${colorLabel} finish, view ${frame}`;
}

// --------------------------------------------------------------------
// Structured data (JSON-LD).
// --------------------------------------------------------------------

// Organization — appears on every page via the root layout. Establishes
// the brand entity, address, and social profile for Google's Knowledge
// Graph.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: BUSINESS.brand,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image`,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    sameAs: [BUSINESS.social.facebook],
  };
}

// LocalBusiness — mounted on the About + Contact pages. No opening hours
// (we don't operate a walk-in showroom), but we declare national service
// area so the entity qualifies for "jacuzzi [city]" queries.
export function localBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "@id": `${SITE_URL}#localbusiness`,
    name: BUSINESS.brand,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/icon.svg`,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    areaServed: {
      "@type": "Country",
      name: BUSINESS.areaServed[locale],
    },
    sameAs: [BUSINESS.social.facebook],
  };
}

// WebSite — helps Google identify the site name and sitelinks search.
export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: BUSINESS.brand,
    inLanguage: OG_LOCALES[locale].replace("_", "-"),
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}

// Product schema — emitted on the product detail page. Includes an
// Offer in EUR; availability is InStock (we only list models we can
// source).
export function productSchema(product: Product, locale: Locale, t: TranslateFn) {
  const canonical = absoluteUrl(locale, `/catalog/${product.slug}`);
  const images = product.images.length
    ? product.images.map((src) =>
        src.startsWith("http") ? src : `${SITE_URL}${src}`,
      )
    : [`${SITE_URL}/opengraph-image`];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonical}#product`,
    name: product.name[locale],
    description: product.description[locale],
    sku: product.slug,
    image: images,
    brand: { "@type": "Brand", name: BUSINESS.brand },
    category: locale === "ro" ? "Jacuzzi / Hidromasaj" : "Jacuzzi / Hot tub",
    color: t(`common.colors.${product.color}`),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: locale === "ro" ? "Capacitate" : "Capacity",
        value: product.specs.capacity,
        unitText: locale === "ro" ? "persoane" : "persons",
      },
      {
        "@type": "PropertyValue",
        name: locale === "ro" ? "Duze hidromasaj" : "Hydromassage jets",
        value: product.specs.jets,
      },
      {
        "@type": "PropertyValue",
        name: locale === "ro" ? "Dimensiuni" : "Dimensions",
        value: product.specs.dimensions,
      },
      {
        "@type": "PropertyValue",
        name: locale === "ro" ? "Consum" : "Power draw",
        value: product.specs.power,
      },
    ],
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: "EUR",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}#organization` },
      areaServed: {
        "@type": "Country",
        name: BUSINESS.areaServed[locale],
      },
    },
  };
}

// BreadcrumbList — used on catalog + product detail pages.
export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}
