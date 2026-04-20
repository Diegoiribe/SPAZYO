import { OrdersTemplate } from '../components/OrdersTemplate';
import { useState, useEffect } from 'react';
import { get } from '../api/http';

export const Pedidos = () => {
  const [productsOrders, setProductsOrders] = useState([]);
  const [orderState, setOrderState] = useState({
    isOpen: false,
    orderId: null
  });

  const [selectedDate, setSelectedDate] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get('/orders', null);
        console.log('Data fetched:', data);
        setProductsOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const openOrder = (id) => {
    setOrderState({
      isOpen: true,
      orderId: id
    });
  };

  console.log('productsOrders', productsOrders);

  return (
    <div className="max-w-md mx-auto">
      {!orderState.isOpen ? (
        <>
          <div className="flex items-center justify-between mt-10 ">
            <div className="relative inline-flex items-center gap-2 p-2 border rounded-md cursor-pointer bg-neutral-50 border-neutral-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="text-xs lucide lucide-calendar-icon lucide-calendar text-neutral-500"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <p className="text-xs font-light uppercase text-neutral-500">
                {selectedDate !== 'ALL'
                  ? (() => {
                      const now = new Date();
                      let start = new Date();

                      if (selectedDate === 'TODAY') {
                        start = new Date(now);
                      } else if (selectedDate === 'LAST_7_DAYS') {
                        start.setDate(now.getDate() - 7);
                      } else if (selectedDate === 'LAST_30_DAYS') {
                        start.setDate(now.getDate() - 30);
                      } else if (selectedDate === 'LAST_3_MONTHS') {
                        start.setMonth(now.getMonth() - 3);
                      } else if (selectedDate === 'LAST_6_MONTHS') {
                        start.setMonth(now.getMonth() - 6);
                      } else if (selectedDate === 'LAST_1_YEAR') {
                        start.setFullYear(now.getFullYear() - 1);
                      }

                      const format = (d) =>
                        d.toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        });

                      return `${format(start)} - ${format(
                        now
                      )}, ${now.getFullYear()}`;
                    })()
                  : 'All dates'}
              </p>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                <option value="ALL">ALL</option>
                <option value="TODAY">TODAY</option>
                <option value="LAST_7_DAYS">7 DAYS</option>
                <option value="LAST_30_DAYS">30 DAYS</option>
                <option value="LAST_3_MONTHS">3 MONTHS</option>
                <option value="LAST_6_MONTHS">6 MONTHS</option>
                <option value="LAST_1_YEAR">1 YEAR</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="cursor-pointer lucide lucide-chevron-down-icon lucide-chevron-down text-neutral-500"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <div
                onClick={() =>
                  setStatusFilter((prev) =>
                    prev === 'SHIPPED' ? null : 'SHIPPED'
                  )
                }
                className={`inline-flex items-center p-2 ml-2 border rounded-md cursor-pointer   hover:text-blue-400   ${
                  statusFilter === 'SHIPPED'
                    ? 'text-blue-400 bg-blue-50 border-blue-100'
                    : 'text-neutral-500 bg-neutral-50 border-neutral-100'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-send-icon lucide-send "
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
              </div>
              <div
                onClick={() =>
                  setStatusFilter((prev) =>
                    prev === 'DELIVERED' ? null : 'DELIVERED'
                  )
                }
                className={`inline-flex items-center p-2 ml-2 border rounded-md cursor-pointer   hover:text-green-400   ${
                  statusFilter === 'DELIVERED'
                    ? 'text-green-400 bg-green-50 border-green-100'
                    : 'text-neutral-500 bg-neutral-50 border-neutral-100'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-package-check-icon lucide-package-check"
                >
                  <path d="M12 22V12" />
                  <path d="m16 17 2 2 4-4" />
                  <path d="M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753" />
                  <path d="M3.29 7 12 12l8.71-5" />
                  <path d="m7.5 4.27 8.997 5.148" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-10 border rounded-md border-neutral-100">
            <div className="grid grid-cols-[60px_1fr_80px_10px] gap-4 px-3 py-3 text-xs font-light bg-neutral-50 border-b border-neutral-100 rounded-t-md text-neutral-500 uppercase">
              <p>Order</p>
              <p>Name</p>
              <p>Total</p>
            </div>
            {(() => {
              const filteredOrders = productsOrders.filter((order) => {
                const orderDate = new Date(order.date);
                const now = new Date();

                // DATE FILTER
                let startDate = null;

                if (selectedDate !== 'ALL') {
                  if (selectedDate === 'TODAY') {
                    startDate = new Date(now);
                    startDate.setHours(0, 0, 0, 0);
                  } else if (selectedDate === 'LAST_7_DAYS') {
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - 7);
                  } else if (selectedDate === 'LAST_30_DAYS') {
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - 30);
                  } else if (selectedDate === 'LAST_3_MONTHS') {
                    startDate = new Date(now);
                    startDate.setMonth(now.getMonth() - 3);
                  } else if (selectedDate === 'LAST_6_MONTHS') {
                    startDate = new Date(now);
                    startDate.setMonth(now.getMonth() - 6);
                  } else if (selectedDate === 'LAST_1_YEAR') {
                    startDate = new Date(now);
                    startDate.setFullYear(now.getFullYear() - 1);
                  }
                }

                const passesDate =
                  selectedDate === 'ALL' ||
                  (startDate && orderDate >= startDate);

                // STATUS FILTER
                const passesStatus = statusFilter
                  ? order.status === statusFilter
                  : order.status === 'CONFIRMED';

                return passesDate && passesStatus;
              });

              if (filteredOrders.length === 0) {
                return (
                  <div className="flex items-center justify-center py-10 text-xs font-light uppercase text-neutral-400">
                    Aún no hay órdenes
                  </div>
                );
              }

              return filteredOrders.map((order) => (
                <div
                  onClick={() => openOrder(order.id)}
                  key={order.id}
                  className="grid items-center grid-cols-[60px_1fr_80px_10px] gap-4 px-3 py-3 text-xs font-light border-b border-neutral-100 cursor-pointer"
                >
                  <p className="">#{order.id}</p>
                  <p className="uppercase truncate">{order.customerName}</p>
                  <p className="">
                    $
                    {new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(order.total)}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-move-up-right-icon lucide-move-up-right"
                  >
                    <path d="M13 5H19V11" />
                    <path d="M19 5L5 19" />
                  </svg>
                </div>
              ));
            })()}
          </div>
        </>
      ) : (
        <OrdersTemplate
          setOrderState={setOrderState}
          orderState={orderState}
          productsOrders={productsOrders}
          setProductsOrders={setProductsOrders}
        />
      )}
    </div>
  );
};
