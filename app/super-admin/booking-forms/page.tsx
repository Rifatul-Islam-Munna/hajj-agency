import { getPackageAdminRows } from "../../lib/booking-store";
import { getPackageCategories } from "../../lib/category-store";
import BookingFormManager from "../bookingFormManager";

export default async function BookingFormsPage() {
  const [categories, packages] = await Promise.all([getPackageCategories(false), getPackageAdminRows()]);
  return <BookingFormManager categories={categories} packages={packages} />;
}
