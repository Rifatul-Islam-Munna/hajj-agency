import { getPackageCategories } from "../../../lib/category-store";
import PackageEditor from "../../packageEditor";

export default async function NewPackagePage() {
  return <PackageEditor categories={await getPackageCategories(false)} />;
}
