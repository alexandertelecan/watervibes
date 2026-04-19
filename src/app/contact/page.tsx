import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  alternatesFor,
  localBusinessSchema,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";

type PageSearch = { product?: string | string[] };

const META_TITLE = "Contact · Cereți o Ofertă de Jacuzzi";
const META_DESCRIPTION =
  "Spuneți-ne despre spațiu. Grădină, terasă, interior, pensiune, hotel. Revenim într-o zi lucrătoare cu jacuzzi potriviți și prețul cu livrare în România.";

const T = {
  eyebrow: "Luați legătura",
  title: "Cereți o ofertă pentru jacuzzi exterior",
  description:
    "Spuneți-ne despre spațiu. Terasă, grădină, interior, pensiune, hotel. Revenim într-o zi lucrătoare cu jacuzzi potriviți, prețul cu livrare pentru România și pașii de instalare.",
  pullquote:
    "Relaxarea reală nu ar trebui să fie un lux ocazional. Ar trebui să facă parte din viața normală.",
  pullquoteAttribution: "WaterVibe · ENSAMA SRL",
  info: {
    emailLabel: "Email",
    email: "hello@watervibe.ro",
    phoneLabel: "Telefon · WhatsApp",
    phone: "+40 726 793 993",
    addressLabel: "Sediu",
    address: "Bulevardul Carol I 90, Câmpina, Prahova",
    hoursLabel: "Program",
    hours: "Luni până Vineri · 9:00 până 18:00 · răspuns într-o zi lucrătoare",
  },
};

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: alternatesFor("/contact"),
  openGraph: openGraphFor("/contact", {
    title: META_TITLE,
    description: META_DESCRIPTION,
  }),
  twitter: twitterFor({ title: META_TITLE, description: META_DESCRIPTION }),
};

function normalizeSlug(value: string | string[] | undefined): string | undefined {
  if (!value) return undefined;
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed && trimmed.length <= 120 ? trimmed : undefined;
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<PageSearch>;
}) {
  const { product } = await searchParams;
  const productSlug = normalizeSlug(product);

  return (
    <section className="pt-12 pb-24 md:pt-16 md:pb-32">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="flex flex-col gap-12 lg:col-span-5">
            <FadeIn underline>
              <div className="flex flex-col gap-4">
                <span className="text-eyebrow text-accent">{T.eyebrow}</span>
                <h1 className="text-h1 text-foreground">{T.title}</h1>
                <p className="text-lede text-muted-foreground">{T.description}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <figure className="flex flex-col gap-4">
                <blockquote
                  className="text-lede italic text-foreground"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  &ldquo;{T.pullquote}&rdquo;
                </blockquote>
                <figcaption className="text-eyebrow text-muted-foreground">
                  {T.pullquoteAttribution}
                </figcaption>
              </figure>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col gap-6">
                <AsideBlock
                  label={T.info.emailLabel}
                  value={
                    <a
                      href={`mailto:${T.info.email}`}
                      className="text-body text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {T.info.email}
                    </a>
                  }
                />
                <AsideBlock
                  label={T.info.phoneLabel}
                  value={<span className="text-body text-foreground">{T.info.phone}</span>}
                />
                <AsideBlock
                  label={T.info.addressLabel}
                  value={<span className="text-body text-foreground">{T.info.address}</span>}
                />
                <AsideBlock
                  label={T.info.hoursLabel}
                  value={<span className="text-small text-muted-foreground">{T.info.hours}</span>}
                />
              </div>
            </FadeIn>
          </aside>

          <FadeIn delay={0.15} className="lg:col-span-7">
            <div className="rounded-xl bg-surface p-8 shadow-md md:p-12">
              <ContactForm productSlug={productSlug} />
            </div>
          </FadeIn>
        </div>
      </Container>

      <JsonLd data={localBusinessSchema()} />
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
