"use client";

import { upload } from "@vercel/blob/client";
import { ImagePlus, Loader2, Star, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import type {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import type { ProductFormValues } from "./product-form-types";

type Props = {
  control?: Control<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
};

const ACCEPT = "image/jpeg,image/png,image/webp,image/avif";

export function ProductFormImages({ errors, watch, setValue }: Props) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const images = watch("images") ?? [];
  const imagesError = errors.images as
    | { message?: string; [index: number]: { message?: string } }
    | undefined;

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files);
      if (!list.length) return;

      setUploading(true);
      const uploaded: string[] = [];
      try {
        for (const file of list) {
          try {
            const blob = await upload(`uploads/${file.name}`, file, {
              access: "public",
              handleUploadUrl: "/api/upload",
              contentType: file.type,
            });
            uploaded.push(blob.url);
          } catch (err) {
            const message =
              err instanceof Error ? err.message : "Încărcare eșuată";
            toast.error(`${file.name}: ${message}`);
          }
        }

        if (uploaded.length) {
          const current = watch("images") ?? [];
          setValue("images", [...current, ...uploaded], {
            shouldDirty: true,
            shouldValidate: true,
          });
          toast.success(
            uploaded.length === 1
              ? "Imagine încărcată"
              : `${uploaded.length} imagini încărcate`,
          );
        }
      } finally {
        setUploading(false);
      }
    },
    [setValue, watch],
  );

  function removeAt(index: number) {
    const next = images.filter((_, i) => i !== index);
    setValue("images", next, { shouldDirty: true, shouldValidate: true });
  }

  function makePrimary(index: number) {
    if (index === 0) return;
    const next = [
      images[index],
      ...images.filter((_, i) => i !== index),
    ];
    setValue("images", next, { shouldDirty: true, shouldValidate: true });
  }

  function onDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files?.length) {
      void uploadFiles(event.dataTransfer.files);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {images.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((url, index) => {
            const perField = imagesError
              ? (
                  imagesError as unknown as {
                    [index: number]: { message?: string };
                  }
                )[index]
              : undefined;
            const isPrimary = index === 0;
            return (
              <li
                key={`${url}-${index}`}
                className={cn(
                  "group/tile relative aspect-square overflow-hidden rounded-2xl border bg-surface transition-all duration-200",
                  isPrimary
                    ? "border-accent shadow-md"
                    : "border-border hover:border-foreground/30 hover:shadow-sm",
                )}
              >
                <Image
                  src={url}
                  alt=""
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 200px, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover/tile:opacity-100"
                />

                {isPrimary ? (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
                    <Star
                      aria-hidden="true"
                      className="size-2.5 fill-current"
                    />
                    Principală
                  </span>
                ) : null}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 p-2 opacity-0 transition-opacity duration-200 group-hover/tile:pointer-events-auto group-hover/tile:opacity-100">
                  {!isPrimary ? (
                    <button
                      type="button"
                      onClick={() => makePrimary(index)}
                      className="inline-flex h-7 items-center gap-1 rounded-full bg-background/95 px-2 text-[11px] font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
                    >
                      <Star aria-hidden="true" className="size-3" />
                      Principală
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => removeAt(index)}
                    aria-label={`Eliminați imaginea ${index + 1}`}
                    className="inline-flex size-7 items-center justify-center rounded-full bg-background/95 text-destructive shadow-sm backdrop-blur-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 aria-hidden="true" className="size-3.5" />
                  </button>
                </div>

                {perField?.message ? (
                  <span className="absolute inset-x-1 bottom-1 rounded bg-destructive/95 px-1.5 py-0.5 text-[10px] text-destructive-foreground">
                    {perField.message}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}

      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={cn(
          "group/drop relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-background p-10 text-center transition-all duration-200",
          dragActive
            ? "border-accent bg-accent/5"
            : "border-border hover:border-foreground/40 hover:bg-surface/50",
          uploading && "pointer-events-none opacity-70",
        )}
      >
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          onChange={(event) => {
            if (event.target.files?.length) {
              void uploadFiles(event.target.files);
              event.target.value = "";
            }
          }}
        />

        <span
          aria-hidden="true"
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-2xl transition-all duration-200",
            dragActive
              ? "bg-accent text-primary-foreground"
              : "bg-surface text-muted-foreground group-hover/drop:bg-foreground group-hover/drop:text-primary-foreground",
          )}
        >
          {uploading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : images.length > 0 ? (
            <ImagePlus className="size-5" strokeWidth={1.75} />
          ) : (
            <Upload className="size-5" strokeWidth={1.75} />
          )}
        </span>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-foreground">
            {uploading
              ? "Se încarcă…"
              : images.length > 0
                ? "Adăugați mai multe imagini"
                : "Trageți imaginile aici sau apăsați pentru a alege"}
          </p>
          <p className="text-xs text-muted-foreground">
            JPG, PNG, WebP sau AVIF · maxim 25 MB per fișier
          </p>
        </div>
      </label>

      {imagesError?.message && images.length === 0 ? (
        <p className="text-xs text-destructive">{imagesError.message}</p>
      ) : null}
    </div>
  );
}
