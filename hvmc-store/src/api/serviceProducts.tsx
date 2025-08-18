// src/services/serviceProducts.tsx
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/fr/api';
export interface ProductImage {
  id: number;
  image: string;
  order: number;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  is_available: boolean;
  created_at: string;
  image: string;  // Main image (fallback)
  images: ProductImage[];
  category: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/catalog/products/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`${API_URL}/catalog/products/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};



export const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/catalog/categories/${categoryId}/products/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};