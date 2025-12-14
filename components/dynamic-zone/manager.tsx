"use client";

import type { DynamicBlock } from "@/types";

import { Hero } from "./hero";
import { SocialProof } from "./social-proof";
import { BentoGrid } from "./bento-grid";
import { Documentation } from "./documentation";
import { Testimonials } from "./testimonials";
import { Pricing } from "./pricing";
import { FAQ } from "./faq";
import { CTA } from "./cta";
import { Story } from "./story";

interface DynamicZoneManagerProps {
  blocks?: DynamicBlock[] | null;
}

export function DynamicZoneManager({
  blocks,
}: Readonly<DynamicZoneManagerProps>) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.__component) {
          case "dynamic-zone.hero": {
            const props = block;
            return <Hero key={`hero-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.brillance-hero": {
            // Deprecated block type: render the same Brillance hero layout as `dynamic-zone.hero`.
            const props = block as unknown as { heading: string | null; sub_heading: string | null };
            return <Hero key={`brillance-hero-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.social-proof": {
            const props = block;
            return <SocialProof key={`social-proof-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.bento-grid": {
            const props = block;
            return <BentoGrid key={`bento-grid-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.documentation": {
            const props = block;
            return <Documentation key={`documentation-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.testimonials": {
            const props = block;
            return <Testimonials key={`testimonials-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.pricing": {
            const props = block;
            return <Pricing key={`pricing-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.cta": {
            const props = block;
            return <CTA key={`cta-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.faq": {
            const props = block;
            return <FAQ key={`faq-${block.id}-${index}`} {...props} />;
          }
          case "blocks.story": {
            const props = block;
            return <Story key={`story-${block.id}-${index}`} {...props} />;
          }
          default: {
            console.warn('No component found for this block type');
            return null;
          }
        }
      })}
    </>
  );
}
