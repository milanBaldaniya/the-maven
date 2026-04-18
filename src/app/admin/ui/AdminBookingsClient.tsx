'use client';

import React, { useMemo, useState } from 'react';
import type { Booking } from '@/lib/bookingsStore';
import AppSelect from '@/components/ui/AppSelect';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(d);
}

export default function AdminBookingsClient({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [service, setService] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [error, setError] = useState('');

  const cityOptions = useMemo(() => {
    const vals = Array.from(new Set(initialBookings.map((b) => b.city))).sort();
    return [{ value: '', label: 'All cities' }, ...vals.map((v) => ({ value: v, label: v }))];
  }, [initialBookings]);

  const serviceOptions = useMemo(() => {
    const vals = Array.from(new Set(initialBookings.flatMap((b) => b.services))).sort();
    return [{ value: '', label: 'All services' }, ...vals.map((v) => ({ value: v, label: v }))];
  }, [initialBookings]);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const qs = new URLSearchParams();
      if (city) qs.set('city', city);
      if (service) qs.set('service', service);
      if (from) qs.set('from', from);
      if (to) qs.set('to', to);
      const res = await fetch(`/api/admin/bookings?${qs.toString()}`, { method: 'GET' });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Failed to fetch bookings');
      setBookings(data.bookings as Booking[]);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">City</div>
            <AppSelect name="cityFilter" value={city} onChange={setCity} options={cityOptions} placeholder="All cities" />
          </div>
          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">Service</div>
            <AppSelect name="serviceFilter" value={service} onChange={setService} options={serviceOptions} placeholder="All services" />
          </div>
          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">From</div>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="form-input w-full px-4 py-3 rounded-2xl text-sm" />
          </div>
          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">To</div>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="form-input w-full px-4 py-3 rounded-2xl text-sm" />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <button
            type="button"
            onClick={fetchBookings}
            disabled={loading}
            className={['btn-ghost px-6 py-3 rounded-full text-sm', loading ? 'opacity-70 cursor-not-allowed' : ''].join(' ')}
          >
            {loading ? 'Refreshing…' : 'Apply filters'}
          </button>
          <button type="button" onClick={logout} className="btn-gold px-6 py-3 rounded-full text-sm">
            Logout
          </button>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-200">{error}</p> : null}

      <div className="mt-7 overflow-hidden rounded-4xl border border-[rgba(212,175,55,0.12)] bg-bg-card">
        <div className="overflow-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="border-b border-[rgba(212,175,55,0.12)] bg-[rgba(6,13,8,0.35)]">
              <tr>
                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">Created</th>
                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">Customer</th>
                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">City</th>
                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">Services</th>
                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">Preferred</th>
                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">Contact</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length ? (
                bookings.map((b) => (
                  <tr key={b.id} className="border-b border-[rgba(212,175,55,0.08)] last:border-b-0">
                    <td className="px-5 py-4 text-foreground-muted whitespace-nowrap">{formatDate(b.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="text-foreground font-semibold">{b.name}</div>
                      <div className="text-foreground-muted text-xs mt-1 line-clamp-2">{b.address}</div>
                    </td>
                    <td className="px-5 py-4 text-foreground whitespace-nowrap">{b.city}</td>
                    <td className="px-5 py-4 text-foreground-muted">
                      <div className="flex flex-wrap gap-2">
                        {b.services.map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.06)] text-xs text-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      {b.notes ? <div className="text-xs text-foreground-muted mt-2 italic">“{b.notes}”</div> : null}
                    </td>
                    <td className="px-5 py-4 text-foreground whitespace-nowrap">{formatDate(b.preferredDateTime)}</td>
                    <td className="px-5 py-4">
                      <div className="text-foreground">{b.email}</div>
                      <div className="text-foreground-muted">{b.phone}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-5 py-10 text-center text-foreground-muted" colSpan={6}>
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

