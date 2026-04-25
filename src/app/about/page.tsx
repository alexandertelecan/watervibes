import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FloatingShape } from "@/components/home/FloatingShape";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  alternatesFor,
  localBusinessSchema,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";

const META_TITLE = "Despre WaterVibe · Jacuzzi Exterior în România";
const META_DESCRIPTION =
  "WaterVibe este operat de ENSAMA SRL din Câmpina, Prahova. Alegem, livrăm și oferim suport pentru jacuzzi exterior în case, pensiuni și hoteluri din toată România.";

const T = {
  hero: {
    titleLead:
      "WaterVive a apărut dintr-o idee simplă. Oamenii au nevoie de relaxare reală.",
    titleEmphasis: "mai mult decât o vacanță.",
    subhead:
      "Alegem jacuzzi exterior pe confort, durabilitate și hidromasaj care se simte la fel și peste doi ani. Livrare și suport în toată România.",
  },
  story: {
    title: "Motivul din spate.",
    lede: "O găsim în vacanțe sau în centre spa. Apoi o pierdem când ne întoarcem acasă. Noi credem că ar trebui să facă parte din viața de zi cu zi.",
    paragraphs: [
      "Fiecare casă, fiecare pensiune, fiecare hotel poate avea un loc dedicat eliberării. Un spațiu unde corpul se destinde, mintea iese din ritmul zilei, iar timpul petrecut cu familia sau cu oaspeții devine memorabil.",
      "Apa face treaba. Hidromasajul destinde tensiunea musculară. Căldura scoate încleștarea din umeri. Jeturile pornesc circulația. În câteva minute sunteți în altă parte.",
      "Asta e WaterVibe. Nu vindem jacuzzi. Vindem serile care urmează după.",
    ],
  },
  curation: {
    title:
      "Un singur criteriu. Să se potrivească la cât mai multe spații și stiluri din România.",
    lede: "Verificăm confortul, calitatea materialelor, performanța hidromasajului și fiabilitatea sistemelor tehnice. Fiecare model din colecție își merită locul.",
    principles: [
      {
        title: "Gama acoperă nevoi reale",
        body: "Cadă cu hidromasaj pentru două persoane, pentru cupluri. Modele de patru locuri, pentru familie. Jacuzzi exterior pentru șase persoane, pentru pensiuni, hoteluri și grupuri de prieteni. Compacte pentru terase strâmte. Spațioase pentru proprietăți mari.",
      },
      {
        title: "Hidromasaj pe grupe de mușchi",
        body: "Configurațiile de jeturi diferă de la model la model. Fiecare scaun masează altă zonă. Gât, spate, lombari, gambe. Simțiți cum pleacă ziua, punct cu punct.",
      },
      {
        title: "Designul contează cât specificațiile",
        body: "Alegem finisaje care se așează bine atât în spații moderne, cât și clasice. Un jacuzzi trebuie să completeze terasa sau grădina, nu să le concureze.",
      },
      {
        title: "Tehnologie cu cap",
        body: "Filtrarea, încălzirea și controlul apei sunt alese mai întâi pentru confort, apoi pentru un consum de energie pe care îl puteți ține pe termen lung.",
      },
    ],
    closer:
      "Ultimul pas este discuția. Ne uităm la spațiu, la câte persoane vor folosi cada și la cum se integrează cu terasa sau interiorul existent. Plecați cu modelul potrivit, prețul livrat în România și pașii tehnici pentru instalare.",
  },
  delivery: {
    title:
      "Jacuzzi moderne cu hidromasaj, alese ca să se simtă tot jacuzzi și peste doi ani.",
    lede: "Modele de interior sau exterior, dimensiuni și capacități diferite, scheme variate de jeturi și finisaje. Găsiți unul care se potrivește spațiului și stilului, fără să cedați pe calitate.",
    inlineTerms: [
      {
        term: "Pentru pensiuni și hoteluri",
        body: "un jacuzzi exterior ridică proprietatea și apare în recenzii. Discutăm fluxul de utilizare, ritmul de curățare și cum se încadrează cada în oferta de cazare.",
      },
      {
        term: "Consultanță inclusă",
        body: "explicăm diferențele dintre modele și alegem împreună varianta potrivită numărului de persoane și felului în care o veți folosi.",
      },
      {
        term: "Preț complet, pași clari",
        body: "primiți prețul cu livrare în România incluse și pașii de instalare, înainte să luați decizia.",
      },
    ],
  },
  cta: {
    title: "Spuneți-ne ce spațiu aveți. Vă trimitem modelul potrivit.",
    lede: "Fără formulare lungi. O conversație scurtă, un preț cu livrare inclusă, pașii de instalare. Atât.",
    primary: "Cereți o ofertă",
    secondary: "Vedeți colecția",
  },
};

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: alternatesFor("/about"),
  openGraph: openGraphFor("/about", {
    title: META_TITLE,
    description: META_DESCRIPTION,
  }),
  twitter: twitterFor({ title: META_TITLE, description: META_DESCRIPTION }),
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[90dvh] flex-col justify-end overflow-hidden bg-accent py-20 text-accent-foreground md:py-24">
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/25 md:block md:-top-10 md:-right-10 md:h-40 md:w-40"
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
          className="pointer-events-none absolute hidden size-2 rounded-full bg-accent-foreground/50 md:block md:top-16 md:left-[46%]"
          range={90}
          bob={11}
          bobDuration={3.8}
        >
          <span className="block h-full w-full" />
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/20 md:block md:-bottom-16 md:-left-12 md:h-56 md:w-56"
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
          className="pointer-events-none absolute hidden text-accent-foreground/30 md:block md:bottom-20 md:right-[16%] md:h-12 md:w-10"
          range={120}
          rotate={10}
          bob={9}
          bobDuration={4.4}
        >
          <svg viewBox="0 0 40 48" className="h-full w-full">
            <path
              d="M20 4 C 20 4, 6 22, 6 32 A 14 14 0 0 0 34 32 C 34 22, 20 4, 20 4 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/25 md:block md:bottom-10 md:left-[38%] md:h-8 md:w-40"
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
          className="pointer-events-none absolute hidden size-1.5 rounded-full bg-accent-foreground/60 md:block md:bottom-24 md:right-[8%]"
          range={70}
          bob={9}
          bobDuration={3.2}
        >
          <span className="block h-full w-full" />
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/30 md:block md:top-10 md:left-[22%] md:h-14 md:w-14"
          range={130}
          bob={9}
          bobDuration={5.8}
        >
          <svg viewBox="0 0 56 56" className="h-full w-full">
            <circle
              cx="16"
              cy="36"
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="34"
              cy="22"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="44"
              cy="42"
              r="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
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
                {T.hero.subhead}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="relative bg-background pt-28 pb-20 md:pt-36 md:pb-24">
        <Container as="div" size="wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
            <FadeIn className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <div className="relative aspect-4/5 overflow-hidden rounded-(--radius-xl) shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--accent)_35%,transparent)]">
                  <Image
                    src="https://images.unsplash.com/photo-1682906324513-5370a2e99e1a?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Moment de relaxare"
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeIn>

            <div className="flex flex-col gap-10 md:col-span-7 md:col-start-6">
              <FadeIn>
                <h2 className="text-balance text-h1 text-foreground">
                  {T.story.title}
                </h2>
              </FadeIn>

              <FadeIn delay={0.08}>
                <div className="relative max-w-xl pl-5 md:pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 left-0 top-1 w-0.5 bg-accent"
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.14}>
                <div className="prose-narrow flex flex-col gap-6 text-pretty text-body text-foreground/80">
                  {T.story.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-surface pt-24 pb-20 md:pt-32 md:pb-24">
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent/12 md:block md:-top-16 md:right-[8%] md:h-40 md:w-40"
          range={200}
          rotate={-24}
          bob={14}
          bobDuration={6.2}
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

        <Container as="div" size="wide" className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-7">
              <h2 className="text-balance text-h1 text-foreground">
                {T.curation.title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-4 md:col-start-9">
              <p className="text-pretty text-lede text-muted-foreground">
                {T.curation.lede}
              </p>
            </FadeIn>
          </div>

          <div className="mt-16 grid gap-x-16 gap-y-10 md:mt-24 md:grid-cols-12 md:gap-y-12">
            {T.curation.principles.map((p, i) => (
              <FadeIn
                key={p.title}
                delay={0.06 + i * 0.04}
                className="md:col-span-10 md:col-start-3"
              >
                <div className="flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:gap-14 md:pt-8">
                  <h3 className="text-h3 text-foreground md:w-80 md:shrink-0">
                    {p.title}
                  </h3>
                  <p className="text-pretty text-body text-foreground/75 md:flex-1">
                    {p.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-16 md:mt-24">
            <p className="mx-auto max-w-3xl text-balance text-center text-h3 font-normal italic leading-[1.45] text-foreground md:col-start-2">
              {T.curation.closer}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="relative bg-background pt-28 pb-20 md:pt-36 md:pb-24">
        <Container as="div" size="wide">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="text-balance text-h1 text-foreground">
                {T.delivery.title}
              </h2>
            </FadeIn>

            <FadeIn delay={0.08}>
              <p className="mt-8 text-pretty text-lede text-foreground/80">
                {T.delivery.lede}
              </p>
            </FadeIn>

            <FadeIn delay={0.14}>
              <dl className="mt-14 flex flex-col gap-6 text-body text-foreground/80 md:mt-16">
                {T.delivery.inlineTerms.map((item) => (
                  <div key={item.term} className="text-pretty">
                    <dt className="inline font-semibold text-foreground">
                      {item.term}
                      <span className="mx-2 text-accent" aria-hidden="true">
                        —
                      </span>
                    </dt>
                    <dd className="inline">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-surface pt-24 pb-16 md:pt-32 md:pb-20">
        <Container as="div" size="wide" className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-7">
              <h2 className="text-balance text-h1 text-foreground">
                {T.cta.title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-5 md:col-start-8">
              <p className="text-pretty text-lede text-muted-foreground">
                {T.cta.lede}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button asChild variant="accent" size="md">
                  <Link href="/contact">
                    <span>{T.cta.primary}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
                    />
                  </Link>
                </Button>
                <Link
                  href="/catalog"
                  className="group inline-flex items-center gap-2 text-small font-semibold text-foreground underline underline-offset-[6px] decoration-border transition-colors hover:decoration-accent hover:text-accent focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span>{T.cta.secondary}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 text-accent transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <JsonLd data={localBusinessSchema()} />
    </>
  );
}
