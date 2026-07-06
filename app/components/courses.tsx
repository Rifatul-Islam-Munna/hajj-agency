"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const coursesData = [
  {
    img: "/assets/img/courses/1.jpg",
    title: "Quran Intermediate Course Brother",
    price: "$40.00",
    category: "Quran",
  },
  {
    img: "/assets/img/courses/2.jpg",
    title: "Tafseer of Surah Al-Fatiha Short Course",
    price: "$49.00",
    category: "Arabic",
  },
  {
    img: "/assets/img/courses/3.jpg",
    title: "Online Islamic Classes With Expert Tutors",
    price: "$80.00",
    category: "Tafsir",
  },
  {
    img: "/assets/img/courses/4.jpg",
    title: "Best Noorani Qaida For Adults Course",
    price: "$39.00",
    category: "Quran",
  },
  {
    img: "/assets/img/courses/5.jpg",
    title: "Islamic Philosophy and Quranic Studies",
    price: "$35.00",
    category: "Arabic",
  },
  {
    img: "/assets/img/courses/6.jpg",
    title: "Online Quran Classes For your Kids",
    price: "$45.00",
    category: "Quran",
  },
  {
    img: "/assets/img/courses/7.jpg",
    title: "Online Tajweed Rules Course for Beginners",
    price: "$65.00",
    category: "Fiqah",
  },
  {
    img: "/assets/img/courses/8.jpg",
    title: "Best Online Hifz Course Structured Hifz Program",
    price: "$75.00",
    category: "Hadith",
  },
];


export default function CoursesSection() {
  return (
    <section className="courses px-2 section-padding">
      <div className="container-fluid">

        {/* Heading */}
        <div className="row">
          <div className="col-lg-12 col-md-12">
             <motion.div
              className="section-heading text-center mb-30"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span>Our Courses</span>
              <h2>Explore Our Popular Courses</h2>
              <img src="/assets/img/icons/title.svg" alt="Title Icon" />
            </motion.div>
          </div>
        </div>

        {/* Courses */}
        <div className="row g-4">
          {coursesData.map((course, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-12">
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
                    <span>
                      <i className="fa-solid fa-users"></i> 1.2k Students
                    </span>
                    <span>
                      <i className="fa-solid fa-clock"></i> 8 Hours
                    </span>
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

        {/* Bottom Link */}
        <div className="col-12">
          <div className="more_courses text-center mt-4">
            <Link href="/courses">
              Browse All Categories Courses{" "}
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}