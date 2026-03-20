import type { Metadata } from 'next';
import { ErrorView } from '@/components/state-views';
import { PageContent } from '@/components/page-content';
import { HydrateClient, getCaller } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { generatePageStaticParams } from '@/lib/static-params';
import { generateMetadataObject } from '@/lib/metadata';
import { DEFAULT_METADATA } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const caller = await getCaller();
  try {
    const page = await caller.comingSoon.getPageBySlug({ slug, locale });
    return generateMetadataObject(page?.seo, {
      title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} — ${DEFAULT_METADATA.SITE_NAME}`,
      description: DEFAULT_METADATA.DESCRIPTION,
    });
  } catch {
    return { title: DEFAULT_METADATA.TITLE, description: DEFAULT_METADATA.DESCRIPTION };
  }
}

export default async function DynamicPage({ params }: Readonly<PageProps>) {
  const { slug, locale } = await params;
  const caller = await getCaller();
  let page = null;
  try {
    page = await caller.comingSoon.getPageBySlug({ slug, locale });
  } catch (error) {
    console.warn(`[DynamicPage] Failed to load page ${slug} for locale ${locale}:`, error instanceof Error ? error.message : error);
  }

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ErrorView message={`Failed to load page '${slug}'. Please check that content is created in the CMS.`} />}>
        <main>
          <PageContent page={page} />
        </main>
      </ErrorBoundary>
    </HydrateClient>
  );
}

export async function generateStaticParams() {
  return generatePageStaticParams();
}

export const dynamicParams = true;
