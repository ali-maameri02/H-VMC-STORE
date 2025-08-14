import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cartcontext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  is_available?: boolean;
  created_at?: string;
  category?: string;
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { t } = useTranslation(); // Removed namespace specification
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation when clicking button
    if (!product) return;
    
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: `${product.price} DA`,
      image: product.image,
      quantity: 1
    });
    toast.success(t('cart.added'), {
      description: t('cart.addedDescription'),
      action: {
        label: t('cart.viewCart'),
        onClick: () => navigate('/cart')
      },
      style: {
        background: '#4BB543',
        color: 'white'
      }
    });  };

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
          <div className="but flex justify-center items-center">
            <Button 
              variant="outline" 
              className="gap-2 flex-1 text-white bg-black hover:bg-[#d6b66d] hover:text-black cursor-pointer"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              {t('product.addToCart')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};