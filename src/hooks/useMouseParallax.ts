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
    if (typeof window === 'undefined') return;

    const checkDisabled = () => {
      const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
      return isTouch || window.innerWidth < 1024;
    };

    if (checkDisabled()) return;

    const mouse: MousePosition = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    let animationFrameId: number;
    let isRunning = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (checkDisabled()) return;
      const { innerWidth, innerHeight } = window;
      mouse.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    let lastX = 0;
    let lastY = 0;

    const animate = () => {
      if (!isRunning) return;

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const newX = Math.round(mouse.x * intensity * 100) / 100;
      const newY = Math.round(mouse.y * intensity * 100) / 100;

      if (Math.abs(newX - lastX) > 0.01 || Math.abs(newY - lastY) > 0.01) {
        lastX = newX;
        lastY = newY;
        setOffset({ x: newX, y: newY });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return offset;
}
