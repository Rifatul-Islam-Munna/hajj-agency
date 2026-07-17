import { getContentRecords } from "../lib/content-store";
import PrayerTimeClient from "./prayerTimeClient";

export default async function PrayerTimeSection() {
  const items = await getContentRecords({ collection: "prayer-times" }).catch(() => []);
  return <PrayerTimeClient items={items} />;
}
