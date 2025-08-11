import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { getLocalOrders, type OrderItem } from '@/api/serviceOrders';
import { Skeleton } from '../ui/skeleton';

export const Orders = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const ordersData = getLocalOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <OrderSkeleton />;
  }

  if (orders.length === 0) {
    return <EmptyOrders t={t} />;
  }

  return <OrdersList orders={orders} t={t} />;
};

const OrderSkeleton = () => (
  <div className="container mx-auto px-4 py-8 mt-24">
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            <div className="flex gap-4">
              <Skeleton className="h-24 w-24 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EmptyOrders = ({ t }: { t: any }) => (
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

const OrdersList = ({ orders, t }: { orders: OrderItem[], t: any }) => {
  // Group orders by date
  const ordersByDate = orders.reduce((acc, order) => {
    const date = order.date || new Date().toISOString();
    const dateKey = new Date(date).toLocaleDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(order);
    return acc;
  }, {} as Record<string, OrderItem[]>);

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">{t('orders.title')}</h1>
      
      <div className="space-y-6">
        {Object.entries(ordersByDate).map(([date, dateOrders]) => (
          <OrderGroup 
            key={date} 
            date={date} 
            orders={dateOrders} 
            t={t} 
          />
        ))}
      </div>
    </div>
  );
};

const OrderGroup = ({ date, orders, t }: { date: string, orders: OrderItem[], t: any }) => {
  const total = orders.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-3">
        <h2 className="font-semibold">{date}</h2>
      </div>
      
      <div className="p-4">
        {orders.map((item) => (
          <OrderItem key={`${date}-${item.id}`} item={item} t={t} />
        ))}
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <span className="font-bold">{t('orders.total')}</span>
          <span className="text-xl font-bold">
            {total.toFixed(2)} DA
          </span>
        </div>
      </div>
    </div>
  );
};

const OrderItem = ({ item, t }: { item: OrderItem, t: any }) => (
  <div className="flex gap-4 py-4 border-b last:border-b-0">
    {/* <img
      src={item.image}
      alt={item.productname}
      className="w-20 h-20 object-cover rounded"
    /> */}
    <div className="flex-1">
      <h3 className="font-medium">{item.productname}</h3>
      <div className="flex justify-between mt-2">
        <p className="text-gray-600">
          {t('orders.quantity')}: {item.quantity}
        </p>
        <p className="font-bold">
          {(Number(item.price) * item.quantity).toFixed(2)} DA
        </p>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {item.price} DA {t('orders.each')}
      </p>
    </div>
  </div>
);