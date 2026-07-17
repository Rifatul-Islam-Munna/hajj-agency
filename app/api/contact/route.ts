import { NextResponse } from "next/server";
import { createContactSubmission } from "../../lib/contact-store";
import { getPublicSiteSettings } from "../../lib/site-settings";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (String(body.website || "").trim()) return NextResponse.json({ message: "Message received." });
    await createContactSubmission(body);
    const settings = await getPublicSiteSettings();
    return NextResponse.json({ message: settings.contact_success_message });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CONTACT") return NextResponse.json({ message: "Please complete all required fields with a valid email address." }, { status: 400 });
    console.error(error);
    return NextResponse.json({ message: "Your message could not be sent. Please try again." }, { status: 500 });
  }
}
