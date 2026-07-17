import { getContentRecords } from "../lib/content-store";
import PillarsClient from "./pillarsClient";

export default async function PillarOfIslam() {
  const items = await getContentRecords({ collection: "pillars" }).catch(() => []);
  return <PillarsClient items={items} />;
}
