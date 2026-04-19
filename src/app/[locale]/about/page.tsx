import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HomeCTA } from "@/components/home/HomeCTA";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { JsonLd } from "@/components/shared/JsonLd";
import { routing } from "@/i18n/routing";
import {
  BUSINESS,
  alternatesFor,
  assertLocale,
  localBusinessSchema,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";
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
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta.about" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: alternatesFor(locale, "/about"),
    openGraph: openGraphFor(locale, "/about", { title, description }),
    twitter: twitterFor({ title, description }),
  };
}

// Shared style for the big outlined backing ordinal that watermarks each
// chapter header — transparent fill with a hairline aqua stroke, sitting
// behind the eyebrow + title.
const BACKING_ORDINAL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-fraunces), sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.05em",
  color: "transparent",
  WebkitTextStroke:
    "1.5px color-mix(in oklab, var(--accent) 22%, transparent)",
};

// DESIGN.md §0+5 — About: editorial masthead + three chapters, each in a
// different rhetorical register, closing on a centered signature band.
//
//   Hero         — MMXXIV masthead · display headline · asymmetric image
//                  with aqua seal · magazine TOC with dotted leaders.
//   Chapter 01   — Why: outlined "01" watermark · vertical aqua rule
//                  beside the standfirst · sticky side image.
//   Chapter 02   — How (on --surface): horizontal aqua rule standfirst +
//                  staggered 2-col craft log of 5 numbered field notes.
//   Chapter 03   — What (inverted): 3-image collage · standfirst inside
//                  an aqua-tinted quote panel with hanging glyph.
//   Signature    — Centered display tagline framed by concentric ripples.
//   HomeCTA      — unchanged.
export default async function AboutPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tBrand = await getTranslations("brand");
  const tEnsama = await getTranslations("about.ensama");

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
          HERO — editorial masthead
          ================================================================ */}
      <section className="relative isolate overflow-hidden bg-background">
        {/* Oversize concentric water emblem — top-right */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -right-32 -top-32 h-112 w-md text-accent/10 md:-right-20 md:-top-24 md:h-144 md:w-xl"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="200" cy="200" r="60" />
            <circle cx="200" cy="200" r="105" />
            <circle cx="200" cy="200" r="150" />
            <circle cx="200" cy="200" r="195" />
            <circle cx="200" cy="200" r="240" />
          </g>
        </svg>

        <Container
          as="div"
          size="wide"
          className="relative py-20 md:py-24 lg:py-28"
        >
          {/* Issue marker row */}
          <FadeIn>
            <div className="flex flex-wrap items-center gap-4 text-eyebrow">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-accent"
              />
              <span className="text-accent">MMXXIV</span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-accent/40"
              />
              <span className="text-muted-foreground">
                {t("hero.eyebrow")}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-px w-10 bg-border md:inline-block"
              />
              <span
                aria-hidden="true"
                className="hidden tabular-nums text-muted-foreground md:inline"
              >
                N° 01 — 03
              </span>
            </div>
          </FadeIn>

          {/* Title block + image */}
          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-14 lg:gap-20">
            <div className="flex flex-col gap-10 md:col-span-8">
              <FadeIn delay={0.05}>
                <h1 className="text-display text-foreground">
                  {t("hero.title")}
                </h1>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="text-lede max-w-xl text-muted-foreground">
                  {t("hero.subhead")}
                </p>
              </FadeIn>
            </div>

            <FadeIn
              className="relative md:col-span-4 md:self-end"
              delay={0.18}
            >
              <ImagePlaceholder
                role="About / cedar interior"
                aspect="aspect-4/5"
                className="rounded-(--radius-xl) shadow-lg"
              />
              {/* Aqua seal — bottom-left, concentric motif */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -left-6 inline-flex size-24 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md md:size-28"
              >
                <svg viewBox="0 0 64 64" className="size-12 md:size-14">
                  <g fill="none" stroke="currentColor" strokeWidth="1.25">
                    <circle cx="32" cy="32" r="10" />
                    <circle cx="32" cy="32" r="18" />
                    <circle cx="32" cy="32" r="26" />
                  </g>
                </svg>
              </span>
            </FadeIn>
          </div>

          {/* Magazine TOC — chapter index with dotted leaders */}
          <FadeIn delay={0.28} className="mt-24 md:mt-32">
            <div className="flex items-baseline justify-between">
              <span className="text-eyebrow text-muted-foreground">
                I · II · III
              </span>
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-accent"
              />
            </div>
            <nav
              aria-label={t("hero.title")}
              className="mt-3 border-t border-border"
            >
              <ul className="flex flex-col">
                {chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <a
                      href={`#${chapter.id}`}
                      className={cn(
                        "group/ch relative flex items-baseline gap-5 border-b border-border py-6 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent md:gap-8 md:py-7",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-h1 leading-none text-accent transition-colors duration-200 group-hover/ch:text-accent-tint"
                      >
                        {chapter.ordinal}
                      </span>

                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="text-eyebrow text-muted-foreground">
                          {chapter.eyebrow}
                        </span>
                        <span className="text-h3 text-foreground">
                          {chapter.title}
                        </span>
                      </span>

                      {/* Dotted leader rule */}
                      <span
                        aria-hidden="true"
                        className="mx-2 hidden h-0 flex-1 self-end border-b border-dotted border-border pb-2 transition-colors duration-200 group-hover/ch:border-accent/60 md:block"
                      />

                      {/* Animated arrow */}
                      <span
                        aria-hidden="true"
                        className="inline-flex shrink-0 items-center self-end pb-1.5 text-accent transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/ch:translate-x-1"
                      >
                        <svg viewBox="0 0 16 16" className="size-4">
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
          CHAPTER 01 — Why WaterVibe exists (manifesto)
          ================================================================ */}
      <section
        id="chapter-01"
        className="relative scroll-mt-24 bg-background py-28 md:scroll-mt-32 md:py-36 lg:py-40"
      >
        <Container as="div" size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="flex flex-col gap-12 lg:col-span-7">
              {/* Title + outlined backing ordinal */}
              <FadeIn>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1 -top-10 select-none text-[8rem] leading-none md:-left-3 md:-top-16 md:text-[13rem]"
                    style={BACKING_ORDINAL_STYLE}
                  >
                    01
                  </span>
                  <div className="relative flex flex-col gap-2 pt-2 md:pt-6">
                    <span className="text-eyebrow text-muted-foreground">
                      {t("chapter1.eyebrow")}
                    </span>
                    <h2 className="text-h1 text-foreground">
                      {t("chapter1.title")}
                    </h2>
                  </div>
                </div>
              </FadeIn>

              {/* Standfirst — vertical aqua rule register */}
              <FadeIn delay={0.1}>
                <div className="relative max-w-2xl pl-6 md:pl-8">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-0 top-1 w-0.5 bg-accent"
                  />
                  <p className="text-h3 font-normal leading-[1.45] text-foreground">
                    {t("chapter1.paragraph1")}
                  </p>
                </div>
              </FadeIn>

              {/* Body */}
              <FadeIn delay={0.15}>
                <div className="prose-narrow flex flex-col gap-6 text-body text-foreground/80">
                  <p>{t("chapter1.paragraph2")}</p>
                  <p>{t("chapter1.paragraph3")}</p>
                  <p>{t("chapter1.paragraph4")}</p>
                </div>
              </FadeIn>
            </div>

            {/* Sticky side image with editorial caption chip */}
            <FadeIn
              className="lg:col-span-5 lg:self-start"
              delay={0.2}
            >
              <div className="lg:sticky lg:top-28">
                <div className="relative">
                  <ImagePlaceholder
                    role="Why we exist"
                    aspect="aspect-4/5"
                    className="rounded-(--radius-xl) shadow-md"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-eyebrow text-muted-foreground shadow-sm backdrop-blur-sm"
                  >
                    <span className="inline-block size-1.5 rounded-full bg-accent" />
                    N° 01
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ================================================================
          CHAPTER 02 — How we do it (craft log on --surface)
          ================================================================ */}
      <section
        id="chapter-02"
        className="relative scroll-mt-24 overflow-hidden bg-surface py-28 md:scroll-mt-32 md:py-36 lg:py-40"
      >
        {/* Decorative ripple — quiet bottom-left */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -bottom-40 -left-32 h-128 w-lg text-accent/8 md:-bottom-48 md:-left-24 md:h-176 md:w-176"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="200" cy="200" r="60" />
            <circle cx="200" cy="200" r="105" />
            <circle cx="200" cy="200" r="150" />
            <circle cx="200" cy="200" r="195" />
            <circle cx="200" cy="200" r="240" />
          </g>
        </svg>

        <Container as="div" size="wide" className="relative">
          <div className="grid gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-5">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-1 -top-10 select-none text-[8rem] leading-none md:-left-3 md:-top-16 md:text-[13rem]"
                  style={BACKING_ORDINAL_STYLE}
                >
                  02
                </span>
                <div className="relative flex flex-col gap-2 pt-2 md:pt-6">
                  <span className="text-eyebrow text-muted-foreground">
                    {t("chapter2.eyebrow")}
                  </span>
                  <h2 className="text-h1 text-foreground">
                    {t("chapter2.title")}
                  </h2>
                </div>
              </div>
            </FadeIn>

            {/* Standfirst — horizontal aqua rule register */}
            <FadeIn
              delay={0.1}
              underline
              className="md:col-span-7 md:pt-4"
            >
              <p className="text-h3 font-normal leading-[1.4] text-foreground">
                {t("chapter2.paragraph1")}
              </p>
            </FadeIn>
          </div>

          {/* 5 field notes — staggered 2-col craft log */}
          <ol className="mt-20 grid gap-12 md:mt-28 md:grid-cols-2 md:gap-x-16 md:gap-y-20 lg:gap-x-24">
            {chapter2Notes.map((body, idx) => (
              <FadeIn
                key={idx}
                delay={0.05 + idx * 0.05}
                className={cn(idx % 2 === 1 && "md:pt-16")}
              >
                <li className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="text-h1 leading-none text-accent"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 max-w-24 bg-accent/40"
                    />
                  </div>
                  <p className="text-body text-foreground/85">{body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </Container>
      </section>

      {/* ================================================================
          CHAPTER 03 — What we actually offer (inverted / collage)
          ================================================================ */}
      <section
        id="chapter-03"
        className="relative scroll-mt-24 bg-background py-28 md:scroll-mt-32 md:py-36 lg:py-40"
      >
        <Container as="div" size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* 3-image collage — signals "the offering" */}
            <FadeIn
              className="lg:order-1 lg:col-span-5 lg:self-start"
              delay={0.18}
            >
              <div className="lg:sticky lg:top-28">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="col-span-2">
                    <ImagePlaceholder
                      role="Product detail"
                      aspect="aspect-4/5"
                      className="rounded-(--radius-xl) shadow-md"
                    />
                  </div>
                  <ImagePlaceholder
                    role="Finish swatches"
                    aspect="aspect-square"
                    className="rounded-(--radius-lg) shadow-sm"
                  />
                  <ImagePlaceholder
                    role="Terrace setting"
                    aspect="aspect-square"
                    className="rounded-(--radius-lg) shadow-sm"
                  />
                </div>
              </div>
            </FadeIn>

            <div className="flex flex-col gap-10 lg:order-2 lg:col-span-7">
              <FadeIn>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1 -top-10 select-none text-[8rem] leading-none md:-left-3 md:-top-16 md:text-[13rem]"
                    style={BACKING_ORDINAL_STYLE}
                  >
                    03
                  </span>
                  <div className="relative flex flex-col gap-2 pt-2 md:pt-6">
                    <span className="text-eyebrow text-muted-foreground">
                      {t("chapter3.eyebrow")}
                    </span>
                    <h2 className="text-h1 text-foreground">
                      {t("chapter3.title")}
                    </h2>
                  </div>
                </div>
              </FadeIn>

              {/* Standfirst — aqua-tinted blockquote register */}
              <FadeIn delay={0.12}>
                <blockquote className="relative overflow-hidden rounded-(--radius-xl) border border-accent/20 bg-accent/5 px-7 py-10 md:px-11 md:py-14">
                  {/* Oversize open-quote glyph */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1 -top-2 select-none text-[7rem] leading-none text-accent/30 md:-left-1 md:-top-6 md:text-[11rem]"
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontWeight: 700,
                    }}
                  >
                    &ldquo;
                  </span>
                  {/* Small concentric motif, corner */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 200"
                    className="pointer-events-none absolute -bottom-16 -right-16 size-48 text-accent/15 md:size-56"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="100" cy="100" r="30" />
                      <circle cx="100" cy="100" r="52" />
                      <circle cx="100" cy="100" r="74" />
                      <circle cx="100" cy="100" r="96" />
                    </g>
                  </svg>
                  <p className="relative z-10 max-w-2xl pl-10 text-h3 font-normal leading-[1.45] text-foreground md:pl-14">
                    {t("chapter3.paragraph1")}
                  </p>
                </blockquote>
              </FadeIn>

              <FadeIn delay={0.18}>
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

      {/* ================================================================
          ENSAMA — canonical NAP block: gives crawlers (and humans) the
          registered business behind the brand. Visually a calm, tabular
          dossier band on --surface so it reads as a factual footer to
          the chapter tour rather than a marketing section.
          ================================================================ */}
      <section className="relative bg-surface py-24 md:py-28">
        <Container as="div" size="wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <FadeIn>
                <div className="flex items-center gap-3 text-eyebrow text-accent">
                  <span
                    aria-hidden="true"
                    className="inline-block size-1.5 rounded-full bg-accent"
                  />
                  <span>{tEnsama("eyebrow")}</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="mt-6 text-h1 text-foreground">
                  {tEnsama("title")}
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 max-w-md text-lede text-muted-foreground">
                  {tEnsama("description")}
                </p>
              </FadeIn>
            </div>

            <FadeIn
              className="md:col-span-7 md:pt-2"
              delay={0.15}
            >
              <dl className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <NapRow
                  label={tEnsama("labels.company")}
                  value={tEnsama("company")}
                />
                <NapRow
                  label={tEnsama("labels.address")}
                  value={tEnsama("address")}
                />
                <NapRow
                  label={tEnsama("labels.phone")}
                  value={
                    <a
                      href={`tel:${BUSINESS.phone}`}
                      className="text-body text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      {tEnsama("phone")}
                    </a>
                  }
                />
                <NapRow
                  label={tEnsama("labels.area")}
                  value={tEnsama("area")}
                />
                <NapRow
                  className="sm:col-span-2 sm:border-l-0"
                  label={tEnsama("labels.social")}
                  value={
                    <a
                      href={BUSINESS.social.facebook}
                      rel="me noopener"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-body text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      <span>{tEnsama("facebookLabel")}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="size-3.5"
                      >
                        <path
                          d="M6 2h8v8M14 2 2 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  }
                />
              </dl>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SIGNATURE BAND — closing typographic statement
          ================================================================ */}
      <section className="relative isolate overflow-hidden bg-background py-24 md:py-32">
        {/* Twin concentric motifs flanking the center */}
        <svg
          aria-hidden="true"
          viewBox="0 0 240 240"
          className="pointer-events-none absolute -left-12 top-1/2 size-64 -translate-y-1/2 text-accent/10 md:left-12 md:size-80"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="120" cy="120" r="30" />
            <circle cx="120" cy="120" r="52" />
            <circle cx="120" cy="120" r="74" />
            <circle cx="120" cy="120" r="96" />
            <circle cx="120" cy="120" r="118" />
          </g>
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 240 240"
          className="pointer-events-none absolute -right-12 top-1/2 size-64 -translate-y-1/2 text-accent/10 md:right-12 md:size-80"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="120" cy="120" r="30" />
            <circle cx="120" cy="120" r="52" />
            <circle cx="120" cy="120" r="74" />
            <circle cx="120" cy="120" r="96" />
            <circle cx="120" cy="120" r="118" />
          </g>
        </svg>

        <Container as="div" className="relative text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 text-eyebrow text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent/40" />
              <span>MMXXIV</span>
              <span aria-hidden="true" className="h-px w-10 bg-accent/40" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-10 max-w-3xl text-display text-foreground">
              {tBrand("tagline")}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="mt-10 text-small font-medium text-muted-foreground"
              style={{ letterSpacing: "0.28em", textTransform: "uppercase" }}
            >
              · {tBrand("name")} ·
            </p>
          </FadeIn>
        </Container>
      </section>

      <HomeCTA />

      {/* LocalBusiness — because the About page carries the registered
          business details, we mount the LocalBusiness schema here so the
          NAP block and the structured data travel together. */}
      <JsonLd data={localBusinessSchema(locale)} />
    </>
  );
}

// Single NAP row: aqua eyebrow label + the value below, left-aligned with
// a short rule above (matching the contact page's aside rhythm). Kept as
// a small helper so the grid reads as a tabular dossier without the
// verbosity of inline markup.
function NapRow({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2 px-0 py-6 sm:px-6", className)}>
      <dt className="text-eyebrow text-accent">{label}</dt>
      <dd className="text-body text-foreground">{value}</dd>
    </div>
  );
}
