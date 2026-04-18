"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/shared/Button";
import { Link } from "@/i18n/navigation";

// DESIGN.md §5 — the signature CTA on the product page. Accent-filled pill
// with trailing arrow for "Request a quote", outline "See specs" smooth-
// scroll secondary, small reassurance note underneath.
export function QuoteCTA({ slug }: { slug: string }) {
  const t = useTranslations("product.quote");

  const handleScroll = () => {
    document
      .getElementById("specs")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-eyebrow text-accent">{t("eyebrow")}</span>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="accent" size="lg">
          <Link href={`/contact?product=${encodeURIComponent(slug)}`}>
            <span>{t("primary")}</span>
            <ArrowRight
              aria-hidden="true"
              className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
            />
          </Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleScroll}
        >
          {t("secondary")}
        </Button>
      </div>
      <p className="text-small text-muted-foreground">{t("note")}</p>
    </div>
  );
}
