"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AnimatedTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: AnimatedTab[];
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  activeTabClassName?: string;
  /** Optional aria-label for the tab list (default: "Sections"). */
  ariaLabel?: string;
}

export function AnimatedTabs({
  tabs,
  className,
  tabClassName,
  contentClassName,
  activeTabClassName,
  ariaLabel = "Sections",
}: Readonly<AnimatedTabsProps>) {
  const [active, setActive] = useState<string>(tabs[0]?.id ?? "");
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  if (!tabs.length) return null;

  // ARIA tabs keyboard pattern — Left/Right move and activate
  const handleKeyDown = (e: React.KeyboardEvent, currentIdx: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    let nextIdx = currentIdx;
    if (e.key === "ArrowLeft") nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
    if (e.key === "ArrowRight") nextIdx = (currentIdx + 1) % tabs.length;
    if (e.key === "Home") nextIdx = 0;
    if (e.key === "End") nextIdx = tabs.length - 1;
    const nextId = tabs[nextIdx].id;
    setActive(nextId);
    // Focus the newly-active tab so subsequent keys keep working
    requestAnimationFrame(() => tabRefs.current.get(nextId)?.focus());
  };

  // Scroll the active tab into view on mobile horizontal scroller
  useEffect(() => {
    const el = tabRefs.current.get(active);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }, [active]);

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-scrollbar max-w-full w-full mb-6"
      >
        {tabs.map((tab, idx) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
                else tabRefs.current.delete(tab.id);
              }}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                "relative px-4 py-2 rounded-full font-medium text-sm md:text-base whitespace-nowrap transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface",
                isActive ? "text-brand-ink" : "text-brand-dark/60 hover:text-brand-ink/80",
                tabClassName,
              )}
              style={{ "--tw-ring-color": "var(--product-accent, #50B8D9)" } as React.CSSProperties}
            >
              {isActive && (
                <motion.span
                  layoutId="active-tab-indicator"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
                  className={cn(
                    "absolute inset-0 rounded-full",
                    activeTabClassName,
                  )}
                  style={{
                    backgroundColor: "color-mix(in oklch, var(--product-accent, var(--brand-border)) 20%, transparent)",
                    border: "1px solid color-mix(in oklch, var(--product-accent, var(--brand-border)) 50%, transparent)",
                  }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className={cn("relative w-full", contentClassName)}>
        {tabs.map((tab) =>
          tab.id === active ? (
            <motion.div
              key={tab.id}
              role="tabpanel"
              id={`tabpanel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {tab.content}
            </motion.div>
          ) : null,
        )}
      </div>
    </div>
  );
}
