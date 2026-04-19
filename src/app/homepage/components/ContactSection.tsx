'use client';

import React, { useEffect, useRef } from 'react';
import { GUJARAT_CITIES } from '@/data/gujaratCities';

const CONTACT_PHONE = '+91 878 085 9618';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060D08 0%, #0A1A10 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px shimmer-line" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal-hidden">
          <div className="eyebrow justify-center mb-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Contact & Areas
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-5">
            We serve{' '}
            <span className="italic text-gold-gradient">all of Gujarat</span>
          </h2>
          <p className="text-foreground-muted text-base max-w-lg mx-auto leading-relaxed">
            At-home beauty visits in cities and towns across every district — book from anywhere in the state.
          </p>
        </div>

        {/* Contact + statewide cities */}
        <div className="mb-16 space-y-10">
          <div className="service-card bg-bg-card rounded-4xl p-7 lg:p-8 reveal-hidden delay-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-medium text-gold">Reach us statewide</h3>
              <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            </div>
            <p className="text-sm text-foreground-muted mb-6 leading-relaxed">
              One number for bookings and questions, no matter which city or town you&apos;re in.
            </p>
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-gold transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[rgba(212,175,55,0.1)] flex items-center justify-center text-gold flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              {CONTACT_PHONE}
            </a>
            <a
              href="https://wa.me/918780859618"
              className="mt-4 flex items-center gap-3 text-sm font-medium text-foreground-muted hover:text-gold transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[rgba(212,175,55,0.1)] flex items-center justify-center text-gold flex-shrink-0">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              WhatsApp us
            </a>
          </div>

          <div className="reveal-hidden delay-200">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground-muted mb-4 text-center">
              Cities &amp; towns we serve
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-h-80 overflow-y-auto px-1 py-1 [scrollbar-gutter:stable] rounded-3xl border border-[rgba(212,175,55,0.12)] bg-[rgba(7,32,26,0.35)] p-5">
              {GUJARAT_CITIES.map((city) => (
                <span
                  key={city}
                  className="text-[11px] text-foreground-muted border border-[rgba(212,175,55,0.15)] px-3 py-1 rounded-full"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="reveal-hidden delay-400">
          <div
            className="relative rounded-4xl overflow-hidden p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[rgba(212,175,55,0.15)]"
            style={{ background: 'linear-gradient(135deg, rgba(15,61,46,0.4) 0%, rgba(7,32,26,0.8) 100%)' }}
          >
            <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
            <div className="relative z-10 text-center sm:text-left">
              <p className="font-display text-xl sm:text-2xl font-medium text-foreground mb-1">
                Not sure if we cover your area?
              </p>
              <p className="text-sm text-foreground-muted">
                Drop us a WhatsApp message and we&apos;ll let you know within minutes.
              </p>
            </div>
            <a
              href="https://wa.me/918780859618?text=Hi%20The%20Maven!%20I%20want%20to%20check%20if%20you%20cover%20my%20area."
              className="relative z-10 btn-gold px-8 py-4 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2 flex-shrink-0"
            >
              <svg width="18" height="18" fill="#060D08" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;