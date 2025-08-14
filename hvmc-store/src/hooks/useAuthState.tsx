import { useState, useEffect } from 'react';
import { authService } from '@/api/auth';

export const useAuthState = () => {
  const [user, setUser] = useState<{ 
    name: string; 
    email: string;
    wilaya?: string;
    address?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          setUser({ 
            name: userData.name || 'User',
            email: userData.email || '',
            wilaya: userData.wilaya,
            address: userData.address
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
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    setUser({ 
      name: userData.name || 'User',
      email: credentials.email,
      wilaya: userData.wilaya,
      address: userData.address
    });
    return response;
  };

  const register = async (userData: { 
    name: string; 
    phone: string; 
    email: string; 
    password: string;
    wilaya: string;
    address: string;
  }) => {
    const response = await authService.register(userData);
    setUser({ 
      name: userData.name,
      email: userData.email,
      wilaya: userData.wilaya,
      address: userData.address
    });
    localStorage.setItem('userData', JSON.stringify({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      wilaya: userData.wilaya,
      address: userData.address
    }));
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('userData');
  };

  return { user, loading, login, register, logout };
};