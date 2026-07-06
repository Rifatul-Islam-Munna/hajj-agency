import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "./auth-db";
import { clean } from "./cms-normalize";
import { ensureCommerceStorage } from "./commerce-storage";
import type { PaymentSettings } from "./commerce-types";
import { decryptSecret, encryptSecret } from "./secret-box";

interface PaymentRow extends RowDataPacket {
  enabled: number;
  sandbox: number;
  store_id: string;
  store_password: string;
  currency: string;
}

export async function getPaymentSettings(): Promise<PaymentSettings> {
  await ensureCommerceStorage();
  const rows = await query<PaymentRow[]>("SELECT enabled, sandbox, store_id, store_password, currency FROM payment_settings WHERE id=1 LIMIT 1");
  const row = rows[0];
  return {
    enabled: Boolean(row?.enabled),
    sandbox: row ? Boolean(row.sandbox) : true,
    store_id: row?.store_id || "",
    store_password: decryptSecret(row?.store_password || ""),
    currency: row?.currency || "BDT",
  };
}

export async function getPublicPaymentSettings() {
  const settings = await getPaymentSettings();
  return { enabled: settings.enabled && Boolean(settings.store_id && settings.store_password), sandbox: settings.sandbox, currency: settings.currency };
}

export async function savePaymentSettings(input: Partial<PaymentSettings>) {
  const current = await getPaymentSettings();
  const next: PaymentSettings = {
    enabled: input.enabled === true,
    sandbox: input.sandbox !== false,
    store_id: clean(input.store_id ?? current.store_id).slice(0, 191),
    store_password: String(input.store_password ?? current.store_password),
    currency: clean(input.currency || current.currency || "BDT").toUpperCase().slice(0, 8),
  };
  await query<ResultSetHeader>(
    `UPDATE payment_settings SET enabled=?, sandbox=?, store_id=?, store_password=?, currency=? WHERE id=1`,
    [next.enabled, next.sandbox, next.store_id, encryptSecret(next.store_password), next.currency],
  );
  return next;
}
