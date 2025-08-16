import { SearchCategories } from "./SearchCategories";
import { ProductGrid } from "./ProductGrid";
import { Footer } from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <SearchCategories />
      <ProductGrid />
      <Footer/>
    </div>
  );
}