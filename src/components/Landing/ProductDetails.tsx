import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from '../context/Cartcontext';
import { useState, useEffect, useRef } from 'react';
import { fetchProductById, type Product } from '@/api/serviceProducts';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { submitOrder } from '@/api/serviceOrders';

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const [showZoom, setShowZoom] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) {
          setError('Product ID is required');
          return;
        }
        
        const data = await fetchProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setCursorPos({ x, y });
    
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
      transform: 'scale(1.2)',
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: `${product.price} DA`,
      image: product.image,
      quantity: quantity
    });
  };

  const handleOrderNow = async () => {
    if (!product) return;
    
    await submitOrder({
      productname: product.name,
      id: product.id.toString(),
      price: product.price,
      quantity: quantity || 1,
    });
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="text-gray-500 mt-2">The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image with Zoom */}
        <div 
          className="relative rounded-lg overflow-hidden bg-white"
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            ref={imgRef}
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover cursor-crosshair"
          />
          
          {/* Zoom Lens */}
          {showZoom && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${imgRef.current?.offsetWidth ? imgRef.current.offsetWidth * 2 : 0}px ${imgRef.current?.offsetHeight ? imgRef.current.offsetHeight * 2 : 0}px`,
                ...zoomStyle
              }}
            />
          )}
          
          {/* Magnifying Glass (optional) */}
          {showZoom && (
            <div 
              ref={zoomRef}
              className="absolute hidden md:block w-32 h-32 rounded-full border-2 border-white bg-white bg-opacity-30 pointer-events-none"
              style={{
                left: `${cursorPos.x}%`,
                top: `${cursorPos.y}%`,
                transform: 'translate(-50%, -50%)',
                backgroundImage: `url(${product.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${imgRef.current?.offsetWidth ? imgRef.current.offsetWidth * 2 : 0}px ${imgRef.current?.offsetHeight ? imgRef.current.offsetHeight * 2 : 0}px`,
                backgroundPosition: `${cursorPos.x}% ${cursorPos.y}%`,
              }}
            />
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-white text-2xl font-bold">{product.price} DA</p>
          <p className="text-sm text-[#d6b66d]">{product.category.name}</p>
          
          {product.description && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Button 
                variant="ghost" 
                className="h-10 w-10"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                className="h-10 w-10"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              className="gap-2 flex-1 text-black"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </Button>
            
            <Button 
              className="gap-2 flex-1 bg-[#d6b66d] hover:bg-[#c9a95d] text-black"
              onClick={handleOrderNow}
            >
              Commander maintenant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};