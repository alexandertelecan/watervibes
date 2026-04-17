"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function QuoteCTA({ slug }: { slug: string }) {
  const t = useTranslations("product.quote");

  const handleScroll = () => {
    document
      .getElementById("specs")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
      <Button asChild size="lg" className="h-11 px-6 text-sm">
        <Link href={`/contact?product=${encodeURIComponent(slug)}`}>
          {t("primary")}
        </Link>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 px-6 text-sm"
        onClick={handleScroll}
      >
        {t("secondary")}
      </Button>
    </div>
  );
}
