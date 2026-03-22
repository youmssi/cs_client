/**
 * Client-side only environment variables
 * These variables are available in the browser
 * Only import this file in client-side code (components, hooks, etc.)
 */

function getClientEnv(value: string | undefined, name: string, required = false): string {
  if (required && !value) {
    console.error(`[Required client env] is missing: ${name}`);
    throw new Error(`Missing required client environment variable: ${name}`);
  }
  return value || '';
}

export const envClient = {
  NEXT_PUBLIC_CMS_URL: getClientEnv(process.env.NEXT_PUBLIC_CMS_URL, 'NEXT_PUBLIC_CMS_URL', false),
  NEXT_PUBLIC_FORMBRICKS_ENV_ID: getClientEnv(process.env.NEXT_PUBLIC_FORMBRICKS_ENV_ID, 'NEXT_PUBLIC_FORMBRICKS_ENV_ID', false),
  NEXT_PUBLIC_FORMBRICKS_APP_URL: getClientEnv(process.env.NEXT_PUBLIC_FORMBRICKS_APP_URL, 'NEXT_PUBLIC_FORMBRICKS_APP_URL', false),
  NEXT_PUBLIC_FORMBRICKS_SURVEY_BOOK_A_CALL: getClientEnv(process.env.NEXT_PUBLIC_FORMBRICKS_SURVEY_BOOK_A_CALL, 'NEXT_PUBLIC_FORMBRICKS_SURVEY_BOOK_A_CALL', false),
  NEXT_PUBLIC_FORMBRICKS_SURVEY_CUSTOM_PROJECT: getClientEnv(process.env.NEXT_PUBLIC_FORMBRICKS_SURVEY_CUSTOM_PROJECT, 'NEXT_PUBLIC_FORMBRICKS_SURVEY_CUSTOM_PROJECT', false),
};
