export default function RelatedCourses() {
  return (

<div className="col-xl-4 wow fadeIn">
  <div className="course-sidebar">

    {/* Video */}
    <div className="cd-video mb-3">
        <iframe
          src="https://www.youtube.com/embed/HFYfI_ZC3EQ?si=EVeOUkNZgl-UeY6Y"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>


    {/* Price */}
    <div className="cd_price mb-3">
      <del>$350</del> <span>$300</span>
    </div>

    {/* Enroll Button */}
    <div className="text-start mb-4">
      <a href="/cart" className="green_btn py40">
        <span>Enroll Now</span>
        <i className="ph ph-arrow-right"></i>
      </a>
    </div>

    {/* Course Info */}
    <ul className="scourse_list">
      <li>
        <span className="cside-label">
          <i className="fa-regular fa-clock"></i> Duration
        </span>
        <span className="cside-value">24 Hours</span>
      </li>

      <li>
        <span className="cside-label">
          <i className="fa-regular fa-file"></i> Lesson
        </span>
        <span className="cside-value">15</span>
      </li>

      <li>
        <span className="cside-label">
          <i className="fa-solid fa-graduation-cap"></i> Student’s
        </span>
        <span className="cside-value">150</span>
      </li>

      <li>
        <span className="cside-label">
          <i className="fa-solid fa-clapperboard"></i> Video
        </span>
        <span className="cside-value">10 Hours</span>
      </li>

      <li>
        <span className="cside-label">
          <i className="fa-solid fa-chart-line"></i> Skill Level
        </span>
        <span className="cside-value">Advanced</span>
      </li>

      <li>
        <span className="cside-label">
          <i className="fa-solid fa-language"></i> Language
        </span>
        <span className="cside-value">English</span>
      </li>
    </ul>

    {/* Share */}
    <div className="cd_social">
      <span>Share on:</span>
      <ul>
        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
        <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
        <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
        <li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
      </ul>
    </div>

  </div>
</div>

  );
}