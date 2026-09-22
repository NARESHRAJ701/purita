import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    const touch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(touch);
    if (touch) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);

      // Check cursor data attribute
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        setCursorText(target.dataset.cursor || '');
        setIsHovered(true);
      } else {
        const isClickable = (e.target as HTMLElement)?.closest('button, a, input, select, textarea');
        setCursorText('');
        setIsHovered(!!isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    const updateCursor = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setPosition({ x: currentX, y: currentY });
      animationFrame = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrame = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  const hasText = !!cursorText;

  return (
    <div
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          hasText
            ? 'w-20 h-20 bg-botanical-dark/90 text-cream backdrop-blur-md scale-100 shadow-lg'
            : isHovered
            ? 'w-10 h-10 bg-botanical-forest/20 border border-botanical-forest/40 backdrop-blur-[2px]'
            : 'w-4 h-4 bg-botanical-dark/60'
        }`}
      >
        {hasText && (
          <span className="text-[10px] tracking-[0.2em] font-medium font-sans uppercase animate-fade-in text-cream">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
