import { getContentRecords } from "../../lib/content-store";
import SimpleRecordsEditor from "../simpleRecordsEditor";

export default async function AllRecordsPage() {
  const records = await getContentRecords({ enabledOnly: false });
  return <SimpleRecordsEditor title="All Connected Records" records={records} />;
}
