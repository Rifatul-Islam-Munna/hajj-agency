import type { PackageBookingBundle } from "../lib/commerce-types";
import { sanitizeRichHtml } from "../lib/rich-text";
import PackageBookingPanel from "./packageBookingPanel";

export default function TravelBookingView({ bundle }: { bundle: PackageBookingBundle }) {
  const item = bundle.package;
  return <section className="courses-details section-padding"><div className="container"><div className="row g-4">
    <div className="col-lg-8"><div className="single-course"><div className="course-image"><img src={item.image_url || "/assets/img/courses/1.jpg"} alt={item.title} className="w-100" /></div><div className="course-content p-4"><span className="course_category gray_btn">{bundle.category?.name || item.category}</span><h1 className="mt-3">{item.title}</h1><div className="cms-rich-content" dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(item.description || `<p>${item.short_description}</p>`) }} /></div></div></div>
    <div className="col-lg-4"><div className="course-sidebar p-4"><h3>Package Information</h3><ul className="list-unstyled mt-4"><li className="d-flex justify-content-between py-2 border-bottom"><span>Starting price</span><strong>{bundle.settings.currency} {bundle.settings.base_price.toLocaleString()}</strong></li><li className="d-flex justify-content-between py-2 border-bottom"><span>Duration</span><strong>{item.duration}</strong></li><li className="d-flex justify-content-between py-2 border-bottom"><span>Category</span><strong>{bundle.category?.name || item.category}</strong></li><li className="d-flex justify-content-between py-2 border-bottom"><span>Travellers</span><strong>{bundle.settings.min_travellers}-{bundle.settings.max_travellers}</strong></li></ul><PackageBookingPanel bundle={bundle} /></div></div>
  </div></div></section>;
}
