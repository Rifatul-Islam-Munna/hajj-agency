import { notFound } from "next/navigation";
import { getPackageBookingSettings, getPackagePriceTiers } from "../../../../lib/booking-store";
import { getPackageCategories } from "../../../../lib/category-store";
import { getPackageById } from "../../../../lib/package-store";
import PackageEditor from "../../../packageEditor";

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const packageId = Number(id);
  const [item, settings, tiers, categories] = await Promise.all([
    getPackageById(packageId),
    getPackageBookingSettings(packageId),
    getPackagePriceTiers(packageId),
    getPackageCategories(false),
  ]);
  if (!item) notFound();
  return <PackageEditor initialPackage={item} initialSettings={settings} initialTiers={tiers} categories={categories} />;
}
