// API service layer
import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type { ApiResponse } from '../../shared/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.status, error.response.data);

      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          console.error('Unauthorized access');
          break;
        case 403:
          console.error('Forbidden access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API request failed');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network error - no response received');
    } else {
      // Error setting up request
      console.error('Request setup error:', error.message);
    }
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(url, { params });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async post<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async put<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async patch<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<T>(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Update base URL if needed
  setBaseURL(url: string) {
    this.client.defaults.baseURL = url;
  }

  // Update timeout if needed
  setTimeout(timeout: number) {
    this.client.defaults.timeout = timeout;
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export specific API endpoints
export const goalsApi = {
  getAll: () => apiService.get('/goals'),
  getById: (id: string) => apiService.get(`/goals/${id}`),
  create: (data: unknown) => apiService.post('/goals', data),
  update: (id: string, data: unknown) => apiService.put(`/goals/${id}`, data),
  delete: (id: string) => apiService.delete(`/goals/${id}`),
};

export const analyticsApi = {
  getStats: () => apiService.get('/analytics/stats'),
  getProgress: (period: string) => apiService.get(`/analytics/progress/${period}`),
};
