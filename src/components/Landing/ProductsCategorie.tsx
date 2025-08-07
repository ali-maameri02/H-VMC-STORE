// src/components/Landing/ProductsCategorie.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ProductCard } from './ProductCard';
import { fetchProductsByCategory, type Product } from '@/api/serviceProducts';
import { catalogService, type Category } from '@/api/catalog';
import { Skeleton } from '../ui/skeleton';
import { useTranslation } from 'react-i18next';

export const ProductsCategorie = () => {
  const { t } = useTranslation();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!categoryId) {
          throw new Error('Category ID is required');
        }
        
        const id = Number(categoryId);
        const [categoryData, productsData] = await Promise.all([
          catalogService.getCategoryById(id),
          fetchProductsByCategory(id)
        ]);
        
        setCategory(categoryData);
        setProducts(productsData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(t('errors.categoryProducts'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId, t]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24">
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('errors.loadingFailed')}</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <Button asChild>
          <Link to="/">{t('actions.backToHome')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">
        {category?.name || t('titles.categoryProducts')}
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">{t('messages.noProducts')}</h2>
          <p className="text-gray-500 mb-6">
            {category 
              ? t('messages.noProductsInCategory', { category: category.name })
              : t('messages.noProductsAvailable')}
          </p>
          <Button asChild>
            <Link to="/categories">{t('actions.browseCategories')}</Link>
          </Button>
        </div>
      ) : (
        <>
          {category?.description && (
            <p className="text-gray-400 mb-8 max-w-3xl">
              {category.description}
            </p>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
  <ProductCard 
    key={product.id.toString()}
    product={{
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      // Only include properties that ProductCard expects
    }}
  />
))}
          </div>
        </>
      )}
    </div>
  );
};