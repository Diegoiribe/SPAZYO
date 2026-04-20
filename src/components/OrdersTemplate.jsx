import React from 'react';

export const OrdersTemplate = ({
  setOrderState,
  orderState,
  setProductsOrders,
  productsOrders
}) => {
  const order = productsOrders.find((o) => o.id === orderState.orderId);

  const total = order.items.reduce((acc, item) => acc + item.price, 0);

  const updateStatus = (id, newStatus) => {
    setProductsOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const nextStatus = o.status === newStatus ? 'CONFIRMED' : newStatus;
        return { ...o, status: nextStatus };
      })
    );
  };

  return (
    order && (
      <div className="flex flex-col gap-5">
        <div className="">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOrderState({ isOpen: false, orderId: null })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className=" lucide lucide-arrow-left-icon lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              <p className="text-sm font-medium uppercase ">Productos</p>
            </div>
            <div className="flex items-center gap-1">
              <div
                className={`inline-flex items-center p-2 ml-2 border rounded-md cursor-pointer   hover:text-blue-400   ${
                  order.status === 'SHIPPED'
                    ? 'text-blue-400 bg-blue-50 border-blue-100'
                    : 'text-neutral-500 bg-neutral-50 border-neutral-100'
                }`}
                onClick={() => updateStatus(order.id, 'SHIPPED')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-send-icon lucide-send "
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
              </div>
              <div
                className={`inline-flex items-center p-2 ml-2 border rounded-md cursor-pointer   hover:text-green-400   ${
                  order.status === 'DELIVERED'
                    ? 'text-green-400 bg-green-50 border-green-100'
                    : 'text-neutral-500 bg-neutral-50 border-neutral-100'
                }`}
                onClick={() => updateStatus(order.id, 'DELIVERED')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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
              <div
                className={`inline-flex items-center p-2 ml-2 border rounded-md cursor-pointer  border-neutral-100 hover:text-red-400  ${
                  order.status === 'CANCELLED'
                    ? 'text-red-400 bg-red-50 border-red-100'
                    : 'text-neutral-500 bg-neutral-50 border-neutral-100'
                }`}
                onClick={() => updateStatus(order.id, 'CANCELLED')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-ban-icon lucide-ban"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M4.929 4.929 19.07 19.071" />
                </svg>
              </div>
            </div>
          </div>
          <div
            className="flex
            gap-3
            overflow-x-auto
            scrollbar-hide
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden"
          >
            {order.items.map((item) => (
              <div key={item.id} className="flex flex-col w-48 gap-4 pt-2">
                <img src={item.photos[0]} alt="" className="w-48 rounded-xs" />
                <div className="flex justify-between gap-3">
                  <p className="pb-1 -mt-1 text-xs font-light uppercase truncate text-neutral-600">
                    {item.productName}
                  </p>
                  <div className="flex gap-2">
                    <p className="-mt-1 text-xs font-light uppercase text-neutral-600">
                      {item.selectedColor}
                    </p>
                    <p className="-mt-1 text-xs font-light uppercase text-neutral-600">
                      |
                    </p>
                    <p className="-mt-1 text-xs font-light uppercase text-neutral-600">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end p-2 font-light border rounded-md bg-neutral-50 border-neutral-100">
          <p className="text-xs font-light uppercase text-neutral-500">Total</p>
          <p className="mt-1 text-xs font-light uppercase text-neutral-500">
            $
            {new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(total)}
          </p>
        </div>

        <div className="">
          <p className="mt-1 text-sm font-light uppercase">
            {order.customerName}
          </p>
          <p className="mt-1 text-xs font-light text-neutral-500">
            #{order.id}
          </p>
        </div>
        <div>
          <p className="text-sm font-light uppercase ">Direccion</p>
          <p className="mt-1 text-xs font-light uppercase text-neutral-600">
            {order.shippingAddress.street}, {order.shippingAddress.number}
          </p>
          <p className="mt-1 text-xs font-light uppercase text-neutral-600">
            {order.shippingAddress.neighborhood}
          </p>
          <p className="mt-1 text-xs font-light uppercase text-neutral-600">
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>
          <p className="mt-1 text-xs font-light uppercase text-neutral-600">
            CP: {order.shippingAddress.zipCode}
          </p>
        </div>
      </div>
    )
  );
};
