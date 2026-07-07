import { BookOpenText, Boxes, CreditCard, Files, FolderTree, Gauge, Images, Inbox, LayoutTemplate, ListChecks, Settings, Share2, ShoppingBag, UserRoundCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CMS_PAGES } from "../lib/cms-config";

export default function AdminSidebar() {
  const pages = CMS_PAGES.filter((page) => page.slug !== "home-2" && !["faq", "cart", "checkout", "package-details", "instructor-details", "blog-details"].includes(page.slug));
  return <aside className="admin-sidebar"><Link href="/super-admin" className="admin-brand"><span>HA</span><div>Hajj Agency<small>Super Admin</small></div></Link><nav className="admin-nav">
    <Link href="/super-admin"><Gauge size={18} /> Dashboard</Link>
    <Group title="Commerce"><Link href="/super-admin/orders"><ShoppingBag size={18} /> Orders</Link><Link href="/super-admin/packages"><Boxes size={18} /> Packages</Link><Link href="/super-admin/categories"><FolderTree size={18} /> Categories</Link><Link href="/super-admin/booking-forms"><ListChecks size={18} /> Booking Forms</Link><Link href="/super-admin/payments"><CreditCard size={18} /> Payments</Link></Group>
    <Group title="Website Content"><Link href="/super-admin/blog"><BookOpenText size={18} /> Blog</Link><Link href="/super-admin/content"><Files size={18} /> Content Hub</Link><Link href="/super-admin/content/guides"><UserRoundCheck size={18} /> Islamic Scholars</Link></Group>
    <Group title="Communication & Settings"><Link href="/super-admin/contacts"><Inbox size={18} /> Contact Enquiries</Link><Link href="/super-admin/social-links"><Share2 size={18} /> Social Links</Link><Link href="/super-admin/settings"><Settings size={18} /> Site & Navbar</Link><Link href="/super-admin/footer-contact"><Images size={18} /> Footer & Contact</Link></Group>
    <Group title="Pages">{pages.map((page) => <Link key={page.slug} href={`/super-admin/pages/${page.slug}`}><LayoutTemplate size={17} /> {page.name}</Link>)}</Group>
  </nav></aside>;
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return <div className="admin-nav-group"><div className="admin-nav-label">{title}</div>{children}</div>;
}
