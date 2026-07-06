import crypto from "crypto";

function key() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.SUPER_ADMIN_PASSWORD || "development-only-secret";
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptSecret(value: string) {
  if (!value) return "";
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `enc:${iv.toString("base64")}:${tag.toString("base64")}:${encrypted.toString("base64")}`;
}

export function decryptSecret(value: string) {
  if (!value) return "";
  if (!value.startsWith("enc:")) return value;
  try {
    const [, ivRaw, tagRaw, dataRaw] = value.split(":");
    const decipher = crypto.createDecipheriv("aes-256-gcm", key(), Buffer.from(ivRaw, "base64"));
    decipher.setAuthTag(Buffer.from(tagRaw, "base64"));
    return Buffer.concat([decipher.update(Buffer.from(dataRaw, "base64")), decipher.final()]).toString("utf8");
  } catch {
    return "";
  }
}
