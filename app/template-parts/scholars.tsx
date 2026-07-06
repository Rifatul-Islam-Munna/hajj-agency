import { getContentRecords } from "../lib/content-store";
import ScholarsClient from "../components/scholarsClient";

export default async function IslamicScholars() {
  const items = await getContentRecords({ collection: "guides" }).catch(() => []);
  return <ScholarsClient items={items} />;
}
