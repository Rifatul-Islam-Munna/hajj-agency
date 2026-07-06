import Image from "next/image";
import Link from "next/link";

export default function InstructorDetails() {
  return (
    <div className="instructor-details pt-100">
      <div className="container">
        <div className="row">

          <div className="col-lg-5">
            <div className="id_image text-start text-lg-center">
              <img
                src="/assets/img/scholars/3.png"
                alt="Shaykh Faruq Hasan"
              />

              <div className="id_meta mt-4 mb-2 pb-2">
                <span><i className="fa-solid fa-book"></i> 45 Courses</span>
                <span><i className="fa-solid fa-user"></i> 600+ Students</span>
              </div>

              <p>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
                <span>(500 Ratings)</span>
              </p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="id_content">
              <h3>Shaykh Faruq Hasan</h3>
              <span>Islamic Scholar</span>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus eget dolor non condimentum. Mauris ac augue eu ex elementum dictum. Quisque fermentum augue vel venenatis bibendum. Curabitur malesuada egestas varius. Maecenas maximus dapibus sem. Nunc lacinia sollicitudin risus, sed pulvinar orci feugiat vel. Aliquam convallis urna diam, eget ultrices dolor pretium non.
              </p>

              <h4>Contact Info</h4>

              <ul className="id_cinfo">
                <li><strong>Experience:</strong> 12 years</li>
                <li><strong>Email:</strong> support@mihrab.com</li>
                <li><strong>Education:</strong> Ph.D. in Islamic Studies</li>
                <li><strong>Phone:</strong> +91 258 654 583</li>
                <li>
                  <strong>Website:</strong>{" "}
                  <Link href="#">www.mihrab.com</Link>
                </li>
              </ul>

              <ul className="id_social">
                <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-x-twitter"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-youtube"></i></Link></li>
              </ul>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}