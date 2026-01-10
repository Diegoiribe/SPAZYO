import React from 'react';
import { get } from '../api/http';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const ProductTemplate = () => {
  const { id, idColor } = useParams();
  const [productView, setProductView] = useState([]);
  const product = productView.find((p) => p.id === Number(id));
  const selectedVariant = product?.variants.find(
    (v) => v.id === Number(idColor)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get('/products', null, 'tenant');
        console.log('Data fetched:', data);
        setProductView(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* First Image */}
      <img
        className="object-cover w-full rounded-xs h-3/4"
        src={selectedVariant?.photos[0]}
        alt={product?.name}
      />

      {/* Description */}
      <p className="pb-10 text-xs font-light uppercase text-neutral-800 pt-15">
        {product?.description}
      </p>
      {/* Id */}
      <p className="text-[11px] font-light uppercase text-neutral-800 pb-15">
        RAYAS | 2897/896/896
      </p>
      {/* Mas fotos */}
      <div>
        {selectedVariant?.photos.slice(1).map((item, index) => (
          <img
            className="object-cover w-full mb-6 rounded-sm h-3/4"
            key={index}
            src={item}
            alt="Ropa"
          />
        ))}
      </div>
    </div>
  );
};
