import type { Metadata } from "next";

import { FloatingShape } from "@/components/home/FloatingShape";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import {
  alternatesFor,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";

const META_TITLE = "Politica de Retur · WaterVibe";
const META_DESCRIPTION =
  "Drept de retragere în 14 zile pentru clienții persoane fizice. Vedeți condițiile, formularul de retur și procesul de rambursare WaterVibe.";

const T = {
  hero: {
    eyebrow: "Informații",
    title: "Politica de retur.",
    lede: "Drept de retragere în 14 zile calendaristice pentru clienții persoane fizice. Mai jos găsiți pașii, condițiile și informațiile necesare pentru returul unui produs.",
  },
  rightOfWithdrawal: {
    title: "Drept de retragere",
    body: "Clientul persoană fizică are dreptul de retragere în 14 zile calendaristice de la primirea produsului, fără a fi nevoie să justifice decizia.",
  },
  form: {
    title: "Formular de retragere",
    lede: "Pentru a iniția returul, trimiteți următoarele informații pe e-mail:",
    fields: [
      "Nume",
      "Adresă",
      "Telefon",
      "Email",
      "Număr comandă",
      "Produs returnat",
      "Data primirii",
      "Cont bancar pentru rambursare",
    ],
    sendTo: {
      label: "Trimiteți cererea la",
      email: "office@watervibe.ro",
    },
  },
  conditions: {
    title: "Condiții",
    lede: "Produsul trebuie returnat:",
    items: [
      "Neutilizat",
      "Fără urme de uzură",
      "În ambalaj original",
      "Cu toate accesoriile",
    ],
  },
  costs: {
    title: "Costuri",
    body: "Transportul de retur este suportat de client.",
  },
  refund: {
    title: "Rambursare",
    body: "Rambursarea se face în maximum 14 zile de la primirea produsului returnat, în contul bancar indicat în formularul de retragere.",
  },
};

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: alternatesFor("/retur"),
  openGraph: openGraphFor("/retur", {
    title: META_TITLE,
    description: META_DESCRIPTION,
  }),
  twitter: twitterFor({ title: META_TITLE, description: META_DESCRIPTION }),
};

export default function ReturPage() {
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
                <h2 className="text-h2 text-foreground">
                  {T.rightOfWithdrawal.title}
                </h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.rightOfWithdrawal.body}
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.05}>
              <article className="flex flex-col gap-6 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.form.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.form.lede}
                </p>
                <ul className="grid gap-x-10 gap-y-3 text-body text-foreground/80 sm:grid-cols-2">
                  {T.form.fields.map((field) => (
                    <li
                      key={field}
                      className="flex items-baseline gap-3 border-b border-border/60 pb-3"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent"
                      />
                      <span>{field}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-pretty text-body text-foreground/80">
                  {T.form.sendTo.label}{" "}
                  <a
                    href={`mailto:${T.form.sendTo.email}`}
                    className="font-semibold text-foreground underline underline-offset-4 decoration-border transition-colors hover:text-accent hover:decoration-accent focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {T.form.sendTo.email}
                  </a>
                  .
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.1}>
              <article className="flex flex-col gap-6 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.conditions.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.conditions.lede}
                </p>
                <ul className="flex flex-col gap-3 text-body text-foreground/80">
                  {T.conditions.items.map((item) => (
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
                <h2 className="text-h2 text-foreground">{T.costs.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.costs.body}
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.2}>
              <article className="flex flex-col gap-5 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.refund.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.refund.body}
                </p>
              </article>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
