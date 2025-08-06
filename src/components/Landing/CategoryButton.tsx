import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import { useCategoryTranslation } from '@/hooks/useCategoryTranslation';

interface CategoryButtonProps {
  name: string;
  image: string;
}

export const CategoryButton = ({ name, image }: CategoryButtonProps) => {
  const translateCategory = useCategoryTranslation();
  const categorySlug = encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
  const translatedName = translateCategory(name);

  return (
    <Button
      asChild
      variant="ghost"
      className="flex flex-col items-center h-auto p-2 gap-2 group hover:bg-white/5 transition-colors"
    >
      <Link to={`/products?category=${categorySlug}`}>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-primary transition-all">
          <img 
            src={image} 
            alt={translatedName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            loading="lazy"
          />
        </div>
        <span className="text-xs text-white font-medium text-center">
          {translatedName}
        </span>
      </Link>
    </Button>
  );
};