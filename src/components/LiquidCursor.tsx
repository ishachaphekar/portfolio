import React, { useEffect, useRef } from 'react';

// Palette colors: Off-white (#F4F4F4) -> Light Navy (#052A4F) -> Off-white (#F4F4F4)
const OFFWHITE = { r: 244, g: 244, b: 244 };
const NAVY_LIGHT = { r: 5, g: 42, b: 79 };

function interpolateBrandColor(ratio: number): { r: number; g: number; b: number } {
  // Trail gradient: 0.0 -> Off-white, 0.5 -> Light Navy, 1.0 -> Off-white
  if (ratio <= 0.5) {
    const factor = ratio / 0.5;
    return {
      r: Math.round(OFFWHITE.r + (NAVY_LIGHT.r - OFFWHITE.r) * factor),
      g: Math.round(OFFWHITE.g + (NAVY_LIGHT.g - OFFWHITE.g) * factor),
      b: Math.round(OFFWHITE.b + (NAVY_LIGHT.b - OFFWHITE.b) * factor),
    };
  } else {
    const factor = (ratio - 0.5) / 0.5;
    return {
      r: Math.round(NAVY_LIGHT.r + (OFFWHITE.r - NAVY_LIGHT.r) * factor),
      g: Math.round(NAVY_LIGHT.g + (OFFWHITE.g - NAVY_LIGHT.g) * factor),
      b: Math.round(NAVY_LIGHT.b + (OFFWHITE.b - NAVY_LIGHT.b) * factor),
    };
  }
}

interface Point {
  x: number;
  y: number;
}

export const LiquidCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on mobile/touch devices with coarse pointer
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = false;
    let opacity = 0;
    let isExcludedSection = false;

    const mouse = { x: -100, y: -100 };
    const NUM_POINTS = 24;
    const points: Point[] = Array.from({ length: NUM_POINTS }, () => ({
      x: -100,
      y: -100,
    }));

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        points.forEach((p) => {
          if (p.x === -100) {
            p.x = mouse.x;
            p.y = mouse.y;
          }
        });
      }

      // Check if mouse is hovering inside Selected Work section (#work)
      const targetEl = e.target as HTMLElement | null;
      if (targetEl && targetEl.closest('#work')) {
        isExcludedSection = true;
      } else {
        isExcludedSection = false;
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const handleMouseEnter = () => {
      isVisible = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const render = () => {
      // Smooth opacity transition
      const targetOpacity = isVisible && !isExcludedSection ? 1 : 0;
      opacity += (targetOpacity - opacity) * 0.14;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (opacity > 0.005) {
        // Head node lerps to mouse position
        points[0].x += (mouse.x - points[0].x) * 0.45;
        points[0].y += (mouse.y - points[0].y) * 0.45;

        // Subsequent body nodes lerp to preceding node
        for (let i = 1; i < NUM_POINTS; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          curr.x += (prev.x - curr.x) * 0.38;
          curr.y += (prev.y - curr.y) * 0.38;
        }

        ctx.save();
        ctx.globalAlpha = opacity;

        // Render fluid ribbon path with tapering line widths & brand colors
        for (let i = 1; i < NUM_POINTS - 1; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];
          const p2 = points[i + 1];

          const xc = (p1.x + p2.x) / 2;
          const yc = (p1.y + p2.y) / 2;

          const progress = i / (NUM_POINTS - 1);
          const width = Math.max(1.2, (1 - Math.pow(progress, 0.75)) * 9.5);
          const segmentAlpha = Math.max(0, (1 - progress) * 0.65);
          const c = interpolateBrandColor(progress);

          ctx.beginPath();
          ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
          ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${segmentAlpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

        // Small refined lead point at the tip
        const headColor = interpolateBrandColor(0);
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${headColor.r}, ${headColor.g}, ${headColor.b}, 0.75)`;
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
      style={{ top: 0, left: 0 }}
    />
  );
};
