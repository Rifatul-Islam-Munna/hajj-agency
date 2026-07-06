import { cookies } from "next/headers";

export async function getManagementUser() {
  const cookieStore = await cookies();
  const userId = Number(cookieStore.get("user_id")?.value);
  const access = cookieStore.get("management_access")?.value;
  if (!userId || access !== "allowed") return null;
  return {
    userId,
    name: "Super Admin",
    email: "",
    role: "super_admin" as const,
  };
}

export async function requireManagementUser() {
  const user = await getManagementUser();
  if (!user) throw new Error("ACCESS_DENIED");
  return user;
}
