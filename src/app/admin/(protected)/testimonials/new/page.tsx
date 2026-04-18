import Link from "next/link";

import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          <Link href="/admin/testimonials" className="hover:text-foreground">
            Testimonials
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">New</span>
        </div>
        <h1 className="mt-2 font-[var(--font-fraunces)] text-3xl font-semibold tracking-tight">
          New testimonial
        </h1>
      </header>

      <TestimonialForm mode="create" />
    </div>
  );
}
