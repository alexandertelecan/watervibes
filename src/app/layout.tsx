import type { Metadata } from "next";
import { Fraunces, Manrope, Plus_Jakarta_Sans } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PublicChrome } from "@/components/layout/PublicChrome";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { JsonLd } from "@/components/shared/JsonLd";
import { Toaster } from "@/components/ui/sonner";
import {
  OG_LOCALE,
  SITE_URL,
  alternatesFor,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

import "./globals.css";

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

const fraunces = Fraunces({
  variable: "--font-wordmark",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const HOME_TITLE =
  "Jacuzzi Exterior pentru Casă, Pensiune și Hotel · WaterVibe România";
const HOME_DESCRIPTION =
  "Jacuzzi cu hidromasaj pentru două, patru sau șase persoane. Modele de interior și exterior. Livrare în toată România, consultanță, preț ferm și pași clari de instalare.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s · WaterVibe",
  },
  description: HOME_DESCRIPTION,
  applicationName: "WaterVibe",
  authors: [{ name: "ENSAMA SRL" }],
  creator: "ENSAMA SRL",
  publisher: "ENSAMA SRL",
  category: "Jacuzzi / Hidromasaj",
  keywords: [
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
  ],
  alternates: alternatesFor(""),
  openGraph: {
    siteName: "WaterVibe",
    locale: OG_LOCALE,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ro"
      className={cn(
        manrope.variable,
        jakarta.variable,
        fraunces.variable,
        "h-full antialiased",
      )}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SkipToContent />
        <PublicChrome>
          <Header />
        </PublicChrome>
        <main id="main" className="flex-1">
          {children}
        </main>
        <PublicChrome>
          <Footer />
        </PublicChrome>
        <Toaster position="bottom-right" richColors />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
