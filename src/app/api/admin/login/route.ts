import { NextResponse } from 'next/server';
import * as yup from 'yup';
import { ADMIN_COOKIE_NAME, createAdminSession } from '@/lib/adminAuth';

const schema = yup.object({
  password: yup.string().required(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password } = await schema.validate(body, { abortEarly: false, stripUnknown: true });

    const expected = process.env.ADMIN_PASSWORD || 'admin';
    if (password !== expected) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await createAdminSession();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || 'Invalid request' }, { status: 400 });
  }
}

