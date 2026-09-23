import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
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
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 }
      )
        .fromTo(
          '.hero-heading-line',
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.95, stagger: 0.12 },
          '-=0.45'
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
        );

      // 2. Subtle text parallax on scroll
      gsap.to('.hero-text-content', {
        yPercent: -10,
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
      className="relative overflow-hidden bg-[#161B14]"
    >
      {/* ============================================================== */}
      {/* MOBILE IMAGE-LED HERO (< 768px)                                */}
      {/* ============================================================== */}
      <div className="md:hidden relative w-full h-[540px] sm:h-[580px] overflow-hidden flex items-center bg-[#161B14]">
        {/* Background Image: Waterfall & Soap on Rock */}
        <div
          className="absolute inset-0 w-full h-full bg-cover pointer-events-none"
          style={{
            backgroundImage: 'url(/images/editorial_waterfall_soap.jpg)',
            backgroundPosition: 'center 40%',
          }}
        />

        {/* Natural Dark Gradient Scrim on Left for Clean Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Script Accent on Right */}
        <div className="absolute bottom-12 right-5 z-20 pointer-events-none select-none">
          <span className="font-script text-3xl text-white/90 drop-shadow-md">
            Back to Nature
          </span>
        </div>

        {/* Mobile Content */}
        <div className="relative z-20 w-full px-5 py-8 flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-5 h-[1.5px] bg-[#E2B755]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#E2B755] uppercase font-sans">
              Pure Care. From Nature.
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[38px] sm:text-[42px] leading-[1.0] text-[#FAF8F2] font-normal tracking-tight mb-3">
            Pure care.<br />
            Real nature.<br />
            <span className="text-[#E2B755] italic font-serif">Better you.</span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-[#FAF8F2]/90 max-w-[270px] font-light leading-relaxed mb-6 drop-shadow-sm">
            Botanical skincare crafted by nature, for your everyday rituals.
          </p>

          {/* CTA */}
          <div>
            <button
              onClick={onExploreClick}
              className="bg-[#243B26] hover:bg-[#344D33] text-[#FAF8F2] text-xs font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP HERO (>= 768px, UNTOUCHED)                             */}
      {/* ============================================================== */}
      <div className="hidden md:flex relative min-h-[92vh] sm:min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 items-center overflow-hidden w-full">
        {/* 1. FULL-BLEED VIDEO BACKGROUND */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            ref={videoRef}
            src="/assets/video.mp4"
            poster="/images/video_poster.jpg"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center scale-[1.02]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#141A12]/90 via-[#141A12]/60 sm:via-[#141A12]/45 to-transparent/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/55 pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Floating Leaves Subtle Parallax Layer */}
        <div
          className="hero-floating-leaves absolute inset-0 pointer-events-none z-10"
          style={{
            transform: `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px, 0)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          <div className="absolute top-28 left-6 md:left-20 w-10 h-20 bg-emerald-400/10 rounded-full rotate-45 blur-md" />
          <div className="absolute bottom-32 right-16 w-14 h-28 bg-amber-400/10 rounded-full -rotate-12 blur-lg" />
        </div>

        {/* 2. FOREGROUND EDITORIAL CONTENT */}
        <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full relative z-20">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Editorial Brand Text */}
            <div
              ref={textGroupRef}
              className="hero-text-content space-y-6 md:space-y-8"
            >
              {/* Eyebrow */}
              <div className="hero-eyebrow flex items-center gap-3">
                <span className="w-8 h-[1.5px] bg-[#E2B755]" />
                <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#E2B755] uppercase font-sans">
                  Natural Care for a Brighter You
                </span>
              </div>

              {/* Main Editorial Heading */}
              <h1 className="hero-heading font-serif text-[#FAF8F2] font-normal tracking-tight drop-shadow-md">
                <span className="hero-heading-line block">Pure</span>
                <span className="hero-heading-line block">Ingredients.</span>
                <span className="hero-heading-line block text-[#E2B755] italic font-serif">
                  Real Care.
                </span>
              </h1>

              {/* Editorial Description */}
              <p className="hero-desc text-base sm:text-lg md:text-xl text-[#FAF8F2]/90 max-w-xl leading-relaxed font-sans font-light drop-shadow-sm">
                Premium bathing soaps crafted with nature's finest botanicals for
                naturally healthy, refreshed skin. Formulated from time-honored
                Ayurvedic recipes with unadulterated cold-pressed oils.
              </p>

              {/* CTAs */}
              <div className="hero-actions flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onExploreClick}
                  className="inline-flex items-center gap-2.5 bg-[#FAF8F2] hover:bg-[#FAF0D7] text-[#1E2719] font-medium text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
                  data-cursor="EXPLORE"
                >
                  <span>Explore Our Soaps</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={onWatchStory}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/30 text-[#FAF8F2] hover:bg-white/10 transition-all duration-300 font-medium text-sm group backdrop-blur-sm"
                  data-cursor="PLAY"
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 text-[#FAF8F2] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FAF8F2] group-hover:text-[#1E2719] transition-all duration-300">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <span>Watch Our Story</span>
                </button>
              </div>

              {/* Trust Metrics */}
              <div className="hero-metrics pt-8 border-t border-white/20">
                <div className="grid grid-cols-3 gap-4 sm:gap-6 text-left max-w-xl">
                  <div>
                    <div className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF8F2] font-semibold">
                      100%
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#FAF8F2]/75 uppercase tracking-wider mt-1 font-medium">
                      Natural Ingredients
                    </div>
                  </div>
                  <div className="border-l border-white/20 pl-4 sm:pl-6">
                    <div className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF8F2] font-semibold">
                      0%
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#FAF8F2]/75 uppercase tracking-wider mt-1 font-medium">
                      Harsh Chemicals
                    </div>
                  </div>
                  <div className="border-l border-white/20 pl-4 sm:pl-6">
                    <div className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF8F2] font-semibold">
                      Grade 1
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#FAF8F2]/75 uppercase tracking-wider mt-1 font-medium">
                      TFM 76% Pure
                    </div>
                  </div>
                </div>

                {/* Minimal Script Accent */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#FAF8F2]/60 font-medium">
                    The Real Pure
                  </span>
                  <span className="w-12 h-[1px] bg-white/25" />
                  <span className="font-script text-2xl sm:text-3xl text-[#E2B755] drop-shadow-sm">
                    Goodness in Every Bath
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. AMBIENT HUD CONTROLS */}
        <div className="absolute bottom-5 left-5 right-5 sm:left-8 sm:right-8 md:left-12 md:right-12 lg:left-16 lg:right-16 z-20 flex items-center justify-between pointer-events-auto">
          {/* Play/Pause & Mute Audio */}
          <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15 text-white shadow-lg">
            <button
              onClick={toggleVideoPlayback}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label={isPlaying ? 'Pause ambient video' : 'Play ambient video'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>

            <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-wider uppercase text-white/80 pr-1 hidden sm:inline">
              Living Waterfall Ritual
            </span>
          </div>

          {/* Watch Film Button */}
          <button
            onClick={onWatchStory}
            className="flex items-center gap-2 text-xs font-semibold tracking-wide bg-[#FAF8F2]/95 hover:bg-[#FAF8F2] text-[#1E2719] px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C49A38]" />
            <span>View Full Film</span>
          </button>
        </div>
      </div>
    </section>
  );
};
