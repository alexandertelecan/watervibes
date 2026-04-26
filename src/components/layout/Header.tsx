import Link from "next/link";
import { Lock } from "lucide-react";

import { HeaderNav } from "@/components/layout/HeaderNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

export function Header() {
  return (
    <header className="fixed top-0 z-40 h-16 bg-accent text-accent-foreground min-w-full">
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
          <Link
            href="/admin/login"
            aria-label="Admin"
            className="hidden rounded-sm p-1.5 text-accent-foreground/50 transition-colors duration-200 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-accent md:inline-flex"
          >
            <Lock aria-hidden="true" className="size-3.5" />
          </Link>
          <Button
            asChild
            size="sm"
            className="hidden bg-accent-foreground text-accent shadow-sm hover:bg-accent-foreground/90 focus-visible:ring-accent-foreground focus-visible:ring-offset-accent md:inline-flex"
          >
            <Link href="/contact">Hai să vorbim</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
