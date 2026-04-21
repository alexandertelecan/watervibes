import { randomBytes } from "node:crypto";
import { put } from "@vercel/blob";
import type { NextRequest } from "next/server";

import { isAdmin } from "@/lib/auth-server";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);
const EXTENSION_FOR_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Missing file" }, { status: 400 });
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return Response.json(
      { error: "Format neacceptat. Folosiți JPG, PNG, WebP sau AVIF." },
      { status: 415 },
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "Fișier prea mare (maxim 8 MB)." },
      { status: 413 },
    );
  }

  const ext = EXTENSION_FOR_MIME[file.type] ?? "bin";
  const pathname = `uploads/${randomBytes(10).toString("hex")}.${ext}`;

  const blob = await put(pathname, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });

  return Response.json({ url: blob.url }, { status: 201 });
}
