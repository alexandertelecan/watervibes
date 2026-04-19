"use client";

import { Minus, Plus, Users } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
  const colorHex = watch("colorHex") || "#1A3BC7";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Label htmlFor="product-capacity">
          Persoane
          <span aria-hidden="true" className="text-accent">
            *
          </span>
        </Label>
        <div className="inline-flex items-center gap-1 rounded-2xl border border-border bg-background p-1 shadow-sm transition-colors focus-within:border-foreground/40">
          <CapacityButton
            label="−"
            ariaLabel="Scădeți o persoană"
            onClick={() => {
              const current = Number(watch("specs.capacity") || 0);
              setValue("specs.capacity", Math.max(1, current - 1), {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            icon={<Minus className="size-4" />}
          />
          <Input
            id="product-capacity"
            type="number"
            min="1"
            step="1"
            className="h-11 w-24 rounded-xl border-none bg-transparent text-center text-lg font-semibold tabular-nums shadow-none focus-visible:ring-0"
            aria-invalid={errors.specs?.capacity ? true : undefined}
            {...register("specs.capacity", { valueAsNumber: true })}
          />
          <CapacityButton
            label="+"
            ariaLabel="Adăugați o persoană"
            onClick={() => {
              const current = Number(watch("specs.capacity") || 0);
              setValue("specs.capacity", current + 1, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            icon={<Plus className="size-4" />}
          />
          <span
            aria-hidden="true"
            className="ml-1 inline-flex items-center gap-1.5 px-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            <Users className="size-3.5" strokeWidth={2} />
            persoane
          </span>
        </div>
        {errors.specs?.capacity ? (
          <p className="text-xs text-destructive">
            {errors.specs.capacity.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 md:grid-cols-[1fr_220px]">
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-color">
            Culoare
            <span aria-hidden="true" className="text-accent">
              *
            </span>
          </Label>
          <Input
            id="product-color"
            type="text"
            placeholder="ex. Marina Blue, Grafit, Perlat…"
            className="h-11 text-base"
            aria-invalid={errors.color ? true : undefined}
            {...register("color")}
          />
          {errors.color ? (
            <p className="text-xs text-destructive">{errors.color.message}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Numele afișat în filtrele din catalog.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-color-hex">Nuanță</Label>
          <Controller
            control={control}
            name="colorHex"
            render={({ field }) => (
              <div
                className={cn(
                  "group/picker flex h-11 items-center gap-2 rounded-lg border bg-background px-2 transition-colors",
                  errors.colorHex
                    ? "border-destructive ring-3 ring-destructive/20"
                    : "border-input focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
                )}
              >
                <label
                  htmlFor="product-color-hex"
                  className="relative inline-flex size-7 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md ring-1 ring-inset ring-border transition-transform duration-200 hover:scale-105"
                  style={{ backgroundColor: colorHex }}
                  aria-label="Alegeți nuanța"
                >
                  <input
                    id="product-color-hex"
                    type="color"
                    value={colorHex}
                    onChange={(event) =>
                      field.onChange(event.target.value.toLowerCase())
                    }
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </label>
                <input
                  type="text"
                  value={colorHex}
                  onChange={(event) => {
                    const v = event.target.value.trim();
                    field.onChange(v.startsWith("#") ? v : `#${v}`);
                  }}
                  spellCheck={false}
                  className="w-full bg-transparent font-mono text-sm uppercase tracking-wider outline-none placeholder:text-muted-foreground"
                  aria-label="Cod hex al culorii"
                />
              </div>
            )}
          />
          {errors.colorHex ? (
            <p className="text-xs text-destructive">
              {errors.colorHex.message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CapacityButton({
  label,
  ariaLabel,
  onClick,
  icon,
}: {
  label: string;
  ariaLabel: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex size-9 items-center justify-center rounded-xl text-foreground transition-all duration-150 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
    >
      <span className="sr-only">{label}</span>
      {icon}
    </button>
  );
}
