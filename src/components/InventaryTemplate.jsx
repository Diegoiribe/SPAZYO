import React from 'react';
import { useState, useEffect } from 'react';
import { get } from '../api/http';

export const InventaryTemplate = ({ setProductState, productState }) => {
  const [productInventary, setProductInventary] = useState([]);
  const product = productInventary.find((o) => o.id === productState.productId);

  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const activeVariant = product?.variants?.[activeVariantIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeVariantIndex]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get('/products');
        console.log('Data fetched:', data);
        setProductInventary(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const colorMap = {
    black: '#1f1f1f',
    white: '#f2f2f2',
    gray: '#9ca3af',
    red: '#7a0c1d',
    blue: '#4a6a8a',
    green: '#5f7f5b',
    brown: '#6b4f3a',
    yellow: '#c9b458',
    beige: '#d6c7a1',
    orange: '#d16a2c',
    'Total Orange': '#d16a2c',
    'Green Apple': '#5f7f5b',
    'All-Star': '#000000'
  };

  console.log('product', product);
  console.log('activeVariant', activeVariant);

  return (
    product && (
      <div className="flex flex-col gap-5">
        <div className="">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setProductState({ isOpen: false, orderId: null })}
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
              <div className="inline-flex items-center p-2 ml-2 border rounded-md cursor-pointer bg-neutral-50 border-neutral-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-plus-icon lucide-plus text-neutral-500"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
              <div className="inline-flex items-center p-2 ml-2 border rounded-md cursor-pointer bg-neutral-50 border-neutral-100">
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
                  className="lucide lucide-trash-icon lucide-trash text-neutral-500"
                >
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <div className="inline-flex items-center p-2 ml-2 border rounded-md cursor-pointer bg-neutral-50 border-neutral-100">
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
                  class="lucide lucide-pencil-icon lucide-pencil text-neutral-500"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </div>
            </div>
          </div>

          <p className="mt-5 mb-2 text-sm font-light uppercase truncate text-neutral-600">
            {product.name}
          </p>

          <div
            className="flex
            gap-3
            overflow-x-auto
            scrollbar-hide
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden"
          >
            {activeVariant?.photos?.map((photo, idx) => (
              <img src={photo} key={idx} alt="" className="rounded-xs" />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeVariant && (
            <>
              <div
                className="w-3 h-3 border border-neutral-200"
                style={{
                  backgroundColor: colorMap[activeVariant.color]
                }}
              />
              <p className="-mt-0.5 text-xs font-light uppercase text-neutral-600">
                |
              </p>
              <p className="text-xs font-light -mt-0.25 uppercase text-neutral-600">
                {activeVariant.color}
              </p>
            </>
          )}
        </div>

        <div className="mt-5 border rounded-md border-neutral-100">
          <div className="grid grid-cols-[1fr_1fr] gap-4 px-3 py-3 text-xs font-light bg-neutral-50 border-b border-neutral-100 rounded-t-md text-neutral-500 uppercase">
            <p>Talla</p>
            <p className="text-right">Cantidad</p>
          </div>

          {activeVariant &&
            Object.entries(activeVariant.sizes ?? {}).map(
              ([size, quantity]) => (
                <div
                  key={size}
                  className="grid items-center grid-cols-[1fr_1fr] gap-4 px-3 py-3 text-xs font-light border-b border-neutral-100"
                >
                  <p className="uppercase">{size}</p>
                  <p className="text-right">{quantity}</p>
                </div>
              )
            )}

          {activeVariant &&
            Object.keys(activeVariant.sizes ?? {}).length === 0 && (
              <div className="px-3 py-3 text-xs font-light text-neutral-400">
                Sin stock registrado
              </div>
            )}
        </div>

        <div className="flex flex-col items-end p-2 font-light border rounded-md bg-neutral-50 border-neutral-100">
          <p className="text-xs font-light uppercase text-neutral-500">Price</p>
          <p className="mt-1 text-xs font-light uppercase text-neutral-500">
            $
            {new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(product.price)}
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              setActiveVariantIndex((prev) =>
                prev === 0 ? product.variants.length - 1 : prev - 1
              )
            }
            className="text-xs font-light text-neutral-500"
          >
            ← Previous
          </button>

          <button
            onClick={() =>
              setActiveVariantIndex((prev) =>
                prev === product.variants.length - 1 ? 0 : prev + 1
              )
            }
            className="text-xs font-light text-neutral-500"
          >
            Next →
          </button>
        </div>
      </div>
    )
  );
};
