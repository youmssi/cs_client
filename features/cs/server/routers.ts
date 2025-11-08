import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { envServer } from "@/lib/env.server";
import type { Global, Page } from "@/types";

/**
 * Strapi clean endpoint response types
 */
interface StrapiCollectionResponse<T> {
  results: T[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

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
      const params = new URLSearchParams({
        'filters[slug][$eq]': input.slug,
      });
      if (input.locale) params.set('locale', input.locale);
      
      const response = await fetchFromStrapi<StrapiCollectionResponse<Page>>(`${API_ENDPOINTS.PAGE}?${params.toString()}`);
      
      if (!response.results || response.results.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Page with slug '${input.slug}' not found`,
        });
      }
      
      return response.results[0];
    }),

  getPages: publicProcedure
    .input(z.object({ locale: z.string().optional() }))
    .query(async ({ input }): Promise<Page[]> => {
      const params = new URLSearchParams();
      if (input.locale) params.set('locale', input.locale);
      
      const response = await fetchFromStrapi<StrapiCollectionResponse<Page>>(`${API_ENDPOINTS.PAGE}?${params.toString()}`);
      
      if (!response.results || response.results.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No pages found',
        });
      }
      
      return response.results;
    }),
});