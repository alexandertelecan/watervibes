import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";

const passwordHash = process.env.ADMIN_PASSWORD_HASH;
const jwtSecret = process.env.JWT_SECRET;

if (!passwordHash) {
  throw new Error("ADMIN_PASSWORD_HASH is not set");
}
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not set");
}

const SECRET_KEY = new TextEncoder().encode(jwtSecret);
const ISSUER = "watervibes";
const EXPIRATION = "7d";

export const SESSION_COOKIE_NAME = "wv_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function verifyPassword(plain: string): Promise<boolean> {
  return bcrypt.compare(plain, passwordHash as string);
}

export async function signSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(EXPIRATION)
    .sign(SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET_KEY, { issuer: ISSUER });
    return true;
  } catch {
    return false;
  }
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
