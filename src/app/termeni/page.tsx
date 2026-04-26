import type { Metadata } from "next";

import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  alternatesFor,
  localBusinessSchema,
  openGraphFor,
  twitterFor,
} from "@/lib/seo";

const META_TITLE = "Termeni și Condiții · WaterVibe";
const META_DESCRIPTION =
  "Termenii și condițiile de utilizare a site-ului www.watervibe.ro, operat de ENSAMA SRL. Comandă, livrare, retur, garanție și soluționarea litigiilor.";

const LAST_UPDATED = "26 aprilie 2026";

type Block = string | { intro?: string; items: string[] };

type Section = {
  id: string;
  number: string;
  title: string;
  blocks: Block[];
};

const SECTIONS: Section[] = [
  {
    id: "operator",
    number: "01",
    title: "Identificare operator",
    blocks: [
      "Site-ul www.watervibe.ro este operat de ENSAMA SRL.",
      {
        intro: "Date firmă:",
        items: [
          "Sediu: Jud. Prahova, Municipiul Câmpina, Bulevardul Carol I, Nr. 90, Bl. 20G, Scara A, Et. 3, Ap. 14",
          "Nr. Reg. Comerțului: J2025074322001",
          "CUI: 52599337",
          "Email: office@watervibe.ro",
          "Telefon: 0726.793.993",
          "Brand comercial: WaterVibe",
        ],
      },
      "Utilizarea site-ului implică acceptarea acestor termeni.",
    ],
  },
  {
    id: "definitii",
    number: "02",
    title: "Definiții",
    blocks: [
      "Client: persoană fizică sau juridică care plasează o comandă.",
      "Contract: acordul la distanță încheiat între ENSAMA SRL și client.",
    ],
  },
  {
    id: "incheierea-contractului",
    number: "03",
    title: "Încheierea contractului",
    blocks: [
      "Comanda transmisă pe site reprezintă o ofertă. Contractul se consideră încheiat la confirmarea comenzii de către operator.",
      "Ne rezervăm dreptul de a refuza comenzi în cazuri justificate, inclusiv date incomplete sau suspiciuni de fraudă.",
    ],
  },
  {
    id: "preturi",
    number: "04",
    title: "Prețuri",
    blocks: [
      "Prețurile sunt afișate în lei. Prețurile includ TVA.",
      "Ne rezervăm dreptul de a modifica prețurile. Prețul aplicabil este cel din momentul plasării comenzii.",
    ],
  },
  {
    id: "plata",
    number: "05",
    title: "Plată",
    blocks: [
      {
        intro: "Metode disponibile:",
        items: ["Card online prin BT Pay", "Transfer bancar"],
      },
      "Comanda se procesează după confirmarea plății.",
    ],
  },
  {
    id: "livrare",
    number: "06",
    title: "Livrare",
    blocks: [
      "Livrarea se face pe teritoriul României.",
      "Termen estimat: până la 72 de ore de la confirmarea plății.",
      "Livrarea este gratuită.",
      "Riscul asupra produsului se transferă la momentul livrării către client.",
      "Clientul are obligația să verifice coletul la primire. Orice deteriorare trebuie menționată în procesul verbal cu curierul.",
    ],
  },
  {
    id: "dreptul-de-retragere",
    number: "07",
    title: "Dreptul de retragere",
    blocks: [
      "Conform OUG 34/2014, clientul persoană fizică are dreptul să se retragă din contract în termen de 14 zile calendaristice.",
      "Termenul începe de la data primirii produsului.",
      "Pentru exercitarea dreptului, clientul trebuie să transmită o solicitare scrisă la office@watervibe.ro.",
    ],
  },
  {
    id: "conditii-de-retur",
    number: "08",
    title: "Condiții de retur",
    blocks: [
      {
        intro: "Produsul trebuie returnat:",
        items: [
          "Neutilizat",
          "Fără urme de uzură",
          "În ambalajul original",
          "Cu toate accesoriile",
        ],
      },
      "Clientul suportă costul transportului de retur.",
      "Ne rezervăm dreptul de a diminua valoarea rambursată dacă produsul prezintă urme de utilizare.",
    ],
  },
  {
    id: "rambursare",
    number: "09",
    title: "Rambursare",
    blocks: [
      "Rambursarea se face în maximum 14 zile de la primirea produsului returnat.",
      "Rambursarea se face prin aceeași metodă de plată sau prin transfer bancar.",
    ],
  },
  {
    id: "garantie",
    number: "10",
    title: "Garanție",
    blocks: [
      "Produsele beneficiază de garanție conform Legii 449/2003 și OG 21/1992.",
      {
        intro: "Durate:",
        items: [
          "5 ani pentru bazine acrilice",
          "4 ani pentru sistem hidromasaj",
          "3 ani pentru echipamente electronice",
        ],
      },
      "Garanția acoperă defecte de fabricație.",
      {
        intro: "Nu se acordă garanție pentru:",
        items: [
          "Utilizare necorespunzătoare",
          "Montaj incorect",
          "Intervenții neautorizate",
        ],
      },
    ],
  },
  {
    id: "obligatiile-clientului",
    number: "11",
    title: "Obligațiile clientului",
    blocks: [
      "Clientul trebuie să folosească produsele conform instrucțiunilor.",
      "Clientul răspunde pentru corectitudinea datelor furnizate.",
    ],
  },
  {
    id: "cont-utilizator",
    number: "12",
    title: "Cont utilizator",
    blocks: [
      "Clientul poate crea cont.",
      "Clientul este responsabil pentru securitatea contului.",
    ],
  },
  {
    id: "recenzii",
    number: "13",
    title: "Recenzii",
    blocks: [
      "Recenziile sunt moderate.",
      "Ne rezervăm dreptul de a elimina conținut ilegal sau ofensator.",
    ],
  },
  {
    id: "promotii",
    number: "14",
    title: "Promoții",
    blocks: [
      "Promoțiile sunt valabile în limita stocului.",
      "Condițiile promoțiilor sunt afișate pe site.",
    ],
  },
  {
    id: "proprietate-intelectuala",
    number: "15",
    title: "Proprietate intelectuală",
    blocks: [
      "Conținutul site-ului aparține ENSAMA SRL.",
      "Este interzisă utilizarea fără acord scris.",
    ],
  },
  {
    id: "raspundere",
    number: "16",
    title: "Răspundere",
    blocks: [
      "Nu răspundem pentru erori tehnice temporare.",
      "Răspunderea noastră este limitată la valoarea produsului achiziționat.",
    ],
  },
  {
    id: "reclamatii",
    number: "17",
    title: "Reclamații",
    blocks: [
      "Orice reclamație se transmite la office@watervibe.ro.",
      "Termen de răspuns: maximum 30 de zile calendaristice.",
    ],
  },
  {
    id: "solutionarea-litigiilor",
    number: "18",
    title: "Soluționarea litigiilor",
    blocks: [
      "Clientul poate apela la soluționarea alternativă a litigiilor prin ANPC.",
      "Platforma SOL este disponibilă la adresa: https://ec.europa.eu/consumers/odr",
      "Link ANPC: https://anpc.ro",
    ],
  },
  {
    id: "forta-majora",
    number: "19",
    title: "Forță majoră",
    blocks: [
      "Nu răspundem pentru neexecutarea obligațiilor în caz de forță majoră.",
      "Forța majoră include evenimente imprevizibile, independente de voința părților.",
    ],
  },
  {
    id: "livrare-intarziata",
    number: "20",
    title: "Livrare întârziată",
    blocks: [
      "În cazuri excepționale, termenul de livrare poate fi depășit.",
      "Clientul va fi informat.",
    ],
  },
  {
    id: "legea-aplicabila",
    number: "21",
    title: "Legea aplicabilă",
    blocks: ["Se aplică legislația din România."],
  },
];

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: alternatesFor("/termeni"),
  openGraph: openGraphFor("/termeni", {
    title: META_TITLE,
    description: META_DESCRIPTION,
  }),
  twitter: twitterFor({ title: META_TITLE, description: META_DESCRIPTION }),
};

const URL_OR_EMAIL = /(https?:\/\/\S+|[\w.-]+@[\w.-]+\.\w+)/g;

function renderText(text: string): React.ReactNode[] {
  const parts = text.split(URL_OR_EMAIL);
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {part}
        </a>
      );
    }
    if (/^[\w.-]+@[\w.-]+\.\w+$/.test(part)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderBlock(block: Block, index: number) {
  if (typeof block === "string") {
    return (
      <p key={index} className="text-pretty text-body text-foreground/80">
        {renderText(block)}
      </p>
    );
  }
  return (
    <div key={index} className="flex flex-col gap-3">
      {block.intro && (
        <p className="text-body font-medium text-foreground">{block.intro}</p>
      )}
      <ul className="flex flex-col gap-2 pl-5">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="text-pretty text-body text-foreground/80 marker:text-accent list-disc"
          >
            {renderText(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-accent py-20 text-accent-foreground md:py-28">
        <Container as="div" size="wide" className="relative">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-14">
            <FadeIn className="md:col-span-7">
              <p className="text-eyebrow text-accent-foreground/70">
                Document legal
              </p>
              <h1 className="mt-4 text-balance text-display text-accent-foreground">
                Termeni și condiții
              </h1>
            </FadeIn>
            <FadeIn delay={0.1} className="md:col-span-5 md:col-start-8">
              <p className="text-pretty text-lede text-accent-foreground/80">
                Condițiile de utilizare a site-ului www.watervibe.ro, operat de
                ENSAMA SRL. Vă rugăm să le citiți înainte de a plasa o comandă.
              </p>
              <p className="mt-6 text-small text-accent-foreground/65">
                Ultima actualizare: {LAST_UPDATED}
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="relative bg-background py-24 md:py-32">
        <Container as="div" size="wide">
          <div className="grid gap-16 md:grid-cols-12 md:gap-x-16 lg:gap-x-24">
            <aside className="md:col-span-4 lg:col-span-3">
              <div className="md:sticky md:top-28">
                <FadeIn>
                  <p className="text-eyebrow text-accent">Cuprins</p>
                </FadeIn>
                <FadeIn delay={0.06}>
                  <ol className="mt-6 flex flex-col gap-3 border-l border-border pl-5">
                    {SECTIONS.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="group flex gap-3 text-small text-muted-foreground transition-colors hover:text-accent focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          <span className="text-accent/70 tabular-nums group-hover:text-accent">
                            {section.number}
                          </span>
                          <span className="text-pretty">{section.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </FadeIn>
              </div>
            </aside>

            <div className="md:col-span-8 lg:col-span-9">
              <ol className="flex flex-col gap-20 md:gap-24">
                {SECTIONS.map((section, i) => (
                  <li
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <FadeIn delay={Math.min(i * 0.02, 0.16)}>
                      <header className="flex items-baseline gap-5 border-b border-border pb-5">
                        <span className="text-eyebrow text-accent tabular-nums">
                          {section.number}
                        </span>
                        <h2 className="text-balance text-h2 text-foreground">
                          {section.title}
                        </h2>
                      </header>
                    </FadeIn>
                    <FadeIn delay={Math.min(i * 0.02, 0.16) + 0.05}>
                      <div className="mt-8 flex max-w-2xl flex-col gap-5">
                        {section.blocks.map((block, j) => renderBlock(block, j))}
                      </div>
                    </FadeIn>
                  </li>
                ))}
              </ol>

              <FadeIn delay={0.1}>
                <div className="mt-24 border-t border-border pt-10 md:mt-32">
                  <p className="text-small text-muted-foreground">
                    Pentru întrebări privind acești termeni, scrieți la{" "}
                    <a
                      href="mailto:office@watervibe.ro"
                      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      office@watervibe.ro
                    </a>
                    .
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd data={localBusinessSchema()} />
    </>
  );
}
