import { getContentRecords } from "../lib/content-store";
import ScholarsClient from "./scholarsClient";

export default async function IslamicScholars() {
  const items = await getContentRecords({ collection: "guides", limit: 4 }).catch(() => []);
  return <ScholarsClient items={items} showHeading showAllButton />;
}
