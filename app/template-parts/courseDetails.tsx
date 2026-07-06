import Left from "./courseDetailsLeft";
import Sidebar from "./courseDetailsSidebar";
import RelatedCourses from "./relatedCourse";

export default function courseDetailsPage() {
  return (
<section className="courses-details section-padding">
	<div className="container">
		<div className="row g-4">
            <Left />
            <Sidebar/>					
        </div>
		    <RelatedCourses/>
	</div>
</section>

  );
}