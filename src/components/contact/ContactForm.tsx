"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
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

const L = {
  name: "Numele dumneavoastră",
  email: "Adresă de email",
  phone: "Telefon",
  message: "Mesaj",
  submit: "Trimite mesajul",
  submitting: "Se trimite…",
  quoteContextLabel: "Ofertă pentru",
  nameMin: "Vă rugăm să introduceți numele complet.",
  emailInvalid: "Vă rugăm să introduceți o adresă de email validă.",
  phoneMin: "Vă rugăm să introduceți un număr de telefon.",
  messageMin:
    "Un mesaj scurt ne ajută să răspundem cum trebuie. Minim zece caractere.",
  messageMax: "Vă rugăm să păstrați mesajul sub 2000 de caractere.",
  successTitle: "Mulțumim. Mesajul este pe drum.",
  successMessage:
    "Revenim într-o zi lucrătoare cu jacuzzi potriviți și prețul cu livrare. Între timp, puteți răsfoi colecția.",
  sendAnother: "Trimite încă un mesaj",
  toastSuccess: "Mesaj trimis. Revenim în curând.",
  rateLimit:
    "Ați trimis deja câteva mesaje. Așteptați câteva minute înainte să încercați din nou.",
  genericError: (email: string) =>
    `Ceva nu a mers. Încercați din nou sau scrieți-ne direct la ${email}.`,
} as const;

type ContactFormProps = {
  productSlug?: string;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ContactError = {
  error?: string;
  code?: string;
  fieldErrors?: Partial<Record<keyof FormValues, string>>;
};

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@watervibe.ro";

const schema = z.object({
  name: z.string().trim().min(2, L.nameMin).max(80),
  email: z.email(L.emailInvalid).max(120),
  phone: z.string().trim().min(6, L.phoneMin).max(40),
  message: z.string().trim().min(10, L.messageMin).max(2000, L.messageMax),
});

export function ContactForm({ productSlug }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
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
        setProductName(String(payload.product.name));
      })
      .catch(() => {
        /* fail silently — chip stays hidden */
      });
    return () => {
      cancelled = true;
    };
  }, [productSlug]);

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          phone: values.phone?.trim() || undefined,
          productSlug,
        }),
      });

      if (response.ok) {
        toast.success(L.toastSuccess);
        setSubmitted(true);
        reset();
        return;
      }

      const payload = (await response.json().catch(() => ({}))) as ContactError;

      if (response.status === 429) {
        toast.error(L.rateLimit);
        return;
      }

      if (response.status === 400 && payload.fieldErrors) {
        for (const [field, message] of Object.entries(payload.fieldErrors)) {
          if (!message) continue;
          if (
            field === "name" ||
            field === "email" ||
            field === "phone" ||
            field === "message"
          ) {
            setError(field, { type: "server", message });
          }
        }
        return;
      }

      toast.error(L.genericError(CONTACT_EMAIL));
    } catch {
      toast.error(L.genericError(CONTACT_EMAIL));
    }
  }

  const chip =
    productSlug && productName ? (
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-1.5 text-sm text-foreground">
        <span className="text-xs uppercase tracking-wider text-primary">
          {L.quoteContextLabel}
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
            {L.successTitle}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {L.successMessage}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => setSubmitted(false)}
        >
          <span>{L.sendAnother}</span>
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
        <Label htmlFor="contact-name" className={LABEL_STYLES}>
          {L.name}
        </Label>
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
        <Label htmlFor="contact-email" className={LABEL_STYLES}>
          {L.email}
        </Label>
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
          {L.phone}
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
        <Label htmlFor="contact-message" className={LABEL_STYLES}>
          {L.message}
        </Label>
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
        variant="accent"
        size="lg"
        arrow={!isSubmitting}
        className="mt-2 self-start"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            <span>{L.submitting}</span>
          </>
        ) : (
          <span>{L.submit}</span>
        )}
      </Button>
    </form>
  );
}
