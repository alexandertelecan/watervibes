import { useTranslations } from "next-intl";

import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60 bg-accent/40">
      <Container as="div" className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <p className="font-heading text-lg text-foreground">{t("brand.name")}</p>
          <p className="text-sm text-muted-foreground">{t("brand.tagline")}</p>
        </div>
        <nav
          aria-label={t("footer.sections.explore")}
          className="grid grid-cols-2 gap-10 text-sm md:grid-cols-2"
        >
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t("footer.sections.explore")}
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-foreground/80 transition-colors hover:text-foreground">
                  {t("nav.catalog")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/80 transition-colors hover:text-foreground">
                  {t("nav.about")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t("footer.sections.contact")}
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-foreground/80 transition-colors hover:text-foreground">
                  {t("cta.getInTouch")}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
      <Container as="div" className="flex flex-col items-start justify-between gap-4 border-t border-border/60 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
        <p>
          &copy; {year} {t("brand.name")}. {t("footer.rights")}
        </p>
      </Container>
    </footer>
  );
}
