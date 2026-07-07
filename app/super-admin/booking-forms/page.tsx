import { getPackageAdminRows } from "../../lib/booking-store";
import { getPackageCategories } from "../../lib/category-store";
import BookingFormManager from "../bookingFormManager";

export default async function BookingFormsPage() {
  const [categories, packages] = await Promise.all([
    getPackageCategories(false).catch((error) => {
      console.error("ADMIN_BOOKING_CATEGORIES_EMPTY_FALLBACK", error);
      return [];
    }),
    getPackageAdminRows().catch((error) => {
      console.error("ADMIN_BOOKING_PACKAGES_EMPTY_FALLBACK", error);
      return [];
    }),
  ]);
  return <BookingFormManager categories={categories} packages={packages} />;
}
