import Link from "next/link";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { dbConnect } from "@/lib/db";
import { TestimonialModel } from "@/lib/models/Testimonial";
import { serializeTestimonial } from "@/lib/serializers";
import type { Testimonial } from "@/types/testimonial";

async function loadTestimonial(id: string): Promise<Testimonial | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  await dbConnect();
  const doc = await TestimonialModel.findById(id).lean();
  if (!doc) return null;
  return serializeTestimonial(doc as Record<string, unknown>);
}

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await loadTestimonial(id);
  if (!testimonial) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          <Link href="/admin/testimonials" className="hover:text-foreground">
            Testimonials
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">Edit</span>
        </div>
        <h1 className="mt-2 font-[var(--font-fraunces)] text-3xl font-semibold tracking-tight">
          {testimonial.author}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {testimonial.location}
        </p>
      </header>

      <TestimonialForm mode="edit" initialData={testimonial} />
    </div>
  );
}
