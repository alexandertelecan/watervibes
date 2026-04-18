"use client";

import { Plus, X } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import { FormSection } from "@/components/admin/FormSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { ProductFormValues } from "./product-form-types";

type Props = {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
};

export function ProductFormFeatures({
  control,
  register,
  errors,
  watch,
  setValue,
}: Props) {
  // features.en and features.ro are parallel arrays — one logical "row" per
  // index. useFieldArray on features.en tracks the row count; features.ro
  // gets mirrored updates via setValue.
  const enArray = useFieldArray<ProductFormValues>({
    control,
    name: "features.en" as never,
  });

  const roValues = watch("features.ro") ?? [];
  const enErrors = (errors.features as { en?: { message?: string }[] } | undefined)?.en;
  const roErrors = (errors.features as { ro?: { message?: string }[] } | undefined)?.ro;

  function addRow() {
    enArray.append("" as never);
    setValue("features.ro", [...roValues, ""], { shouldDirty: true });
  }

  function removeRow(index: number) {
    enArray.remove(index);
    const next = [...roValues];
    next.splice(index, 1);
    setValue("features.ro", next, { shouldDirty: true });
  }

  return (
    <FormSection
      title="Features"
      description="Bilingual feature bullets shown on the product detail page."
    >
      <div className="flex flex-col gap-3">
        {enArray.fields.map((field, index) => (
          <div
            key={field.id}
            className="grid items-start gap-3 md:grid-cols-[1fr_1fr_auto]"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 items-center rounded bg-accent px-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  EN
                </span>
              </div>
              <Input
                type="text"
                placeholder="Feature in English"
                {...register(`features.en.${index}` as const)}
                aria-invalid={enErrors?.[index] ? true : undefined}
              />
              {enErrors?.[index]?.message ? (
                <p className="text-xs text-destructive">
                  {enErrors[index]?.message}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 items-center rounded bg-accent px-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  RO
                </span>
              </div>
              <Input
                type="text"
                placeholder="Feature in Română"
                {...register(`features.ro.${index}` as const)}
                aria-invalid={roErrors?.[index] ? true : undefined}
              />
              {roErrors?.[index]?.message ? (
                <p className="text-xs text-destructive">
                  {roErrors[index]?.message}
                </p>
              ) : null}
            </div>
            <div className="flex items-end pt-5">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeRow(index)}
                aria-label={`Remove feature ${index + 1}`}
              >
                <X aria-hidden="true" />
              </Button>
            </div>
          </div>
        ))}

        <div>
          <Button type="button" variant="outline" size="sm" onClick={addRow}>
            <Plus aria-hidden="true" /> Add feature
          </Button>
        </div>
      </div>
    </FormSection>
  );
}
