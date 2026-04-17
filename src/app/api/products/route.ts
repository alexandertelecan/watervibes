import type { NextRequest } from "next/server";

import { PRODUCT_SIZES } from "@/lib/constants";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import {
  productQuerySchema,
  productSchema,
} from "@/lib/validators/product";

function splitCsv(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function isAuthorizedAdmin(): boolean {
  // TODO(Phase 5): verify JWT cookie issued by /api/admin/login.
  return false;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const parsed = productQuerySchema.safeParse({
      size: searchParams.get("size") ?? undefined,
      color: searchParams.get("color") ?? undefined,
    });
    if (!parsed.success) {
      return Response.json({ error: "Invalid query" }, { status: 400 });
    }

    const sizes = splitCsv(parsed.data.size).filter((s) =>
      (PRODUCT_SIZES as readonly string[]).includes(s),
    );
    const colors = splitCsv(parsed.data.color);

    const filter: Record<string, unknown> = {};
    if (sizes.length) filter.size = { $in: sizes };
    if (colors.length) filter.color = { $in: colors };

    const products = await ProductModel.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return Response.json({ products });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedAdmin()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await request.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "Invalid body", issues: parsed.error.issues },
        { status: 400 },
      );
    }
    const created = await ProductModel.create(parsed.data);
    return Response.json({ product: created.toObject() }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
