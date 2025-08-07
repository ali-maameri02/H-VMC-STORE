// src/api/serviceOrders.ts
import { toast } from "sonner";

interface OrderItem {
  productname: string;
  id: string;
  price: string | number;
  quantity: number;
}

export const submitOrder = async (items: OrderItem | OrderItem[]) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  
  const basePayload = {
    name: userData.name || "Client inconnu",
    email: userData.email || "",
    phone: userData.phone || "Client inconnu",
  };

  try {
    // Handle single product or multiple products
    const orders = Array.isArray(items) ? items : [items];
    
    // Process each order
    for (const item of orders) {
      const fullPayload = {
        ...basePayload,
        ...item
      };

      const response = await fetch("https://script.google.com/macros/s/AKfycbzD7upin5Kbl8z8axksNvfZeIKnAVFLdkuNiegJ4qLOf5H-DDDaNUgzNGW4xpsh3fjJ8g/exec", {
        method: "POST",
        body: JSON.stringify(fullPayload),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const result = await response.text();
      console.log("Commande envoyée :", result);
    }

    toast.success("Commande(s) bien enregistrée(s) !");
    return true;
  } catch (error) {
    console.error("Erreur lors de la commande :", error);
    toast.error("Échec de l'envoi de la commande.");
    return false;
  }
};