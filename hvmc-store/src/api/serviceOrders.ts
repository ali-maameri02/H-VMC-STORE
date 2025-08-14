import { toast } from "sonner";

export interface OrderItem {
  productname: string;
  id: string;
  price: string | number;
  quantity: number;
  date?: string;
  image?: string;
}

export const submitOrder = async (items: OrderItem | OrderItem[]) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  
  const basePayload = {
    name: userData.name || "Client inconnu",
    email: userData.email || "",
    phone: userData.phone || "Client inconnu", // This will be just the phone number value
  };

  try {
    const orders = Array.isArray(items) ? items : [items];
    const timestamp = new Date().toISOString();
    
    // Prepare orders for localStorage
    const ordersWithDate = orders.map(item => ({
      ...basePayload,
      ...item,
      date: timestamp,
      image: item.image || '/placeholder-product.jpg'
    }));
    
    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
    localStorage.setItem("userOrders", JSON.stringify([...existingOrders, ...ordersWithDate]));
    
    // Submit to Google Sheets - Modified to send just the phone number value
    for (const item of orders) {
      const fullPayload = {
        ...basePayload,
        productname: item.productname,
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        phone: basePayload.phone // This is already just the value
      };

      const response = await fetch("https://script.google.com/macros/s/AKfycbzD7upin5Kbl8z8axksNvfZeIKnAVFLdkuNiegJ4qLOf5H-DDDaNUgzNGW4xpsh3fjJ8g/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(fullPayload),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log("Commande envoyée :", await response.text());
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
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const userEmail = userData.email;
    
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