import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;

  if (!token) redirect("/login");

  try {
    verifyToken(token);
  } catch {
    redirect("/login");
  }

  return <>{children}</>;
}
