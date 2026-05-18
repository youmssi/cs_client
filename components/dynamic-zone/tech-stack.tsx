"use client";

import Image from "next/image";
import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import { SectionHeader } from "@/components/global/section-header";
import { getStrapiMediaUrl } from "@/lib/media.strapi";
import { DEFAULT_PRODUCT_ACCENT } from "@/lib/constants";
import type { TechStackBlock } from "@/types";

interface TechStackProps extends TechStackBlock {
  accentColor?: string | null;
}

export function TechStack({ header_section, groups, accentColor }: Readonly<TechStackProps>) {
  if (!groups || groups.length === 0) return null;

  return (
    <section
      className="w-full border-b border-brand-ink/10 bg-brand-surface"
      style={{ "--product-accent": accentColor ?? DEFAULT_PRODUCT_ACCENT } as React.CSSProperties}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <SectionHeader
            header={header_section}
            defaultHeading="Built on a stack you can trust"
            defaultSubHeading="Modern, production-grade technology — built and maintained from Africa."
          />
        </div>
        <div className="flex flex-col gap-10">
          {groups.map((group, idx) => {
            const logoCards = (group.logos ?? []).map((logo, logoIdx) => {
              const imageUrl = logo.image ? getStrapiMediaUrl(logo.image) : null;
              return (
                <div
                  key={`${group.id}-${logoIdx}-${logo.company ?? ''}`}
                  className="flex items-center justify-center gap-3 rounded-xl border border-brand-border bg-brand-surface-raised px-6 py-3 min-w-[160px] grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  {imageUrl && (
                    <div className="relative h-6 w-6">
                      <Image src={imageUrl} alt={logo.company ?? "tech logo"} fill sizes="24px" className="object-contain" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-brand-dark/80">{logo.company}</span>
                </div>
              );
            });

            if (logoCards.length === 0) return null;

            return (
              <div key={group.id} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="md:w-40 shrink-0">
                  <p className="text-xs md:text-sm font-semibold tracking-wider uppercase text-brand-text">
                    {group.label}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <InfiniteMovingCards
                    items={logoCards}
                    direction={idx % 2 === 0 ? "left" : "right"}
                    speed="slow"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
