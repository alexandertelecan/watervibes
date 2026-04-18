import { useTranslations } from "next-intl";

import { HeaderNav } from "@/components/layout/HeaderNav";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { ScrolledHeader } from "@/components/layout/ScrolledHeader";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";

// DESIGN.md §5 — Header
// Wordmark (left) + pill-capsule HeaderNav (center) + LanguageSwitcher
// and "Request a quote" CTA (right). Mobile collapses the nav into
// MobileNav (Sheet). On scroll past 80px, ScrolledHeader shrinks the
// height and drops a --surface backdrop with an aqua bottom rule.
export function Header() {
  const t = useTranslations();

  return (
    <ScrolledHeader>
      <Container
        as="div"
        size="wide"
        className="flex h-full items-center justify-between gap-6"
      >
        <Link
          href="/"
          className="font-heading text-xl font-medium tracking-tight text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          {t("brand.name")}
        </Link>
        <HeaderNav />
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button asChild variant="primary" size="sm" className="hidden md:inline-flex">
            <Link href="/contact">{t("cta.requestQuote")}</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </ScrolledHeader>
  );
}
