/**
 * Server-side only environment variables
 * These variables are NOT available in the browser
 * Only import this file in server-side code (actions, API routes, server components)
 */

interface ServerEnvConfig {
  STRAPI_API_URL: string;
  NODE_ENV: string;
  STRAPI_API_TOKEN?: string;
  WEBHOOK_SECRET?: string;
}

function validateEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    console.error(`[SERVER ENV] Missing required environment variable: ${name}`);
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getOptionalEnvVar(name: string, value: string | undefined): string | undefined {
  if (!value) {
    console.warn(`[SERVER ENV] Optional environment variable not set: ${name}`);
    return undefined;
  }
  return value;
}

/**
 * Server-side environment variables (NOT available in browser)
 * Use for: ISR data fetching, API routes, webhooks, server components
 */
export const env: ServerEnvConfig = {
  STRAPI_API_URL: validateEnvVar(
    'STRAPI_API_URL',
    process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.STRAPI_API_URL
  ),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  STRAPI_API_TOKEN: getOptionalEnvVar('STRAPI_API_TOKEN', process.env.STRAPI_API_TOKEN),
  WEBHOOK_SECRET: getOptionalEnvVar('WEBHOOK_SECRET', process.env.WEBHOOK_SECRET),
};
