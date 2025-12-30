import React from 'react';
import { data } from '../data/db'
import { useParams } from 'react-router-dom'



export const ProductTemplate = () => {

  const { id } = useParams()
  const product = data.filter((p) => p.id == id)


  return (
    <div>
      {/* First Image */}
      <img
        className="object-cover w-full rounded-sm h-3/4"
        src={product[0].img}
        alt=""
      />

      {/* Description */}
      <p className="pb-10 text-sm font-light text-neutral-800 pt-15">
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
        {product[0].imgs.map((item, index) => (
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
