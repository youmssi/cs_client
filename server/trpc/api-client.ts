import { TRPCError } from './init';

class ApiClient {
  private readonly baseURL: string;
  private readonly token?: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    this.token = process.env.STRAPI_API_TOKEN;
  }

  async get<T>(endpoint: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers,
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        const code = this.getErrorCode(response.status);
        throw new TRPCError({
          code,
          message: `Failed to fetch from Strapi: ${response.statusText}`,
          cause: {
            status: response.status,
            statusText: response.statusText,
            endpoint,
          },
        });
      }

      return response.json();
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        cause: error,
      });
    }
  }

  private getErrorCode(status: number): 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR' {
    switch (status) {
      case 400:
        return 'BAD_REQUEST';
      case 401:
        return 'UNAUTHORIZED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }
}

export const apiClient = new ApiClient();
