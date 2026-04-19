 'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import AppField from '@/components/ui/AppField';
import AppMultiSelect from '@/components/ui/AppMultiSelect';
import { GUJARAT_CITIES } from '@/data/gujaratCities';

const services = ['Hair Services', 'Skin Care / Facial', 'Makeup', 'Bridal Package', 'Pre-Bridal Package', 'Full Beauty Package'];

const bookingSchema = yup.object({
  name: yup.string().trim().min(2, 'Please enter your full name').required('Name is required'),
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  phone: yup
    .string()
    .trim()
    .min(7, 'Enter a valid phone number')
    .max(20, 'Enter a valid phone number')
    .required('Phone is required'),
  address: yup.string().trim().min(8, 'Enter your full address').required('Address is required'),
  city: yup.string().trim().required('City is required'),
  services: yup.array(yup.string().trim().required()).min(1, 'Select at least 1 service').required(),
  preferredDateTime: yup.string().trim().required('Preferred date & time is required'),
  notes: yup.string().trim().max(500, 'Keep notes under 500 characters').optional(),
});

const BookingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dateTimeInputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-hidden').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const serviceOptions = useMemo(() => services.map((s) => ({ value: s, label: s })), []);

  const openDateTimePicker = () => {
    const el = dateTimeInputRef.current;
    if (!el) return;
    el.focus();
    // Supported in Chromium-based browsers and Safari.
    if (typeof el.showPicker === 'function') {
      el.showPicker();
    }
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060D08 0%, #0A1A10 50%, #060D08 100%)' }}
    >
      {/* Decorative shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px shimmer-line" />

      {/* Gold glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Info */}
          <div className="reveal-hidden">
            <div className="eyebrow mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Book Your Service
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
              We come{' '}
              <span className="italic text-gold-gradient">to you</span>
            </h2>
            <p className="text-foreground-muted text-base leading-relaxed mb-10 max-w-md">
              Fill in your details and we&apos;ll confirm your appointment within 30 minutes. Our expert will arrive at your home fully equipped.
            </p>

            {/* Highlights */}
            <div className="space-y-5">
              {[
                { icon: '🏠', text: 'We visit your home — no travel needed' },
                { icon: '⏰', text: 'Confirmed within 30 minutes' },
                { icon: '🧴', text: 'All equipment & products included' },
                { icon: '✅', text: 'Certified & verified professionals only' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-foreground-muted font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Service areas */}
            <div className="mt-10 pt-8 border-t border-[rgba(212,175,55,0.12)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground-muted mb-4">Service Areas</p>
              <div className="flex flex-wrap gap-3 max-h-56 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
                {GUJARAT_CITIES.map((city) => (
                  <span key={city} className="px-4 py-2 rounded-full border border-[rgba(212,175,55,0.25)] text-sm text-gold font-medium">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal-hidden delay-200">
            <div className="bg-bg-card border border-[rgba(212,175,55,0.12)] rounded-4xl p-7 sm:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[rgba(212,175,55,0.15)] flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-medium text-foreground mb-3">
                    Booking Received!
                  </h3>
                  <p className="text-foreground-muted text-sm leading-relaxed mb-8">
                    Thank you, {submittedName || 'dear client'}! We&apos;ll confirm your appointment within 30 minutes via WhatsApp or call.
                  </p>
                  <a
                    href="https://wa.me/918780859618"
                    className="btn-gold px-8 py-4 rounded-full text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <svg width="18" height="18" fill="#060D08" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    services: [] as string[],
                    preferredDateTime: '',
                    notes: '',
                  }}
                  validationSchema={bookingSchema}
                  onSubmit={async (values, { setSubmitting, setStatus }) => {
                    setStatus(undefined);
                    try {
                      const res = await fetch('/api/bookings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values),
                      });
                      const data = await res.json().catch(() => null);
                      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Could not submit booking');
                      setSubmittedName(values.name);
                      setSubmitted(true);
                    } catch (e: any) {
                      setStatus(e?.message || 'Something went wrong');
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ values, errors, touched, handleBlur, handleChange, isSubmitting, status, setFieldValue, submitForm }) => (
                    <form
                      className="space-y-5"
                      onSubmit={(e) => {
                        e.preventDefault();
                        void submitForm();
                      }}
                    >
                      {status ? (
                        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                          {String(status)}
                        </div>
                      ) : null}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <AppField label="Your name" required error={touched.name ? (errors.name as string) : undefined}>
                          <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Shruti Sharma"
                            className="form-input w-full px-4 py-3 rounded-2xl text-sm"
                          />
                        </AppField>
                        <AppField label="Phone / WhatsApp" required error={touched.phone ? (errors.phone as string) : undefined}>
                          <input
                            type="tel"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="+91 98765 43210"
                            className="form-input w-full px-4 py-3 rounded-2xl text-sm"
                          />
                        </AppField>
                      </div>

                      <AppField label="Email" required error={touched.email ? (errors.email as string) : undefined}>
                        <input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Shruti@example.com"
                          className="form-input w-full px-4 py-3 rounded-2xl text-sm"
                        />
                      </AppField>

                      <AppField label="Home address" required error={touched.address ? (errors.address as string) : undefined}>
                        <input
                          type="text"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Flat no, Building, Street, Area"
                          className="form-input w-full px-4 py-3 rounded-2xl text-sm"
                        />
                      </AppField>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <AppField label="City" required error={touched.city ? (errors.city as string) : undefined}>
                          <input
                            type="text"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Your city or town"
                            autoComplete="address-level2"
                            className="form-input w-full px-4 py-3 rounded-2xl text-sm"
                          />
                        </AppField>

                        <AppField label="Services" required error={touched.services ? (errors.services as string) : undefined}>
                          <AppMultiSelect
                            name="services"
                            value={values.services}
                            onChange={(v) => setFieldValue('services', v)}
                            placeholder="Choose service(s)"
                            options={serviceOptions}
                          />
                        </AppField>
                      </div>

                      <AppField
                        label="Preferred date & time"
                        required
                        hint="We’ll confirm quickly"
                        error={touched.preferredDateTime ? (errors.preferredDateTime as string) : undefined}
                      >
                        <div className="relative" onClick={openDateTimePicker}>
                          <input
                            ref={dateTimeInputRef}
                            type="datetime-local"
                            name="preferredDateTime"
                            value={values.preferredDateTime}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-input hide-datetime-icon w-full px-4 py-3 pr-11 rounded-2xl text-sm"
                          />
                          <button
                            type="button"
                            aria-label="Open date and time picker"
                            onClick={(e) => {
                              e.preventDefault();
                              openDateTimePicker();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gold opacity-90 cursor-pointer"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M8 2v4M16 2v4" />
                              <rect x="3" y="4" width="18" height="18" rx="2" />
                              <path d="M3 10h18" />
                            </svg>
                          </button>
                        </div>
                      </AppField>

                      <AppField label="Special notes" hint="Optional">
                        <textarea
                          name="notes"
                          value={values.notes}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={3}
                          placeholder="Any specific requirements, allergies, or preferences..."
                          className="form-input w-full px-4 py-3 rounded-2xl text-sm resize-none"
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
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        {isSubmitting ? 'Submitting…' : 'Book At Home Service'}
                      </button>

                      <p className="text-center text-[11px] text-foreground-muted">
                        We&apos;ll confirm within 30 mins via WhatsApp · No advance payment needed
                      </p>
                    </form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;