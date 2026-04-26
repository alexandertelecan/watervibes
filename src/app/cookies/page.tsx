import type { Metadata } from "next";

import { FloatingShape } from "@/components/home/FloatingShape";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import {
  alternatesFor,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";

const META_TITLE = "Politica de Cookies · WaterVibe";
const META_DESCRIPTION =
  "Site-ul www.watervibe.ro folosește cookies esențiale și de analiză pentru funcționare și statistici. Aflați tipurile utilizate și cum modificați setările.";

const T = {
  hero: {
    eyebrow: "Informații",
    title: "Politica de cookies.",
    lede: "Site-ul www.watervibe.ro folosește cookies pentru funcționare și statistici. Mai jos găsiți tipurile utilizate și modul în care puteți controla preferințele.",
  },
  intro: {
    title: "Despre cookies",
    body: "Cookies sunt fișiere de mici dimensiuni stocate în browser-ul dumneavoastră atunci când vizitați un site. Sunt folosite pentru ca site-ul să funcționeze corect și pentru a colecta informații despre modul în care este utilizat.",
  },
  types: {
    title: "Tipuri de cookies",
    lede: "Pe acest site folosim două categorii:",
    items: [
      {
        label: "Esențiale",
        body: "Necesare pentru funcționarea site-ului. Permit navigarea, plasarea comenzilor și păstrarea preferințelor de bază.",
      },
      {
        label: "De analiză",
        body: "Ne ajută să înțelegem cum este utilizat site-ul, prin colectarea de statistici agregate și anonime privind paginile vizitate.",
      },
    ],
  },
  purpose: {
    title: "Scop",
    body: "Cookies sunt folosite pentru funcționarea site-ului și pentru statistici de utilizare.",
  },
  control: {
    title: "Controlul cookies",
    body: "Puteți modifica setările privind cookies direct din browser-ul dumneavoastră. Majoritatea browserelor permit blocarea sau ștergerea cookies. Dezactivarea acestora poate afecta funcționarea anumitor secțiuni ale site-ului.",
  },
};

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: alternatesFor("/cookies"),
  openGraph: openGraphFor("/cookies", {
    title: META_TITLE,
    description: META_DESCRIPTION,
  }),
  twitter: twitterFor({ title: META_TITLE, description: META_DESCRIPTION }),
};

export default function CookiesPage() {
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
                <h2 className="text-h2 text-foreground">{T.intro.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.intro.body}
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.05}>
              <article className="flex flex-col gap-6 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.types.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.types.lede}
                </p>
                <ul className="flex flex-col gap-5 text-body text-foreground/80">
                  {T.types.items.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-baseline gap-3 border-b border-border/60 pb-5"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-accent"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground">
                          {item.label}
                        </span>
                        <span className="text-pretty">{item.body}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>

            <FadeIn delay={0.1}>
              <article className="flex flex-col gap-5 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.purpose.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.purpose.body}
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.15}>
              <article className="flex flex-col gap-5 border-t border-border pt-10">
                <h2 className="text-h2 text-foreground">{T.control.title}</h2>
                <p className="text-pretty text-body text-foreground/80">
                  {T.control.body}
                </p>
              </article>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
