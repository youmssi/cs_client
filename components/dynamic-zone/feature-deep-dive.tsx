"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeader } from "@/components/global/section-header";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { getStrapiMediaUrl } from "@/lib/media.strapi";
import { cn, parseBullets } from "@/lib/utils";
import { DEFAULT_PRODUCT_ACCENT } from "@/lib/constants";
import type { FeatureDeepDiveBlock, FeatureDeepDiveItem } from "@/types";

interface FeatureDeepDiveProps extends FeatureDeepDiveBlock {
  accentColor?: string | null;
}

/**
 * Returns md+ col-span pattern for a 6-column bento grid based on item count.
 * Patterns are designed so each row sums to 6 (a clean rhythm with no orphans).
 * Mobile (< md): everything stacks single-column.
 */
function getBentoPattern(count: number): number[] {
  const patterns: Record<number, number[]> = {
    1: [6],
    2: [3, 3],
    3: [4, 2, 6],
    4: [4, 2, 2, 4],
    5: [4, 2, 2, 2, 2],
    6: [4, 2, 4, 2, 3, 3],
    7: [4, 2, 4, 2, 2, 2, 2],
    8: [4, 2, 4, 2, 2, 2, 2, 2],
  };
  if (patterns[count]) return patterns[count];
  // Fallback for 9+: pair them as 3/3 to keep the grid tidy
  return Array.from({ length: count }, () => 3);
}

const SPAN_CLASSES: Record<number, string> = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  6: "md:col-span-6",
};

export function FeatureDeepDive({
  header_section,
  features,
  accentColor,
}: Readonly<FeatureDeepDiveProps>) {
  const accent = accentColor ?? DEFAULT_PRODUCT_ACCENT;

  // Cards stay text-only and show every feature.
  // The modal cycles through features that actually have an image attached.
  const featuresWithImage = useMemo(
    () => (features ?? []).filter((f) => f.image),
    [features],
  );

  const [modalIdx, setModalIdx] = useState<number | null>(null);

  const openAt = useCallback(
    (feature: FeatureDeepDiveItem) => {
      if (!feature.image) return;
      const idx = featuresWithImage.findIndex((f) => f.id === feature.id);
      if (idx >= 0) setModalIdx(idx);
    },
    [featuresWithImage],
  );

  const close = useCallback(() => setModalIdx(null), []);

  const goPrev = useCallback(() => {
    setModalIdx((cur) => {
      if (cur === null) return cur;
      return cur === 0 ? featuresWithImage.length - 1 : cur - 1;
    });
  }, [featuresWithImage.length]);

  const goNext = useCallback(() => {
    setModalIdx((cur) => {
      if (cur === null) return cur;
      return cur === featuresWithImage.length - 1 ? 0 : cur + 1;
    });
  }, [featuresWithImage.length]);

  // Keyboard navigation in the modal
  useEffect(() => {
    if (modalIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIdx, goPrev, goNext]);

  if (!features || features.length === 0) return null;

  const pattern = getBentoPattern(features.length);

  return (
    <section
      className="w-full border-b border-brand-ink/10 bg-brand-surface"
      style={{ "--product-accent": accent } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <SectionHeader
            header={header_section}
            defaultHeading="Every feature, in depth"
            defaultSubHeading="Pick a card to read the detail — click any card with a preview to view the screenshot."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-fr">
          {features.map((feature, idx) => {
            const span = pattern[idx] ?? 3;
            const spanClass = SPAN_CLASSES[span] ?? "md:col-span-3";
            const hasImage = Boolean(feature.image);
            return (
              <BentoCard
                key={feature.id ?? idx}
                feature={feature}
                index={idx}
                accent={accent}
                hasImage={hasImage}
                onClick={() => openAt(feature)}
                className={spanClass}
              />
            );
          })}
        </div>
      </div>

      <Lightbox
        items={featuresWithImage}
        index={modalIdx}
        accent={accent}
        onClose={close}
        onPrev={goPrev}
        onNext={goNext}
        onSelect={setModalIdx}
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Bento card — text-only, click-to-preview
 * ───────────────────────────────────────────────────────────── */

interface BentoCardProps {
  feature: FeatureDeepDiveItem;
  index: number;
  accent: string;
  hasImage: boolean;
  onClick: () => void;
  className?: string;
}

function BentoCard({
  feature,
  index,
  accent,
  hasImage,
  onClick,
  className,
}: Readonly<BentoCardProps>) {
  const bullets = parseBullets(feature.bullets);

  const indexLabel = String(index + 1).padStart(2, "0");
  const interactive = hasImage;

  // Whole card is a button when it can open a modal; otherwise a passive div
  const Wrapper = interactive ? motion.button : motion.div;

  return (
    <Wrapper
      {...(interactive
        ? {
            type: "button" as const,
            onClick,
            "aria-label": `Voir l'écran : ${feature.title ?? `feature ${indexLabel}`}`,
          }
        : {})}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
      whileHover={interactive ? { y: -2 } : undefined}
      className={cn(
        "group relative flex flex-col text-left h-full min-h-[260px] md:min-h-[300px]",
        "rounded-2xl border bg-brand-surface-raised p-6 md:p-7 overflow-hidden",
        "transition-shadow duration-300",
        interactive &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface hover:shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)]",
        className,
      )}
      style={
        {
          borderColor: "var(--brand-border)",
          "--tw-ring-color": accent,
        } as React.CSSProperties
      }
    >
      {/* Subtle accent gradient that grows on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top right, color-mix(in oklch, ${accent} 14%, transparent), transparent 60%)`,
        }}
      />

      {/* Header row: index + view-screen pill */}
      <div className="relative flex items-center justify-between mb-4 md:mb-5">
        <span
          className="text-xs md:text-sm font-semibold tracking-[0.18em] uppercase tabular-nums"
          style={{ color: accent }}
        >
          {indexLabel}
        </span>
        {interactive && (
          <span
            className={cn(
              "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide",
              "text-brand-text/70 transition-all duration-300",
              "group-hover:gap-2.5 group-hover:text-brand-ink",
            )}
          >
            <span>Voir l&apos;écran</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              style={{ color: accent }}
            />
          </span>
        )}
      </div>

      {/* Title */}
      {feature.title && (
        <h3 className="relative text-xl md:text-2xl lg:text-[1.7rem] font-serif font-normal leading-[1.15] tracking-tight text-brand-ink mb-3 md:mb-4">
          {feature.title}
        </h3>
      )}

      {/* Description */}
      {feature.description && (
        <p className="relative text-sm md:text-[15px] text-brand-dark/80 leading-relaxed mb-4">
          {feature.description}
        </p>
      )}

      {/* Bullets */}
      {bullets.length > 0 && (
        <ul className="relative flex flex-col gap-2 mt-auto">
          {bullets.slice(0, 4).map((bullet, bIdx) => (
            <li
              key={`bullet-${bIdx}`}
              className="flex items-start gap-2.5 text-[13px] md:text-sm text-brand-dark/80 leading-snug"
            >
              <span
                aria-hidden
                className="mt-[7px] h-1 w-1 rounded-full shrink-0"
                style={{ backgroundColor: accent }}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Accent quote — small, italic, only when present */}
      {feature.accent_quote && (
        <p
          className="relative mt-4 italic text-xs md:text-sm text-brand-dark/70 border-l-2 pl-3 leading-snug"
          style={{ borderColor: accent }}
        >
          &ldquo;{feature.accent_quote}&rdquo;
        </p>
      )}
    </Wrapper>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Lightbox modal with prev/next + keyboard nav + indicator dots
 * ───────────────────────────────────────────────────────────── */

interface LightboxProps {
  items: FeatureDeepDiveItem[];
  index: number | null;
  accent: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (idx: number) => void;
}

function Lightbox({
  items,
  index,
  accent,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: Readonly<LightboxProps>) {
  const current = index !== null ? items[index] : null;
  const imageUrl = current?.image
    ? getStrapiMediaUrl(current.image)
    : null;
  const open = current !== null && imageUrl !== null;
  const total = items.length;
  const hasMultiple = total > 1;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton
        className={cn(
          "max-w-[95vw] sm:max-w-[92vw] lg:max-w-[1100px] p-0 overflow-hidden bg-brand-surface border-2 gap-0",
        )}
        style={{
          borderColor: `color-mix(in oklch, ${accent} 45%, var(--brand-border))`,
        }}
      >
        <DialogTitle className="sr-only">
          {current?.title ?? "Feature screenshot"}
        </DialogTitle>

        <div className="flex flex-col">
          {/* Top bar — counter + feature title */}
          <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-3 border-b border-brand-border bg-brand-surface-raised/60">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] tabular-nums" style={{ color: accent }}>
              {index !== null ? `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}` : ""}
            </p>
            <p className="text-xs md:text-sm font-medium text-brand-ink truncate max-w-[60%]">
              {current?.title}
            </p>
          </div>

          {/* Image stage */}
          <div
            className="relative w-full bg-brand-ink/95 flex items-center justify-center"
            style={{ minHeight: "55vh", maxHeight: "72vh" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {imageUrl && index !== null && (
                <motion.div
                  key={current?.id ?? index}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center p-4 md:p-6"
                >
                  <Image
                    src={imageUrl}
                    alt={current?.title ?? "Feature screenshot"}
                    fill
                    sizes="(min-width: 1024px) 1100px, 95vw"
                    className="object-contain"
                    unoptimized
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prev / Next chevrons — only shown when there's more than 1 image */}
            {hasMultiple && (
              <>
                <NavButton side="left" onClick={onPrev} accent={accent} label="Précédent" />
                <NavButton side="right" onClick={onNext} accent={accent} label="Suivant" />
              </>
            )}
          </div>

          {/* Footer — description + dot indicators */}
          {(current?.description || hasMultiple) && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 md:px-7 py-4 md:py-5 border-t border-brand-border bg-brand-surface">
              {current?.description ? (
                <p className="text-sm md:text-[15px] text-brand-dark/85 leading-relaxed max-w-3xl">
                  {current.description}
                </p>
              ) : <span />}

              {hasMultiple && (
                <div className="flex items-center gap-1.5 shrink-0">
                  {items.map((item, dotIdx) => {
                    const active = dotIdx === index;
                    return (
                      <button
                        key={item.id ?? dotIdx}
                        type="button"
                        onClick={() => onSelect(dotIdx)}
                        aria-label={`Aller à l'écran ${dotIdx + 1}`}
                        aria-current={active ? "true" : undefined}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface",
                          active ? "w-7" : "w-1.5 hover:w-3 bg-brand-dark/30 hover:bg-brand-dark/50",
                        )}
                        style={{
                          backgroundColor: active ? accent : undefined,
                          "--tw-ring-color": accent,
                        } as React.CSSProperties}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface NavButtonProps {
  side: "left" | "right";
  onClick: () => void;
  accent: string;
  label: string;
}

function NavButton({ side, onClick, accent, label }: Readonly<NavButtonProps>) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10",
        side === "left" ? "left-3 md:left-5" : "right-3 md:right-5",
        "h-10 w-10 md:h-11 md:w-11 rounded-full",
        "bg-white/10 backdrop-blur-md border border-white/20",
        "flex items-center justify-center text-white",
        "transition-all duration-300 hover:scale-105 hover:bg-white/15",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink",
      )}
      style={{ "--tw-ring-color": accent } as React.CSSProperties}
    >
      <Icon className="h-5 w-5 md:h-6 md:w-6" />
    </button>
  );
}
