import { Euro, Package, Sparkles, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { COLORS, SIZES, type ProductColor, type ProductSize } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { ProductModel } from "@/lib/models/Product";
import { cn } from "@/lib/utils";

type Stats = {
  totalProducts: number;
  featuredProducts: number;
  averagePrice: number;
  bySize: { size: ProductSize; label: string; count: number }[];
  byColor: { color: ProductColor; label: string; hex: string; count: number }[];
};

async function getStats(): Promise<Stats> {
  try {
    await dbConnect();
    const [totalProducts, featuredProducts, priceAgg, sizeAgg, colorAgg] =
      await Promise.all([
        ProductModel.countDocuments({}),
        ProductModel.countDocuments({ featured: true }),
        ProductModel.aggregate<{ _id: null; avg: number }>([
          { $group: { _id: null, avg: { $avg: "$price" } } },
        ]),
        ProductModel.aggregate<{ _id: ProductSize; count: number }>([
          { $group: { _id: "$size", count: { $sum: 1 } } },
        ]),
        ProductModel.aggregate<{ _id: ProductColor; count: number }>([
          { $group: { _id: "$color", count: { $sum: 1 } } },
        ]),
      ]);

    const sizeCounts = new Map(sizeAgg.map((row) => [row._id, row.count]));
    const colorCounts = new Map(colorAgg.map((row) => [row._id, row.count]));

    return {
      totalProducts,
      featuredProducts,
      averagePrice: Math.round(priceAgg[0]?.avg ?? 0),
      bySize: SIZES.map((s) => ({
        size: s.value,
        label: s.label,
        count: sizeCounts.get(s.value) ?? 0,
      })),
      byColor: COLORS.map((c) => ({
        color: c.value,
        label: c.label,
        hex: c.hex,
        count: colorCounts.get(c.value) ?? 0,
      })),
    };
  } catch {
    return {
      totalProducts: 0,
      featuredProducts: 0,
      averagePrice: 0,
      bySize: SIZES.map((s) => ({ size: s.value, label: s.label, count: 0 })),
      byColor: COLORS.map((c) => ({
        color: c.value,
        label: c.label,
        hex: c.hex,
        count: 0,
      })),
    };
  }
}

type StatTone = "neutral" | "accent";

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "neutral",
  progress,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: StatTone;
  progress?: number;
}) {
  const isAccent = tone === "accent";
  return (
    <div
      className={cn(
        "group/stat relative isolate overflow-hidden rounded-2xl border px-5 py-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
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
            "inline-flex size-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover/stat:scale-105",
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
        {hint ? (
          <p
            className={cn(
              "text-xs",
              isAccent ? "text-primary-foreground/70" : "text-muted-foreground",
            )}
          >
            {hint}
          </p>
        ) : null}
      </div>

      {typeof progress === "number" ? (
        <div
          className={cn(
            "relative mt-3 h-1 w-full overflow-hidden rounded-full",
            isAccent ? "bg-primary-foreground/15" : "bg-surface",
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-700 ease-out",
              isAccent ? "bg-primary-foreground" : "bg-accent",
            )}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="font-(family-name:--font-fraunces) text-3xl font-semibold tracking-tight">
          Panou
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sumar al catalogului dumneavoastră.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-3">
        <StatCard
          label="Produse"
          value={String(stats.totalProducts)}
          hint="În catalog"
          icon={Package}
        />
        <StatCard
          label="Evidențiate"
          value={String(stats.featuredProducts)}
          hint={
            stats.totalProducts > 0
              ? `${Math.round((stats.featuredProducts / stats.totalProducts) * 100)}% din catalog`
              : "Niciun produs evidențiat"
          }
          icon={Sparkles}
          tone="accent"
          progress={
            stats.totalProducts > 0
              ? (stats.featuredProducts / stats.totalProducts) * 100
              : 0
          }
        />
        <StatCard
          label="Preț mediu"
          value={stats.averagePrice > 0 ? formatPrice(stats.averagePrice) : "—"}
          hint="Pe produs, catalog complet"
          icon={Euro}
        />
      </section>

      <DashboardCharts bySize={stats.bySize} byColor={stats.byColor} />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/admin/products"
          className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-tint focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Gestionați produsele
        </Link>
        <Link
          href="/admin/products/new"
          className="inline-flex h-10 items-center rounded-full border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Adăugați produs
        </Link>
      </section>
    </div>
  );
}
