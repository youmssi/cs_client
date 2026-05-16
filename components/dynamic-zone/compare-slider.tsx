"use client";

import { Compare } from "@/components/aceternity/compare";
import { SectionHeader } from "@/components/global/section-header";
import { getStrapiMediaUrl } from "@/lib/media.strapi";
import type { CompareSliderBlock } from "@/types";

interface CompareSliderProps extends CompareSliderBlock {
  accentColor?: string | null;
}

export function CompareSlider({ header_section, pairs, accentColor }: Readonly<CompareSliderProps>) {
  if (!pairs || pairs.length === 0) return null;

  return (
    <section
      className="w-full border-b border-brand-ink/10 bg-brand-surface-raised"
      style={{ "--product-accent": accentColor ?? "#50B8D9" } as React.CSSProperties}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <SectionHeader
            header={header_section}
            defaultHeading="Replace what slows you down"
            defaultSubHeading="Drag the slider to see what changes when you move from legacy workflows to a production system."
          />
        </div>
        <div className="flex flex-col gap-12">
          {pairs.map((pair) => {
            const beforeUrl = pair.before_image ? getStrapiMediaUrl(pair.before_image as unknown as Record<string, unknown>) : undefined;
            const afterUrl = pair.after_image ? getStrapiMediaUrl(pair.after_image as unknown as Record<string, unknown>) : undefined;
            return (
              <div key={pair.id} className="flex flex-col gap-4">
                {pair.title && (
                  <h3 className="text-xl md:text-2xl font-semibold text-brand-ink text-center">
                    {pair.title}
                  </h3>
                )}
                <Compare
                  firstImage={beforeUrl}
                  secondImage={afterUrl}
                  firstLabel={pair.before_label ?? "Before"}
                  secondLabel={pair.after_label ?? "After"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
