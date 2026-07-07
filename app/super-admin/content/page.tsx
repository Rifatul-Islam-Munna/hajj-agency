import { CircleHelp, Columns3, HandHeart, Images, Link2, MessageSquareQuote, UserRoundCheck } from "lucide-react";
import Link from "next/link";

const sections = [
  { slug: "slider", title: "Hero Slider", text: "Add, edit and reorder homepage slider items.", icon: Images },
  { slug: "faq", title: "Homepage FAQ", text: "Questions and rich-text answers shown on the homepage.", icon: CircleHelp },
  { slug: "pillars", title: "Five Pillars", text: "Pillar cards, images, text and links shown on the homepage.", icon: Columns3 },
  { slug: "services", title: "Services", text: "Hajj and Umrah service cards and details.", icon: HandHeart },
  { slug: "guides", title: "Islamic Scholars", text: "Scholar profiles, photos, roles and social links.", icon: UserRoundCheck },
  { slug: "testimonials", title: "Testimonials", text: "Pilgrim reviews displayed on the homepage.", icon: MessageSquareQuote },
  { slug: "footer-links", title: "Footer Links", text: "Company and quick links in the footer.", icon: Link2 },
];

export default function ContentHubPage() {
  return <div><h1 className="admin-title">Website Content</h1><p className="admin-subtitle">Choose the section you want to manage. Each section has its own focused screen.</p><div className="admin-content-grid">{sections.map((section) => { const Icon = section.icon; return <Link className="admin-content-card" href={`/super-admin/content/${section.slug}`} key={section.slug}><Icon size={24} /><div><h3>{section.title}</h3><p>{section.text}</p></div></Link>; })}</div></div>;
}
