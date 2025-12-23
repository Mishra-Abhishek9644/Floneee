// app/account/layout.tsx
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let payload: any;

  try {
    payload = verifyToken(token); // must return decoded payload
  } catch {
    redirect("/login");
  }

  // ✅ Role based routing at SERVER level
  if (payload.role === "admin") {
    return <>{children}</>;
  }

  if (payload.role === "user") {
    return <>{children}</>;
  }

  // fallback
  redirect("/login");
}
