import { Button } from "../ui/button";
import { useCart } from '../context/Cartcontext';
import { Link } from 'react-router-dom';
import { TrashIcon } from "lucide-react";

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price.replace(',', '.')) * item.quantity),
    0
  ).toFixed(2).replace('.', ',');

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
      
      {cartCount === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">Votre panier est vide</h2>
          <p className="text-gray-500 mb-6">Parcourez nos produits et ajoutez des articles à votre panier</p>
          <Button asChild>
            <Link to="/">Voir les produits</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-white font-bold">{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-black"

                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-black"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                  className="bg-white text-black cursor-pointer hover:text-white hover:bg-[#d6b66d]"
                >
                  Supprimer <TrashIcon/>
                </Button>
              </div>
            ))}
          </div>

          <div className="border p-6 rounded-lg h-fit">
            <h3 className="text-xl font-semibold mb-4">Récapitulatif</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{total} €</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{total} €</span>
              </div>
            </div>
            <Button className="w-full" asChild>
              <Link to="/checkout">Passer la commande</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};