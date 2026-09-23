import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Instagram, Facebook, Linkedin, Check, Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onExploreClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onExploreClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const footerRef = useRef<HTMLElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const handVisualRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (section: string) => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // CTA Text entrance (desktop)
      if (ctaContentRef.current) {
        gsap.fromTo(
          ctaContentRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Hand visual entrance (desktop)
      if (handVisualRef.current) {
        gsap.fromTo(
          handVisualRef.current,
          { opacity: 0, x: 25 },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.querySelector('#products');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="footer relative bg-[#F5F1E7] text-[#243B26] overflow-hidden"
    >
      {/* ============================================================== */}
      {/* BOTANICAL DECORATION (Underneath content layer, z-0)            */}
      {/* ============================================================== */}
      <div className="footer-botanicals absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left Botanical Cluster - strictly framing corner */}
        <img
          src="/images/footer_leaf_left.png"
          alt=""
          aria-hidden="true"
          className="left-botanicals absolute -left-5 bottom-0 w-[120px] sm:w-[150px] md:w-[260px] lg:w-[280px] max-w-[20vw] h-auto object-contain opacity-70 md:opacity-95 pointer-events-none select-none"
        />

        {/* Right Botanical Cluster - strictly framing corner */}
        <img
          src="/images/footer_leaf_right.png"
          alt=""
          aria-hidden="true"
          className="right-botanicals absolute -right-5 bottom-0 w-[120px] sm:w-[150px] md:w-[260px] lg:w-[280px] max-w-[20vw] h-auto object-contain opacity-70 md:opacity-95 pointer-events-none select-none"
        />
      </div>

      {/* ============================================================== */}
      {/* MOBILE FINAL CTA (<= 767px)                                     */}
      {/* ============================================================== */}
      <section className="md:hidden relative z-10 pt-10 pb-4 px-5">
        <div className="w-full max-w-[430px] mx-auto">
          {/* 1. TEXT FIRST */}
          <div className="mb-4">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#62645B] uppercase block mb-1.5 font-sans">
              PURE CARE. FROM NATURE.
            </span>
            <h2 className="font-serif text-[26px] sm:text-[28px] leading-[1.1] text-[#243B26] font-normal tracking-[-0.015em] mb-2.5">
              Formulated from what the earth takes care of.
            </h2>
            <p className="text-[#62645B] text-xs sm:text-[13px] font-light leading-relaxed mb-4 max-w-[300px]">
              Thoughtfully crafted with nature-inspired ingredients for a cleaner, calmer everyday ritual.
            </p>
            <button
              onClick={handleExplore}
              className="inline-flex items-center gap-2 bg-[#243B26] text-[#FAF8F2] px-5 py-2.5 rounded-full font-medium text-xs active:scale-95 transition-transform shadow-sm"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. BOTANICAL HAND + SOAP VISUAL (Below / Right) */}
          <div className="relative w-full flex justify-end items-center pr-1 mt-2 select-none pointer-events-none">
            {/* Delicate Script Accent */}
            <div className="absolute -top-3 right-4 z-20 pointer-events-none select-none">
              <span className="font-script text-2xl sm:text-3xl text-[#243B26]/80 drop-shadow-sm">
                Back to Nature
              </span>
            </div>
            <img
              src="/images/footer_hand_soap.png"
              alt="PURITA Botanical Soap held in hand surrounded by fresh foliage"
              loading="lazy"
              className="w-[300px] sm:w-[330px] max-w-[92%] h-auto object-contain drop-shadow-[0_12px_24px_rgba(36,59,38,0.10)]"
            />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* DESKTOP FINAL CTA (>= 768px)                                    */}
      {/* ============================================================== */}
      <section className="hidden md:flex relative z-10 min-h-[480px] lg:min-h-[500px] xl:min-h-[520px] items-center py-12 md:py-16 lg:py-0 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-[50px] relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
            {/* LEFT / CENTER TEXT AREA (Approx 65% width) */}
            <div
              ref={ctaContentRef}
              className="w-full lg:w-[65%] xl:w-[64%] lg:pl-5 text-left flex flex-col items-start z-20"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-[1.5px] bg-[#243B26]/30" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#243B26] uppercase font-sans">
                  Pure Care. From Nature.
                </span>
              </div>

              {/* Large Serif Headline */}
              <h2 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] lg:text-[58px] xl:text-[66px] leading-[1.02] text-[#243B26] font-normal tracking-[-0.025em] max-w-[850px] mb-6">
                Formulated from what the earth takes care of.
              </h2>

              {/* Supporting Text */}
              <p className="text-[#62645B] text-base sm:text-lg md:text-[17px] font-light leading-relaxed max-w-[620px] mb-9">
                Thoughtfully crafted with nature-inspired ingredients for a cleaner, calmer everyday ritual.
              </p>

              {/* CTA Button */}
              <div>
                <button
                  onClick={handleExplore}
                  className="inline-flex items-center gap-2.5 bg-[#243B26] hover:bg-[#344D33] text-[#FAF8F2] px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
                  data-cursor="EXPLORE"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* RIGHT VISUAL AREA (Approx 35% width) */}
            <div
              ref={handVisualRef}
              className="w-full sm:w-[80%] md:w-[65%] lg:w-[35%] xl:w-[36%] lg:pr-5 flex items-center justify-end relative select-none pointer-events-none z-10"
            >
              <div className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px]">
                {/* Delicate Script Accent */}
                <div className="absolute -top-4 right-4 sm:right-8 z-20 pointer-events-none select-none">
                  <span className="font-script text-3xl sm:text-4xl lg:text-4xl xl:text-5xl text-[#243B26]/80 drop-shadow-sm">
                    Back to Nature
                  </span>
                </div>

                {/* Hand + Soap Image */}
                <img
                  src="/images/footer_hand_soap.png"
                  alt="PURITA Botanical Soap held in hand surrounded by fresh foliage"
                  loading="lazy"
                  className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(36,59,38,0.10)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* MOBILE FOOTER (<= 767px)                                       */}
      {/* ============================================================== */}
      <section className="md:hidden relative z-10 border-t border-[rgba(36,59,38,0.12)] pt-8 pb-6 px-5">
        <div className="w-full max-w-[430px] mx-auto space-y-6">
          {/* Brand Info */}
          <div>
            <a href="#hero" className="inline-block mb-1.5" aria-label="PURITA Homepage">
              <img
                src="/images/purita_logo.png"
                alt="PURITA"
                className="h-7 w-auto object-contain"
              />
            </a>
            <p className="text-xs text-[#62645B] font-serif italic">
              Pure care, rooted in nature.
            </p>
          </div>

          {/* Accordion Navigation: SHOP, ABOUT, HELP */}
          <div className="border-t border-b border-[rgba(36,59,38,0.12)] divide-y divide-[rgba(36,59,38,0.08)]">
            {/* SHOP Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('shop')}
                className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#243B26]"
              >
                <span>Shop</span>
                {openAccordion === 'shop' ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'shop' && (
                <ul className="pb-3.5 space-y-2 text-xs text-[#62645B] font-light pl-2">
                  <li><a href="#products" className="hover:text-[#243B26]">All Products</a></li>
                  <li><a href="#products" className="hover:text-[#243B26]">Bath & Body</a></li>
                  <li><a href="#products" className="hover:text-[#243B26]">Collections</a></li>
                  <li><a href="#products" className="hover:text-[#243B26]">Best Sellers</a></li>
                </ul>
              )}
            </div>

            {/* ABOUT Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('about')}
                className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#243B26]"
              >
                <span>About</span>
                {openAccordion === 'about' ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'about' && (
                <ul className="pb-3.5 space-y-2 text-xs text-[#62645B] font-light pl-2">
                  <li><a href="#story" className="hover:text-[#243B26]">Our Story</a></li>
                  <li><a href="#botanical-gallery" className="hover:text-[#243B26]">Ingredients</a></li>
                  <li><a href="#craftsmanship" className="hover:text-[#243B26]">Sustainability</a></li>
                  <li><a href="#hero" className="hover:text-[#243B26]">Contact</a></li>
                </ul>
              )}
            </div>

            {/* HELP Accordion */}
            <div>
              <button
                onClick={() => toggleAccordion('help')}
                className="w-full py-3.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#243B26]"
              >
                <span>Help</span>
                {openAccordion === 'help' ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>
              {openAccordion === 'help' && (
                <ul className="pb-3.5 space-y-2 text-xs text-[#62645B] font-light pl-2">
                  <li><a href="#hero" className="hover:text-[#243B26]">FAQ</a></li>
                  <li><a href="#hero" className="hover:text-[#243B26]">Shipping</a></li>
                  <li><a href="#hero" className="hover:text-[#243B26]">Returns</a></li>
                  <li><a href="#hero" className="hover:text-[#243B26]">Privacy Policy</a></li>
                </ul>
              )}
            </div>
          </div>

          {/* STAY CONNECTED */}
          <div className="space-y-2.5">
            <span className="font-semibold uppercase tracking-wider text-[#243B26] text-[11px] block">
              Stay Connected
            </span>
            <p className="text-xs text-[#62645B] font-light leading-relaxed">
              Receive private batch announcements and seasonal botanical stories.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-1 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 min-w-0 bg-white/90 border border-[rgba(36,59,38,0.18)] rounded-full px-3.5 py-2 text-xs text-[#243B26] placeholder:text-[#8A8A7D] focus:outline-none focus:border-[#243B26] transition-colors"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#243B26] text-[#FAF8F2] px-4 py-2 rounded-full text-xs font-medium active:scale-95 transition-transform"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1 text-emerald-300">
                    <Check className="w-3 h-3" />
                    Joined
                  </span>
                ) : (
                  'Join'
                )}
              </button>
            </form>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-[#243B26] pt-1">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Legal Bar */}
          <div className="pt-2 border-t border-[rgba(36,59,38,0.08)] text-[11px] text-[#8A8A7D] font-light">
            © 2026 PURITA. All rights reserved.
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* DESKTOP FOOTER (>= 768px)                                      */}
      {/* ============================================================== */}
      <div className="hidden md:block">
        <section className="relative z-10 border-t border-[rgba(36,59,38,0.12)] py-14 md:py-[70px]">
          <div className="max-w-[1240px] mx-auto px-6 sm:px-8 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-6 items-start">
              {/* COLUMN 1 — BRAND */}
              <div className="sm:col-span-2 md:col-span-3 space-y-3">
                <a
                  href="#hero"
                  className="inline-block transition-transform duration-300 hover:scale-[1.02]"
                  aria-label="PURITA Homepage"
                >
                  <img
                    src="/images/purita_logo.png"
                    alt="PURITA"
                    className="h-8 sm:h-9 w-auto object-contain"
                  />
                </a>
                <p className="text-xs sm:text-[13px] text-[#62645B] font-serif italic">
                  Pure care, rooted in nature.
                </p>
              </div>

              {/* COLUMN 2 — SHOP */}
              <div className="md:col-span-2 space-y-3">
                <span className="font-semibold uppercase tracking-wider text-[#243B26] text-[11px] block">
                  Shop
                </span>
                <ul className="space-y-2 text-xs sm:text-[13px] text-[#62645B] font-light">
                  <li>
                    <a href="#products" className="hover:text-[#243B26] transition-colors">
                      All Products
                    </a>
                  </li>
                  <li>
                    <a href="#products" className="hover:text-[#243B26] transition-colors">
                      Bath & Body
                    </a>
                  </li>
                  <li>
                    <a href="#products" className="hover:text-[#243B26] transition-colors">
                      Collections
                    </a>
                  </li>
                  <li>
                    <a href="#products" className="hover:text-[#243B26] transition-colors">
                      Best Sellers
                    </a>
                  </li>
                </ul>
              </div>

              {/* COLUMN 3 — ABOUT */}
              <div className="md:col-span-2 space-y-3">
                <span className="font-semibold uppercase tracking-wider text-[#243B26] text-[11px] block">
                  About
                </span>
                <ul className="space-y-2 text-xs sm:text-[13px] text-[#62645B] font-light">
                  <li>
                    <a href="#story" className="hover:text-[#243B26] transition-colors">
                      Our Story
                    </a>
                  </li>
                  <li>
                    <a href="#botanical-gallery" className="hover:text-[#243B26] transition-colors">
                      Ingredients
                    </a>
                  </li>
                  <li>
                    <a href="#craftsmanship" className="hover:text-[#243B26] transition-colors">
                      Sustainability
                    </a>
                  </li>
                  <li>
                    <a href="#hero" className="hover:text-[#243B26] transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* COLUMN 4 — HELP */}
              <div className="md:col-span-2 space-y-3">
                <span className="font-semibold uppercase tracking-wider text-[#243B26] text-[11px] block">
                  Help
                </span>
                <ul className="space-y-2 text-xs sm:text-[13px] text-[#62645B] font-light">
                  <li>
                    <a href="#hero" className="hover:text-[#243B26] transition-colors">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#hero" className="hover:text-[#243B26] transition-colors">
                      Shipping
                    </a>
                  </li>
                  <li>
                    <a href="#hero" className="hover:text-[#243B26] transition-colors">
                      Returns
                    </a>
                  </li>
                  <li>
                    <a href="#hero" className="hover:text-[#243B26] transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* COLUMN 5 — STAY CONNECTED */}
              <div className="sm:col-span-2 md:col-span-3 space-y-3">
                <span className="font-semibold uppercase tracking-wider text-[#243B26] text-[11px] block">
                  Stay Connected
                </span>
                <p className="text-xs text-[#62645B] font-light leading-relaxed">
                  Receive private batch announcements and seasonal botanical stories.
                </p>

                <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-1 w-full max-w-[280px]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 min-w-0 bg-white/80 border border-[rgba(36,59,38,0.18)] rounded-full px-3.5 py-2 text-xs text-[#243B26] placeholder:text-[#8A8A7D] focus:outline-none focus:border-[#243B26] transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-[#243B26] hover:bg-[#344D33] text-[#FAF8F2] px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                  >
                    {subscribed ? (
                      <span className="flex items-center gap-1 text-emerald-300">
                        <Check className="w-3 h-3" />
                        Joined
                      </span>
                    ) : (
                      'Join'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ZONE 3 — LEGAL BAR */}
        <section className="relative z-10 border-t border-[rgba(36,59,38,0.12)] py-6">
          <div className="max-w-[1240px] mx-auto px-6 sm:px-8 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8A7D] font-light">
            <div>
              © 2026 PURITA. All rights reserved.
            </div>

            <div className="flex items-center gap-6 text-[#62645B]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#243B26] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#243B26] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[#243B26] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};
