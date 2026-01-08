import React from 'react';
import { Link } from 'react-router-dom';
import { get } from '../api/http';
import { useState, useEffect } from 'react';

export const CatalogTemplate = () => {
  const [productsCatalog, setProductsCatalog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get('/products');
        console.log('Data fetched:', data);
        setProductsCatalog(data);
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

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      {productsCatalog.map((item) => (
        <Link
          to={`/product/${item.id}/${item.variants[0].id}`}
          className="cursor-pointer"
          key={item.id}
        >
          <img
            src={item.variants[0].photoPrimary}
            alt=""
            className="object-contain rounded-sm h-58 "
          />
          <div className="flex items-center gap-4 pt-2 pl-2">
            <p className="text-[12px] uppercase font-light truncate text-neutral-800">
              {item.name}
            </p>
            <div className="flex items-center gap-1">
              <div
                className="w-2.75 h-2.75 border border-neutral-200 "
                style={{
                  backgroundColor: colorMap[item.variants[0].color]
                }}
              />
              <p className="text-[12px] font-light uppercase text-neutral-800">
                +{item.variants.length}
              </p>
            </div>
          </div>
          <p className="text-[12px] font-light uppercase text-neutral-800 pb-6 pl-2">
            ${' '}
            {new Intl.NumberFormat('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(item.price)}
          </p>
        </Link>
      ))}
    </div>
  );
};
