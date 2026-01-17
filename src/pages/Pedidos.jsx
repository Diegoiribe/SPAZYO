import { OrdersTemplate } from '../components/OrdersTemplate';
import { data } from '../data/db';
import { useState } from 'react';

export const Pedidos = () => {
  const [orderState, setOrderState] = useState({
    isOpen: false,
    orderId: null
  });

  const openOrder = (id) => {
    setOrderState({
      isOpen: true,
      orderId: id
    });
  };

  return (
    <div className="max-w-md mx-auto">
      {!orderState.isOpen ? (
        <>
          <p className="pb-5 text-2xl font-semibold uppercase">Pedidos</p>

          <div className="inline-flex items-center gap-2 p-2 border rounded-md cursor-pointer bg-neutral-50 border-neutral-100">
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
              Jan - Jan 30, 2024
            </p>
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
          <div className="inline-flex items-center gap-2 p-2 ml-2 border rounded-md cursor-pointer bg-neutral-50 border-neutral-100">
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
              className="lucide lucide-plus-icon lucide-plus text-neutral-500"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
          <div className="mt-5 border rounded-md border-neutral-100">
            <div className="grid grid-cols-[60px_1fr_80px_10px] gap-4 px-3 py-3 text-xs font-light bg-neutral-50 border-b border-neutral-100 rounded-t-md text-neutral-500 uppercase">
              <p>Order</p>
              <p>Name</p>
              <p>Total</p>
            </div>
            {data[0].zayca.orders.map((order) => (
              <div
                onClick={() => openOrder(order.id)}
                key={order.id}
                className="grid items-center grid-cols-[60px_1fr_80px_10px] gap-4 px-3 py-3 text-xs font-light border-b border-neutral-100 cursor-pointer"
              >
                <p className="">#{order.id}</p>

                <p className="uppercase truncate">{order.name}</p>

                <p className="">
                  $
                  {new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }).format(1999)}
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
            ))}
          </div>
        </>
      ) : (
        <OrdersTemplate setOrderState={setOrderState} orderState={orderState} />
      )}
    </div>
  );
};
