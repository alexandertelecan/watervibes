import type { Metadata } from "next";

import { FloatingShape } from "@/components/home/FloatingShape";
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

const META_TITLE = "Contact · Hai să vorbim de Jacuzzi";
const META_DESCRIPTION =
  "Spuneți-ne despre spațiu. Grădină, terasă, interior, pensiune, hotel. Revenim într-o zi lucrătoare cu jacuzzi potriviți și prețul cu livrare în România.";

const T = {
  hero: {
    titleLead: "Contactează-ne",
    description:
      "Echipa WaterVibe te ajută să alegi modelul potrivit nevoilor tale.",
  },
  infoEyebrow: "Detalii de contact",
  info: [
    {
      label: "Email",
      value: "office@watervibe.ro",
      href: "mailto:office@watervibe.ro",
    },
    {
      label: "Telefon · WhatsApp",
      value: "+40 726 793 993",
      href: "tel:+40726793993",
    },
    {
      label: "Sediu",
      value: "Bulevardul Carol I 90, Câmpina, Prahova",
    },
    {
      label: "Program",
      value: "Luni — Vineri · 9:00 — 18:00",
    },
  ] as const,
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

function normalizeSlug(
  value: string | string[] | undefined,
): string | undefined {
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
    <>
      <section className="relative isolate overflow-hidden bg-accent py-20 text-accent-foreground md:py-28">
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/25 md:block md:-top-12 md:-right-10 md:h-44 md:w-44"
          range={180}
          rotate={-22}
          bob={13}
          bobDuration={5.6}
        >
          <svg viewBox="0 0 240 240" className="h-full w-full">
            <circle
              cx="120"
              cy="120"
              r="110"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="120"
              cy="120"
              r="72"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/20 md:block md:-bottom-20 md:-left-14 md:h-60 md:w-60"
          range={140}
          rotate={18}
          bob={10}
          bobDuration={6.8}
        >
          <svg viewBox="0 0 240 240" className="h-full w-full">
            <circle
              cx="120"
              cy="120"
              r="112"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="120"
              cy="120"
              r="82"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="120"
              cy="120"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="120"
              cy="120"
              r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/25 md:block md:bottom-16 md:left-[42%] md:h-8 md:w-44"
          range={100}
          bob={7}
          bobDuration={5.2}
        >
          <svg
            viewBox="0 0 160 32"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 16 Q 20 4 40 16 T 80 16 T 120 16 T 160 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden size-2 rounded-full bg-accent-foreground/50 md:block md:top-20 md:left-[44%]"
          range={90}
          bob={11}
          bobDuration={3.8}
        >
          <span className="block h-full w-full" />
        </FloatingShape>

        <Container as="div" size="wide" className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-7">
              <h1 className="text-balance text-display text-accent-foreground">
                {T.hero.titleLead}{" "}
              </h1>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-5 md:col-start-8">
              <p className="text-pretty text-lede text-accent-foreground/80">
                {T.hero.description}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="relative bg-background py-24 md:py-32">
        <Container as="div" size="wide">
          <div className="grid gap-16 md:grid-cols-12 md:gap-x-16 md:gap-y-24 lg:gap-x-24">
            <aside className="order-2 flex flex-col gap-10 md:order-0 md:col-span-5 md:row-start-1 md:gap-12">
              <FadeIn delay={0.08}>
                <p className="text-eyebrow text-accent">{T.infoEyebrow}</p>
              </FadeIn>

              <FadeIn delay={0.12}>
                <dl className="flex flex-col gap-10 md:gap-12">
                  {T.info.map((row) => (
                    <div key={row.label} className="flex flex-col gap-2">
                      <dt className="text-small text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd>
                        {"href" in row && row.href ? (
                          <a
                            href={row.href}
                            className="text-h3 font-normal text-foreground underline-offset-4 transition-colors hover:text-accent focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <span className="text-h3 font-normal text-foreground">
                            {row.value}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>
            </aside>

            <FadeIn
              delay={0.05}
              className="order-1 md:order-0 md:col-span-6 md:col-start-7"
            >
              <ContactForm productSlug={productSlug} />
            </FadeIn>
          </div>
        </Container>
      </section>

      <JsonLd data={localBusinessSchema()} />
    </>
  );
}
