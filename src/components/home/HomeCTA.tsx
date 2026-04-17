import { getTranslations } from "next-intl/server";

import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";

// DESIGN.md §5 — HomeCTA
// Deep green full-width strip. Single Button in variant="accent" — terracotta
// on forest green is 5.5:1 (per DESIGN.md §1.1 --accent-foreground on
// --accent). Meets AA for the button's text. Outline variant would read too
// quietly against this background, so accent is the right call.
export async function HomeCTA() {
  const t = await getTranslations("homeCta");

  return (
    <section className="bg-primary py-24 text-primary-foreground md:py-32">
      <Container
        as="div"
        className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-16"
      >
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="text-eyebrow text-accent-tint">{t("eyebrow")}</span>
          <h2 className="text-h1 text-primary-foreground">{t("headline")}</h2>
          <p className="text-lede text-primary-foreground/80">
            {t("subhead")}
          </p>
        </div>
        <Button asChild variant="accent" size="lg">
          <Link href="/contact">
            <span>{t("button")}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
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
      </Container>
    </section>
  );
}
