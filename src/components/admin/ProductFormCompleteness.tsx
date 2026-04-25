"use client";

import { Check, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ProductFormValues } from "./product-form-types";

type Step = {
  id: string;
  label: string;
  done: boolean;
};

type Props = {
  values: ProductFormValues;
};

export function ProductFormCompleteness({ values }: Props) {
  const steps: Step[] = [
    {
      id: "identity",
      label: "Identitate",
      done: Boolean(
        values.name?.trim() &&
          values.tagline?.trim() &&
          values.description?.trim(),
      ),
    },
    {
      id: "color",
      label: "Culoare",
      done: Boolean(values.color?.trim() && /^#[0-9a-fA-F]{6}$/.test(values.colorHex)),
    },
    {
      id: "price",
      label: "Preț",
      done: values.price > 0,
    },
    {
      id: "specs",
      label: "Specificații tehnice",
      done: Boolean(
        values.specs?.lengthMm &&
          values.specs?.widthMm &&
          values.specs?.heightMm &&
          values.specs?.waterVolumeL &&
          values.specs?.capacity &&
          values.specs?.power?.trim() &&
          values.specs?.material?.trim(),
      ),
    },
    {
      id: "features",
      label: "Avantaje",
      done: (values.features ?? []).filter((f) => f.trim()).length > 0,
    },
    {
      id: "gallery",
      label: "Galerie",
      done: (values.images ?? []).filter(Boolean).length > 0,
    },
  ];

  const doneCount = steps.filter((s) => s.done).length;
  const total = steps.length;
  const percent = Math.round((doneCount / total) * 100);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-eyebrow text-foreground">Completare</span>
        <span className="text-sm font-semibold tabular-nums text-foreground">
          {doneCount}/{total}
        </span>
      </div>

      <div className="px-4 pt-3">
        <div
          aria-hidden="true"
          className="h-1 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <ul className="flex flex-col gap-1 px-4 py-3">
        {steps.map((step) => (
          <li
            key={step.id}
            className="flex items-center gap-2.5 py-1 text-sm"
          >
            <span
              aria-hidden="true"
              className={cn(
                "inline-flex size-4 items-center justify-center rounded-full transition-colors duration-200",
                step.done
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {step.done ? (
                <Check className="size-2.5" strokeWidth={3} />
              ) : (
                <Circle className="size-1.5 fill-current" strokeWidth={0} />
              )}
            </span>
            <span
              className={cn(
                "text-sm transition-colors",
                step.done ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
