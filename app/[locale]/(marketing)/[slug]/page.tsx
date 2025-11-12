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
  const resolvedLocale = locale ?? 'en';
  
  // Server-side data fetching for SSG
  const caller = await getCaller();
  const page = await caller.comingSoon.getPageBySlug({ slug, locale: resolvedLocale });

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
