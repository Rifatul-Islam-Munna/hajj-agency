'use client';
import { motion } from "framer-motion";
import Link from "next/link";

const courses = [
  { id: 1, img: "/assets/img/courses/1.jpg", price: "$40.00", title: "Quran Intermediate Course Brother", category: "Quran" },
  { id: 2, img: "/assets/img/courses/2.jpg", price: "$49.00", title: "Tafseer of Surah Al-Fatiha Short Course", category: "Arabic" },
  { id: 3, img: "/assets/img/courses/3.jpg", price: "$80.00", title: "Online Islamic Classes With Expert Tutors", category: "Tafsir" },
  { id: 4, img: "/assets/img/courses/4.jpg", price: "$39.00", title: "Best Noorani Qaida For Adults Course", category: "Quran" },
  { id: 5, img: "/assets/img/courses/5.jpg", price: "$35.00", title: "Islamic Philosophy and Quranic Studies", category: "Arabic" },
  { id: 6, img: "/assets/img/courses/6.jpg", price: "$45.00", title: "Online Quran Classes For your Kids", category: "Quran" },
  { id: 7, img: "/assets/img/courses/7.jpg", price: "$65.00", title: "Online Tajweed Rules Course for Beginners", category: "Fiqah" },
  { id: 8, img: "/assets/img/courses/8.jpg", price: "$75.00", title: "Best Online Hifz Course Structured Hifz Program", category: "Hadith" },
];

export default function CoursesGrid() {
  return (
    <section className="courses px-2 section-padding">
      <div className="container-fluid">
        <div className="row g-4">

          {courses.map((course) => (
            <div key={course.id} className="col-lg-3 col-md-6">
              <motion.div
                  className="single-course"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                  }}
                  viewport={{ once: true }}
                >

                <div className="course-image">
                  <img src={course.img} alt="Course Image" />

                  <div className="course_author">
                    <img src="/assets/img/author/1.png" alt="Author Image" />
                    <span>
                      <strong>Kari.</strong> <Link href="/instructor-details">Abdul Hakim</Link>
                    </span>
                  </div>
                </div>

                <div className="course-content">
                  <div className="course_meta d-flex justify-content-between">
                    <div className="cor_rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>

                    <span className="cor_price">{course.price}</span>
                  </div>

                  <h3>
                    <Link href="/course-details">{course.title}</Link>
                  </h3>

                  <div className="course_meta d-flex justify-content-between">
                    <span><i className="fa-solid fa-users"></i> 1.2k Students</span>
                    <span><i className="fa-solid fa-clock"></i> 8 Hours</span>
                  </div>

                  <div className="d-flex course_btn gap-3 mt-3">
                    <Link href="/course-details" className="green_border_btn">Start Now</Link>
                    <Link href="/courses" className="course_category gray_btn">{course.category}</Link>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}

          {/* Pagination */}
          <motion.div
            className="col-12 text-center"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
          >
            <div className="post_pagination">
              <ul>
                <li><Link href="#"><i className="ph ph-arrow-left"></i></Link></li>
                <li><Link href="#">1</Link></li>
                <li className="active"><Link href="#">2</Link></li>
                <li><Link href="#">3</Link></li>
                <li><Link href="#"><i className="ph ph-arrow-right"></i></Link></li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}