import type { Metadata } from "next";

import { COLORS, SIZES } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

// Single source of truth for every absolute URL, canonical link,
// structured-data NAP, and product SEO copy.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000"
);

// Canonical business profile (ENSAMA SRL). Used by Organization /
// LocalBusiness schema, the About page NAP block, and the footer.
export const BUSINESS = {
  legalName: "ENSAMA SRL",
  brand: "WaterVibe",
  streetAddress: "Bulevardul Carol I 90",
  locality: "Câmpina",
  region: "Prahova",
  country: "RO",
  countryName: "România",
  postalCode: "105600",
  phone: "+40726793993",
  phoneDisplay: "+40 726 793 993",
  whatsapp: "+40726793993",
  email: "hello@watervibe.ro",
  areaServed: "România",
  social: {
    facebook:
      "https://www.facebook.com/people/WaterVibe/61588031158675/",
  },
} as const;

export const OG_LOCALE = "ro_RO";

export function absoluteUrl(path: string = ""): string {
  const normalized = path === "/" || path === "" ? "" : path;
  return `${SITE_URL}${normalized}`;
}

export function alternatesFor(path: string = "") {
  return {
    canonical: absoluteUrl(path),
  };
}

export function openGraphFor(
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
    url: absoluteUrl(path),
    siteName: BUSINESS.brand,
    locale: OG_LOCALE,
    type,
  };
}

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

function productSizeLabel(size: Product["size"]): string {
  const entry = SIZES.find((s) => s.value === size);
  return entry ? entry.label : size;
}

function productColorLabel(color: Product["color"]): string {
  const entry = COLORS.find((c) => c.value === color);
  return entry ? entry.label : color;
}

export function productMetaTitle(product: Product): string {
  const sizeLabel = productSizeLabel(product.size);
  const colorLabel = productColorLabel(product.color);
  return `Jacuzzi ${product.name}, ${sizeLabel}, ${colorLabel}`;
}

export function productMetaDescription(product: Product): string {
  const count = SIZE_PERSON_COUNT[product.size] ?? product.specs.capacity;
  const jets = product.specs.jets;
  const price = formatPrice(product.price);
  const colorLabel = productColorLabel(product.color).toLowerCase();
  return `Cadă cu hidromasaj ${product.name} pentru ${count} persoane. ${jets} duze de hidromasaj, finisaj ${colorLabel}. Livrare în toată România, instalare inclusă. Preț ${price}.`;
}

export type ProductAltSource = {
  name: Product["name"];
  size: Product["size"];
  color: Product["color"];
  specs: Pick<Product["specs"], "capacity">;
};

export function productAltText(
  product: ProductAltSource,
  imageIndex: number = 0,
): string {
  const count = SIZE_PERSON_COUNT[product.size] ?? product.specs.capacity;
  const colorLabel = productColorLabel(product.color).toLowerCase();
  const frame = imageIndex + 1;
  return `Jacuzzi ${product.name} WaterVibe, ${count} persoane, finisaj ${colorLabel}, imaginea ${frame}`;
}

// --------------------------------------------------------------------
// Structured data (JSON-LD).
// --------------------------------------------------------------------

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

export function localBusinessSchema() {
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
    priceRange: "$$$",
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
      name: BUSINESS.areaServed,
    },
    sameAs: [BUSINESS.social.facebook],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: BUSINESS.brand,
    inLanguage: "ro-RO",
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}

export function productSchema(product: Product) {
  const canonical = absoluteUrl(`/catalog/${product.slug}`);
  const images = product.images.length
    ? product.images.map((src) =>
        src.startsWith("http") ? src : `${SITE_URL}${src}`,
      )
    : [`${SITE_URL}/opengraph-image`];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonical}#product`,
    name: product.name,
    description: product.description,
    sku: product.slug,
    image: images,
    brand: { "@type": "Brand", name: BUSINESS.brand },
    category: "Jacuzzi / Hidromasaj",
    color: productColorLabel(product.color),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Capacitate",
        value: product.specs.capacity,
        unitText: "persoane",
      },
      {
        "@type": "PropertyValue",
        name: "Duze hidromasaj",
        value: product.specs.jets,
      },
      {
        "@type": "PropertyValue",
        name: "Dimensiuni",
        value: product.specs.dimensions,
      },
      {
        "@type": "PropertyValue",
        name: "Consum",
        value: product.specs.power,
      },
    ],
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: "RON",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}#organization` },
      areaServed: {
        "@type": "Country",
        name: BUSINESS.areaServed,
      },
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
