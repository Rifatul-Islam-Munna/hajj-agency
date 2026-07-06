import { getContentRecords } from "../../lib/content-store";
import ContentManager from "../contentManager";

export default async function ContentRecordsPage() {
  const records = await getContentRecords({ enabledOnly: false });
  return <ContentManager initialRecords={records} />;
}
