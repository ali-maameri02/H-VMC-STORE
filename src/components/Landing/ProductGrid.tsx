// src/components/ProductGrid.tsx
import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { fetchProducts } from '@/api/serviceProducts';
import { type Product } from '@/api/serviceProducts';

export const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div className="px-4 py-8 text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="px-4 py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <section className="container px-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      
      {products.map((product) => (
        <ProductCard key={product.id} product={{
          id: product.id.toString(),
          name: product.name,
          category: product.category.name,
          price: `${product.price} `,
          image: product.image,
          description: product.description
        }} />
        
      ))}
    </section>
  );
};