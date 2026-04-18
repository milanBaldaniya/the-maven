'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
  image: string;
  alt: string;
  span?: string;
}

const services: Service[] = [
{
  id: 'hair',
  title: 'Hair Services',
  subtitle: 'Cut · Color · Styling',
  description: 'Professional haircuts, coloring, all treatments, Hairspa & Massage and blowouts — all in your living room.',
  features: ['Haircut & Styling', 'All Treatments', 'Hairspa & Massage', 'Hair Color & Highlights', 'Deep Conditioning'],
  price: 'From ₹499',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c682f964-1772071632732.png",
  alt: 'Professional hairstylist styling long hair at client home with gold lighting',
  span: 'lg:col-span-2 lg:row-span-2'
},
{
  id: 'skin',
  title: 'Skin Care',
  subtitle: 'Facials · Cleanup · Glow',
  description: 'Rejuvenating facials, waxing, threading, face massage, deep cleansing, de-tan treatment, and anti-aging care using premium products.',
  features: ['Gold Facial', 'Waxing', 'Threading', 'Face Massage', 'Deep Cleansing', 'De-Tan Treatment', 'Anti-Aging Care'],
  price: 'From ₹699',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9530d3e-1769201271720.png",
  alt: 'Luxury facial skin care treatment being applied on woman face at home',
  span: 'lg:col-span-2'
},
{
  id: 'makeup',
  title: 'Makeup',
  subtitle: 'Party · Wedding · HD',
  description: 'From natural everyday looks to dramatic HD makeup for special occasions.',
  features: ['Party Makeup', 'HD Makeup', 'Airbrush Finish', 'Eye & Lip Artistry'],
  price: 'From ₹999',
  image: "https://images.unsplash.com/photo-1560869683-f5d8bf564346",
  alt: 'Makeup artist applying premium party makeup on woman at her home',
  span: 'lg:col-span-2'
},
{
  id: 'bridal',
  title: 'Bridal at Home',
  subtitle: 'Full Bridal Package',
  description: 'Complete bridal beauty — makeup, hair, draping — at your home on your special day.',
  features: ['Bridal Makeup', 'Hair Styling', 'Pre-Bridal Package', 'Saree/Lehenga Draping'],
  price: 'From ₹9,999',
  image: "/assets/images/bridal-at-home.jpg",
  alt: 'Bride getting luxury bridal makeup and hair styling done at home',
  span: 'lg:col-span-2'
}];


const ServicesSection: React.FC = () => {
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
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060D08 0%, #0A1A10 100%)' }}>
      
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal-hidden">
          <div className="eyebrow justify-center mb-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-DEFAULT">
              Our Services
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-5">
            Everything you need,{' '}
            <span className="italic text-gold-gradient">at home</span>
          </h2>
          <p className="text-foreground-muted text-base max-w-xl mx-auto leading-relaxed">
            Professional beauty services curated for your comfort. Our certified experts bring salon quality to your doorstep.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-auto lg:auto-rows-[280px]">
          {services.map((service, index) =>
          <div
            key={service.id}
            className={`service-card bg-bg-card rounded-4xl overflow-hidden relative group cursor-pointer reveal-hidden delay-${(index + 1) * 100} ${service.span || ''}`}>
            
              {/* Image */}
              <div className="gallery-item absolute inset-0">
                <AppImage
                src={service.image}
                alt={service.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-[#060D08] via-[#060D08]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060D08]/80" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-7 lg:p-8 min-h-[260px] lg:min-h-0">
                {/* Top */}
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-DEFAULT bg-[rgba(212,175,55,0.12)] px-3 py-1.5 rounded-full">
                    {service.subtitle}
                  </span>
                  <span className="text-sm font-semibold text-gold-DEFAULT">{service.price}</span>
                </div>

                {/* Bottom */}
                <div>
                  <h3 className="font-display text-2xl lg:text-3xl font-medium text-foreground-DEFAULT mb-2">{service.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-sm">
                    {service.description}
                  </p>

                  {/* Features on hover */}
                  <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                    {service.features.slice(0, 3).map((f) =>
                  <span key={f} className="text-[10px] text-foreground-muted border border-[rgba(212,175,55,0.2)] px-2.5 py-1 rounded-full">
                        {f}
                      </span>
                  )}
                  </div>

                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a href='#booking'><span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-DEFAULT inline-flex items-center gap-2">Book Now</span></a>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5">
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 reveal-hidden delay-500">
          <a href="#booking" className="btn-gold px-10 py-4 rounded-full text-base font-semibold inline-flex items-center gap-3">
            Book Any Service at Home
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </a>
        </div>
      </div>
    </section>);

};

export default ServicesSection; 