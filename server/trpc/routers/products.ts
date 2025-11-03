import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/trpc/init';
import { apiClient } from '@/server/trpc/api-client';
import { API_ENDPOINTS } from '@/lib/constants';

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return apiClient.get(API_ENDPOINTS.PRODUCTS);
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return apiClient.get(`${API_ENDPOINTS.PRODUCTS}?filters[slug][$eq]=${input.slug}`);
    }),
});
