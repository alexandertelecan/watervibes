"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function HeaderNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Acasă" },
    { href: "/catalog", label: "Catalog" },
    { href: "/about", label: "Despre noi" },
    { href: "/contact", label: "Contact" },
  ] as const;

  const isActive = (href: (typeof links)[number]["href"]) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      aria-label="Navigație principală"
      className="hidden items-center gap-8 text-small font-medium md:inline-flex"
    >
      {links.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-sm py-1 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-accent",
              "after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100",
              active
                ? "text-accent-foreground after:scale-x-100"
                : "text-accent-foreground/75 hover:text-accent-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
