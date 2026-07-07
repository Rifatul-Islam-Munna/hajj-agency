import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { authQuery, verifyPassword } from "../../../lib/auth-db";
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

    const users = await authQuery<UserRow[]>(
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
      redirect: isManager ? "/super-admin" : "/dashboard",
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
    const errorId = `login-${Date.now().toString(36)}`;
    const err = error as { code?: string; errno?: number; sqlState?: string; sqlMessage?: string; message?: string };
    console.error("AUTH_LOGIN_FAILED", {
      errorId,
      code: err.code,
      errno: err.errno,
      sqlState: err.sqlState,
      sqlMessage: err.sqlMessage,
      message: err.message,
      dbHost: process.env.DB_HOST || process.env.MYSQL_HOST || process.env.Host || "",
      dbName: process.env.DB_NAME || process.env.MYSQL_DATABASE || process.env.Database || "",
      dbUser: process.env.DB_USER || process.env.MYSQL_USER || process.env.Username || "",
    });
    return NextResponse.json(
      {
        message: "Login failed",
        errorId,
        ...(process.env.DEBUG_AUTH_ERRORS === "true" ? { code: err.code, sqlMessage: err.sqlMessage || err.message } : {}),
      },
      { status: 500 },
    );
  }
}
