import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";

const BRAND_TAGLINE =
  "Jacuzzi pentru exterior, pentru case, pensiuni și hoteluri din România. Relaxare adevărată, integrată în viața de zi cu zi.";

const EXPLORE_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/catalog", label: "Jacuzzi" },
  { href: "/about", label: "Despre noi" },
  { href: "/contact", label: "Contact" },
] as const;

const INFO_LINKS = [
  { href: "/termeni", label: "Termeni și condiții" },
  { href: "/confidentialitate", label: "Politica de confidențialitate" },
  { href: "/cookies", label: "Politica cookies" },
  { href: "/retur", label: "Politica de retur" },
] as const;

const ANPC_BANNERS = [
  {
    href: "https://anpc.ro/ce-este-sal/",
    src: "/anpc-sal.jpg",
    alt: "ANPC — Soluționarea alternativă a litigiilor (SAL)",
  },
  {
    href: "https://ec.europa.eu/consumers/odr",
    src: "/anpc-sol.avif",
    alt: "ANPC — Soluționarea online a litigiilor (SOL)",
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-accent text-white">
      <Container as="div" size="wide" className="relative z-10">
        <div className="flex flex-col pt-24 md:pt-32">
          <FadeIn>
            <div className="grid items-end gap-10 md:grid-cols-12 md:gap-16">
              <Link
                href="/"
                aria-label="WaterVibe — pagina principală"
                className="text-wordmark inline-block leading-[0.9] tracking-tight text-white transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white md:col-span-7"
                style={{ fontSize: "clamp(3rem, 7.5vw, 5.75rem)" }}
              >
                WaterVibe
              </Link>
              <p className="text-lede max-w-md text-white/80 md:col-span-5">
                {BRAND_TAGLINE}
              </p>
            </div>
          </FadeIn>

          <div aria-hidden="true" className="my-16 h-px bg-white/20 md:my-20" />

          <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-12 md:gap-10">
            <FadeIn className="md:col-span-3">
              <FooterColumn label="Explorați">
                <FooterLinkList links={EXPLORE_LINKS} />
              </FooterColumn>
            </FadeIn>

            <FadeIn className="md:col-span-3" delay={0.06}>
              <FooterColumn label="Informații">
                <FooterLinkList links={INFO_LINKS} />
              </FooterColumn>
            </FadeIn>

            <FadeIn className="md:col-span-3" delay={0.12}>
              <FooterColumn label="Contact">
                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:office@watervibe.ro"
                    className="text-body text-white underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white"
                  >
                    office@watervibe.ro
                  </a>
                  <a
                    href="tel:+40726793993"
                    className="text-body text-white underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white"
                  >
                    +40 726 793 993
                  </a>
                  <address className="not-italic text-body text-white/80">
                    Bulevardul Carol I 90
                    <br />
                    Câmpina, Prahova
                  </address>
                </div>
              </FooterColumn>
            </FadeIn>

            <FadeIn className="md:col-span-3" delay={0.18}>
              <FooterColumn label="Protecția consumatorului">
                <div className="flex flex-col gap-3">
                  {ANPC_BANNERS.map((banner) => (
                    <AnpcBanner key={banner.src} {...banner} />
                  ))}
                </div>
              </FooterColumn>
            </FadeIn>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/20 py-8 text-small text-white/65 md:mt-20 md:flex-row md:items-center">
            <p>© {year} WaterVibe. Toate drepturile rezervate.</p>
            <p>Operat din Câmpina, Prahova. Livrare în toată România.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-small font-medium text-white/55">{label}</p>
      {children}
    </div>
  );
}

function FooterLinkList({
  links,
}: {
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-body text-white/85 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AnpcBanner({
  href,
  src,
  alt,
}: {
  href: string;
  src: string;
  alt: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className="inline-flex w-fit rounded-sm bg-white/95 p-1 transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={160}
        height={60}
        loading="lazy"
        decoding="async"
        className="block h-auto w-40"
      />
    </a>
  );
}
