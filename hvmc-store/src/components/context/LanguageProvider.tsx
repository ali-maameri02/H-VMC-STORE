'use client';

import { type ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      i18n.changeLanguage('fr'); // Default to French
    }
  }, [i18n]);

  return <>{children}</>;
};