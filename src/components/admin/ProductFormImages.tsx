"use client";

import { Plus, X } from "lucide-react";
import Image from "next/image";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
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
};

// TODO: Cloudinary uploader integration. For now paste image URLs.
export function ProductFormImages({ control, register, errors, watch }: Props) {
  const images = useFieldArray<ProductFormValues>({
    control,
    name: "images" as never,
  });
  const values = watch("images") ?? [];
  const imagesError = errors.images as
    | { message?: string; [index: number]: { message?: string } }
    | undefined;

  return (
    <FormSection
      title="Images"
      description="Paste Cloudinary URLs. The first image is the primary thumbnail."
    >
      <div className="flex flex-col gap-3">
        {images.fields.map((field, index) => {
          const url = values[index] ?? "";
          const perField = imagesError
            ? (imagesError as unknown as { [index: number]: { message?: string } })[index]
            : undefined;
          return (
            <div
              key={field.id}
              className="grid items-center gap-3 md:grid-cols-[80px_1fr_auto]"
            >
              <div className="relative size-16 overflow-hidden rounded-lg border border-border bg-accent/40">
                {url ? (
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    unoptimized
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                    preview
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  {index === 0 ? (
                    <span className="inline-flex h-5 items-center rounded bg-primary px-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                      Primary
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Image {index + 1}
                    </span>
                  )}
                </div>
                <Input
                  type="url"
                  placeholder="https://res.cloudinary.com/…"
                  aria-invalid={perField ? true : undefined}
                  {...register(`images.${index}` as const)}
                />
                {perField?.message ? (
                  <p className="text-xs text-destructive">{perField.message}</p>
                ) : null}
              </div>
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => images.remove(index)}
                  aria-label={`Remove image ${index + 1}`}
                  disabled={images.fields.length <= 1}
                >
                  <X aria-hidden="true" />
                </Button>
              </div>
            </div>
          );
        })}

        {imagesError?.message ? (
          <p className="text-xs text-destructive">{imagesError.message}</p>
        ) : null}

        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => images.append("" as never)}
          >
            <Plus aria-hidden="true" /> Add image
          </Button>
        </div>
      </div>
    </FormSection>
  );
}
