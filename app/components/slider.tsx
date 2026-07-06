import { getContentRecords } from "../lib/content-store";
import SliderClient from "./sliderClient";

export default async function HomeSlider() {
  const slides = await getContentRecords({ collection: "slider" }).catch(() => []);
  return <SliderClient slides={slides} />;
}
