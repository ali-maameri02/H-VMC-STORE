// ProductCard.tsx
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";

// src/components/ProductCard.tsx
type Product = {
  
    id: string;
    name: string;
    price: string;
    image: string;
    description?: string;
    is_available?: boolean;
    created_at?: string;
    category?: string; // Or use the proper category interface if needed
  
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 shadow-none border-0 group cursor-pointer pt-0"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div className="aspect-[3/4] overflow-hidden rounded-t-lg bg-gray-100">
          <img 
            src={product.image} 
            alt={`${product.name} - ${product.category}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-base line-clamp-2">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{product.category}</p>
          <p className="font-bold mt-2 text-primary">{product.price} DA</p>
        </div>
      </CardContent>
    </Card>
  );
};