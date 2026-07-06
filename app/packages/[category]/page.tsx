import { notFound } from "next/navigation";
import Banner from "../../components/banner";
import Footer from "../../layouts/footer";
import Header from "../../layouts/header2";
import { getPackagesByCategorySlug } from "../../lib/booking-store";
import Link from "next/link";

export default async function PackageCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const result = await getPackagesByCategorySlug(slug);
  if (!result.category) notFound();
  return <><Header /><Banner title={result.category.name} /><section className="section-padding"><div className="container"><div className="section-heading text-center mb-5"><h2>{result.category.name}</h2><div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: result.category.description }} /></div><div className="row g-4">{result.packages.map((item) => <div className="col-lg-4 col-md-6" key={item.id}><div className="single-course"><div className="course-image"><Link href={`/package-details/${item.slug}`}><img src={item.image_url || "/assets/img/courses/1.jpg"} alt={item.title} /></Link></div><div className="course-content"><span className="course_category">{item.category_name}</span><h3><Link href={`/package-details/${item.slug}`}>{item.title}</Link></h3><p>{item.short_description.replace(/<[^>]*>/g, "").slice(0, 140)}</p><div className="d-flex justify-content-between align-items-center"><strong>{item.currency} {item.base_price.toLocaleString()}</strong><Link className="green_btn" href={`/package-details/${item.slug}`}><span>View Package</span></Link></div></div></div></div>)}{result.packages.length === 0 && <div className="col-12"><div className="admin-empty">No packages are available in this category yet.</div></div>}</div></div></section><Footer /></>;
}
