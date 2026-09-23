import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Priya S.',
    avatar: '/images/testimonial_avatar.jpg',
    rating: 5,
    quote: 'My skin feels healthier and so much softer. Truly natural and gentle!',
  },
  {
    id: '2',
    name: 'Ananya R.',
    avatar: '/images/testimonial_avatar.jpg',
    rating: 5,
    quote: 'The sandalwood aroma is calming, and it never leaves my skin dry or tight.',
  },
  {
    id: '3',
    name: 'Devika M.',
    avatar: '/images/testimonial_avatar.jpg',
    rating: 5,
    quote: 'Finally a soap with zero harsh chemicals that actually lathers like a dream.',
  },
];

export const Testimonial: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="md:hidden py-10 px-5 bg-[#FAF8F2]">
      <div className="w-full max-w-[430px] mx-auto">
        {/* Title */}
        <h2 className="font-serif text-[22px] sm:text-2xl text-[#1A3323] font-normal mb-3.5 tracking-tight">
          Loved by Our Community
        </h2>

        {/* Compact Single Testimonial Card */}
        <div className="bg-white rounded-[18px] p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-stone-200/60 relative">
          <div className="flex items-start gap-3.5">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-[#1A3323]/10 shadow-inner">
              <img
                src={current.avatar}
                alt={current.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Testimonial Content */}
            <div className="flex-1 min-w-0 pr-6">
              {/* Star Rating */}
              <div className="flex items-center gap-0.5 text-[#E0A238] mb-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#E0A238] text-[#E0A238]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#243B26] text-xs sm:text-[13px] font-light leading-relaxed italic">
                "{current.quote}"
              </p>

              {/* Author */}
              <p className="text-[11px] text-[#6A786E] font-medium mt-1">
                – {current.name}
              </p>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="absolute bottom-3.5 right-4 flex items-center gap-1.5">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? 'w-2 h-2 bg-[#1A3323]'
                    : 'w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
