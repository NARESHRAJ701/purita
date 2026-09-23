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
      <header className="relative w-full z-40 h-[68px] sm:h-[72px] md:h-[76px] lg:h-[80px] bg-[#FAF8F2] border-b border-[rgba(36,59,38,0.10)] transition-colors">
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
              className="h-7 sm:h-8 md:h-9 w-auto max-w-[115px] sm:max-w-[125px] md:max-w-none object-contain transition-transform duration-300 group-hover:scale-[1.02]"
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
                className="text-[14px] font-sans font-medium text-black hover:text-[#243B26] transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
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
              className="relative p-2 sm:p-2.5 rounded-full text-black hover:bg-black/5 transition-all duration-300 hover:scale-105"
              aria-label={`Open Bag (${totalItems} items)`}
              data-cursor="CART"
            >
              <ShoppingBag className="w-5 h-5 text-black" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in shadow-sm">
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
              className="hidden md:inline-flex items-center gap-2 bg-black hover:bg-stone-800 text-white font-medium text-[13px] px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-black hover:bg-black/5 rounded-full transition-colors"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[120] bg-[#FAF8F2] flex flex-col justify-between p-6 sm:p-10 animate-fade-in lg:hidden">
          <div className="flex items-center justify-between">
            <img
              src="/images/purita_logo.png"
              alt="PURITA"
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-black/5 text-black hover:bg-black/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-black" />
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
                  className="font-serif text-3xl sm:text-4xl text-black hover:text-stone-700 transition-colors inline-block"
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-black/10">
            <button
              onClick={() => {
                handleLinkClick('#products');
              }}
              className="w-full bg-black hover:bg-stone-800 text-white font-medium py-3.5 rounded-full text-base flex items-center justify-center gap-2 transition-colors"
            >
              <span>Explore All Soaps</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-center font-serif italic text-xs text-black/60">
              the real pure — Goodness in Every Bath
            </p>
          </div>
        </div>
      )}
    </>
  );
};
