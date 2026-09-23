import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onShopClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onShopClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Products', href: '#products' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'Our Story', href: '#story' },
    { label: 'Craftsmanship', href: '#craftsmanship' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-40 h-[68px] sm:h-[72px] bg-[#FAF8F2] border-b border-[#25251F]/8 md:absolute md:top-0 md:h-auto md:bg-gradient-to-b md:from-black/80 md:via-black/40 md:to-transparent md:border-b-0 md:py-6 lg:py-8 transition-colors">
        <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16 h-full flex items-center justify-between">
          {/* Logo Left */}
          <a
            href="#hero"
            className="flex items-center group transition-transform duration-300 hover:opacity-95"
            aria-label="PURITA Homepage"
          >
            <img
              src="/images/purita_logo.png"
              alt="PURITA The Real Pure"
              className="h-7 sm:h-8 md:h-10 w-auto max-w-[115px] sm:max-w-[125px] md:max-w-none object-contain transition-transform duration-300 group-hover:scale-[1.02] md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:brightness-110"
            />
          </a>

          {/* Desktop Center Links */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-[14px] font-sans font-medium text-[#FAF8F2] hover:text-white transition-colors tracking-wide relative py-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#E2B755] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Bag Button */}
            <button
              onClick={openCart}
              className="relative p-2 sm:p-2.5 rounded-full text-[#243B26] md:text-[#FAF8F2] hover:bg-black/5 md:hover:bg-white/15 transition-all duration-300 hover:scale-105"
              aria-label={`Open Bag (${totalItems} items)`}
              data-cursor="CART"
            >
              <ShoppingBag className="w-5 h-5 md:drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#243B26] md:bg-[#E2B755] text-white md:text-[#1E2719] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Shop Now CTA - Hidden on mobile, shown on desktop */}
            <button
              onClick={() => {
                if (onShopClick) onShopClick();
                else handleLinkClick('#products');
              }}
              className="hidden md:inline-flex items-center gap-2 bg-[#FAF8F2] hover:bg-white text-[#1E2719] font-medium text-[13px] px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#243B26] hover:bg-black/5 rounded-full transition-colors"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[120] bg-cream flex flex-col justify-between p-6 sm:p-10 animate-fade-in lg:hidden">
          <div className="flex items-center justify-between">
            <img
              src="/images/purita_logo.png"
              alt="PURITA"
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-black/5 text-botanical hover:bg-black/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="py-12 space-y-6 text-center">
            {navLinks.map((link) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="font-serif text-3xl sm:text-4xl text-botanical hover:text-botanical-forest transition-colors inline-block"
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-subtleBorder/30">
            <button
              onClick={() => {
                handleLinkClick('#products');
              }}
              className="w-full btn-botanical py-4 text-base justify-center"
            >
              <span>Explore All Soaps</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-center font-serif italic text-xs text-botanical/60">
              the real pure — Goodness in Every Bath
            </p>
          </div>
        </div>
      )}
    </>
  );
};
