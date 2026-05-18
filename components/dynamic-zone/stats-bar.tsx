"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, motion } from "motion/react";
import { CardContainer, CardItem } from "@/components/aceternity/three-d-card";
import type { StatsBarBlock } from "@/types";

interface StatsBarProps extends StatsBarBlock {
  accentColor?: string | null;
}

/**
 * Parse a locale-aware numeric token (e.g. "10,000+", "99.9%", "1.234,5") into a Number.
 * - If both "." and "," are present, the LAST-occurring symbol is the decimal separator.
 * - If only "," is present and appears as 3-digit groupings (e.g. "10,000"), treat as grouping.
 *   Otherwise treat "," as the decimal separator.
 * Returns null if the token cannot be parsed.
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
      normalized = cleaned.replace(/\./g, "").replace(",", ".");
    } else {
      normalized = cleaned.replace(/,/g, "");
    }
  } else if (hasComma) {
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

function formatCurrent(target: number, current: number): string {
  if (Number.isInteger(target)) {
    return Math.round(current).toLocaleString("fr-FR");
  }
  // Preserve the same number of decimals the target has, max 1
  return current.toFixed(1).replace(".", ",");
}

interface AnimatedNumberProps {
  value: string;
  inView: boolean;
  /** Animation delay in ms (used to stagger items). */
  delay?: number;
  /** Total animation duration in ms. */
  duration?: number;
}

function AnimatedNumber({ value, inView, delay = 0, duration = 1600 }: Readonly<AnimatedNumberProps>) {
  const parsed = useMemo(() => {
    const match = value.match(/-?[\d.,]+/);
    if (!match) return null;
    const target = parseLocalizedNumber(match[0]);
    if (target === null) return null;
    return { token: match[0], target };
  }, [value]);

  const isAnimatable = parsed !== null;

  // Initial display:
  //  - if animatable, show the placeholder "0" (formatted) so the count-up
  //    visually starts from zero
  //  - if not animatable, show the raw value
  const initialDisplay = useMemo(() => {
    if (!parsed) return value;
    return value.replace(parsed.token, formatCurrent(parsed.target, 0));
  }, [parsed, value]);

  const [display, setDisplay] = useState<string>(initialDisplay);

  useEffect(() => {
    if (!inView || !parsed) return;
    let raf = 0;
    let cancelled = false;
    const { token, target } = parsed;

    // Stagger start with a timeout so the requestAnimationFrame loop
    // doesn't start before its turn
    const startTimer = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / duration);
        // Quint-out easing — feels premium, slows nicely at the end
        const eased = 1 - Math.pow(1 - t, 5);
        const current = target * eased;
        setDisplay(value.replace(token, formatCurrent(target, current)));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
    };
  }, [inView, parsed, value, delay, duration]);

  if (!isAnimatable) return <span>{value}</span>;
  return <span aria-live="polite">{display}</span>;
}

export function StatsBar({ eyebrow, items, accentColor }: Readonly<StatsBarProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!items || items.length === 0) return null;

  // Stagger between stats — each item starts 180ms after the previous.
  // Gives a sweeping, premium "wave" feel rather than all firing at once.
  const STAGGER_MS = 180;

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
                transition={{ duration: 0.55, delay: idx * (STAGGER_MS / 1000), ease: "easeOut" }}
                className="w-full"
              >
                <CardItem className="w-full rounded-xl border border-brand-border bg-brand-surface-raised p-6 md:p-7 text-center">
                  <div
                    className="text-4xl md:text-5xl font-serif font-normal leading-none mb-2 tabular-nums"
                    style={{ color: accentColor ?? "#50B8D9" }}
                  >
                    <AnimatedNumber
                      value={item.value}
                      inView={inView}
                      delay={idx * STAGGER_MS}
                    />
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
