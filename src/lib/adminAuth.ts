import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_COOKIE_NAME = 'admin_session';

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || 'dev-secret-change-me';
  return new TextEncoder().encode(secret);
}

export async function createAdminSession(): Promise<string> {
  return await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function requireAdminFromCookies(): Promise<boolean> {
  try {
    const cookieStore = await cookies(); // ✅ correct
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) return false;

    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}