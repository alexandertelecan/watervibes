import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import type { NextRequest } from "next/server";

import { isAdmin } from "@/lib/auth-server";

const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

const MAX_BYTES = 25 * 1024 * 1024;

// Vercel Blob client-upload route. The browser uploads the file bytes
// directly to Blob storage; this function only mints a one-time token
// (and is invoked again as a webhook once the upload finishes).
//
// Why client uploads instead of server proxy: Vercel Hobby caps the
// serverless function body at ~4.5 MB. Phone photos blow past that. The
// client-upload pattern bypasses that ceiling because the file never
// passes through this function — only a tiny JSON exchange does.
export async function POST(request: NextRequest) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAdmin())) {
          throw new Error("Unauthorized");
        }
        return {
          allowedContentTypes: [...ALLOWED_MIME],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
          tokenPayload: null,
        };
      },
      onUploadCompleted: async () => {
        // No-op. Vercel calls this webhook after the upload finishes; we
        // don't persist the URL here because the form receives it
        // synchronously via the client `upload()` resolver. On localhost
        // this callback fails (Blob can't reach the loopback) — that's
        // expected and harmless.
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload token error";
    const status = message === "Unauthorized" ? 401 : 400;
    return Response.json({ error: message }, { status });
  }
}
