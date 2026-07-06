import { notFound } from "next/navigation";
import Banner from "../../components/banner";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header2";
import { getContentRecord } from "../../lib/content-store";
import { sanitizeRichHtml } from "../../lib/rich-text";

export default async function ScholarDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scholar = await getContentRecord("guides", slug).catch(() => null);
  if (!scholar) notFound();
  return <><Header /><Banner title={scholar.title} /><section className="section-padding"><div className="container"><div className="row g-5 align-items-start"><div className="col-lg-5"><img src={scholar.image_url || "/assets/img/scholars/1.png"} alt={scholar.title} className="w-100 rounded" /></div><div className="col-lg-7"><span className="course_category gray_btn">{scholar.subtitle || "Islamic Scholar"}</span><h1 className="mt-3">{scholar.title}</h1><div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(scholar.content) }} /><div className="d-flex gap-2 mt-4">{scholar.social_facebook && <a className="green_border_btn" href={scholar.social_facebook}><i className="fa-brands fa-facebook-f"></i></a>}{scholar.social_x && <a className="green_border_btn" href={scholar.social_x}><i className="fa-brands fa-x-twitter"></i></a>}{scholar.social_youtube && <a className="green_border_btn" href={scholar.social_youtube}><i className="fa-brands fa-youtube"></i></a>}</div></div></div></div></section><Footer /></>;
}
