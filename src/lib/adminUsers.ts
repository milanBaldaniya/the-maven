import bcrypt from 'bcryptjs';
import { AdminUserModel } from '@/models/AdminUser';

function getDefaultAdminEmail(): string {
  return (process.env.ADMIN_EMAIL || 'admin@themaven.in').toLowerCase().trim();
}

function getDefaultAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'admin123';
}

export async function ensureDefaultAdminUser(): Promise<void> {
  const email = getDefaultAdminEmail();
  const existing = await AdminUserModel.findOne({ email }).lean();
  if (existing) return;

  const passwordHash = await bcrypt.hash(getDefaultAdminPassword(), 12);
  await AdminUserModel.create({
    email,
    passwordHash,
    role: 'admin',
    isActive: true,
  });
}

export async function verifyAdminLogin(email: string, password: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await AdminUserModel.findOne({ email: normalizedEmail, role: 'admin', isActive: true });
  if (!user) return false;
  return bcrypt.compare(password, user.passwordHash);
}

