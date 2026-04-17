import { isAdmin } from "@/lib/auth-server";

export async function GET() {
  const authenticated = await isAdmin();
  return Response.json({ authenticated });
}
