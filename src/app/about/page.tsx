import { ArrowRight, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FloatingShape } from "@/components/home/FloatingShape";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  BUSINESS,
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
    title: "Aducem jacuzzi-ul aproape de casele, pensiunile și hotelurile din România.",
    subhead:
      "Trei răspunsuri simple. De ce există WaterVibe, cum alegem fiecare model și ce primiți efectiv când comandați. Cu livrare și suport în toată țara.",
  },
  story: {
    eyebrow: "De ce existăm",
    title: "Relaxarea reală nu ar trebui să fie un lux ocazional.",
    lede: "O găsim în vacanțe sau în centre spa. Apoi o pierdem când ne întoarcem acasă. Noi credem că ar trebui să facă parte din viața de zi cu zi.",
    paragraphs: [
      "Fiecare casă, fiecare pensiune, fiecare hotel poate avea un loc dedicat eliberării. Un spațiu unde corpul se destinde, mintea iese din ritmul zilei, iar timpul petrecut cu familia sau cu oaspeții devine memorabil.",
      "Apa face treaba. Hidromasajul destinde tensiunea musculară. Căldura scoate încleștarea din umeri. Jeturile pornesc circulația. În câteva minute sunteți în altă parte.",
      "Asta e WaterVibe. Nu vindem jacuzzi. Vindem serile care urmează după.",
    ],
  },
  curation: {
    eyebrow: "Cum alegem fiecare model",
    title: "Un singur criteriu. Să se potrivească la cât mai multe spații și stiluri din România.",
    lede: "Verificăm confortul, calitatea materialelor, performanța hidromasajului și fiabilitatea sistemelor tehnice. Fiecare model din colecție își merită locul.",
    principles: [
      {
        n: "01",
        title: "Gama acoperă nevoi reale",
        body: "Cadă cu hidromasaj pentru două persoane, pentru cupluri. Modele de patru locuri, pentru familie. Jacuzzi exterior pentru șase persoane, pentru pensiuni, hoteluri și grupuri de prieteni. Compacte pentru terase strâmte. Spațioase pentru proprietăți mari.",
      },
      {
        n: "02",
        title: "Hidromasaj pe grupe de mușchi",
        body: "Configurațiile de jeturi diferă de la model la model. Fiecare scaun masează altă zonă. Gât, spate, lombari, gambe. Simțiți cum pleacă ziua, punct cu punct.",
      },
      {
        n: "03",
        title: "Designul contează cât specificațiile",
        body: "Alegem finisaje care se așează bine atât în spații moderne, cât și clasice. Un jacuzzi trebuie să completeze terasa sau grădina, nu să le concureze.",
      },
      {
        n: "04",
        title: "Tehnologie cu cap",
        body: "Filtrarea, încălzirea și controlul apei sunt alese mai întâi pentru confort, apoi pentru un consum de energie pe care îl puteți ține pe termen lung.",
      },
    ],
    closer:
      "Ultimul pas este discuția. Ne uităm la spațiu, la câte persoane vor folosi cada și la cum se integrează cu terasa sau interiorul existent. Plecați cu modelul potrivit, prețul livrat în România și pașii tehnici pentru instalare.",
  },
  delivery: {
    eyebrow: "Ce primiți efectiv",
    title: "Jacuzzi moderne cu hidromasaj, alese ca să se simtă tot jacuzzi și peste doi ani.",
    points: [
      {
        title: "Alegere deschisă",
        body: "Modele de interior sau exterior. Dimensiuni diferite. Capacități diferite. Scheme diferite de jeturi. Finisaje diferite. Găsiți unul care se potrivește spațiului și stilului, fără să cedați pe calitate.",
      },
      {
        title: "Pentru pensiuni și hoteluri",
        body: "Un jacuzzi exterior ridică proprietatea. Apare în recenzii. Discutăm cu dumneavoastră fluxul de utilizare, ritmul de curățare și cum se încadrează cada în oferta de cazare.",
      },
      {
        title: "Consultanță inclusă",
        body: "Vă explicăm diferențele dintre modele și vă ajutăm să alegeți varianta potrivită numărului de persoane și felului în care o veți folosi.",
      },
      {
        title: "Preț complet, pași clari",
        body: "Primiți prețul cu livrare în România incluse și pașii de instalare, înainte să luați decizia.",
      },
    ],
  },
  ensama: {
    eyebrow: "Firmă · România",
    title: "Operat de ENSAMA SRL, Câmpina.",
    description:
      "WaterVibe este marca sub care ENSAMA SRL alege, livrează și oferă suport pentru jacuzzi exterior în toată România. Sediu în Câmpina, județul Prahova.",
    rows: [
      {
        label: "Firmă",
        value: "ENSAMA SRL",
        meta: null,
      },
      {
        label: "Sediu",
        value: "Bulevardul Carol I 90, Câmpina, Prahova",
        meta: "Vizite cu programare.",
      },
      {
        label: "Livrăm în",
        value: "Toată România",
        meta: "Suport tehnic inclus, oriunde în țară.",
      },
    ],
    phone: "+40 726 793 993",
    phoneLabel: "Telefon · WhatsApp",
    facebookLabel: "Facebook",
    socialEyebrow: "Ne găsiți pe",
  },
  cta: {
    eyebrow: "Pasul următor",
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
      <section className="relative isolate overflow-hidden bg-accent py-20 text-accent-foreground md:py-28">
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent-foreground/25 md:block md:-top-10 md:-right-10 md:h-40 md:w-40"
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
            <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="82" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
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
            <circle cx="16" cy="36" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="34" cy="22" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="44" cy="42" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </FloatingShape>

        <Container as="div" size="wide" className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-7">
              <h1 className="text-balance text-display text-accent-foreground">
                {T.hero.title}
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

      <section className="relative bg-background py-24 md:py-32">
        <Container as="div" size="wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
            <FadeIn className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <div className="relative">
                  <ImagePlaceholder
                    role="Why we exist"
                    aspect="aspect-4/5"
                    className="rounded-(--radius-xl) shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 -right-4 flex items-baseline gap-3 rounded-full bg-background px-5 py-3 shadow-[0_8px_28px_-12px_color-mix(in_oklab,var(--accent)_30%,transparent)] md:-right-6"
                  >
                    <span
                      className="font-heading text-h3 leading-none text-accent tabular-nums"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      01
                    </span>
                    <span className="text-eyebrow text-muted-foreground">Povestea</span>
                  </div>
                  <FloatingShape
                    className="pointer-events-none absolute hidden text-accent/30 md:block md:-top-8 md:-left-8 md:h-20 md:w-20"
                    range={120}
                    rotate={-18}
                    bob={10}
                    bobDuration={5.2}
                  >
                    <svg viewBox="0 0 200 200" className="h-full w-full">
                      <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="2.5" />
                      <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </FloatingShape>
                </div>
              </div>
            </FadeIn>

            <div className="flex flex-col gap-10 md:col-span-7 md:col-start-6">
              <FadeIn>
                <span className="text-eyebrow text-accent">{T.story.eyebrow}</span>
                <h2 className="mt-4 text-balance text-h1 text-foreground">
                  {T.story.title}
                </h2>
              </FadeIn>

              <FadeIn delay={0.08} underline>
                <p
                  className="text-pretty text-lede italic text-foreground/85"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  {T.story.lede}
                </p>
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

      <section className="relative isolate overflow-hidden bg-surface py-24 md:py-32">
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent/15 md:block md:-top-16 md:right-[8%] md:h-40 md:w-40"
          range={200}
          rotate={-24}
          bob={14}
          bobDuration={6.2}
        >
          <svg viewBox="0 0 240 240" className="h-full w-full">
            <circle cx="120" cy="120" r="110" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="120" cy="120" r="72" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden size-2 rounded-full bg-accent/40 md:block md:top-24 md:left-[12%]"
          range={80}
          bob={10}
          bobDuration={3.6}
        >
          <span className="block h-full w-full" />
        </FloatingShape>

        <Container as="div" size="wide" className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-6">
              <span className="text-eyebrow text-accent">{T.curation.eyebrow}</span>
              <h2 className="mt-4 text-balance text-h1 text-foreground">
                {T.curation.title}
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-5 md:col-start-8">
              <p className="text-pretty text-lede text-muted-foreground">
                {T.curation.lede}
              </p>
            </FadeIn>
          </div>

          <ol className="mt-16 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-x-16 md:gap-y-16 lg:gap-x-24">
            {T.curation.principles.map((p, i) => (
              <FadeIn
                key={p.n}
                delay={0.06 + i * 0.05}
                className={i % 2 === 1 ? "md:pt-14" : undefined}
              >
                <li className="flex flex-col">
                  <span
                    className="font-heading text-[2.75rem] leading-none text-accent tabular-nums md:text-[3.25rem]"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {p.n}
                  </span>
                  <h3 className="mt-6 text-h3 text-foreground">{p.title}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-10 bg-accent"
                  />
                  <p className="mt-5 text-pretty text-body text-foreground/75">
                    {p.body}
                  </p>
                </li>
              </FadeIn>
            ))}
          </ol>

          <FadeIn delay={0.2} className="mt-20 md:mt-28">
            <div className="relative max-w-4xl pl-6 md:pl-10">
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-0 top-1 w-0.5 bg-accent"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-1 -top-6 select-none text-[6rem] leading-none text-accent/20 md:-top-10 md:text-[9rem]"
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 700,
                }}
              >
                &ldquo;
              </span>
              <p
                className="relative text-pretty text-h3 font-normal leading-[1.45] text-foreground"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                {T.curation.closer}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="relative bg-background py-24 md:py-32">
        <Container as="div" size="wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
            <div className="md:col-span-5">
              <FadeIn>
                <span className="text-eyebrow text-accent">{T.delivery.eyebrow}</span>
                <h2 className="mt-4 text-balance text-h1 text-foreground">
                  {T.delivery.title}
                </h2>
              </FadeIn>

              <FadeIn delay={0.12} className="mt-12 md:mt-16">
                <div className="relative">
                  <ImagePlaceholder
                    role="What you receive"
                    aspect="aspect-4/5"
                    className="rounded-(--radius-xl) shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
                  />
                  <FloatingShape
                    className="pointer-events-none absolute hidden text-accent/25 md:block md:-right-8 md:-bottom-8 md:h-24 md:w-24"
                    range={100}
                    rotate={22}
                    bob={9}
                    bobDuration={5.4}
                  >
                    <svg viewBox="0 0 200 200" className="h-full w-full">
                      <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="2.5" />
                      <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </FloatingShape>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.08} className="md:col-span-7 md:col-start-6">
              <dl className="border-t border-border">
                {T.delivery.points.map((pt, i) => (
                  <div
                    key={pt.title}
                    className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2 border-b border-border py-8 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.6fr)] md:gap-x-10 md:py-10"
                  >
                    <span
                      aria-hidden="true"
                      className="col-start-1 row-span-2 mt-1 font-heading text-small font-semibold text-accent tabular-nums md:row-span-1 md:self-start"
                      style={{ letterSpacing: "0.04em" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="col-start-2 text-h3 text-foreground">
                      {pt.title}
                    </dt>
                    <dd className="col-span-2 col-start-1 text-pretty text-body text-foreground/75 md:col-span-1 md:col-start-3 md:row-start-1">
                      {pt.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-surface py-24 md:py-28">
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent/12 md:block md:-bottom-16 md:-left-12 md:h-48 md:w-48"
          range={160}
          rotate={18}
          bob={10}
          bobDuration={6.2}
        >
          <svg viewBox="0 0 240 240" className="h-full w-full">
            <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="82" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </FloatingShape>

        <Container as="div" size="wide" className="relative">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <FadeIn>
                <span className="text-eyebrow text-accent">{T.ensama.eyebrow}</span>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="mt-4 text-h1 text-foreground">{T.ensama.title}</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 max-w-md text-lede text-muted-foreground">
                  {T.ensama.description}
                </p>
              </FadeIn>
            </div>

            <FadeIn className="md:col-span-7 md:pt-2" delay={0.15}>
              <dl className="divide-y divide-border border-y border-border">
                {T.ensama.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1 py-6 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-10 md:py-7"
                  >
                    <dt className="text-eyebrow text-accent">{row.label}</dt>
                    <dd className="flex flex-col gap-1">
                      <span className="text-body text-foreground">
                        {row.value}
                      </span>
                      {row.meta ? (
                        <span className="text-small text-muted-foreground">
                          {row.meta}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
                <div className="grid gap-1 py-6 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-10 md:py-7">
                  <dt className="text-eyebrow text-accent">
                    {T.ensama.phoneLabel}
                  </dt>
                  <dd>
                    <a
                      href={`tel:${BUSINESS.phone}`}
                      className="group inline-flex items-center gap-2.5 text-body text-foreground underline-offset-[6px] transition-colors hover:text-accent hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      <Phone
                        aria-hidden="true"
                        className="size-4 text-accent transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-12"
                        strokeWidth={1.75}
                      />
                      <span className="tabular-nums">{T.ensama.phone}</span>
                    </a>
                  </dd>
                </div>
                <div className="grid gap-1 py-6 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-10 md:py-7">
                  <dt className="text-eyebrow text-accent">
                    {T.ensama.socialEyebrow}
                  </dt>
                  <dd>
                    <a
                      href={BUSINESS.social.facebook}
                      rel="me noopener"
                      target="_blank"
                      className="group inline-flex items-center gap-2.5 text-body text-foreground underline-offset-[6px] transition-colors hover:text-accent hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      {T.ensama.facebookLabel}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="size-3.5 text-accent transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        <path
                          d="M6 2h8v8M14 2 2 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </dd>
                </div>
              </dl>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-background py-24 md:py-28">
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent/10 md:block md:top-1/2 md:-left-16 md:h-72 md:w-72 md:-translate-y-1/2"
          range={140}
          rotate={10}
          bob={9}
          bobDuration={6}
        >
          <svg viewBox="0 0 240 240" className="h-full w-full">
            <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="82" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </FloatingShape>
        <FloatingShape
          className="pointer-events-none absolute hidden text-accent/10 md:block md:top-1/2 md:-right-16 md:h-72 md:w-72 md:-translate-y-1/2"
          range={140}
          rotate={-10}
          bob={9}
          bobDuration={6.4}
        >
          <svg viewBox="0 0 240 240" className="h-full w-full">
            <circle cx="120" cy="120" r="112" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="82" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="120" cy="120" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </FloatingShape>

        <Container as="div" size="wide" className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-7">
              <span className="text-eyebrow text-accent">{T.cta.eyebrow}</span>
              <h2 className="mt-4 text-balance text-h1 text-foreground">
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
