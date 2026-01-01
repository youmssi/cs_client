import { ErrorView } from '@/components/state-views';
import { PageContent } from '@/components/page-content';
import { HydrateClient, getCaller } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Allow dynamic routes for newly added locales
export const dynamicParams = true;

export default async function HomePage({ params }: Readonly<PageProps>) {
  const { locale } = await params;
  // Locale is always provided by middleware
  const resolvedLocale = locale;
  
  // Server-side data fetching for SSG - handle errors gracefully
  const caller = await getCaller();
  let page = null;
  
  try {
    page = await caller.comingSoon.getPageBySlug({ slug: 'home', locale: resolvedLocale });
  } catch (error) {
    // Don't throw - let the page render with error state
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn(`[HomePage] Failed to load page for locale ${resolvedLocale}:`, errorMessage);
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

