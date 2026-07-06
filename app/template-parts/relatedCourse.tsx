import Link from "next/link";

const relatedCourses = [
  {
    image: "/assets/img/courses/1.jpg",
    title: "Quran Intermediate Course for Everyone",
    price: "$40.00",
    category: "Quran",
  },
  {
    image: "/assets/img/courses/2.jpg",
    title: "Tafseer of Surah Al-Fatiha Short Course",
    price: "$49.00",
    category: "Arabic",
  },
  {
    image: "/assets/img/courses/3.jpg",
    title: "Online Islamic Classes With Expert Tutors",
    price: "$80.00",
    category: "Tafsir",
  },
];

export default function RelatedCourses() {
  return (
    <div className="related-courses">
      <h3 className="created-title mb-4">Courses You May Like</h3>

      <div className="row g-4">
        {relatedCourses.map((course, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <div className="single-course wow fadeInUp" data-wow-delay=".1s">
              
              <div className="course-image">
                
                {/* IMAGE (no width/height) */}
                <div className="relative w-full h-[250px]">
                  <img
                    src={course.image}
                    alt="Course Image"
                  />
                </div>

                <div className="course_author">
                    <img
                      src="/assets/img/author/1.png"
                      alt="Author Image"
                      
                    />


                  <span>
                    <strong>Kari.</strong>{" "}
                    <Link href="#">Abdul Hakim</Link>
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

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}