import { getTranslations } from "next-intl/server";

import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// DESIGN.md §5 — Hero
// Video plays at ~50% opacity; a cream→primary vertical gradient is laid
// over it so the foreground reads as "dusk through linen." Headline sits
// left-aligned in the first 7 of 12 columns. Right rail shows a rotated
// eyebrow "No. 01 / Soak" with a short terracotta rule. One CTA only —
// variant="primary" with trailing arrow.
export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden bg-foreground text-primary-foreground">
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        // Placeholder hero imagery — slot in a URL from IMAGERY.md §1.1 when
        // picked. Without a poster the section still renders cleanly on the
        // gradient alone.
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* "Dusk through linen" — cream at top fading to deep green at bottom.
          Laid over the video so the palette reads as our tokens, not the
          footage. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background/10 via-primary/25 to-primary/70"
      />

      <Container
        as="div"
        size="wide"
        className={cn(
          "grid min-h-[85vh] gap-10 py-28 md:grid-cols-12 md:py-40",
        )}
      >
        <div className="flex flex-col justify-end gap-8 md:col-span-7">
          <h1 className="text-display text-primary-foreground">
            {t("headline")}
          </h1>
          <p className="text-lede max-w-xl text-primary-foreground/85">
            {t("subhead")}
          </p>
          <div>
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
          </div>
        </div>

        {/* Right rail — vertical eyebrow. Hidden on mobile where the single
            column would swallow it. */}
        <div
          aria-hidden="true"
          className="hidden items-start justify-end md:col-span-5 md:flex"
        >
          <div className="flex flex-col items-end gap-4 pt-4">
            <span className="h-px w-10 bg-accent" />
            <span
              className="text-eyebrow text-accent-foreground/90"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {t("ordinal")}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
