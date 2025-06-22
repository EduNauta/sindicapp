import { useAuthStore } from './auth-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown[];
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface LoginData {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    emailVerified: boolean;
    role: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    emailVerified: boolean;
    role: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

class ApiClient {
  private getAuthHeader(): string | null {
    const tokens = useAuthStore.getState().tokens;
    return tokens?.accessToken ? `Bearer ${tokens.accessToken}` : null;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const { tokens } = useAuthStore.getState();
      if (!tokens?.refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      if (data.success && data.data?.tokens) {
        useAuthStore.getState().updateTokens(data.data.tokens);
        return true;
      }

      throw new Error('Invalid token refresh response');
    } catch (error) {
      console.error('Token refresh failed:', error);
      useAuthStore.getState().logout();
      return false;
    }
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const authHeader = this.getAuthHeader();

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
        ...options.headers,
      },
    };

    try {
      let response = await fetch(url, config);

      // If unauthorized and we have a refresh token, try to refresh
      if (response.status === 401 && authHeader) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry request with new token
          const newAuthHeader = this.getAuthHeader();
          response = await fetch(url, {
            ...config,
            headers: {
              ...config.headers,
              ...(newAuthHeader && { Authorization: newAuthHeader }),
            },
          });
        }
      }

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(data: RegisterData): Promise<ApiResponse<RegisterResponse>> {
    return this.request<RegisterResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<ApiResponse> {
    const { tokens } = useAuthStore.getState();
    if (!tokens?.refreshToken) {
      return { success: true, message: 'Already logged out' };
    }

    return this.request('/api/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: tokens.refreshToken }),
    });
  }

  async logoutAll(): Promise<ApiResponse> {
    return this.request('/api/auth/logout-all', {
      method: 'POST',
    });
  }

  async getProfile(): Promise<ApiResponse> {
    return this.request('/api/auth/profile');
  }

  async changePassword(data: ChangePasswordData): Promise<ApiResponse> {
    return this.request('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient(); 