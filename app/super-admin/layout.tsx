import { BookOpenText, Boxes, Gauge, LayoutTemplate, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getManagementUser } from "../lib/access-control";
import { CMS_PAGES } from "../lib/cms-config";
import LogoutButton from "./logoutButton";
import "../admin-panel.css";

export default async function SuperAdminLayout({ children }: { children: ReactNode }) {
  const session = await getManagementUser();
  if (!session) redirect("/login?next=/super-admin");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/super-admin" className="admin-brand">Hajj Agency CMS</Link>
        <nav className="admin-nav">
          <Link href="/super-admin"><Gauge size={17} /> Dashboard</Link>
          <div className="admin-nav-group">
            <div className="admin-nav-label">Business content</div>
            <Link href="/super-admin/packages"><Boxes size={17} /> Hajj Packages</Link>
            <Link href="/super-admin/blog"><BookOpenText size={17} /> Blog</Link>
            <Link href="/super-admin/settings"><Settings size={17} /> Site & Navbar</Link>
          </div>
          <div className="admin-nav-group">
            <div className="admin-nav-label">Pages and sections</div>
            {CMS_PAGES.map((page) => (
              <Link key={page.slug} href={`/super-admin/pages/${page.slug}`}>
                <LayoutTemplate size={16} /> {page.name}
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
