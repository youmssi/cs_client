"use client";

import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
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
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure on mount + observe resize so the overlay <img> stays synced
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
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
      onKeyDown={handleKeyDown}
      role="slider"
      tabIndex={0}
      aria-label="Drag or use arrow keys to compare before and after"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-brand-border bg-brand-surface-raised select-none touch-none cursor-ew-resize",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface",
        className,
      )}
      style={
        {
          borderColor: "var(--product-accent, var(--brand-border))",
          "--tw-ring-color": "var(--product-accent, #50B8D9)",
        } as React.CSSProperties
      }
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
            style={{ width: containerWidth ?? "auto" }}
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
