/**
 * Client-side only environment variables
 * These variables are available in the browser
 * Only import this file in client-side code (components, hooks, etc.)
 */

function getClientEnv(name: string, required = false): string {
  const value = process.env[name];
  if (required && !value) {
    console.error(`[Required client env] is missing: ${name}`);
    throw new Error(`Missing required client environment variable: ${name}`);
  }
  return value || '';
}

export const envClient = {
  NEXT_PUBLIC_CMS_API_URL: getClientEnv('NEXT_PUBLIC_CMS_API_URL', false),
  NEXT_PUBLIC_STRAPI_URL: getClientEnv('NEXT_PUBLIC_STRAPI_API_URL', false),
};
