import Link from "next/link";

import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";

const TITLE = "Întrebări, lămuriri, recomandări sau oferte?";
const LEDE =
  "Îți răspundem rapid și îți oferim informațiile de care ai nevoie pentru a lua decizia corectă.";
const CTA = "Contactează-ne";

export function HomeCTA() {
  return (
    <section className="py-24 md:py-32">
      <Container as="div" size="wide">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-20">
          <FadeIn className="md:col-span-7">
            <h2 className="text-h1 text-foreground">{TITLE}</h2>
          </FadeIn>

          <FadeIn className="md:col-span-5" delay={0.1}>
            <p className="text-lede text-muted-foreground">{LEDE}</p>
            <div className="mt-10">
              <Button asChild variant="accent" size="md">
                <Link href="/contact">
                  <span>{CTA}</span>
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
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
