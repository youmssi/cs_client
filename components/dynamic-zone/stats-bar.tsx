"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "motion/react";
import { CardContainer, CardItem } from "@/components/aceternity/three-d-card";
import type { StatsBarBlock } from "@/types";

interface StatsBarProps extends StatsBarBlock {
  accentColor?: string | null;
}

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState<string>("0");
  const numericMatch = value.match(/-?\d+(?:[.,]\d+)?/);
  const target = numericMatch ? parseFloat(numericMatch[0].replace(",", ".")) : null;

  useEffect(() => {
    if (!inView || target === null) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      const formatted = Number.isInteger(target) ? Math.round(current).toString() : current.toFixed(1);
      setDisplay(value.replace(numericMatch![0], formatted));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, value]);

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
