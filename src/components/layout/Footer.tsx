import { useTranslations } from "next-intl";

import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";

// DESIGN.md §5 — Footer
// Three-column grid on --surface with a big display-sans watermark behind
// the columns at 6% opacity. Full-width aqua divider above the columns.
// Photo credit line sits with "Made in Romania" in the microline.
export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-surface pt-16 md:pt-24">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent" />

      {/* Oversized wordmark watermark behind the columns (decorative). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-foreground/5.5"
        style={{
          fontFamily: "var(--font-fraunces)",
          fontSize: "clamp(10rem, 22vw, 18rem)",
          lineHeight: 0.85,
          textAlign: "center",
          transform: "translateY(20%)",
        }}
      >
        {t("brand.name")}
      </div>

      <Container as="div" size="wide" className="relative z-10">
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          <div className="flex flex-col gap-4">
            <p className="text-h2 text-foreground">{t("brand.name")}</p>
            <span aria-hidden="true" className="h-px w-12 bg-accent" />
            <p className="text-body max-w-xs text-foreground/85">
              {t("brand.tagline")}
            </p>
          </div>

          <nav
            aria-label={t("footer.sections.explore")}
            className="grid grid-cols-2 gap-8"
          >
            <FooterSection title={t("footer.sections.company")}>
              <FooterLink href="/about" label={t("nav.about")} />
              <FooterLink href="/contact" label={t("nav.contact")} />
            </FooterSection>
            <FooterSection title={t("footer.sections.explore")}>
              <FooterLink href="/catalog" label={t("nav.catalog")} />
              <FooterLink href="/" label={t("nav.home")} />
            </FooterSection>
          </nav>

          <div className="flex flex-col gap-5">
            <FooterSection title={t("contact.info.emailLabel")}>
              <a
                href={`mailto:${t("contact.info.email")}`}
                className="text-body text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {t("contact.info.email")}
              </a>
            </FooterSection>
            <FooterSection title={t("contact.info.phoneLabel")}>
              <p className="text-body text-foreground">{t("contact.info.phone")}</p>
            </FooterSection>
            <FooterSection title={t("contact.info.addressLabel")}>
              <p className="text-body text-foreground">{t("contact.info.address")}</p>
            </FooterSection>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-2 border-t border-border py-8 text-small text-muted-foreground md:flex-row md:items-center">
          <p>
            &copy; {year} {t("brand.name")}. {t("footer.rights")}
          </p>
          <p>{t("footer.madeIn")}</p>
          <p>{t("footer.photoCredit")}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-eyebrow text-accent">{title}</p>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  label,
}: {
  href: "/" | "/catalog" | "/about" | "/contact";
  label: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-body text-foreground/85 transition-colors hover:text-accent focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {label}
      </Link>
    </li>
  );
}
