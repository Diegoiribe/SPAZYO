import React from 'react';
import { get } from '../api/http';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const ProductTemplate = ({ subdomain }) => {
  const { id, idColor } = useParams();
  const [productView, setProductView] = useState([]);
  const [loading, setLoading] = useState(true);
  const product = productView.find((p) => p.id === Number(id));
  const selectedVariant = product?.variants.find(
    (v) => v.id === Number(idColor)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get(`/public/products/${subdomain}`);
        console.log('Data fetched:', data);
        setProductView(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="w-full rounded-xs aspect-[3/4] bg-neutral-200" />
        <div className="pb-10 space-y-2 pt-15">
          <div className="w-3/4 h-3 rounded bg-neutral-200" />
          <div className="w-1/2 h-3 rounded bg-neutral-200" />
        </div>
        <div className="w-1/3 h-3 rounded bg-neutral-200 pb-15 mb-15" />
        <div className="space-y-6">
          <div className="w-full rounded-sm aspect-[3/4] bg-neutral-200" />
          <div className="w-full rounded-sm aspect-[3/4] bg-neutral-200" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <img
        className="object-cover w-full rounded-xs h-3/4"
        src={selectedVariant?.photos[0]}
        alt={product?.name}
      />
      <p className="pb-10 text-[13px] font-light uppercase text-neutral-800 pt-15">
        {product?.description}
      </p>
      <p className="text-[11px] font-light uppercase text-neutral-800 pb-15">
        RAYAS | 2897/896/896
      </p>
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
