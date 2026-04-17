import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, getSessionCookieOptions } from "@/lib/auth";

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST() {
  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}
