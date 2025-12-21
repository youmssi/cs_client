import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { envServer } from '@/lib/env.server';
import crypto from 'crypto';

/**
 * Production-grade webhook endpoint for Strapi ISR revalidation.
 * 
 * Security features:
 * - Bearer token authentication with constant-time comparison
 * - Rate limiting per IP
 * - Request validation and sanitization
 * - Detailed logging for monitoring
 * 
 * Setup in Strapi:
 * 1. Settings → Webhooks → Create new webhook
 * 2. URL: https://your-domain/api/revalidate
 * 3. Headers: Authorization → Bearer YOUR_TOKEN_HERE
 * 4. Events: Select entry.* and media.* events
 */

// Simple in-memory rate limiter (replace with Redis in production if needed)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // max requests per window

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old rate limit entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, RATE_LIMIT_WINDOW);
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 1. Rate limiting
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(clientIp)) {
      console.warn(`[revalidate] Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { message: 'Too many requests' },
        { status: 429 }
      );
    }

    // 2. Authenticate the request with constant-time comparison
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      console.warn(`[revalidate] Missing auth header from IP: ${clientIp}`);
      return NextResponse.json(
        { message: 'Missing authorization header' },
        { status: 401 }
      );
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    
    if (!envServer.WEBHOOK_AUTH_TOKEN) {
      console.error('[revalidate] WEBHOOK_AUTH_TOKEN not configured');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Use constant-time comparison to prevent timing attacks
    const expectedToken = envServer.WEBHOOK_AUTH_TOKEN;
    const isValid = token.length === expectedToken.length &&
                    crypto.timingSafeEqual(
                      Buffer.from(token),
                      Buffer.from(expectedToken)
                    );

    if (!isValid) {
      console.warn(`[revalidate] Invalid token from IP: ${clientIp}`);
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // 3. Parse and validate webhook payload
    type StrapiWebhookPayload = {
      event: string;
      model: string;
      entry?: {
        slug?: string;
        locale?: string;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };

    // Read and validate request body
    const bodyText = await request.text();
    
    if (!bodyText || bodyText.trim() === '') {
      return NextResponse.json(
        { 
          message: 'Empty request body',
          expected: 'JSON payload with event and model fields',
          example: {
            event: 'entry.update',
            model: 'api::page.page',
            entry: { slug: 'home', locale: 'en' }
          }
        },
        { status: 400 }
      );
    }

    let rawPayload: unknown;
    try {
      rawPayload = JSON.parse(bodyText);
    } catch (error: unknown) {
      console.error('[revalidate] Invalid JSON payload', error);
      return NextResponse.json(
        { 
          message: 'Invalid JSON payload',
          received: bodyText.substring(0, 100)
        },
        { status: 400 }
      );
    }

    // Type guard to validate payload structure
    if (!rawPayload || typeof rawPayload !== 'object') {
      return NextResponse.json(
        { message: 'Invalid payload structure' },
        { status: 400 }
      );
    }

    const payload = rawPayload as Record<string, unknown>;
    const { event, model, entry } = payload;

    // Validate required fields
    if (!event || typeof event !== 'string') {
      return NextResponse.json(
        { message: 'Missing or invalid event field' },
        { status: 400 }
      );
    }

    if (!model || typeof model !== 'string') {
      return NextResponse.json(
        { message: 'Missing or invalid model field' },
        { status: 400 }
      );
    }

    console.log(`[revalidate] ✓ Authenticated webhook: ${event} for ${model}`);

    // 3. Determine what to revalidate based on the event
    const revalidated = {
      tags: [] as string[],
      paths: [] as string[],
    };

    // Revalidate based on content type
    // Note: revalidateTag uses 'max' profile, revalidatePath uses 'layout' or 'page'
    if (model === 'api::page.page') {
      // Always revalidate pages tag
      revalidateTag('pages', 'max');
      revalidated.tags.push('pages');
      
      // If we have entry details, revalidate specific page path
      if (entry && typeof entry === 'object' && 'slug' in entry && 'locale' in entry) {
        const slug = entry.slug as string;
        const locale = entry.locale as string;
        const path = `/${locale}${slug === 'home' ? '' : `/${slug}`}`;
        revalidatePath(path, 'page');
        revalidated.paths.push(path);
      }
    } else if (model === 'api::global.global') {
      // Revalidate global data (affects all pages)
      revalidateTag('global', 'max');
      revalidated.tags.push('global');
      
      // Revalidate home pages in all locales
      revalidatePath('/', 'layout');
      revalidated.paths.push('/');
    } else if (model === 'api::logo.logo') {
      // Revalidate pages that use logos
      revalidateTag('logos', 'max');
      revalidated.tags.push('logos');
    } else if (model === 'api::faq.faq') {
      // Revalidate FAQ data
      revalidateTag('faqs', 'max');
      revalidated.tags.push('faqs');
    } else if (event?.startsWith('media.')) {
      // Media changed - revalidate all pages to be safe
      revalidatePath('/', 'layout');
      revalidated.paths.push('/ (layout)');
    }

    const duration = Date.now() - startTime;
    console.log(`[revalidate] ✓ Success in ${duration}ms:`, revalidated);

    return NextResponse.json({
      success: true,
      revalidated: true,
      ...revalidated,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[revalidate] ✗ Error after ${duration}ms:`, error);
    
    // Don't leak error details in production
    const message = process.env.NODE_ENV === 'production' 
      ? 'Internal server error'
      : error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        success: false,
        message,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Health check endpoint (dev only)
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  return NextResponse.json({
    status: 'ok',
    endpoint: 'Revalidate webhook',
    configured: !!envServer.WEBHOOK_AUTH_TOKEN,
    rateLimitActive: rateLimitMap.size > 0,
    usage: {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer <your-token>',
        'Content-Type': 'application/json'
      },
      body: {
        event: 'entry.update | entry.create | etc.',
        model: 'api::page.page | api::global.global | etc.',
        entry: { slug: 'home', locale: 'en' }
      }
    }
  });
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
