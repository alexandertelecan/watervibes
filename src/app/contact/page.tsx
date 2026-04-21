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

const META_TITLE = "Contact · Cereți o Ofertă de Jacuzzi";
const META_DESCRIPTION =
  "Spuneți-ne despre spațiu. Grădină, terasă, interior, pensiune, hotel. Revenim într-o zi lucrătoare cu jacuzzi potriviți și prețul cu livrare în România.";

const T = {
  hero: {
    titleLead: "Spuneți-ne despre spațiu. Revenim cu",
    titleEmphasis: "modelul potrivit.",
    description:
      "Terasă, grădină, interior, pensiune, hotel. Răspundem într-o zi lucrătoare cu jacuzzi-ul potrivit, prețul cu livrare pentru România și pașii de instalare.",
  },
  formCaption: "Formular · 4 câmpuri · răspuns într-o zi lucrătoare",
  pullquote:
    "Relaxarea reală nu ar trebui să fie un lux ocazional. Ar trebui să facă parte din viața normală.",
  pullquoteAttribution: "WaterVibe · ENSAMA SRL",
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
      meta: "Vizite cu programare.",
    },
    {
      label: "Program",
      value: "Luni până Vineri · 9:00 până 18:00",
      meta: "Răspuns într-o zi lucrătoare.",
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
            <circle cx="120" cy="120" r="110" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="120" cy="120" r="72" fill="none" stroke="currentColor" strokeWidth="2" />
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
            <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="82" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/25 md:block md:bottom-16 md:left-[42%] md:h-8 md:w-44"
          range={100}
          bob={7}
          bobDuration={5.2}
        >
          <svg viewBox="0 0 160 32" className="h-full w-full" preserveAspectRatio="none">
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
                <span className="italic font-normal text-accent-foreground/90">
                  {T.hero.titleEmphasis}
                </span>
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

      <section className="relative bg-surface py-24 md:py-32">
        <Container as="div" size="wide">
          <div className="grid gap-16 md:grid-cols-12 md:gap-x-14 md:gap-y-20 lg:gap-x-20">
            <FadeIn
              delay={0.05}
              className="order-1 md:order-0 md:col-span-7 md:col-start-6"
            >
              <div className="border-t border-border pt-8 md:pt-10">
                <span className="text-small text-muted-foreground">
                  {T.formCaption}
                </span>
                <div className="mt-8 md:mt-10">
                  <ContactForm productSlug={productSlug} />
                </div>
              </div>
            </FadeIn>

            <aside className="order-2 flex flex-col gap-16 md:order-0 md:col-span-5 md:col-start-1 md:row-start-1">
              <FadeIn>
                <figure className="relative pl-6 md:pl-10">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 left-0 top-1 w-0.5 bg-accent"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1 -top-6 select-none text-[5.5rem] leading-none text-accent/20 md:-top-10 md:text-[8rem]"
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontWeight: 700,
                    }}
                  >
                    &ldquo;
                  </span>
                  <blockquote
                    className="relative text-pretty text-h3 font-normal leading-[1.45] text-foreground"
                    style={{ fontFamily: "var(--font-fraunces), serif" }}
                  >
                    {T.pullquote}
                  </blockquote>
                  <figcaption className="mt-6 text-small text-muted-foreground">
                    — {T.pullquoteAttribution}
                  </figcaption>
                </figure>
              </FadeIn>

              <FadeIn delay={0.08}>
                <dl className="border-t border-border">
                  {T.info.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-1 gap-2 border-b border-border py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-8 md:gap-y-1 md:py-7"
                    >
                      <dt className="text-small text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className="flex flex-col gap-1">
                        {"href" in row && row.href ? (
                          <a
                            href={row.href}
                            className="text-body text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <span className="text-body text-foreground">
                            {row.value}
                          </span>
                        )}
                        {"meta" in row && row.meta ? (
                          <span className="text-small text-muted-foreground">
                            {row.meta}
                          </span>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeIn>
            </aside>
          </div>
        </Container>
      </section>

      <JsonLd data={localBusinessSchema()} />
    </>
  );
}
