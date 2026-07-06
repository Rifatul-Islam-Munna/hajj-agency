
export default function ContactSection() {
  return (
    <section className="contact-section section-padding">
      <div className="container">
        <div className="row g-4">
          
          {/* Contact Form */}
          <div className="col-lg-6 align-self-center">
            <div className="contact-form">
              <h3 className="mb-4">Get In Touch</h3>

              <form action="#" method="post">
                <div className="row g-4">

                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        rows={5}
                        placeholder="Your Message"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-lg-12 text-center">
                    <button type="submit" className="green_btn">
                      <span>Send Message</span>
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-6 align-self-center">
            <div className="contact-info">
              <h4>Contact Information</h4>
              <p className="mb-4">
                Feel free to reach out to us with any questions or inquiries.
              </p>

              <ul>
                <li>
                  <span className="cicon">
                    <i className="fa-regular fa-map"></i>
                  </span>
                  <p>
                    3600 Las Vegas Blvd S, <br /> Las Vegas, NV
                  </p>
                </li>

                <li>
                  <span className="cicon">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <p>
                    <a href="tel:+9851736895478">+9851736895478</a> <br />
                    <a href="tel:+9801736895478">+9801736895478</a>
                  </p>
                </li>

                <li>
                  <span className="cicon">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <p>
                    <a href="mailto:admin@islamic.com">admin@islamic.com</a>
                    <br />
                    <a href="mailto:support@islamic.com">support@islamic.com</a>
                  </p>
                </li>
              </ul>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}