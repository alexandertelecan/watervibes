"use client";

import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type BilingualFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: "input" | "textarea";
  rows?: number;
  placeholderEn?: string;
  placeholderRo?: string;
  helpText?: string;
};

type ErrorNode = { message?: string } | undefined;

function getNestedError(errors: FieldErrors<FieldValues>, path: string): ErrorNode {
  const parts = path.split(".");
  let current: unknown = errors;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current as ErrorNode;
}

export function BilingualField<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = "input",
  rows = 3,
  placeholderEn,
  placeholderRo,
  helpText,
}: BilingualFieldProps<T>) {
  const enPath = `${name}.en` as Path<T>;
  const roPath = `${name}.ro` as Path<T>;
  const enError = getNestedError(
    errors as FieldErrors<FieldValues>,
    `${name}.en`,
  );
  const roError = getNestedError(
    errors as FieldErrors<FieldValues>,
    `${name}.ro`,
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <Label className="text-sm font-medium">{label}</Label>
        {helpText ? (
          <span className="text-xs text-muted-foreground">{helpText}</span>
        ) : null}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <LangField
          lang="EN"
          type={type}
          rows={rows}
          placeholder={placeholderEn}
          error={enError?.message}
          {...register(enPath)}
        />
        <LangField
          lang="RO"
          type={type}
          rows={rows}
          placeholder={placeholderRo}
          error={roError?.message}
          {...register(roPath)}
        />
      </div>
    </div>
  );
}

type LangFieldProps = {
  lang: "EN" | "RO";
  type: "input" | "textarea";
  rows: number;
  placeholder?: string;
  error?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  ref: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
};

function LangField({
  lang,
  type,
  rows,
  placeholder,
  error,
  ...field
}: LangFieldProps) {
  const badge = (
    <span className="inline-flex h-5 items-center rounded bg-accent px-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
      {lang}
    </span>
  );

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        {badge}
        <span className="text-xs text-muted-foreground">
          {lang === "EN" ? "English" : "Română"}
        </span>
      </div>
      {type === "textarea" ? (
        <Textarea
          rows={rows}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          {...(field as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <Input
          type="text"
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          {...(field as unknown as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
