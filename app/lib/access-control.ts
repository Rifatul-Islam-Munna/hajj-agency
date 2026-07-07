import type { RowDataPacket } from "mysql2";
import { cookies } from "next/headers";
import { authQuery } from "./auth-db";
import { readSessionToken } from "./session-token";

interface UserRow extends RowDataPacket {
  id: number;
  nid_name: string;
  email: string;
  role: string;
}

export async function getManagementUser() {
  const cookieStore = await cookies();
  const token = readSessionToken(cookieStore.get("management_session")?.value);
  if (!token) return null;
  const rows = await authQuery<UserRow[]>(
    "SELECT id, nid_name, email, role FROM users WHERE id = ? LIMIT 1",
    [token.userId],
  );
  const user = rows[0];
  if (!user || user.role !== "super_admin") return null;
  return {
    userId: user.id,
    name: user.nid_name,
    email: user.email,
    role: "super_admin" as const,
  };
}

export async function requireManagementUser() {
  const user = await getManagementUser();
  if (!user) throw new Error("ACCESS_DENIED");
  return user;
}
