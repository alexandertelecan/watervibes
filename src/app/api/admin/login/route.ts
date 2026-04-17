import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

import {
  SESSION_COOKIE_NAME,
  getSessionCookieOptions,
  signSessionToken,
  verifyPassword,
} from "@/lib/auth";

// Naive sliding-window rate limiter: N failed attempts per IP per WINDOW.
// In-memory only; resets on server restart. Replace with Upstash/Redis for prod.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const failedAttempts = new Map<string, number[]>();

const loginSchema = z.object({ password: z.string().min(1) });

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
  const bucket = (failedAttempts.get(ip) ?? []).filter((t) => t > cutoff);
  failedAttempts.set(ip, bucket);
  return bucket.length >= RATE_LIMIT_MAX;
}

function recordFailure(ip: string): void {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const bucket = (failedAttempts.get(ip) ?? []).filter((t) => t > cutoff);
  bucket.push(now);
  failedAttempts.set(ip, bucket);
}

function clearFailures(ip: string): void {
  failedAttempts.delete(ip);
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await verifyPassword(parsed.data.password);
  if (!ok) {
    recordFailure(ip);
    await sleep(300);
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  clearFailures(ip);
  const token = await signSessionToken();
  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    ...getSessionCookieOptions(),
  });
  return response;
}
