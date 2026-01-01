import { ErrorView } from '@/components/state-views';
import { PageContent } from '@/components/page-content';
import { HydrateClient, getCaller } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { generatePageStaticParams } from '@/lib/static-params';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function DynamicPage({ params }: Readonly<PageProps>) {
  const { slug, locale } = await params;
  // Locale is always provided by middleware
  const resolvedLocale = locale;
  
  // Server-side data fetching for SSG - handle errors gracefully
  const caller = await getCaller();
  let page = null;
  
  try {
    page = await caller.comingSoon.getPageBySlug({ slug, locale: resolvedLocale });
  } catch (error) {
    // Don't throw - let the page render with error state
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn(`[DynamicPage] Failed to load page ${slug} for locale ${resolvedLocale}:`, errorMessage);
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

// Allow dynamic routes for newly added locales/pages
export const dynamicParams = true;
