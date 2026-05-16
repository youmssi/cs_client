"use client";

import Image from "next/image";
import { AnimatedTabs } from "@/components/aceternity/animated-tabs";
import { SectionHeader } from "@/components/global/section-header";
import { getStrapiMediaUrl } from "@/lib/media.strapi";
import type { ScreenshotsGalleryBlock } from "@/types";

interface ScreenshotsGalleryProps extends ScreenshotsGalleryBlock {
  accentColor?: string | null;
}

export function ScreenshotsGallery({ header_section, tabs, accentColor }: Readonly<ScreenshotsGalleryProps>) {
  if (!tabs || tabs.length === 0) return null;

  const tabItems = tabs.map((tab) => {
    const imageUrl = tab.screenshot ? getStrapiMediaUrl(tab.screenshot as unknown as Record<string, unknown>) : null;
    return {
      id: String(tab.id),
      label: tab.tab_label,
      content: (
        <div className="flex flex-col gap-4">
          <div
            className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border bg-brand-surface-raised shadow-2xl"
            style={{ borderColor: `color-mix(in oklch, ${accentColor ?? "#50B8D9"} 35%, var(--brand-border))` }}
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={tab.tab_label}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            )}
          </div>
          {tab.caption && (
            <p className="text-center text-sm md:text-base text-brand-text leading-relaxed max-w-2xl mx-auto">
              {tab.caption}
            </p>
          )}
        </div>
      ),
    };
  });

  return (
    <section
      className="w-full border-b border-brand-ink/10 bg-brand-surface-raised"
      style={{ "--product-accent": accentColor ?? "#50B8D9" } as React.CSSProperties}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <SectionHeader
            header={header_section}
            defaultHeading="See it in action"
            defaultSubHeading="Real screens, real workflows — from real African institutions."
          />
        </div>
        <AnimatedTabs tabs={tabItems} />
      </div>
    </section>
  );
}
