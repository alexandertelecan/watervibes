import { getTranslations } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeading } from "@/components/shared/SectionHeading";

// DESIGN.md §5 + §7 — BrandStory
// Uses the short Romanian summary from the owner's brief as authoritative
// copy (EN is a faithful translation — see messages/*.json). The section
// sits between FeaturedProducts and Testimonials on the homepage.
// Layout: asymmetric per the Aesop/Goop borrow. Left rail (cols 1–5) gets
// the SectionHeading; right rail (cols 6–12) holds the prose in a
// 68-char measure. The subtle cream→surface gradient echoes the Oura
// borrow (§7) so sections bleed into each other.
export async function BrandStory() {
  const t = await getTranslations("brandStory");

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-surface/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-surface/60 to-transparent"
      />
      <Container as="div">
        <FadeIn underline>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-lede text-foreground">{t("pullquote")}</p>
            </div>
            <div className="md:col-span-7">
              <div className="prose-narrow flex flex-col gap-6 text-body text-foreground/85">
                <p>{t("paragraph1")}</p>
                <p>{t("paragraph2")}</p>
                <p>{t("paragraph3")}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
