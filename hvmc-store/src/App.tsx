import { createBrowserRouter,  RouterProvider } from 'react-router-dom';
import { CartProvider } from './components/context/Cartcontext';
import { RootLayout } from './components/RootLayout';
import Home from './components/Landing/Home';
import { ProductDetails } from './components/Landing/ProductDetails';
import { Cart } from './components/Landing/Cart';
import { ProductsCategorie } from './components/Landing/ProductsCategorie';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';
import { LanguageProvider } from './components/context/LanguageProvider';
import './lib/rtl.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Orders } from './components/Landing/Orders';
import { SearchProvider } from './components/context/SearchContext';

const TranslationLoader = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load translations when language changes
    i18n.loadNamespaces(['translation', 'categories']);
  }, [i18n.language]);

  return <>{children}</>;
};

// src/App.tsx
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <ProductsCategorie />,
      },
      {
        path: '/categories/:categoryId',
        element: <ProductsCategorie />, // Add this new route
      },
      {
        path: '/product/:id',
        element: <ProductDetails />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <div>Checkout Page</div>,
      },
      {
        path: '/orders',
        element: <Orders />, // Add this new route
      },
      {
        path:'/fr/admin/*',
        element:null, // Add this new route
      },
    ],
  },

]);

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <TranslationLoader>
        <LanguageProvider>
        <SearchProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
          </SearchProvider>
        </LanguageProvider>
      </TranslationLoader>
    </I18nextProvider>
  );
}

export default App;