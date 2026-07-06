import Link from "next/link";
import { CMS_PAGES } from "../lib/cms-config";
import { getPackages } from "../lib/cms-db";

export default async function SuperAdminDashboard() {
  const packages = await getPackages({ enabledOnly: false }).catch(() => []);
  const enabledPackages = packages.filter((item) => item.enabled).length;
  return (
    <>
      <h1 className="admin-title">Super Admin Dashboard</h1>
      <p className="admin-subtitle">Manage page SEO, every section, visibility controls and package content.</p>
      <div className="admin-grid">
        <div className="admin-card"><span>Total pages</span><div className="admin-stat">{CMS_PAGES.length}</div></div>
        <div className="admin-card"><span>Total packages</span><div className="admin-stat">{packages.length}</div></div>
        <div className="admin-card"><span>Active packages</span><div className="admin-stat">{enabledPackages}</div></div>
      </div>
      <div className="admin-card" style={{ marginTop: 24 }}>
        <h2>Content management</h2>
        <p className="admin-subtitle">Choose a page from the sidebar to edit SEO and section content, or manage package cards and details.</p>
        <div className="admin-actions" style={{ marginTop: 16 }}>
          <Link className="admin-button" href="/super-admin/pages/home">Edit Home Page</Link>
          <Link className="admin-button secondary" href="/super-admin/packages">Manage Packages</Link>
        </div>
      </div>
    </>
  );
}
