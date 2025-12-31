import React from 'react';
import { data } from '../data/db';
import { useParams } from 'react-router-dom';

export const ProductTemplate = () => {
  const { id, idColor } = useParams();
  const product = data?.[0]?.zayca?.products?.find((p) => p.id === Number(id));
  const selectedVariant = product?.variants.find(
    (v) => v.id === Number(idColor)
  );

  return (
    <div>
      {/* First Image */}
      <img
        className="object-cover w-full rounded-xs h-3/4"
        src={selectedVariant?.img}
        alt={product?.name}
      />

      {/* Description */}
      <p className="pb-10 text-xs font-light uppercase text-neutral-800 pt-15">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        molestias quaerat animi nihil eum, vel quisquam tempore voluptates dicta
        dolorem odit atque adipisci autem iste ratione? Dolore, iste. Optio, ad?
      </p>
      {/* Id */}
      <p className="text-[11px] font-light uppercase text-neutral-800 pb-15">
        RAYAS | 2897/896/896
      </p>
      {/* Mas fotos */}
      <div>
        {selectedVariant?.imgs.map((item, index) => (
          <img
            className="object-cover w-full mb-6 rounded-sm h-3/4"
            key={index}
            src={item.img}
            alt="Ropa"
          />
        ))}
      </div>
    </div>
  );
};
