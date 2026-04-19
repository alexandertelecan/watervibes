import { ImageResponse } from "next/og";

import { dbConnect } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { ProductModel } from "@/lib/models/Product";
import { BUSINESS } from "@/lib/seo";

export const alt = `${BUSINESS.brand} jacuzzi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY = {
  eyebrow: "Un model WaterVibe",
  foot: "watervibe.ro · Livrare în România",
  personsOne: "persoană",
  personsMany: "persoane",
} as const;

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  let name: string = BUSINESS.brand;
  let capacity = 0;
  let price = "";
  try {
    await dbConnect();
    const doc = await ProductModel.findOne({ slug: params.slug }).lean();
    if (doc) {
      name = String(doc.name ?? BUSINESS.brand);
      capacity = doc.specs.capacity;
      price = formatPrice(doc.price);
    }
  } catch {
    // fall through to fallback values
  }

  const personsLabel = capacity === 1 ? COPY.personsOne : COPY.personsMany;

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
          <span>{COPY.eyebrow}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 26,
            maxWidth: 1020,
          }}
        >
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
              {capacity} {personsLabel} · {price}
            </div>
          ) : null}
        </div>

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
            {COPY.foot}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
