import { CategoryButton } from './CategoryButton';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { catalogService, type Category } from '@/api/catalog';
import { Skeleton } from '../ui/skeleton';

export const SearchCategories = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await catalogService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
        setError(t('common.errors.loadingCategories'));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [t]);

  if (error) {
    return (
      <section className="px-4 py-6 text-center text-red-500">
        {error}
      </section>
    );
  }

  if (loading) {
    return (
      <section className="px-4 py-6 space-y-6 bg-white text-black mt-96">
        <div className="flex justify-center">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-7xl mx-auto">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="h-4 w-[70px]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6 space-y-6 bg-white text-black mt-52">
      <div className="flex justify-center">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-7xl mx-auto">
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image || '/placeholder-category.jpg'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};