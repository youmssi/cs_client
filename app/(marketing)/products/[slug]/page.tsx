import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { HydrateClient, prefetch, getCaller, trpc } from '@/trpc/server';
import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import { ErrorView, LoadingView, EmptyView } from '@/components/ui/state-views';
import { DEFAULT_METADATA } from '@/lib/constants';
import type { SaaSProduct } from '@/types/products';
import type { DynamicBlock } from '@/types';

type ProductPageProps = Readonly<{
  params: { slug: string };
}>;

export const revalidate = 3600; // ISR: Revalidate every hour

export async function generateStaticParams() {
  // In a real app, you'd fetch all product slugs here
  // For now, return empty array to generate on-demand
  return [];
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const caller = await getCaller();
    const productPage = await caller.comingSoon.getProductPage({ slug });

    if (!productPage) {
      return {
        title: 'Product Not Found - MRVIN100',
      };
    }

    const seo = productPage.seo;

    return {
      title: seo.metaTitle || `${productPage.heading || 'Product'} - MRVIN100`,
      description: seo.metaDescription || productPage.sub_heading || '',
      keywords: seo.keywords?.split(',').map((k) => k.trim()),
      robots: seo.metaRobots || 'index, follow',
      openGraph: {
        title: seo.metaTitle || productPage.heading || 'Product',
        description: seo.metaDescription || productPage.sub_heading || '',
        images: seo.metaImage?.url ? [{ url: seo.metaImage.url }] : [],
      },
      alternates: {
        canonical: seo.canonicalURL || undefined,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for product:', error);
    return {
      title: `Product: ${slug} - MRVIN100`,
      description: DEFAULT_METADATA.DESCRIPTION,
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  // Prefetch data for hydration
  prefetch(trpc.comingSoon.getProductPage.queryOptions({ slug }));
  prefetch(trpc.comingSoon.getProductBySlug.queryOptions({ slug }));

  return (
    <HydrateClient>
      <ErrorBoundary
        fallback={
          <main className="min-h-screen">
            <ErrorView message="Failed to load product page. Please try again later." />
          </main>
        }
      >
        <Suspense
          fallback={
            <main className="min-h-screen">
              <LoadingView message="Loading product..." />
            </main>
          }
        >
          <ProductPageContent slug={slug} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}

async function ProductPageContent({ slug }: { slug: string }) {
  const caller = await getCaller();

  // Fetch primary data: product page and the core product info
  const [productPageResult, productResult] = await Promise.allSettled([
    caller.comingSoon.getProductPage({ slug }),
    caller.comingSoon.getProductBySlug({ slug }),
  ]);

  const productPage = productPageResult.status === 'fulfilled' ? productPageResult.value : null;
  const product = productResult.status === 'fulfilled' ? productResult.value : null;

  // If neither a product page nor a product exists, it's a 404
  if (!productPage && !product) {
    notFound();
  }

    // If there's no specific product page, render a dedicated empty state view
  if (!productPage) {
    return (
      <main className="min-h-screen">
        <EmptyView
          title={`Product Page for "${product?.name || slug}" Not Found`}
          message="A dedicated page for this product has not been configured in the CMS yet."
        />
      </main>
    );
  }

  
  // If we have a product page but no associated product ID, render DZ only
  const productId = productPage.product?.id;
  if (!productId || !product) {
    return (
      <main className="min-h-screen">
        {productPage.dynamic_zone && (
          <DynamicZoneManager blocks={productPage.dynamic_zone as DynamicBlock[]} />
        )}
      </main>
    );
  }

  // Fetch all related data in parallel for the full experience
  const [
    pricingPlans,
    featureCategories,
    testimonialsData,
    integrationsData,
    caseStudiesData,
  ] = await Promise.all([
    caller.comingSoon.getPricingPlans({ productId }),
    caller.comingSoon.getFeatureCategories({ productId }),
    product.testimonials && product.testimonials.length > 0
      ? caller.comingSoon.getTestimonials({ ids: product.testimonials.map((t) => t.id) })
      : Promise.resolve([]),
    product.integrations && product.integrations.length > 0
      ? caller.comingSoon.getIntegrations({ ids: product.integrations.map((i) => i.id) })
      : Promise.resolve([]),
    product.case_studies && product.case_studies.length > 0
      ? caller.comingSoon.getCaseStudies({ ids: product.case_studies.map((c) => c.id) })
      : Promise.resolve([]),
  ]);

  return (
    <main className="min-h-screen">
      {productPage.dynamic_zone && (
        <DynamicZoneManager
          blocks={productPage.dynamic_zone as DynamicBlock[]}
          product={product}
          testimonialsData={testimonialsData}
          pricingPlansData={pricingPlans}
          featureCategoriesData={featureCategories}
          integrationsData={integrationsData}
          caseStudiesData={caseStudiesData}
        />
      )}
    </main>
  );
}
