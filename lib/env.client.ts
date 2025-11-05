/**
 * Client-side only environment variables
 * These variables are available in the browser
 * Only import this file in client-side code (components, hooks, etc.)
 */

import { EnvVarConfig, EnvVarType, validateEnvVar } from "./env.server";


const clientEnvs: EnvVarConfig[] = [
    {
        name: 'NEXT_PUBLIC_CMS_API_URL',
        value: process.env.NEXT_PUBLIC_CMS_API_URL,
        type: EnvVarType.OPTIONAL_CLIENT,
    },
]


export const envClient = {
  NEXT_PUBLIC_CMS_API_URL: validateEnvVar(clientEnvs[0]),
};
