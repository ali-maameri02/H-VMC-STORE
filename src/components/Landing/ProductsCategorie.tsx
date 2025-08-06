// components/Landing/ProductsPage.tsx
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { products } from './products';
import { Button } from '../ui/button';

export const ProductsCategorie = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  // Decode category name from URL
  const categoryName = categoryParam 
    ? decodeURIComponent(categoryParam).replace(/-/g, ' ')
    : null;

  // Filter products by category if specified
  const filteredProducts = categoryName
    ? products.filter(product => 
        product.category.toLowerCase() === categoryName.toLowerCase())
    : products;

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">
        {categoryName || 'Tous nos produits'}
      </h1>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">Aucun produit trouvé</h2>
          <p className="text-gray-500 mb-6">
            {categoryName 
              ? `Nous n'avons pas de produits dans la catégorie "${categoryName}"`
              : 'Aucun produit disponible pour le moment'}
          </p>
          <Button asChild>
            <Link to="/">Voir toutes les catégories</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} // Make sure this matches the interface
            />
          ))}
        </div>
      )}
    </div>
  );
};