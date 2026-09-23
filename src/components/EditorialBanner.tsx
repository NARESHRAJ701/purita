import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Leaf, Sprout, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EditorialBannerProps {
  onShopClick?: () => void;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({ onShopClick }) => {
  const bannerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Background slow parallax on desktop
      if (window.innerWidth >= 768) {
        gsap.to(bgImageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to(textContentRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const handleStoryClick = () => {
    const el = document.querySelector('#story');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={bannerRef}
      className="relative w-full overflow-hidden bg-botanical-dark"
    >
      {/* ============================================================== */}
      {/* MOBILE SLOW SKINCARE SECTION (< 768px)                         */}
      {/* ============================================================== */}
      <div className="md:hidden relative h-[480px] sm:h-[500px] w-full flex flex-col justify-between p-5 sm:p-6 overflow-hidden">
        {/* Background Image: Soap on Stone in Forest */}
        <div
          className="absolute inset-0 w-full h-full bg-cover pointer-events-none"
          style={{
            backgroundImage: 'url(/images/editorial_soap_stone.jpg)',
            backgroundPosition: 'center right',
          }}
        />

        {/* Natural Dark Gradient Overlay for Left Text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

        {/* Top / Main Content */}
        <div className="relative z-10 pt-4 space-y-3 max-w-[290px]">
          <h2 className="font-serif text-[30px] sm:text-[34px] leading-[1.08] text-[#FAF8F2] font-normal tracking-tight">
            Slow Skincare<br />
            for a Better Tomorrow
          </h2>

          <p className="text-xs text-[#FAF8F2]/80 leading-relaxed font-light">
            Thoughtfully crafted products for healthier skin and a healthier planet.
          </p>

          <div className="pt-1">
            <button
              onClick={handleStoryClick}
              className="bg-white hover:bg-cream text-[#1E2719] px-5 py-2.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <span>Our Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Benefit Row */}
        <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between gap-2 text-white/90">
          <div className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-wide">Small Batches</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Sprout className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-wide">Real Ingredients</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-300" />
            <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-wide">Lighter Footprint</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP EDITORIAL BANNER (>= 768px, UNTOUCHED)                 */}
      {/* ============================================================== */}
      <div className="hidden md:flex relative min-h-[580px] lg:min-h-[680px] w-full items-center">
        {/* Cinematic Photography Background */}
        <div
          ref={bgImageRef}
          className="absolute -top-[15%] left-0 w-full h-[130%] pointer-events-none scale-105"
          style={{
            backgroundImage: 'url(/images/editorial_soap_stone.jpg)',
            backgroundPosition: 'center right',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-botanical-dark/30 mix-blend-multiply z-10 pointer-events-none" />

        {/* Content Container */}
        <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full relative z-20 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div
              ref={textContentRef}
              className="lg:col-span-7 xl:col-span-6 space-y-6 text-cream"
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-turmeric-gold font-medium tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Timeless Craftsmanship</span>
              </div>

              {/* Heading */}
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream font-normal leading-[1.1] tracking-tight">
                Slow-grown.<br />
                <span className="italic font-serif text-white/90">Applied daily.</span>
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-cream/80 max-w-md font-sans font-light leading-relaxed">
                Body care made from what takes years to form. Sourced from aged heartwood, hand-harvested herbs, and gentle sun-cured oils.
              </p>

              {/* CTA */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onShopClick) onShopClick();
                    else {
                      const el = document.querySelector('#products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="btn-botanical !bg-cream !text-botanical-dark hover:!bg-white !shadow-lg"
                  data-cursor="SHOP"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 btn-arrow text-botanical-forest" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
