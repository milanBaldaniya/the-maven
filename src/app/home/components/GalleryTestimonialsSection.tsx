  'use client';

  import React, { useEffect, useRef, useState } from 'react';
  import AppImage from '@/components/ui/AppImage';

  const galleryItems = [
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_18dc81593-1772281233506.png",
    alt: 'Luxury party makeup transformation done at home by Maven professional',
    label: 'Party Makeup',
    span: 'row-span-2'
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1de106ba0-1773641440925.png",
    alt: 'Professional hair styling and blowout at client home',
    label: 'Hair Styling',
    span: ''
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1ac87a6ef-1767692472139.png",
    alt: 'Gold facial skin treatment being applied by certified beautician at home',
    label: 'Gold Facial',
    span: ''
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1a49cb651-1772090160486.png",
    alt: 'Bridal makeup artist creating stunning bridal look at bride home',
    label: 'Bridal Makeup',
    span: 'row-span-2'
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1e79b4e8d-1771895285794.png",
    alt: 'Makeup artist applying eye makeup close up at home service',
    label: 'Eye Artistry',
    span: ''
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1c07dd4b8-1774248734102.png",
    alt: 'Hair color treatment and highlights at home beauty service',
    label: 'Hair Color',
    span: ''
  }];


  const testimonials = [
  {
    name: 'Mahika Sharma',
    role: 'Regular Client · Surat',
    quote: "The Maven changed how I think about beauty routines. Getting a facial in my own bedroom while watching Netflix? That's luxury I didn't know I needed.",
    rating: 5,
    service: 'Gold Facial',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b9b81eef-1772156471891.png"
  },
  {
    name: 'Ananya Mehta',
    role: 'Bride · Ahmedabad',
    quote: "My bridal makeup was flawless — and I got ready in my own room without the chaos of a salon. The expert was so professional and calming on my big day.",
    rating: 5,
    service: 'Bridal Package',
    avatar: "https://images.unsplash.com/photo-1638628064365-f08ad0ec8245"
  },
  {
    name: 'Kavya Reddy',
    role: 'Working Professional · Surat',
    quote: "I book The Maven every month for my haircut and keratin. Zero travel stress, same salon quality, and they always arrive on time. Absolutely worth it.",
    rating: 5,
    service: 'Hair Services',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e308b365-1768587431676.png"
  },
  {
    name: 'Neha Joshi',
    role: 'New Mother · Ahmedabad',
    quote: "As a new mom, stepping out for beauty treatments was impossible. The Maven was a lifesaver — professional, hygienic, and incredibly convenient.",
    rating: 5,
    service: 'Skin Care',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19c5b93c7-1766946262182.png"
  }];


  const GalleryTestimonialsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.querySelectorAll('.reveal-hidden').forEach((el, i) => {
                setTimeout(() => el.classList.add('revealed'), i * 100);
              });
            }
          });
        },
        { threshold: 0.1 }
      );
      if (sectionRef.current) observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    return (
      <section
        id="gallery"
        ref={sectionRef}
        className="relative py-24 lg:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0A1A10 0%, #060D08 100%)' }}>
        
        <div className="absolute top-0 left-0 right-0 h-px shimmer-line" />

        <div className="max-w-7xl mx-auto">
          {/* Gallery Header */}
          <div className="text-center mb-14 reveal-hidden">
            <div className="eyebrow justify-center mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Our Work
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-5">
              Real results,{' '}
              <span className="italic text-gold-gradient">real homes</span>
            </h2>
            <p className="text-foreground-muted text-base max-w-lg mx-auto leading-relaxed">
              Every look crafted by our certified professionals — all delivered at our clients' homes.
            </p>
          </div>

          {/* Masonry Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-[200px] sm:auto-rows-[220px] mb-24 reveal-hidden">
            {galleryItems.map((item, i) =>
            <div
              key={i}
              className={`gallery-item rounded-3xl overflow-hidden relative group ${item.span}`}>
              
                <AppImage
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 50vw, 33vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-[#060D08]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold bg-[rgba(6,13,8,0.8)] px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {item.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Testimonials */}
          <div className="reveal-hidden">
            <div className="text-center mb-12">
              <div className="eyebrow justify-center mb-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  Client Stories
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight">
                What our clients{' '}
                <span className="italic text-gold-gradient">are saying</span>
              </h2>
            </div>

            {/* Testimonial carousel */}
            <div className="relative">
              {/* Active testimonial */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {testimonials.map((t, i) =>
                <div
                  key={t.name}
                  onClick={() => setActiveTestimonial(i)}
                  className={`service-card rounded-4xl p-7 lg:p-8 cursor-pointer transition-all duration-500 ${
                  i === activeTestimonial ?
                  'testimonial-active bg-bg-card2 scale-[1.02]' :
                  'bg-bg-card opacity-60 hover:opacity-80'}`
                  }
                  style={{
                    borderColor: i === activeTestimonial ? 'rgba(212,175,55,0.4)' : undefined
                  }}>
                  
                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: t.rating }).map((_, si) =>
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    )}
                    </div>

                    {/* Service tag */}
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold bg-[rgba(212,175,55,0.1)] px-3 py-1 rounded-full mb-5 inline-block">
                      {t.service}
                    </span>

                    <p className="text-sm text-foreground leading-relaxed mb-7 font-light italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-[rgba(212,175,55,0.3)]">
                        <AppImage
                        src={t.avatar}
                        alt={`${t.name} - The Maven client testimonial`}
                        width={44}
                        height={44}
                        className="object-cover w-full h-full" />
                      
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-[11px] text-foreground-muted">{t.role}</p>
                      </div>
                    </div>

                    {/* Active indicator */}
                    {i === activeTestimonial &&
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gold rounded-full" />
                  }
                  </div>
                )}
              </div>

              {/* Pagination dots */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, i) =>
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`transition-all duration-300 rounded-full ${
                  i === activeTestimonial ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-[rgba(212,175,55,0.3)]'}`
                  }
                  aria-label={`Go to testimonial ${i + 1}`} />

                )}
              </div>
            </div>
          </div>
        </div>
      </section>);

  };

  export default GalleryTestimonialsSection;