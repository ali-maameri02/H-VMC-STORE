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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const showProductSuccessAlert = () => {
    toast.custom((toastId) => (
      <div className="bg-white rounded-lg shadow-xl p-4 border border-green-300 max-w-md">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">{t('order.successTitle')}</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p>{t('order.successMessage', { product: product?.name })}</p>
              <p className="mt-1">{t('order.successContact')}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-600 focus:outline-none"
                onClick={() => toast.dismiss(toastId)}
              >
                {t('common.ok')}
              </button>
              <a 
                href="https://wa.me/213541779717" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-[#128C7E] focus:outline-none"
                onClick={() => toast.dismiss(toastId)}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    ), {
      duration: 10000
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: `${product.price} DA`,
      image: product.image,
      quantity: 1
    });

    // Show both the small success toast and the detailed alert
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
    });

    // Show the detailed alert after a short delay
    setTimeout(showProductSuccessAlert, 500);
  };

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