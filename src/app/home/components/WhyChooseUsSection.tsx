'use client';

import React, { useEffect, useRef } from 'react';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: 'Certified Professionals',
    description: 'Every expert is certified, background-verified, and trained in luxury beauty techniques.',
    stat: '100%',
    statLabel: 'Certified',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 110 20 10 10 0 010-20z" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    title: 'Hygienic Service',
    description: 'Single-use hygienic kits, sterilized tools, and hospital-grade sanitization protocols.',
    stat: 'Zero',
    statLabel: 'Compromise',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'On-Time Guarantee',
    description: 'We respect your schedule. Our experts arrive within the confirmed time window, every time.',
    stat: '98%',
    statLabel: 'On Time',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: 'Premium Products',
    description: 'We use only professional-grade, dermatologist-approved products from trusted brands.',
    stat: 'Pro',
    statLabel: 'Grade Only',
  },
];

const WhyChooseUsSection: React.FC = () => {
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
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060D08 0%, #0A1A10 60%, #060D08 100%)' }}
    >
      {/* Gold radial glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal-hidden">
          <div className="eyebrow justify-center mb-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-DEFAULT">
              Why Choose Us
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-5">
            Trust that comes{' '}
            <span className="italic text-gold-gradient">standard</span>
          </h2>
          <p className="text-foreground-muted text-base max-w-xl mx-auto leading-relaxed">
            We built The Maven on four uncompromising pillars — so you never have to wonder if you made the right choice.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`service-card bg-bg-card rounded-4xl p-7 lg:p-8 flex flex-col reveal-hidden delay-${(index + 1) * 100}`}
            >
              {/* Stat */}
              <div className="mb-6">
                <div className="font-display text-5xl font-medium text-gold-gradient mb-1">{feature.stat}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-muted">{feature.statLabel}</div>
              </div>

              {/* Icon */}
              <div className="w-11 h-11 rounded-2xl bg-[rgba(212,175,55,0.1)] flex items-center justify-center text-gold-DEFAULT mb-5">
                {feature.icon}
              </div>

              <h3 className="font-display text-xl font-medium text-foreground-DEFAULT mb-3">{feature.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="reveal-hidden delay-500">
          <div className="relative rounded-4xl overflow-hidden border border-[rgba(212,175,55,0.2)] p-8 lg:p-12"
            style={{ background: 'linear-gradient(135deg, #0F3D2E 0%, #1A5C44 50%, #0C2B1F 100%)' }}>
            {/* Noise */}
            <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground-DEFAULT mb-2">
                  Ready for salon quality{' '}
                  <span className="italic text-gold-DEFAULT">at home?</span>
                </p>
                <p className="text-foreground-muted text-base">
                  Join 500+ happy clients across Mumbai, Pune & Delhi.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a href="#booking" className="btn-gold px-8 py-4 rounded-full text-base font-semibold whitespace-nowrap text-center">
                  Book Now
                </a>
                <a
                  href="https://wa.me/919876543210"
                  className="btn-ghost px-8 py-4 rounded-full text-base font-semibold whitespace-nowrap text-center inline-flex items-center justify-center gap-2"
                >
                  <svg width="18" height="18" fill="#D4AF37" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;  