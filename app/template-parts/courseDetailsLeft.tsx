"use client";

import { useState } from "react";
import Link from "next/link";

export default function CourseDetails() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="col-xl-8 wow fadeIn">

      {/* Course Image */}
      <div className="scourse_image position-relative">
        <img src="/assets/img/courses/course-details.jpg" alt="image" />
      </div>

      <h2 className="scourse-title">
        Quran Intermediate Course Brother
      </h2>

      {/* Tabs */}
      <nav className="cd_tab">
        <div id="nav-tab" className="nav nav-tabs">

          <button
            className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
            type="button"
          >
            Overview
          </button>

          <button
            className={`nav-link ${activeTab === "curriculum" ? "active" : ""}`}
            onClick={() => setActiveTab("curriculum")}
            type="button"
          >
            Curriculum
          </button>

          <button
            className={`nav-link ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
            type="button"
          >
            Review
          </button>

          <button
            className={`nav-link ${activeTab === "instructor" ? "active" : ""}`}
            onClick={() => setActiveTab("instructor")}
            type="button"
          >
            Instructor
          </button>

        </div>
      </nav>

      {/* Tab Content */}
      <div id="nav-overview" className="tab-content">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="tab-pane fade show active">
                <h3 className="cdtitle">Course Description</h3>

                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
                </p>

                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>

                <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                </p>

                <div className="benefits">
                  <h3>Why you want to learn PHP ?</h3>
                  <ul>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                      <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                  </ul>
                </div>
          </div>
        )}

        {/* CURRICULUM */}
        {activeTab === "curriculum" && (
          <div className="tab-pane fade show active">
            <div className="cd_curriculum">
              <h3>Starting Beginners Level Course</h3>

              <ul>
                <li><span><a href="#"><i className="bx bx-play-circle"></i> Introduction of Editing</a></span><span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>10 Minutes</span></li>
                <li><span><a href="#"><i className="bx bx-play-circle"></i> Overview of Editing</a></span><span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>8 Minutes</span></li>
                <li><span><a href="#"><i className="bx bx-folder"></i> Basic Editing Technology</a></span><span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>7 Minutes</span></li>
                <li><span><a href="#"><i className="bx bx-bulb"></i> Quiz</a></span><span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>5 Minutes</span></li>
                <li><span><a href="#"><i className="bx bx-play-circle"></i> Introduction of Editing</a></span><span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>10 Minutes</span></li>
                <li><span><a href="#"><i className="bx bx-bulb"></i> Overview of Editing</a></span><span className="cd_cur_right"><a href="#" className="cbtn">Preview</a>30 Minutes</span></li>
              </ul>
            </div>
          </div>
        )}

        {/* REVIEW */}
        {activeTab === "review" && (
          <div className="tab-pane fade show active">
            <div className="cd_rating">
              <h3>Student's Reviews</h3>
                <div className="cd_rating_top">
                    <div className="cdr_rate_summary">
                        <h1>5.0</h1>
                        <span className="cdr_rating">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        </span>

                        <p>Total 3 Rating</p>
                    </div>

                    <div className="cdr_rate_number">
                        <ul>
                            <li>
                                <span className="cdr_rate_star">5</span>
                                <span className="cdr_rate_value">
                                <span className="rating_width" style={{ width: "100%" }}></span>
                                <span className="cdr_rate_count">3 Rating</span>
                                </span>
                            </li>

                            <li>
                                <span className="cdr_rate_star">4</span>
                                <span className="cdr_rate_value">
                                <span className="rating_width" style={{ width: "80%" }}></span>
                                <span className="cdr_rate_count">2 Rating</span>
                                </span>
                            </li>

                            <li>
                                <span className="cdr_rate_star">3</span>
                                <span className="cdr_rate_value">
                                <span className="rating_width" style={{ width: "60%" }}></span>
                                <span className="cdr_rate_count">1 Rating</span>
                                </span>
                            </li>

                            <li>
                                <span className="cdr_rate_star">2</span>
                                <span className="cdr_rate_value">
                                <span className="rating_width" style={{ width: "40%" }}></span>
                                <span className="cdr_rate_count">2 Rating</span>
                                </span>
                            </li>

                            <li>
                                <span className="cdr_rate_star">1</span>
                                <span className="cdr_rate_value">
                                <span className="rating_width" style={{ width: "20%" }}></span>
                                <span className="cdr_rate_count">2 Rating</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>


                <div className="rating_list">
                    <div className="rating_item">
                        <div className="rating_item_avatar">
                        <img src="/assets/img/review/1.jpg" alt="avatar" />
                        <div className="rava_conent">
                            <h3>Robert Max</h3>
                            <p>Outstanding Course</p>
                            <span className="rating_item_ricon">
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            </span>
                        </div>
                        </div>

                        <div className="rating_item_content">
                        <p>
                            " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it "
                        </p>
                        </div>
                    </div>

                    <div className="rating_item">
                        <div className="rating_item_avatar">
                        <img src="/assets/img/review/2.jpg" alt="avatar" />
                        <div className="rava_conent">
                            <h3>Robert Max</h3>
                            <p>Outstanding Course</p>
                            <span className="rating_item_ricon">
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            </span>
                        </div>
                        </div>

                        <div className="rating_item_content">
                        <p>
                            " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it "
                        </p>
                        </div>
                    </div>

                    <div className="rating_item">
                        <div className="rating_item_avatar">
                        <img src="/assets/img/review/3.jpg" alt="avatar" />
                        <div className="rava_conent">
                            <h3>Robert Max</h3>
                            <p>Outstanding Course</p>
                            <span className="rating_item_ricon">
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            <i className="bx bxs-star"></i>
                            </span>
                        </div>
                        </div>

                        <div className="rating_item_content">
                        <p>
                            " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it "
                        </p>
                        </div>
                    </div>
                </div>

                <div className="cdr_review_form">
                <h3>Add a Review</h3>

                <div className="review_form_ricon">
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                </div>

                <form action="#" className="rating_form">
                    <textarea
                    name="rating_form"
                    placeholder="Write a Your Rating"
                    ></textarea>
                    <br />

                    <button type="submit" className="green_btn py40">
                    <span>Submit Review</span>
                    </button>
                </form>
                </div>        

            </div>
          </div>
        )}

        {/* INSTRUCTOR */}
        {activeTab === "instructor" && (
          <div className="tab-pane fade show active">
            <div className="cd_instructor">
                <div className="cdin_image">
                    <img src="/assets/img/scholars/3.png" alt="" />
                    <ul>
                        <li>
                            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                        </li>
                        <li>
                            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>	
                        </li>
                        <li>
                            <a href="#"><i className="fa-brands fa-youtube"></i></a>								
                        </li>																				
                    </ul>
                </div>	

                <div className="cdin_content">
                    <h4><Link href="/instructor-details">Masum Billah</Link></h4>
                    <span>Mufassir</span>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                    </p>
                    <div className="cdin_meta">
                        <div className="cdin_meta_item"><i className="fa-solid fa-graduation-cap"></i> 25+ Students</div>
                        <div className="cdin_meta_item"><i className='fa-solid fa-file-circle-check'></i> 32 Courses</div>
                    </div>		
                </div>		
            </div>
          </div>
        )}

      </div>
    </div>
  );
}