import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HomeCTA } from "@/components/home/HomeCTA";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

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

// DESIGN.md §5 — About page: "editorial contents"
// Three chapters staged as a magazine contents spread instead of a linear
// stack. Hero is light (not the homepage dark slab) with an asymmetric
// title/image and a 3-card chapter index at the bottom acting as a table
// of contents (anchor links to #chapter-01..03). Each chapter then owns
// a distinct register:
//   01 — Why: asymmetric text column + sticky side image, opening with a
//        standfirst paragraph treatment.
//   02 — How: on --surface, a five-row numbered timeline (craft notes)
//        separated by hairlines — turns a 6-paragraph block into rhythm.
//   03 — What: inverted asymmetric (image-left, text-right) with the same
//        standfirst + body pattern as ch. 01 for visual rhyme.
// HomeCTA closes, unchanged.
export default async function AboutPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  const chapters = [
    {
      id: "chapter-01",
      ordinal: "01",
      eyebrow: t("chapter1.eyebrow"),
      title: t("chapter1.title"),
    },
    {
      id: "chapter-02",
      ordinal: "02",
      eyebrow: t("chapter2.eyebrow"),
      title: t("chapter2.title"),
    },
    {
      id: "chapter-03",
      ordinal: "03",
      eyebrow: t("chapter3.eyebrow"),
      title: t("chapter3.title"),
    },
  ];

  const chapter2Notes = [
    t("chapter2.paragraph2"),
    t("chapter2.paragraph3"),
    t("chapter2.paragraph4"),
    t("chapter2.paragraph5"),
    t("chapter2.paragraph6"),
  ];

  return (
    <>
      {/* ================================================================
          HERO — editorial contents spread
          ================================================================ */}
      <section className="relative isolate overflow-hidden bg-background">
        {/* Decorative concentric water-ripple motif — top-right, very quiet */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -right-24 -top-24 h-112 w-md text-accent/10"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="200" cy="200" r="60" />
            <circle cx="200" cy="200" r="105" />
            <circle cx="200" cy="200" r="150" />
            <circle cx="200" cy="200" r="195" />
          </g>
        </svg>

        <Container as="div" size="wide" className="relative py-20 md:py-28 lg:py-32">
          {/* Serial / marginalia row */}
          <FadeIn>
            <div className="flex flex-wrap items-center gap-3 text-eyebrow">
              <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
              <span className="text-accent">MMXXIV</span>
              <span aria-hidden="true" className="h-px w-10 bg-accent/40" />
              <span className="text-muted-foreground">{t("hero.eyebrow")}</span>
            </div>
          </FadeIn>

          {/* Title / image split */}
          <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12 md:gap-16 lg:gap-20">
            <div className="flex flex-col justify-end gap-8 md:col-span-7">
              <FadeIn delay={0.05}>
                <h1 className="text-display text-foreground">{t("hero.title")}</h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-lede max-w-xl text-muted-foreground">
                  {t("hero.subhead")}
                </p>
              </FadeIn>
            </div>

            <FadeIn className="md:col-span-5" delay={0.15}>
              <div className="relative">
                <ImagePlaceholder
                  role="About / cedar interior"
                  aspect="aspect-4/5"
                  className="rounded-(--radius-xl) shadow-lg"
                />
                {/* Circular aqua seal with concentric water motif — pinned to
                    the bottom-left corner of the image. Carries the brand
                    mark without repeating the homepage hero's video slab. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-6 -left-6 inline-flex size-24 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md"
                >
                  <svg viewBox="0 0 64 64" className="size-10">
                    <g fill="none" stroke="currentColor" strokeWidth="1.25">
                      <circle cx="32" cy="32" r="10" />
                      <circle cx="32" cy="32" r="18" />
                      <circle cx="32" cy="32" r="26" />
                    </g>
                  </svg>
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Chapter index — anchor links to each chapter below */}
          <FadeIn delay={0.3} className="mt-20 md:mt-28">
            <nav aria-label={t("hero.title")}>
              <ul className="grid gap-4 md:grid-cols-3 md:gap-8">
                {chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <a
                      href={`#${chapter.id}`}
                      className="group/ch relative flex h-full flex-col gap-5 border-t border-border pt-6 transition-[border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          aria-hidden="true"
                          className="text-h1 leading-none text-accent"
                        >
                          {chapter.ordinal}
                        </span>
                        <span className="text-eyebrow text-muted-foreground">
                          {chapter.eyebrow}
                        </span>
                      </div>
                      <p className="text-h3 text-foreground">{chapter.title}</p>
                      <span
                        aria-hidden="true"
                        className="mt-auto inline-flex items-center gap-2 text-small text-accent opacity-0 transition-opacity duration-200 group-hover/ch:opacity-100"
                      >
                        <span className="h-px w-6 bg-accent" />
                        <svg viewBox="0 0 16 16" className="size-3.5">
                          <path
                            d="M2 8h12M9 4l5 4-5 4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </FadeIn>
        </Container>
      </section>

      {/* ================================================================
          CHAPTER 01 — Why WaterVibes exists
          ================================================================ */}
      <section
        id="chapter-01"
        className="relative scroll-mt-24 py-24 md:scroll-mt-32 md:py-32"
      >
        <Container as="div" size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="flex flex-col gap-10 lg:col-span-7">
              <FadeIn>
                <div className="flex items-baseline gap-5">
                  <span
                    aria-hidden="true"
                    className="text-h1 leading-none text-accent"
                  >
                    01
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-eyebrow text-muted-foreground">
                      {t("chapter1.eyebrow")}
                    </span>
                    <h2 className="text-h2 text-foreground">
                      {t("chapter1.title")}
                    </h2>
                  </div>
                </div>
              </FadeIn>

              {/* Standfirst — paragraph 1 set as the opening statement */}
              <FadeIn delay={0.1} underline>
                <p className="max-w-2xl text-h3 font-normal text-foreground">
                  {t("chapter1.paragraph1")}
                </p>
              </FadeIn>

              {/* Body — remaining paragraphs */}
              <FadeIn delay={0.15}>
                <div className="prose-narrow flex flex-col gap-6 text-body text-foreground/80">
                  <p>{t("chapter1.paragraph2")}</p>
                  <p>{t("chapter1.paragraph3")}</p>
                  <p>{t("chapter1.paragraph4")}</p>
                </div>
              </FadeIn>
            </div>

            {/* Sticky side image — accompanies the reader through the prose */}
            <FadeIn className="lg:col-span-5 lg:self-start" delay={0.2}>
              <div className="lg:sticky lg:top-28">
                <ImagePlaceholder
                  role="Story image"
                  aspect="aspect-4/5"
                  className="rounded-(--radius-xl) shadow-md"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ================================================================
          CHAPTER 02 — How we do it (surface slab, numbered craft notes)
          ================================================================ */}
      <section
        id="chapter-02"
        className="relative scroll-mt-24 bg-surface py-24 md:scroll-mt-32 md:py-32"
      >
        <Container as="div" size="wide">
          <FadeIn>
            <div className="flex items-baseline gap-5">
              <span
                aria-hidden="true"
                className="text-h1 leading-none text-accent"
              >
                02
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-eyebrow text-muted-foreground">
                  {t("chapter2.eyebrow")}
                </span>
                <h2 className="text-h2 text-foreground">{t("chapter2.title")}</h2>
              </div>
            </div>
          </FadeIn>

          {/* Intro lede — paragraph 1 sets the chapter's intent */}
          <FadeIn delay={0.1} underline className="mt-10">
            <p className="max-w-3xl text-h3 font-normal text-foreground">
              {t("chapter2.paragraph1")}
            </p>
          </FadeIn>

          {/* Five numbered craft notes, separated by hairlines */}
          <ol className="mt-16 flex flex-col">
            {chapter2Notes.map((body, idx) => (
              <FadeIn
                key={idx}
                delay={0.05 + idx * 0.05}
                className={cn(
                  "border-t border-border py-10 md:py-12",
                  idx === chapter2Notes.length - 1 && "border-b",
                )}
              >
                <li className="grid gap-6 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="text-h1 leading-none text-accent"
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px w-12 bg-accent/40"
                      />
                    </div>
                  </div>
                  <p className="text-body text-foreground/85 md:col-span-8">
                    {body}
                  </p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </Container>
      </section>

      {/* ================================================================
          CHAPTER 03 — What we actually offer (inverted asymmetric)
          ================================================================ */}
      <section
        id="chapter-03"
        className="relative scroll-mt-24 py-24 md:scroll-mt-32 md:py-32"
      >
        <Container as="div" size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <FadeIn className="lg:order-1 lg:col-span-5 lg:self-start" delay={0.15}>
              <div className="lg:sticky lg:top-28">
                <ImagePlaceholder
                  role="Product detail"
                  aspect="aspect-4/5"
                  className="rounded-(--radius-xl) shadow-md"
                />
              </div>
            </FadeIn>

            <div className="flex flex-col gap-10 lg:order-2 lg:col-span-7">
              <FadeIn>
                <div className="flex items-baseline gap-5">
                  <span
                    aria-hidden="true"
                    className="text-h1 leading-none text-accent"
                  >
                    03
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-eyebrow text-muted-foreground">
                      {t("chapter3.eyebrow")}
                    </span>
                    <h2 className="text-h2 text-foreground">
                      {t("chapter3.title")}
                    </h2>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1} underline>
                <p className="max-w-2xl text-h3 font-normal text-foreground">
                  {t("chapter3.paragraph1")}
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="prose-narrow flex flex-col gap-6 text-body text-foreground/80">
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
