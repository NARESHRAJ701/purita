import React, { useEffect, useRef, useState } from 'react';
import { Leaf, Sparkles, Droplet, ShieldCheck, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MakingProcess: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Natural Ingredients',
      subtitle: 'Wild & Cultivated',
      desc: 'Carefully sourced botanicals from their natural habitats across Karnataka, Kerala and Kashmir.',
      icon: Leaf,
    },
    {
      step: '02',
      title: 'Gently Processed',
      subtitle: 'Stone Mortar Ground',
      desc: 'Traditionally cold-ground to preserve volatile essential oils and active phytonutrients.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'Blended With Care',
      subtitle: 'Pure Golden Oils',
      desc: 'Cold-pressed virgin coconut and jojoba oils thoughtfully combined with botanical essences.',
      icon: Droplet,
    },
    {
      step: '04',
      title: 'Naturally Crafted',
      subtitle: 'Slow Wooden Molds',
      desc: 'Slowly cured into firm bars for weeks without boiling or harsh chemical hardeners.',
      icon: ShieldCheck,
    },
    {
      step: '05',
      title: 'Pure Care For You',
      subtitle: 'Everyday Ritual',
      desc: 'A grade 1 TFM soap bar that brings nature’s soothing goodness into every single bath.',
      icon: Heart,
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 768;
    if (prefersReducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-card-anim',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
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

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      className="py-12 md:py-36 bg-[#FAF8F2] relative overflow-visible md:overflow-hidden"
    >
      <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-20 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-botanical-forest/50" />
            <span className="text-xs font-semibold tracking-[0.25em] text-botanical-forest uppercase">
              Our Craftsmanship
            </span>
            <span className="w-8 h-[1px] bg-botanical-forest/50" />
          </div>

          <h2 className="section-heading font-serif text-botanical font-normal">
            From Nature<br />
            <span className="italic font-serif">To Your Skin</span>
          </h2>

          <p className="text-charcoal/75 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Every PURITA bar undergoes a slow 5-step cold formulation designed around skin health rather than mass industrial speed.
          </p>
        </div>

        {/* Authentic Making Process Infographic Asset (Visible on mobile & desktop) */}
        <div className="relative rounded-[20px] sm:rounded-[28px] md:rounded-[32px] overflow-hidden shadow-md border border-white/60 bg-white/50 backdrop-blur-sm mb-8 md:mb-16 group">
          <img
            src="/images/making_process.png"
            alt="PURITA Botanical Soap Making Process"
            loading="lazy"
            className="w-full h-auto object-contain transform group-hover:scale-[1.01] transition-transform duration-700"
          />
        </div>

        {/* 5 Interactive Steps: Stacking Deck on Mobile (< 768px), 5-Col Grid on Desktop (>= 768px) */}
        <div className="relative flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 gap-0 md:gap-6 pb-14 md:pb-0">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`process-card-anim cursor-pointer p-5 sm:p-6 rounded-[22px] sm:rounded-[24px] border transition-all duration-300
                  sticky md:static mb-5 md:mb-0 bg-white
                  shadow-[0_10px_30px_rgba(0,0,0,0.07)] md:shadow-none
                  ${
                    isSelected
                      ? 'border-botanical-forest ring-1 ring-botanical-forest/30'
                      : 'border-black/[0.08] hover:border-black/20'
                  }
                `}
                style={{
                  top: `calc(76px + ${idx * 20}px)`,
                  zIndex: 10 + idx,
                }}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <span className="font-serif text-2xl font-light text-botanical-forest">
                    {item.step}
                  </span>
                  <div
                    className={`p-2 rounded-xl transition-colors ${
                      isSelected
                        ? 'bg-botanical text-cream'
                        : 'bg-black/5 text-botanical'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-base sm:text-lg text-botanical font-medium">
                  {item.title}
                </h3>
                <span className="text-[10px] sm:text-[11px] text-turmeric-gold font-medium uppercase tracking-wider block mb-1.5 sm:mb-2">
                  {item.subtitle}
                </span>

                <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tagline Footer */}
        <div className="mt-10 sm:mt-14 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-botanical-forest font-medium">
            Closer to Nature • Closer to You
          </span>
        </div>
      </div>
    </section>
  );
};
