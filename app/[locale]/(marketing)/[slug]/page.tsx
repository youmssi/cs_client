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
  } catch {
    // Don't throw - let the page render with error state
    console.warn(`Page not found: ${slug} for locale: ${resolvedLocale}`);
  }

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ErrorView message="Failed to load page" />}>
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
