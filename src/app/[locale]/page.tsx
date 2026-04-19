import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BrandStory } from "@/components/home/BrandStory";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { HomeCTA } from "@/components/home/HomeCTA";
import { Testimonials } from "@/components/home/Testimonials";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  alternatesFor,
  assertLocale,
  localBusinessSchema,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta.home" });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: alternatesFor(locale, ""),
    openGraph: openGraphFor(locale, "", { title, description }),
    twitter: twitterFor({ title, description }),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
      <HomeCTA />
      {/* LocalBusiness — declares ENSAMA SRL's address + national service
          area so the site shows up for "jacuzzi România / Câmpina /
          Prahova" local queries. */}
      <JsonLd data={localBusinessSchema(locale)} />
    </>
  );
}
