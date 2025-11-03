import { createTRPCRouter, publicProcedure } from '@/server/trpc/init';
import { apiClient } from '@/server/trpc/api-client';
import { API_ENDPOINTS } from '@/lib/constants';
import type { Global } from '@/types';

export const globalRouter = createTRPCRouter({
  get: publicProcedure.query(async (): Promise<Global> => {
    return apiClient.get<Global>(API_ENDPOINTS.GLOBAL);
  }),
});
