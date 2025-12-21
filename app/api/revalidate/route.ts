import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// Allow Strapi webhooks to POST here to trigger ISR revalidation without rebuilding the container.
// Security: require a shared secret.

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const secretFromQuery = url.searchParams.get('secret');
    const secretFromHeader = req.headers.get('x-revalidate-secret');
    const secret = secretFromQuery || secretFromHeader || '';

    if (!process.env.REVALIDATE_SECRET) {
      console.warn('[revalidate] REVALIDATE_SECRET is not set. Rejecting request.');
      return NextResponse.json({ revalidated: false, message: 'Missing server secret' }, { status: 500 });
    }

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));

    // Supported shapes:
    // {
    //   tags?: string[];           // e.g. ["global", "page:home:en"]
    //   paths?: string[];          // e.g. ["/en", "/fr"]
    //   type?: string;             // strapi model e.g. 'api::page.page'
    //   slug?: string;             // page slug
    //   locale?: string;           // e.g. 'en'
    // }

    const tags = new Set<string>();
    const paths = new Set<string>();

    // 1) use explicit tags/paths if provided
    if (Array.isArray(body.tags)) body.tags.forEach((t: string) => t && tags.add(t));
    if (Array.isArray(body.paths)) body.paths.forEach((p: string) => p && paths.add(p));

    // 2) derive defaults for common content types
    const locale = (body.locale as string) || undefined;

    switch (body.type) {
      case 'api::global.global': {
        tags.add('global');
        // commonly used paths for top-level pages, customize as needed
        // If you maintain a locale list, you can add locale-specific paths here too.
        break;
      }
      case 'api::page.page': {
        if (body.slug) {
          tags.add(`page:${body.slug}:${locale ?? 'default'}`);
          if (locale) paths.add(`/${locale}/${body.slug === 'home' ? '' : body.slug}`.replace(/\/$/, ''));
        } else {
          tags.add('pages');
        }
        break;
      }
      case 'api::faq.faq': {
        tags.add('faqs');
        break;
      }
      case 'api::logo.logo': {
        tags.add('logos');
        break;
      }
      default:
        break;
    }

    // Execute revalidation
    let revalidatedCount = 0;
    tags.forEach((t) => { revalidateTag(t, 'page'); revalidatedCount++; });
    paths.forEach((p) => { revalidatePath(p, 'page'); revalidatedCount++; });

    return NextResponse.json({ revalidated: true, revalidatedCount, tags: Array.from(tags), paths: Array.from(paths) });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[revalidate] error', err);
    return NextResponse.json({ revalidated: false, message }, { status: 500 });
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const preferredRegion = 'auto';
