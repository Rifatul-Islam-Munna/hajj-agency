import { getPackageCategories } from "../../lib/category-store";
import CategoryManager from "../categoryManager";

export default async function CategoriesPage() {
  const categories = await getPackageCategories(false).catch((error) => {
    console.error("ADMIN_CATEGORIES_EMPTY_FALLBACK", error);
    return [];
  });
  return <CategoryManager initialCategories={categories} />;
}
