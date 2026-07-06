import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import { deletePackageCategory, getPackageCategories, savePackageCategory } from "../../../lib/category-store";

export async function GET() {
  try {
    await requireManagementUser();
    return NextResponse.json({ categories: await getPackageCategories(false) });
  } catch (error) { return handle(error); }
}
export async function POST(request: Request) {
  try {
    await requireManagementUser();
    return NextResponse.json({ category: await savePackageCategory(await request.json()) }, { status: 201 });
  } catch (error) { return handle(error); }
}
export async function PUT(request: Request) {
  try {
    await requireManagementUser();
    return NextResponse.json({ category: await savePackageCategory(await request.json()) });
  } catch (error) { return handle(error); }
}
export async function DELETE(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    await deletePackageCategory(Number(body.id));
    return NextResponse.json({ message: "Category deleted." });
  } catch (error) { return handle(error); }
}
function handle(error: unknown) {
  const message = error instanceof Error ? error.message : "REQUEST_FAILED";
  if (message === "ACCESS_DENIED") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (message === "DUPLICATE_SLUG") return NextResponse.json({ message: "That category slug already exists." }, { status: 409 });
  if (message === "CATEGORY_IN_USE") return NextResponse.json({ message: "Move packages out of this category before deleting it." }, { status: 409 });
  console.error(error);
  return NextResponse.json({ message: "Category request failed." }, { status: 500 });
}
