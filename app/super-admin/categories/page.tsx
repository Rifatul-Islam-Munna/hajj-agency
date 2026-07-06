import { getPackageCategories } from "../../lib/category-store";
import CategoryManager from "../categoryManager";

export default async function CategoriesPage() {
  return <CategoryManager initialCategories={await getPackageCategories(false)} />;
}
