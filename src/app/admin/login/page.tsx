"use client";

import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FloatingShape } from "@/components/home/FloatingShape";
import { Button } from "@/components/shared/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((data: { authenticated?: boolean }) => {
        if (!cancelled && data.authenticated) router.replace("/admin");
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
        return;
      }
      if (res.status === 429) {
        setError("Prea multe încercări. Reveniți în câteva minute.");
      } else {
        setError("Parolă incorectă.");
      }
    } catch {
      setError("Eroare de rețea. Încercați din nou.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-accent px-6 py-16 text-primary-foreground">
      {mounted ? (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <FloatingShape
          className="absolute top-[6%] left-[6%] h-20 w-20 text-primary-foreground/25 md:top-[8%] md:left-[10%] md:h-40 md:w-40"
          range={120}
          rotate={20}
          bob={14}
          bobDuration={6}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </FloatingShape>

        <FloatingShape
          className="absolute top-[14%] right-[8%] hidden h-56 w-56 text-primary-foreground/20 md:block"
          range={150}
          rotate={-22}
          bob={16}
          bobDuration={7}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </FloatingShape>

        <FloatingShape
          className="absolute bottom-[8%] -left-10 h-36 w-36 text-primary-foreground/20 md:bottom-[12%] md:left-[6%] md:h-72 md:w-72 md:text-primary-foreground/15"
          range={170}
          rotate={28}
          bob={18}
          bobDuration={8}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </FloatingShape>

        <FloatingShape
          className="absolute bottom-[10%] right-[6%] h-14 w-14 text-primary-foreground/30 md:bottom-[8%] md:right-[14%] md:h-24 md:w-24"
          range={110}
          rotate={-18}
          bob={12}
          bobDuration={5.4}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </FloatingShape>

        <FloatingShape
          className="absolute top-[42%] left-[18%] h-2.5 w-2.5 rounded-full bg-primary-foreground/55"
          range={80}
          bob={10}
          bobDuration={4.2}
        >
          <span className="block h-full w-full" />
        </FloatingShape>

        <FloatingShape
          className="absolute top-[28%] right-[22%] hidden h-2 w-2 rounded-full bg-primary-foreground/45 md:block"
          range={70}
          bob={12}
          bobDuration={5}
        >
          <span className="block h-full w-full" />
        </FloatingShape>

        <FloatingShape
          className="absolute bottom-[30%] right-[8%] h-3 w-3 rounded-full bg-primary-foreground/40"
          range={95}
          bob={14}
          bobDuration={6.2}
        >
          <span className="block h-full w-full" />
        </FloatingShape>

        <FloatingShape
          className="absolute bottom-[22%] left-[40%] hidden h-1.5 w-1.5 rounded-full bg-primary-foreground/50 md:block"
          range={60}
          bob={9}
          bobDuration={3.8}
        >
          <span className="block h-full w-full" />
        </FloatingShape>

        <FloatingShape
          className="absolute top-[18%] left-[44%] hidden h-12 w-12 text-primary-foreground/25 md:block"
          range={100}
          rotate={30}
          bob={11}
          bobDuration={4.8}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
        </FloatingShape>
      </div>
      ) : null}

      <Link
        href="/"
        className="group/back absolute top-6 left-6 z-10 inline-flex items-center gap-2 rounded-full px-3 py-2 text-small text-primary-foreground/75 transition hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
      >
        <ArrowLeft
          className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/back:-translate-x-0.5"
          aria-hidden="true"
        />
        <span>Înapoi la pagina principală</span>
      </Link>

      <div className="relative w-full max-w-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-500 motion-safe:ease-out">
        <div className="mb-10 flex flex-col gap-4">
          <h1 className="text-h1 text-primary-foreground">
            Administrare
          </h1>
          <p className="text-body text-primary-foreground/75">
            Introduceți parola pentru a continua în panoul de administrare.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7"
          noValidate
        >
          <div className="flex flex-col gap-3">
            <label
              htmlFor="password"
              className="text-eyebrow text-primary-foreground/65"
            >
              Parolă
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                autoFocus
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                aria-invalid={error ? true : undefined}
                placeholder="••••••••"
                className="w-full border-0 border-b border-primary-foreground/35 bg-transparent pb-3 pr-10 pt-1 text-lg tracking-wide text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/30 focus:border-primary-foreground disabled:opacity-50 aria-invalid:border-[#FFB39A]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                disabled={submitting}
                aria-label={
                  showPassword ? "Ascundeți parola" : "Afișați parola"
                }
                aria-pressed={showPassword}
                className="absolute right-0 bottom-2 flex size-8 items-center justify-center rounded-sm text-primary-foreground/65 transition hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {error ? (
            <p role="alert" className="text-small text-[#FFB39A]">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={submitting || password.length === 0}
            className="mt-1 w-full bg-primary-foreground text-accent hover:bg-primary-foreground/90"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                <span>Se autentifică…</span>
              </>
            ) : (
              <span>Autentificare</span>
            )}
          </Button>
        </form>

        <p className="mt-12 text-center text-small text-primary-foreground/55">
          Această zonă este rezervată echipei WaterVibe.
        </p>
      </div>
    </main>
  );
}
