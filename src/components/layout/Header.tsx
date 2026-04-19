import Link from "next/link";

import { HeaderNav } from "@/components/layout/HeaderNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 bg-accent text-accent-foreground shadow-[0_1px_0_0_hsl(0_0%_100%/0.08)]">
      <Container
        as="div"
        size="wide"
        className="flex h-full items-center justify-between gap-6"
      >
        <Link
          href="/"
          className="text-wordmark rounded-sm text-2xl text-accent-foreground transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
        >
          WaterVibe
        </Link>
        <HeaderNav />
        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="hidden bg-accent-foreground text-accent shadow-sm hover:bg-accent-foreground/90 focus-visible:ring-accent-foreground focus-visible:ring-offset-accent md:inline-flex"
          >
            <Link href="/contact">Cereți o ofertă</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
