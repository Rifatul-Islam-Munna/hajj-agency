import Link from "next/link";
import type { PackageRecord } from "../lib/cms-db";

export default function TravelPackageView({ item }: { item: PackageRecord }) {
  return (
    <section className="courses-details section-padding">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="single-course">
              <div className="course-image">
                <img src={item.image_url || "/assets/img/courses/1.jpg"} alt={item.title} className="w-100" />
              </div>
              <div className="course-content p-4">
                <span className="course_category gray_btn">{item.category}</span>
                <h1 className="mt-3">{item.title}</h1>
                <p>{item.description || item.short_description}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="course-sidebar p-4">
              <h3>Package Information</h3>
              <ul className="list-unstyled mt-4">
                <li className="d-flex justify-content-between py-2 border-bottom"><span>Price</span><strong>{item.price}</strong></li>
                <li className="d-flex justify-content-between py-2 border-bottom"><span>Duration</span><strong>{item.duration}</strong></li>
                <li className="d-flex justify-content-between py-2 border-bottom"><span>Type</span><strong>{item.category}</strong></li>
              </ul>
              <Link href={item.button_url || "/contact"} className="green_btn d-block text-center mt-4">
                <span>{item.button_text || "Book This Package"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
