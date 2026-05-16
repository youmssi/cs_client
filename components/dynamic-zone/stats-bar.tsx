"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "motion/react";
import { CardContainer, CardItem } from "@/components/aceternity/three-d-card";
import type { StatsBarBlock } from "@/types";

interface StatsBarProps extends StatsBarBlock {
  accentColor?: string | null;
}

/**
 * Parse a locale-aware numeric token (e.g. "10,000+", "99.9%", "1.234,5") into a Number.
 * - If both "." and "," are present, the LAST-occurring symbol is the decimal separator.
 * - If only "," is present and it appears as 3-digit groupings (e.g. "10,000"), treat as grouping.
 *   Otherwise treat "," as the decimal separator.
 * - Returns null if the token cannot be parsed.
 */
function parseLocalizedNumber(token: string): number | null {
  const cleaned = token.replace(/[^0-9.,\-]/g, "");
  if (!cleaned) return null;

  const hasDot = cleaned.includes(".");
  const hasComma = cleaned.includes(",");
  let normalized = cleaned;

  if (hasDot && hasComma) {
    const lastDot = cleaned.lastIndexOf(".");
    const lastComma = cleaned.lastIndexOf(",");
    if (lastComma > lastDot) {
      // "," is decimal, "." is grouping
      normalized = cleaned.replace(/\./g, "").replace(",", ".");
    } else {
      // "." is decimal, "," is grouping
      normalized = cleaned.replace(/,/g, "");
    }
  } else if (hasComma) {
    // Only comma — heuristic: pure 3-digit groupings (e.g. "10,000", "1,234,567") = grouping
    const groupingPattern = /^-?\d{1,3}(,\d{3})+$/;
    if (groupingPattern.test(cleaned)) {
      normalized = cleaned.replace(/,/g, "");
    } else {
      normalized = cleaned.replace(",", ".");
    }
  }

  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const numericMatch = value.match(/-?[\d.,]+/);
  const target = numericMatch ? parseLocalizedNumber(numericMatch[0]) : null;
  const isAnimatable = inView && target !== null && numericMatch !== null;

  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    if (!isAnimatable) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = (target as number) * eased;
      const formatted = Number.isInteger(target)
        ? Math.round(current).toString()
        : current.toFixed(1);
      setDisplay(value.replace(numericMatch![0], formatted));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isAnimatable, target, value, numericMatch]);

  // No animation case: render raw value directly — no state update needed
  if (!isAnimatable) return <span>{value}</span>;
  return <span>{display}</span>;
}

export function StatsBar({ eyebrow, items, accentColor }: Readonly<StatsBarProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (!items || items.length === 0) return null;

  return (
    <section
      ref={ref}
      className="w-full border-b border-brand-ink/10 bg-brand-surface"
      style={{ "--product-accent": accentColor ?? "#50B8D9" } as React.CSSProperties}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        {eyebrow && (
          <p className="text-center text-sm md:text-base font-medium tracking-wide uppercase text-brand-text mb-8">
            {eyebrow}
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <CardContainer key={item.id} containerClassName="py-0">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                className="w-full"
              >
                <CardItem className="w-full rounded-xl border border-brand-border bg-brand-surface-raised p-6 md:p-7 text-center">
                  <div
                    className="text-4xl md:text-5xl font-serif font-normal leading-none mb-2"
                    style={{ color: accentColor ?? "#50B8D9" }}
                  >
                    <AnimatedNumber value={item.value} inView={inView} />
                  </div>
                  {item.unit && (
                    <div className="text-xs md:text-sm font-medium text-brand-text uppercase tracking-wide mb-1">
                      {item.unit}
                    </div>
                  )}
                  {item.label && (
                    <div className="text-sm md:text-base text-brand-dark/80 leading-relaxed">
                      {item.label}
                    </div>
                  )}
                </CardItem>
              </motion.div>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
