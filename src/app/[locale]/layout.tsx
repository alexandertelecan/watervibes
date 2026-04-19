import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Fraunces, Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { JsonLd } from "@/components/shared/JsonLd";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import {
  OG_LOCALES,
  SITE_URL,
  assertLocale,
  hreflangFor,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Plus Jakarta Sans is our display face — chunky, humanist, Airbnb-Cereal
// adjacent. The CSS custom-property name `--font-fraunces` is historical
// (we used to ship Fraunces); kept to avoid renaming across 28+ files.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

// Fraunces — wordmark-only face (see DESIGN.md §2.1). Loaded as a
// variable font with SOFT + opsz axes so the logo can dial in softer
// curves at display size. Not used for body, headings, or anywhere
// outside .text-wordmark.
const fraunces = Fraunces({
  variable: "--font-wordmark",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "brand" });
  const tMeta = await getTranslations({ locale, namespace: "meta.home" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: tMeta("title"),
      template: `%s · ${t("name")}`,
    },
    description: tMeta("description"),
    applicationName: t("name"),
    authors: [{ name: "ENSAMA SRL" }],
    creator: "ENSAMA SRL",
    publisher: "ENSAMA SRL",
    category: locale === "ro" ? "Jacuzzi / Hidromasaj" : "Jacuzzi / Hot tub",
    keywords:
      locale === "ro"
        ? [
            "jacuzzi",
            "jacuzzi România",
            "jacuzzi exterior",
            "jacuzzi interior",
            "jacuzzi 2 persoane",
            "jacuzzi 4 persoane",
            "jacuzzi 6 persoane",
            "hidromasaj",
            "hidroterapie",
            "jacuzzi terasă",
            "jacuzzi grădină",
            "jacuzzi pensiune",
            "jacuzzi hotel",
            "jacuzzi pentru pensiune",
            "jacuzzi pentru hotel",
            "jacuzzi Prahova",
            "jacuzzi Câmpina",
            "jacuzzi București",
            "jacuzzi Cluj",
            "jacuzzi Brașov",
            "cadă cu hidromasaj",
            "preț jacuzzi",
            "livrare jacuzzi România",
          ]
        : [
            "jacuzzi",
            "jacuzzi Romania",
            "hot tub",
            "hot tub Romania",
            "outdoor jacuzzi",
            "indoor jacuzzi",
            "2 person jacuzzi",
            "4 person jacuzzi",
            "6 person jacuzzi",
            "hydromassage",
            "hydrotherapy",
            "guesthouse jacuzzi",
            "hotel jacuzzi",
            "terrace hot tub",
            "garden hot tub",
            "jacuzzi Bucharest",
            "jacuzzi Cluj",
            "jacuzzi Prahova",
            "jacuzzi delivery Romania",
          ],
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: hreflangFor(""),
    },
    openGraph: {
      siteName: t("name"),
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALES[l]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    formatDetection: { telephone: true, email: true, address: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }
  const locale = assertLocale(rawLocale);
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={cn(
        manrope.variable,
        jakarta.variable,
        fraunces.variable,
        "h-full antialiased",
      )}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <SkipToContent />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </NextIntlClientProvider>
        {/* Global structured data — Organization + WebSite identify the
            brand and site for Google's Knowledge Graph. Page-level schemas
            (Product, BreadcrumbList, LocalBusiness) are emitted further
            down the tree. */}
        <JsonLd data={[organizationSchema(), websiteSchema(locale)]} />
      </body>
    </html>
  );
}
