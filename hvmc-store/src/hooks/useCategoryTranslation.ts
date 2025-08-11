import { useTranslation } from "react-i18next";

export function useCategoryTranslation() {
  const { t } = useTranslation();
  
  return (categoryName: string) => {
    return t(`${categoryName}`);
  };
}