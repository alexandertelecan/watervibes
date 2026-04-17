"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const INPUT_STYLES =
  "h-11 w-full rounded-sm border border-border bg-background px-3 text-body text-foreground transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface outline-none placeholder:text-muted-foreground aria-invalid:border-destructive";

const LABEL_STYLES = "text-eyebrow text-foreground";

import type { Locale } from "@/i18n/routing";

type ContactFormProps = {
  locale: Locale;
  productSlug?: string;
};

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

type ContactError = {
  error?: string;
  code?: string;
  fieldErrors?: Partial<Record<keyof FormValues, string>>;
};

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@watervibes.example";

export function ContactForm({ locale, productSlug }: ContactFormProps) {
  const t = useTranslations("contact.form");
  const tToast = useTranslations("contact.toast");

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t("validation.nameMin")).max(80),
        email: z.email(t("validation.emailInvalid")).max(120),
        phone: z
          .string()
          .trim()
          .max(40)
          .optional()
          .or(z.literal("").transform(() => undefined)),
        message: z
          .string()
          .trim()
          .min(10, t("validation.messageMin"))
          .max(2000, t("validation.messageMax")),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const [productName, setProductName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!productSlug) return;
    let cancelled = false;
    fetch(`/api/products/${encodeURIComponent(productSlug)}`)
      .then(async (res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (cancelled || !payload?.product?.name) return;
        const name = payload.product.name as { en?: string; ro?: string };
        setProductName(name[locale] ?? name.en ?? null);
      })
      .catch(() => {
        /* fail silently — chip stays hidden */
      });
    return () => {
      cancelled = true;
    };
  }, [productSlug, locale]);

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          phone: values.phone?.trim() || undefined,
          productSlug,
          locale,
        }),
      });

      if (response.ok) {
        toast.success(tToast("success"));
        setSubmitted(true);
        reset();
        return;
      }

      const payload = (await response.json().catch(() => ({}))) as ContactError;

      if (response.status === 429) {
        toast.error(t("error.rateLimit"));
        return;
      }

      if (response.status === 400 && payload.fieldErrors) {
        for (const [field, message] of Object.entries(payload.fieldErrors)) {
          if (!message) continue;
          if (field === "name" || field === "email" || field === "phone" || field === "message") {
            setError(field, { type: "server", message });
          }
        }
        return;
      }

      toast.error(t("error.generic", { email: CONTACT_EMAIL }));
    } catch {
      toast.error(t("error.generic", { email: CONTACT_EMAIL }));
    }
  }

  const chip =
    productSlug && productName ? (
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-1.5 text-sm text-foreground">
        <span className="text-xs uppercase tracking-wider text-primary">
          {t("quoteContextLabel")}
        </span>
        <span className="font-medium">{productName}</span>
      </div>
    ) : null;

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4">
        {chip}
        <div>
          <h3 className="font-heading text-2xl text-foreground">
            {t("success.title")}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {t("success.message")}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => setSubmitted(false)}
        >
          <span>{t("success.sendAnother")}</span>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {chip}

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-name" className={LABEL_STYLES}>{t("name")}</Label>
        <Input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          className={INPUT_STYLES}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-email" className={LABEL_STYLES}>{t("email")}</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          className={INPUT_STYLES}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-phone" className={LABEL_STYLES}>
          {t("phone")}
          <span className="ml-2 text-[10px] font-normal normal-case tracking-normal text-muted-foreground">
            {t("phoneOptional")}
          </span>
        </Label>
        <Input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={errors.phone ? true : undefined}
          className={INPUT_STYLES}
          {...register("phone")}
        />
        {errors.phone ? (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message" className={LABEL_STYLES}>{t("message")}</Label>
        <Textarea
          id="contact-message"
          rows={5}
          aria-invalid={errors.message ? true : undefined}
          className={cn(INPUT_STYLES, "h-auto min-h-32 py-3 leading-relaxed")}
          {...register("message")}
        />
        {errors.message ? (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        arrow={!isSubmitting}
        className="mt-2 self-start"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            <span>{t("submitting")}</span>
          </>
        ) : (
          <span>{t("submit")}</span>
        )}
      </Button>
    </form>
  );
}
