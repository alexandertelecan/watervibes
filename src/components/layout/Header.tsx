import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { ScrolledHeader } from "@/components/layout/ScrolledHeader";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";

// DESIGN.md §5 — Header
// Logo set in Fraunces (no SVG for now). Nav: Home · Catalog · About ·
// Contact — 4 items. Rightmost cluster: LanguageSwitcher + "Request a
// quote" Button. On scroll the whole header shrinks and gains a --surface
// backdrop + accent bottom rule — see ScrolledHeader.
export function Header() {
  const t = useTranslations();
  const links = [
    { href: "/" as const, label: t("nav.home") },
    { href: "/catalog" as const, label: t("nav.catalog") },
    { href: "/about" as const, label: t("nav.about") },
    { href: "/contact" as const, label: t("nav.contact") },
  ];

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
        <nav
          aria-label={t("nav.home")}
          className="hidden items-center gap-8 text-small text-muted-foreground md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}
            </Link>
          ))}
        </nav>
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
