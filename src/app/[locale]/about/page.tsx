import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HomeCTA } from "@/components/home/HomeCTA";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { routing } from "@/i18n/routing";

type PageParams = { locale: string };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const path = `/${locale}/about`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        en: `${siteUrl}/en/about`,
        ro: `${siteUrl}/ro/about`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteUrl}${path}`,
      locale,
      type: "website",
      images: ["/og-image.jpg"],
    },
  };
}

// DESIGN.md §5 — About
// Three chapters from the owner's Romanian brief (de ce, cum, ce oferim),
// alternating asymmetric layouts: (1) text-left/image-right, (2) full-width
// prose, (3) image-left/text-right. Hero panel above uses the about/story
// image placeholder with the same cream→primary gradient as the homepage.
export default async function AboutPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <>
      {/* Hero — smaller than homepage (min-h-[50vh]) per spec */}
      <section className="relative isolate flex min-h-[50vh] items-center overflow-hidden bg-foreground text-primary-foreground">
        <div className="absolute inset-0 -z-20">
          <ImagePlaceholder
            role="About / cedar interior"
            className="h-full w-full rounded-none"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-background/10 via-primary/40 to-primary/80"
        />
        <Container as="div" size="wide" className="flex flex-col items-start gap-6 py-24 md:py-32">
          <span className="text-eyebrow text-accent-tint">{t("hero.eyebrow")}</span>
          <h1 className="text-display max-w-4xl text-primary-foreground">
            {t("hero.title")}
          </h1>
          <p className="text-lede max-w-xl text-primary-foreground/85">
            {t("hero.subhead")}
          </p>
        </Container>
      </section>

      {/* Chapter 01 — asymmetric, text left, image right */}
      <section className="py-24 md:py-32">
        <Container as="div" size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-8 lg:col-span-7">
              <FadeIn underline>
                <SectionHeading
                  eyebrow={t("chapter1.eyebrow")}
                  title={t("chapter1.title")}
                />
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="prose-narrow flex flex-col gap-6 text-body text-foreground/85">
                  <p>{t("chapter1.paragraph1")}</p>
                  <p>{t("chapter1.paragraph2")}</p>
                  <p>{t("chapter1.paragraph3")}</p>
                  <p>{t("chapter1.paragraph4")}</p>
                </div>
              </FadeIn>
            </div>
            <FadeIn className="lg:col-span-5 lg:self-center" delay={0.15}>
              <ImagePlaceholder
                role="Story image"
                aspect="aspect-4/5"
                className="rounded-lg shadow-md"
              />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Chapter 02 — full-width prose, generous margins */}
      <section className="bg-surface py-24 md:py-32">
        <Container as="div" size="default">
          <FadeIn underline>
            <SectionHeading
              eyebrow={t("chapter2.eyebrow")}
              title={t("chapter2.title")}
            />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-16">
            <div className="prose-narrow flex flex-col gap-6 text-body text-foreground/85">
              <p>{t("chapter2.paragraph1")}</p>
              <p>{t("chapter2.paragraph2")}</p>
              <p>{t("chapter2.paragraph3")}</p>
              <p>{t("chapter2.paragraph4")}</p>
              <p>{t("chapter2.paragraph5")}</p>
              <p>{t("chapter2.paragraph6")}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Chapter 03 — asymmetric, image left, text right */}
      <section className="py-24 md:py-32">
        <Container as="div" size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-5 lg:self-center lg:order-1">
              <ImagePlaceholder
                role="Product detail"
                aspect="aspect-4/5"
                className="rounded-lg shadow-md"
              />
            </FadeIn>
            <div className="flex flex-col gap-8 lg:col-span-7 lg:order-2">
              <FadeIn underline>
                <SectionHeading
                  eyebrow={t("chapter3.eyebrow")}
                  title={t("chapter3.title")}
                />
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="prose-narrow flex flex-col gap-6 text-body text-foreground/85">
                  <p>{t("chapter3.paragraph1")}</p>
                  <p>{t("chapter3.paragraph2")}</p>
                  <p>{t("chapter3.paragraph3")}</p>
                  <p>{t("chapter3.paragraph4")}</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <HomeCTA />
    </>
  );
}
