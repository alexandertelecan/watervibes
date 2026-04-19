"use client";

import { Plus, X } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
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
};

export function ProductFormFeatures({ control, register, errors }: Props) {
  const features = useFieldArray<ProductFormValues>({
    control,
    name: "features" as never,
  });

  const featureErrors = errors.features as
    | ({ message?: string } & { [index: number]: { message?: string } })
    | undefined;

  return (
    <FormSection
      title="Features"
      description="Feature bullets shown on the product detail page."
    >
      <div className="flex flex-col gap-3">
        {features.fields.map((field, index) => {
          const perField = featureErrors
            ? (featureErrors as unknown as { [index: number]: { message?: string } })[index]
            : undefined;
          return (
            <div
              key={field.id}
              className="grid items-start gap-3 md:grid-cols-[1fr_auto]"
            >
              <div className="flex flex-col gap-1.5">
                <Input
                  type="text"
                  placeholder={`Feature ${index + 1}`}
                  {...register(`features.${index}` as const)}
                  aria-invalid={perField ? true : undefined}
                />
                {perField?.message ? (
                  <p className="text-xs text-destructive">{perField.message}</p>
                ) : null}
              </div>
              <div className="flex items-start pt-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => features.remove(index)}
                  aria-label={`Remove feature ${index + 1}`}
                >
                  <X aria-hidden="true" />
                </Button>
              </div>
            </div>
          );
        })}

        {featureErrors?.message ? (
          <p className="text-xs text-destructive">{featureErrors.message}</p>
        ) : null}

        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => features.append("" as never)}
          >
            <Plus aria-hidden="true" /> Add feature
          </Button>
        </div>
      </div>
    </FormSection>
  );
}
