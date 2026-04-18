import { getTranslations } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { cn } from "@/lib/utils";

// DESIGN.md §5 + §7 — BrandStory: "a warm card, a promise, three places".
// Breaks the bland 5/7 prose grid by staging the section in three beats:
//   1. Marginalia row (aqua tick + eyebrow + hairline + serial).
//   2. Asymmetric top: h2 title (left, cols 1–5) + aqua-tinted pullquote
//      panel (right, cols 6–12) with an oversize hanging open-quote and
//      concentric-arc water motif in its corner.
//   3. Aqua hairline divider.
//   4. Three numbered pillars (Nº 01 / 02 / 03 — Context / Offering /
//      Promise) separated by soft vertical rules.
// The aqua panel is the color hook between the neutral Featured and
// Testimonials sections; HomeCTA picks up the dark counterpart later.
export async function BrandStory() {
  const t = await getTranslations("brandStory");

  const pillars = [
    { label: t("pillars.01"), body: t("paragraph1") },
    { label: t("pillars.02"), body: t("paragraph2") },
    { label: t("pillars.03"), body: t("paragraph3") },
  ] as const;

  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      {/* Chalk → surface bleeds (Oura borrow, DESIGN.md §7). */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-48 bg-linear-to-b from-surface/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-surface/60 to-transparent"
      />
      {/* Decorative water-ripple motif — restrained, below z-index-0 */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-112 w-md text-accent/10"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="200" cy="200" r="60" />
          <circle cx="200" cy="200" r="105" />
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="195" />
          <circle cx="200" cy="200" r="240" />
        </g>
      </svg>

      <Container as="div">
        {/* Semantic anchor — visually replaced by the pullquote panel. */}
        <h2 className="sr-only">{t("title")}</h2>

        {/* Eyebrow */}
        <FadeIn>
          <div className="flex items-center gap-3 text-eyebrow text-accent">
            <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
            <span>{t("eyebrow")}</span>
          </div>
        </FadeIn>

        {/* Top row: title (left) + aqua pullquote panel (right) */}
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-12">
          <FadeIn className="md:col-span-5 md:pt-6" delay={0.05}>
            <p className="text-h1 text-foreground">{t("title")}</p>
            <p className="mt-5 max-w-md text-lede text-muted-foreground">
              {t("intro")}
            </p>
          </FadeIn>

          <FadeIn className="md:col-span-7" delay={0.15}>
            <blockquote className="relative overflow-hidden rounded-(--radius-xl) bg-accent px-8 py-12 text-accent-foreground shadow-md md:px-14 md:py-16">
              {/* Oversize open-quote glyph hanging over the top-left */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 -top-10 select-none text-[11rem] leading-none text-accent-foreground/15 md:-left-4 md:-top-14 md:text-[16rem]"
                style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 700 }}
              >
                &ldquo;
              </span>
              {/* Concentric-arc water motif, bottom-right corner */}
              <svg
                aria-hidden="true"
                viewBox="0 0 240 240"
                className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 text-accent-foreground/12"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.25">
                  <circle cx="120" cy="120" r="40" />
                  <circle cx="120" cy="120" r="70" />
                  <circle cx="120" cy="120" r="100" />
                  <circle cx="120" cy="120" r="130" />
                </g>
              </svg>

              <p className="relative z-10 text-h1 leading-tight">
                {t("pullquote")}
              </p>
              <footer className="relative z-10 mt-8 flex items-center gap-3 text-small text-accent-foreground/80">
                <span aria-hidden="true" className="h-px w-10 bg-accent-foreground/50" />
                <cite className="not-italic tracking-wide">{t("attribution")}</cite>
              </footer>
            </blockquote>
          </FadeIn>
        </div>

        {/* Animated aqua hairline (DESIGN.md §4.2 signature move) */}
        <FadeIn underline delay={0.25} className="mt-20 md:mt-24">
          <span aria-hidden="true" className="sr-only" />
        </FadeIn>

        {/* Three numbered pillars */}
        <div className="mt-10 grid gap-12 md:mt-12 md:grid-cols-3 md:gap-0">
          {pillars.map((pillar, idx) => (
            <FadeIn key={pillar.label} delay={0.3 + idx * 0.08}>
              <article
                className={cn(
                  "flex h-full flex-col gap-5 md:px-8",
                  idx === 0 && "md:pl-0",
                  idx > 0 && "md:border-l md:border-border",
                  idx === pillars.length - 1 && "md:pr-0",
                )}
              >
                <span
                  aria-hidden="true"
                  className="text-accent"
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontSize: "clamp(3.25rem, 5vw, 4.25rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    fontWeight: 700,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-6 bg-accent" />
                  <span className="text-eyebrow text-foreground">{pillar.label}</span>
                </div>
                <p className="text-body text-foreground/80">{pillar.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
