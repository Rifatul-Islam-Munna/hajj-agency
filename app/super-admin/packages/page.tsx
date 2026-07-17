import { getPackageAdminRows } from "../../lib/booking-store";
import PackageTable from "../packageTable";

export default async function AdminPackagesPage() {
  try {
    return <PackageTable initialRows={await getPackageAdminRows()} />;
  } catch (error) {
    const err = error as { code?: string; sqlMessage?: string; message?: string };
    console.error("ADMIN_PACKAGES_FAILED", { code: err.code, message: err.sqlMessage || err.message });
    return <div className="admin-card"><h1 className="admin-title">Packages could not load</h1><p className="admin-subtitle">{err.sqlMessage || err.message || "Unknown server error"}</p></div>;
  }
}
