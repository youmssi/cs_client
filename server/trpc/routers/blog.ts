import { createTRPCRouter, publicProcedure } from '@/server/trpc/init';
import { apiClient } from '@/server/trpc/api-client';
import { API_ENDPOINTS } from '@/lib/constants';
import type { Page } from '@/types';

export const blogRouter = createTRPCRouter({
  getHomePage: publicProcedure.query(async (): Promise<Page> => {
    return apiClient.get<Page>(`${API_ENDPOINTS.PAGE}?slug=home`);
  }),
});
