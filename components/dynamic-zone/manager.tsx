import type { DynamicBlock } from "@/types";

import { Hero } from "./hero";
import { SocialProof } from "./social-proof";
import { BentoGrid } from "./bento-grid";
import { PlatformFeatures } from "./platform-features";
import { Testimonials } from "./testimonials";
import { Pricing } from "./pricing";
import { DashboardShowcase } from "./dashboard-showcase";
import { FAQ } from "./faq";
import { CTA } from "./cta";
import { Story } from "./story";
import { CustomBudget } from "./custom-budget";
import { AppCatalog } from "./app-catalog";
import { EcosystemShowcase } from "./ecosystem-showcase";
import { DeliveryModel } from "./delivery-model";
import { ProductHero } from "./product-hero";
import { StatsBar } from "./stats-bar";
import { FeatureDeepDive } from "./feature-deep-dive";
import { ScreenshotsGallery } from "./screenshots-gallery";
import { TechStack } from "./tech-stack";
import { CompareSlider } from "./compare-slider";
import { UseCases } from "./use-cases";
import { ProductCtaFinal } from "./product-cta-final";
import { ProductGrid } from "./product-grid";

interface DynamicZoneManagerProps {
  blocks?: DynamicBlock[] | null;
  /**
   * Current request locale. Forwarded to data-fetching blocks (e.g. product-grid)
   * so they don't need to read headers() — preserves SSG eligibility for the parent.
   */
  locale?: string;
  /**
   * Product-level context for product-page blocks. Passed by the
   * `/apps/[product]` route so blocks can render the product accent color,
   * status pill, version, logo, etc.
   */
  productContext?: {
    name?: string | null;
    logo?: { url: string; alternativeText?: string | null } | null;
    status?: string | null;
    version?: string | null;
    accentColor?: string | null;
    complianceTags?: string[] | null;
  };
}

export function DynamicZoneManager({
  blocks,
  locale,
  productContext,
}: Readonly<DynamicZoneManagerProps>) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const accentColor = productContext?.accentColor ?? null;

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.__component) {
          case "dynamic-zone.hero": {
            const props = block;
            return <Hero key={`hero-${block.id}-${index}`} {...props} />;
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
            return <PlatformFeatures key={`platform-features-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.testimonials": {
            const props = block;
            return <Testimonials key={`testimonials-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.pricing": {
            const props = block;
            return <Pricing key={`pricing-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.dashboard-showcase": {
            const props = block;
            return (
              <DashboardShowcase
                key={`dashboard-showcase-${block.id}-${index}`}
                {...props}
              />
            );
          }
          case "dynamic-zone.cta": {
            const props = block;
            return <CTA key={`cta-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.faq": {
            const props = block;
            return <FAQ key={`faq-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.custom-budget": {
            const props = block;
            return <CustomBudget key={`custom-budget-${block.id}-${index}`} {...props} />;
          }
          case "blocks.story": {
            const props = block;
            return <Story key={`story-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.app-catalog": {
            const props = block;
            return <AppCatalog key={`app-catalog-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.ecosystem-showcase": {
            const props = block;
            return <EcosystemShowcase key={`ecosystem-showcase-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.delivery-model": {
            const props = block;
            return <DeliveryModel key={`delivery-model-${block.id}-${index}`} {...props} />;
          }
          case "dynamic-zone.product-hero": {
            return (
              <ProductHero
                key={`product-hero-${block.id}-${index}`}
                {...block}
                productName={productContext?.name}
                productLogo={productContext?.logo}
                status={productContext?.status}
                version={productContext?.version}
                accentColor={accentColor}
                complianceTags={productContext?.complianceTags}
              />
            );
          }
          case "dynamic-zone.stats-bar": {
            return <StatsBar key={`stats-bar-${block.id}-${index}`} {...block} accentColor={accentColor} />;
          }
          case "dynamic-zone.feature-deep-dive": {
            return <FeatureDeepDive key={`feature-deep-dive-${block.id}-${index}`} {...block} accentColor={accentColor} />;
          }
          case "dynamic-zone.screenshots-gallery": {
            return <ScreenshotsGallery key={`screenshots-gallery-${block.id}-${index}`} {...block} accentColor={accentColor} />;
          }
          case "dynamic-zone.tech-stack": {
            return <TechStack key={`tech-stack-${block.id}-${index}`} {...block} accentColor={accentColor} />;
          }
          case "dynamic-zone.compare-slider": {
            return <CompareSlider key={`compare-slider-${block.id}-${index}`} {...block} accentColor={accentColor} />;
          }
          case "dynamic-zone.use-cases": {
            return <UseCases key={`use-cases-${block.id}-${index}`} {...block} accentColor={accentColor} />;
          }
          case "dynamic-zone.product-cta-final": {
            return <ProductCtaFinal key={`product-cta-final-${block.id}-${index}`} {...block} accentColor={accentColor} />;
          }
          case "dynamic-zone.product-grid": {
            return <ProductGrid key={`product-grid-${block.id}-${index}`} {...block} locale={locale} />;
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
