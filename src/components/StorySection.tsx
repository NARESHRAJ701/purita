import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  onStoryClick?: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onStoryClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax float on the right photographic visual
      gsap.to(visualRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="pt-16 md:pt-20 pb-10 md:pb-14 bg-[#FAF8F2] relative overflow-hidden"
    >
      <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-botanical-forest/50" />
              <span className="text-xs font-semibold tracking-[0.25em] text-botanical-forest uppercase">
                Our Heritage & Story
              </span>
            </div>

            <h2 className="section-heading font-serif text-botanical font-normal">
              Formulated from<br />
              what the earth takes<br />
              <span className="italic font-serif text-botanical-forest">years to make.</span>
            </h2>

            <p className="text-charcoal/75 text-base md:text-lg font-light leading-relaxed">
              Three botanicals sourced from the places they grow best, combined into formulas designed around natural care. We do not use petrochemical fillers, artificial foaming detergents, or harsh synthetic stabilizers.
            </p>

            <p className="text-charcoal/65 text-sm md:text-base font-light leading-relaxed">
              From Mysore sandalwood farms to tropical neem & lime groves and Kashmir saffron valleys, each PURITA batch honors the soil, water, and generational cultivators who nurture our raw botanicals.
            </p>

            {/* Story CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  if (onStoryClick) onStoryClick();
                  else {
                    const el = document.querySelector('#hero');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-botanical"
                data-cursor="OUR STORY"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 btn-arrow" />
              </button>
            </div>

            {/* Botanical Badge */}
            <div className="pt-6 border-t border-subtleBorder/30 flex items-center gap-4 text-xs text-charcoal/60">
              <div className="w-9 h-9 rounded-full bg-botanical-forest/10 flex items-center justify-center text-botanical-forest">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-botanical block">
                  Cold Processed Wisdom
                </span>
                <span>Cured slowly over 28 days for optimal dermal gentleness.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Photographic Visual & Soap Bar */}
          <div
            ref={visualRef}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-botanical-lg border border-subtleBorder/30 group bg-cream">
              <img
                src="/assets/nature_elements.png"
                alt="Raw botanical elements: fresh turmeric, saffron threads, aloe vera, and citrus in pristine nature"
                loading="lazy"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Calligraphic Script Accent */}
              <div className="absolute top-6 right-8 z-10 drop-shadow-md">
                <span className="font-script text-3xl md:text-4xl text-white">
                  Back to Nature
                </span>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 text-botanical flex items-center justify-between text-xs">
                <span className="font-serif italic font-medium text-sm">
                  100% Pure Botanical  Soap
                </span>
                <span className="text-[10px] tracking-widest uppercase bg-botanical text-cream px-2.5 py-1 rounded-full">
                  Grade 1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
