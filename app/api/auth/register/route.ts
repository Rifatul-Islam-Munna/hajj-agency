import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import { hashPassword, query } from "@/app/lib/auth-db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nidNumber = String(body.nidNumber || "").trim();
    const nidName = String(body.nidName || "").trim();
    const dateOfBirth = String(body.dateOfBirth || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!nidNumber || !nidName || !dateOfBirth || !phone || !email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password min 6 chars" }, { status: 400 });
    }

    await query<ResultSetHeader>(
      `INSERT INTO users (nid_number, nid_name, date_of_birth, phone, email, password_hash)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nidNumber, nidName, dateOfBirth, phone, email, hashPassword(password)],
    );

    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    const err = error as { code?: string };
    if (err.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ message: "NID, phone, or email already exists" }, { status: 409 });
    }

    return NextResponse.json({ message: "Registration failed" }, { status: 500 });
  }
}
