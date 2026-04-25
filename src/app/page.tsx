import type { Metadata } from "next";

import { BrandStory } from "@/components/home/BrandStory";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { HomeCTA } from "@/components/home/HomeCTA";
import { Testimonials } from "@/components/home/Testimonials";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  alternatesFor,
  localBusinessSchema,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";

const TITLE = "Jacuzzi și căzi cu hidromasaj · Livrare în toată România | WaterVibe";
const DESCRIPTION =
  "Jacuzzi cu hidromasaj pentru două, patru sau șase persoane. Modele de interior și exterior. Livrare în toată România, consultanță, preț ferm și pași clari de instalare.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor(""),
  openGraph: openGraphFor("", { title: TITLE, description: DESCRIPTION }),
  twitter: twitterFor({ title: TITLE, description: DESCRIPTION }),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BrandStory />
      <HomeCTA />
      <JsonLd data={localBusinessSchema()} />
    </>
  );
}
