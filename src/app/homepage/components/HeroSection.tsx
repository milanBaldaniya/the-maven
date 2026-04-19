'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import { GUJARAT_CITIES } from '@/data/gujaratCities';

const HeroSection: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden noise-overlay"
      style={{ background: 'linear-gradient(160deg, #060D08 0%, #0A1F14 40%, #07201A 100%)' }}>
      
      {/* Background grid */}
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" />

      {/* Atmospheric blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blob-1 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(15,61,46,0.6) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blob-2 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', filter: 'blur(100px)' }} />

      {/* Hero image - right side cinematic */}
      <div ref={parallaxRef} className="absolute right-0 top-0 w-full lg:w-1/2 h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060D08] via-[#060D08]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D08] via-transparent to-[#060D08]/30 z-10" />
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1896bd5cf-1767720031571.png"
          alt="Professional beauty expert applying luxury makeup service at client home"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw" />
        
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center min-h-screen px-5 sm:px-8 lg:px-12 pt-28 pb-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="eyebrow mb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Premium At-Home Beauty
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[56px] sm:text-[72px] lg:text-[90px] xl:text-[108px] leading-[0.9] font-medium tracking-tight mb-8">
              Luxury Beauty<br />
              <span className="italic text-gold-gradient">at Your</span><br />
              Doorstep
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-foreground-muted font-light leading-relaxed mb-4 max-w-lg">
              Professional hair, skin & makeup services delivered to your home. No commute, no waiting — just pure luxury.
            </p>

            {/* Service tags */}
            <div className="flex flex-wrap items-center gap-3 mb-12">
              {['Hair', 'Skin', 'Makeup', 'Bridal'].map((tag) =>
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full border border-[rgba(212,175,55,0.25)] text-xs font-semibold uppercase tracking-[0.15em] text-foreground-muted">
                
                  {tag}
                </span>
              )}
              <span className="text-xs text-foreground-muted opacity-60 ml-2">at Home</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#booking"
                className="btn-gold px-8 py-4 rounded-full text-base font-semibold text-center inline-flex items-center justify-center gap-3">
                
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Book At Home Service
              </a>
              <a
                href="#services"
                className="btn-ghost px-8 py-4 rounded-full text-base font-semibold text-center inline-flex items-center justify-center gap-3">
                
                View Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="mt-20 lg:mt-24 flex flex-col sm:flex-row gap-8 sm:gap-0">
            {[
            { value: '500+', label: 'Happy Clients', sub: 'Served at home' },
            { value: '4.9★', label: 'Average Rating', sub: 'Across all services' },
            {
              value: `${GUJARAT_CITIES.length}+`,
              label: 'Cities & Towns',
              sub: 'All cities across Gujarat',
            }].
            map((stat, i) =>
            <div
              key={stat.value}
              className={`sm:px-10 first:pl-0 ${i < 2 ? 'sm:border-r border-[rgba(212,175,55,0.15)]' : ''}`}>
              
                <div className="text-2xl sm:text-3xl font-display font-medium text-gold mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-foreground mb-0.5">{stat.label}</div>
                <div className="text-xs text-foreground-muted">{stat.sub}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute right-8 sm:right-16 lg:right-[calc(50%-80px)] bottom-20 z-30 float-badge hidden sm:block">
        <div className="bg-[#0F3D2E] border border-[rgba(212,175,55,0.3)] rounded-3xl p-5 backdrop-blur-md shadow-2xl max-w-[180px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Available Now</span>
          </div>
          <p className="text-sm font-medium text-foreground leading-snug">Expert visits your home today</p>
        </div>
      </div>
    </section>);

};

export default HeroSection;