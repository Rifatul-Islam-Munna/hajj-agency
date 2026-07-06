type Props = {
  title?: string;
};

export default function MainBanner({ title = "About Us" }: Props) {
  return (
    <section
      className="main_banner position-relative"
      style={{ backgroundImage: "url('/assets/img/bg/banner.jpg')" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            
            <h2>{title}</h2>

            <p>
              <a href="#">Home</a>{" "}
              <i className="fa-solid fa-angles-right"></i> {title}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}