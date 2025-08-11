import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ShoppingCart, ArrowLeft,MessageSquare, Phone , Instagram } from "lucide-react";
import { useCart } from '../context/Cartcontext';
import { useState, useEffect, useRef } from 'react';
import { fetchProductById, type Product } from '@/api/serviceProducts';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { submitOrder } from '@/api/serviceOrders';
import { useTranslation } from "react-i18next";
import { Footer } from "./Footer";

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
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const imgRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const loadProduct = async () => {
      try {
        if (!id) {
          setError(t('product.idRequired'));
          return;
        }
        
        const data = await fetchProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError(t('product.notFound'));
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, t]);

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
    toast.success(t('product.addedToCart'));
  };

  const handleOrderNow = async () => {
    if (!product) return;
    
    // Check if user data exists
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData || !JSON.parse(storedUserData).name) {
      setShowOrderForm(true);
      return;
    }
    
    await proceedWithOrder();
  };

  const proceedWithOrder = async () => {
    if (!product) return;
    
    try {
      await submitOrder({
        productname: product.name,
        id: product.id.toString(),
        price: product.price,
        quantity: quantity || 1,
      });
      toast.success(t('product.orderPlaced'));
    } catch (error) {
      toast.error(t('errors.orderFailed'));
    }
  };

  const handleUserDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!userData.name || !userData.phone) {
      toast.error(t('errors.missingFields'));
      return;
    }
    
    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    setShowOrderForm(false);
    proceedWithOrder();
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">{t('product.loading')}</div>;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold">{t('product.notFound')}</h2>
        <p className="text-gray-500 mt-2">{t('product.notFoundDescription')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-8 relative">
        {/* Floating Social Icons */}
        <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/213541779717" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors animate-float"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="h-6 w-6" />
          </a>
          
          {/* Facebook Messenger Button */}
          <a
            href="https://m.me/100069071041741"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors animate-float delay-100"
            aria-label="Chat on Facebook"
          >
            <MessageSquare className="h-6 w-6" />
          </a>
          
          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/hamza_hvmc"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-colors animate-float delay-200"
            aria-label="Visit Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          
          {/* Phone Call Button */}
          <a
            href="tel:+213541779717"
            className="bg-[#d6b66d] text-black p-3 rounded-full shadow-lg hover:bg-[#c9a95d] transition-colors animate-float delay-300"
            aria-label="Call us"
          >
            <Phone className="h-6 w-6" />
          </a>
        </div>

        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          {t('product.back')}
        </Button>
        
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
                {t('product.addToCart')}
              </Button>
              
              <Button 
                className="gap-2 flex-1 bg-[#d6b66d] hover:bg-[#c9a95d] text-black"
                onClick={handleOrderNow}
              >
                {t('product.orderNow')}
              </Button>
            </div>
          </div>
        </div>

        {/* Order Form Modal */}
        {showOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">{t('orderForm.title')}</h2>
              <p className="mb-4 text-gray-600">{t('orderForm.description')}</p>
              
              <form onSubmit={handleUserDataSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      {t('orderForm.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      {t('orderForm.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      {t('orderForm.phone')} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowOrderForm(false)}
                  >
                    {t('orderForm.cancel')}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#d6b66d] hover:bg-[#c9a95d] text-black"
                  >
                    {t('orderForm.submitOrder')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};