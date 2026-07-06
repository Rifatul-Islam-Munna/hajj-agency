import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../lib/access-control";
import { deleteBlogPost, getBlogPosts, saveBlogPost } from "../../../lib/blog-store";

export async function GET() {
  try {
    await requireManagementUser();
    return NextResponse.json({ posts: await getBlogPosts({ enabledOnly: false }) });
  } catch (error) {
    return handle(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    if (!String(body.title || "").trim()) {
      return NextResponse.json({ message: "Blog title is required." }, { status: 400 });
    }
    return NextResponse.json({ post: await saveBlogPost(body) }, { status: 201 });
  } catch (error) {
    return handle(error);
  }
}

export async function PUT(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    if (!Number(body.id)) {
      return NextResponse.json({ message: "Blog id is required." }, { status: 400 });
    }
    return NextResponse.json({ post: await saveBlogPost(body) });
  } catch (error) {
    return handle(error);
  }
}

export async function DELETE(request: Request) {
  try {
    await requireManagementUser();
    const body = await request.json();
    await deleteBlogPost(Number(body.id));
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return handle(error);
  }
}

function handle(error: unknown) {
  if (error instanceof Error && error.message === "ACCESS_DENIED") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (error instanceof Error && error.message === "DUPLICATE_SLUG") {
    return NextResponse.json({ message: "That blog slug is already in use." }, { status: 409 });
  }
  console.error(error);
  return NextResponse.json({ message: "Request failed." }, { status: 500 });
}
