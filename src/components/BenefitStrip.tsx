import React, { useEffect, useRef } from 'react';
import { Leaf, Droplets, Flower2, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BenefitStrip: React.FC = () => {
  const stripRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.benefit-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stripRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, stripRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      description: 'Pure botanical extracts & zero harsh sulfates',
    },
    {
      icon: Droplets,
      title: 'Gentle on Skin',
      description: 'Grade 1 TFM moisture protection for pH balance',
    },
    {
      icon: Flower2,
      title: 'Refreshing Fragrance',
      description: 'Authentic botanical aromatherapeutic oils',
    },
    {
      icon: Heart,
      title: 'For the Whole Family',
      description: 'Dermatologically pure & safe for daily bathing',
    },
  ];

  return (
    <section
      ref={stripRef}
      className="relative bg-[#EEE9DE] border-y border-subtleBorder/25 py-10 md:py-14"
    >
      <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-subtleBorder/30">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="benefit-item group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 lg:px-8 first:lg:pl-0 last:lg:pr-0 cursor-default transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="p-3 rounded-2xl bg-white/50 border border-white/60 text-botanical-forest group-hover:text-botanical group-hover:bg-white transition-all duration-300 group-hover:rotate-6 flex-shrink-0 shadow-sm">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-base md:text-lg text-botanical font-medium tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs md:text-[13px] text-charcoal/65 mt-1 font-light leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
