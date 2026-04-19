"use client";

import {
  ArrowDownAZ,
  Euro,
  Package,
  Pencil,
  Sparkles,
  Star,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { COLORS, SIZES } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductsTableProps = {
  products: Product[];
  totalCount: number;
  featuredCount: number;
  averagePrice: number;
};

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

function StatTile({
  label,
  value,
  hint,
  icon: Icon,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tone?: "neutral" | "accent";
}) {
  const isAccent = tone === "accent";
  return (
    <div
      className={cn(
        "group/tile relative isolate overflow-hidden rounded-2xl border px-5 py-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:shadow-sm",
        isAccent
          ? "border-transparent bg-accent text-primary-foreground"
          : "border-border bg-background text-foreground",
      )}
    >
      {isAccent ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-primary-foreground/10 blur-2xl"
        />
      ) : null}
      <div className="relative flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex size-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover/tile:scale-105",
            isAccent
              ? "bg-primary-foreground/15 text-primary-foreground"
              : "bg-accent/8 text-accent",
          )}
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <p
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.22em]",
            isAccent ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {label}
        </p>
      </div>
      <div className="relative mt-4 flex items-baseline gap-2">
        <div
          className={cn(
            "font-(family-name:--font-fraunces) text-[1.75rem] leading-none font-semibold tracking-tight tabular-nums",
            isAccent ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {value}
        </div>
        <p
          className={cn(
            "text-xs",
            isAccent ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {hint}
        </p>
      </div>
    </div>
  );
}

export function ProductsTable({
  products,
  totalCount,
  featuredCount,
  averagePrice,
}: ProductsTableProps) {
  const router = useRouter();
  const [pending, setPending] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!pending) return;
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/products/${encodeURIComponent(pending._id)}`,
        { method: "DELETE" },
      );
      if (response.ok) {
        toast.success(`${pending.name} a fost șters`);
        setPending(null);
        router.refresh();
        return;
      }
      if (response.status === 401) {
        toast.error("Sesiunea a expirat. Reconectați-vă.");
        router.push("/admin/login");
        return;
      }
      toast.error("Ștergerea a eșuat. Încercați din nou.");
    } catch {
      toast.error("Eroare de rețea. Încercați din nou.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatTile
          label="Produse"
          value={String(totalCount)}
          hint="în catalog"
          icon={Package}
        />
        <StatTile
          label="Evidențiate"
          value={String(featuredCount)}
          hint={
            totalCount > 0
              ? `${Math.round((featuredCount / totalCount) * 100)}% din total`
              : "Niciun produs"
          }
          icon={Sparkles}
          tone="accent"
        />
        <StatTile
          label="Preț mediu"
          value={averagePrice > 0 ? formatPrice(averagePrice) : "—"}
          hint="Pe produs"
          icon={Euro}
        />
      </section>

      <section className="mt-8">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-background/50 px-6 py-20 text-center">
            <div
              aria-hidden="true"
              className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface text-muted-foreground"
            >
              <Package className="size-5" strokeWidth={1.5} />
            </div>
            <h3 className="mt-4 font-(family-name:--font-fraunces) text-lg font-semibold tracking-tight">
              Încă niciun produs
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Începeți prin a adăuga primul jacuzzi în catalog.
            </p>
            <Link
              href="/admin/products/new"
              className="mt-6 inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Adăugați primul produs
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <div className="hidden border-b border-border bg-surface/60 px-6 py-3 md:grid md:grid-cols-[88px_minmax(0,1fr)_110px_140px_110px_80px_120px] md:gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Imagine
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <ArrowDownAZ aria-hidden="true" className="size-3" />
                  Produs
                </span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Mărime
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Culoare
              </span>
              <span className="text-right text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Preț
              </span>
              <span className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Evidențiat
              </span>
              <span className="text-right text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Acțiuni
              </span>
            </div>

            <ul className="divide-y divide-border">
              {products.map((product, index) => {
                const first = product.images[0];
                const sizeLabel =
                  SIZES.find((s) => s.value === product.size)?.label ?? product.size;
                const colorLabel =
                  COLORS.find((c) => c.value === product.color)?.label ?? product.color;
                return (
                  <li
                    key={product._id}
                    className="group/row relative grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 transition-colors duration-200 hover:bg-surface/50 md:grid-cols-[88px_minmax(0,1fr)_110px_140px_110px_80px_120px] md:px-6"
                    style={{
                      animation: "products-fade-in 420ms ease-[cubic-bezier(0.22,1,0.36,1)] both",
                      animationDelay: `${Math.min(index * 30, 360)}ms`,
                    }}
                  >
                    <div className="relative h-15 w-18 overflow-hidden rounded-lg border border-border bg-surface md:h-16.5 md:w-20">
                      {first ? (
                        <Image
                          src={first}
                          alt=""
                          fill
                          unoptimized
                          sizes="88px"
                          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/row:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <Package className="size-4" aria-hidden="true" />
                        </div>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <Link
                        href={`/admin/products/${product._id}`}
                        className="truncate text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:text-accent"
                      >
                        {truncate(product.name, 56)}
                      </Link>
                      <span className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                        /{product.slug}
                      </span>
                      <div className="mt-2 flex flex-wrap items-center gap-2 md:hidden">
                        <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {sizeLabel}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          <span
                            aria-hidden="true"
                            className="inline-block size-2.5 rounded-full ring-1 ring-border"
                            style={{ backgroundColor: product.colorHex }}
                          />
                          {colorLabel}
                        </span>
                        <span className="text-[11px] font-medium tabular-nums text-foreground">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>

                    <span className="hidden text-sm text-foreground md:inline">
                      {sizeLabel}
                    </span>

                    <span className="hidden items-center gap-2 md:inline-flex">
                      <span
                        aria-hidden="true"
                        className="inline-block size-4 shrink-0 rounded-full ring-1 ring-border"
                        style={{ backgroundColor: product.colorHex }}
                      />
                      <span className="text-sm text-foreground">
                        {colorLabel}
                      </span>
                    </span>

                    <span className="hidden text-right text-sm font-medium tabular-nums text-foreground md:inline">
                      {formatPrice(product.price)}
                    </span>

                    <span
                      className="hidden justify-center md:inline-flex"
                      aria-label={product.featured ? "Evidențiat" : "Neevidențiat"}
                    >
                      {product.featured ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                          <Star
                            aria-hidden="true"
                            className="size-3 fill-current"
                          />
                        </span>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="text-muted-foreground/60"
                        >
                          —
                        </span>
                      )}
                    </span>

                    <div className="flex items-center justify-end gap-1 md:gap-2">
                      <Link
                        href={`/admin/products/${product._id}`}
                        aria-label={`Editați ${product.name}`}
                        className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-accent/8 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Pencil aria-hidden="true" className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPending(product)}
                        aria-label={`Ștergeți ${product.name}`}
                        className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Trash2 aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      <DeleteDialog
        open={pending !== null}
        onOpenChange={(open) => {
          if (!open) setPending(null);
        }}
        onConfirm={handleDelete}
        itemLabel={pending ? `„${pending.name}”` : "acest produs"}
        isDeleting={isDeleting}
      />

      <style jsx>{`
        @keyframes products-fade-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
