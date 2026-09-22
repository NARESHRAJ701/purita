import React from 'react';

export const NatureDivider: React.FC = () => {
  return (
    <div className="relative h-[340px] md:h-[400px] w-full bg-[#F6F3ED] overflow-hidden flex items-center justify-center border-y border-subtleBorder/20">
      {/* Moving Dappled Botanical Leaf Shadows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg
          className="w-full h-full object-cover animate-pulse duration-[6000ms]"
          viewBox="0 0 1440 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50 100 C150 50, 300 180, 500 80 C700 -20, 900 120, 1100 40 C1300 -40, 1400 150, 1550 90 L1550 450 L-50 450 Z"
            fill="#526B36"
            className="blur-3xl"
          />
          <path
            d="M200 350 C400 200, 600 380, 800 250 C1000 120, 1200 300, 1400 220 L1500 400 L100 400 Z"
            fill="#71884D"
            className="blur-2xl opacity-40"
          />
        </svg>
      </div>

      {/* Gentle Caustic Sunlight Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-white/60 via-transparent to-transparent pointer-events-none" />

      {/* Central Quiet Text Accent */}
      <div className="relative z-10 text-center px-4 select-none">
        <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-botanical-forest/80 font-semibold block mb-2">
          A Moment of Stillness
        </span>
        <h3 className="font-script text-6xl sm:text-7xl md:text-8xl text-botanical/85 font-normal tracking-wide drop-shadow-sm">
          Back to Nature
        </h3>
        <p className="font-serif italic text-charcoal/50 text-sm md:text-base mt-2">
          Pure botanicals. Calm rituals. Real care.
        </p>
      </div>
    </div>
  );
};
