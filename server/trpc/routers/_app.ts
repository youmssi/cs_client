import { createTRPCRouter } from '@/server/trpc/init';
import { globalRouter } from './global';
import { blogRouter } from './blog';
import { productsRouter } from './products';

export const appRouter = createTRPCRouter({
  global: globalRouter,
  blog: blogRouter,
  products: productsRouter,
});

export type AppRouter = typeof appRouter;
