'use client';

import Link from 'next/link';
import Image from 'next/image';
import { trpc } from '@/trpc/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingView, EmptyView } from '@/components/ui/state-views';
import { getStrapiMediaUrl } from '@/lib/media.strapi';
import { ROUTES } from '@/lib/constants';
import type { SaaSProduct } from '@/types/products';

export function ProductsList() {
  const { data: response, isLoading } = trpc.comingSoon.getProducts.useQuery({
    page: 1,
    pageSize: 12
  });

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <LoadingView message="Loading products..." />
      </main>
    );
  }

  const productList = response?.results || [];
  
  if (!productList || !Array.isArray(productList) || productList.length === 0) {
    return (
      <main className="min-h-screen">
        <EmptyView
          title="No Products Available"
          message="There are no products to display at the moment."
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="relative min-h-screen bg-linear-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            High-quality software solutions that work globally and evolve with communities.
            Choose open source or managed hosting.
          </p>
        </div>
      </div>

      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(productList as SaaSProduct[]).map((product: SaaSProduct) => {
            const iconUrl = product.product_icon?.url
              ? getStrapiMediaUrl(product.product_icon.url)
              : null;

            return (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <Link href={`${ROUTES.PRODUCTS}/${product.slug}`}>
                  <CardHeader>
                    {iconUrl && (
                      <div className="mb-4">
                        <Image
                          src={iconUrl}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="rounded-lg"
                        />
                      </div>
                    )}
                    <CardTitle>{product.name}</CardTitle>
                    {product.short_description && (
                      <CardDescription>{product.short_description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.is_open_source && (
                        <Badge variant="secondary">Open Source</Badge>
                      )}
                      {product.has_managed_hosting && (
                        <Badge variant="outline">Managed Hosting</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button asChild size="sm">
                        <Link href={`${ROUTES.PRODUCTS}/${product.slug}`}>
                          Learn More
                        </Link>
                      </Button>
                      {product.github_url && (
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={product.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
