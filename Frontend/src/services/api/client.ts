import { ApiResponse, ApiError } from '../../types/api.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export class HttpClient {
  private static token: string | null = null;

  public static setAuthToken(token: string | null): void {
    HttpClient.token = token;
  }

  private static getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (HttpClient.token) {
      headers['Authorization'] = `Bearer ${HttpClient.token}`;
    }

    return headers;
  }

  public static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...HttpClient.getHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        let errorData: Partial<ApiError> = {};
        try {
          errorData = await response.json();
        } catch {
          // Si no es JSON, capturar statusText
        }

        const error: ApiError = {
          status: response.status,
          message: errorData.message || response.statusText || 'Error en la petición HTTP',
          code: errorData.code,
          details: errorData.details,
        };
        throw error;
      }

      // Si es 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      const body: ApiResponse<T> | T = await response.json();
      
      // Compatibilidad si el backend envuelve en { success, data } o devuelve directo T
      if (body && typeof body === 'object' && 'data' in body && 'success' in body) {
        return (body as ApiResponse<T>).data;
      }

      return body as T;
    } catch (err: unknown) {
      if ((err as ApiError).status) {
        throw err;
      }
      throw {
        status: 0,
        message: err instanceof Error ? err.message : 'Error de conexión de red',
      } as ApiError;
    }
  }

  public static get<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
    return HttpClient.request<T>(endpoint, { method: 'GET', signal });
  }

  public static post<T>(endpoint: string, body: unknown, signal?: AbortSignal): Promise<T> {
    return HttpClient.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      signal,
    });
  }
}
