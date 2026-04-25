"use client";

import { Armchair, Droplets, Layers, Minus, Plus, Ruler, Sofa, Users, Zap } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

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

export function ProductFormSpecs({ register, errors, watch, setValue }: Props) {
  const specErrors = errors.specs;

  return (
    <div className="flex flex-col gap-10">
      {/* Dimensiuni */}
      <Group icon={Ruler} title="Dimensiuni" hint="Lungime × lățime × înălțime, în milimetri.">
        <div className="grid gap-3 sm:grid-cols-3">
          <UnitField
            id="spec-length"
            label="Lungime"
            unit="mm"
            placeholder="2100"
            error={specErrors?.lengthMm?.message}
            {...register("specs.lengthMm", { valueAsNumber: true })}
          />
          <UnitField
            id="spec-width"
            label="Lățime"
            unit="mm"
            placeholder="2100"
            error={specErrors?.widthMm?.message}
            {...register("specs.widthMm", { valueAsNumber: true })}
          />
          <UnitField
            id="spec-height"
            label="Înălțime"
            unit="mm"
            placeholder="800"
            error={specErrors?.heightMm?.message}
            {...register("specs.heightMm", { valueAsNumber: true })}
          />
        </div>
      </Group>

      {/* Volum apă */}
      <Group icon={Droplets} title="Volum apă" hint="Capacitatea cuvei, în litri.">
        <UnitField
          id="spec-volume"
          label="Volum"
          unit="L"
          placeholder="1200"
          error={specErrors?.waterVolumeL?.message}
          className="max-w-[260px]"
          {...register("specs.waterVolumeL", { valueAsNumber: true })}
        />
      </Group>

      {/* Capacitate */}
      <Group icon={Users} title="Capacitate" hint="Numărul total și defalcarea pe tip de loc.">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stepper
            id="spec-capacity"
            label="Persoane"
            icon={Users}
            min={1}
            value={Number(watch("specs.capacity")) || 0}
            onChange={(v) =>
              setValue("specs.capacity", v, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            register={register("specs.capacity", { valueAsNumber: true })}
            error={specErrors?.capacity?.message}
          />
          <Stepper
            id="spec-lounge"
            label="Locuri lounge"
            icon={Sofa}
            min={0}
            value={Number(watch("specs.loungeSeats")) || 0}
            onChange={(v) =>
              setValue("specs.loungeSeats", v, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            register={register("specs.loungeSeats", { valueAsNumber: true })}
            error={specErrors?.loungeSeats?.message}
          />
          <Stepper
            id="spec-seated"
            label="Locuri în șezut"
            icon={Armchair}
            min={0}
            value={Number(watch("specs.seatedSeats")) || 0}
            onChange={(v) =>
              setValue("specs.seatedSeats", v, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            register={register("specs.seatedSeats", { valueAsNumber: true })}
            error={specErrors?.seatedSeats?.message}
          />
        </div>
      </Group>

      {/* Alimentare + Material */}
      <div className="grid gap-6 md:grid-cols-2">
        <Group icon={Zap} title="Alimentare electrică" hint="Tensiune și frecvență.">
          <Input
            id="spec-power"
            type="text"
            placeholder="220V, 50–60 Hz"
            className="h-11 text-base"
            aria-invalid={specErrors?.power ? true : undefined}
            {...register("specs.power")}
          />
          {specErrors?.power ? (
            <p className="mt-2 text-xs text-destructive">
              {specErrors.power.message}
            </p>
          ) : null}
        </Group>

        <Group icon={Layers} title="Material cuvă" hint="Compoziția suprafeței interioare.">
          <Input
            id="spec-material"
            type="text"
            placeholder="ex. Acril ABS"
            className="h-11 text-base"
            aria-invalid={specErrors?.material ? true : undefined}
            {...register("specs.material")}
          />
          {specErrors?.material ? (
            <p className="mt-2 text-xs text-destructive">
              {specErrors.material.message}
            </p>
          ) : null}
        </Group>
      </div>
    </div>
  );
}

type GroupProps = {
  icon: typeof Ruler;
  title: string;
  hint?: string;
  children: React.ReactNode;
};

function Group({ icon: Icon, title, hint, children }: GroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="inline-flex size-7 items-center justify-center rounded-lg bg-surface text-foreground"
        >
          <Icon className="size-3.5" strokeWidth={2} />
        </span>
        <span className="text-eyebrow text-foreground">{title}</span>
        {hint ? (
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · {hint}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

type UnitFieldProps = React.ComponentProps<"input"> & {
  id: string;
  label: string;
  unit: string;
  error?: string;
};

function UnitField({
  id,
  label,
  unit,
  error,
  className,
  ...inputProps
}: UnitFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div
        className={cn(
          "group/uf relative flex h-11 items-center rounded-lg border border-input bg-background transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          error && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
        )}
      >
        <Input
          id={id}
          type="number"
          inputMode="numeric"
          step="1"
          min="0"
          className="h-full border-none bg-transparent pr-12 text-base tabular-nums shadow-none focus-visible:border-none focus-visible:ring-0"
          aria-invalid={error ? true : undefined}
          {...inputProps}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
        >
          {unit}
        </span>
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

type StepperProps = {
  id: string;
  label: string;
  icon: typeof Users;
  min: number;
  value: number;
  onChange: (next: number) => void;
  register: ReturnType<UseFormRegister<ProductFormValues>>;
  error?: string;
};

function Stepper({
  id,
  label,
  icon: Icon,
  min,
  value,
  onChange,
  register,
  error,
}: StepperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div
        className={cn(
          "flex h-11 items-center gap-1 rounded-lg border bg-background px-1 transition-colors focus-within:ring-3 focus-within:ring-ring/50",
          error
            ? "border-destructive focus-within:ring-destructive/20"
            : "border-input focus-within:border-ring",
        )}
      >
        <button
          type="button"
          aria-label={`Scădeți ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="inline-flex size-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
        >
          <Minus className="size-3.5" />
        </button>
        <Icon
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted-foreground"
          strokeWidth={2}
        />
        <Input
          id={id}
          type="number"
          inputMode="numeric"
          step="1"
          min={min}
          className="h-full flex-1 border-none bg-transparent text-center text-base font-semibold tabular-nums shadow-none focus-visible:border-none focus-visible:ring-0"
          aria-invalid={error ? true : undefined}
          {...register}
        />
        <button
          type="button"
          aria-label={`Adăugați ${label.toLowerCase()}`}
          onClick={() => onChange(value + 1)}
          className="inline-flex size-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
