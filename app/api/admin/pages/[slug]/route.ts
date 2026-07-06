import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../../lib/access-control";
import { getCmsPage, saveCmsPage } from "../../../../lib/cms-db";
import { CMS_PAGES } from "../../../../lib/cms-config";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_: Request, context: Context) {
  try {
    await requireManagementUser();
    const { slug } = await context.params;
    const page = await getCmsPage(slug);
    if (!page) return NextResponse.json({ message: "Page not found" }, { status: 404 });
    return NextResponse.json({ page });
  } catch (error) {
    return handle(error);
  }
}

export async function PUT(request: Request, context: Context) {
  try {
    await requireManagementUser();
    const { slug } = await context.params;
    if (!CMS_PAGES.some((page) => page.slug === slug)) {
      return NextResponse.json({ message: "Unknown page" }, { status: 404 });
    }
    const page = await saveCmsPage(slug, await request.json());
    if (!page) return NextResponse.json({ message: "Page not found" }, { status: 404 });
    return NextResponse.json({ message: "Saved", page });
  } catch (error) {
    return handle(error);
  }
}

function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  console.error(error);
  return NextResponse.json({ message: "Request failed" }, { status: 500 });
}
