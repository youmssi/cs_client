import type { Metadata } from 'next';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import { ProductsList } from './products-list';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Products - MRVIN100',
    description: 'Explore our globally usable software solutions - open source and managed hosting options',
  };
}

export default async function ProductsPage() {
  prefetch(trpc.comingSoon.getProducts.queryOptions({ 
    page: 1,
    pageSize: 12
  }));

  return (
    <HydrateClient>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'MRVIN100 Products',
            description: 'Explore our globally usable software solutions',
          }),
        }}
      />
      <ProductsList />
    </HydrateClient>
  );
}
