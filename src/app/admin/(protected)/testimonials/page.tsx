import Link from "next/link";

import { TestimonialsTable } from "@/components/admin/TestimonialsTable";
import { dbConnect } from "@/lib/db";
import { TestimonialModel } from "@/lib/models/Testimonial";
import { serializeTestimonial } from "@/lib/serializers";
import type { Testimonial } from "@/types/testimonial";

export const dynamic = "force-dynamic";

async function loadTestimonials(): Promise<Testimonial[]> {
  try {
    await dbConnect();
    const docs = await TestimonialModel.find()
      .sort({ featured: -1, createdAt: -1 })
      .lean();
    return docs.map((doc) =>
      serializeTestimonial(doc as Record<string, unknown>),
    );
  } catch {
    return [];
  }
}

export default async function AdminTestimonialsPage() {
  const testimonials = await loadTestimonials();

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-fraunces)] text-3xl font-semibold tracking-tight">
            Testimonials
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {testimonials.length} total
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          New testimonial
        </Link>
      </header>

      <TestimonialsTable testimonials={testimonials} />
    </div>
  );
}
