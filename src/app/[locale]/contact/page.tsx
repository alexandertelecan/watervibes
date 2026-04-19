import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  alternatesFor,
  assertLocale,
  localBusinessSchema,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";

type PageParams = { locale: string };
type PageSearch = { product?: string | string[] };

function normalizeSlug(value: string | string[] | undefined): string | undefined {
  if (!value) return undefined;
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed && trimmed.length <= 120 ? trimmed : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: alternatesFor(locale, "/contact"),
    openGraph: openGraphFor(locale, "/contact", { title, description }),
    twitter: twitterFor({ title, description }),
  };
}

// DESIGN.md §5 — Contact
// Desktop: 5/7 split. Left column (col-span-5) is an editorial aside —
// pull-quote, CONTACT_EMAIL, phone, hours, all separated by short
// terracotta rules. Right column (col-span-7) hosts the form on a
// --surface panel with --radius-xl corners and generous padding.
export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<PageSearch>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  setRequestLocale(locale);

  const { product } = await searchParams;
  const productSlug = normalizeSlug(product);

  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <section className="py-24 md:py-32">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial aside — col-span-5 */}
          <aside className="flex flex-col gap-12 lg:col-span-5">
            <FadeIn underline>
              <div className="flex flex-col gap-4">
                <span className="text-eyebrow text-accent">{t("eyebrow")}</span>
                <h1 className="text-h1 text-foreground">{t("title")}</h1>
                <p className="text-lede text-muted-foreground">{t("description")}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <figure className="flex flex-col gap-4">
                <blockquote
                  className="text-lede italic text-foreground"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  &ldquo;{t("aside.pullquote")}&rdquo;
                </blockquote>
                <figcaption className="text-eyebrow text-muted-foreground">
                  {t("aside.pullquoteAttribution")}
                </figcaption>
              </figure>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col gap-6">
                <AsideBlock
                  label={t("info.emailLabel")}
                  value={
                    <a
                      href={`mailto:${t("info.email")}`}
                      className="text-body text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {t("info.email")}
                    </a>
                  }
                />
                <AsideBlock
                  label={t("info.phoneLabel")}
                  value={<span className="text-body text-foreground">{t("info.phone")}</span>}
                />
                <AsideBlock
                  label={t("info.addressLabel")}
                  value={<span className="text-body text-foreground">{t("info.address")}</span>}
                />
                <AsideBlock
                  label={t("info.hoursLabel")}
                  value={<span className="text-small text-muted-foreground">{t("info.hours")}</span>}
                />
              </div>
            </FadeIn>
          </aside>

          {/* Form panel — col-span-7, --radius-xl (36px), bg-surface */}
          <FadeIn delay={0.15} className="lg:col-span-7">
            <div className="rounded-xl bg-surface p-8 shadow-md md:p-12">
              <ContactForm locale={locale} productSlug={productSlug} />
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* LocalBusiness — contact page is the canonical NAP surface for
          crawlers; the schema mirrors the address + phone shown above. */}
      <JsonLd data={localBusinessSchema(locale)} />
    </section>
  );
}

function AsideBlock({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border-l border-accent/60 pl-4">
      <span className="text-eyebrow text-accent">{label}</span>
      {value}
    </div>
  );
}
