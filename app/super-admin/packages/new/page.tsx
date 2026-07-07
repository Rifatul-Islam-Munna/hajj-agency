import { getPackageCategories } from "../../../lib/category-store";
import PackageEditor from "../../packageEditor";

export default async function NewPackagePage() {
  const categories = await getPackageCategories(false).catch((error) => {
    console.error("ADMIN_PACKAGE_NEW_CATEGORIES_EMPTY_FALLBACK", error);
    return [];
  });
  return <PackageEditor categories={categories} />;
}
