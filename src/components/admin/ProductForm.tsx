"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormSection } from "@/components/admin/FormSection";
import { ProductFormBasics } from "@/components/admin/ProductFormBasics";
import { ProductFormFeatures } from "@/components/admin/ProductFormFeatures";
import { ProductFormImages } from "@/components/admin/ProductFormImages";
import { ProductFormVariant } from "@/components/admin/ProductFormVariant";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  size: "" as ProductFormValues["size"],
  color: "" as ProductFormValues["color"],
  colorHex: "",
  price: 0,
  images: [""],
  specs: {
    dimensions: "",
    jets: 0,
    capacity: 1,
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
    size: initialData.size,
    color: initialData.color,
    colorHex: initialData.colorHex,
    price: initialData.price,
    images: initialData.images.length ? initialData.images : [""],
    specs: initialData.specs,
    features: initialData.features.length ? initialData.features : [""],
    featured: initialData.featured,
    order: initialData.order,
  };
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
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: toDefaults(initialData),
    mode: "onSubmit",
  });

  async function onSubmit(values: ProductFormValues) {
    const clean: ProductFormValues = {
      ...values,
      images: values.images.map((v) => v.trim()).filter(Boolean),
      features: values.features.map((v) => v.trim()).filter(Boolean),
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
        body: JSON.stringify(clean),
      });

      if (response.ok) {
        toast.success(
          mode === "create" ? "Product created" : "Product updated",
        );
        router.push("/admin/products");
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10" noValidate>
      <ProductFormBasics
        control={control}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />

      <FormSection title="Naming & copy">
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-name">Name</Label>
          <Input
            id="product-name"
            type="text"
            placeholder="Azure 4"
            aria-invalid={errors.name ? true : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-tagline">Tagline</Label>
          <Input
            id="product-tagline"
            type="text"
            placeholder="A short, evocative one-liner"
            aria-invalid={errors.tagline ? true : undefined}
            {...register("tagline")}
          />
          {errors.tagline ? (
            <p className="text-xs text-destructive">{errors.tagline.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <Label htmlFor="product-description">Description</Label>
            <span className="text-xs text-muted-foreground">Markdown supported</span>
          </div>
          <Textarea
            id="product-description"
            rows={6}
            placeholder="Long-form product description"
            aria-invalid={errors.description ? true : undefined}
            {...register("description")}
          />
          {errors.description ? (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          ) : null}
        </div>
      </FormSection>

      <ProductFormVariant
        control={control}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />

      <FormSection title="Pricing">
        <div className="max-w-xs">
          <Label htmlFor="product-price">Price (lei)</Label>
          <Input
            id="product-price"
            type="number"
            step="0.01"
            min="0"
            aria-invalid={errors.price ? true : undefined}
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price ? (
            <p className="text-xs text-destructive">{errors.price.message}</p>
          ) : null}
        </div>
      </FormSection>

      <FormSection title="Specifications">
        <div className="grid gap-4 md:grid-cols-2">
          <SpecField
            id="spec-dimensions"
            label="Dimensions"
            placeholder="2.1m × 2.1m × 0.9m"
            error={errors.specs?.dimensions?.message}
            {...register("specs.dimensions")}
          />
          <SpecField
            id="spec-power"
            label="Power"
            placeholder="3.5 kW"
            error={errors.specs?.power?.message}
            {...register("specs.power")}
          />
          <SpecField
            id="spec-jets"
            label="Jets"
            type="number"
            step="1"
            min="0"
            error={errors.specs?.jets?.message}
            {...register("specs.jets", { valueAsNumber: true })}
          />
          <SpecField
            id="spec-capacity"
            label="Capacity (persons)"
            type="number"
            step="1"
            min="1"
            error={errors.specs?.capacity?.message}
            {...register("specs.capacity", { valueAsNumber: true })}
          />
          <SpecField
            id="spec-weight-empty"
            label="Weight empty"
            placeholder="280 kg"
            error={errors.specs?.weightEmpty?.message}
            {...register("specs.weightEmpty")}
          />
          <SpecField
            id="spec-weight-full"
            label="Weight full"
            placeholder="1,600 kg"
            error={errors.specs?.weightFull?.message}
            {...register("specs.weightFull")}
          />
        </div>
      </FormSection>

      <ProductFormFeatures
        control={control}
        register={register}
        errors={errors}
      />

      <ProductFormImages
        control={control}
        register={register}
        errors={errors}
        watch={watch}
      />

      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-border bg-background/95 py-4 backdrop-blur">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => router.push("/admin/products")}
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
            <span>Create product</span>
          ) : (
            <span>Save changes</span>
          )}
        </Button>
      </div>
    </form>
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
      <Input id={id} aria-invalid={error ? true : undefined} {...inputProps} />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
