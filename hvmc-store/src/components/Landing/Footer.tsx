import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import logo from '@/assets/7-removebg-preview.png';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-black via-black to-zinc-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logo} 
                className="h-12 w-12 object-contain" 
                alt="H-VMC Logo" 
              />
              <span className="text-xl font-light text-[#d6b66d]">
                {t('header.title')}
              </span>
            </Link>
            <p className="text-zinc-300 text-sm max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/hamza_hvmc?igsh=aDRmYmIyZXB6ZTl3" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-[#d6b66d] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/share/17DL6zLgMj/?mibextid=wwXIfr" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-[#d6b66d] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#d6b66d]">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-zinc-300 hover:text-[#d6b66d] text-sm transition-colors block py-1">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-zinc-300 hover:text-[#d6b66d] text-sm transition-colors block py-1">
                  {t('footer.products')}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-zinc-300 hover:text-[#d6b66d] text-sm transition-colors block py-1">
                  {t('footer.cart')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#d6b66d]">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-zinc-300 text-sm">
                <Phone className="h-4 w-4 text-[#d6b66d] mt-0.5 flex-shrink-0" />
                <a href="tel:+213541779717" className="hover:text-[#d6b66d] transition-colors">
                  +213 541 779 717
                </a>
              </li>
              <li className="flex items-start gap-2 text-zinc-300 text-sm">
                <Mail className="h-4 w-4 text-[#d6b66d] mt-0.5 flex-shrink-0" />
                <a href="mailto:H.vmcoif@gmail.com" className="hover:text-[#d6b66d] transition-colors">
                  H.vmcoif@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-zinc-300 text-sm">
                <MapPin className="h-4 w-4 text-[#d6b66d] mt-0.5 flex-shrink-0" />
                <span>Amirouche rue, Algiers, Algeria</span>
              </li>
            </ul>
          </div>

     
        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-zinc-400 hover:text-[#d6b66d] text-xs transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-zinc-400 hover:text-[#d6b66d] text-xs transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};