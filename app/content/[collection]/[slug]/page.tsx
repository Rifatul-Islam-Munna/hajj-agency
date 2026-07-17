import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Banner from "../../../components/banner";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header1";
import { getContentRecord } from "../../../lib/content-store";
import { plainTextFromHtml, sanitizeRichHtml } from "../../../lib/rich-text";

type Props = { params: Promise<{ collection: string; slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection, slug } = await params;
  const item = await getContentRecord(collection, slug).catch(() => null);
  if (!item) return { title: "Details" };
  return { title: item.title, description: plainTextFromHtml(item.content).slice(0, 160), openGraph: item.image_url ? { images: [{ url: item.image_url }] } : undefined };
}
export default async function ConnectedContentDetails({ params }: Props) {
  const { collection, slug } = await params;
  const item = await getContentRecord(collection, slug).catch(() => null);
  if (!item) notFound();
  return <><Header /><Banner title={item.title} /><section className="section-padding"><div className="container"><div className="row g-4 align-items-center">{item.image_url && <div className="col-lg-5"><img src={item.image_url} className="w-100" alt={item.title} /></div>}<div className={item.image_url ? "col-lg-7" : "col-12"}>{item.subtitle && <span>{item.subtitle}</span>}<h1>{item.title}</h1><div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(item.content) }} />{item.link_url && <a className="green_btn mt-3" href={item.link_url}><span>{item.link_text || "Learn More"}</span></a>}</div></div></div></section><Footer /></>;
}
