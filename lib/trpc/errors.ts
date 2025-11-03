import { TRPCClientError } from '@trpc/client';
import type { AppRouter } from '@/server/trpc/routers/_app';

export function isTRPCClientError(
  cause: unknown
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export function getErrorMessage(error: unknown): string {
  if (isTRPCClientError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

export function getErrorCode(error: unknown): string | undefined {
  if (isTRPCClientError(error)) {
    return error.data?.code;
  }
  return undefined;
}

export function getErrorStatus(error: unknown): number | undefined {
  if (isTRPCClientError(error)) {
    return error.data?.httpStatus;
  }
  return undefined;
}

export function isErrorCode(error: unknown, code: string): boolean {
  return getErrorCode(error) === code;
}

export function formatError(error: unknown): {
  message: string;
  code?: string;
  status?: number;
} {
  return {
    message: getErrorMessage(error),
    code: getErrorCode(error),
    status: getErrorStatus(error),
  };
}

export function handleTRPCError(error: unknown): void {
  const formattedError = formatError(error);
  
  if (process.env.NODE_ENV === 'development') {
    console.error('[tRPC Error]', {
      message: formattedError.message,
      code: formattedError.code,
      status: formattedError.status,
      error,
    });
  }
}
