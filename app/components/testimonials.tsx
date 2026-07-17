import { getContentRecords } from "../lib/content-store";
import TestimonialsClient from "./testimonialsClient";

export default async function TestimonialSection() {
  const items = await getContentRecords({ collection: "testimonials" }).catch(() => []);
  return <TestimonialsClient items={items} />;
}
