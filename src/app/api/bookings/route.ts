import { NextResponse } from 'next/server';
import * as yup from 'yup';
import { connectMongo } from '@/lib/mongodb';
import { BookingModel } from '@/models/Booking';

const schema = yup.object({
  name: yup.string().trim().min(2).max(80).required(),
  email: yup.string().trim().email().required(),
  phone: yup.string().trim().min(7).max(20).required(),
  address: yup.string().trim().min(8).max(200).required(),
  city: yup.string().trim().min(2).max(60).required(),
  services: yup.array(yup.string().trim().min(2).max(80).required()).min(1).required(),
  preferredDateTime: yup.string().trim().required(),
  notes: yup.string().trim().max(500).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = await schema.validate(body, { abortEarly: false, stripUnknown: true });
    await connectMongo();
    const booking = await BookingModel.create({
      ...input,
      preferredDateTime: new Date(input.preferredDateTime),
    });
    return NextResponse.json({ ok: true, bookingId: String(booking._id) }, { status: 201 });
  } catch (err: any) {
    const message = err?.errors?.length ? err.errors.join(', ') : err?.message || 'Invalid request';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

