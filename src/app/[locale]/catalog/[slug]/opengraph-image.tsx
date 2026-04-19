import { ImageResponse } from "next/og";

import { assertLocale, BUSINESS } from "@/lib/seo";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";

// Per-product OG image — renders the product name, capacity, and price
// over the aqua/charcoal brand slab. No external photo fetch (edge
// runtime can't reliably reach arbitrary image hosts inside a tight
// budget, and we don't want to hard-fail a share card).

export const alt = `${BUSINESS.brand} jacuzzi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY: Record<string, { eyebrow: string; priceFrom: string; foot: string; personsOne: string; personsMany: string }> = {
  ro: {
    eyebrow: "Un model WaterVibe",
    priceFrom: "De la",
    foot: "watervibe.ro · Livrare în România",
    personsOne: "persoană",
    personsMany: "persoane",
  },
  en: {
    eyebrow: "A WaterVibe model",
    priceFrom: "From",
    foot: "watervibe.ro · Delivered across Romania",
    personsOne: "person",
    personsMany: "persons",
  },
};

export default async function Image({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = assertLocale(params.locale);
  const copy = COPY[locale] ?? COPY.ro;

  // Load the product — if it doesn't exist, render the fallback slab so
  // the share surface never 500s.
  let name: string = BUSINESS.brand;
  let capacity = 0;
  let price = "";
  try {
    await dbConnect();
    const doc = await ProductModel.findOne({ slug: params.slug }).lean();
    if (doc) {
      name = doc.name[locale] ?? doc.name.ro;
      capacity = doc.specs.capacity;
      price = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(doc.price);
    }
  } catch {
    // fall through to fallback values
  }

  const personsLabel = capacity === 1 ? copy.personsOne : copy.personsMany;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          background:
            "linear-gradient(135deg, #0f1417 0%, #0b2d30 55%, #0f4043 100%)",
          color: "#f7f7f7",
          fontFamily: "sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#5fdfd4",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#5fdfd4",
              display: "block",
            }}
          />
          <span>{copy.eyebrow}</span>
        </div>

        {/* Product name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 1020 }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: "#ffffff",
            }}
          >
            {name}
          </div>
          {capacity > 0 ? (
            <div
              style={{
                fontSize: 34,
                color: "rgba(247,247,247,0.85)",
                letterSpacing: "-0.01em",
              }}
            >
              {capacity} {personsLabel} · {copy.priceFrom} {price}
            </div>
          ) : null}
        </div>

        {/* Wordmark foot */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(247,247,247,0.22)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                background: "#5fdfd4",
                display: "block",
              }}
            />
            <span>WaterVibe</span>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(247,247,247,0.78)",
              letterSpacing: "0.04em",
            }}
          >
            {copy.foot}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
