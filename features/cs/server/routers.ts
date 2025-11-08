import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { envServer } from "@/lib/env.server";
import type { Global, Page } from "@/types";

/**
 * Helper function to call Strapi clean endpoints
 */
async function fetchFromStrapi<T>(endpoint: string): Promise<T> {
  const url = `${envServer.STRAPI_API_URL}${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (envServer.STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${envServer.STRAPI_API_TOKEN}`;
  }
  
  const response = await fetch(url, { 
    headers,
    next: { revalidate: 3600 } // Cache for 1 hour
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
      return fetchFromStrapi<Global>(endpoint);
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
      
      return page;
    }),

  getPages: publicProcedure
    .input(z.object({ locale: z.string().optional() }))
    .query(async ({ input }): Promise<Page[]> => {
      const params = new URLSearchParams();
      if (input.locale) params.set('locale', input.locale);
      
      // Strapi /clean endpoints return arrays directly
      const pages = await fetchFromStrapi<Page[]>(`${API_ENDPOINTS.PAGE}?${params.toString()}`);
      
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
      try {
        const locales = await fetchFromStrapi<Array<{ code: string; name: string }>>('/api/i18n/locales');
        return locales.map(l => l.code);
      } catch {
        console.warn('Failed to fetch locales from Strapi, using default');
        return ['en'];
      }
    }),
});