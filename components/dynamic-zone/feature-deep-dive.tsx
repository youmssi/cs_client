"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedTabs } from "@/components/aceternity/animated-tabs";
import { SectionHeader } from "@/components/global/section-header";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { getStrapiMediaUrl } from "@/lib/media.strapi";
import { cn } from "@/lib/utils";
import type { FeatureDeepDiveBlock, FeatureDeepDiveItem } from "@/types";

interface FeatureDeepDiveProps extends FeatureDeepDiveBlock {
  accentColor?: string | null;
}

export function FeatureDeepDive({ header_section, features, accentColor }: Readonly<FeatureDeepDiveProps>) {
  const [zoomedFeature, setZoomedFeature] = useState<FeatureDeepDiveItem | null>(null);

  if (!features || features.length === 0) return null;

  const accent = accentColor ?? "#50B8D9";

  const tabItems = features.map((feature, idx) => ({
    id: String(feature.id ?? idx),
    label: feature.title ?? `Feature ${idx + 1}`,
    content: (
      <FeatureContent
        feature={feature}
        accent={accent}
        onExpand={() => setZoomedFeature(feature)}
      />
    ),
  }));

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
            defaultSubHeading="Pick a feature to explore what it actually does."
          />
        </div>

        <AnimatedTabs tabs={tabItems} />
      </div>

      <ImageZoomModal
        feature={zoomedFeature}
        accent={accent}
        onClose={() => setZoomedFeature(null)}
      />
    </section>
  );
}

interface FeatureContentProps {
  feature: FeatureDeepDiveItem;
  accent: string;
  onExpand: () => void;
}

function FeatureContent({ feature, accent, onExpand }: Readonly<FeatureContentProps>) {
  const imageUrl = feature.image
    ? getStrapiMediaUrl(feature.image as unknown as Record<string, unknown>)
    : null;
  const bullets = feature.bullets
    ? feature.bullets.split("\n").map((b) => b.trim()).filter(Boolean)
    : [];

  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
      {/* Image side — portrait-leaning frame, click to expand */}
      <div className="order-1 md:order-1">
        {imageUrl ? (
          <button
            type="button"
            onClick={onExpand}
            aria-label={`Voir ${feature.title ?? "le visuel"} en plein écran`}
            className={cn(
              "group relative block w-full overflow-hidden rounded-2xl border shadow-2xl",
              "aspect-[4/5] md:aspect-[4/5] bg-brand-surface-raised",
              "transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-0.5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface",
            )}
            style={{
              borderColor: `color-mix(in oklch, ${accent} 32%, var(--brand-border))`,
              "--tw-ring-color": accent,
            } as React.CSSProperties}
          >
            <Image
              src={imageUrl}
              alt={feature.title ?? "Feature visual"}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* Hover overlay with expand hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div
              className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md text-white text-xs font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              style={{ backgroundColor: `${accent}E6` }}
            >
              <Expand className="h-3.5 w-3.5" />
              <span>Voir en plein écran</span>
            </div>
          </button>
        ) : (
          <div className="w-full aspect-[4/5] rounded-2xl bg-gradient-to-br from-brand-surface-raised to-brand-surface border border-brand-border" />
        )}
      </div>

      {/* Content side */}
      <div className="order-2 md:order-2 flex flex-col gap-5">
        {feature.title && (
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-normal leading-tight text-brand-ink">
            {feature.title}
          </h3>
        )}
        {feature.description && (
          <p className="text-base md:text-lg text-brand-dark/80 leading-relaxed">
            {feature.description}
          </p>
        )}
        {bullets.length > 0 && (
          <ul className="flex flex-col gap-3 mt-1">
            {bullets.map((bullet, idx) => (
              <li key={`bullet-${idx}`} className="flex items-start gap-3">
                <svg
                  className="mt-1 shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm md:text-base text-brand-dark/85 leading-relaxed">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        )}
        {feature.accent_quote && (
          <blockquote
            className="mt-2 italic border-l-2 pl-5 py-2 text-base md:text-lg text-brand-dark/75 leading-relaxed"
            style={{ borderColor: accent }}
          >
            &ldquo;{feature.accent_quote}&rdquo;
          </blockquote>
        )}
      </div>
    </div>
  );
}

interface ImageZoomModalProps {
  feature: FeatureDeepDiveItem | null;
  accent: string;
  onClose: () => void;
}

function ImageZoomModal({ feature, accent, onClose }: Readonly<ImageZoomModalProps>) {
  const imageUrl = feature?.image
    ? getStrapiMediaUrl(feature.image as unknown as Record<string, unknown>)
    : null;

  const open = Boolean(feature && imageUrl);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton
        className={cn(
          "max-w-[95vw] sm:max-w-[90vw] lg:max-w-[1100px] p-0 overflow-hidden bg-brand-surface border-2",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
        )}
        style={{
          borderColor: `color-mix(in oklch, ${accent} 45%, var(--brand-border))`,
        }}
      >
        <DialogTitle className="sr-only">
          {feature?.title ?? "Feature visual"}
        </DialogTitle>
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Natural aspect ratio preserved via object-contain — no cropping in modal */}
            <div className="relative w-full bg-brand-ink/95 flex items-center justify-center" style={{ minHeight: "55vh", maxHeight: "78vh" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={feature?.title ?? "Feature visual"}
                className="block max-w-full max-h-[78vh] object-contain"
              />
            </div>
            {(feature?.title || feature?.description) && (
              <div className="px-6 py-5 md:px-8 md:py-6 border-t border-brand-border bg-brand-surface">
                {feature?.title && (
                  <p
                    className="text-sm font-semibold uppercase tracking-wide mb-1"
                    style={{ color: accent }}
                  >
                    {feature.title}
                  </p>
                )}
                {feature?.description && (
                  <p className="text-sm md:text-base text-brand-dark/80 leading-relaxed max-w-3xl">
                    {feature.description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}

