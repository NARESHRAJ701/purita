import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
      // Background slow parallax
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

      // Text content camera parallax
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
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative min-h-[580px] lg:min-h-[680px] w-full overflow-hidden flex items-center bg-botanical-dark"
    >
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

      {/* Atmospheric Overlays (Vignette & Gradient for text contrast on left) */}
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
    </section>
  );
};
