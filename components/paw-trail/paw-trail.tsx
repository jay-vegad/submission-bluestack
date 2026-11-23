"use client";

import { useEffect, useRef } from "react";

interface PawParticle {
  x: number;
  y: number;
  angle: number;
  createdAt: number;
  scale: number;
}

export function PawTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Compact sprite for cute small paw prints
    const spriteCanvas = document.createElement("canvas");
    const spriteSize = 32;
    spriteCanvas.width = spriteSize;
    spriteCanvas.height = spriteSize;
    const sCtx = spriteCanvas.getContext("2d");

    if (sCtx) {
      sCtx.fillStyle = "#a24a1a"; // brand terracotta color

      // Draw Main Paw Pad (centered at 16, 19)
      sCtx.beginPath();
      sCtx.ellipse(16, 19, 6.5, 5.2, 0, 0, Math.PI * 2);
      sCtx.fill();

      // 4 Small Toe pads
      const toes = [
        { cx: 9.5, cy: 9.5, rx: 2.3, ry: 3.4, rot: -0.32 },
        { cx: 13.8, cy: 7.0, rx: 2.3, ry: 3.8, rot: -0.1 },
        { cx: 18.2, cy: 7.0, rx: 2.3, ry: 3.8, rot: 0.1 },
        { cx: 22.5, cy: 9.5, rx: 2.3, ry: 3.4, rot: 0.32 },
      ];

      toes.forEach((t) => {
        sCtx.save();
        sCtx.translate(t.cx, t.cy);
        sCtx.rotate(t.rot);
        sCtx.beginPath();
        sCtx.ellipse(0, 0, t.rx, t.ry, 0, 0, Math.PI * 2);
        sCtx.fill();
        sCtx.restore();
      });
    }

    let dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const paws: PawParticle[] = [];
    let lastX = -100;
    let lastY = -100;
    let isLeftPaw = false;
    let animId: number;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      if (lastX === -100 && lastY === -100) {
        lastX = clientX;
        lastY = clientY;
        return;
      }

      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const dist = Math.hypot(dx, dy);

      // Stamping step interval: spaced out to 52px so trail is much lighter and less dense
      if (dist >= 52) {
        // Calculate tangent angle in degrees
        const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        // Alternate stepping side offset (perpendicular to movement direction)
        isLeftPaw = !isLeftPaw;
        const sideOffset = isLeftPaw ? -6 : 6;
        const rad = (angleDeg - 90) * (Math.PI / 180);
        const perpX = -Math.sin(rad) * sideOffset;
        const perpY = Math.cos(rad) * sideOffset;

        paws.push({
          x: clientX + perpX,
          y: clientY + perpY,
          angle: angleDeg,
          createdAt: Date.now(),
          scale: 0.5 + Math.random() * 0.08, // smaller footprints
        });

        lastX = clientX;
        lastY = clientY;

        // Cap array to max 25 paws so trails stay light and clean
        if (paws.length > 25) paws.shift();
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Animation Loop: 750ms quick fade so trail is subtle and short
    const DURATION = 750;

    const render = () => {
      const now = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      for (let i = paws.length - 1; i >= 0; i--) {
        const p = paws[i];
        const elapsed = now - p.createdAt;

        if (elapsed > DURATION) {
          paws.splice(i, 1);
          continue;
        }

        const progress = elapsed / DURATION;
        // Soft subtle opacity fade
        const alpha = Math.max(0, (1 - progress) * 0.32);
        const scale = p.scale * (0.92 + Math.sin(progress * Math.PI) * 0.08);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.scale(scale, scale);
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          spriteCanvas,
          -spriteSize / 2,
          -spriteSize / 2,
          spriteSize,
          spriteSize
        );
        ctx.restore();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    />
  );
}
