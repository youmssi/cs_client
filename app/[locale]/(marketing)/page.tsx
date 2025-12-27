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
  } catch {
    // Don't throw - let the page render with error state
    console.warn(`Home page not found for locale: ${resolvedLocale}`);
  }

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ErrorView message="Failed to load home page" />}>
        <main>
          <PageContent page={page} />
        </main>
      </ErrorBoundary>
    </HydrateClient>
  );
}

