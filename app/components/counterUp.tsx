import { getContentRecords } from "../lib/content-store";
import CounterClient from "./counterClient";

export default async function CounterSection() {
  const items = await getContentRecords({ collection: "statistics" }).catch(() => []);
  return <CounterClient items={items} />;
}
