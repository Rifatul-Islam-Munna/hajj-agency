import Link from "next/link";
import { getPackageCategories } from "../lib/category-store";

export default async function PackageCategoryNav() {
  const categories = await getPackageCategories().catch(() => []);
  if (!categories.length) return null;
  return <section className="pt-5"><div className="container"><div className="package-category-nav"><Link href="/packages">All Packages</Link>{categories.map((category) => <Link key={category.id} href={`/packages/${category.slug}`}>{category.name}</Link>)}</div></div></section>;
}
