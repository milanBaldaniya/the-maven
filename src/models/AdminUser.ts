import mongoose, { Schema } from 'mongoose';

const adminUserSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin', required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const AdminUserModel =
  mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);

