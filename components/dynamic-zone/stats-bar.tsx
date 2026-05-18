"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { CardContainer, CardItem } from "@/components/aceternity/three-d-card";
import { DEFAULT_PRODUCT_ACCENT } from "@/lib/constants";
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
  return current.toFixed(1).replace(".", ",");
}

interface AnimatedNumberProps {
  value: string;
  inView: boolean;
  /** Animation delay in seconds (staggers items). */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
}

/**
 * Counts up a parsed number from 0 → target whenever `inView` becomes true,
 * substituting it into the surrounding value template (so "10,000+" animates
 * just the digits while the "+" stays put).
 *
 * Uses framer-motion's `useMotionValue` + `animate()` rather than a manual
 * `requestAnimationFrame` loop. The motion value drives display via
 * `useTransform`, so updates don't trigger React re-renders for every frame
 * — which is what made the previous implementation's count-up invisible:
 * the count happened, but the React scheduler combined with the parent
 * `motion.div` fade left no perceptible window where mid-animation values
 * rendered.
 */
function AnimatedNumber({
  value,
  inView,
  delay = 0,
  duration = 1.4,
}: Readonly<AnimatedNumberProps>) {
  const parsed = useMemo(() => {
    const match = value.match(/-?[\d.,]+/);
    if (!match) return null;
    const target = parseLocalizedNumber(match[0]);
    if (target === null) return null;
    return { token: match[0], target };
  }, [value]);

  const motionValue = useMotionValue(0);

  const display = useTransform(motionValue, (latest) => {
    if (!parsed) return value;
    return value.replace(parsed.token, formatCurrent(parsed.target, latest));
  });

  useEffect(() => {
    if (!inView || !parsed) {
      motionValue.set(0);
      return;
    }
    const controls = animate(motionValue, parsed.target, {
      duration,
      delay,
      // Quint-out — smooth, premium deceleration
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, parsed, duration, delay, motionValue]);

  if (!parsed) return <span>{value}</span>;
  return <motion.span aria-live="polite">{display}</motion.span>;
}

export function StatsBar({ eyebrow, items, accentColor }: Readonly<StatsBarProps>) {
  const ref = useRef<HTMLDivElement>(null);
  // -40px margin (was -80) so the section triggers earlier on fast scroll
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const accent = accentColor ?? DEFAULT_PRODUCT_ACCENT;

  if (!items || items.length === 0) return null;

  // 140ms stagger gives a tight, premium wave without dragging the last
  // item past where the user has already left the section.
  const STAGGER = 0.14;

  return (
    <section
      ref={ref}
      className="w-full border-b border-brand-ink/10 bg-brand-surface"
      style={{ "--product-accent": accent } as React.CSSProperties}
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
                // Card fade ends well before the count-up so users see the
                // count animating inside an already-visible card.
                transition={{ duration: 0.35, delay: idx * STAGGER, ease: "easeOut" }}
                className="w-full"
              >
                <CardItem className="w-full rounded-xl border border-brand-border bg-brand-surface-raised p-6 md:p-7 text-center">
                  <div
                    className="text-4xl md:text-5xl font-serif font-normal leading-none mb-2 tabular-nums"
                    style={{ color: accent }}
                  >
                    <AnimatedNumber
                      value={item.value}
                      inView={inView}
                      // Wait for the card fade to finish before counting up
                      delay={idx * STAGGER + 0.25}
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
