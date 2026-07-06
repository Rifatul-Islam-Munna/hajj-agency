import { NextResponse } from "next/server";
import { requireManagementUser } from "../../../../lib/access-control";
import { getSiteSettings } from "../../../../lib/site-settings";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireManagementUser();
    const form = await request.formData();
    const image = form.get("image");
    if (!(image instanceof File)) {
      return NextResponse.json({ message: "Choose an image file." }, { status: 400 });
    }
    if (!image.type.startsWith("image/")) {
      return NextResponse.json({ message: "Only image files are allowed." }, { status: 400 });
    }
    if (image.size > 32 * 1024 * 1024) {
      return NextResponse.json({ message: "Image must be smaller than 32 MB." }, { status: 400 });
    }

    const settings = await getSiteSettings();
    const apiKey = settings.imagebb_api_key || process.env.IMGBB_API_KEY || "";
    if (!apiKey) {
      return NextResponse.json(
        { message: "Add the ImageBB API key in Super Admin → Site & Navbar." },
        { status: 400 },
      );
    }

    const upload = new FormData();
    upload.set("image", image, image.name);
    upload.set("name", image.name.replace(/\.[^.]+$/, "").slice(0, 120));
    const endpoint = process.env.IMGBB_UPLOAD_URL || "https://api.imgbb.com/1/upload";
    const response = await fetch(`${endpoint}?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      body: upload,
      cache: "no-store",
    });
    const result = await response.json() as {
      success?: boolean;
      data?: { url?: string; display_url?: string; delete_url?: string; width?: number; height?: number };
      error?: { message?: string };
    };
    if (!response.ok || !result.success || !result.data?.url) {
      return NextResponse.json(
        { message: result.error?.message || "ImageBB upload failed." },
        { status: 502 },
      );
    }
    return NextResponse.json({
      url: result.data.display_url || result.data.url,
      deleteUrl: result.data.delete_url || "",
      width: result.data.width || null,
      height: result.data.height || null,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "ACCESS_DENIED") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ message: "Image upload failed." }, { status: 500 });
  }
}
