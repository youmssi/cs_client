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

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
