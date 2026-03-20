import type { Metadata } from 'next';
import { ErrorView } from '@/components/state-views';
import { PageContent } from '@/components/page-content';
import { HydrateClient, getCaller } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { generateMetadataObject } from '@/lib/metadata';
import { DEFAULT_METADATA } from '@/lib/constants';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const caller = await getCaller();
  try {
    const page = await caller.comingSoon.getPageBySlug({ slug: 'home', locale });
    return generateMetadataObject(page?.seo, {
      title: DEFAULT_METADATA.TITLE,
      description: DEFAULT_METADATA.DESCRIPTION,
    });
  } catch {
    return { title: DEFAULT_METADATA.TITLE, description: DEFAULT_METADATA.DESCRIPTION };
  }
}

export default async function HomePage({ params }: Readonly<PageProps>) {
  const { locale } = await params;
  const caller = await getCaller();
  let page = null;
  try {
    page = await caller.comingSoon.getPageBySlug({ slug: 'home', locale });
  } catch (error) {
    console.warn(`[HomePage] Failed to load page for locale ${locale}:`, error instanceof Error ? error.message : error);
  }

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ErrorView message="Failed to load home page. Please check that content is created in the CMS." />}>
        <main>
          <PageContent page={page} />
        </main>
      </ErrorBoundary>
    </HydrateClient>
  );
}
