"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ProductFormCompleteness } from "@/components/admin/ProductFormCompleteness";
import { ProductFormFeatures } from "@/components/admin/ProductFormFeatures";
import { ProductFormImages } from "@/components/admin/ProductFormImages";
import { ProductFormPreview } from "@/components/admin/ProductFormPreview";
import { ProductFormSpecs } from "@/components/admin/ProductFormSpecs";
import { ProductFormVariant } from "@/components/admin/ProductFormVariant";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn, slugify } from "@/lib/utils";
import type { Product } from "@/types/product";

import {
  productFormSchema,
  type ProductFormValues,
} from "./product-form-types";

type ProductFormProps = {
  mode: "create" | "edit";
  initialData?: Product;
};

type ZodIssue = { path: (string | number)[]; message: string };

const EMPTY_DEFAULTS: ProductFormValues = {
  slug: "",
  name: "",
  tagline: "",
  description: "",
  color: "",
  colorHex: "#1A3BC7",
  price: 0,
  images: [],
  specs: {
    lengthMm: 0,
    widthMm: 0,
    heightMm: 0,
    waterVolumeL: 0,
    capacity: 4,
    loungeSeats: 0,
    seatedSeats: 0,
    power: "",
    material: "",
  },
  features: [""],
  featured: false,
  order: 0,
};

function toDefaults(initialData?: Product): ProductFormValues {
  if (!initialData) return EMPTY_DEFAULTS;
  return {
    slug: initialData.slug,
    name: initialData.name,
    tagline: initialData.tagline,
    description: initialData.description,
    color: initialData.color,
    colorHex: initialData.colorHex,
    price: initialData.price,
    images: initialData.images,
    specs: initialData.specs,
    features: initialData.features.length ? initialData.features : [""],
    featured: initialData.featured,
    order: initialData.order,
  };
}

// Server schema still tracks the original 3-bucket size for catalog filtering.
// Derive it from capacity so the operator only sees a single, free-form
// "Persoane" input.
function deriveSizeFromCapacity(
  capacity: number,
): "2-person" | "4-person" | "6+person" {
  if (capacity <= 2) return "2-person";
  if (capacity <= 4) return "4-person";
  return "6+person";
}

export function ProductForm({ mode, initialData }: ProductFormProps) {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid, submitCount },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: toDefaults(initialData),
    mode: "onSubmit",
  });

  // Watch all values so the preview + completeness checklist update live.
  const liveValues = watch();

  async function onSubmit(values: ProductFormValues) {
    const trimmedSlug = (values.slug ?? "").trim();
    const slug = trimmedSlug || slugify(values.name.trim());
    const cleanFeatures = values.features
      .map((v) => v.trim())
      .filter(Boolean);

    const payload = {
      ...values,
      slug,
      size: deriveSizeFromCapacity(values.specs.capacity),
      color: values.color.trim().toLowerCase(),
      colorHex: values.colorHex.toLowerCase(),
      features: cleanFeatures,
      images: values.images.filter(Boolean),
    };

    const endpoint =
      mode === "create"
        ? "/api/products"
        : `/api/products/${encodeURIComponent(initialData!._id)}`;
    const method = mode === "create" ? "POST" : "PUT";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(
          mode === "create" ? "Produs creat" : "Modificări salvate",
        );
        router.push("/admin/products");
        router.refresh();
        return;
      }

      const json = (await response.json().catch(() => ({}))) as {
        error?: string;
        issues?: ZodIssue[];
      };

      if (response.status === 400 && json.issues) {
        for (const issue of json.issues) {
          const path = issue.path.join(".");
          if (path) {
            setError(path as never, {
              type: "server",
              message: issue.message,
            });
          }
        }
        toast.error("Corectați câmpurile evidențiate");
        return;
      }

      if (response.status === 401) {
        toast.error("Sesiunea a expirat. Reconectați-vă.");
        router.push("/admin/login");
        return;
      }

      toast.error(json.error ?? "A apărut o eroare");
    } catch {
      toast.error("Eroare de rețea. Încercați din nou.");
    }
  }

  const submitTried = submitCount > 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pb-32"
      noValidate
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* ===== Form column ===== */}
        <div className="flex flex-col gap-6 lg:col-span-8">
          <SectionCard
            index="01"
            title="Identitate"
            description="Numele de catalog, sloganul și povestea publicată pe fișa produsului."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                id="product-name"
                label="Nume"
                required
                error={errors.name?.message}
              >
                <Input
                  id="product-name"
                  type="text"
                  placeholder="ex. Azure 4"
                  className="h-11 text-base"
                  aria-invalid={errors.name ? true : undefined}
                  {...register("name")}
                />
              </Field>

              <Field
                id="product-tagline"
                label="Slogan"
                required
                error={errors.tagline?.message}
              >
                <Input
                  id="product-tagline"
                  type="text"
                  placeholder="Un rând evocator"
                  className="h-11 text-base"
                  aria-invalid={errors.tagline ? true : undefined}
                  {...register("tagline")}
                />
              </Field>
            </div>

            <Field
              id="product-description"
              label="Descriere"
              required
              error={errors.description?.message}
              hint="Descrierea lungă, afișată pe fișa publică. Markdown acceptat."
            >
              <Textarea
                id="product-description"
                rows={7}
                placeholder="Descrieți experiența: volum, hidromasaj, finisaje, senzații…"
                className="text-base"
                aria-invalid={errors.description ? true : undefined}
                {...register("description")}
              />
            </Field>
          </SectionCard>

          <SectionCard
            index="02"
            title="Aspect"
            description="Numele și nuanța culorii afișate în catalog."
          >
            <ProductFormVariant
              control={control}
              register={register}
              errors={errors}
              watch={watch}
            />
          </SectionCard>

          <SectionCard
            index="03"
            title="Preț"
            description="Preț public afișat în catalog și pe fișa produsului."
          >
            <Field
              id="product-price"
              label="Preț"
              required
              error={errors.price?.message}
            >
              <div className="relative max-w-sm">
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  min="0"
                  className="h-12 pr-16 text-lg tabular-nums"
                  aria-invalid={errors.price ? true : undefined}
                  {...register("price", { valueAsNumber: true })}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                >
                  lei
                </span>
              </div>
            </Field>
          </SectionCard>

          <SectionCard
            index="04"
            title="Specificații tehnice"
            description="Datele afișate pe fișa publică — dimensiuni, volum, capacitate, alimentare, material."
          >
            <ProductFormSpecs
              control={control}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          </SectionCard>

          <SectionCard
            index="05"
            title="Avantaje"
            description="O listă scurtă de puncte forte, afișată pe fișa publică."
          >
            <ProductFormFeatures
              control={control}
              register={register}
              errors={errors}
            />
          </SectionCard>

          <SectionCard
            index="06"
            title="Galerie"
            description="Încărcați imaginile produsului. Prima imagine este vizualul principal."
          >
            <ProductFormImages
              control={control}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          </SectionCard>

          <SectionCard
            index="07"
            title="Vizibilitate"
            description="Setați cum apare produsul în catalog și pe pagina principală."
          >
            <Controller
              control={control}
              name="featured"
              render={({ field }) => (
                <button
                  type="button"
                  role="switch"
                  aria-checked={field.value}
                  onClick={() => field.onChange(!field.value)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  className={cn(
                    "group/feat flex w-full items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    field.value
                      ? "border-accent/40 bg-accent/5 hover:bg-accent/8"
                      : "border-border bg-background hover:border-foreground/30 hover:bg-surface/60",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-flex size-11 items-center justify-center rounded-xl transition-colors",
                        field.value
                          ? "bg-accent text-primary-foreground"
                          : "bg-surface text-muted-foreground",
                      )}
                    >
                      <Sparkles className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-(family-name:--font-fraunces) text-lg font-semibold tracking-tight">
                        Evidențiat pe pagina principală
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        Apare în carusel și în lista „Modele pentru
                        dumneavoastră”.
                      </p>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200",
                      field.value ? "bg-accent" : "bg-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block size-5 rounded-full bg-background shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        field.value ? "translate-x-6" : "translate-x-1",
                      )}
                    />
                  </span>
                </button>
              )}
            />
          </SectionCard>
        </div>

        {/* ===== Live preview rail ===== */}
        <aside className="lg:col-span-4">
          <div className="flex flex-col gap-4 lg:sticky lg:top-8">
            <ProductFormPreview values={liveValues} />
            <ProductFormCompleteness values={liveValues} />
          </div>
        </aside>
      </div>

      {/* ===== Fixed save bar ===== */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4">
        <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-full border border-border bg-background/95 px-4 py-2.5 shadow-lg backdrop-blur-md sm:px-5">
          <div className="flex items-center gap-2 pl-2 text-xs text-muted-foreground">
            <span
              aria-hidden="true"
              className={cn(
                "inline-block size-2 rounded-full transition-colors",
                isDirty ? "animate-pulse bg-accent" : "bg-border",
              )}
            />
            <span className="hidden sm:inline">
              {submitTried && !isValid
                ? "Câmpuri lipsă — verificați completarea"
                : isDirty
                  ? "Modificări nesalvate"
                  : mode === "create"
                    ? "Gata pentru salvare"
                    : "Totul este salvat"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => router.push("/admin/products")}
              disabled={isSubmitting}
            >
              <span>Renunțați</span>
            </Button>
            <Button
              type="submit"
              variant="accent"
              size="sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Se salvează…</span>
                </>
              ) : mode === "create" ? (
                <span>Creați produsul</span>
              ) : (
                <span>Salvați modificările</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

type SectionCardProps = {
  index: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

function SectionCard({ index, title, description, children }: SectionCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_1px_2px_rgba(14,26,36,0.04)]">
      <header className="flex items-start gap-4 border-b border-border bg-surface/40 px-6 py-5">
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-foreground px-1.5 font-mono text-[10px] font-semibold tabular-nums text-background"
        >
          {index}
        </span>
        <div className="flex-1">
          <h2 className="font-(family-name:--font-fraunces) text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="mt-0.5 text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </header>
      <div className="flex flex-col gap-6 px-6 py-6 md:px-8 md:py-7">
        {children}
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ id, label, required, hint, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden="true" className="text-accent">
            *
          </span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
