'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import type { DynamicBlock } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components
const Hero = dynamic(() => import('./hero').then((mod) => mod.Hero), {
  loading: () => <Skeleton className="h-screen w-full" />,
});

const HowItWork = dynamic(
  () => import('./how-it-work').then((mod) => mod.HowItWork),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);

const Testimonials = dynamic(
  () => import('./testimonials').then((mod) => mod.Testimonials),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);

const FAQ = dynamic(() => import('./faq').then((mod) => mod.FAQ), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const CTA = dynamic(() => import('./cta').then((mod) => mod.CTA), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const Feature = dynamic(
  () => import('./feature').then((mod) => mod.Feature),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);

const ProductHero = dynamic(
  () => import('./product-hero').then((mod) => mod.ProductHero),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);

const ProductPricingSection = dynamic(
  () => import('./product-pricing-section').then((mod) => mod.ProductPricingSection),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);

const ProductFeaturesShowcase = dynamic(
  () => import('./product-features-showcase').then((mod) => mod.ProductFeaturesShowcase),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMapping: Record<string, React.ComponentType<any>> = {
  'hero': Hero,
  'feature': Feature,
  'how-it-work': HowItWork,
  'testimonial': Testimonials,
  'faq': FAQ,
  'cta': CTA,
  'product-hero': ProductHero,
  'product-pricing-section': ProductPricingSection,
  'product-features-showcase': ProductFeaturesShowcase,
};

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
        const Component = componentMapping[block.type];

        if (!Component) {
          console.warn(`No component found for block type: ${block.type}`);
          return null;
        }

        return (
          <Suspense
            key={`${block.type}-${index}`}
            fallback={<Skeleton className="h-96 w-full" />}
          >
            <Component {...block} />
          </Suspense>
        );
      })}
    </>
  );
}

