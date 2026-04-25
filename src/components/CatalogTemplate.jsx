import React from 'react';
import { Link } from 'react-router-dom';
import { get } from '../api/http';
import { useState, useEffect } from 'react';

export const CatalogTemplate = ({ subdomain }) => {
  const [productsCatalog, setProductsCatalog] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('VIEW ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get(`/public/products/${subdomain}`);
        console.log('Data fetched:', data);
        setProductsCatalog(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('productsCatalog:', productsCatalog);

  const categories = [
    'VIEW ALL',
    ...new Set(productsCatalog.map((p) => p.category).filter(Boolean))
  ];

  const filteredProducts = productsCatalog.filter(
    (item) =>
      selectedCategory === 'VIEW ALL' || item.category === selectedCategory
  );

  const featured = filteredProducts[0];
  const rest = filteredProducts.slice(1);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex justify-between px-6 mt-2 mb-3">
        <div className="relative inline-flex items-center gap-2 cursor-pointer ">
          <span className="text-[13px] font-medium uppercase ">
            {selectedCategory}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 ml-1 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-6 mt-2">
        {featured && (
          <Link
            to={`/product/${featured.id}/${featured.variants[0].id}`}
            className="block cursor-pointer"
          >
            <img
              src={featured.variants[0].photos[0]}
              alt=""
              className="object-cover w-full rounded-xs"
            />
            <div className="w-full">
              <div className="flex items-center justify-between w-full gap-5 px-2 mt-2">
                <p className="w-full font-light truncate text-neutral-800">
                  {featured.name}
                </p>
                <div className="flex items-center gap-1">
                  <div
                    className="w-2.75 h-2.75 border border-neutral-100"
                    style={{ backgroundColor: featured.variants[0].color }}
                  />
                  <p className="text-[13px] font-light text-black uppercase">
                    +{featured.variants.length}
                  </p>
                </div>
              </div>
              <p className="px-2 mt-2 text-[13px] font-light uppercase text-neutral-400">
                ${' '}
                {new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(featured.price)}
              </p>
            </div>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 px-6 mt-6 gap-x-6 gap-y-2">
        {rest.map((item) => (
          <Link
            to={`/product/${item.id}/${item.variants[0].id}`}
            className="cursor-pointer"
            key={item.id}
          >
            <div className="w-full overflow-hidden rounded-sm ">
              <img
                src={item.variants[0].photos[0]}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex items-center gap-4 pt-2 pl-2">
              <p className="text-[13px] uppercase font-light truncate text-neutral-800">
                {item.name}
              </p>
              <div className="flex items-center gap-1">
                <div
                  className="w-2.75 h-2.75 border border-neutral-100 "
                  style={{
                    backgroundColor: item.variants[0].color
                  }}
                />
                <p className="text-[13px] font-light uppercase text-neutral-800">
                  +{item.variants.length}
                </p>
              </div>
            </div>
            <p className="text-[13px] font-light uppercase text-neutral-400 pb-6 pl-2">
              ${' '}
              {new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(item.price)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
