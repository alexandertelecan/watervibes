import Link from "next/link";

import { HeroOrb } from "@/components/home/HeroOrb";
import { HeroVideo } from "@/components/home/HeroVideo";
import { Perks } from "@/components/home/Perks";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-foreground text-primary-foreground">
      <HeroVideo />

      <HeroOrb />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 -left-64 -z-10 h-192 w-3xl rounded-full bg-accent-tint/15 blur-[160px]"
      />

      <Container
        as="div"
        size="wide"
        className={cn(
          "flex grow flex-col gap-10 pt-28 pb-10 md:pt-32 md:pb-12",
        )}
      >
        <div className="flex max-w-3xl grow flex-col justify-center gap-7">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground/80">
              WaterVibe
            </p>
            <h1 className="text-display text-primary-foreground">
              O experiență, nu doar un jacuzzi.
            </h1>
          </div>
          <p className="text-lede max-w-xl text-primary-foreground/85">
            Relaxare la un alt nivel, pentru acasă, pensiuni și hoteluri.
            Experiență completă de hidromasaj, construită pentru durabilitate.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild variant="accent" size="lg" className="gap-2">
              <Link href="/catalog">
                <span>Descoperiți colecția</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
                >
                  <path
                    d="M1 8h12M9 4l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </Container>

      <Perks />
    </section>
  );
}
