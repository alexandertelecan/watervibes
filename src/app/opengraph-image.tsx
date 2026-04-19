import { ImageResponse } from "next/og";

import { BUSINESS } from "@/lib/seo";

export const alt = `${BUSINESS.brand}, jacuzzi pentru casă, pensiune și hotel`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY = {
  eyebrow: "Hidroterapie premium · 2026",
  headline:
    "Jacuzzi pentru casă, pensiune și hotel. Relaxare reală, zi de zi.",
  foot: "watervibe.ro · Livrare în România",
} as const;

export default function Image() {
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
            gap: 32,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            {COPY.headline}
          </div>
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
              fontSize: 56,
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
                width: 18,
                height: 18,
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
