import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { getOrders } from '@/api/serviceOrders'; // You'll need to create this API function
import { Skeleton } from '../ui/skeleton';

type OrderItem = {
  id: string;
  productname: string;
  price: string;
  quantity: number;
  image: string;
  date: string;
};

type Order = {
  id: string;
  items: OrderItem[];
  total: string;
  date: string;
};

export const Orders = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await getOrders(); // Implement this API call
        setOrders(ordersData);
      } catch (err) {
        setError(t('errors.loadFailed'));
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [t]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="flex gap-4">
                    <Skeleton className="h-24 w-24 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                ))}
                <Skeleton className="h-6 w-24 ml-auto mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('errors.loadFailed')}</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <Button asChild>
          <Link to="/">{t('actions.backToHome')}</Link>
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24 text-center">
        <h1 className="text-3xl font-bold mb-8">{t('orders.title')}</h1>
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">{t('orders.empty')}</h2>
          <p className="text-gray-500 mb-6">{t('orders.emptyDescription')}</p>
          <Button asChild>
            <Link to="/products">{t('orders.browseProducts')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">{t('orders.title')}</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
              <h2 className="font-semibold">
                {t('orders.order')} #{order.id}
              </h2>
              <p className="text-sm text-gray-600">
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            
            <div className="p-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.productname}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.productname}</h3>
                    <div className="flex justify-between mt-2">
                      <p className="text-gray-600">
                        {t('orders.quantity')}: {item.quantity}
                      </p>
                      <p className="font-bold">
                        {parseFloat(item.price) * item.quantity} DA
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.price} DA {t('orders.each')}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="font-bold">{t('orders.total')}</span>
                <span className="text-xl font-bold">{order.total} DA</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};