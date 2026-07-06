import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { query, verifyPassword } from "../../../lib/auth-db";
import { createSessionToken } from "../../../lib/session-token";

interface UserRow extends RowDataPacket {
  id: number;
  nid_name: string;
  email: string;
  phone: string;
  role: string;
  password_hash: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = String(body.identifier || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!identifier || !password) {
      return NextResponse.json({ message: "Phone/email and password required" }, { status: 400 });
    }

    const users = await query<UserRow[]>(
      "SELECT id, nid_name, email, phone, role, password_hash FROM users WHERE email = ? OR phone = ? LIMIT 1",
      [identifier, identifier],
    );
    const user = users[0];
    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json({ message: "Invalid login" }, { status: 401 });
    }

    const isManager = user.role === "super_admin";
    const response = NextResponse.json({
      message: "Login successful",
      redirect: isManager ? "/super-admin" : "/",
      user: { id: user.id, name: user.nid_name, email: user.email, phone: user.phone, role: user.role },
    });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    };
    response.cookies.set("user_id", String(user.id), cookieOptions);
    if (isManager) {
      response.cookies.set("management_session", createSessionToken(user.id), cookieOptions);
    } else {
      response.cookies.set("management_session", "", { ...cookieOptions, maxAge: 0 });
    }
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
