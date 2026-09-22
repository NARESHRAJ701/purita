import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Instagram, Facebook, Youtube, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Columns stagger reveal
      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Large botanical leaf enters from bottom-left
      if (leafRef.current) {
        gsap.fromTo(
          leafRef.current,
          { opacity: 0, x: -60, y: 60, rotate: -25 },
          {
            opacity: 0.85,
            x: 0,
            y: 0,
            rotate: 0,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
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

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#F6F3ED] pt-20 pb-12 border-t border-subtleBorder/30 overflow-hidden"
    >
      {/* Botanical Leaf Asset Entering Bottom Left Corner */}
      <div
        ref={leafRef}
        className="absolute -bottom-16 -left-16 pointer-events-none z-0 select-none opacity-80"
      >
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 260 C60 180, 120 120, 260 20 C180 80, 100 160, 20 260 Z"
            fill="#526B36"
            fillOpacity="0.45"
          />
          <path
            d="M35 245 C80 190, 140 140, 245 45 C175 105, 115 175, 35 245 Z"
            fill="#71884D"
            fillOpacity="0.55"
          />
          <path
            d="M20 260 C90 200, 160 130, 250 30"
            stroke="#FAF8F2"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
        </svg>
      </div>

      <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Top Section: Brand Logo & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-16 border-b border-subtleBorder/25">
          {/* Brand Logo & Mission */}
          <div className="footer-col lg:col-span-5 space-y-4">
            <a href="#hero" className="inline-block">
              <img
                src="/images/purita_logo.png"
                alt="PURITA The Real Pure"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </a>
            <p className="text-charcoal/70 text-sm max-w-sm font-light leading-relaxed">
              PURITA is a dedicated Indian botanical personal care house formulating pure refreshing bathing soaps with time-honored herbs and cold-pressed botanical oils.
            </p>
            <div className="flex items-center gap-3 pt-2 text-botanical">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/80 border border-subtleBorder/30 flex items-center justify-center text-botanical hover:bg-botanical hover:text-cream transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/80 border border-subtleBorder/30 flex items-center justify-center text-botanical hover:bg-botanical hover:text-cream transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/80 border border-subtleBorder/30 flex items-center justify-center text-botanical hover:bg-botanical hover:text-cream transition-all duration-300 shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="footer-col lg:col-span-7 flex flex-col justify-center">
            <div className="bg-[#EEE9DE]/80 border border-subtleBorder/30 p-6 sm:p-8 rounded-[28px]">
              <h4 className="font-serif text-2xl text-botanical font-medium">
                Join our journey
              </h4>
              <p className="text-xs sm:text-sm text-charcoal/70 mt-1 font-light max-w-md">
                Receive private batch announcements, Ayurvedic skincare guides, and seasonal botanical harvest stories.
              </p>

              <form onSubmit={handleSubscribe} className="mt-5 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-[#FAF8F2] border border-subtleBorder/40 rounded-full px-5 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-botanical-forest"
                />
                <button
                  type="submit"
                  className="btn-botanical text-sm px-6 py-3 whitespace-nowrap justify-center"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5 btn-arrow" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-subtleBorder/25 text-sm">
          <div className="footer-col space-y-3">
            <h5 className="font-serif text-base text-botanical font-medium">Navigation</h5>
            <ul className="space-y-2 text-charcoal/70 text-xs sm:text-sm font-light">
              <li><a href="#hero" className="hover:text-botanical transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-botanical transition-colors">Products</a></li>
              <li><a href="#ingredients" className="hover:text-botanical transition-colors">Ingredients</a></li>
              <li><a href="#story" className="hover:text-botanical transition-colors">Our Story</a></li>
              <li><a href="#craftsmanship" className="hover:text-botanical transition-colors">Craftsmanship</a></li>
            </ul>
          </div>

          <div className="footer-col space-y-3">
            <h5 className="font-serif text-base text-botanical font-medium">Our Soaps</h5>
            <ul className="space-y-2 text-charcoal/70 text-xs sm:text-sm font-light">
              <li><a href="#products" className="hover:text-botanical transition-colors">Sandalwood Blend</a></li>
              <li><a href="#products" className="hover:text-botanical transition-colors">Turmeric & Saffron</a></li>
              <li><a href="#products" className="hover:text-botanical transition-colors">Aloe Vera & Lime</a></li>
              <li><a href="#products" className="hover:text-botanical transition-colors">Coconut & Cream</a></li>
              <li><a href="#products" className="hover:text-botanical transition-colors">Rose & Almond</a></li>
            </ul>
          </div>

          <div className="footer-col space-y-3">
            <h5 className="font-serif text-base text-botanical font-medium">Support</h5>
            <ul className="space-y-2 text-charcoal/70 text-xs sm:text-sm font-light">
              <li><a href="#support" className="hover:text-botanical transition-colors">Shipping & Returns</a></li>
              <li><a href="#support" className="hover:text-botanical transition-colors">Bath Care Guide</a></li>
              <li><a href="#support" className="hover:text-botanical transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#support" className="hover:text-botanical transition-colors">Track Your Order</a></li>
              <li><a href="#support" className="hover:text-botanical transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col space-y-3">
            <h5 className="font-serif text-base text-botanical font-medium">More</h5>
            <ul className="space-y-2 text-charcoal/70 text-xs sm:text-sm font-light">
              <li><a href="#sustainability" className="hover:text-botanical transition-colors">Sustainability Promise</a></li>
              <li><a href="#farms" className="hover:text-botanical transition-colors">Our Partner Farms</a></li>
              <li><a href="#journal" className="hover:text-botanical transition-colors">The Botanical Journal</a></li>
              <li><a href="#wholesale" className="hover:text-botanical transition-colors">Wholesale & Hospitality</a></li>
              <li><a href="#stores" className="hover:text-botanical transition-colors">Store Locator</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal/60 font-light">
          <div>
            © 2026 PURITA®. All rights reserved. Registered Trademark.
          </div>
          <div className="font-serif italic text-botanical text-sm">
            Close to Nature. Closer to You.
          </div>
        </div>
      </div>
    </footer>
  );
};
