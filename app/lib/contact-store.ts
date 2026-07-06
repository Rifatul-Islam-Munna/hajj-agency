import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { ensureExtendedCmsStorage } from "./cms-extension-storage";
import { clean } from "./cms-normalize";
import type { ContactSubmission } from "./cms-types";

interface ContactRow extends RowDataPacket, Omit<ContactSubmission, "created_at"> { created_at: Date | string }

export async function createContactSubmission(input: Partial<ContactSubmission>) {
  await ensureExtendedCmsStorage();
  const name = clean(input.name).slice(0, 191);
  const email = clean(input.email).slice(0, 191);
  const phone = clean(input.phone).slice(0, 80);
  const subject = clean(input.subject).slice(0, 255);
  const message = clean(input.message).slice(0, 10000);
  if (!name || !email || !subject || !message || !/^\S+@\S+\.\S+$/.test(email)) throw new Error("INVALID_CONTACT");
  const result = await query<ResultSetHeader>(`INSERT INTO contact_submissions (name, email, phone, subject, message, source_page, status, admin_note) VALUES (?, ?, ?, ?, ?, ?, 'unread', '')`, [name, email, phone, subject, message, clean(input.source_page).slice(0, 500) || "/contact"]);
  return result.insertId;
}
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  await ensureExtendedCmsStorage();
  const rows = await query<ContactRow[]>("SELECT * FROM contact_submissions ORDER BY created_at DESC, id DESC");
  return rows.map((row) => ({ ...row, created_at: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at) }));
}
export async function updateContactSubmission(id: number, status: ContactSubmission["status"], adminNote: string) {
  await ensureExtendedCmsStorage();
  const safeStatus = new Set(["unread", "read", "replied"]).has(status) ? status : "read";
  await query<ResultSetHeader>("UPDATE contact_submissions SET status = ?, admin_note = ? WHERE id = ?", [safeStatus, clean(adminNote).slice(0, 5000), id]);
}
export async function deleteContactSubmission(id: number) { await ensureExtendedCmsStorage(); await query<ResultSetHeader>("DELETE FROM contact_submissions WHERE id = ?", [id]); }
