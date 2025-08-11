import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import { useCategoryTranslation } from '@/hooks/useCategoryTranslation';

interface CategoryButtonProps {
  id:number;
  name: string;
  image: string;
}

// src/components/CategoryButton.tsx
export const CategoryButton = ({ id, name, image }: CategoryButtonProps) => {
  const translateCategory = useCategoryTranslation();
  const translatedName = translateCategory(name);

  return (
    <Button
      asChild
      variant="ghost"
      className="flex flex-col items-center h-auto p-2 gap-2 group hover:bg-white/5 transition-colors"
    >
      {/* Change this line to use the ID in the path */}
      <Link to={`/categories/${id}`}>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-primary transition-all">
          <img 
            src={image} 
            alt={translatedName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-category.jpg';
            }}
          />
        </div>
        <span className="text-xs text-white font-medium text-center line-clamp-2">
          {translatedName}
        </span>
      </Link>
    </Button>
  );
};