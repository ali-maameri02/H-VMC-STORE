import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ShoppingCart, ArrowLeft, MessageSquare, Phone, Instagram } from "lucide-react";
import { useCart } from '../context/Cartcontext';
import { useState, useEffect, useRef } from 'react';
import { fetchProductById, type Product } from '@/api/serviceProducts';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { submitOrder } from '@/api/serviceOrders';
import { useTranslation } from "react-i18next";
import { Footer } from "./Footer";
import { FaTiktok } from 'react-icons/fa';

interface UserData {
  name: string;
  email: string;
  phone: string;
  wilaya?: string;
  address?: string;
}

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
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    wilaya: '',
    address: ''
  });
  const imgRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
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

 // [Previous imports remain the same...]

 const showProductSuccessAlert = () => {
  toast.custom((_toastId) => ( // Changed parameter name from 't' to 'toastId' to avoid conflict
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
          <div className=" flex flex-col gap-3">
  <a 
    href="https://wa.me/213541779717" 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors animate-float"
    aria-label="Chat on WhatsApp"
  >
    <MessageSquare className="h-6 w-6" />
  </a>
  
  <a
    href="https://m.me/100069071041741"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors animate-float delay-100"
    aria-label="Chat on Facebook"
  >
    <MessageSquare className="h-6 w-6" />
  </a>
  
  <a
    href="https://www.instagram.com/hamza_hvmc"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-colors animate-float delay-200"
    aria-label="Visit Instagram"
  >
    <Instagram className="h-6 w-6" />
  </a>

  {/* Add TikTok link here */}
  <a
  href="https://www.tiktok.com/@your_tiktok_username"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors animate-float delay-300"
  aria-label="Visit TikTok"
>
  <FaTiktok className="h-6 w-6" />
</a>
  <a
    href="tel:+213541779717"
    className="bg-[#d6b66d] text-black p-3 rounded-full shadow-lg hover:bg-[#c9a95d] transition-colors animate-float delay-400"
    aria-label="Call us"
  >
    <Phone className="h-6 w-6" />
  </a>
</div>
        </div>
      </div>
    </div>
  ), {
    duration: 10000
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
};


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



  const handleOrderNow = async () => {
    if (!product) return;
    
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
        wilaya: userData.wilaya
      });
      showProductSuccessAlert();
    } catch (error) {
      toast.error(t('errors.orderFailed'), {
        description: 'Une erreur est survenue lors de la soumission de votre commande.',
        style: {
          background: '#FF3333',
          color: 'white'
        }
      });
    }
  };

  const handleUserDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData.name || !userData.phone || !userData.wilaya) {
      toast.error(t('errors.missingFields'), {
        description: 'Veuillez remplir tous les champs obligatoires.',
        style: {
          background: '#FF3333',
          color: 'white'
        }
      });
      return;
    }
    
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
        <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
          <a 
            href="https://wa.me/213541779717" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors animate-float"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="h-6 w-6" />
          </a>
          
          <a
            href="https://m.me/100069071041741"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors animate-float delay-100"
            aria-label="Chat on Facebook"
          >
            <MessageSquare className="h-6 w-6" />
          </a>
          
          <a
            href="https://www.instagram.com/hamza_hvmc"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-colors animate-float delay-200"
            aria-label="Visit Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
  href="https://www.tiktok.com/@hamza_hvmc?_t=ZS-8yxWaAzR9g8&_r=1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors animate-float delay-300"
  aria-label="Visit TikTok"
>
  <FaTiktok className="h-6 w-6" />
</a>
          
          <a
            href="tel:+213541779717"
            className="bg-[#d6b66d] text-black p-3 rounded-full shadow-lg hover:bg-[#c9a95d] transition-colors animate-float delay-300"
            aria-label="Call us"
          >
            <Phone className="h-6 w-6" />
          </a>
        </div>

        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          {t('product.back')}
        </Button>
        
        <div className="grid md:grid-cols-2 gap-8">
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

        {showOrderForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Informations de contact</h2>
      <p className="mb-4 text-gray-600">Veuillez fournir vos informations pour finaliser la commande</p>
      
      <form onSubmit={handleUserDataSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Nom complet *
            </label>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 bg-white"
              required
            />
          </div>
          
          <div>
            <label htmlFor="wilaya" className="block text-sm font-medium text-gray-900">
              Wilaya *
            </label>
            <select
              id="wilaya"
              value={userData.wilaya || ''}
              onChange={(e) => setUserData({...userData, wilaya: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 bg-white"
              required
            >
              <option value="">Sélectionnez votre wilaya</option>
              <option value="Adrar">Adrar</option>
                    <option value="Chlef">Chlef</option>
                    <option value="Laghouat">Laghouat</option>
                    <option value="Oum El Bouaghi">Oum El Bouaghi</option>
                    <option value="Batna">Batna</option>
                    <option value="Béjaïa">Béjaïa</option>
                    <option value="Biskra">Biskra</option>
                    <option value="Béchar">Béchar</option>
                    <option value="Blida">Blida</option>
                    <option value="Bouira">Bouira</option>
                    <option value="Tamanrasset">Tamanrasset</option>
                    <option value="Tébessa">Tébessa</option>
                    <option value="Tlemcen">Tlemcen</option>
                    <option value="Tiaret">Tiaret</option>
                    <option value="Tizi Ouzou">Tizi Ouzou</option>
                    <option value="Alger">Alger</option>
                    <option value="Djelfa">Djelfa</option>
                    <option value="Jijel">Jijel</option>
                    <option value="Sétif">Sétif</option>
                    <option value="Saïda">Saïda</option>
                    <option value="Skikda">Skikda</option>
                    <option value="Sidi Bel Abbès">Sidi Bel Abbès</option>
                    <option value="Annaba">Annaba</option>
                    <option value="Guelma">Guelma</option>
                    <option value="Constantine">Constantine</option>
                    <option value="Médéa">Médéa</option>
                    <option value="Mostaganem">Mostaganem</option>
                    <option value="M'Sila">M'Sila</option>
                    <option value="Mascara">Mascara</option>
                    <option value="Ouargla">Ouargla</option>
                    <option value="Oran">Oran</option>
                    <option value="El Bayadh">El Bayadh</option>
                    <option value="Illizi">Illizi</option>
                    <option value="Bordj Bou Arréridj">Bordj Bou Arréridj</option>
                    <option value="Boumerdès">Boumerdès</option>
                    <option value="El Tarf">El Tarf</option>
                    <option value="Tindouf">Tindouf</option>
                    <option value="Tissemsilt">Tissemsilt</option>
                    <option value="El Oued">El Oued</option>
                    <option value="Khenchela">Khenchela</option>
                    <option value="Souk Ahras">Souk Ahras</option>
                    <option value="Tipaza">Tipaza</option>
                    <option value="Mila">Mila</option>
                    <option value="Aïn Defla">Aïn Defla</option>
                    <option value="Naâma">Naâma</option>
                    <option value="Aïn Témouchent">Aïn Témouchent</option>
                    <option value="Ghardaïa">Ghardaïa</option>
                    <option value="Relizane">Relizane</option>            </select>
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-900">
              Adresse complète
            </label>
            <textarea
              id="address"
              value={userData.address || ''}
              onChange={(e) => setUserData({...userData, address: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 bg-white"
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
              Téléphone *
            </label>
            <input
              type="tel"
              id="phone"
              value={userData.phone}
              onChange={(e) => setUserData({...userData, phone: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 bg-white"
              required
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="text-gray-900 border-gray-300 hover:bg-gray-100"
            onClick={() => setShowOrderForm(false)}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="bg-[#d6b66d] hover:bg-[#c9a95d] text-gray-900"
          >
            Confirmer la commande
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