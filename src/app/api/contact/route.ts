import type { NextRequest } from "next/server";

import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { sendContactEmail } from "@/lib/resend";
import { contactSchema } from "@/lib/validators/contact";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateBuckets = new Map<string, number[]>();

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const bucket = (rateBuckets.get(ip) ?? []).filter((t) => t > cutoff);
  if (bucket.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, bucket);
    return true;
  }
  bucket.push(now);
  rateBuckets.set(ip, bucket);
  return false;
}

async function resolveProductName(slug: string): Promise<string | undefined> {
  try {
    await dbConnect();
    const product = await ProductModel.findOne({ slug })
      .select({ name: 1 })
      .lean<{ name: string }>();
    return product?.name;
  } catch {
    return undefined;
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests", code: "rate_limited" },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path.join(".");
        if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
      }
      return Response.json(
        { error: "Invalid body", fieldErrors },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const productName = data.productSlug
      ? await resolveProductName(data.productSlug)
      : undefined;

    const result = await sendContactEmail({ ...data, productName });
    if (!result.success) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[contact] Resend failed:", result.error);
      } else {
        console.error("[contact] send failed");
      }
      return Response.json({ error: "Failed to send" }, { status: 500 });
    }

    console.log(`[contact] submission ok (id=${result.id})`);
    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
