import { ProductCard } from "./ProductCard";

const products = [
  { 
    id: "1",

    name: "Sèche-cheveux Professionnel", 
    category: "Appareils de coiffure", 
    price: "249,99 €",
    image: "https://img.freepik.com/photos-gratuite/arrangement-outils-salon-coiffure_23-2149167446.jpg?semt=ais_hybrid&w=740" 
  },
  { 
    id: "1",

    name: "Lisseur Céramique", 
    category: "Outils de styling", 
    price: "179,99 €",
    image: "https://img.freepik.com/photos-gratuite/arrangement-outils-salon-coiffure_23-2149167446.jpg?semt=ais_hybrid&w=740" 
  },
  { 
    id: "1",

    name: "Kit Ciseaux Professionnels", 
    category: "Outils de coupe", 
    price: "349,99 €",
    image: "https://img.freepik.com/photos-gratuite/arrangement-outils-salon-coiffure_23-2149167446.jpg?semt=ais_hybrid&w=740" 
  },
  { 
    id: "1",

    name: "Chaise de Salon Professionnelle", 
    category: "Mobilier", 
    price: "599,99 €",
    image: "https://img.freepik.com/photos-gratuite/arrangement-outils-salon-coiffure_23-2149167446.jpg?semt=ais_hybrid&w=740" 
  },
  { 
    id: "1",

    name: "Table de Mixage Couleur", 
    category: "Coloration", 
    price: "129,99 €",
    image: "https://img.freepik.com/photos-gratuite/arrangement-outils-salon-coiffure_23-2149167446.jpg?semt=ais_hybrid&w=740" 
  },
  { 
    id: "1",

    name: "Lampe UV pour Ongles", 
    category: "Manucure", 
    price: "89,99 €",
    image: "https://img.freepik.com/photos-gratuite/arrangement-outils-salon-coiffure_23-2149167446.jpg?semt=ais_hybrid&w=740" 
  },
  { 
    id: "1",

    name: "Brosse Rotative Électrique", 
    category: "Styling", 
    price: "49,99 €",
    image: "https://img.freepik.com/photos-gratuite/arrangement-outils-salon-coiffure_23-2149167446.jpg?semt=ais_hybrid&w=740" 
  },
  { 
    id: "1",

    name: "Vaporisateur Professionnel", 
    category: "Accessoires", 
    price: "39,99 €",
    image: "https://img.freepik.com/photos-gratuite/arrangement-outils-salon-coiffure_23-2149167446.jpg?semt=ais_hybrid&w=740" 
  },
  { 
    id: "1",

    name: "Machine à Découper", 
    category: "Outils de coupe", 
    price: "279,99 €",
    image: "https://img.freepik.com/photos-gratuite/arrangement-outils-salon-coiffure_23-2149167446.jpg?semt=ais_hybrid&w=740" 
  },
  { 
    id: "1",

    name: "Miroir de Salon LED", 
    category: "Mobilier", 
    price: "459,99 €",
    image: "https://img.freepik.com/photos-gratuite/arrangement-outils-salon-coiffure_23-2149167446.jpg?semt=ais_hybrid&w=740" 
  },
];

export const ProductGrid = () => (
    <section className="px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />      ))}
    </section>
  );