import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Plus, Eye, Star, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

interface ProductRangeProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ProductRange: React.FC<ProductRangeProps> = ({ products, onSelectProduct }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  // Mobile carousel navigation & drag state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // Mouse drag support for smooth swipe/moveable on all viewports
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Take the primary 3 soaps as highlighted in specs
  const primaryProducts = products.slice(0, 3);

  const checkScroll = () => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    const cardWidth = 224; // card width + gap
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveMobileIndex(Math.min(Math.max(index, 0), products.length - 1));
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    const scrollAmount = 230;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToProductIndex = (idx: number) => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    const cardWidth = 224;
    el.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setHasMoved(false);
    setStartX(e.pageX - (mobileCarouselRef.current?.offsetLeft || 0));
    setScrollStart(mobileCarouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !mobileCarouselRef.current) return;
    const x = e.pageX - (mobileCarouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.3;
    if (Math.abs(walk) > 4) {
      setHasMoved(true);
    }
    mobileCarouselRef.current.scrollLeft = scrollStart - walk;
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="bg-[#F6F3ED] relative overflow-hidden"
    >
      {/* ============================================================== */}
      {/* MOBILE BESTSELLERS CAROUSEL (< 768px)                          */}
      {/* ============================================================== */}
      <div className="md:hidden py-10 px-5">
        {/* Mobile Header with Moveable Navigation Buttons */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-serif text-[28px] sm:text-[32px] text-botanical font-normal leading-tight">
              Our Bestsellers
            </h2>
            <p className="text-xs text-charcoal/70 font-light mt-0.5">
              Loved by nature lovers everywhere.
            </p>
          </div>

          {/* Moveable Navigation Controls: Prev / Next Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => scrollCarousel('left')}
              disabled={!canScrollLeft}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                canScrollLeft
                  ? 'bg-white border-black/10 text-botanical hover:bg-stone-100 active:scale-95 shadow-xs'
                  : 'bg-transparent border-black/5 text-charcoal/25 cursor-not-allowed'
              }`}
              aria-label="Previous product"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              disabled={!canScrollRight}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                canScrollRight
                  ? 'bg-white border-black/10 text-botanical hover:bg-stone-100 active:scale-95 shadow-xs'
                  : 'bg-transparent border-black/5 text-charcoal/25 cursor-not-allowed'
              }`}
              aria-label="Next product"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Carousel (Swipeable, Draggable, & Snap) */}
        <div
          ref={mobileCarouselRef}
          onScroll={checkScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-3.5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 -mx-5 px-5 select-none ${
            isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ touchAction: 'pan-x pan-y' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[210px] sm:w-[230px] shrink-0 snap-start rounded-[16px] p-3.5 flex flex-col justify-between border border-black/[0.06] shadow-sm transition-all"
              style={{ backgroundColor: product.theme.bg }}
            >
              {/* Product Image 1:1 */}
              <div
                className="w-full aspect-square rounded-[12px] bg-white/70 flex items-center justify-center p-3 mb-3 cursor-pointer overflow-hidden shadow-xs relative"
                onClick={() => {
                  if (!hasMoved) onSelectProduct(product);
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>

              {/* Info */}
              <div className="space-y-1">
                <h3
                  onClick={() => {
                    if (!hasMoved) onSelectProduct(product);
                  }}
                  className="font-serif text-[15px] sm:text-base text-botanical font-medium leading-snug cursor-pointer line-clamp-1"
                >
                  {product.name}
                </h3>
                <p className="text-[11px] text-charcoal/60 font-light line-clamp-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Price & Cart */}
              <div className="pt-3 mt-2 border-t border-black/[0.06] flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-botanical">
                  ₹{product.price}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 1);
                  }}
                  className="w-8 h-8 rounded-full bg-[#243B26] hover:bg-[#344D33] text-white flex items-center justify-center shadow-sm active:scale-95 transition-all"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Moveable Pagination Dots & Visual Swipe Hint */}
        <div className="flex items-center justify-between pt-2 px-1">
          <span className="text-[11px] text-charcoal/50 font-light">
            ← Swipe to explore →
          </span>

          {/* Interactive Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToProductIndex(idx)}
                aria-label={`Jump to soap ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeMobileIndex === idx
                    ? 'w-5 h-1.5 bg-[#243B26]'
                    : 'w-1.5 h-1.5 bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP 3-CARD EDITORIAL GRID (>= 768px, UNTOUCHED)            */}
      {/* ============================================================== */}
      <div className="hidden md:block py-24 md:py-36">
        <div className="max-w-site mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-botanical-forest/50" />
                <span className="text-xs font-semibold tracking-[0.25em] text-botanical-forest uppercase">
                  Our Range
                </span>
              </div>
              <h2 className="section-heading font-serif text-botanical font-normal">
                Nature's Best,<br />
                <span className="italic font-serif">For Every You.</span>
              </h2>
              <p className="text-charcoal/70 text-base md:text-lg font-light leading-relaxed">
                Three unique blends. One pure promise. Choose the blend your skin deserves, crafted with traditional cold-pressed herbal wisdom.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onSelectProduct(primaryProducts[0])}
                className="btn-botanical text-sm px-6 py-3"
              >
                <span>View All Formulas</span>
                <ArrowUpRight className="w-4 h-4 btn-arrow" />
              </button>
            </div>
          </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {primaryProducts.map((product) => (
            <div
              key={product.id}
              className="product-card group relative rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 border border-black/[0.06] shadow-sm hover:shadow-botanical"
              style={{ backgroundColor: product.theme.bg }}
              data-cursor="VIEW"
            >
              {/* Top Tag & Rating */}
              <div className="flex items-center justify-between z-10">
                <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/70 text-botanical shadow-sm">
                  {product.weight} • TFM 76%
                </span>
                <div className="flex items-center gap-1 text-xs text-turmeric-gold font-medium bg-white/70 px-2.5 py-1 rounded-full shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Product Render Visual */}
              <div
                className="relative py-8 sm:py-10 flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => onSelectProduct(product)}
              >
                {/* Subtle backlight aura */}
                <div className="absolute inset-0 bg-white/40 rounded-full blur-2xl scale-75 group-hover:scale-95 transition-transform duration-700 pointer-events-none" />

                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full max-w-[280px] h-[220px] object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Card Bottom Content */}
              <div className="pt-4 border-t border-black/[0.07] space-y-3 z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-botanical font-medium">
                      {product.name}
                    </h3>
                    <p className="text-xs font-sans text-charcoal/60 mt-0.5">
                      {product.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-xl font-bold text-botanical block">
                      ₹{product.price}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-charcoal/70 leading-relaxed font-light line-clamp-2">
                  {product.description}
                </p>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-botanical hover:text-botanical-forest transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-2.5 rounded-full bg-white/80 hover:bg-white text-botanical transition-all duration-300 shadow-sm hover:scale-110"
                      title="Add to Botanical Bag"
                      aria-label={`Add ${product.name} to bag`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-10 h-10 rounded-full bg-botanical text-cream flex items-center justify-center transition-all duration-300 group-hover:bg-botanical-forest group-hover:scale-105 shadow-sm"
                      aria-label={`Explore ${product.name}`}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};
