"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// DESIGN.md §5 — Header (desktop nav)
// Pill-capsule nav: a rounded-full container holding four link pills.
// Active route gets an aqua fill with white text (bg-accent / accent-fg);
// inactive routes sit in muted-foreground with a subtle hover background.
// Current-route detection via next-intl's usePathname so the capsule
// stays in sync with client-side navigations.
export function HeaderNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/catalog" as const, label: t("catalog") },
    { href: "/about" as const, label: t("about") },
    { href: "/contact" as const, label: t("contact") },
  ] as const;

  const isActive = (href: (typeof links)[number]["href"]) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      aria-label={t("home")}
      className="hidden items-center rounded-full border border-border/70 bg-background/70 p-1 text-small font-medium shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/55 md:inline-flex"
    >
      {links.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-full px-4 py-1.5 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
