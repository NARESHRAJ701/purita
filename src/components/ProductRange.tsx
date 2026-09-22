import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Plus, Eye, Star } from 'lucide-react';
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
  const { addToCart } = useCart();

  // Take the primary 3 soaps as highlighted in specs
  const primaryProducts = products.slice(0, 3);

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
      className="py-24 md:py-36 bg-[#F6F3ED] relative overflow-hidden"
    >
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
    </section>
  );
};
