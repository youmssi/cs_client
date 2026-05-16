"use client";

import Image from "next/image";
import { StickyScroll } from "@/components/aceternity/sticky-scroll-reveal";
import { SectionHeader } from "@/components/global/section-header";
import { getStrapiMediaUrl } from "@/lib/media.strapi";
import type { FeatureDeepDiveBlock } from "@/types";

interface FeatureDeepDiveProps extends FeatureDeepDiveBlock {
  accentColor?: string | null;
}

export function FeatureDeepDive({ header_section, features, accentColor }: Readonly<FeatureDeepDiveProps>) {
  if (!features || features.length === 0) return null;

  const content = features.map((feature) => {
    const bullets = feature.bullets ? feature.bullets.split("\n").map((b) => b.trim()).filter(Boolean) : [];
    const imageUrl = feature.image ? getStrapiMediaUrl(feature.image as unknown as Record<string, unknown>) : null;

    return {
      title: feature.title ?? "Feature",
      description: (
        <div className="flex flex-col gap-4">
          {feature.description && <p>{feature.description}</p>}
          {bullets.length > 0 && (
            <ul className="flex flex-col gap-2">
              {bullets.map((bullet, idx) => (
                <li key={`bullet-${idx}`} className="flex items-start gap-2.5">
                  <svg
                    className="mt-1 shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={accentColor ?? "#50B8D9"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm md:text-base text-brand-dark/80 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          {feature.accent_quote && (
            <p
              className="mt-2 italic border-l-2 pl-4 py-1 text-sm md:text-base text-brand-dark/70"
              style={{ borderColor: accentColor ?? "#50B8D9" }}
            >
              &ldquo;{feature.accent_quote}&rdquo;
            </p>
          )}
        </div>
      ),
      visual: imageUrl ? (
        <div className="relative h-full w-full">
          <Image
            src={imageUrl}
            alt={feature.title ?? "Feature"}
            fill
            sizes="(min-width: 768px) 640px, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-brand-surface-raised to-brand-surface" />
      ),
    };
  });

  return (
    <section
      className="w-full border-b border-brand-ink/10 bg-brand-surface"
      style={{ "--product-accent": accentColor ?? "#50B8D9" } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <SectionHeader
            header={header_section}
            defaultHeading="Every feature, in depth"
            defaultSubHeading="Scroll to see how each capability solves a specific institutional problem."
          />
        </div>
        <StickyScroll content={content} />
      </div>
    </section>
  );
}
