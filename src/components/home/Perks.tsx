import { ShieldCheckIcon, TagIcon, TruckIcon } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import { cn } from "@/lib/utils";

export function Perks() {
  const items = [
    {
      key: "price",
      Icon: TagIcon,
      title: "Prețuri competitive",
      body: "Oferte ferme, fără costuri surpriză.",
    },
    {
      key: "warranty",
      Icon: ShieldCheckIcon,
      title: "Garanție 5 ani",
      body: "Acoperire pentru liniștea ta.",
    },
    {
      key: "delivery",
      Icon: TruckIcon,
      title: "Transport gratuit în maximum 72 de ore",
      body: "Livrare rapidă în toată România.",
    },
  ] as const;

  return (
    <section
      aria-label="Avantajele WaterVibe"
      className="border-t border-primary-foreground/15 bg-foreground/30 py-6 backdrop-blur-sm md:py-8"
    >
      <Container as="div" size="wide">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-0">
          {items.map(({ key, Icon, title, body }, idx) => (
            <li
              key={key}
              className={cn(
                "flex items-center gap-4 md:px-8",
                idx === 0 && "md:pl-0",
                idx > 0 && "md:border-l md:border-primary-foreground/15",
                idx === items.length - 1 && "md:pr-0",
              )}
            >
              <span
                aria-hidden="true"
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md ring-1 ring-inset ring-accent-tint/40"
              >
                <Icon className="size-6" strokeWidth={2.25} />
              </span>
              <div className="min-w-0">
                <p className="text-small font-semibold text-primary-foreground">
                  {title}
                </p>
                <p className="mt-0.5 text-small text-primary-foreground/80">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
