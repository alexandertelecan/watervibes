"use client";

import { Plus, X } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import { Button } from "@/components/shared/Button";
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
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2">
        {features.fields.map((field, index) => {
          const perField = featureErrors
            ? (
                featureErrors as unknown as {
                  [index: number]: { message?: string };
                }
              )[index]
            : undefined;
          return (
            <li
              key={field.id}
              className="group/feat flex items-center gap-2"
            >
              <span
                aria-hidden="true"
                className="font-mono text-xs tabular-nums text-muted-foreground/60 w-6"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={`Avantaj ${index + 1}`}
                  className="h-11 text-base"
                  aria-invalid={perField ? true : undefined}
                  {...register(`features.${index}` as const)}
                />
                {perField?.message ? (
                  <p className="mt-1 text-xs text-destructive">
                    {perField.message}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => features.remove(index)}
                aria-label={`Eliminați avantajul ${index + 1}`}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-all duration-200 group-hover/feat:opacity-100 hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </li>
          );
        })}
      </ul>

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
          <Plus aria-hidden="true" className="size-4" />
          <span>Adăugați un avantaj</span>
        </Button>
      </div>
    </div>
  );
}
