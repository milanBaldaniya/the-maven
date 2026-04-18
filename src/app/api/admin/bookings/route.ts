import { NextResponse } from 'next/server';
import { requireAdminFromCookies } from '@/lib/adminAuth';
import { connectMongo } from '@/lib/mongodb';
import { BookingModel } from '@/models/Booking';

export async function GET(req: Request) {
  try {
    await requireAdminFromCookies();
    const url = new URL(req.url);
    const city = url.searchParams.get('city') || undefined;
    const service = url.searchParams.get('service') || undefined;
    const from = url.searchParams.get('from') || undefined;
    const to = url.searchParams.get('to') || undefined;

    await connectMongo();

    const query: any = {};
    if (city) query.city = city;
    if (service) query.services = service;
    if (from || to) {
      query.preferredDateTime = {};
      if (from) query.preferredDateTime.$gte = new Date(from);
      if (to) query.preferredDateTime.$lte = new Date(to);
    }

    const docs = await BookingModel.find(query).sort({ createdAt: -1 }).lean();
    const bookings = docs.map((d: any) => ({
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

    return NextResponse.json({ ok: true, bookings });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
}

