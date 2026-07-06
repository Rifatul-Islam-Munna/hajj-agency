'use client';
import { motion } from "framer-motion";
import Link from "next/link";

const courses = [
  {
    id: 1,
    image: "/assets/img/courses/1.jpg",
    title: "Quran Intermediate Course Brother",
    price: "$40.00",
    category: "Quran",
  },
  {
    id: 2,
    image: "/assets/img/courses/2.jpg",
    title: "Tafseer of Surah Al-Fatiha Short Course",
    price: "$49.00",
    category: "Arabic",
  },
  {
    id: 3,
    image: "/assets/img/courses/3.jpg",
    title: "Online Islamic Classes With Expert Tutors",
    price: "$80.00",
    category: "Tafsir",
  },
  {
    id: 4,
    image: "/assets/img/courses/4.jpg",
    title: "Best Noorani Qaida For Adults Course",
    price: "$39.00",
    category: "Quran",
  },
];

export default function InstructorCourses() {
  return (
    <section className="courses section-padding">
      <div className="container-fluid">

        <div className="row">
          <motion.div
            className="col-lg-6 col-12 mb-60"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            viewport={{ once: true }}
          >
            <div className="section-heading">
              <span>My Courses</span>
              <h2>Most Popular Courses</h2>
              <img src="/assets/img/icons/title.svg" alt="Title Icon" />
            </div>
          </motion.div>
        </div>

        <div className="row gy-4 course_item">

          {courses.map((course) => (
            <div key={course.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
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
                  <img src={course.image} alt="Course Image" />

                  <div className="course_author">
                    <img src="/assets/img/author/1.png" alt="Author Image" />
                    <span>
                      <strong>Kari.</strong> <Link href="#">Abdul Hakim</Link>
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
                    <Link href="/course-details" className="green_border_btn">
                      Start Now
                    </Link>
                    <Link href="/courses" className="course_category gray_btn">
                      {course.category}
                    </Link>
                  </div>
                </div>

              </motion.div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}