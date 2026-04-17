import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";

export function Header() {
  const t = useTranslations();
  const links = [
    { href: "/" as const, label: t("nav.home") },
    { href: "/catalog" as const, label: t("nav.catalog") },
    { href: "/about" as const, label: t("nav.about") },
    { href: "/contact" as const, label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container as="div" className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-heading text-lg tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {t("brand.name")}
        </Link>
        <nav
          aria-label={t("nav.home")}
          className="hidden items-center gap-8 text-sm text-muted-foreground md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </Container>
    </header>
  );
}
