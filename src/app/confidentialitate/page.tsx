import type { Metadata } from "next";

import { FloatingShape } from "@/components/home/FloatingShape";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import {
  alternatesFor,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";

const META_TITLE = "Politica de Confidențialitate · WaterVibe";
const META_DESCRIPTION =
  "Politica de confidențialitate WaterVibe. ENSAMA SRL prelucrează datele cu caracter personal pentru procesare comenzi, livrare, facturare și suport clienți.";

const CONTACT_EMAIL = "office@watervibe.ro";

const T = {
  hero: {
    eyebrow: "Document legal",
    title: "Politica de confidențialitate.",
    lede: "ENSAMA SRL prelucrează datele cu caracter personal furnizate prin site-ul www.watervibe.ro în condiții de siguranță și conform legislației aplicabile.",
  },
  operator: {
    title: "Operator",
    body: "ENSAMA SRL este operator de date cu caracter personal.",
  },
  data: {
    title: "Date colectate",
    lede: "Colectăm următoarele categorii de date:",
    items: ["Nume", "Prenume", "Adresă", "Telefon", "Email"],
  },
  purposes: {
    title: "Scopuri",
    lede: "Datele sunt prelucrate pentru:",
    items: [
      "Procesare comenzi",
      "Livrare",
      "Facturare",
      "Suport clienți",
    ],
  },
  legal: {
    title: "Temei legal",
    body: "Executarea contractului și îndeplinirea obligațiilor legale.",
  },
  storage: {
    title: "Stocare",
    body: "Datele se păstrează conform legislației fiscale aplicabile.",
  },
  rights: {
    title: "Drepturi",
    body: "Aveți dreptul de acces, rectificare, ștergere și restricționare a prelucrării datelor cu caracter personal.",
    sendTo: {
      label: "Solicitările se trimit la",
      email: CONTACT_EMAIL,
    },
  },
};

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: alternatesFor("/confidentialitate"),
  openGraph: openGraphFor("/confidentialitate", {
    title: META_TITLE,
    description: META_DESCRIPTION,
  }),
  twitter: twitterFor({ title: META_TITLE, description: META_DESCRIPTION }),
};

export default function ConfidentialitatePage() {
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
          </svg>
        </FloatingShape>

        <Container as="div" size="wide" className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-7">
              <p className="text-eyebrow text-accent-foreground/70">
                {T.hero.eyebrow}
              </p>
              <h1 className="mt-4 text-balance text-display text-accent-foreground">
                {T.hero.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-5 md:col-start-8">
              <p className="text-pretty text-lede text-accent-foreground/80">
                {T.hero.lede}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="relative bg-background py-24 md:py-32">
        <Container as="div" size="wide">
          <div className="mx-auto flex max-w-4xl flex-col gap-20 md:gap-24">
            <FadeIn>
              <article className="flex flex-col gap-5 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.operator.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.operator.body}
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.05}>
              <article className="flex flex-col gap-6 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.data.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.data.lede}
                </p>
                <ul className="grid gap-x-10 gap-y-3 text-body text-foreground/80 sm:grid-cols-2">
                  {T.data.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-b border-border/60 pb-3"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>

            <FadeIn delay={0.1}>
              <article className="flex flex-col gap-6 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.purposes.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.purposes.lede}
                </p>
                <ul className="flex flex-col gap-3 text-body text-foreground/80">
                  {T.purposes.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>

            <FadeIn delay={0.15}>
              <article className="flex flex-col gap-5 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.legal.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.legal.body}
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.2}>
              <article className="flex flex-col gap-5 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.storage.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.storage.body}
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.25}>
              <article className="flex flex-col gap-5 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.rights.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.rights.body}
                </p>
                <p className="text-pretty text-body text-foreground/80">
                  {T.rights.sendTo.label}{" "}
                  <a
                    href={`mailto:${T.rights.sendTo.email}`}
                    className="font-semibold text-foreground underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {T.rights.sendTo.email}
                  </a>
                  .
                </p>
              </article>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
