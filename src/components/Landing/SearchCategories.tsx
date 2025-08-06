import { Button } from "../ui/button";
import { CategoryButton } from './CategoryButton';
import { useTranslation } from 'react-i18next';

const categories = [
  { 
    name: "Miroirs Led", 
    image: "https://www.so-inside.com/32097-large_default/miroir-rond-a-poser-avec-ampoule-led-et-socle-alya.jpg" 
  },
  { 
    name: "Caisse étagère", 
    image: "https://coiffure-shop.com/image/cache/catalog/Produits/Mobilier/RY0104V-1-320x320.jpg" 
  },
  { 
    name: "Chaise", 
    image: "https://www.mysalondecoiffure.com/2374-large_default/sven-fauteuil-barbier.jpg" 
  },
  { 
    name: "Lave-tête", 
    image: "https://www.cdiscount.com/pdt2/5/5/0/1/700x700/auc3512727625550/rw/bac-a-shampoing-lave-tete-coiffure-salons-de-beaut.jpg" 
  },
  { 
    name: "Caisse comptoir", 
    image: "https://www.heure-creation.fr/wp-content/uploads/2018/11/comptoir-de-caisse-style-industriel.1.jpg" 
  },
  { 
    name: "Salon client", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5DZrVPVI54Ej4noHNz3voNl9qR_S83PCXMQ&s" 
  },
  { 
    name: "Chariot", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4CZG1ATcJdU_LAhoMr9l94JOAyPmkM3ZsuQ&s" 
  },
  { 
    name: "Support séchoir", 
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Support tondeuse", 
    image: "https://images.unsplash.com/photo-1598522325074-042db73f232c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Tondeuse", 
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Relax", 
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Tabouret", 
    image: "https://images.unsplash.com/photo-1598522325074-042db73f232c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Valise", 
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Stérilisateur", 
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Accessoires chaise", 
    image: "https://images.unsplash.com/photo-1598522325074-042db73f232c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Accessoires Lave-tête", 
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Vaposone", 
    image: "https://images.unsplash.com/photo-1597239450996-ea7c2a564c2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "led barber", 
    image: "https://images.unsplash.com/photo-1598522325074-042db73f232c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Hair vaccum", 
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Ciseaux", 
    image: "https://images.unsplash.com/photo-1598522325074-042db73f232c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Post de travail", 
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Séchoir", 
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Lisseur", 
    image: "https://images.unsplash.com/photo-1598522325074-042db73f232c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Brosse", 
    image: "https://images.unsplash.com/photo-1597239450996-ea7c2a564c2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  },
  { 
    name: "Makup artist", 
    image: "https://images.unsplash.com/photo-1598522325074-042db73f232c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
  }
];


export const SearchCategories = () => {
    const { t } = useTranslation();
    
    return (
      <section className="px-4 py-6 space-y-6 bg-gradient-to-r from-black via-black to-zinc-900 mt-96">
        <div className="flex justify-center">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-7xl mx-auto">
            {categories.map((category) => (
              <CategoryButton
                key={category.name}
                name={category.name}
                image={category.image}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };