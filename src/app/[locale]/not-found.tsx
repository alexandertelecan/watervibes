import { getTranslations } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("errors.notFound");

  return (
    <Container as="section" className="flex flex-col items-center gap-6 py-24 text-center md:py-32">
      <span className="font-heading text-6xl text-muted-foreground">404</span>
      <h1 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
        {t("title")}
      </h1>
      <p className="max-w-md text-base text-muted-foreground md:text-lg">
        {t("message")}
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("cta")}
      </Link>
    </Container>
  );
}
