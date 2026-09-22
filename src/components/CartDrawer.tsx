import React, { useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeFromCart,
    totalItems,
    subtotal,
    freeShippingThreshold,
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeCart();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-500 animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF8F2] h-full shadow-2xl z-10 flex flex-col transform transition-transform duration-500 ease-out border-l border-subtleBorder/30">
        {/* Header */}
        <div className="p-6 border-b border-subtleBorder/20 flex items-center justify-between bg-cream">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-botanical" />
            <h3 className="font-serif text-xl tracking-tight text-botanical font-semibold">
              Your Botanical Bag
            </h3>
            <span className="text-xs bg-botanical-forest/15 text-botanical-forest px-2.5 py-0.5 rounded-full font-medium">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-black/5 text-charcoal/60 hover:text-charcoal transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#EEE9DE] px-6 py-3.5 border-b border-subtleBorder/20">
          <div className="flex items-center justify-between text-xs text-botanical mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-turmeric-gold" />
              {remainingForFree === 0
                ? 'You unlocked Free Botanical Shipping & Gift!'
                : `Add ₹${remainingForFree} more for Free Shipping`}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-botanical-forest transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-subtleBorder/20">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-charcoal/60">
              <ShoppingBag className="w-12 h-12 stroke-[1.2] text-botanical/40 mb-4" />
              <p className="font-serif text-lg text-botanical mb-1">Your bag is empty</p>
              <p className="text-sm max-w-xs text-charcoal/50 mb-6">
                Discover our pure botanical soap formulas to elevate your daily bath ritual.
              </p>
              <button
                onClick={closeCart}
                className="btn-botanical text-sm px-6 py-2.5"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                <div
                  className="w-20 h-20 rounded-2xl p-2 flex items-center justify-center flex-shrink-0 border border-subtleBorder/20"
                  style={{ backgroundColor: item.product.theme.bg }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain drop-shadow-sm"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="font-serif text-base text-botanical font-medium truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-xs text-charcoal/40 hover:text-red-600 transition-colors ml-2"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-charcoal/50 mb-2">{item.product.weight} • Grade 1 TFM</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-subtleBorder/30 rounded-full px-2 py-0.5 bg-white/80">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="p-1 text-charcoal/60 hover:text-charcoal"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-medium px-2 text-botanical">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="p-1 text-charcoal/60 hover:text-charcoal"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-serif text-sm font-semibold text-botanical">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-subtleBorder/20 bg-cream/70 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span className="font-medium text-botanical">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-charcoal/70 text-xs">
                <span>Botanical Shipping</span>
                <span className="text-botanical-forest font-medium">
                  {remainingForFree === 0 ? 'FREE' : '₹50'}
                </span>
              </div>
              <div className="border-t border-subtleBorder/30 pt-2 flex justify-between text-base font-serif font-bold text-botanical">
                <span>Estimated Total</span>
                <span>₹{subtotal + (remainingForFree === 0 ? 0 : 50)}</span>
              </div>
            </div>

            <button
              onClick={() => alert('Checkout demo: PURITA order processing completed! Thank you for choosing pure botanical care.')}
              className="w-full btn-botanical py-3.5 text-base justify-center tracking-wide"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 btn-arrow" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal/50 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-botanical-forest" />
              <span>100% Recyclable Packaging • Safe Payment</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
