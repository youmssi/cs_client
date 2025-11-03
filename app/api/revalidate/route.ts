import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/lib/constants';
import { env } from '@/lib/env.server';

// Type assertion for revalidateTag to handle Next.js version differences
const revalidateCacheTag = (tag: string) => {
  (revalidateTag as (tag: string) => void)(tag);
};

/**
 * Webhook route for on-demand ISR revalidation
 * Call this endpoint when content is updated in Strapi
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization');
    const expectedSecret = env.WEBHOOK_SECRET;

    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { model, event } = body;

    // Revalidate based on model and event
    switch (model) {
      case 'global':
        revalidateCacheTag(CACHE_TAGS.GLOBAL);
        console.log(`✅ Revalidated global data cache`);
        break;

      case 'blog-page':
        revalidateCacheTag(CACHE_TAGS.BLOG_PAGE);
        console.log(`✅ Revalidated blog page cache`);
        break;

      case 'saas-product':
      case 'saas-products':
        revalidateCacheTag(CACHE_TAGS.PRODUCTS);
        revalidateCacheTag(CACHE_TAGS.SAAS_PRODUCTS);
        revalidateCacheTag(CACHE_TAGS.PRODUCT);
        console.log(`✅ Revalidated products cache`);
        break;

      case 'product-page':
      case 'product-pages':
        revalidateCacheTag(CACHE_TAGS.PRODUCT);
        console.log(`✅ Revalidated product pages cache`);
        break;

      case 'article':
      case 'articles':
        revalidateCacheTag(CACHE_TAGS.ARTICLES);
        console.log(`✅ Revalidated articles cache`);
        break;

      case 'faq':
      case 'faqs':
        revalidateCacheTag(CACHE_TAGS.FAQS);
        console.log(`✅ Revalidated FAQs cache`);
        break;

      case 'testimonial':
      case 'testimonials':
        revalidateCacheTag(CACHE_TAGS.TESTIMONIALS);
        console.log(`✅ Revalidated testimonials cache`);
        break;

      default:
        console.log(`ℹ️ No revalidation configured for model: ${model}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      model,
      event,
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    );
  }
}

