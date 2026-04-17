import mongoose from "mongoose";
import type { NextRequest } from "next/server";

import { isAdmin } from "@/lib/auth-server";
import { dbConnect } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { productUpdateSchema } from "@/lib/validators/product";

type RouteContext = { params: Promise<{ id: string }> };

function identifierQuery(id: string): Record<string, unknown> {
  return mongoose.Types.ObjectId.isValid(id)
    ? { $or: [{ slug: id }, { _id: id }] }
    : { slug: id };
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = await params;

    const product =
      (await ProductModel.findOne({ slug: id }).lean()) ??
      (mongoose.Types.ObjectId.isValid(id)
        ? await ProductModel.findById(id).lean()
        : null);

    if (!product) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ product });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const parsed = productUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "Invalid body", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const updated = await ProductModel.findOneAndUpdate(
      identifierQuery(id),
      parsed.data,
      { new: true, runValidators: true },
    ).lean();

    if (!updated) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ product: updated });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;

    const deleted = await ProductModel.findOneAndDelete(
      identifierQuery(id),
    ).lean();

    if (!deleted) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
