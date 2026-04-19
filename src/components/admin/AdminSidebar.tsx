"use client";

import { LayoutDashboard, LogOut, Package } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ComponentType, type SVGProps } from "react";

import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Panou", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produse", icon: Package },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/");
      router.refresh();
    }
  }

  return (
    <aside className="sticky top-0 isolate flex h-dvh w-64 shrink-0 flex-col overflow-hidden bg-accent text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full bg-accent-tint/40 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-20 -z-10 h-72 w-72 rounded-full bg-primary-foreground/5 blur-[100px]"
      />

      <div className="px-7 pt-8 pb-10">
        <Link
          href="/admin"
          className="text-wordmark inline-block text-3xl leading-none tracking-tight text-primary-foreground transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary-foreground"
        >
          WaterVibe
        </Link>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-foreground/60">
          Administrare
        </p>
      </div>

      <nav className="flex-1 px-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group/nav relative flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-accent",
                    active
                      ? "bg-primary-foreground text-accent shadow-sm"
                      : "text-primary-foreground/75 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      active ? "text-accent" : "text-primary-foreground/70 group-hover/nav:text-primary-foreground",
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 pb-6 pt-4">
        <div aria-hidden="true" className="mb-4 h-px bg-primary-foreground/15" />
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="group/logout flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-primary-foreground/70 transition-colors duration-200 hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-accent disabled:opacity-60"
        >
          <LogOut
            aria-hidden="true"
            className="size-4 shrink-0 text-primary-foreground/70 transition-colors group-hover/logout:text-primary-foreground"
          />
          <span>{loggingOut ? "Se deconectează…" : "Deconectare"}</span>
        </button>
      </div>
    </aside>
  );
}
