import { SearchCategories } from "./SearchCategories";
import { ProductGrid } from "./ProductGrid";
import { Footer } from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-black to-zinc-900 text-white">
      <SearchCategories />
      <ProductGrid />
      <Footer/>
    </div>
  );
}