import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { FloatingShape } from "@/components/home/FloatingShape";
import { ParallaxImage } from "@/components/home/ParallaxImage";

const TITLE = "De ce o experiență și nu doar un jacuzzi?";
const PULLQUOTE =
  "Pentru că nu cumperi doar un produs ci un mod de relaxare, comfort zilnic și stare de bine.";

const IMAGE_SRC =
  "https://images.unsplash.com/photo-1681168716884-e3254c4a0148?auto=format&fit=crop&w=1400&q=80";
const IMAGE_ALT =
  "Moment de relaxare într-un jacuzzi WaterVibe, în aer liber.";

const PILLARS = [
  {
    label: "De ce",
    body: "WaterVibe a apărut dintr-o idee simplă: relaxarea reală nu ar trebui să fie un lux ocazional. O găsim în vacanțe sau în centre spa, apoi o pierdem când ne întoarcem acasă. Noi credem că trebuie să fie parte din viața de zi cu zi.",
  },
  {
    label: "Cum facem asta",
    body: "Selectăm fiecare model de jacuzzi cu atenție. Analizăm confortul, calitatea materialelor, performanța hidromasajului și fiabilitatea sistemelor tehnice. Alegem modele care oferă o experiență reală de spa și care pot fi folosite constant, fără compromisuri.",
  },
  {
    label: "Ce oferim",
    body: "Jacuzzi pentru uz rezidențial, potrivite pentru curți, terase sau spații interioare. În funcție de spațiu și preferințe, clienții pot alege modele pentru interior sau exterior, cu diferite dimensiuni, număr de locuri, configurații de jeturi și variante de culori.",
  },
] as const;

export function BrandStory() {
  return (
    <section className="relative isolate bg-surface py-24 md:py-32">
      <Container as="div" size="wide">
        <h2 className="sr-only">{TITLE}</h2>

        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-20">
          <FadeIn className="relative md:col-span-5">
            <FloatingShape
              className="pointer-events-none absolute hidden text-accent/25 md:block md:-right-24 md:-bottom-12 md:h-32 md:w-32"
              range={180}
              rotate={25}
              bob={14}
              bobDuration={5}
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
                  r="75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </FloatingShape>
            <FloatingShape
              className="pointer-events-none absolute hidden text-accent/20 md:block md:-top-6 md:-left-6 md:h-12 md:w-12"
              range={115}
              rotate={-18}
              bob={10}
              bobDuration={4.2}
            >
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </FloatingShape>
            <FloatingShape
              className="pointer-events-none absolute hidden size-1.5 rounded-full bg-accent/40 md:block md:top-10 md:-right-10"
              range={90}
              bob={12}
              bobDuration={3.6}
            >
              <span className="block h-full w-full" />
            </FloatingShape>
            <ParallaxImage
              src={IMAGE_SRC}
              alt={IMAGE_ALT}
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 100vw"
            />
          </FadeIn>

          <FadeIn
            className="relative md:col-span-6 md:col-start-7"
            delay={0.1}
          >
            <FloatingShape
              className="pointer-events-none absolute hidden text-accent/15 md:block md:-top-10 md:right-0 md:h-44 md:w-44"
              range={220}
              rotate={-28}
              bob={15}
              bobDuration={6}
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
              </svg>
            </FloatingShape>
            <FloatingShape
              className="pointer-events-none absolute hidden text-accent/20 md:block md:top-20 md:-left-8 md:h-20 md:w-20"
              range={140}
              rotate={22}
              bob={11}
              bobDuration={5.6}
            >
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="55"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              </svg>
            </FloatingShape>
            <FloatingShape
              className="pointer-events-none absolute hidden size-2 rounded-full bg-accent/40 md:block md:-bottom-4 md:left-4"
              range={75}
              bob={11}
              bobDuration={4}
            >
              <span className="block h-full w-full" />
            </FloatingShape>
            <p className="relative text-h1 text-foreground">{TITLE}</p>

            <p
              className="relative mt-10 text-lede italic text-foreground/80 md:mt-12"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {PULLQUOTE}
            </p>
          </FadeIn>
        </div>

        <div className="relative mt-24 grid gap-14 md:mt-32 md:grid-cols-3 md:gap-16 lg:gap-24">
          <FloatingShape
            className="pointer-events-none absolute hidden text-accent/20 md:block md:-top-16 md:left-[30%] md:h-20 md:w-20"
            range={165}
            rotate={-30}
            bob={14}
            bobDuration={5.8}
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <circle
                cx="100"
                cy="100"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </svg>
          </FloatingShape>
          <FloatingShape
            className="pointer-events-none absolute hidden text-accent/15 md:block md:-bottom-6 md:right-0 md:h-14 md:w-14"
            range={130}
            rotate={26}
            bob={11}
            bobDuration={6.2}
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </FloatingShape>
          <FloatingShape
            className="pointer-events-none absolute hidden size-1.5 rounded-full bg-accent/45 md:block md:-top-8 md:left-6"
            range={70}
            bob={10}
            bobDuration={3.8}
          >
            <span className="block h-full w-full" />
          </FloatingShape>
          <FloatingShape
            className="pointer-events-none absolute hidden text-accent/20 md:block md:top-24 md:left-[68%] md:h-10 md:w-10"
            range={140}
            rotate={-18}
            bob={12}
            bobDuration={5.4}
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
          </FloatingShape>
          {PILLARS.map((pillar, idx) => (
            <FadeIn
              key={pillar.label}
              delay={0.1 + idx * 0.08}
              className="relative flex flex-col gap-5"
            >
              <h3 className="text-h3 text-foreground">{pillar.label}</h3>
              <p className="text-body text-foreground/70">{pillar.body}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
