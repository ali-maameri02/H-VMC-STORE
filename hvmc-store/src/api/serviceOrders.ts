import { toast } from "sonner";

export interface OrderItem {
  productname: string;
  id: string;
  price: string | number;
  quantity: number;
  date?: string;
  image?: string;
  wilaya?: string;
  address?: string;
}

// Cache user data to avoid repeated localStorage access
let cachedUserData: any = null;

export const submitOrder = async (items: OrderItem | OrderItem[]) => {
  // Get user data once and cache it
  if (!cachedUserData) {
    cachedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
  }

  const basePayload = {
    name: cachedUserData.name || "Client inconnu",
    email: cachedUserData.email || "",
    phone: cachedUserData.phone || "Non fourni",
    wilaya: cachedUserData.wilaya || "Non spécifiée",
    address: cachedUserData.address || "Non spécifiée"
  };

  try {
    const orders = Array.isArray(items) ? items : [items];
    const timestamp = new Date().toISOString();
    
    // Prepare all orders at once
    const ordersWithDate = orders.map(item => ({
      ...basePayload,
      ...item,
      date: timestamp,
      image: item.image || '/placeholder-product.jpg'
    }));
    
    // Update localStorage in one operation
    const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
    localStorage.setItem("userOrders", JSON.stringify([...existingOrders, ...ordersWithDate]));
    
    // Use Promise.all for parallel requests if multiple items
    if (orders.length > 1) {
      const responses = await Promise.all(
        orders.map(item => {
          const fullPayload = {
            ...basePayload,
            productname: item.productname,
            id: item.id,
            price: item.price,
            quantity: item.quantity
          };

          return fetch("https://script.google.com/macros/s/AKfycbx_D69QUpLpkhzIiSgo4g3EJtG30-fn-BQpJtVrG82EZm5uXMHmSzfWgWaAJ5U-GsPkgw/exec", {
            method: "POST",
            mode: "no-cors", // Add this to handle CORS differently
            headers: {
              "Content-Type": "application/json", // Changed from x-www-form-urlencoded
            },
            body: JSON.stringify(fullPayload),
          });
        })
      );

      // Check all responses
      const allSuccessful = responses.every(response => response.ok);
      if (!allSuccessful) {
        throw new Error("Some orders failed to submit");
      }
    } else {
      // Single item case
      const item = orders[0];
      const fullPayload = {
        ...basePayload,
        productname: item.productname,
        id: item.id,
        price: item.price,
        quantity: item.quantity
      };

      const response = await fetch("https://script.google.com/macros/s/AKfycbx_D69QUpLpkhzIiSgo4g3EJtG30-fn-BQpJtVrG82EZm5uXMHmSzfWgWaAJ5U-GsPkgw/exec", {
        method: "POST",
        mode: "no-cors", // Add this to handle CORS differently
        headers: {
          "Content-Type": "application/json", // Changed from x-www-form-urlencoded
        },
        body: JSON.stringify(fullPayload),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    toast.success("Commande(s) bien enregistrée(s) !");
    return true;
  } catch (error) {
    console.error("Erreur lors de la commande :", error);
    toast.error("Échec de l'envoi de la commande.");
    return false;
  }
};

export const getLocalOrders = (): OrderItem[] => {
  try {
    if (!cachedUserData) {
      cachedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
    }
    const userEmail = cachedUserData.email;
    
    if (!userEmail) return [];
    
    const allOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
    return allOrders
      .filter((order: any) => order.email === userEmail)
      .map((order: any) => ({
        ...order,
        price: typeof order.price === 'string' ? 
          parseFloat(order.price.trim()) : 
          order.price
      }));
  } catch (error) {
    console.error("Error reading orders from localStorage:", error);
    return [];
  }
};