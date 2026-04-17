import Link from "next/link";

import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { TestimonialModel } from "@/lib/models/Testimonial";

type Stats = {
  totalProducts: number;
  featuredProducts: number;
  totalTestimonials: number;
};

async function getStats(): Promise<Stats> {
  try {
    await dbConnect();
    const [totalProducts, featuredProducts, totalTestimonials] =
      await Promise.all([
        ProductModel.countDocuments({}),
        ProductModel.countDocuments({ featured: true }),
        TestimonialModel.countDocuments({}),
      ]);
    return { totalProducts, featuredProducts, totalTestimonials };
  } catch {
    return { totalProducts: 0, featuredProducts: 0, totalTestimonials: 0 };
  }
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="mt-2 font-[var(--font-fraunces)] text-4xl font-semibold tracking-tight">
        {value}
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <h1 className="font-[var(--font-fraunces)] text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quick overview of your catalog and testimonials.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total products" value={stats.totalProducts} />
        <StatCard label="Featured products" value={stats.featuredProducts} />
        <StatCard label="Testimonials" value={stats.totalTestimonials} />
      </section>

      <section className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/admin/products"
          className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          Manage products
        </Link>
        <Link
          href="/admin/testimonials"
          className="inline-flex h-10 items-center rounded-xl border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          Manage testimonials
        </Link>
      </section>
    </div>
  );
}
