"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { BilingualField } from "@/components/admin/BilingualField";
import { FormSection } from "@/components/admin/FormSection";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { testimonialSchema } from "@/lib/validators/testimonial";
import type { Testimonial, TestimonialRating } from "@/types/testimonial";

type FormValues = z.infer<typeof testimonialSchema>;

type TestimonialFormProps = {
  mode: "create" | "edit";
  initialData?: Testimonial;
};

type ZodIssue = { path: (string | number)[]; message: string };

const DEFAULTS: FormValues = {
  author: "",
  location: "",
  quote: { en: "", ro: "" },
  rating: 5,
  featured: false,
};

function toDefaults(initialData?: Testimonial): FormValues {
  if (!initialData) return DEFAULTS;
  return {
    author: initialData.author,
    location: initialData.location,
    quote: initialData.quote,
    rating: initialData.rating,
    featured: initialData.featured,
  };
}

export function TestimonialForm({ mode, initialData }: TestimonialFormProps) {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: toDefaults(initialData),
  });

  async function onSubmit(values: FormValues) {
    const endpoint =
      mode === "create"
        ? "/api/testimonials"
        : `/api/testimonials/${encodeURIComponent(initialData!._id)}`;
    const method = mode === "create" ? "POST" : "PUT";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success(
          mode === "create" ? "Testimonial created" : "Testimonial updated",
        );
        router.push("/admin/testimonials");
        router.refresh();
        return;
      }

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        issues?: ZodIssue[];
      };

      if (response.status === 400 && payload.issues) {
        for (const issue of payload.issues) {
          const path = issue.path.join(".");
          if (path) {
            setError(path as never, { type: "server", message: issue.message });
          }
        }
        toast.error("Please fix the highlighted fields");
        return;
      }

      if (response.status === 401) {
        toast.error("Session expired. Please sign in again.");
        router.push("/admin/login");
        return;
      }

      toast.error(payload.error ?? "Something went wrong");
    } catch {
      toast.error("Network error. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10"
      noValidate
    >
      <FormSection title="Author">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="testimonial-author">Author</Label>
            <Input
              id="testimonial-author"
              placeholder="Mara I."
              aria-invalid={errors.author ? true : undefined}
              {...register("author")}
            />
            {errors.author ? (
              <p className="text-xs text-destructive">{errors.author.message}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="testimonial-location">Location</Label>
            <Input
              id="testimonial-location"
              placeholder="Cluj-Napoca, Romania"
              aria-invalid={errors.location ? true : undefined}
              {...register("location")}
            />
            {errors.location ? (
              <p className="text-xs text-destructive">
                {errors.location.message}
              </p>
            ) : null}
          </div>
        </div>
      </FormSection>

      <FormSection title="Quote">
        <BilingualField
          label="Quote"
          name="quote"
          register={register}
          errors={errors}
          type="textarea"
          rows={4}
        />
      </FormSection>

      <FormSection title="Metadata">
        <div className="grid items-start gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="testimonial-rating">Rating</Label>
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <select
                  id="testimonial-rating"
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value) as TestimonialRating)
                  }
                  onBlur={field.onBlur}
                  ref={field.ref}
                  className="h-9 max-w-40 rounded-md border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {"★".repeat(n)} ({n})
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.rating ? (
              <p className="text-xs text-destructive">{errors.rating.message}</p>
            ) : null}
          </div>
          <Controller
            control={control}
            name="featured"
            render={({ field }) => (
              <label className="flex items-center gap-2 pt-7 text-sm">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  className="size-4 rounded border-border text-primary focus:ring-primary"
                />
                <span>Featured on homepage</span>
              </label>
            )}
          />
        </div>
      </FormSection>

      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-border bg-background/95 py-4 backdrop-blur">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => router.push("/admin/testimonials")}
          disabled={isSubmitting}
        >
          <span>Cancel</span>
        </Button>
        <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              <span>Saving…</span>
            </>
          ) : mode === "create" ? (
            <span>Create testimonial</span>
          ) : (
            <span>Save changes</span>
          )}
        </Button>
      </div>
    </form>
  );
}
