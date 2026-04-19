import { randomBytes } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
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
  const filename = `${randomBytes(10).toString("hex")}.${ext}`;
  const targetDir = path.join(process.cwd(), "public", "uploads");
  const targetPath = path.join(targetDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(targetPath, buffer);

  return Response.json({ url: `/uploads/${filename}` }, { status: 201 });
}
