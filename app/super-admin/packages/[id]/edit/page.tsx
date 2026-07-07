import { notFound } from "next/navigation";
import { getPackageBookingSettings, getPackagePriceTiers } from "../../../../lib/booking-store";
import { getPackageCategories } from "../../../../lib/category-store";
import { getPackageById } from "../../../../lib/package-store";
import PackageEditor from "../../../packageEditor";

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const packageId = Number(id);
  const [item, settings, tiers, categories] = await Promise.all([
    getPackageById(packageId).catch((error) => {
      console.error("ADMIN_PACKAGE_EDIT_ITEM_EMPTY_FALLBACK", error);
      return null;
    }),
    getPackageBookingSettings(packageId).catch((error) => {
      console.error("ADMIN_PACKAGE_EDIT_SETTINGS_EMPTY_FALLBACK", error);
      return undefined;
    }),
    getPackagePriceTiers(packageId).catch((error) => {
      console.error("ADMIN_PACKAGE_EDIT_TIERS_EMPTY_FALLBACK", error);
      return [];
    }),
    getPackageCategories(false).catch((error) => {
      console.error("ADMIN_PACKAGE_EDIT_CATEGORIES_EMPTY_FALLBACK", error);
      return [];
    }),
  ]);
  if (!item) notFound();
  return <PackageEditor initialPackage={item} initialSettings={settings} initialTiers={tiers} categories={categories} />;
}
