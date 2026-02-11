import React from 'react';
import { Link } from 'react-router-dom';
import { get } from '../api/http';
import { useState, useEffect } from 'react';

export const CatalogTemplate = ({ subdomain }) => {
  const [productsCatalog, setProductsCatalog] = useState([]);

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

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-2">
      {productsCatalog.map((item) => (
        <Link
          to={`/product/${item.id}/${item.variants[0].id}`}
          className="cursor-pointer"
          key={item.id}
        >
          <div className="flex items-center gap-6 pt-2 pl-2 ">
            <img
              src={item.variants[0].photos[0]}
              alt=""
              className="object-cover rounded-sm h-30 w-30 "
            />
            <div>
              <p className="pb-4 pr-5 font-medium capitalize w-45 text-md text-neutral-800">
                {item.name
                  .toLowerCase()
                  .replace(/\b\w/g, (letter) => letter.toUpperCase())}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <div
                    className="w-2.75 h-2.75 border border-neutral-100 "
                    style={{
                      backgroundColor: item.variants[0].color
                    }}
                  />
                  <p className="text-xs font-light text-black uppercase">
                    +{item.variants.length}
                  </p>
                </div>
                <p className="text-sm uppercase text-neutral-500 ">
                  ${' '}
                  {new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }).format(item.price)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
