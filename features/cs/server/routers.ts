import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { PAGINATION, API_ENDPOINTS } from "@/lib/constants";
import { envServer } from "@/lib/env.server";
import type { Global } from "@/types/global";
import type { Page } from "@/types/page";
import type {
  SaaSProduct,
  ProductPage,
  PricingPlan,
  FeatureCategory,
  ProductCaseStudy,
  Integration,
} from '@/types/products';
import type { Testimonial } from '@/types/testimonial';

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

  getPage: publicProcedure
    .input(z.object({ locale: z.string().optional() }))
    .query(async ({ input }): Promise<Page> => {
      // First try to get all pages to see what's available
      const params = new URLSearchParams();
      if (input.locale) params.set('locale', input.locale);
      
      const endpoint = params.toString() ? `${API_ENDPOINTS.PAGE}?${params.toString()}` : API_ENDPOINTS.PAGE;
      console.log('🔍 Fetching from endpoint:', endpoint);
      
      const response = await fetchFromStrapi<StrapiCollectionResponse<Page>>(endpoint);
      
      // Return home page or throw error
      if (!response.results || response.results.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'No pages found in Strapi',
        });
      }
      
      // Find the exact home page that matches slug "home"
      const homePage = response.results.find(p => p.slug === 'home');
      if (!homePage) {
        // If no "home" page, return the first page for now
        console.log('⚠️ No "home" page found, returning first page:', response.results[0].slug);
        return response.results[0];
      }
      
      return homePage;
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
      
      // Find the exact page that matches the slug (should be the first and only result due to filter)
      const page = response.results.find(p => p.slug === input.slug);
      if (!page) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Page with slug '${input.slug}' not found in results`,
        });
      }
      
      return page;
    }),

  getProducts: publicProcedure
    .input(
      z.object({
        page: z.number().int().min(1).default(PAGINATION.DEFAULT_PAGE),
        pageSize: z.number().int().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().optional(),
        locale: z.string().optional(),
      })
    )
    .query(async ({ input }): Promise<StrapiCollectionResponse<SaaSProduct>> => {
      const params = new URLSearchParams({
        'pagination[page]': input.page.toString(),
        'pagination[pageSize]': input.pageSize.toString(),
      });
      
      if (input.locale) params.set('locale', input.locale);
      
      if (input.search) {
        params.append('filters[$or][0][name][$containsi]', input.search);
        params.append('filters[$or][1][short_description][$containsi]', input.search);
      }
      
      return fetchFromStrapi<StrapiCollectionResponse<SaaSProduct>>(`${API_ENDPOINTS.PRODUCTS}?${params.toString()}`);
    }),

  getProductBySlug: publicProcedure
    .input(z.object({ slug: z.string(), locale: z.string().optional() }))
    .query(async ({ input }): Promise<SaaSProduct> => {
      const params = new URLSearchParams({
        'filters[slug][$eq]': input.slug,
      });
      if (input.locale) params.set('locale', input.locale);
      
      const response = await fetchFromStrapi<StrapiCollectionResponse<SaaSProduct>>(`${API_ENDPOINTS.PRODUCTS}?${params.toString()}`);
      
      if (!response.results || response.results.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with slug '${input.slug}' not found`,
        });
      }
      
      // Find the exact product that matches the slug
      const product = response.results.find(p => p.slug === input.slug);
      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with slug '${input.slug}' not found in results`,
        });
      }
      
      return product;
    }),

  getProductPage: publicProcedure
    .input(z.object({ slug: z.string(), locale: z.string().optional() }))
    .query(async ({ input }): Promise<ProductPage> => {
      const params = new URLSearchParams({
        'filters[slug][$eq]': input.slug,
      });
      if (input.locale) params.set('locale', input.locale);
      
      const response = await fetchFromStrapi<StrapiCollectionResponse<ProductPage>>(`${API_ENDPOINTS.PRODUCT_PAGE}?${params.toString()}`);
      
      if (!response.results || response.results.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product page with slug '${input.slug}' not found`,
        });
      }
      
      // Find the exact product page that matches the slug
      const productPage = response.results.find(p => p.slug === input.slug);
      if (!productPage) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product page with slug '${input.slug}' not found in results`,
        });
      }
      
      return productPage;
    }),

  getPricingPlans: publicProcedure
    .input(z.object({ productId: z.number() }))
    .query(async ({ input }): Promise<PricingPlan[]> => {
      const params = new URLSearchParams({
        'filters[saas_product][id][$eq]': input.productId.toString(),
      });
      const response = await fetchFromStrapi<StrapiCollectionResponse<PricingPlan>>(`${API_ENDPOINTS.PRICING_PLANS}?${params.toString()}`);
      return response.results || [];
    }),

  getFeatureCategories: publicProcedure
    .input(z.object({ productId: z.number() }))
    .query(async ({ input }): Promise<FeatureCategory[]> => {
      const params = new URLSearchParams({
        'filters[saas_product][id][$eq]': input.productId.toString(),
      });
      const response = await fetchFromStrapi<StrapiCollectionResponse<FeatureCategory>>(`${API_ENDPOINTS.FEATURE_CATEGORIES}?${params.toString()}`);
      return response.results || [];
    }),

  getTestimonials: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ input }): Promise<Testimonial[]> => {
      if (input.ids.length === 0) return [];
      const params = new URLSearchParams();
      for (const id of input.ids) {
        params.append('filters[id][$in]', id.toString());
      }
      const response = await fetchFromStrapi<StrapiCollectionResponse<Testimonial>>(`${API_ENDPOINTS.TESTIMONIALS}?${params.toString()}`);
      return response.results || [];
    }),

  getIntegrations: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ input }): Promise<Integration[]> => {
      if (input.ids.length === 0) return [];
      const params = new URLSearchParams();
      for (const id of input.ids) {
        params.append('filters[id][$in]', id.toString());
      }
      const response = await fetchFromStrapi<StrapiCollectionResponse<Integration>>(`${API_ENDPOINTS.INTEGRATIONS}?${params.toString()}`);
      return response.results || [];
    }),

  getCaseStudies: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ input }): Promise<ProductCaseStudy[]> => {
      if (input.ids.length === 0) return [];
      const params = new URLSearchParams();
      for (const id of input.ids) {
        params.append('filters[id][$in]', id.toString());
      }
      const response = await fetchFromStrapi<StrapiCollectionResponse<ProductCaseStudy>>(`${API_ENDPOINTS.CASE_STUDIES}?${params.toString()}`);
      return response.results || [];
    }),
});