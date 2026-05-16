"use client";

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface StickyScrollContent {
  title: React.ReactNode;
  description: React.ReactNode;
  visual: React.ReactNode;
}

interface StickyScrollProps {
  content: StickyScrollContent[];
  className?: string;
}

export function StickyScroll({ content, className }: Readonly<StickyScrollProps>) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 30%", "end 70%"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative flex justify-center gap-10 md:gap-20",
        className,
      )}
    >
      <div className="relative flex items-start px-2 md:px-4 w-full md:w-1/2">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={`sticky-card-${index}`} className="my-20 md:my-28">
              <motion.h3
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                className="text-2xl md:text-3xl font-bold text-brand-ink font-serif"
              >
                {item.title}
              </motion.h3>
              <motion.div
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-base md:text-lg text-brand-dark/80 mt-4 max-w-md leading-relaxed"
              >
                {item.description}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={cn(
          "hidden md:block sticky top-24 h-[420px] lg:h-[520px] w-1/2 max-w-[640px] overflow-hidden rounded-2xl shadow-2xl border border-brand-border bg-brand-surface-raised",
        )}
        style={{ borderColor: "var(--product-accent, var(--brand-border))" }}
      >
        {content[activeCard]?.visual}
      </div>
    </motion.div>
  );
}
