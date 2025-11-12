import { ErrorView } from '@/components/state-views';
import { PageContent } from '@/components/page-content';
import { HydrateClient, getCaller } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Readonly<PageProps>) {
  const { locale } = await params;
  const resolvedLocale = locale ?? 'en';
  
  // Server-side data fetching for SSG
  const caller = await getCaller();
  const page = await caller.comingSoon.getPageBySlug({ slug: 'home', locale: resolvedLocale });

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

export const dynamic = 'force-static';
export const revalidate = 3600;
