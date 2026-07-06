import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getManagementUser } from "../lib/access-control";
import { CMS_PAGES } from "../lib/cms-config";
import LogoutButton from "./logoutButton";
import "./admin.css";

export default async function SuperAdminLayout({ children }: { children: ReactNode }) {
  const session = await getManagementUser();
  if (!session) redirect("/login?next=/super-admin");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/super-admin" className="admin-brand">Hajj Agency CMS</Link>
        <nav className="admin-nav">
          <Link href="/super-admin">Dashboard</Link>
          <div className="admin-nav-group">
            <div className="admin-nav-label">Packages</div>
            <Link href="/super-admin/packages">Manage Packages</Link>
          </div>
          <div className="admin-nav-group">
            <div className="admin-nav-label">Pages</div>
            {CMS_PAGES.map((page) => (
              <Link key={page.slug} href={`/super-admin/pages/${page.slug}`}>
                {page.name}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-user">Signed in as <strong>{session.name}</strong></div>
          <LogoutButton />
        </header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
