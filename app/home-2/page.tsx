import HomeTwoCms from "../components/homeTwoCms";
import { cmsMetadata } from "../lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "home-2",
  "Home",
  "Plan your pilgrimage journey with trusted travel specialists.",
);

export default function HomeTwo() {
  return <HomeTwoCms />;
}
