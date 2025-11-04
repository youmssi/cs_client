import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getProductBySlug,
  getProductPageBySlug,
  getPricingPlans,
  getFeatureCategories,
  getCaseStudies,
  getIntegrations,
} from '@/actions/products';
import { getTestimonials } from '@/actions/api';
import { DynamicZoneManager } from '@/components/dynamic-zone/manager';
import type { DynamicZoneComponent } from '@/types/strapi';

type ProductPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export const revalidate = 3600; // ISR: Revalidate every hour

export async function generateStaticParams() {
  // In a real app, you'd fetch all product slugs here
  // For now, return empty array to generate on-demand
  return [];
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const productPage = await getProductPageBySlug(slug);
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
    console.error('Error generating metadata:', error);
    return {
      title: 'Product - MRVIN100',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    // Try to get product page first, fallback to direct product
    const [productPage, initialProduct] = await Promise.all([
      getProductPageBySlug(slug),
      getProductBySlug(slug),
    ]);

    if (!productPage && !initialProduct) {
      notFound();
    }

    // Use product page if available, otherwise use product directly
    // If no product page, we'll need to render product directly
    if (!productPage && initialProduct) {
      // For now, render a basic product view
      // In the future, you can create a default product page template
      return (
        <main className="min-h-screen">
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">{initialProduct.name}</h1>
              {initialProduct.short_description && (
                <p className="text-lg text-muted-foreground mb-8">
                  {initialProduct.short_description}
                </p>
              )}
              <p className="text-muted-foreground">
                Product page content will be available when configured in Strapi CMS.
              </p>
            </div>
          </section>
        </main>
      );
    }

    if (!productPage) {
      notFound();
    }

    // Fetch related data in parallel
    const productId = productPage.product?.id;

    if (!productId) {
      return (
        <main className="min-h-screen">
          {productPage.dynamic_zone && (
            <DynamicZoneManager 
              dynamicZone={productPage.dynamic_zone as DynamicZoneComponent[]} 
            />
          )}
        </main>
      );
    }

    // Fetch product details for enriched data
    const product = await getProductBySlug(slug);

    const [
      pricingPlans,
      featureCategories,
      testimonialsData,
      integrationsData,
      caseStudiesData,
    ] = await Promise.all([
      getPricingPlans(productId),
      getFeatureCategories(productId),
      product?.testimonials && product.testimonials.length > 0
        ? getTestimonials(product.testimonials.map((t) => t.id))
        : Promise.resolve([]),
      product?.integrations && product.integrations.length > 0
        ? getIntegrations(product.integrations.map((i) => i.id))
        : Promise.resolve([]),
      product?.case_studies && product.case_studies.length > 0
        ? getCaseStudies(product.case_studies.map((c) => c.id))
        : Promise.resolve([]),
    ]);

    return (
      <main className="min-h-screen">
        {productPage.dynamic_zone && (
          <DynamicZoneManager
            dynamicZone={productPage.dynamic_zone as DynamicZoneComponent[]}
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
  } catch (error) {
    console.error('Error rendering product page:', error);
    notFound();
  }
}

