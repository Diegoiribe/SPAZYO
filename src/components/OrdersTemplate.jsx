import React from 'react';
import { data } from '../data/db';

export const OrdersTemplate = ({ setOrderState, orderState }) => {
  const order = data?.[0]?.zayca?.orders?.find(
    (o) => o.id === orderState.orderId
  );

  const total = order.bag.reduce((acc, item) => acc + item.price, 0);

  return (
    order && (
      <div className="flex flex-col gap-5">
        <div className="">
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
          <div
            className="flex
            gap-3
            overflow-x-auto
            scrollbar-hide
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden"
          >
            {order.bag.map((item) => (
              <div className="flex flex-col w-48 gap-4 pt-2">
                <img src={item.img} alt="" className="w-48 rounded-xs" />
                <div className="flex justify-between gap-3">
                  <p className="pb-1 -mt-1 text-xs font-light uppercase truncate text-neutral-600">
                    {item.name}
                  </p>
                  <div className="flex gap-2">
                    <p className="-mt-1 text-xs font-light uppercase text-neutral-600">
                      {item.color}
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
          <p className="mt-1 text-sm font-medium uppercase">{order.name}</p>
          <p className="mt-1 text-xs font-light text-neutral-500">
            #{order.id}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase ">Direccion</p>
          <p className="mt-1 text-xs font-light uppercase text-neutral-600">
            {order.address.calle}
          </p>
          <p className="mt-1 text-xs font-light uppercase text-neutral-600">
            {order.address.colonia}
          </p>
          <p className="mt-1 text-xs font-light uppercase text-neutral-600">
            {order.address.ciudad}, {order.address.estado}
          </p>
          <p className="mt-1 text-xs font-light uppercase text-neutral-600">
            CP: {order.address.cp}
          </p>
        </div>
      </div>
    )
  );
};
