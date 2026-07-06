import { BookOpenText, Boxes, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { CMS_PAGES } from "../lib/cms-config";
import { getBlogPosts } from "../lib/blog-store";
import { getPackages } from "../lib/package-store";

export default async function SuperAdminDashboard() {
  const [packages, posts] = await Promise.all([
    getPackages({ enabledOnly: false }).catch(() => []),
    getBlogPosts({ enabledOnly: false }).catch(() => []),
  ]);
  return (
    <>
      <h1 className="admin-title">Super Admin Dashboard</h1>
      <p className="admin-subtitle">Manage Hajj packages, blog articles, ImageBB media, navbar text, rich content and SEO.</p>
      <div className="admin-grid">
        <div className="admin-card"><LayoutTemplate size={22} /><span>Total pages</span><div className="admin-stat">{CMS_PAGES.length}</div></div>
        <div className="admin-card"><Boxes size={22} /><span>Total packages</span><div className="admin-stat">{packages.length}</div></div>
        <div className="admin-card"><BookOpenText size={22} /><span>Blog posts</span><div className="admin-stat">{posts.length}</div></div>
      </div>
      <div className="admin-card" style={{ marginTop: 24 }}>
        <h2>Content management</h2>
        <p className="admin-subtitle">The public theme remains unchanged; these tools replace its text and images dynamically.</p>
        <div className="admin-actions" style={{ marginTop: 16 }}>
          <Link className="admin-button" href="/super-admin/pages/home">Edit Home Page</Link>
          <Link className="admin-button secondary" href="/super-admin/packages">Manage Packages</Link>
          <Link className="admin-button secondary" href="/super-admin/blog">Manage Blog</Link>
          <Link className="admin-button secondary" href="/super-admin/settings">Navbar & ImageBB</Link>
        </div>
      </div>
    </>
  );
}
