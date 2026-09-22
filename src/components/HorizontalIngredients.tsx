import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HORIZONTAL_INGREDIENTS } from '../data/ingredients';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalIngredients: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only pin and horizontal scroll on desktop (>= 1024px) without reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop || prefersReducedMotion) return;

    const track = trackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    const ctx = gsap.context(() => {
      // Calculate horizontal translation amount
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${track.scrollWidth * 0.9}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="botanical-gallery"
      ref={sectionRef}
      className="relative bg-botanical-dark text-cream overflow-hidden"
    >
      <div
        ref={triggerRef}
        className="min-h-screen flex flex-col justify-center py-16 lg:py-24 relative"
      >
        {/* Ambient Botanical Glow */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-botanical-forest/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-turmeric-gold/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-turmeric-gold/60" />
            <span className="text-xs font-semibold tracking-[0.25em] text-turmeric-gold uppercase">
              Botanical Origin
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream font-normal">
              From the earth,<br />
              <span className="italic font-serif text-cream/90">into every bath.</span>
            </h2>
            <p className="text-cream/60 text-xs sm:text-sm max-w-sm font-light">
              Scroll horizontally to explore our primary indigenous botanical harvests and their cellular skin benefits.
            </p>
          </div>
        </div>

        {/* Cards Track (Horizontal Pinned on Desktop, Swipe Carousel on Mobile) */}
        <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar px-5 sm:px-8 md:px-12 lg:px-16 pb-6">
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 lg:gap-8 w-max select-none"
          >
            {HORIZONTAL_INGREDIENTS.map((item) => (
              <div
                key={item.id}
                className="w-[290px] sm:w-[340px] md:w-[380px] bg-white/[0.04] border border-white/10 rounded-[28px] p-6 sm:p-7 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 group flex-shrink-0"
                data-cursor="EXPLORE"
              >
                {/* Header Number & Latin Name */}
                <div className="flex items-start justify-between">
                  <span className="font-serif text-2xl sm:text-3xl text-turmeric-gold font-light">
                    {item.number}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-cream/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    <MapPin className="w-3 h-3 text-botanical-muted" />
                    <span>{item.source}</span>
                  </div>
                </div>

                {/* Card Visual / Thumbnail */}
                <div className="py-6 flex items-center justify-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-white/15 p-1 group-hover:scale-105 transition-transform duration-500 shadow-lg bg-black/30">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-full group-hover:rotate-3 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-botanical-muted uppercase">
                      {item.latinName}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-cream font-medium">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-[13px] text-cream/70 font-light leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-white/10 text-cream/80 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/10 text-cream flex items-center justify-center group-hover:bg-turmeric-gold group-hover:text-botanical-dark transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="lg:hidden flex items-center justify-center gap-2 text-xs text-cream/50 pt-2">
          <span>Swipe horizontally to view all ingredients</span>
        </div>
      </div>
    </section>
  );
};
