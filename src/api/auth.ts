import axios from 'axios';

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to inject the token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async register(userData: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) {
    return apiClient.post('/accounts/register/', userData);
  },

  async login(credentials: {
    email: string;
    password: string;
  }) {
    const response = await apiClient.post('/accounts/login/', credentials);
    // Save tokens to localStorage
    if (response.data?.access && response.data?.refresh) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
    }
    return response;
  },

  async logout() {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return apiClient.post('/accounts/logout/');
  },

  // Add token refresh method if needed
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');
    
    const response = await apiClient.post('/accounts/token/refresh/', {
      refresh: refreshToken
    });
    
    if (response.data?.access) {
      localStorage.setItem('accessToken', response.data.access);
    }
    return response;
  }
};