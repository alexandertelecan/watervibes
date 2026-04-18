"use client";

import { useEffect } from "react";
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
import { COLORS, SIZES } from "@/lib/constants";

import type { ProductFormValues } from "./product-form-types";

type Props = {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
};

export function ProductFormVariant({
  control,
  register,
  errors,
  watch,
  setValue,
}: Props) {
  const color = watch("color");

  useEffect(() => {
    const entry = COLORS.find((c) => c.value === color);
    if (entry) {
      setValue("colorHex", entry.hex, { shouldValidate: true });
    }
  }, [color, setValue]);

  return (
    <FormSection
      title="Variant"
      description="One size + one color per SKU. Duplicate for additional variants."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-size">Size</Label>
          <Controller
            control={control}
            name="size"
            render={({ field }) => (
              <select
                id="product-size"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                onBlur={field.onBlur}
                ref={field.ref}
                className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                aria-invalid={errors.size ? true : undefined}
              >
                <option value="">Select size…</option>
                {SIZES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.value}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.size ? (
            <p className="text-xs text-destructive">{errors.size.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-color">Color</Label>
          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <select
                id="product-color"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                onBlur={field.onBlur}
                ref={field.ref}
                className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                aria-invalid={errors.color ? true : undefined}
              >
                <option value="">Select color…</option>
                {COLORS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.value}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.color ? (
            <p className="text-xs text-destructive">{errors.color.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-color-hex">Color hex</Label>
          <div className="flex items-center gap-2">
            <span
              className="size-6 shrink-0 rounded-full ring-1 ring-border"
              style={{ backgroundColor: watch("colorHex") || "transparent" }}
              aria-hidden="true"
            />
            <Input
              id="product-color-hex"
              readOnly
              aria-invalid={errors.colorHex ? true : undefined}
              {...register("colorHex")}
            />
          </div>
          {errors.colorHex ? (
            <p className="text-xs text-destructive">{errors.colorHex.message}</p>
          ) : null}
        </div>
      </div>
    </FormSection>
  );
}
