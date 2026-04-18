"use client";

import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import { FormSection } from "@/components/admin/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugify } from "@/lib/utils";

import type { ProductFormValues } from "./product-form-types";

type Props = {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
};

export function ProductFormBasics({
  control,
  register,
  errors,
  watch,
  setValue,
}: Props) {
  return (
    <FormSection
      title="Basics"
      description="URL slug, visibility, and manual sort order."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-slug">Slug</Label>
          <Input
            id="product-slug"
            placeholder="azure-4"
            aria-invalid={errors.slug ? true : undefined}
            {...register("slug", {
              onBlur: (event) => {
                const current = event.target.value.trim();
                if (current) return;
                const nameEn = watch("name.en");
                if (nameEn) {
                  setValue("slug", slugify(nameEn), { shouldValidate: true });
                }
              },
            })}
          />
          <p className="text-xs text-muted-foreground">
            URL-safe, lowercase. Auto-generated from the English name if left blank.
          </p>
          {errors.slug ? (
            <p className="text-xs text-destructive">{errors.slug.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-order">Order</Label>
          <Input
            id="product-order"
            type="number"
            step="1"
            aria-invalid={errors.order ? true : undefined}
            {...register("order", { valueAsNumber: true })}
          />
          <p className="text-xs text-muted-foreground">
            Lower numbers appear first in the catalog.
          </p>
          {errors.order ? (
            <p className="text-xs text-destructive">{errors.order.message}</p>
          ) : null}
        </div>
      </div>

      <Controller
        control={control}
        name="featured"
        render={({ field }) => (
          <label className="flex items-center gap-2 text-sm">
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
    </FormSection>
  );
}
