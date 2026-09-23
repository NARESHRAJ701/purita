import React, { useEffect, useRef } from 'react';
import { Leaf, Droplets, Flower2, Heart, FlaskConical, Package } from 'lucide-react';
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
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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

  const mobileBenefits = [
    { icon: Leaf, line1: 'Natural', line2: 'Ingredients' },
    { icon: FlaskConical, line1: 'No Harsh', line2: 'Chemicals' },
    { icon: Heart, line1: 'Cruelty', line2: 'Free' },
    { icon: Package, line1: 'Sustainable', line2: 'Packaging' },
  ];

  const desktopBenefits = [
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
      className="relative bg-[#FAF8F2] border-b border-subtleBorder/20"
    >
      {/* MOBILE COMPACT BENEFIT STRIP (< 768px) */}
      <div className="md:hidden py-[18px] px-4 sm:px-5">
        <div className="grid grid-cols-4 gap-2 text-center">
          {mobileBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="benefit-item flex flex-col items-center justify-center gap-1.5">
                <Icon className="w-4 h-4 text-[#243B26] stroke-[1.5]" />
                <span className="text-[10px] sm:text-[11px] font-sans font-medium text-[#243B26] leading-tight">
                  {item.line1}<br />{item.line2}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP 4-COLUMN BENEFIT STRIP (>= 768px, UNTOUCHED) */}
      <div className="hidden md:block py-10 md:py-14 bg-[#EEE9DE]">
        <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-subtleBorder/30">
            {desktopBenefits.map((benefit, index) => {
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
      </div>
    </section>
  );
};
