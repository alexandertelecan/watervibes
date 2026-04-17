import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <Container as="section" className="py-24 md:py-32">
      <SectionHeading
        eyebrow={t("brand.name")}
        title={t("brand.tagline")}
        description={t("home.placeholder")}
      />
    </Container>
  );
}
