'use client';

import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import AppField from '@/components/ui/AppField';

const schema = yup.object({
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function AdminLoginClient({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>('');

  return (
    <main className="min-h-screen flex items-center justify-center px-5 sm:px-8 py-16 bg-bg-dark">
      <div className="w-full max-w-md bg-bg-card border border-[rgba(212,175,55,0.12)] rounded-4xl p-7 sm:p-9">
        <div className="mb-7">
          <div className="eyebrow mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Admin</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-foreground">Login</h1>
          <p className="text-sm text-foreground-muted mt-2">Access bookings and manage requests.</p>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            setServerError('');
            try {
              const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
              });
              const data = await res.json().catch(() => null);
              if (!res.ok || !data?.ok) throw new Error(data?.error || 'Login failed');
              router.replace(nextPath);
            } catch (e: any) {
              setServerError(e?.message || 'Login failed');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleBlur, handleChange, isSubmitting, submitForm }) => (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                void submitForm();
              }}
            >
              {serverError ? (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {serverError}
                </div>
              ) : null}

              <AppField label="Email" required error={touched.email ? (errors.email as string) : undefined}>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="admin@themaven.in"
                  className="form-input w-full px-4 py-3 rounded-2xl text-sm"
                />
              </AppField>

              <AppField label="Password" required error={touched.password ? (errors.password as string) : undefined}>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter admin password"
                  className="form-input w-full px-4 py-3 rounded-2xl text-sm"
                />
              </AppField>

              <button
                type="submit"
                disabled={isSubmitting}
                className={[
                  'btn-gold w-full py-4 rounded-full text-base font-semibold flex items-center justify-center gap-3',
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : '',
                ].join(' ')}
              >
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          )}
        </Formik>

        {/* <p className="mt-6 text-[11px] text-foreground-muted text-center">
          Tip: set <span className="text-foreground">ADMIN_PASSWORD</span> in your environment.
        </p> */}
      </div>
    </main>
  );
}

