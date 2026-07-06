import HomeCms from "./components/homeCms";
import { cmsMetadata } from "./lib/cms-metadata";

export const generateMetadata = () => cmsMetadata(
  "home",
  "Home",
  "Pilgrimage travel packages and guidance.",
);

export default function Home() {
  return <HomeCms />;
}
