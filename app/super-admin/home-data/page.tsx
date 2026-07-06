import { getContentRecords } from "../../lib/content-store";
import HomeDataManager from "../homeDataManager";

export default async function HomeDataPage() {
  const all = await getContentRecords({ enabledOnly: false });
  const records = all.filter((item) => item.collection_key === "slider" || item.collection_key === "prayer-times" || item.collection_key === "statistics");
  return <HomeDataManager initialRecords={records} />;
}
