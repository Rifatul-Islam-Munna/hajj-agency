import { getPackageAdminRows } from "../../lib/booking-store";
import PackageTable from "../packageTable";

export default async function AdminPackagesPage() {
  return <PackageTable initialRows={await getPackageAdminRows()} />;
}
