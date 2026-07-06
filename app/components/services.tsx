import { getContentRecords } from "../lib/content-store";
import ServicesClient from "./servicesClient";

export default async function ServicesSection() {
  const items = await getContentRecords({ collection: "services" }).catch(() => []);
  return <ServicesClient items={items} />;
}
