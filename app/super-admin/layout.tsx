import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getManagementUser } from "../lib/access-control";
import AdminSidebar from "./adminSidebar";
import LogoutButton from "./logoutButton";
import "../admin-panel.css";

export default async function SuperAdminLayout({ children }: { children: ReactNode }) {
  const session = await getManagementUser();
  if (!session) redirect("/login?next=/super-admin");
  return <div className="admin-shell"><AdminSidebar /><main className="admin-main"><header className="admin-topbar"><div><strong>Hajj Agency Administration</strong><span className="admin-topbar-user">Signed in as {session.name}</span></div><LogoutButton /></header><div className="admin-content">{children}</div></main></div>;
}
