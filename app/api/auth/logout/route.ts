import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Signed out" });
  const options = {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "strict" as const,
  };
  response.cookies.set("management_session", "", options);
  response.cookies.set("user_id", "", options);
  return response;
}
