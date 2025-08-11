import { useState, useEffect } from 'react';
import { authService } from '@/api/auth';

export const useAuthState = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          // You might want to add an endpoint to fetch user data
          // For now, we'll just check if token exists
          setUser({ 
            name: localStorage.getItem('userName') || 'User',
            email: localStorage.getItem('userEmail') || ''
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await authService.login(credentials);
    setUser({ 
      name: response.data.user?.name || 'User',
      email: credentials.email
    });
    localStorage.setItem('userName', response.data.user?.name || 'User');
    localStorage.setItem('userEmail', credentials.email);
    return response;
  };

  const register = async (userData: { 
    name: string; 
    phone: string; 
    email: string; 
    password: string 
  }) => {
    const response = await authService.register(userData);
    setUser({ 
      name: userData.name,
      email: userData.email
    });
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  };

  return { user, loading, login, register, logout };
};