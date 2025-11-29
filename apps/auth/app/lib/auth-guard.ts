import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Stub guard: check for session cookie; extend to call /api/auth/session when available.
export async function requireAuth() {
  const session = cookies().get("session");
  if (!session) {
    redirect("/login");
  }
  return session.value;
}
