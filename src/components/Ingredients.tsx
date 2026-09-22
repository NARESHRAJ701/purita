import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_INGREDIENTS } from '../data/ingredients';

gsap.registerPlugin(ScrollTrigger);

export const Ingredients: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ingredient-feature-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToGallery = () => {
    const el = document.querySelector('#botanical-gallery');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="py-24 md:py-36 bg-cream relative overflow-hidden"
    >
      <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-botanical-forest/50" />
              <span className="text-xs font-semibold tracking-[0.25em] text-botanical-forest uppercase">
                Ethical Sourcing
              </span>
            </div>
            <h2 className="section-heading font-serif text-botanical font-normal">
              What's inside
            </h2>
            <p className="text-charcoal/70 text-base md:text-lg font-light leading-relaxed">
              Each ingredient was chosen because it works. Not because it looks good on a label. Pure whole-plant actives directly from sustainable Indian farms.
            </p>
          </div>

          <button
            onClick={scrollToGallery}
            className="btn-botanical text-sm self-start md:self-auto"
            data-cursor="EXPLORE"
          >
            <span>See All Ingredients</span>
            <ArrowRight className="w-4 h-4 btn-arrow" />
          </button>
        </div>

        {/* 3 Large Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {FEATURED_INGREDIENTS.map((item) => (
            <div
              key={item.id}
              className="ingredient-feature-card group relative h-[460px] sm:h-[500px] rounded-[26px] overflow-hidden shadow-botanical-sm hover:shadow-botanical transition-all duration-500 border border-black/5 flex flex-col justify-end"
              data-cursor="EXPLORE"
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-botanical-dark">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle Gradient Overlays for High Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />
                <div className="absolute inset-0 bg-botanical-forest/10 mix-blend-color z-10 pointer-events-none" />
              </div>

              {/* Floating Top Arrow */}
              <div className="absolute top-6 right-6 z-20">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-botanical group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Content (lifts 5px on hover) */}
              <div className="relative z-20 p-7 md:p-8 transform transition-transform duration-500 group-hover:-translate-y-1.5 space-y-2.5">
                <span className="text-[11px] font-mono text-turmeric-gold/90 uppercase tracking-widest block">
                  {item.latinName}
                </span>

                <h3 className="font-serif text-2xl md:text-3xl text-white font-medium">
                  {item.name}
                </h3>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light line-clamp-3">
                  {item.description}
                </p>

                {/* Benefits Pill Tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {item.benefits.map((b, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white/15 text-white/90 px-2.5 py-0.5 rounded-full backdrop-blur-sm"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
