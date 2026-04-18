import { ClockIcon, TagIcon, WrenchIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";

// DESIGN.md §5 — HomeCTA ("the next step")
// Dark charcoal anchor at the end of the page. Two soft aqua radial-glow
// fields give the flat slab depth without committing to a specific motif
// (concentric circles are now BrandStory's signature). Layout: asymmetric
// heading block + CTA/email column on top, a hairline divider, then a
// three-item trust strip (reply time / delivered price / installation
// steps) to reinforce the subhead as scannable proof points.
export async function HomeCTA() {
  const t = await getTranslations("homeCta");
  const tContact = await getTranslations("contact.info");

  const trust = [
    { key: "reply", Icon: ClockIcon, label: t("trust.reply") },
    { key: "price", Icon: TagIcon, label: t("trust.price") },
    { key: "installation", Icon: WrenchIcon, label: t("trust.installation") },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
      {/* Soft aqua glow fields — depth, no motif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-144 w-xl rounded-full bg-accent/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-40 h-96 w-96 rounded-full bg-accent-tint/10 blur-3xl"
      />

      <Container as="div" className="relative z-10">
        {/* Top row: heading block + CTA column */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="flex max-w-2xl flex-col gap-6">
            <div className="flex items-center gap-3 text-eyebrow text-accent-tint">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-accent-tint"
              />
              <span>{t("eyebrow")}</span>
            </div>
            <h2 className="text-display text-primary-foreground">
              {t("headline")}
            </h2>
            <p className="text-lede max-w-xl text-primary-foreground/80">
              {t("subhead")}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end md:pb-2">
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
            <a
              href={`mailto:${tContact("email")}`}
              className="text-small text-primary-foreground/70 underline-offset-4 transition-colors duration-200 hover:text-accent-tint hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {tContact("email")}
            </a>
          </div>
        </div>

        {/* Hairline divider */}
        <div
          aria-hidden="true"
          className="mt-16 h-px bg-primary-foreground/12 md:mt-20"
        />

        {/* Trust strip */}
        <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-10">
          {trust.map(({ key, Icon, label }) => (
            <li key={key} className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 text-accent-tint"
              >
                <Icon className="size-4.5" strokeWidth={1.75} />
              </span>
              <span className="text-small font-medium text-primary-foreground/85">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
