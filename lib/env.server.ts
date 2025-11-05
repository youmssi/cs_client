/**
 * Server-side only environment variables
 * These variables are NOT available in the browser
 * Only import this file in server-side code (actions, API routes, server components)
 */

export enum EnvVarType {
    REQUIRED_CLIENT = 'Required client env',
    OPTIONAL_CLIENT = 'Optional client env',
    REQUIRED_SERVER = 'Required server env',
    OPTIONAL_SERVER = 'Optional server env',
}
export interface EnvVarConfig {
    name: string;
    value?: string;
    type: EnvVarType;
}

const serversEnvs: EnvVarConfig[] = [
    {
        name: 'STRAPI_API_URL',
        value: process.env.STRAPI_API_URL,
        type: EnvVarType.REQUIRED_SERVER,
    },
    {
        name: 'NODE_ENV',
        value: process.env.NODE_ENV,
        type: EnvVarType.REQUIRED_SERVER,
    },
    {
        name: 'STRAPI_API_TOKEN',
        value: process.env.STRAPI_API_TOKEN,
        type: EnvVarType.OPTIONAL_SERVER,
    },
    {
        name: 'WEBHOOK_SECRET',
        value: process.env.WEBHOOK_SECRET,
        type: EnvVarType.OPTIONAL_SERVER,
    },
]

export function validateEnvVar(env: EnvVarConfig): string {
  if (!env.value && env.type === EnvVarType.REQUIRED_SERVER || env.type === EnvVarType.REQUIRED_CLIENT) {
    console.error(`[${env.type}] is missing: ${env.name}`);
    throw new Error(`Missing required environment variable: ${env.name}`);
  }
  return env.value!;
}


export const envServer = {
  STRAPI_API_URL: validateEnvVar(serversEnvs[0]),
  NODE_ENV: validateEnvVar(serversEnvs[1]),
  STRAPI_API_TOKEN: validateEnvVar(serversEnvs[2]),
  WEBHOOK_SECRET: validateEnvVar(serversEnvs[3]),
};