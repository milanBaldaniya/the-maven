import React from 'react';
import { redirect } from 'next/navigation';
import { requireAdminFromCookies } from '@/lib/adminAuth';
import { connectMongo } from '@/lib/mongodb';
import { BookingModel } from '@/models/Booking';
import AdminBookingsClient from './ui/AdminBookingsClient';

export default async function AdminDashboardPage() {
  // Middleware already guards this, but we enforce server-side too.
  try {
    await requireAdminFromCookies();
  } catch {
    redirect('/admin/login');
  }

  let bookings: any[] = [];
  let dbError = '';
  try {
    await connectMongo();
    const docs = await BookingModel.find({}).sort({ createdAt: -1 }).lean();
    bookings = docs.map((d: any) => ({
      id: String(d._id),
      createdAt: new Date(d.createdAt).toISOString(),
      status: d.status,
      name: d.name,
      email: d.email,
      phone: d.phone,
      address: d.address,
      city: d.city,
      services: d.services,
      preferredDateTime: new Date(d.preferredDateTime).toISOString(),
      notes: d.notes || '',
    }));
  } catch (err: any) {
    dbError = err?.message || 'Database connection failed';
  }

  return (
    <main className="min-h-screen px-5 sm:px-8 py-10 bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <div className="eyebrow mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Admin</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-foreground">Bookings</h1>
            <p className="text-sm text-foreground-muted mt-2">Review and filter incoming requests.</p>
          </div>
          <AdminBookingsClient initialBookings={bookings} />
        </div>
        {dbError ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Could not load bookings from database. Check `MONGODB_URI` (and optional `MONGODB_DB`) in Vercel environment variables.
          </div>
        ) : null}
      </div>
    </main>
  );
}

