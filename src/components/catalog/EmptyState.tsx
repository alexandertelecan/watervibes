import { SearchX } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function EmptyState() {
  const t = await getTranslations("catalog.empty");

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-accent/30 px-6 py-20 text-center">
      <SearchX
        className="h-10 w-10 text-muted-foreground"
        aria-hidden="true"
      />
      <h3 className="font-heading text-2xl text-foreground">{t("title")}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{t("message")}</p>
      <Button asChild variant="outline" size="sm" className="mt-2">
        <Link href="/catalog">{t("clearFilters")}</Link>
      </Button>
    </div>
  );
}
