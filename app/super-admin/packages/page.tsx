import { getPackages } from "../../lib/cms-db";
import PackageManager from "../packageManager";

export default async function AdminPackagesPage() {
  const packages = await getPackages({ enabledOnly: false });
  return <PackageManager initialPackages={packages} />;
}
