import { Search, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import logo from '@/assets/7-removebg-preview.png';
import { useCart } from '../context/Cartcontext';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AuthModal } from "./AuthModal";
import { useState } from "react";

export const Header = () => {
  const { cartCount, cartItems } = useCart();
  const location = useLocation(); // Get current route location
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };


  // SVG flags as React components
  const FrenchFlag = () => (
    <svg viewBox="0 0 36 24" className="h-5 w-5">
      <rect width="12" height="24" x="0" fill="#ED2939" />
      <rect width="12" height="24" x="12" fill="#fff" />
      <rect width="12" height="24" x="24" fill="#002395" />
    </svg>
  );

  const AlgerianFlag = () => (
    <svg viewBox="0 0 36 24" className="h-5 w-5">
      <rect width="36" height="24" fill="#fff" />
      <rect width="18" height="24" fill="#006233" />
      <path 
        d="M18 15.5a5.5 5.5 0 1 1 0-7 4.5 4.5 0 1 0 0 7z" 
        fill="#d21034"
      />
      <path 
        d="M19.5 9l1 2h2l-1.6 1.2.6 2-1.6-1.2-1.6 1.2.6-2L16.5 11h2z" 
        fill="#d21034"
      />
    </svg>
  );

  return (
    <header className="bg-gradient-to-r from-black via-black to-zinc-900 text-white fixed w-full top-0 z-50 shadow-lg">
      {/* Top Navigation Bar */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={logo} 
              className="h-16 w-16 object-contain" 
              alt="H-VMC Logo" 
            />
            <span className="font-light text-sm hidden md:block text-zinc-300">
              Fournisseur de matériel professionnel pour salons de coiffure
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Shopping Cart with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative h-10 w-10 rounded-full hover:text-[#d6b66d]"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5 " />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-transparent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center hover:text-[#d6b66d]">
                    {cartCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-72 p-4 bg-zinc-900 border-zinc-700 text-white"
            >
              {cartCount === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm">Votre panier est vide</p>
                </div>
              ) : (
                <>
                  <h3 className="font-semibold mb-2">Votre Panier ({cartCount})</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-zinc-400">
                            {item.quantity} × {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-700">
                    <Button asChild className="w-full" size="sm">
                      <Link to="/cart">
                        Voir le panier
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
        <Button variant="outline" className="text-black cursor-pointer" onClick={() => setIsAuthModalOpen(true)}>
          Login
        </Button>
      </div>
          {/* Language Switcher */}
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-white/10"
              aria-label="Change language"
            >
              {i18n.language === 'ar' ? <AlgerianFlag /> : <FrenchFlag />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-40 bg-zinc-900 border-zinc-700 text-white"
          >
            <DropdownMenuItem 
              className="flex items-center gap-2 hover:bg-zinc-800"
              onClick={() => changeLanguage('fr')}
            >
              <FrenchFlag />
              <span>Français</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-center gap-2 hover:bg-zinc-800"
              onClick={() => changeLanguage('ar')}
            >
              <AlgerianFlag />
              <span>العربية</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>

      {/* Hero Section - Only on homepage */}
      {location.pathname === '/' && (
        <div className="container mx-auto px-4 py-12 flex flex-col items-center mt-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
            H-VMC
          </h1>
          <p className="text-lg md:text-xl mb-8 text-center max-w-2xl text-zinc-300">
            Qualité – Confiance – Innovation – Élégance professionnelle
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input
              type="search"
              placeholder="Rechercher des équipements professionnels..."
              className="pl-10 py-6 rounded-full bg-zinc-100 border-0 focus-visible:ring-2 focus-visible:ring-primary/50 text-black"
            />
          </div>

          <AuthModal
        open={isAuthModalOpen}
        onOpenChange={setIsAuthModalOpen}
      />
        </div>
      )}
    </header>
  );
};