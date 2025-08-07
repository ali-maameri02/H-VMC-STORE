import { apiClient } from './auth';

export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

export const catalogService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get('/catalog/categories/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getCategoryById(id: number): Promise<Category> {
    const response = await apiClient.get(`/catalog/categories/${id}/`);
    return response.data;
  }
};