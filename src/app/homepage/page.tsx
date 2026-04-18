import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import GalleryTestimonialsSection from './components/GalleryTestimonialsSection';
import BookingSection from './components/BookingSection';
import ContactSection from './components/ContactSection';

export const metadata: Metadata = {
  title: 'The Maven — Luxury Beauty Services at Your Doorstep',
  description: 'Professional hair, skin, makeup & bridal beauty services at your home. Certified experts. Premium products. Mumbai, Pune & Delhi.',
  alternates: {
    canonical: '/homepage',
  },
  openGraph: {
    title: 'The Maven — Luxury Beauty at Home',
    description: 'Salon-quality beauty services delivered to your doorstep.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
};

export default function Homepage() {
  return (
    <main className="relative overflow-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                name: 'The Maven',
                url: 'https://themaven.in',
                logo: '/assets/images/app_logo.png',
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+91-98765-43210',
                  contactType: 'customer service',
                  areaServed: ['Mumbai', 'Pune', 'Delhi'],
                },
              },
              {
                '@type': 'WebPage',
                name: 'The Maven — Luxury Beauty Services at Your Doorstep',
                description: 'At-home beauty services including hair, skin, makeup and bridal services in Mumbai, Pune, and Delhi.',
              },
              {
                '@type': 'SoftwareApplication',
                name: 'The Maven Booking',
                applicationCategory: 'BeautyApplication',
                operatingSystem: 'Web',
              },
            ],
          }),
        }}
      />

      <Header />

      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <GalleryTestimonialsSection />
      <BookingSection />
      <ContactSection />

      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918780859618?text=Hi%20The%20Maven!%20I%27d%20like%20to%20book%20a%20home%20beauty%20service."
        className="whatsapp-float w-14 h-14 rounded-full flex items-center justify-center shadow-2xl gold-pulse"
        style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </main>
  );
}