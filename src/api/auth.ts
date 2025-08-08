import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Essential for CSRF
});

// Enhanced request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Ensure CSRF token is included for Django
  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
    config.headers['X-CSRFToken'] = getCSRFToken(); // You'll need to implement this
  }
  
  return config;
});

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newToken = await authService.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        authService.logout();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper function to get CSRF token
function getCSRFToken() {
  // This matches Django's CSRF cookie name
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
    
  return cookieValue || '';
}
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