import mongoose from "mongoose";
import type { NextRequest } from "next/server";

import { isAdmin } from "@/lib/auth-server";
import { dbConnect } from "@/lib/db";
import { TestimonialModel } from "@/lib/models/Testimonial";
import { testimonialSchema } from "@/lib/validators/testimonial";

type RouteContext = { params: Promise<{ id: string }> };

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    const testimonial = await TestimonialModel.findById(id).lean();
    if (!testimonial) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ testimonial });
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
    if (!isValidObjectId(id)) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "Invalid body", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const updated = await TestimonialModel.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ testimonial: updated });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    const deleted = await TestimonialModel.findByIdAndDelete(id).lean();
    if (!deleted) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
