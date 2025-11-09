"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import type { DynamicBlock } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const Hero = dynamic(() => import("./hero").then((mod) => mod.Hero), {
  loading: () => <Skeleton className="h-screen w-full" />,
});

const FAQ = dynamic(() => import("./faq").then((mod) => mod.FAQ), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const CTA = dynamic(() => import("./cta").then((mod) => mod.CTA), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const Story = dynamic(() => import("./story").then((mod) => mod.Story), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

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
            return (
              <Suspense key={`hero-${block.id}-${index}`} fallback={<Skeleton className="h-96 w-full" />}>
                <Hero {...props} />
              </Suspense>
            );
          }
          case "dynamic-zone.cta": {
            const props = block;
            return (
              <Suspense key={`cta-${block.id}-${index}`} fallback={<Skeleton className="h-96 w-full" />}>
                <CTA {...props} />
              </Suspense>
            );
          }
          case "dynamic-zone.faq": {
            const props = block;
            return (
              <Suspense key={`faq-${block.id}-${index}`} fallback={<Skeleton className="h-96 w-full" />}>
                <FAQ {...props} />
              </Suspense>
            );
          }
          case "blocks.story": {
            const props = block;
            return (
              <Suspense key={`story-${block.id}-${index}`} fallback={<Skeleton className="h-96 w-full" />}>
                <Story {...props} />
              </Suspense>
            );
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
