"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { ProductColor, ProductSize } from "@/lib/constants";

type BySize = { size: ProductSize; label: string; count: number };
type ByColor = { color: ProductColor; label: string; hex: string; count: number };

const sizeConfig = {
  count: {
    label: "Produse",
    color: "var(--accent)",
  },
} satisfies ChartConfig;

const colorConfig = {
  count: {
    label: "Produse",
  },
} satisfies ChartConfig;

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <header className="mb-6">
        <h2 className="font-(family-name:--font-fraunces) text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </header>
      {children}
    </div>
  );
}

export function DashboardCharts({
  bySize,
  byColor,
}: {
  bySize: BySize[];
  byColor: ByColor[];
}) {
  return (
    <section className="mt-8 grid gap-4 lg:grid-cols-2">
      <ChartCard
        title="Produse după mărime"
        subtitle="Distribuția catalogului pe capacitate."
      >
        <ChartContainer config={sizeConfig} className="h-64 w-full">
          <BarChart data={bySize} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="var(--muted-foreground)"
              fontSize={12}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              stroke="var(--muted-foreground)"
              fontSize={12}
              width={40}
            />
            <ChartTooltip
              cursor={{ fill: "var(--surface)" }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </ChartCard>

      <ChartCard
        title="Produse după culoare"
        subtitle="Barele folosesc paleta reală a fiecărei finisaje."
      >
        <ChartContainer config={colorConfig} className="h-64 w-full">
          <BarChart data={byColor} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              stroke="var(--muted-foreground)"
              fontSize={12}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              stroke="var(--muted-foreground)"
              fontSize={12}
              width={40}
            />
            <ChartTooltip
              cursor={{ fill: "var(--surface)" }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} stroke="var(--border)">
              {byColor.map((entry) => (
                <Cell key={entry.color} fill={entry.hex} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </ChartCard>
    </section>
  );
}
