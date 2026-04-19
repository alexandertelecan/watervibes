import type { Metadata } from "next";

import { HomeCTA } from "@/components/home/HomeCTA";
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
import { cn } from "@/lib/utils";

const META_TITLE = "Despre WaterVibe · Jacuzzi Exterior în România";
const META_DESCRIPTION =
  "WaterVibe este operat de ENSAMA SRL din Câmpina, Prahova. Alegem, livrăm și oferim suport pentru jacuzzi exterior în case, pensiuni și hoteluri din toată România.";

const T = {
  hero: {
    eyebrow: "Despre WaterVibe",
    title:
      "Jacuzzi exterior pentru case, pensiuni și hoteluri. Aduși mai aproape de România.",
    subhead:
      "Trei capitole despre de ce există WaterVibe, cum alegem fiecare jacuzzi și ce primiți efectiv. Cu livrare și suport în toată țara.",
  },
  chapter1: {
    eyebrow: "Capitolul 01",
    title: "De ce există WaterVibe",
    p1: "WaterVibe a început dintr-o idee simplă. Relaxarea reală nu ar trebui să fie un lux ocazional pe care îl primiți doar în vacanță.",
    p2: "Fiecare casă, fiecare pensiune, fiecare hotel poate avea un loc dedicat eliberării. Un spațiu unde corpul se eliberează, mintea iese din ritmul zilei, iar timpul petrecut cu familia sau cu oaspeții devine memorabil.",
    p3: "Apa face treaba. Hidromasajul destinde tensiunea musculară. Căldura scoate încleștarea din umeri. Jeturile pornesc circulația. În câteva minute sunteți în altă parte. Asta e WaterVibe. Nu vindem jacuzzi. Vindem serile care urmează după.",
    p4: "Un jacuzzi exterior schimbă spațiul din jurul casei. Terasa devine loc unde vă rupeți de zi. Curtea devine loc de întâlnire. Serile încetinesc. Pentru pensiuni și hoteluri, o proprietate cu jacuzzi devine lucrul despre care oaspeții vorbesc când ajung acasă.",
  },
  chapter2: {
    eyebrow: "Capitolul 02",
    title: "Cum alegem fiecare jacuzzi",
    p1: "WaterVibe are o singură sarcină. Să ofere relaxare prin apă care se potrivește cu cât mai multe spații, stiluri și bugete din România.",
    p2: "Fiecare model își merită locul. Verificăm confortul, calitatea materialelor, performanța hidromasajului și fiabilitatea sistemelor tehnice. Colecția este construită în jurul jacuzzi-urilor exterioare pe care le puteți folosi săptămânal fără să le păziți ca pe niște obiecte fragile.",
    p3: "Gama acoperă nevoi reale. Cadă cu hidromasaj pentru două persoane, pentru cupluri. Modele de patru locuri, pentru întreaga familie. Jacuzzi exterior pentru șase persoane, pentru grupuri de prieteni sau pentru pensiuni și hoteluri mici. Modele compacte pentru terase și curți strâmte. Modele spațioase pentru proprietăți mari.",
    p4: "Configurațiile de jeturi diferă de la model la model. Fiecare scaun masează altă zonă. Gât, spate, lombari, gambe. Simțiți cum pleacă ziua, pe grupe de mușchi.",
    p5: "Designul contează la fel de mult ca specificațiile. Alegem finisaje care se așează bine atât în spații moderne, cât și clasice. Un jacuzzi trebuie să completeze terasa sau grădina, nu să le concureze. Tehnologia merge pe aceeași logică. Filtrarea, încălzirea și controlul apei sunt alese mai întâi pentru confort, apoi pentru un consum de energie cu cap.",
    p6: "Ultimul pas este discuția. Ne uităm la spațiu, la câte persoane vor folosi cada și la cum se integrează cu terasa sau interiorul deja existent. Plecați cu modelul potrivit, prețul livrat în România și pașii tehnici pentru instalare.",
  },
  chapter3: {
    eyebrow: "Capitolul 03",
    title: "Ce primiți efectiv",
    p1: "WaterVibe listează jacuzzi moderne cu hidromasaj pentru case private, pensiuni și hoteluri din România. Fiecare model este ales pentru confort, durabilitate și un hidromasaj care se simte tot hidromasaj și peste doi ani.",
    p2: "În funcție de spațiu și de gust, alegerea se deschide. Modele de interior sau exterior. Dimensiuni diferite. Numere diferite de locuri. Scheme diferite de jeturi. Finisaje diferite. Scopul e simplu. Găsiți un jacuzzi care se potrivește și spațiului, și stilului, fără să cedați pe calitate.",
    p3: "Pentru pensiuni și hoteluri, un jacuzzi exterior ridică proprietatea. Apare în recenzii. Discutăm cu dumneavoastră fluxul de utilizare, ritmul de curățare și cum se încadrează cada în oferta de cazare.",
    p4: "Consultanța face parte din ce oferim. Vă explicăm diferențele dintre modele, vă ajutăm să alegeți varianta potrivită pentru numărul de persoane și pentru felul în care o veți folosi. Primiți preț cu livrare în România și pași clari de instalare.",
  },
  ensama: {
    eyebrow: "Firmă · România",
    title: "Operat de ENSAMA SRL, Câmpina",
    description:
      "WaterVibe este marca sub care ENSAMA SRL alege, livrează și oferă suport pentru jacuzzi exterior în toată România. Sediu în Câmpina, județul Prahova.",
    labels: {
      company: "Firmă",
      address: "Sediu",
      phone: "Telefon · WhatsApp",
      area: "Livrăm în",
      social: "Ne găsiți pe",
    },
    company: "ENSAMA SRL",
    address: "Bulevardul Carol I 90, Câmpina, Prahova",
    phone: "+40 726 793 993",
    area: "Toată România",
    facebookLabel: "Facebook",
  },
  brandTagline:
    "Jacuzzi exterior pentru case, pensiuni și hoteluri din România. Relaxare adevărată, integrată în viața de zi cu zi.",
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

const BACKING_ORDINAL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-fraunces), sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.05em",
  color: "transparent",
  WebkitTextStroke:
    "1.5px color-mix(in oklab, var(--accent) 22%, transparent)",
};

export default function AboutPage() {
  const chapters = [
    { id: "chapter-01", ordinal: "01", eyebrow: T.chapter1.eyebrow, title: T.chapter1.title },
    { id: "chapter-02", ordinal: "02", eyebrow: T.chapter2.eyebrow, title: T.chapter2.title },
    { id: "chapter-03", ordinal: "03", eyebrow: T.chapter3.eyebrow, title: T.chapter3.title },
  ];

  const chapter2Notes = [
    T.chapter2.p2,
    T.chapter2.p3,
    T.chapter2.p4,
    T.chapter2.p5,
    T.chapter2.p6,
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-background">
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -right-32 -top-32 h-112 w-md text-accent/10 md:-right-20 md:-top-24 md:h-144 md:w-xl"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="200" cy="200" r="60" />
            <circle cx="200" cy="200" r="105" />
            <circle cx="200" cy="200" r="150" />
            <circle cx="200" cy="200" r="195" />
            <circle cx="200" cy="200" r="240" />
          </g>
        </svg>

        <Container as="div" size="wide" className="relative pt-10 pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-28">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-4 text-eyebrow">
              <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
              <span className="text-accent">MMXXIV</span>
              <span aria-hidden="true" className="h-px w-10 bg-accent/40" />
              <span className="text-muted-foreground">{T.hero.eyebrow}</span>
              <span aria-hidden="true" className="hidden h-px w-10 bg-border md:inline-block" />
              <span aria-hidden="true" className="hidden tabular-nums text-muted-foreground md:inline">
                N° 01 — 03
              </span>
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-14 lg:gap-20">
            <div className="flex flex-col gap-10 md:col-span-8">
              <FadeIn delay={0.05}>
                <h1 className="text-display text-foreground">{T.hero.title}</h1>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="text-lede max-w-xl text-muted-foreground">{T.hero.subhead}</p>
              </FadeIn>
            </div>

            <FadeIn className="relative md:col-span-4 md:self-end" delay={0.18}>
              <ImagePlaceholder
                role="About / cedar interior"
                aspect="aspect-4/5"
                className="rounded-(--radius-xl) shadow-lg"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -left-6 inline-flex size-24 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md md:size-28"
              >
                <svg viewBox="0 0 64 64" className="size-12 md:size-14">
                  <g fill="none" stroke="currentColor" strokeWidth="1.25">
                    <circle cx="32" cy="32" r="10" />
                    <circle cx="32" cy="32" r="18" />
                    <circle cx="32" cy="32" r="26" />
                  </g>
                </svg>
              </span>
            </FadeIn>
          </div>

          <FadeIn delay={0.28} className="mt-24 md:mt-32">
            <div className="flex items-baseline justify-between">
              <span className="text-eyebrow text-muted-foreground">I · II · III</span>
              <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
            </div>
            <nav aria-label={T.hero.title} className="mt-3 border-t border-border">
              <ul className="flex flex-col">
                {chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <a
                      href={`#${chapter.id}`}
                      className={cn(
                        "group/ch relative flex items-baseline gap-5 border-b border-border py-6 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent md:gap-8 md:py-7",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-h1 leading-none text-accent transition-colors duration-200 group-hover/ch:text-accent-tint"
                      >
                        {chapter.ordinal}
                      </span>
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="text-eyebrow text-muted-foreground">
                          {chapter.eyebrow}
                        </span>
                        <span className="text-h3 text-foreground">{chapter.title}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="mx-2 hidden h-0 flex-1 self-end border-b border-dotted border-border pb-2 transition-colors duration-200 group-hover/ch:border-accent/60 md:block"
                      />
                      <span
                        aria-hidden="true"
                        className="inline-flex shrink-0 items-center self-end pb-1.5 text-accent transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/ch:translate-x-1"
                      >
                        <svg viewBox="0 0 16 16" className="size-4">
                          <path
                            d="M2 8h12M9 4l5 4-5 4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </FadeIn>
        </Container>
      </section>

      <section
        id="chapter-01"
        className="relative scroll-mt-24 bg-background py-28 md:scroll-mt-32 md:py-36 lg:py-40"
      >
        <Container as="div" size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="flex flex-col gap-12 lg:col-span-7">
              <FadeIn>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1 -top-10 select-none text-[8rem] leading-none md:-left-3 md:-top-16 md:text-[13rem]"
                    style={BACKING_ORDINAL_STYLE}
                  >
                    01
                  </span>
                  <div className="relative flex flex-col gap-2 pt-2 md:pt-6">
                    <span className="text-eyebrow text-muted-foreground">
                      {T.chapter1.eyebrow}
                    </span>
                    <h2 className="text-h1 text-foreground">{T.chapter1.title}</h2>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="relative max-w-2xl pl-6 md:pl-8">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-0 top-1 w-0.5 bg-accent"
                  />
                  <p className="text-h3 font-normal leading-[1.45] text-foreground">
                    {T.chapter1.p1}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="prose-narrow flex flex-col gap-6 text-body text-foreground/80">
                  <p>{T.chapter1.p2}</p>
                  <p>{T.chapter1.p3}</p>
                  <p>{T.chapter1.p4}</p>
                </div>
              </FadeIn>
            </div>

            <FadeIn className="lg:col-span-5 lg:self-start" delay={0.2}>
              <div className="lg:sticky lg:top-28">
                <div className="relative">
                  <ImagePlaceholder
                    role="Why we exist"
                    aspect="aspect-4/5"
                    className="rounded-(--radius-xl) shadow-md"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-eyebrow text-muted-foreground shadow-sm backdrop-blur-sm"
                  >
                    <span className="inline-block size-1.5 rounded-full bg-accent" />
                    N° 01
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section
        id="chapter-02"
        className="relative scroll-mt-24 overflow-hidden bg-surface py-28 md:scroll-mt-32 md:py-36 lg:py-40"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -bottom-40 -left-32 h-128 w-lg text-accent/8 md:-bottom-48 md:-left-24 md:h-176 md:w-176"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="200" cy="200" r="60" />
            <circle cx="200" cy="200" r="105" />
            <circle cx="200" cy="200" r="150" />
            <circle cx="200" cy="200" r="195" />
            <circle cx="200" cy="200" r="240" />
          </g>
        </svg>

        <Container as="div" size="wide" className="relative">
          <div className="grid gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-5">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-1 -top-10 select-none text-[8rem] leading-none md:-left-3 md:-top-16 md:text-[13rem]"
                  style={BACKING_ORDINAL_STYLE}
                >
                  02
                </span>
                <div className="relative flex flex-col gap-2 pt-2 md:pt-6">
                  <span className="text-eyebrow text-muted-foreground">
                    {T.chapter2.eyebrow}
                  </span>
                  <h2 className="text-h1 text-foreground">{T.chapter2.title}</h2>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} underline className="md:col-span-7 md:pt-4">
              <p className="text-h3 font-normal leading-[1.4] text-foreground">
                {T.chapter2.p1}
              </p>
            </FadeIn>
          </div>

          <ol className="mt-20 grid gap-12 md:mt-28 md:grid-cols-2 md:gap-x-16 md:gap-y-20 lg:gap-x-24">
            {chapter2Notes.map((body, idx) => (
              <FadeIn
                key={idx}
                delay={0.05 + idx * 0.05}
                className={cn(idx % 2 === 1 && "md:pt-16")}
              >
                <li className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="text-h1 leading-none text-accent"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 max-w-24 bg-accent/40" />
                  </div>
                  <p className="text-body text-foreground/85">{body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </Container>
      </section>

      <section
        id="chapter-03"
        className="relative scroll-mt-24 bg-background py-28 md:scroll-mt-32 md:py-36 lg:py-40"
      >
        <Container as="div" size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <FadeIn className="lg:order-1 lg:col-span-5 lg:self-start" delay={0.18}>
              <div className="lg:sticky lg:top-28">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="col-span-2">
                    <ImagePlaceholder
                      role="Product detail"
                      aspect="aspect-4/5"
                      className="rounded-(--radius-xl) shadow-md"
                    />
                  </div>
                  <ImagePlaceholder
                    role="Finish swatches"
                    aspect="aspect-square"
                    className="rounded-(--radius-lg) shadow-sm"
                  />
                  <ImagePlaceholder
                    role="Terrace setting"
                    aspect="aspect-square"
                    className="rounded-(--radius-lg) shadow-sm"
                  />
                </div>
              </div>
            </FadeIn>

            <div className="flex flex-col gap-10 lg:order-2 lg:col-span-7">
              <FadeIn>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1 -top-10 select-none text-[8rem] leading-none md:-left-3 md:-top-16 md:text-[13rem]"
                    style={BACKING_ORDINAL_STYLE}
                  >
                    03
                  </span>
                  <div className="relative flex flex-col gap-2 pt-2 md:pt-6">
                    <span className="text-eyebrow text-muted-foreground">
                      {T.chapter3.eyebrow}
                    </span>
                    <h2 className="text-h1 text-foreground">{T.chapter3.title}</h2>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.12}>
                <blockquote className="relative overflow-hidden rounded-(--radius-xl) border border-accent/20 bg-accent/5 px-7 py-10 md:px-11 md:py-14">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1 -top-2 select-none text-[7rem] leading-none text-accent/30 md:-left-1 md:-top-6 md:text-[11rem]"
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontWeight: 700,
                    }}
                  >
                    &ldquo;
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 200"
                    className="pointer-events-none absolute -bottom-16 -right-16 size-48 text-accent/15 md:size-56"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="100" cy="100" r="30" />
                      <circle cx="100" cy="100" r="52" />
                      <circle cx="100" cy="100" r="74" />
                      <circle cx="100" cy="100" r="96" />
                    </g>
                  </svg>
                  <p className="relative z-10 max-w-2xl pl-10 text-h3 font-normal leading-[1.45] text-foreground md:pl-14">
                    {T.chapter3.p1}
                  </p>
                </blockquote>
              </FadeIn>

              <FadeIn delay={0.18}>
                <div className="prose-narrow flex flex-col gap-6 text-body text-foreground/80">
                  <p>{T.chapter3.p2}</p>
                  <p>{T.chapter3.p3}</p>
                  <p>{T.chapter3.p4}</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-surface py-24 md:py-28">
        <Container as="div" size="wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <FadeIn>
                <div className="flex items-center gap-3 text-eyebrow text-accent">
                  <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
                  <span>{T.ensama.eyebrow}</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="mt-6 text-h1 text-foreground">{T.ensama.title}</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-6 max-w-md text-lede text-muted-foreground">
                  {T.ensama.description}
                </p>
              </FadeIn>
            </div>

            <FadeIn className="md:col-span-7 md:pt-2" delay={0.15}>
              <dl className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <NapRow label={T.ensama.labels.company} value={T.ensama.company} />
                <NapRow label={T.ensama.labels.address} value={T.ensama.address} />
                <NapRow
                  label={T.ensama.labels.phone}
                  value={
                    <a
                      href={`tel:${BUSINESS.phone}`}
                      className="text-body text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      {T.ensama.phone}
                    </a>
                  }
                />
                <NapRow label={T.ensama.labels.area} value={T.ensama.area} />
                <NapRow
                  className="sm:col-span-2 sm:border-l-0"
                  label={T.ensama.labels.social}
                  value={
                    <a
                      href={BUSINESS.social.facebook}
                      rel="me noopener"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-body text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                    >
                      <span>{T.ensama.facebookLabel}</span>
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5">
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
                  }
                />
              </dl>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-background py-24 md:py-32">
        <svg
          aria-hidden="true"
          viewBox="0 0 240 240"
          className="pointer-events-none absolute -left-12 top-1/2 size-64 -translate-y-1/2 text-accent/10 md:left-12 md:size-80"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="120" cy="120" r="30" />
            <circle cx="120" cy="120" r="52" />
            <circle cx="120" cy="120" r="74" />
            <circle cx="120" cy="120" r="96" />
            <circle cx="120" cy="120" r="118" />
          </g>
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 240 240"
          className="pointer-events-none absolute -right-12 top-1/2 size-64 -translate-y-1/2 text-accent/10 md:right-12 md:size-80"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="120" cy="120" r="30" />
            <circle cx="120" cy="120" r="52" />
            <circle cx="120" cy="120" r="74" />
            <circle cx="120" cy="120" r="96" />
            <circle cx="120" cy="120" r="118" />
          </g>
        </svg>

        <Container as="div" className="relative text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 text-eyebrow text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent/40" />
              <span>MMXXIV</span>
              <span aria-hidden="true" className="h-px w-10 bg-accent/40" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-10 max-w-3xl text-display text-foreground">
              {T.brandTagline}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="mt-10 text-small font-medium text-muted-foreground"
              style={{ letterSpacing: "0.28em", textTransform: "uppercase" }}
            >
              · WaterVibe ·
            </p>
          </FadeIn>
        </Container>
      </section>

      <HomeCTA />

      <JsonLd data={localBusinessSchema()} />
    </>
  );
}

function NapRow({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2 px-0 py-6 sm:px-6", className)}>
      <dt className="text-eyebrow text-accent">{label}</dt>
      <dd className="text-body text-foreground">{value}</dd>
    </div>
  );
}
