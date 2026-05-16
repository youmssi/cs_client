"use client";

import React, { useState } from "react";
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
}

export function AnimatedTabs({
  tabs,
  className,
  tabClassName,
  contentClassName,
  activeTabClassName,
}: Readonly<AnimatedTabsProps>) {
  const [active, setActive] = useState<string>(tabs[0]?.id ?? "");

  if (!tabs.length) return null;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-scrollbar max-w-full w-full mb-6">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative px-4 py-2 rounded-full font-medium text-sm md:text-base whitespace-nowrap transition-colors",
                isActive ? "text-brand-ink" : "text-brand-dark/60 hover:text-brand-ink/80",
                tabClassName,
              )}
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
