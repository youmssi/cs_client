import { SEO } from '@/types/components';

export const generateMetadataObject = (seo?: SEO | null, defaults?: { title?: string; description?: string }) => {
  return {
    title: seo?.metaTitle || defaults?.title || 'Default Title',
    description: seo?.metaDescription || defaults?.description || 'Default Description',
    keywords: seo?.keywords?.split(',').map((k) => k.trim()),
    robots: seo?.metaRobots || 'index, follow',
    openGraph: {
      title: seo?.metaTitle || defaults?.title || 'Default Title',
      description: seo?.metaDescription || defaults?.description || 'Default Description',
      images: seo?.metaImage?.url ? [{ url: seo.metaImage.url }] : [],
    },
    alternates: {
      canonical: seo?.canonicalURL || undefined,
    },
  };
};
