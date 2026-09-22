import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CartProvider } from './context/CartContext';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BenefitStrip } from './components/BenefitStrip';
import { ProductRange } from './components/ProductRange';
import { EditorialBanner } from './components/EditorialBanner';
import { Ingredients } from './components/Ingredients';
import { HorizontalIngredients } from './components/HorizontalIngredients';
import { MakingProcess } from './components/MakingProcess';
import { StorySection } from './components/StorySection';
import { NatureDivider } from './components/NatureDivider';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickView } from './components/ProductQuickView';
import { VideoModal } from './components/VideoModal';

import { PRODUCTS, Product } from './data/products';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    // Update ScrollTrigger on every Lenis scroll tick
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis RAF with GSAP ticker for frame-perfect alignment
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Clean up on unmount
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleScrollToProducts = () => {
    const el = document.querySelector('#products');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CartProvider>
      {/* Subtle Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Desktop Context Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar onShopClick={handleScrollToProducts} />

      {/* Main Single Page Document */}
      <main className="relative bg-cream">
        <Hero
          onWatchStory={() => setIsVideoModalOpen(true)}
          onExploreClick={handleScrollToProducts}
        />
        <BenefitStrip />
        <ProductRange
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
        <EditorialBanner onShopClick={handleScrollToProducts} />
        <Ingredients />
        <HorizontalIngredients />
        <MakingProcess />
        <StorySection onStoryClick={() => setIsVideoModalOpen(true)} />
        <NatureDivider />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <CartDrawer />
      <ProductQuickView
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/assets/video.mp4"
        posterSrc="/images/video_poster.jpg"
      />
    </CartProvider>
  );
};

export default App;
