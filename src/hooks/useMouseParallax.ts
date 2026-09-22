import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export function useMouseParallax(intensity: number = 1) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only run on desktop devices with hover capability
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch || window.innerWidth < 1024) return;

    const mouse: MousePosition = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1 based on center of screen
      const { innerWidth, innerHeight } = window;
      mouse.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const animate = () => {
      // Linear interpolation for organic lag
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      setOffset({
        x: mouse.x * intensity,
        y: mouse.y * intensity,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return offset;
}
