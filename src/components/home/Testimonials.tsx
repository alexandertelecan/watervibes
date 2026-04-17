import { getLocale, getTranslations } from "next-intl/server";

import { TestimonialsClient } from "@/components/home/TestimonialsClient";
import type { TestimonialItem } from "@/components/home/TestimonialsClient";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { routing } from "@/i18n/routing";
import { dbConnect } from "@/lib/db";
import { TestimonialModel } from "@/lib/models/Testimonial";
import type { Locale } from "@/types/product";

function assertLocale(value: string): Locale {
  return (routing.locales as readonly string[]).includes(value)
    ? (value as Locale)
    : (routing.defaultLocale as Locale);
}

// DESIGN.md §5 — Testimonials
// One hero quote at a time, large Fraunces italic, with an oversize
// terracotta quotation mark hanging in the left margin. Filmstrip of the
// rest auto-advances every 10s (paused on hover / out-of-viewport / reduced
// motion) — that logic lives in TestimonialsClient.
// Background is --surface with a grain overlay per DESIGN.md §3.3.
export async function Testimonials() {
  await dbConnect();
  const docs = await TestimonialModel.find({ featured: true }).limit(6).lean();

  if (docs.length === 0) {
    return null;
  }

  const locale = assertLocale(await getLocale());
  const t = await getTranslations("testimonials");

  const items: TestimonialItem[] = docs.map((doc) => ({
    id: String(doc._id),
    quote: doc.quote[locale],
    author: doc.author,
    location: doc.location,
    rating: doc.rating,
  }));

  return (
    <section className="grain-overlay relative bg-surface py-24 md:py-32">
      <Container as="div">
        <FadeIn underline>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </FadeIn>
        <FadeIn delay={0.1} className="mt-16">
          <TestimonialsClient items={items} />
        </FadeIn>
      </Container>
    </section>
  );
}
