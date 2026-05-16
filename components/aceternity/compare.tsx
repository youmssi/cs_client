"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  firstImageAlt?: string;
  secondImageAlt?: string;
  firstLabel?: string;
  secondLabel?: string;
  className?: string;
  initialPosition?: number;
}

export function Compare({
  firstImage,
  secondImage,
  firstImageAlt = "Before",
  secondImageAlt = "After",
  firstLabel = "Before",
  secondLabel = "After",
  className,
  initialPosition = 50,
}: Readonly<CompareProps>) {
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => updatePosition(e.clientX);
    const onTouch = (e: TouchEvent) => updatePosition(e.touches[0].clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-brand-border bg-brand-surface-raised select-none touch-none cursor-ew-resize",
        className,
      )}
      style={{ borderColor: "var(--product-accent, var(--brand-border))" }}
    >
      {firstImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={firstImage}
          alt={firstImageAlt}
          draggable={false}
          className="block w-full h-auto pointer-events-none"
        />
      )}
      <span className="absolute top-3 left-3 z-30 rounded-full bg-brand-ink/80 backdrop-blur px-3 py-1 text-xs font-medium text-white">
        {firstLabel}
      </span>

      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        {secondImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={secondImage}
            alt={secondImageAlt}
            draggable={false}
            className="block w-full h-auto pointer-events-none"
            style={{ width: containerRef.current?.offsetWidth ?? "auto" }}
          />
        )}
        <span className="absolute top-3 left-3 z-30 rounded-full px-3 py-1 text-xs font-medium text-white" style={{ backgroundColor: "var(--product-accent, #50B8D9)" }}>
          {secondLabel}
        </span>
      </div>

      <div
        className="absolute inset-y-0 z-20 w-0.5 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)", backgroundColor: "var(--product-accent, #50B8D9)" }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 h-9 w-9 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: "var(--product-accent, #50B8D9)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
