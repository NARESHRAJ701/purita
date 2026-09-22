import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play, Volume2, VolumeX, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMouseParallax } from '../hooks/useMouseParallax';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onWatchStory: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchStory, onExploreClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const visualGroupRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Smooth mouse parallax for desktop
  const mouseOffset = useMouseParallax(1);

  // GSAP entrance and ScrollTrigger depth layers
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          '.hero-heading-line',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          '-=0.5'
        )
        .fromTo(
          '.hero-desc',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-actions',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-metrics',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          visualGroupRef.current,
          { opacity: 0, scale: 0.96, y: 35 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power4.out' },
          '-=1.0'
        );

      // 2. ScrollTrigger Parallax (Depth layers)
      gsap.to('.hero-visual-container', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to('.hero-floating-leaves', {
        yPercent: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.hero-text-content', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center bg-[#F6F3ED] overflow-hidden"
    >
      {/* Background Soft Sunlight & Caustic Aura */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-gradient-to-bl from-[#FAF0D7]/60 via-[#E9F1E2]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-[#EFE8DC]/70 to-transparent rounded-full blur-2xl pointer-events-none -ml-24 -mb-24" />

      {/* Floating Leaves Parallax Layer (Layer 5) */}
      <div
        className="hero-floating-leaves absolute inset-0 pointer-events-none z-20"
        style={{
          transform: `translate3d(${mouseOffset.x * 16}px, ${mouseOffset.y * 16}px, 0)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Soft botanical accent blur leaf top-left */}
        <div className="absolute top-20 left-8 md:left-24 w-12 h-24 bg-botanical-forest/10 rounded-full rotate-45 blur-md" />
        {/* Subtle accent right-middle */}
        <div className="absolute top-1/2 right-12 w-16 h-32 bg-botanical-moss/10 rounded-full -rotate-12 blur-lg" />
      </div>

      <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Editorial Text (45-50% desktop width) */}
          <div
            ref={textGroupRef}
            className="hero-text-content lg:col-span-6 xl:col-span-6 space-y-6 md:space-y-8"
          >
            {/* Eyebrow */}
            <div className="hero-eyebrow flex items-center gap-3">
              <span className="w-8 h-[1px] bg-botanical-forest/50" />
              <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-botanical-forest uppercase">
                Natural Care for a Brighter You
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="hero-heading font-serif text-botanical font-normal">
              <span className="hero-heading-line block">Pure</span>
              <span className="hero-heading-line block">Ingredients.</span>
              <span className="hero-heading-line block text-botanical-forest italic font-serif">
                Real Care.
              </span>
            </h1>

            {/* Editorial Description */}
            <p className="hero-desc text-base md:text-lg text-charcoal/75 max-w-lg leading-relaxed font-sans font-light">
              Premium bathing soaps crafted with nature's finest botanicals for
              naturally healthy, refreshed skin. Formulated from time-honored
              Ayurvedic recipes with unadulterated cold-pressed oils.
            </p>

            {/* CTAs */}
            <div className="hero-actions flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="btn-botanical"
                data-cursor="EXPLORE"
              >
                <span>Explore Our Soaps</span>
                <ArrowRight className="w-4 h-4 btn-arrow" />
              </button>

              <button
                onClick={onWatchStory}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-botanical/25 text-botanical hover:bg-black/5 transition-all duration-300 font-medium text-sm group"
                data-cursor="PLAY"
              >
                <div className="w-7 h-7 rounded-full bg-botanical-forest/15 text-botanical flex items-center justify-center group-hover:scale-110 group-hover:bg-botanical group-hover:text-cream transition-all duration-300">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Trust Metrics & Editorial Divider */}
            <div className="hero-metrics pt-6 border-t border-subtleBorder/30">
              <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="font-serif text-2xl md:text-3xl text-botanical font-semibold">
                    100%
                  </div>
                  <div className="text-[11px] md:text-xs text-charcoal/60 uppercase tracking-wider mt-0.5">
                    Natural Ingredients
                  </div>
                </div>
                <div className="border-l border-subtleBorder/30 pl-4">
                  <div className="font-serif text-2xl md:text-3xl text-botanical font-semibold">
                    0%
                  </div>
                  <div className="text-[11px] md:text-xs text-charcoal/60 uppercase tracking-wider mt-0.5">
                    Harsh Chemicals
                  </div>
                </div>
                <div className="border-l border-subtleBorder/30 pl-4">
                  <div className="font-serif text-2xl md:text-3xl text-botanical font-semibold">
                    Grade 1
                  </div>
                  <div className="text-[11px] md:text-xs text-charcoal/60 uppercase tracking-wider mt-0.5">
                    TFM 76% Pure
                  </div>
                </div>
              </div>

              {/* Minimal Script Accent */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-xs tracking-[0.2em] uppercase text-charcoal/40 font-medium">
                  The Real Pure
                </span>
                <span className="w-12 h-[1px] bg-subtleBorder/40" />
                <span className="font-script text-xl text-botanical/70">
                  Goodness in Every Bath
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Cinematic Video & Product Composition (50-55% desktop width) */}
          <div
            ref={visualGroupRef}
            className="hero-visual-container lg:col-span-6 xl:col-span-6 relative"
          >
            {/* Ambient Shadow & Pebble Frame */}
            <div
              className="relative w-full rounded-[36px] md:rounded-[44px] overflow-hidden shadow-botanical-lg border border-white/60 bg-cream-card transition-transform duration-300 group"
              style={{
                transform: `translate3d(${mouseOffset.x * 10}px, ${mouseOffset.y * 10}px, 0)`,
              }}
            >
              {/* Cinematic Video Player */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] md:aspect-[4/3] w-full overflow-hidden bg-black/90">
                <video
                  ref={videoRef}
                  src="/assets/video.mp4"
                  poster="/images/video_poster.jpg"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover transform scale-[1.02] group-hover:scale-[1.04] transition-transform duration-1000 ease-out"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Calligraphy Accent Top Right */}
                <div className="absolute top-5 right-6 z-20 pointer-events-none drop-shadow-md">
                  <span className="font-script text-2xl md:text-3xl text-white drop-shadow">
                    Goodness in Every Bath
                  </span>
                </div>

                {/* Bottom Video Floating Controls & Story Trigger */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-white/20 backdrop-blur-md rounded-2xl p-2.5 px-4 text-white border border-white/20 shadow-lg">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleVideoPlayback}
                      className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                      aria-label={isPlaying ? 'Pause ambient video' : 'Play ambient video'}
                    >
                      <Play
                        className={`w-3.5 h-3.5 fill-current ${
                          isPlaying ? 'opacity-70' : 'opacity-100'
                        }`}
                      />
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <span className="text-[11px] font-medium tracking-wider uppercase opacity-90 hidden sm:inline">
                      Living Waterfall Ritual
                    </span>
                  </div>

                  <button
                    onClick={onWatchStory}
                    className="flex items-center gap-1.5 text-xs font-semibold tracking-wide bg-white/90 hover:bg-white text-botanical-dark px-3 py-1.5 rounded-full shadow-sm transition-all duration-300 hover:scale-105"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-turmeric-gold" />
                    <span>View Full Film</span>
                  </button>
                </div>
              </div>

              {/* Three Product Highlight Strips Below Video */}
              <div className="p-4 sm:p-5 bg-white/70 backdrop-blur-md border-t border-white/50 grid grid-cols-3 gap-2 sm:gap-3 text-center">
                <a
                  href="#products"
                  className="p-2 sm:p-2.5 rounded-2xl bg-[#FAF0D7]/70 hover:bg-[#FAF0D7] border border-turmeric/20 transition-all duration-300 hover:-translate-y-1 block"
                >
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#8E670B] uppercase tracking-wider block">
                    Turmeric & Saffron
                  </span>
                  <span className="text-[9px] text-charcoal/60 block mt-0.5">
                    Clear Glow
                  </span>
                </a>
                <a
                  href="#products"
                  className="p-2 sm:p-2.5 rounded-2xl bg-[#F5EBE1]/70 hover:bg-[#F5EBE1] border border-sandal/20 transition-all duration-300 hover:-translate-y-1 block"
                >
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#764F25] uppercase tracking-wider block">
                    Sandal
                  </span>
                  <span className="text-[9px] text-charcoal/60 block mt-0.5">
                    Calming Warmth
                  </span>
                </a>
                <a
                  href="#products"
                  className="p-2 sm:p-2.5 rounded-2xl bg-[#E9F1E2]/70 hover:bg-[#E9F1E2] border border-aloe/20 transition-all duration-300 hover:-translate-y-1 block"
                >
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#43632F] uppercase tracking-wider block">
                    Aloe Vera & Lime
                  </span>
                  <span className="text-[9px] text-charcoal/60 block mt-0.5">
                    Crisp Hydration
                  </span>
                </a>
              </div>
            </div>

            {/* Subtle floating badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#FAF8F2] py-2.5 px-4 rounded-full shadow-botanical border border-subtleBorder/30 items-center gap-2.5 z-30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-botanical">
                100% Cold-Pressed Botanical Extracts
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
