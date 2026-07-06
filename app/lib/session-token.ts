import crypto from "crypto";

export type SessionTokenData = {
  userId: number;
  expiresAt: number;
};

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPER_ADMIN_PASSWORD || "development-session-secret";
}

function signature(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(userId: number) {
  const data: SessionTokenData = {
    userId,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function readSessionToken(token?: string | null): SessionTokenData | null {
  if (!token) return null;
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature) return null;
  const expectedSignature = signature(payload);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  if (supplied.length !== expected.length || !crypto.timingSafeEqual(supplied, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionTokenData;
    if (!data.userId || data.expiresAt <= Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}
