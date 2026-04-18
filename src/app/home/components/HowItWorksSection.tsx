'use client';

import React, { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Choose Your Service',
    description: 'Browse our menu of hair, skin, makeup, and bridal services. Pick what suits your mood and occasion.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="2" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
    detail: 'Hair · Skin · Makeup · Bridal',
    bg: 'from-[#0C2B1F] to-[#071810]',
    colSpan: 'lg:col-span-2',
  },
  {
    number: '02',
    title: 'Book Appointment',
    description: 'Pick your date, time, and address. We confirm within 30 minutes.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    detail: 'Confirmed in 30 mins',
    bg: 'from-[#1A3A20] to-[#0C2B1F]',
    colSpan: 'lg:col-span-2',
  },
  {
    number: '03',
    title: 'Expert Visits Your Home',
    description: 'Your certified beauty professional arrives at your address with all equipment and premium products.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    detail: 'Fully equipped · On time',
    bg: 'from-[#0C2B1F] to-[#071810]',
    colSpan: 'lg:col-span-2',
  },
  {
    number: '04',
    title: 'Enjoy the Experience',
    description: 'Relax in the comfort of your home while our expert delivers salon-quality results.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    detail: 'Pure luxury · At home',
    bg: 'from-[#2A1A08] to-[#1A0E04]',
    colSpan: 'lg:col-span-2',
  },
];

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-hidden').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 150);
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
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A1A10 0%, #060D08 100%)' }}
    >
      {/* Decorative shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px shimmer-line" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6 reveal-hidden">
          <div>
            <div className="eyebrow mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                How It Works
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
              Salon at home in{' '}
              <span className="italic text-gold-gradient">4 simple steps</span>
            </h2>
          </div>
          <p className="text-foreground-muted text-base max-w-xs leading-relaxed lg:pb-2">
            We handle everything — you just sit back and enjoy the luxury.
          </p>
        </div>

        {/* Steps Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`step-card rounded-4xl p-7 lg:p-8 bg-gradient-to-br border border-[rgba(212,175,55,0.08)] hover:border-[rgba(212,175,55,0.25)] transition-all duration-500 reveal-hidden delay-${(index + 1) * 100} ${step.bg} ${step.colSpan}`}
            >
              {/* Step number + icon */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-5xl font-medium text-gold opacity-20">{step.number}</span>
                <div className="w-12 h-12 rounded-2xl bg-[rgba(212,175,55,0.1)] flex items-center justify-center text-gold">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl lg:text-2xl font-medium text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-6">{step.description}</p>

              {/* Detail tag */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                <span className="text-[11px] font-semibold text-gold uppercase tracking-[0.15em]">{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;