import { sanitizeRichHtml } from "../lib/rich-text";

type Props = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

export default function MainBanner({ title = "About Us", description, imageUrl }: Props) {
  return (
    <section
      className="main_banner position-relative"
      data-cms-background
      style={{ backgroundImage: `url('${imageUrl || "/assets/img/bg/banner.jpg"}')` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            
            <h2 data-cms-title>{title}</h2>

            <p>
              <a href="#">Home</a>{" "}
              <i className="fa-solid fa-angles-right"></i> <span data-cms-breadcrumb>{title}</span>
            </p>
            <div data-cms-description className="banner-description" dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(description) }} />

          </div>
        </div>
      </div>
    </section>
  );
}
