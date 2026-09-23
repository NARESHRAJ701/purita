import React, { useEffect, useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-3.5 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="modal product-detail-modal relative w-full border border-subtleBorder/30"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <button
            onClick={onClose}
            className="close-button"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scroll Container: Whole modal content scrolls as ONE document */}
        <div className="modal-content">
          {/* Product Image Section */}
          <div
            className="product-image-section"
            style={{ backgroundColor: product.theme.bg }}
          >
            {/* Purity & Weight Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/85 text-botanical shadow-xs">
                {product.weight} • Grade 1 TFM
              </span>
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="product-image drop-shadow-md"
            />

            <div className="product-tagline">
              <span className="font-script text-xl sm:text-2xl text-botanical/70 leading-none">
                Goodness in Every Bath
              </span>
            </div>
          </div>

          {/* Product Details - Normal Document Flow, Zero Overlap */}
          <div className="product-info space-y-4">
            {/* Product Meta: Category on Left (wraps naturally), Rating on Right */}
            <div className="product-meta">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-botanical-forest leading-relaxed">
                {product.variant}
              </span>
              <div className="flex items-center gap-1 text-xs text-turmeric-gold font-medium shrink-0 pt-0.5">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating}</span>
                <span className="text-charcoal/40">({product.reviewCount})</span>
              </div>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-botanical font-semibold leading-tight">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm font-medium italic text-botanical/80 mt-1">
                "{product.subtitle}"
              </p>
            </div>

            {/* Product Description */}
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Key Botanicals */}
            {product.keyBotanicals.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-botanical mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-turmeric-gold shrink-0" />
                  <span>Key Botanical Extracts</span>
                </h4>
                <div className="space-y-1.5">
                  {product.keyBotanicals.map((botanical, i) => (
                    <div key={i} className="text-xs text-charcoal/80 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-botanical-forest mt-1.5 shrink-0" />
                      <span>
                        <strong className="font-medium text-botanical">{botanical.name}:</strong>{' '}
                        {botanical.benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specs */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-charcoal/60 bg-cream/70 p-3 rounded-xl border border-subtleBorder/20">
              <div>
                <span className="block text-charcoal/40 uppercase tracking-wider text-[9px]">Purity Grade</span>
                <span className="font-medium text-botanical">{product.specifications.tfm}</span>
              </div>
              <div>
                <span className="block text-charcoal/40 uppercase tracking-wider text-[9px]">Botanical Origin</span>
                <span className="font-medium text-botanical">{product.specifications.origin}</span>
              </div>
            </div>

            {/* Pricing & Add to Cart */}
            <div className="pt-4 border-t border-subtleBorder/20 space-y-3.5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-serif font-bold text-botanical">
                    ₹{product.price * quantity}
                  </span>
                  <span className="text-xs text-charcoal/50 ml-2">
                    (₹{product.price} each • taxes incl.)
                  </span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center border border-subtleBorder/30 rounded-full px-3 py-1 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-1 text-charcoal/60 hover:text-charcoal font-bold transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-xs font-semibold px-3 text-botanical">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-1 text-charcoal/60 hover:text-charcoal font-bold transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full btn-botanical py-3.5 text-base justify-center tracking-wide active:scale-[0.99] transition-transform"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Botanical Bag</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-charcoal/50">
                <ShieldCheck className="w-3.5 h-3.5 text-botanical-forest shrink-0" />
                <span>Free delivery on orders over ₹500 • 100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
