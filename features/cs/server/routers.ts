import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { envServer } from "@/lib/env.server";
import type { Global, Page } from "@/types";

/**
 * Helper function to call Strapi clean endpoints
 */
async function fetchFromStrapi<T>(endpoint: string, opts?: { tags?: string[]; revalidate?: number }): Promise<T> {
  const url = `${envServer.STRAPI_API_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (envServer.STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${envServer.STRAPI_API_TOKEN}`;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate: opts?.revalidate ?? 3600, tags: opts?.tags },
  });

  if (!response.ok) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Strapi API error: ${response.statusText}`,
    });
  }

  return response.json();
}

export const comingSoonRouter = createTRPCRouter({
  
  getGlobal: publicProcedure
    .input(z.object({ locale: z.string().optional() }))
    .query(async ({ input }): Promise<Global> => {
      const params = new URLSearchParams();
      if (input.locale) params.set('locale', input.locale);
      const queryString = params.toString();
      const endpoint = queryString ? `${API_ENDPOINTS.GLOBAL}?${queryString}` : API_ENDPOINTS.GLOBAL;
      return fetchFromStrapi<Global>(endpoint, { tags: ['global'], revalidate: 3600 });
    }),

  getPageBySlug: publicProcedure
    .input(z.object({ slug: z.string(), locale: z.string().optional() }))
    .query(async ({ input }): Promise<Page> => {
      const params = new URLSearchParams();
      if (input.locale) params.set('locale', input.locale);
      
      const pages = await fetchFromStrapi<Page[]>(`${API_ENDPOINTS.PAGE}?${params.toString()}`);
      
      if (!pages || pages.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No pages found`,
        });
      }
      
      // Filter by slug on the client side since /clean doesn't support filters
      const page = pages.find(p => p.slug === input.slug);
      
      if (!page) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Page with slug '${input.slug}' not found`,
        });
      }
      
      // Also tag this specific page by slug+locale for targeted revalidation
      // Consumers should use revalidateTag(`page:${input.slug}:${input.locale ?? 'default'}`)
      return page;
    }),

  getPages: publicProcedure
    .input(z.object({ locale: z.string().optional() }))
    .query(async ({ input }): Promise<Page[]> => {
      const params = new URLSearchParams();
      if (input.locale) params.set('locale', input.locale);
      
      // Strapi /clean endpoints return arrays directly
      const pages = await fetchFromStrapi<Page[]>(`${API_ENDPOINTS.PAGE}?${params.toString()}`, { tags: ['pages', `pages:${input.locale ?? 'default'}`], revalidate: 3600 });
      
      if (!pages || pages.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No pages found',
        });
      }
      
      return pages;
    }),

  getLocales: publicProcedure
    .query(async (): Promise<string[]> => {
        const locales = await fetchFromStrapi<Array<{ code: string; name: string }>>(API_ENDPOINTS.LOCALES, { tags: ['locales'], revalidate: 86400 });
        if (!locales || locales.length === 0) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'No locales found',
          });
        }
        return locales.map(l => l.code);
    }),
});
