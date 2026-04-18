import { getTranslations } from "next-intl/server";

import { HeroVideo } from "@/components/home/HeroVideo";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
// commit push - 2
// DESIGN.md §5 — Hero
// Airbnb-warm commercial: parallax video backdrop at ~55% opacity under a
// transparent→charcoal gradient for text legibility. Big chunky headline
// in Plus Jakarta Sans. Two pill CTAs — filled accent primary, outline
// secondary. Bottom fade gradient bleeds the dark slab into the next
// section's white. Snap-start anchors the section for the homepage's
// proximity snap scroll.
export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden bg-foreground text-primary-foreground">
      <HeroVideo />

      {/* Soft aqua glow fields — same treatment as HomeCTA: depth on the
          dark slab without committing to a linear gradient darkening. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 -z-10 h-144 w-xl rounded-full bg-accent/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-40 -z-10 h-96 w-96 rounded-full bg-accent-tint/10 blur-3xl"
      />

      <Container
        as="div"
        size="wide"
        className={cn("grid min-h-[92vh] gap-10 py-24 md:py-32")}
      >
        <div className="flex max-w-3xl flex-col justify-end gap-7">
          <h1 className="text-display text-primary-foreground">
            {t("headline")}
          </h1>
          <p className="text-lede max-w-xl text-primary-foreground/85">
            {t("subhead")}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild variant="accent" size="lg" className="gap-2">
              <Link href="/catalog">
                <span>{t("ctaPrimary")}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
                >
                  <path
                    d="M1 8h12M9 4l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/40 bg-primary-foreground/5 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/15"
            >
              <Link href="/contact">
                <span>{t("ctaSecondary")}</span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
