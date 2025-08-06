import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { products } from "./products";
import { useCart } from '../context/Cartcontext';
import { useState } from 'react';

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold">Produit non trouvé</h2>
      <p className="text-gray-500 mt-2">Le produit que vous recherchez n'existe pas ou a été déplacé.</p>
    </div>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="  rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-primary text-2xl font-bold">{product.price}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
          
          {product.description && (
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          )}

          {product.specifications && (
            <div className="space-y-2">
              <h3 className="font-semibold">Caractéristiques:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.specifications.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Button 
                variant="ghost" 
                className="h-10 w-10"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                className="h-10 w-10"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </Button>
            </div>

            <Button className="gap-2 flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              Ajouter au panier
            </Button>
          </div>

          {/* Order Form */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-xl font-semibold mb-4">Commander maintenant</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Quantité</label>
                <input 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <Button type="button" className="w-full" onClick={handleAddToCart}>
                Commander ({product.price} × {quantity})
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};