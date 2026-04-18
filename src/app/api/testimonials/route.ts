import type { NextRequest } from "next/server";

import { isAdmin } from "@/lib/auth-server";
import { dbConnect } from "@/lib/db";
import { TestimonialModel } from "@/lib/models/Testimonial";
import { testimonialSchema } from "@/lib/validators/testimonial";

export async function GET() {
  try {
    await dbConnect();
    const testimonials = await TestimonialModel.find()
      .sort({ featured: -1, createdAt: -1 })
      .lean();
    return Response.json({ testimonials });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "Invalid body", issues: parsed.error.issues },
        { status: 400 },
      );
    }
    const created = await TestimonialModel.create(parsed.data);
    return Response.json({ testimonial: created.toObject() }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
