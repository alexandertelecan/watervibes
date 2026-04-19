"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ProductFormFeatures } from "@/components/admin/ProductFormFeatures";
import { ProductFormImages } from "@/components/admin/ProductFormImages";
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
    dimensions: "",
    jets: 0,
    capacity: 4,
    power: "",
    weightEmpty: "",
    weightFull: "",
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
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: toDefaults(initialData),
    mode: "onSubmit",
  });

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-16 pb-32"
      noValidate
    >
      <Section
        title="Identitate"
        description="Numele de catalog, sloganul și povestea publicată pe fișa produsului."
      >
        <div className="grid gap-6 md:grid-cols-2">
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
      </Section>

      <Section
        title="Variantă"
        description="Capacitatea și culoarea fișei. Numele culorii apare la filtrele din catalog."
      >
        <ProductFormVariant
          control={control}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      </Section>

      <Section
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
      </Section>

      <Section
        title="Specificații tehnice"
        description="Detaliile afișate în tabelul tehnic al produsului."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <SpecField
            id="spec-dimensions"
            label="Dimensiuni"
            placeholder="2,1 m × 2,1 m × 0,9 m"
            error={errors.specs?.dimensions?.message}
            {...register("specs.dimensions")}
          />
          <SpecField
            id="spec-power"
            label="Putere"
            placeholder="3,5 kW"
            error={errors.specs?.power?.message}
            {...register("specs.power")}
          />
          <SpecField
            id="spec-jets"
            label="Duze"
            type="number"
            step="1"
            min="0"
            error={errors.specs?.jets?.message}
            {...register("specs.jets", { valueAsNumber: true })}
          />
          <SpecField
            id="spec-weight-empty"
            label="Greutate gol"
            placeholder="280 kg"
            error={errors.specs?.weightEmpty?.message}
            {...register("specs.weightEmpty")}
          />
          <SpecField
            id="spec-weight-full"
            label="Greutate plin"
            placeholder="1.600 kg"
            error={errors.specs?.weightFull?.message}
            {...register("specs.weightFull")}
          />
        </div>
      </Section>

      <Section
        title="Avantaje"
        description="O listă scurtă de puncte forte, afișată pe fișa publică."
      >
        <ProductFormFeatures
          control={control}
          register={register}
          errors={errors}
        />
      </Section>

      <Section
        title="Galerie"
        description="Încărcați imaginile produsului. Prima imagine este vizualul principal."
      >
        <ProductFormImages
          control={control}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      </Section>

      <Section
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
      </Section>

      <div className="sticky bottom-4 z-20 mx-auto w-full">
        <div className="mx-auto flex items-center justify-between gap-3 rounded-full border border-border bg-background/95 px-4 py-2.5 shadow-lg backdrop-blur-md sm:px-5">
          <div className="flex items-center gap-2 pl-2 text-xs text-muted-foreground">
            <span
              aria-hidden="true"
              className={cn(
                "inline-block size-2 rounded-full transition-colors",
                isDirty ? "bg-accent animate-pulse" : "bg-border",
              )}
            />
            <span className="hidden sm:inline">
              {isDirty
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

type SectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function Section({ title, description, children }: SectionProps) {
  return (
    <section className="grid gap-8 md:grid-cols-[260px_1fr] md:gap-12">
      <header className="md:pt-1">
        <h2 className="font-(family-name:--font-fraunces) text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="flex flex-col gap-6">{children}</div>
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

type SpecFieldProps = React.ComponentProps<"input"> & {
  id: string;
  label: string;
  error?: string;
};

function SpecField({ id, label, error, ...inputProps }: SpecFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        className="h-11 text-base"
        aria-invalid={error ? true : undefined}
        {...inputProps}
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
